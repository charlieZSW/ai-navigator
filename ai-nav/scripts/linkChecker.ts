import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { models } from '../app/data/models';
import { datasets } from '../app/data/datasets';
import { tutorials } from '../app/data/tutorials';
import { frameworks } from '../app/data/frameworks';
import { specialResources } from '../app/data/specialResources';

// 导入配置
const config = require('./config');

interface Resource {
  id: string;
  title: string;
  link: string;
  category?: string;
}

interface CheckResult {
  id: string;
  title: string;
  link: string;
  category?: string;
  status: 'valid' | 'invalid' | 'timeout' | 'error';
  statusCode?: number;
  errorMessage?: string;
  responseTime?: number; // 添加响应时间
  contentType?: string; // 添加内容类型
  lastModified?: string; // 添加最后修改时间
}

// 收集所有资源链接
const getAllResources = (): Resource[] => {
  const allResources: Resource[] = [
    ...models.map(item => ({ ...item })),
    ...datasets.map(item => ({ ...item })),
    ...tutorials.map(item => ({ ...item })),
    ...frameworks.map(item => ({ ...item })),
    ...specialResources.map(item => ({ ...item }))
  ];
  
  return allResources;
};

// 检查单个链接
const checkLink = async (resource: Resource): Promise<CheckResult> => {
  const result: CheckResult = {
    id: resource.id,
    title: resource.title,
    link: resource.link,
    category: resource.category,
    status: 'valid'
  };

  const startTime = Date.now();

  try {
    // 使用配置中的参数
    const response = await axios.get(resource.link, {
      timeout: config.linkChecker.timeout,
      // 默认使用HEAD请求，如果失败会用GET请求重试
      method: 'HEAD',
      headers: {
        'User-Agent': config.linkChecker.userAgent
      },
      maxRedirects: config.linkChecker.followRedirects ? config.linkChecker.maxRedirects : 0,
      validateStatus: function (status: number) {
        // 任何状态码都返回，我们会在结果中记录
        return true;
      }
    });

    result.statusCode = response.status;
    result.responseTime = Date.now() - startTime;
    result.contentType = response.headers['content-type'];
    result.lastModified = response.headers['last-modified'];
    
    // 检查状态码是否在有效范围内
    if (config.linkChecker.validStatusCodes.includes(response.status)) {
      result.status = 'valid';
    } else {
      result.status = 'invalid';
      result.errorMessage = `HTTP status: ${response.status}`;
    }
  } catch (error: any) {
    // 如果HEAD请求失败，尝试GET请求
    if (error.code === 'ECONNABORTED' || error.code === 'ECONNREFUSED') {
      try {
        // 某些服务器不支持HEAD请求，尝试GET请求
        const getResponse = await axios.get(resource.link, {
          timeout: config.linkChecker.timeout,
          headers: {
            'User-Agent': config.linkChecker.userAgent
          },
          maxRedirects: config.linkChecker.followRedirects ? config.linkChecker.maxRedirects : 0,
          validateStatus: function (status: number) {
            return true;
          }
        });
        
        result.statusCode = getResponse.status;
        result.responseTime = Date.now() - startTime;
        result.contentType = getResponse.headers['content-type'];
        result.lastModified = getResponse.headers['last-modified'];
        
        if (config.linkChecker.validStatusCodes.includes(getResponse.status)) {
          result.status = 'valid';
        } else {
          result.status = 'invalid';
          result.errorMessage = `HTTP status: ${getResponse.status}`;
        }
        
        return result;
      } catch (getError: any) {
        // GET请求也失败
        if (getError.code === 'ECONNABORTED') {
          result.status = 'timeout';
          result.errorMessage = '请求超时';
        } else {
          result.status = 'error';
          result.errorMessage = getError.message || '未知错误';
        }
      }
    } else if (error.code === 'ECONNABORTED') {
      result.status = 'timeout';
      result.errorMessage = '请求超时';
    } else {
      result.status = 'error';
      result.errorMessage = error.message || '未知错误';
    }
  }

  return result;
};

// 批量检查链接
const checkAllLinks = async (resources: Resource[]): Promise<CheckResult[]> => {
  console.log(`开始检查 ${resources.length} 个链接...`);
  
  const results: CheckResult[] = [];
  let completed = 0;
  
  // 使用配置中的批处理大小
  const batchSize = config.linkChecker.batchSize;
  
  for (let i = 0; i < resources.length; i += batchSize) {
    const batch = resources.slice(i, i + batchSize);
    const batchPromises = batch.map(resource => checkLink(resource));
    
    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);
    
    completed += batch.length;
    console.log(`进度: ${completed}/${resources.length} (${Math.round(completed / resources.length * 100)}%)`);
  }
  
  return results;
};

// 生成报告
const generateReport = (results: CheckResult[]): void => {
  const validLinks = results.filter(result => result.status === 'valid');
  const invalidLinks = results.filter(result => result.status !== 'valid');
  
  // 按问题类型分类
  const invalidByStatus = {
    invalid: invalidLinks.filter(link => link.status === 'invalid'),
    timeout: invalidLinks.filter(link => link.status === 'timeout'),
    error: invalidLinks.filter(link => link.status === 'error')
  };
  
  // 按类别分类问题链接
  const invalidByCategory: {[key: string]: CheckResult[]} = {};
  invalidLinks.forEach(link => {
    const category = link.category || '未分类';
    if (!invalidByCategory[category]) {
      invalidByCategory[category] = [];
    }
    invalidByCategory[category].push(link);
  });
  
  console.log('\n链接检查报告摘要:');
  console.log(`总链接数: ${results.length}`);
  console.log(`有效链接: ${validLinks.length} (${Math.round(validLinks.length / results.length * 100)}%)`);
  console.log(`问题链接: ${invalidLinks.length} (${Math.round(invalidLinks.length / results.length * 100)}%)`);
  
  if (invalidLinks.length > 0) {
    console.log('\n问题链接摘要:');
    console.log(`- 无效状态码: ${invalidByStatus.invalid.length}`);
    console.log(`- 请求超时: ${invalidByStatus.timeout.length}`);
    console.log(`- 连接错误: ${invalidByStatus.error.length}`);
    
    console.log('\n按类别统计问题链接:');
    Object.keys(invalidByCategory).forEach(category => {
      console.log(`- ${category}: ${invalidByCategory[category].length}`);
    });
  }
  
  // 将报告保存到文件
  const reportData = {
    timestamp: new Date().toISOString(),
    totalLinks: results.length,
    validLinks: validLinks.length,
    invalidLinks: invalidLinks.length,
    invalidByStatus: {
      invalid: invalidByStatus.invalid.length,
      timeout: invalidByStatus.timeout.length,
      error: invalidByStatus.error.length
    },
    invalidByCategory: Object.fromEntries(
      Object.entries(invalidByCategory).map(([category, links]) => [category, links.length])
    ),
    summary: {
      validPercentage: Math.round(validLinks.length / results.length * 100),
      invalidPercentage: Math.round(invalidLinks.length / results.length * 100)
    },
    problemLinks: invalidLinks.map(link => ({
      id: link.id,
      title: link.title,
      link: link.link,
      category: link.category,
      status: link.status,
      statusCode: link.statusCode,
      errorMessage: link.errorMessage,
      responseTime: link.responseTime,
      contentType: link.contentType,
      lastModified: link.lastModified
    })),
    allLinks: results // 保存所有链接的状态，包括有效的
  };
  
  // 确保报告目录存在
  const reportsDir = path.join(__dirname, '..', config.reporting.reportsDir);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  
  const reportFilename = `link-check-report-${new Date().toISOString().replace(/:/g, '-')}.json`;
  const reportPath = path.join(reportsDir, reportFilename);
  
  fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
  console.log(`\n完整报告已保存到: ${reportPath}`);
  
  // 生成简易人类可读报告
  generateHumanReadableReport(reportData, reportsDir);
  
  // 清理旧报告
  cleanupOldReports(reportsDir);
};

// 生成人类可读报告
const generateHumanReadableReport = (reportData: any, reportsDir: string): void => {
  const reportLines = [
    '# AI导航网站链接检查报告',
    `生成时间: ${new Date(reportData.timestamp).toLocaleString()}`,
    '',
    '## 摘要',
    `- 总链接数: ${reportData.totalLinks}`,
    `- 有效链接: ${reportData.validLinks} (${reportData.summary.validPercentage}%)`,
    `- 问题链接: ${reportData.invalidLinks} (${reportData.summary.invalidPercentage}%)`,
    '',
    '### 问题链接分类',
    `- 无效状态码: ${reportData.invalidByStatus.invalid}`,
    `- 请求超时: ${reportData.invalidByStatus.timeout}`,
    `- 连接错误: ${reportData.invalidByStatus.error}`,
    '',
    '### 按资源类别统计问题链接',
  ];
  
  // 添加按类别统计
  Object.entries(reportData.invalidByCategory).forEach(([category, count]) => {
    reportLines.push(`- ${category}: ${count}`);
  });
  
  reportLines.push('', '## 详细问题链接列表', '');
  
  // 添加问题链接详细信息
  if (reportData.problemLinks && reportData.problemLinks.length > 0) {
    reportData.problemLinks.forEach((link: any, index: number) => {
      reportLines.push(`### ${index + 1}. ${link.title}`);
      reportLines.push(`- ID: ${link.id}`);
      reportLines.push(`- 分类: ${link.category || '未分类'}`);
      reportLines.push(`- 链接: ${link.link}`);
      reportLines.push(`- 问题: ${link.status}${link.statusCode ? ` (HTTP ${link.statusCode})` : ''}`);
      if (link.errorMessage) reportLines.push(`- 错误信息: ${link.errorMessage}`);
      if (link.responseTime) reportLines.push(`- 响应时间: ${link.responseTime}ms`);
      if (link.contentType) reportLines.push(`- 内容类型: ${link.contentType}`);
      if (link.lastModified) reportLines.push(`- 最后修改: ${link.lastModified}`);
      reportLines.push('');
    });
  } else {
    reportLines.push('没有发现问题链接，所有链接都是有效的。');
  }
  
  // 添加下一步操作指南
  reportLines.push('## 下一步操作');
  reportLines.push('');
  reportLines.push('运行以下命令生成替代链接建议:');
  reportLines.push('```bash');
  reportLines.push('npm run suggest-alternatives');
  reportLines.push('```');
  
  // 保存可读报告
  const readableFilename = `link-check-readable-${new Date().toISOString().replace(/:/g, '-')}.md`;
  const readablePath = path.join(reportsDir, readableFilename);
  
  fs.writeFileSync(readablePath, reportLines.join('\n'));
  console.log(`人类可读报告已保存到: ${readablePath}`);
};

// 清理旧报告
const cleanupOldReports = (reportsDir: string): void => {
  try {
    const files = fs.readdirSync(reportsDir);
    const now = new Date();
    const maxAgeMs = config.reporting.reportRetentionDays * 24 * 60 * 60 * 1000;
    
    files.forEach(file => {
      const filePath = path.join(reportsDir, file);
      const stats = fs.statSync(filePath);
      const fileAge = now.getTime() - stats.mtime.getTime();
      
      if (fileAge > maxAgeMs) {
        fs.unlinkSync(filePath);
        console.log(`已清理过期报告: ${file}`);
      }
    });
  } catch (error) {
    console.error('清理旧报告时出错:', error);
  }
};

// 主函数
const main = async () => {
  try {
    console.log('链接检查工具启动...');
    console.log(`超时设置: ${config.linkChecker.timeout}ms`);
    console.log(`批处理大小: ${config.linkChecker.batchSize}`);
    
    const resources = getAllResources();
    const results = await checkAllLinks(resources);
    generateReport(results);
    
    console.log('链接检查完成!');
  } catch (error) {
    console.error('链接检查过程中发生错误:', error);
  }
};

// 执行链接检查
main(); 
import fs from 'fs';
import path from 'path';
import axios from 'axios';

// 导入配置
const config = require('./config');

// 辅助函数：从URL提取域名
const extractDomain = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (e) {
    return null;
  }
};

// 辅助函数：通过搜索API获取替代链接
const searchUsingAPI = async (title: string, category: string | undefined): Promise<string[]> => {
  // 如果配置为不使用真实搜索，则返回预定义结果
  if (!config.alternativeSearch.useRealSearch) {
    return searchWithPredefinedResults(title);
  }

  const searchQuery = `${title} ${category || ''} official site`;
  console.log(`[搜索API] 正在搜索「${searchQuery}」...`);

  try {
    if (config.alternativeSearch.searchApiType === 'custom-google') {
      return await searchWithGoogleAPI(searchQuery);
    } else if (config.alternativeSearch.searchApiType === 'bing') {
      return await searchWithBingAPI(searchQuery);
    } else {
      console.warn('未知的搜索API类型，使用预定义结果');
      return searchWithPredefinedResults(title);
    }
  } catch (error) {
    console.error('API搜索过程中出错:', error);
    console.log('使用预定义结果作为后备方案');
    return searchWithPredefinedResults(title);
  }
};

// 使用谷歌自定义搜索API
const searchWithGoogleAPI = async (searchQuery: string): Promise<string[]> => {
  try {
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: config.alternativeSearch.searchApiKey,
        cx: config.alternativeSearch.googleSearchEngineId,
        q: searchQuery
      }
    });

    if (response.data && response.data.items) {
      // 提取搜索结果URL
      return response.data.items.slice(0, 3).map((item: any) => item.link);
    }
    return [];
  } catch (error) {
    console.error('谷歌API搜索失败:', error);
    return [];
  }
};

// 使用必应搜索API
const searchWithBingAPI = async (searchQuery: string): Promise<string[]> => {
  try {
    const response = await axios.get('https://api.bing.microsoft.com/v7.0/search', {
      headers: {
        'Ocp-Apim-Subscription-Key': config.alternativeSearch.searchApiKey
      },
      params: {
        q: searchQuery,
        count: 3
      }
    });

    if (response.data && response.data.webPages && response.data.webPages.value) {
      // 提取搜索结果URL
      return response.data.webPages.value.map((item: any) => item.url);
    }
    return [];
  } catch (error) {
    console.error('必应API搜索失败:', error);
    return [];
  }
};

// 使用预定义的搜索结果
const searchWithPredefinedResults = (title: string): string[] => {
  console.log(`[预定义结果] 为「${title}」使用预定义结果`);
  
  // 预定义的热门资源替代链接
  const predefinedResults: {[key: string]: string[]} = {
    "GPT-4": [
      "https://openai.com/product/gpt-4",
      "https://openai.com/api/",
      "https://platform.openai.com/docs/models/gpt-4"
    ],
    "LLaMA 2": [
      "https://llama.meta.com/",
      "https://github.com/facebookresearch/llama",
      "https://huggingface.co/meta-llama"
    ],
    "Stable Diffusion": [
      "https://stablediffusionweb.com/",
      "https://huggingface.co/stabilityai",
      "https://github.com/Stability-AI/stablediffusion"
    ],
    "BERT": [
      "https://github.com/google-research/bert",
      "https://huggingface.co/docs/transformers/model_doc/bert",
      "https://tensorflow.org/hub/tutorials/bert_experts"
    ],
    "ResNet": [
      "https://pytorch.org/vision/main/models/generated/torchvision.models.resnet50.html",
      "https://keras.io/api/applications/resnet/",
      "https://github.com/KaimingHe/deep-residual-networks"
    ],
    "YOLOv8": [
      "https://github.com/ultralytics/ultralytics",
      "https://docs.ultralytics.com/",
      "https://huggingface.co/spaces/ultralytics/ultralytics"
    ],
    "TensorFlow": [
      "https://www.tensorflow.org/",
      "https://github.com/tensorflow/tensorflow",
      "https://tensorflow.google.cn/"
    ],
    "PyTorch": [
      "https://pytorch.org/",
      "https://github.com/pytorch/pytorch",
      "https://pytorch.org/docs/stable/index.html"
    ],
    "Scikit-learn": [
      "https://scikit-learn.org/stable/",
      "https://github.com/scikit-learn/scikit-learn",
      "https://scikit-learn.org/stable/user_guide.html"
    ],
    "ImageNet": [
      "https://www.image-net.org/",
      "https://www.kaggle.com/competitions/imagenet-object-localization-challenge",
      "https://huggingface.co/datasets/imagenet-1k"
    ],
    "COCO Dataset": [
      "https://cocodataset.org/",
      "https://github.com/cocodataset/cocoapi",
      "https://huggingface.co/datasets/coco"
    ]
  };
  
  // 尝试精确匹配
  if (predefinedResults[title]) {
    return predefinedResults[title];
  }
  
  // 如果没有精确匹配，尝试模糊匹配
  const similarTitle = Object.keys(predefinedResults).find(key => 
    key.toLowerCase().includes(title.toLowerCase()) || 
    title.toLowerCase().includes(key.toLowerCase())
  );
  
  if (similarTitle) {
    return predefinedResults[similarTitle];
  }
  
  // 没有找到任何匹配
  return [];
};

// 寻找替代链接
const findAlternativeLinks = async (reportPath: string): Promise<void> => {
  try {
    // 检查报告文件是否存在
    if (!fs.existsSync(reportPath)) {
      console.error(`报告文件不存在: ${reportPath}`);
      return;
    }
    
    // 读取检查报告
    const reportContent = fs.readFileSync(reportPath, 'utf8');
    const report = JSON.parse(reportContent);
    
    if (!report.problemLinks || report.problemLinks.length === 0) {
      console.log('没有发现问题链接，不需要生成替代建议。');
      return;
    }
    
    console.log(`发现 ${report.problemLinks.length} 个问题链接，正在生成替代建议...`);
    
    // 为每个问题链接生成替代建议
    const linksWithAlternatives = await Promise.all(
      report.problemLinks.map(async (link: any) => {
        console.log(`处理: [${link.category || '未分类'}] ${link.title}`);
        const alternativeSuggestions = await searchUsingAPI(link.title, link.category);
        
        return {
          ...link,
          domain: extractDomain(link.link),
          alternativeSuggestions,
          hasAlternatives: alternativeSuggestions.length > 0
        };
      })
    );
    
    // 创建包含替代建议的新报告
    const alternativesReport = {
      timestamp: new Date().toISOString(),
      originalReport: report.timestamp,
      totalProblemLinks: report.problemLinks.length,
      linksWithAlternatives: linksWithAlternatives,
      summary: {
        totalWithAlternatives: linksWithAlternatives.filter((link: any) => link.hasAlternatives).length,
        totalWithoutAlternatives: linksWithAlternatives.filter((link: any) => !link.hasAlternatives).length
      }
    };
    
    // 保存替代链接建议报告
    const alternativesDir = path.join(__dirname, '..', config.reporting.reportsDir);
    if (!fs.existsSync(alternativesDir)) {
      fs.mkdirSync(alternativesDir, { recursive: true });
    }
    
    const alternativesFilename = `link-alternatives-${new Date().toISOString().replace(/:/g, '-')}.json`;
    const alternativesPath = path.join(alternativesDir, alternativesFilename);
    
    fs.writeFileSync(alternativesPath, JSON.stringify(alternativesReport, null, 2));
    console.log(`替代链接建议已保存到: ${alternativesPath}`);
    
    // 生成可读的人类友好报告
    generateHumanReadableReport(alternativesReport, alternativesDir);
    
  } catch (error) {
    console.error('生成替代链接建议时发生错误:', error);
  }
};

// 生成人类可读的报告
const generateHumanReadableReport = (report: any, outputDir: string): void => {
  const reportLines = [
    '# 链接替代建议报告',
    `生成时间: ${new Date().toLocaleString()}`,
    `原始报告时间: ${new Date(report.originalReport).toLocaleString()}`,
    `问题链接总数: ${report.totalProblemLinks}`,
    `- 找到替代链接: ${report.summary.totalWithAlternatives}`,
    `- 未找到替代链接: ${report.summary.totalWithoutAlternatives}`,
    '',
    '## 替代链接建议',
    ''
  ];
  
  report.linksWithAlternatives.forEach((item: any, index: number) => {
    reportLines.push(`### ${index + 1}. ${item.title}`);
    reportLines.push(`- 分类: ${item.category || '未分类'}`);
    reportLines.push(`- 原始链接: ${item.link}`);
    reportLines.push(`- 问题: ${item.status}${item.statusCode ? ` (HTTP ${item.statusCode})` : ''} - ${item.errorMessage || '未知错误'}`);
    
    if (item.alternativeSuggestions && item.alternativeSuggestions.length > 0) {
      reportLines.push('- 替代链接建议:');
      item.alternativeSuggestions.forEach((alt: string, altIndex: number) => {
        reportLines.push(`  ${altIndex + 1}. ${alt}`);
      });
    } else {
      reportLines.push('- **未找到替代链接建议**');
    }
    
    reportLines.push('');
  });
  
  // 添加更新指南
  reportLines.push('## 如何更新链接');
  reportLines.push('');
  reportLines.push('1. 打开对应的数据文件 (models.ts, datasets.ts, tutorials.ts 等)');
  reportLines.push('2. 找到带有问题链接的项目 (使用ID或标题搜索)');
  reportLines.push('3. 使用上述替代链接替换原始链接');
  reportLines.push('4. 重新运行链接检查器确认链接有效: `npm run check-links`');
  reportLines.push('');
  reportLines.push('## 数据文件位置');
  reportLines.push('');
  reportLines.push('- 模型: `app/data/models.ts`');
  reportLines.push('- 数据集: `app/data/datasets.ts`');
  reportLines.push('- 教程: `app/data/tutorials.ts`');
  reportLines.push('- 框架: `app/data/frameworks.ts`');
  reportLines.push('- 特殊资源: `app/data/specialResources.ts`');
  
  // 保存可读报告
  const readableFilename = `link-alternatives-readable-${new Date().toISOString().replace(/:/g, '-')}.md`;
  const readablePath = path.join(outputDir, readableFilename);
  
  fs.writeFileSync(readablePath, reportLines.join('\n'));
  console.log(`人类可读报告已保存到: ${readablePath}`);
};

// 查找最新的链接检查报告
const findLatestReport = (): string | null => {
  const reportsDir = path.join(__dirname, '..', config.reporting.reportsDir);
  
  if (!fs.existsSync(reportsDir)) {
    console.error(`报告目录不存在: ${reportsDir}`);
    return null;
  }
  
  const reportFiles = fs.readdirSync(reportsDir)
    .filter(file => file.startsWith('link-check-report-') && file.endsWith('.json'))
    .map(file => ({
      file,
      path: path.join(reportsDir, file),
      mtime: fs.statSync(path.join(reportsDir, file)).mtime
    }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
  
  if (reportFiles.length === 0) {
    console.error('未找到链接检查报告');
    return null;
  }
  
  return reportFiles[0].path;
};

// 主函数
const main = async () => {
  console.log('替代链接建议生成工具启动...');
  
  // 查找最新的检查报告
  const latestReport = findLatestReport();
  
  if (!latestReport) {
    console.error('无法找到链接检查报告，请先运行链接检查器');
    return;
  }
  
  console.log(`找到最新报告: ${latestReport}`);
  
  // 生成替代链接建议
  await findAlternativeLinks(latestReport);
  
  console.log('替代链接建议生成完成!');
};

// 执行脚本
main(); 
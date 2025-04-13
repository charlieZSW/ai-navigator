const fs = require('fs');
const path = require('path');
const axios = require('axios');

// 导入配置
const config = require('./config');

// 提取域名
const extractDomain = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (e) {
    return null;
  }
};

// 使用API查找替代链接
const searchUsingAPI = async (query) => {
  console.log(`搜索查询: "${query}"`);
  
  // 检查是否使用真实搜索或预定义结果
  if (!config.alternativeSuggestion.useRealSearches) {
    console.log('使用预定义的搜索结果 (测试模式)');
    return getPredefinedResults(query);
  }
  
  // 根据配置使用不同的搜索API
  if (config.alternativeSuggestion.searchProvider === 'google') {
    return searchWithGoogle(query);
  } else if (config.alternativeSuggestion.searchProvider === 'bing') {
    return searchWithBing(query);
  } else {
    console.log('未支持的搜索提供商，使用预定义结果');
    return getPredefinedResults(query);
  }
};

// 谷歌搜索API
const searchWithGoogle = async (query) => {
  try {
    // 这里需要使用合法的Google API密钥和搜索引擎ID
    const apiKey = config.alternativeSuggestion.googleApiKey;
    const searchEngineId = config.alternativeSuggestion.googleSearchEngineId;
    
    if (!apiKey || !searchEngineId) {
      console.log('缺少Google API密钥或搜索引擎ID，使用预定义结果');
      return getPredefinedResults(query);
    }
    
    const response = await axios.get('https://www.googleapis.com/customsearch/v1', {
      params: {
        key: apiKey,
        cx: searchEngineId,
        q: query,
        num: 5
      }
    });
    
    if (response.data && response.data.items) {
      return response.data.items.map(item => ({
        title: item.title,
        link: item.link,
        snippet: item.snippet
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Google搜索API错误:', error.message);
    return [];
  }
};

// 必应搜索API
const searchWithBing = async (query) => {
  try {
    const apiKey = config.alternativeSuggestion.bingApiKey;
    
    if (!apiKey) {
      console.log('缺少Bing API密钥，使用预定义结果');
      return getPredefinedResults(query);
    }
    
    const response = await axios.get('https://api.bing.microsoft.com/v7.0/search', {
      params: {
        q: query,
        count: 5
      },
      headers: {
        'Ocp-Apim-Subscription-Key': apiKey
      }
    });
    
    if (response.data && response.data.webPages && response.data.webPages.value) {
      return response.data.webPages.value.map(item => ({
        title: item.name,
        link: item.url,
        snippet: item.snippet
      }));
    }
    
    return [];
  } catch (error) {
    console.error('Bing搜索API错误:', error.message);
    return [];
  }
};

// 获取预定义的搜索结果（用于测试或API不可用时）
const getPredefinedResults = (query) => {
  // 为一些常见的AI资源提供预定义替代品
  const predefinedResults = {
    'gpt4': [
      { title: 'Claude AI by Anthropic', link: 'https://www.anthropic.com/claude', snippet: 'Claude is a next-generation AI assistant from Anthropic designed to be helpful, harmless, and honest.' },
      { title: 'Google Gemini', link: 'https://gemini.google.com', snippet: 'Gemini is Google\'s most capable and flexible AI model, designed to help you with a wide range of tasks.' }
    ],
    'stable-diffusion': [
      { title: 'Midjourney', link: 'https://www.midjourney.com', snippet: 'Midjourney is an independent research lab exploring new mediums of thought and expanding the imaginative powers of the human species.' },
      { title: 'DALL-E by OpenAI', link: 'https://openai.com/dall-e-3', snippet: 'DALL-E is an AI system that can create realistic images and art from a description in natural language.' }
    ],
    'huggingface': [
      { title: 'PapersWithCode', link: 'https://paperswithcode.com/', snippet: 'Machine Learning papers with code, seamlessly tracking progress in AI research.' },
      { title: 'TensorHub', link: 'https://tensorhub.io/', snippet: 'TensorHub is a repository of pre-trained ML models ready for fine-tuning and deployment.' }
    ]
  };
  
  // 提取查询中的关键词
  const keywords = query.toLowerCase().split(' ');
  
  // 查找匹配的预定义结果
  for (const key in predefinedResults) {
    if (keywords.some(word => key.includes(word) || word.includes(key))) {
      return predefinedResults[key];
    }
  }
  
  // 通用替代建议
  return [
    { title: 'AI-Chat Demo (替代例子)', link: 'https://chat.example.com', snippet: '示例AI聊天服务 - 测试用' },
    { title: 'Image Generator (替代例子)', link: 'https://image.example.com', snippet: '示例图像生成服务 - 测试用' }
  ];
};

// 从TypeScript文件中提取项目
function extractItemsFromFile(filePath) {
  try {
    console.log(`从文件中提取数据: ${filePath}`);
    
    // 读取文件内容
    const content = fs.readFileSync(filePath, 'utf8');
    
    // 使用简化的方法提取所有对象
    const items = [];
    
    // 提取所有包含id和link的对象（使用正则表达式）
    const itemRegex = /{[\s\S]*?id:[\s\S]*?['"]([^'"]+)['"][\s\S]*?link:[\s\S]*?['"]([^'"]+)['"][\s\S]*?}/g;
    
    // 从文件中找到所有匹配的项目
    let match;
    while ((match = itemRegex.exec(content)) !== null) {
      try {
        // 提取当前匹配的完整对象文本
        const objectText = match[0];
        
        // 从对象文本中提取关键属性
        const idMatch = objectText.match(/id:\s*['"]([^'"]+)['"]/);
        const titleMatch = objectText.match(/title:\s*['"]([^'"]+)['"]/);
        const linkMatch = objectText.match(/link:\s*['"]([^'"]+)['"]/);
        const categoryMatch = objectText.match(/category:\s*['"]([^'"]+)['"]/);
        
        if (idMatch && titleMatch && linkMatch) {
          // 创建一个简化的对象
          const item = {
            id: idMatch[1],
            title: titleMatch[1],
            link: linkMatch[1]
          };
          
          // 如果有类别信息，添加到对象中
          if (categoryMatch) {
            item.category = categoryMatch[1];
          }
          
          items.push(item);
          
          // 为调试增加详细日志
          if (items.length % 10 === 0) {
            console.log(`已提取 ${items.length} 个项目...`);
          }
        }
      } catch (itemError) {
        console.error('处理单个项目时出错:', itemError.message);
        // 继续处理下一个项目
      }
    }
    
    console.log(`成功从文件提取了 ${items.length} 个项目`);
    
    // 如果没有项目，可能是正则表达式不匹配
    if (items.length === 0) {
      console.log('使用备用正则表达式尝试提取...');
      
      // 尝试另一种正则表达式策略
      const fallbackRegex = /{\s*id:\s*['"]([^'"]+)['"],\s*title:\s*['"]([^'"]+)['"],\s*link:\s*['"]([^'"]+)['"]/g;
      let fallbackMatch;
      
      while ((fallbackMatch = fallbackRegex.exec(content)) !== null) {
        try {
          items.push({
            id: fallbackMatch[1],
            title: fallbackMatch[2],
            link: fallbackMatch[3]
          });
        } catch (e) {
          // 忽略单项错误
        }
      }
      
      console.log(`备用方法提取了 ${items.length} 个项目`);
    }
    
    return items;
  } catch (e) {
    console.error(`从文件 ${filePath} 提取数据时出错:`, e.message);
    return [];
  }
}

// 从TypeScript内容中提取数组数据
const extractArrayData = (content, arrayName) => {
  try {
    console.log(`尝试提取 ${arrayName} 数据...`);
    
    // 寻找数组的声明，包括可能的类型注解
    const declarePattern = new RegExp(`export\\s+const\\s+${arrayName}(?:\\s*:\\s*[^=]+)?\\s*=\\s*\\[`, 'm');
    const declareMatch = content.match(declarePattern);
    
    if (!declareMatch) {
      console.log(`未找到${arrayName}的声明`);
      return [];
    }
    
    console.log(`找到${arrayName}数组的声明: "${declareMatch[0].trim()}"`);
    
    // 找到声明末尾的位置，即"["的位置
    const openBracketPos = content.indexOf('[', declareMatch.index + declareMatch[0].length - 1);
    if (openBracketPos === -1) {
      console.log(`找到${arrayName}声明但未找到数组开始的"["`);
      return [];
    }
    
    // 从开始的"["开始，计算嵌套的括号层数，找到匹配的闭括号
    let bracketCount = 1;
    let closeBracketPos = -1;
    
    for (let i = openBracketPos + 1; i < content.length; i++) {
      // 跳过字符串内容，避免误判
      if (content[i] === '"' || content[i] === "'") {
        const quote = content[i];
        i++;
        // 找到下一个未转义的引号
        while (i < content.length) {
          if (content[i] === quote && content[i-1] !== '\\') {
            break;
          }
          i++;
        }
        continue;
      }
      
      // 跳过注释
      if (content[i] === '/' && content[i+1] === '/') {
        // 单行注释
        while (i < content.length && content[i] !== '\n') {
          i++;
        }
        continue;
      }
      if (content[i] === '/' && content[i+1] === '*') {
        // 多行注释
        i += 2;
        while (i < content.length && !(content[i] === '*' && content[i+1] === '/')) {
          i++;
        }
        i++; // 跳过结束的 */
        continue;
      }
      
      if (content[i] === '[') {
        bracketCount++;
      } else if (content[i] === ']') {
        bracketCount--;
        if (bracketCount === 0) {
          closeBracketPos = i;
          break;
        }
      }
    }
    
    if (closeBracketPos === -1) {
      console.log(`找到${arrayName}开始的"["但未找到匹配的"]"`);
      console.log(`数组开始片段: ${content.substring(openBracketPos, openBracketPos + 100)}...`);
      return [];
    }
    
    // 提取数组内容，包括前后的方括号
    const arrayContent = content.substring(openBracketPos, closeBracketPos + 1);
    console.log(`成功找到${arrayName}数组的完整定义，长度: ${arrayContent.length} 字符`);
    
    // 去除注释和类型注解等TypeScript特有内容
    const cleanedContent = removeCommentsAndTypeAnnotations(arrayContent);
    console.log(`数组内容清理完成，准备解析...`);
    
    try {
      // 使用JSON.parse解析清理后的内容
      const data = JSON.parse(cleanedContent);
      console.log(`成功解析 ${data.length} 条 ${arrayName} 数据`);
      return data;
    } catch (parseError) {
      console.error(`JSON.parse解析错误: ${parseError.message}`);
      
      // 使用eval作为后备方案
      try {
        console.log('尝试使用eval作为后备解析方法...');
        // 确保数组中的属性名都是双引号括起来的
        const jsArrayString = cleanedContent
          .replace(/([{,]\s*)([a-zA-Z0-9_$]+)(\s*:)/g, '$1"$2"$3')
          .replace(/:\s*true\b/g, ': true')
          .replace(/:\s*false\b/g, ': false');
        
        const data = eval(jsArrayString);
        console.log(`成功使用eval解析，提取了 ${data.length} 条 ${arrayName} 数据`);
        return data;
      } catch (evalError) {
        console.error(`eval解析方法也失败: ${evalError.message}`);
        console.log('尝试使用第三种方法解析...');
        
        try {
          // 使用Function构造函数作为最后的尝试
          const data = Function('return ' + cleanedContent)();
          console.log(`成功使用Function解析，提取了 ${data.length} 条 ${arrayName} 数据`);
          return data;
        } catch (funcError) {
          console.error(`所有解析方法都失败: ${funcError.message}`);
          console.error('无法解析数组内容，将返回空数组');
          return [];
        }
      }
    }
  } catch (error) {
    console.error(`处理${arrayName}时发生意外错误:`, error.message);
    console.error(error.stack);
    return [];
  }
};

// 移除注释和类型注解
const removeCommentsAndTypeAnnotations = (content) => {
  let result = content;
  
  // 移除单行注释
  result = result.replace(/\/\/.*$/gm, '');
  
  // 移除多行注释
  result = result.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // 移除类型注解
  result = result.replace(/:\s*[A-Za-z0-9_<>|[\]]+/g, ': ');
  
  // 处理单引号字符串
  result = result.replace(/'([^'\\]*(\\.[^'\\]*)*)'/g, (match, p1) => {
    // 将单引号字符串转换为双引号字符串，处理转义字符
    return `"${p1.replace(/\\'/g, "'").replace(/"/g, '\\"')}"`;
  });
  
  // 移除行末尾的逗号
  result = result.replace(/,(\s*[\n\r]\s*[\]}])/g, '$1');
  
  return result;
};

// 查找替代链接
const findAlternativeLinks = async () => {
  try {
    // 查找最新报告
    const reportPath = findLatestReport();
    
    if (!reportPath) {
      console.log('未找到链接检查报告，请先运行链接检查器');
      return;
    }
    
    console.log(`使用报告: ${reportPath}`);
    
    // 读取报告文件
    const reportContent = fs.readFileSync(reportPath, 'utf8');
    const report = JSON.parse(reportContent);
    
    // 获取问题链接
    const problemLinks = report.problemLinks || [];
    
    if (problemLinks.length === 0) {
      console.log('报告中没有发现问题链接');
      return;
    }
    
    console.log(`找到 ${problemLinks.length} 个问题链接，开始查找替代链接...`);
    
    // 为每个问题链接查找替代选项
    const alternativesResults = [];
    
    for (let i = 0; i < problemLinks.length; i++) {
      const link = problemLinks[i];
      console.log(`[${i+1}/${problemLinks.length}] 处理: ${link.title} (${link.link})`);
      
      // 构建搜索查询
      const query = `${link.title} ${extractDomain(link.link) ? 'alternative to ' + extractDomain(link.link) : ''} ${link.category || ''}`.trim();
      
      // 搜索替代链接
      const alternatives = await searchUsingAPI(query);
      
      alternativesResults.push({
        original: link,
        alternatives: alternatives
      });
      
      // 延迟以避免API限制
      if (i < problemLinks.length - 1) {
        await new Promise(resolve => setTimeout(resolve, config.alternativeSuggestion.delayBetweenSearches));
      }
    }
    
    // 构建新报告
    const alternativesReport = {
      timestamp: new Date().toISOString(),
      originalReport: {
        timestamp: report.timestamp,
        path: reportPath
      },
      totalProblemLinks: problemLinks.length,
      alternativesFound: alternativesResults.filter(r => r.alternatives.length > 0).length,
      results: alternativesResults
    };
    
    // 保存报告
    const reportsDir = path.join(__dirname, '..', config.reporting.reportsDir);
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true });
    }
    
    const alternativesFilename = `link-alternatives-${new Date().toISOString().replace(/:/g, '-')}.json`;
    const alternativesPath = path.join(reportsDir, alternativesFilename);
    
    fs.writeFileSync(alternativesPath, JSON.stringify(alternativesReport, null, 2));
    console.log(`\n替代链接报告已保存到: ${alternativesPath}`);
    
    // 生成人类可读报告
    generateHumanReadableReport(alternativesReport, reportsDir);
    
    return alternativesReport;
  } catch (error) {
    console.error('查找替代链接时出错:', error);
  }
};

// 生成人类可读报告
const generateHumanReadableReport = (report, reportsDir) => {
  const reportLines = [
    '# AI导航网站替代链接建议',
    `生成时间: ${new Date(report.timestamp).toLocaleString()}`,
    '',
    '## 摘要',
    `- 问题链接总数: ${report.totalProblemLinks}`,
    `- 找到替代建议的链接数: ${report.alternativesFound}`,
    `- 基于原始报告: ${new Date(report.originalReport.timestamp).toLocaleString()}`,
    '',
    '## 详细建议',
    ''
  ];
  
  // 添加详细建议
  report.results.forEach((result, index) => {
    const original = result.original;
    
    reportLines.push(`### ${index + 1}. ${original.title}`);
    reportLines.push(`- 原始链接: ${original.link}`);
    reportLines.push(`- 分类: ${original.category || '未分类'}`);
    reportLines.push(`- 问题: ${original.status}${original.statusCode ? ` (HTTP ${original.statusCode})` : ''}`);
    if (original.errorMessage) reportLines.push(`- 错误信息: ${original.errorMessage}`);
    
    reportLines.push('\n#### 替代建议:');
    
    if (result.alternatives && result.alternatives.length > 0) {
      result.alternatives.forEach((alt, altIndex) => {
        reportLines.push(`${altIndex + 1}. **${alt.title}**`);
        reportLines.push(`   - 链接: ${alt.link}`);
        if (alt.snippet) reportLines.push(`   - 描述: ${alt.snippet}`);
        reportLines.push('');
      });
    } else {
      reportLines.push('未找到替代建议。');
      reportLines.push('');
    }
    
    reportLines.push('---\n');
  });
  
  // 添加如何更新链接的说明
  reportLines.push('## 如何更新链接');
  reportLines.push('');
  reportLines.push('要更新链接，请按照以下步骤操作:');
  reportLines.push('');
  reportLines.push('1. 查看上面的建议，选择合适的替代链接');
  reportLines.push('2. 在数据文件中找到对应的条目:');
  reportLines.push('   - 模型数据: `app/data/models.ts`');
  reportLines.push('   - 数据集数据: `app/data/datasets.ts`');
  reportLines.push('   - 教程数据: `app/data/tutorials.ts`');
  reportLines.push('   - 框架数据: `app/data/frameworks.ts`');
  reportLines.push('   - 特殊资源数据: `app/data/specialResources.ts`');
  reportLines.push('3. 修改链接URL，保存文件');
  reportLines.push('4. 重新运行链接检查器验证更新: `npm run check-links`');
  reportLines.push('');
  
  // 保存可读报告
  const readableFilename = `link-alternatives-readable-${new Date().toISOString().replace(/:/g, '-')}.md`;
  const readablePath = path.join(reportsDir, readableFilename);
  
  fs.writeFileSync(readablePath, reportLines.join('\n'));
  console.log(`人类可读报告已保存到: ${readablePath}`);
};

// 查找最新报告
const findLatestReport = () => {
  try {
    const reportsDir = path.join(__dirname, '..', config.reporting.reportsDir);
    
    if (!fs.existsSync(reportsDir)) {
      console.log(`报告目录不存在: ${reportsDir}`);
      return null;
    }
    
    // 读取目录中的所有文件
    const files = fs.readdirSync(reportsDir);
    
    // 筛选链接检查报告文件
    const reportFiles = files.filter(file => 
      file.startsWith('link-check-report-') && file.endsWith('.json')
    );
    
    if (reportFiles.length === 0) {
      console.log('未找到链接检查报告文件');
      return null;
    }
    
    // 获取最新的报告文件（按文件名中的时间戳排序）
    reportFiles.sort((a, b) => b.localeCompare(a)); // 逆序排列，最新的在前面
    
    return path.join(reportsDir, reportFiles[0]);
  } catch (error) {
    console.error('查找最新报告时出错:', error);
    return null;
  }
};

// 主函数
const main = async () => {
  try {
    console.log('替代链接建议工具启动...');
    await findAlternativeLinks();
    console.log('替代链接建议生成完成!');
  } catch (error) {
    console.error('生成替代链接建议时出错:', error);
  }
};

// 执行程序
main();
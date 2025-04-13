const axios = require('axios');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

// 导入配置
const config = require('./config');

// 创建一个简单的数据加载程序，从文件内容中提取数据
const loadData = () => {
  try {
    // 准备用于存储提取数据的对象
    const data = {
      models: [],
      datasets: [],
      tutorials: [],
      frameworks: [],
      specialResources: []
    };
    
    // 定义TypeScript文件路径
    const modelsPath = path.join(__dirname, '../app/data/models.ts');
    const datasetsPath = path.join(__dirname, '../app/data/datasets.ts');
    const tutorialsPath = path.join(__dirname, '../app/data/tutorials.ts');
    const frameworksPath = path.join(__dirname, '../app/data/frameworks.ts');
    const specialResourcesPath = path.join(__dirname, '../app/data/specialResources.ts');
    
    // 检查文件是否存在
    const filesExist = [
      fs.existsSync(modelsPath),
      fs.existsSync(datasetsPath),
      fs.existsSync(tutorialsPath),
      fs.existsSync(frameworksPath),
      fs.existsSync(specialResourcesPath)
    ];
    
    // 如果任何文件不存在，使用示例数据
    if (filesExist.some(exists => !exists)) {
      console.log('警告：部分数据文件不存在，使用示例数据进行测试');
      return loadSampleData();
    }
    
    console.log('开始直接提取TypeScript数据...');
    
    try {
      // 尝试直接为每种数据类型提取数据对象
      // 不再尝试解析TypeScript，而是直接复制出来进行处理
      
      // 读取Models文件
      if (fs.existsSync(modelsPath)) {
        console.log('处理models.ts文件');
        const modelItems = extractItemsFromFile(modelsPath);
        if (modelItems.length > 0) {
          console.log(`成功提取 ${modelItems.length} 个模型数据`);
          data.models = modelItems;
        }
      }
      
      // 读取Datasets文件
      if (fs.existsSync(datasetsPath)) {
        console.log('处理datasets.ts文件');
        const datasetItems = extractItemsFromFile(datasetsPath);
        if (datasetItems.length > 0) {
          console.log(`成功提取 ${datasetItems.length} 个数据集`);
          data.datasets = datasetItems;
        }
      }
      
      // 读取Tutorials文件
      if (fs.existsSync(tutorialsPath)) {
        console.log('处理tutorials.ts文件');
        const tutorialItems = extractItemsFromFile(tutorialsPath);
        if (tutorialItems.length > 0) {
          console.log(`成功提取 ${tutorialItems.length} 个教程`);
          data.tutorials = tutorialItems;
        }
      }
      
      // 读取Frameworks文件
      if (fs.existsSync(frameworksPath)) {
        console.log('处理frameworks.ts文件');
        const frameworkItems = extractItemsFromFile(frameworksPath);
        if (frameworkItems.length > 0) {
          console.log(`成功提取 ${frameworkItems.length} 个框架`);
          data.frameworks = frameworkItems;
        }
      }
      
      // 读取Special Resources文件
      if (fs.existsSync(specialResourcesPath)) {
        console.log('处理specialResources.ts文件');
        const specialItems = extractItemsFromFile(specialResourcesPath);
        if (specialItems.length > 0) {
          console.log(`成功提取 ${specialItems.length} 个特殊资源`);
          data.specialResources = specialItems;
        }
      }
      
      // 检查是否成功提取数据
      const dataCount = data.models.length + data.datasets.length + 
                        data.tutorials.length + data.frameworks.length + 
                        data.specialResources.length;
      
      if (dataCount === 0) {
        console.log('警告：未能从数据文件中提取数据，使用示例数据进行测试');
        return loadSampleData();
      }
      
      console.log(`数据加载成功 - 共加载了 ${dataCount} 个资源项目`);
      return data;
    } catch (parseError) {
      console.error('解析数据文件时出错:', parseError);
      console.log('使用示例数据作为后备方案');
      return loadSampleData();
    }
  } catch (error) {
    console.error('加载数据时出错:', error);
    return loadSampleData();
  }
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

// 加载示例数据作为后备方案
const loadSampleData = () => {
  const data = {
    models: [
      {
        id: 'gpt4',
        title: 'GPT-4',
        description: 'Advanced model by OpenAI',
        link: 'https://openai.com/gpt-4',
        tags: ['LLM', 'Text Generation'],
        category: 'Natural Language Processing',
        isFree: false
      },
      {
        id: 'llama2',
        title: 'LLaMA 2',
        description: 'Open-source LLM by Meta',
        link: 'https://ai.meta.com/llama/',
        tags: ['LLM', 'Open Source'],
        category: 'Natural Language Processing',
        isFree: true
      },
      {
        id: 'stable-diffusion',
        title: 'Stable Diffusion',
        description: 'Open-source image generation model',
        link: 'https://stability.ai/stable-diffusion',
        tags: ['Image Generation', 'Open Source'],
        category: 'Generative AI',
        isFree: true
      }
    ],
    datasets: [
      {
        id: 'imagenet',
        title: 'ImageNet',
        description: 'Large visual database for object recognition',
        link: 'https://www.image-net.org/',
        tags: ['Vision', 'Classification'],
        category: 'Computer Vision'
      },
      {
        id: 'coco',
        title: 'COCO',
        description: 'Common Objects in Context dataset',
        link: 'https://cocodataset.org/',
        tags: ['Object Detection', 'Segmentation'],
        category: 'Computer Vision'
      }
    ],
    tutorials: [
      {
        id: 'pytorch-basics',
        title: 'PyTorch Basics',
        description: 'Introduction to PyTorch framework',
        link: 'https://pytorch.org/tutorials/beginner/basics/intro.html',
        tags: ['Deep Learning', 'Framework'],
        category: 'Frameworks',
        difficulty: 'beginner'
      }
    ],
    frameworks: [
      {
        id: 'tensorflow',
        title: 'TensorFlow',
        description: 'Open-source ML framework developed by Google',
        link: 'https://www.tensorflow.org/',
        tags: ['Deep Learning', 'Framework'],
        category: 'Frameworks'
      },
      {
        id: 'pytorch',
        title: 'PyTorch',
        description: 'Open-source ML framework developed by Facebook',
        link: 'https://pytorch.org/',
        tags: ['Deep Learning', 'Framework'],
        category: 'Frameworks'
      }
    ],
    specialResources: [
      {
        id: 'huggingface',
        title: 'Hugging Face',
        description: 'Platform for sharing ML models and datasets',
        link: 'https://huggingface.co/',
        tags: ['Repository', 'Models', 'Datasets'],
        category: 'Platforms'
      }
    ]
  };
  
  console.log('使用示例数据进行测试');
  return data;
};

// 加载数据
const { models, datasets, tutorials, frameworks, specialResources } = loadData();

// 收集所有资源链接
const getAllResources = () => {
  const allResources = [
    ...models.map(item => ({ ...item })),
    ...datasets.map(item => ({ ...item })),
    ...tutorials.map(item => ({ ...item })),
    ...frameworks.map(item => ({ ...item })),
    ...specialResources.map(item => ({ ...item }))
  ];
  
  return allResources;
};

// 使用无头浏览器检查链接
const checkLinkWithBrowser = async (resource, link, addLog) => {
  if (!config.linkChecker.layeredChecking.enabled ||
      !config.linkChecker.layeredChecking.headlessBrowser.enabled) {
    return { status: 'error', errorMessage: '无头浏览器检测未启用' };
  }

  const browserConfig = config.linkChecker.layeredChecking.headlessBrowser;
  let browser = null;
  let page = null;
  
  // 检查是否是特殊站点，并获取相关配置
  const specialSiteConfig = getSpecialSiteConfig(link);
  
  // 如果是特殊站点，添加日志信息
  if (specialSiteConfig) {
    addLog(`检测到特殊站点: ${Object.keys(specialSiteConfig).find(key => specialSiteConfig === config.linkChecker.specialSites[key])}`);
  }
  
  try {
    addLog(`🌐 使用无头浏览器进行第二层检测: ${link}`);
    
    // 启动浏览器
    const launchOptions = {
      headless: browserConfig.headless,
      defaultViewport: {
        width: browserConfig.width,
        height: browserConfig.height
      },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    };
    
    // 如果指定了执行路径，则使用它
    if (browserConfig.executablePath) {
      launchOptions.executablePath = browserConfig.executablePath;
    }
    
    // 如果启用了代理，添加代理设置
    if (config.linkChecker.proxy && config.linkChecker.proxy.enabled) {
      const proxyConfig = config.linkChecker.proxy;
      const proxyUrl = `${proxyConfig.protocol}://${proxyConfig.host}:${proxyConfig.port}`;
      launchOptions.args.push(`--proxy-server=${proxyUrl}`);
      addLog(`使用代理设置: ${proxyUrl}`);
    }
    
    browser = await puppeteer.launch(launchOptions);
    addLog('浏览器已启动');
    
    // 创建新页面
    page = await browser.newPage();
    await page.setUserAgent(config.linkChecker.userAgent);
    addLog('页面已创建');
    
    // 设置超时
    page.setDefaultNavigationTimeout(browserConfig.timeout);
    page.setDefaultTimeout(browserConfig.timeout);
    
    // 导航到页面
    addLog(`正在导航到: ${link}`);
    const response = await page.goto(link, {
      waitUntil: browserConfig.defaultNavigationOptions.waitUntil,
      timeout: browserConfig.defaultNavigationOptions.timeout
    });
    
    // 等待页面加载 - 使用setTimeout替代waitForTimeout
    await new Promise(resolve => setTimeout(resolve, browserConfig.waitUntil));
    addLog(`页面加载等待: ${browserConfig.waitUntil}ms`);
    
    const status = response ? response.status() : null;
    addLog(`浏览器导航状态码: ${status}`);
    
    // 检查页面内容
    let contentValid = true;
    let errorMessage = '';
    
    // 使用特殊站点配置的检测方法，如果有的话
    const detectionMethod = specialSiteConfig?.detectionMethod || browserConfig.detectionMethod;
    
    if (detectionMethod === 'visual' || detectionMethod === 'both') {
      // 视觉检测 - 检查页面是否有内容
      const bodyHandle = await page.$('body');
      if (!bodyHandle) {
        contentValid = false;
        errorMessage = '未找到页面body元素';
        addLog('❌ 未找到页面body元素');
      } else {
        const boundingBox = await bodyHandle.boundingBox();
        await bodyHandle.dispose();
        
        // 对于特殊站点，如果配置了忽略空视觉内容，则不考虑这个错误
        if (!boundingBox || boundingBox.width === 0 || boundingBox.height === 0) {
          if (specialSiteConfig?.ignoreEmptyVisualContent) {
            addLog('⚠️ 页面视觉内容为空 (已忽略，特殊站点配置)');
          } else {
            contentValid = false;
            errorMessage = '页面视觉内容为空';
            addLog('❌ 页面视觉内容为空');
          }
        } else {
          addLog('✓ 页面有视觉内容');
        }
      }
    }
    
    if (detectionMethod === 'dom' || detectionMethod === 'both') {
      // DOM检测 - 确保页面有有效内容
      const bodyText = await page.evaluate(() => {
        return document.body ? document.body.innerText : '';
      });
      const contentLength = bodyText ? bodyText.length : 0;
      
      // 使用特殊站点配置的最小DOM内容长度，如果有的话
      const minContentLength = specialSiteConfig?.minDomContentLength || 50;
      
      if (contentLength < minContentLength) { // 假设少于50个字符的页面内容可能不完整
        contentValid = false;
        errorMessage = `页面内容太少 (${contentLength} 字符)`;
        addLog(`❌ 页面DOM内容太少: ${contentLength} 字符`);
      } else {
        addLog(`✓ 页面DOM内容充足: ${contentLength} 字符`);
      }
    }
    
    // 检查HTTP状态和内容
    // 对特殊站点，允许所有状态码
    const isStatusValid = specialSiteConfig?.treatAllStatusCodesAsValid || 
                          (status && config.linkChecker.validStatusCodes.includes(status));
    
    if (isStatusValid && contentValid) {
      addLog('✅ 无头浏览器确认链接有效');
      return { 
        status: 'valid', 
        statusCode: status,
        contentValid: true,
        method: 'browser'
      };
    } else {
      let reasonText = '';
      if (!isStatusValid) {
        reasonText = status 
          ? `状态码 ${status} 不在有效范围内` 
          : '无法获取状态码';
      }
      const finalMessage = contentValid ? reasonText : errorMessage;
      addLog(`❌ 无头浏览器检测失败: ${finalMessage}`);
      return { 
        status: 'invalid', 
        statusCode: status,
        contentValid: contentValid,
        errorMessage: finalMessage,
        method: 'browser'
      };
    }
  } catch (error) {
    const errorMsg = error.message || '未知错误';
    addLog(`❌ 无头浏览器出错: ${errorMsg}`);
    
    let status = 'error';
    if (errorMsg.includes('timeout') || errorMsg.includes('Navigation Timeout Exceeded')) {
      status = 'timeout';
      addLog('⏱ 浏览器导航超时');
    } else if (errorMsg.includes('net::ERR_CONNECTION_REFUSED')) {
      addLog('! 浏览器连接被拒绝');
    }
    
    return { 
      status, 
      errorMessage: errorMsg,
      method: 'browser'
    };
  } finally {
    try {
      // 关闭页面和浏览器
      if (page) await page.close();
      if (browser) await browser.close();
      addLog('浏览器已关闭');
    } catch (closeError) {
      addLog(`关闭浏览器时出错: ${closeError.message}`);
    }
  }
};

// 获取特殊站点配置
const getSpecialSiteConfig = (url) => {
  if (!config.linkChecker.specialSites) {
    return null;
  }
  
  for (const [siteName, siteConfig] of Object.entries(config.linkChecker.specialSites)) {
    if (siteConfig.domainPattern && siteConfig.domainPattern.test(url)) {
      return siteConfig;
    }
  }
  
  return null;
};

// 检查单个链接
const checkLink = async (resource) => {
  console.log(`检查链接: ${resource.title} (${resource.link})`);
  
  const result = {
    id: resource.id,
    title: resource.title,
    link: resource.link,
    category: resource.category,
    status: 'valid',
    attempts: 0, // 记录尝试次数
    logs: [] // 记录各种尝试和结果
  };

  const startTime = Date.now();
  
  // 检查是否是特殊站点
  const specialSiteConfig = getSpecialSiteConfig(resource.link);
  
  // 添加日志信息
  const addLog = (message) => {
    result.logs.push(`[${new Date().toISOString()}] ${message}`);
    if (config.reporting.verboseLogging) {
      console.log(`  - ${message}`);
    }
  };

  // 如果是特殊站点，记录日志
  if (specialSiteConfig) {
    const siteName = Object.keys(config.linkChecker.specialSites).find(
      key => config.linkChecker.specialSites[key] === specialSiteConfig
    );
    addLog(`识别到特殊站点: ${siteName}`);
  }

  // 创建axios请求配置
  const createRequestConfig = (method = 'HEAD') => {
    const requestConfig = {
      url: resource.link,
      method: method,
      timeout: config.linkChecker.timeout,
      headers: {
        'User-Agent': config.linkChecker.userAgent
      },
      maxRedirects: config.linkChecker.followRedirects ? config.linkChecker.maxRedirects : 0,
      validateStatus: function (status) {
        // 任何状态码都返回，我们会在结果中记录
        return true;
      }
    };
    
    // 如果启用了代理，添加代理配置
    if (config.linkChecker.proxy && config.linkChecker.proxy.enabled) {
      const proxyConfig = config.linkChecker.proxy;
      const proxyUrl = `${proxyConfig.protocol}://${proxyConfig.host}:${proxyConfig.port}`;
      requestConfig.proxy = {
        protocol: proxyConfig.protocol,
        host: proxyConfig.host,
        port: proxyConfig.port
      };
      addLog(`使用代理: ${proxyUrl}`);
    }
    
    return requestConfig;
  };

  // 重试机制
  const maxRetries = config.linkChecker.retry.maxRetries || 0;
  const retryDelay = config.linkChecker.retry.retryDelay || 1000;
  let httpSuccess = false;
  
  // 尝试使用HTTP请求检查链接
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      result.attempts++;
      
      if (attempt > 0) {
        addLog(`重试 #${attempt}...`);
        // 在重试之前等待一段时间
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
      
      // 先尝试HEAD请求
      addLog(`第一层检测: 发送HEAD请求...`);
      const response = await axios(createRequestConfig('HEAD'));
      
      result.statusCode = response.status;
      result.responseTime = Date.now() - startTime;
      result.contentType = response.headers['content-type'];
      result.lastModified = response.headers['last-modified'];
      result.headers = response.headers; // 保存完整响应头以供诊断
      
      addLog(`收到状态码: ${response.status}, 耗时: ${result.responseTime}ms`);
      
      // 检查状态码是否在有效范围内
      // 对于特殊站点，如果配置了认为所有状态码都有效，则跳过状态码检查
      const isValidStatus = specialSiteConfig?.treatAllStatusCodesAsValid || 
                             config.linkChecker.validStatusCodes.includes(response.status);
      
      if (isValidStatus) {
        result.status = 'valid';
        result.method = 'http';
        addLog(`✓ 链接有效 (HTTP ${response.status})`);
        httpSuccess = true;
        return result;
      } else {
        // 如果HEAD请求返回了无效状态码，尝试GET请求
        addLog(`HEAD请求返回无效状态码 ${response.status}，尝试GET请求...`);
        
        try {
          const getResponse = await axios(createRequestConfig('GET'));
          
          result.statusCode = getResponse.status;
          result.responseTime = Date.now() - startTime;
          result.contentType = getResponse.headers['content-type'];
          result.lastModified = getResponse.headers['last-modified'];
          
          addLog(`GET请求收到状态码: ${getResponse.status}, 耗时: ${result.responseTime}ms`);
          
          // 同样，对特殊站点检查是否接受所有状态码
          const isValidGetStatus = specialSiteConfig?.treatAllStatusCodesAsValid || 
                                 config.linkChecker.validStatusCodes.includes(getResponse.status);
          
          if (isValidGetStatus) {
            result.status = 'valid';
            result.method = 'http';
            addLog(`✓ 链接有效 (GET: HTTP ${getResponse.status})`);
            httpSuccess = true;
            return result;
          } else {
            result.status = 'invalid';
            result.method = 'http';
            result.errorMessage = `无效状态码: ${getResponse.status}`;
            addLog(`✗ 链接HTTP检测无效 (GET: HTTP ${getResponse.status})`);
          }
        } catch (getError) {
          // GET请求也失败
          result.errorMessage = getError.message || '未知错误';
          addLog(`GET请求失败: ${result.errorMessage}`);
          
          if (getError.code === 'ECONNABORTED') {
            result.status = 'timeout';
            addLog(`⏱ HTTP请求超时`);
          } else if (getError.code === 'ECONNREFUSED') {
            result.status = 'error';
            addLog(`! HTTP连接被拒绝`);
          } else {
            result.status = 'error';
            addLog(`! HTTP请求错误: ${getError.code || getError.message}`);
          }
          
          // 继续重试循环，如果还有重试次数
          if (attempt < maxRetries) {
            continue;
          }
        }
      }
    } catch (error) {
      // HEAD请求失败
      result.errorMessage = error.message || '未知错误';
      addLog(`HEAD请求失败: ${result.errorMessage} (${error.code || 'unknown'})`);
      
      if (error.code === 'ECONNABORTED') {
        result.status = 'timeout';
        addLog(`⏱ HTTP请求超时`);
      } else if (error.code === 'ECONNREFUSED') {
        result.status = 'error';
        addLog(`! HTTP连接被拒绝`);
      } else {
        result.status = 'error';
        addLog(`! HTTP请求错误: ${error.code || error.message}`);
      }
      
      // 尝试GET请求作为备选
      try {
        addLog(`尝试改用GET请求...`);
        const getResponse = await axios(createRequestConfig('GET'));
        
        result.statusCode = getResponse.status;
        result.responseTime = Date.now() - startTime;
        result.contentType = getResponse.headers['content-type'];
        result.lastModified = getResponse.headers['last-modified'];
        
        addLog(`GET请求收到状态码: ${getResponse.status}, 耗时: ${result.responseTime}ms`);
        
        // 同样，对特殊站点检查是否接受所有状态码
        const isValidGetStatus = specialSiteConfig?.treatAllStatusCodesAsValid || 
                               config.linkChecker.validStatusCodes.includes(getResponse.status);
        
        if (isValidGetStatus) {
          result.status = 'valid';
          result.method = 'http';
          addLog(`✓ 链接有效 (GET: HTTP ${getResponse.status})`);
          httpSuccess = true;
          return result;
        } else {
          result.status = 'invalid';
          result.method = 'http';
          result.errorMessage = `无效状态码: ${getResponse.status}`;
          addLog(`✗ 链接HTTP检测无效 (GET: HTTP ${getResponse.status})`);
        }
      } catch (getError) {
        // GET请求也失败
        result.errorMessage = getError.message || '未知错误';
        addLog(`GET请求也失败: ${result.errorMessage}`);
        
        if (getError.code === 'ECONNABORTED') {
          result.status = 'timeout';
          addLog(`⏱ HTTP请求超时`);
        } else if (getError.code === 'ECONNREFUSED') {
          result.status = 'error';
          addLog(`! HTTP连接被拒绝`);
        } else {
          result.status = 'error';
          addLog(`! HTTP请求错误: ${getError.code || getError.message}`);
        }
        
        // 继续重试循环，如果还有重试次数
        if (attempt < maxRetries) {
          continue;
        }
      }
    }
  }
  
  // 如果HTTP请求未成功，尝试使用无头浏览器进行第二层检测
  if (!httpSuccess && config.linkChecker.layeredChecking.enabled) {
    addLog('🔄 HTTP请求检测未成功，切换到无头浏览器第二层检测...');
    
    // 获取浏览器配置
    const browserConfig = config.linkChecker.layeredChecking.headlessBrowser;
    const maxBrowserRetries = browserConfig.retries || 0;
    let browserSuccess = false;
    let browserResult = null;
    
    // 尝试使用无头浏览器进行检测，包括重试机制
    for (let browserAttempt = 0; browserAttempt <= maxBrowserRetries; browserAttempt++) {
      if (browserAttempt > 0) {
        addLog(`浏览器检测重试 #${browserAttempt}...`);
        // 在浏览器重试之前等待
        await new Promise(resolve => setTimeout(resolve, retryDelay));
      }
      
      // 执行浏览器检测
      browserResult = await checkLinkWithBrowser(resource, resource.link, addLog);
      
      // 如果浏览器检测成功，跳出循环
      if (browserResult.status === 'valid') {
        browserSuccess = true;
        break;
      }
    }
    
    // 更新结果
    result.browserCheck = browserResult;
    
    // 如果浏览器检测成功，则更新状态为有效
    if (browserSuccess) {
      result.status = 'valid';
      result.statusCode = browserResult.statusCode;
      result.method = 'browser';
      addLog(`✅ 无头浏览器第二层检测成功，链接可访问`);
    } else if (browserConfig.treatErrorsAsValid || specialSiteConfig?.treatAllStatusCodesAsValid) {
      // 如果配置为将错误视为有效，也标记为有效
      result.status = 'valid';
      result.method = 'browser-fallback';
      result.validatedWithFallback = true;
      addLog(`⚠️ 无头浏览器检测失败，但已配置为将错误视为有效`);
    } else {
      // 保持原有错误状态，但添加浏览器检测信息
      result.errorMessage = `HTTP: ${result.errorMessage || result.status}; 浏览器: ${browserResult.errorMessage || browserResult.status}`;
      addLog(`❌ 无头浏览器第二层检测也失败，链接确认不可访问`);
    }
  }

  // 如果运行到这里，所有尝试都失败了
  if (result.status !== 'valid') {
    addLog(`❌ 所有检测方法均失败，链接确认不可访问`);
  }
  
  return result;
};

// 批量检查链接
const checkAllLinks = async (resources) => {
  console.log(`开始检查 ${resources.length} 个链接...`);
  
  const results = [];
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

// 生成人类可读报告
const generateHumanReadableReport = (reportData, reportsDir) => {
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
    '### 检测方法统计',
    `- HTTP请求成功: ${reportData.methodStats?.http || 0}`,
    `- 浏览器检测成功: ${reportData.methodStats?.browser || 0}`
  ];
  
  if (reportData.methodStats?.browserFallback > 0) {
    reportLines.push(`- 浏览器回退有效: ${reportData.methodStats.browserFallback}`);
  }
  
  // 添加无头浏览器检测统计
  if (reportData.methodStats?.browserCheckAttempts > 0) {
    reportLines.push('');
    reportLines.push('### 无头浏览器检测统计');
    reportLines.push(`- 总计尝试: ${reportData.methodStats.browserCheckAttempts}`);
    reportLines.push(`- 成功次数: ${reportData.methodStats.browser}`);
    reportLines.push(`- 成功率: ${reportData.methodStats.browserSuccessRate}%`);
  }
  
  reportLines.push('');
  reportLines.push('### 按资源类别统计问题链接');
  
  // 添加按类别统计
  Object.entries(reportData.invalidByCategory).forEach(([category, count]) => {
    reportLines.push(`- ${category}: ${count}`);
  });
  
  // 如果开启测试模式，添加测试模式说明
  if (reportData.testModeEnabled) {
    reportLines.push('');
    reportLines.push('### 测试模式信息');
    reportLines.push(`- 测试模式已启用，仅检查了${reportData.testModeLimitCount || 10}个链接`);
    reportLines.push('- 若要检查所有链接，请在config.js中将testMode.enabled设置为false');
  }
  
  reportLines.push('', '## 详细问题链接列表', '');
  
  // 添加问题链接详细信息
  if (reportData.problemLinks && reportData.problemLinks.length > 0) {
    reportData.problemLinks.forEach((link, index) => {
      reportLines.push(`### ${index + 1}. ${link.title}`);
      reportLines.push(`- ID: ${link.id}`);
      reportLines.push(`- 分类: ${link.category || '未分类'}`);
      reportLines.push(`- 链接: ${link.link}`);
      reportLines.push(`- 问题: ${link.status}${link.statusCode ? ` (HTTP ${link.statusCode})` : ''}`);
      if (link.errorMessage) reportLines.push(`- 错误信息: ${link.errorMessage}`);
      if (link.responseTime) reportLines.push(`- 响应时间: ${link.responseTime}ms`);
      if (link.contentType) reportLines.push(`- 内容类型: ${link.contentType}`);
      if (link.lastModified) reportLines.push(`- 最后修改: ${link.lastModified}`);
      
      // 添加尝试次数
      if (link.attempts) reportLines.push(`- HTTP尝试次数: ${link.attempts}`);
      
      // 添加浏览器检测信息
      if (link.browserCheck) {
        reportLines.push('');
        reportLines.push('#### 浏览器检测信息:');
        reportLines.push(`- 状态: ${link.browserCheck.status}`);
        if (link.browserCheck.statusCode) reportLines.push(`- 状态码: ${link.browserCheck.statusCode}`);
        if (link.browserCheck.errorMessage) reportLines.push(`- 错误信息: ${link.browserCheck.errorMessage}`);
      }
      
      // 如果有诊断日志，添加到报告中
      if (link.logs && link.logs.length > 0) {
        reportLines.push('');
        reportLines.push('#### 诊断日志:');
        reportLines.push('```');
        link.logs.forEach(log => {
          reportLines.push(log);
        });
        reportLines.push('```');
      }
      
      reportLines.push('');
    });
  } else {
    reportLines.push('没有发现问题链接，所有链接都是有效的。');
  }
  
  // 添加检查配置信息
  reportLines.push('## 检查配置');
  reportLines.push('');
  reportLines.push(`- 请求超时: ${config.linkChecker.timeout}ms`);
  reportLines.push(`- 批处理大小: ${config.linkChecker.batchSize}`);
  reportLines.push(`- 代理状态: ${config.linkChecker.proxy && config.linkChecker.proxy.enabled ? '启用' : '禁用'}`);
  if (config.linkChecker.proxy && config.linkChecker.proxy.enabled) {
    reportLines.push(`  - 代理地址: ${config.linkChecker.proxy.protocol}://${config.linkChecker.proxy.host}:${config.linkChecker.proxy.port}`);
  }
  reportLines.push(`- 重试次数: ${config.linkChecker.retry.maxRetries}`);
  reportLines.push(`- 有效状态码: ${config.linkChecker.validStatusCodes.join(', ')}`);
  
  // 添加无头浏览器配置信息
  if (config.linkChecker.layeredChecking && config.linkChecker.layeredChecking.enabled) {
    reportLines.push('');
    reportLines.push('### 无头浏览器配置');
    const browserConfig = config.linkChecker.layeredChecking.headlessBrowser;
    reportLines.push(`- 状态: ${browserConfig.enabled ? '启用' : '禁用'}`);
    reportLines.push(`- 超时: ${browserConfig.timeout}ms`);
    reportLines.push(`- 等待时间: ${browserConfig.waitUntil}ms`);
    reportLines.push(`- 检测方法: ${browserConfig.detectionMethod}`);
    reportLines.push(`- 重试次数: ${browserConfig.retries || 0}`);
  }
  
  reportLines.push('');
  
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

// 生成报告
const generateReport = (results) => {
  const validLinks = results.filter(result => result.status === 'valid');
  const invalidLinks = results.filter(result => result.status !== 'valid');
  
  // 按检测方法统计
  const methodStats = {
    http: results.filter(result => result.method === 'http' && result.status === 'valid').length,
    browser: results.filter(result => result.method === 'browser' && result.status === 'valid').length,
    browserFallback: results.filter(result => result.method === 'browser-fallback' && result.status === 'valid').length
  };
  
  // 获取需要使用浏览器检测的链接
  const requiredBrowserCheck = results.filter(result => result.browserCheck).length;
  const browserCheckSuccessful = results.filter(result => result.method === 'browser' && result.status === 'valid').length;
  const browserSuccessRate = requiredBrowserCheck ? Math.round((browserCheckSuccessful / requiredBrowserCheck) * 100) : 0;
  
  // 按问题类型分类
  const invalidByStatus = {
    invalid: invalidLinks.filter(link => link.status === 'invalid'),
    timeout: invalidLinks.filter(link => link.status === 'timeout'),
    error: invalidLinks.filter(link => link.status === 'error')
  };
  
  // 按类别分类问题链接
  const invalidByCategory = {};
  invalidLinks.forEach(link => {
    const category = link.category || '未分类';
    if (!invalidByCategory[category]) {
      invalidByCategory[category] = [];
    }
    invalidByCategory[category].push(link);
  });
  
  // 计算每种类型问题的平均响应时间
  const avgResponseTimes = {
    valid: validLinks.length > 0 
      ? Math.round(validLinks.reduce((sum, link) => sum + (link.responseTime || 0), 0) / validLinks.length) 
      : 0,
    invalid: invalidByStatus.invalid.length > 0 
      ? Math.round(invalidByStatus.invalid.reduce((sum, link) => sum + (link.responseTime || 0), 0) / invalidByStatus.invalid.length) 
      : 0,
    timeout: invalidByStatus.timeout.length > 0 
      ? Math.round(invalidByStatus.timeout.reduce((sum, link) => sum + (link.responseTime || 0), 0) / invalidByStatus.timeout.length) 
      : 0,
    error: invalidByStatus.error.length > 0 
      ? Math.round(invalidByStatus.error.reduce((sum, link) => sum + (link.responseTime || 0), 0) / invalidByStatus.error.length) 
      : 0
  };
  
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
    
    console.log('\n平均响应时间:');
    console.log(`- 有效链接: ${avgResponseTimes.valid}ms`);
    console.log(`- 无效状态码链接: ${avgResponseTimes.invalid}ms`);
    console.log(`- 超时链接: ${avgResponseTimes.timeout}ms`);
    console.log(`- 错误链接: ${avgResponseTimes.error}ms`);
  }
  
  // 显示检测方法统计
  console.log('\n检测方法统计:');
  console.log(`- HTTP请求成功: ${methodStats.http}`);
  console.log(`- 浏览器检测成功: ${methodStats.browser}`);
  if (methodStats.browserFallback > 0) {
    console.log(`- 浏览器回退有效: ${methodStats.browserFallback}`);
  }
  
  // 显示无头浏览器检测统计
  if (requiredBrowserCheck > 0) {
    console.log('\n无头浏览器检测统计:');
    console.log(`- 总计尝试: ${requiredBrowserCheck}`);
    console.log(`- 成功次数: ${browserCheckSuccessful}`);
    console.log(`- 成功率: ${browserSuccessRate}%`);
  }
  
  // 如果有使用代理，显示代理信息
  if (config.linkChecker.proxy && config.linkChecker.proxy.enabled) {
    console.log(`\n使用代理: ${config.linkChecker.proxy.protocol}://${config.linkChecker.proxy.host}:${config.linkChecker.proxy.port}`);
  }
  
  // 统计最常见的错误
  const errorCountMap = {};
  invalidLinks.forEach(link => {
    if (link.errorMessage) {
      const msg = link.errorMessage.split('\n')[0].trim(); // 只取第一行
      errorCountMap[msg] = (errorCountMap[msg] || 0) + 1;
    }
  });
  
  const topErrors = Object.entries(errorCountMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  if (topErrors.length > 0) {
    console.log('\n最常见的错误:');
    topErrors.forEach(([error, count]) => {
      console.log(`- ${error}: ${count}次`);
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
    methodStats: {
      ...methodStats,
      browserCheckAttempts: requiredBrowserCheck,
      browserSuccessRate: browserSuccessRate
    },
    avgResponseTimes,
    proxyInfo: config.linkChecker.proxy,
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
      lastModified: link.lastModified,
      attempts: link.attempts,
      logs: link.logs, // 添加诊断日志到报告
      browserCheck: link.browserCheck ? {
        status: link.browserCheck.status,
        statusCode: link.browserCheck.statusCode,
        errorMessage: link.browserCheck.errorMessage
      } : null
    })),
    allLinks: results.map(link => ({
      id: link.id,
      title: link.title,
      link: link.link,
      category: link.category,
      status: link.status,
      statusCode: link.statusCode,
      responseTime: link.responseTime,
      method: link.method
    })), // 保存所有链接的简化状态
    testModeEnabled: config.linkChecker.testMode && config.linkChecker.testMode.enabled,
    testModeLimitCount: config.linkChecker.testMode && config.linkChecker.testMode.limitCount
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

// 清理旧报告
const cleanupOldReports = (reportsDir) => {
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
    
    // 检查测试模式
    const testMode = config.linkChecker.testMode && config.linkChecker.testMode.enabled;
    const limitCount = testMode ? config.linkChecker.testMode.limitCount || 10 : 0;
    
    if (testMode) {
      console.log(`⚠️ 测试模式已启用 - 将只检查 ${limitCount} 个链接`);
    }
    
    let resources = getAllResources();
    console.log(`已加载 ${resources.length} 个资源链接`);
    
    if (resources.length === 0) {
      console.warn('警告：未找到任何资源链接，请检查数据文件是否正确加载');
      return;
    }
    
    // 如果测试模式启用，限制要处理的链接数量
    if (testMode && resources.length > limitCount) {
      console.log(`从 ${resources.length} 个链接中随机选择 ${limitCount} 个进行测试...`);
      
      // 为了确保测试的多样性，我们随机选择链接
      resources = shuffleArray(resources).slice(0, limitCount);
      
      console.log('测试模式链接选择完成');
    }
    
    // 显示所有待检查的链接
    console.log('待检查的链接:');
    resources.forEach((r, i) => {
      console.log(`${i+1}. ${r.title} - ${r.link}`);
    });
    
    console.log('\n=== 开始检查链接 ===\n');
    const results = await checkAllLinks(resources);
    console.log('\n=== 链接检查完成 ===\n');
    
    generateReport(results);
    
    if (testMode) {
      console.log('\n⚠️ 测试模式结果 - 总共检查了 ' + results.length + ' 个链接（限制为 ' + limitCount + ' 个）');
      console.log('要检查所有链接，请在 config.js 中将 testMode.enabled 设置为 false\n');
    }
    
    console.log('链接检查完成!');
  } catch (error) {
    console.error('链接检查过程中发生错误:', error);
    console.error(error.stack);
  }
};

// 随机打乱数组的辅助函数
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// 执行链接检查
main();
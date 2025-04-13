/**
 * 链接检查工具配置文件
 */

module.exports = {
  // 链接检查参数
  linkChecker: {
    // 测试模式设置
    testMode: {
      // 是否启用测试模式（启用时只检查有限数量的链接）
      enabled: false,
      // 测试模式下要检查的链接数量
      limitCount: 10
    },
    
    // 请求超时时间（毫秒）- 减少到5秒
    timeout: 5000,
    
    // 批处理大小（同时发起的请求数量）- 降低并发数减少超时几率
    batchSize: 5,
    
    // 用户代理标识
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    
    // 是否允许重定向
    followRedirects: true,
    
    // 最大重定向次数
    maxRedirects: 5,
    
    // 允许的状态码范围（将这些状态码视为有效）- 增加了更多有效状态码
    validStatusCodes: [200, 201, 202, 203, 204, 205, 206, 207, 208, 226, 
                      // 300系列重定向状态码也可能是有效的
                      300, 301, 302, 303, 304, 307, 308,
                      // 403有时是正常的（对无头浏览器的保护）
                      403],
    
    // 代理设置（用于国外网站访问）
    proxy: {
      enabled: false, // 默认关闭，根据需要可以开启
      host: '127.0.0.1',
      port: 7890, // Clash Verge默认端口通常为7890
      protocol: 'http' // 'http' 或 'https'
    },
    
    // 重试选项
    retry: {
      // 最大重试次数
      maxRetries: 2,
      // 重试之前的延迟时间（毫秒）
      retryDelay: 2000
    },
    
    // 分层检测配置
    layeredChecking: {
      // 是否启用分层检测
      enabled: true,
      
      // 无头浏览器第二层检测
      headlessBrowser: {
        // 是否启用无头浏览器检测
        enabled: true,
        
        // 浏览器超时时间（毫秒）
        timeout: 15000,
        
        // 等待页面加载的时间（毫秒）
        waitUntil: 3000,
        
        // 执行的浏览器
        executablePath: '', // 留空则使用Puppeteer默认安装的浏览器
        
        // 是否在真实无头模式下运行（设为false可以看到浏览器窗口，便于调试）
        headless: 'new', // 'new'表示使用新的无头模式
        
        // 使用的屏幕宽度
        width: 1280,
        
        // 使用的屏幕高度
        height: 800,
        
        // 默认导航选项
        defaultNavigationOptions: {
          waitUntil: 'domcontentloaded', // 'load', 'domcontentloaded', 'networkidle0', 'networkidle2'
          timeout: 15000
        },
        
        // 是否启用JavaScript
        javascript: true,
        
        // 检测方法 - 默认使用视觉验证和DOM检查
        detectionMethod: 'dom', // 'visual', 'dom', 'both'
        
        // 如果浏览器检测失败，是否仍然认为链接有效（适用于特殊情况）
        treatErrorsAsValid: false,
        
        // 自动重试次数
        retries: 1
      }
    },
    
    // 特殊站点配置（针对特定站点的特殊处理规则）
    specialSites: {
      // YouTube特别容易被无头浏览器检测阻止，当检测到YouTube链接时应用这些规则
      youtube: {
        // 匹配YouTube域名的正则表达式
        domainPattern: /youtube\.com/i,
        // 将YouTube链接的任何状态码视为有效（因为它们通常会阻止自动化工具）
        treatAllStatusCodesAsValid: true,
        // 完全使用DOM检测而非视觉检测（YouTube会对无头浏览器的视觉元素加载进行限制）
        detectionMethod: 'dom',
        // 忽略视觉内容为空的错误（针对YouTube这是正常现象）
        ignoreEmptyVisualContent: true,
        // 将最小DOM内容长度设置更低，因为YouTube可能返回较少的文本内容
        minDomContentLength: 20
      },
      // Reddit也可能会限制自动化访问
      reddit: {
        domainPattern: /reddit\.com/i,
        treatAllStatusCodesAsValid: true,
        detectionMethod: 'dom'
      }
    }
  },
  
  // 搜索替代链接参数
  alternativeSearch: {
    // 是否使用真实搜索API（如果设为false，将使用预定义结果）
    useRealSearch: false,
    
    // 搜索API类型：'custom-google' 或 'bing'
    searchApiType: 'custom-google',
    
    // 搜索API密钥（仅在useRealSearch为true时使用）
    searchApiKey: 'YOUR_API_KEY_HERE',
    
    // 谷歌搜索引擎ID（仅在searchApiType为'custom-google'时使用）
    googleSearchEngineId: 'YOUR_SEARCH_ENGINE_ID_HERE'
  },

  // 替代链接建议配置
  alternativeSuggestion: {
    // 是否使用真实搜索（如果为false，将使用预定义结果）
    useRealSearches: false,
    
    // 搜索提供商：'google' 或 'bing'
    searchProvider: 'google',
    
    // Google搜索API密钥（仅在searchProvider为'google'且useRealSearches为true时使用）
    googleApiKey: 'YOUR_GOOGLE_API_KEY_HERE',
    
    // Google搜索引擎ID
    googleSearchEngineId: 'YOUR_GOOGLE_SEARCH_ENGINE_ID_HERE',
    
    // Bing搜索API密钥（仅在searchProvider为'bing'且useRealSearches为true时使用）
    bingApiKey: 'YOUR_BING_API_KEY_HERE',
    
    // 搜索之间的延迟（毫秒），防止搜索API限制
    delayBetweenSearches: 2000
  },
  
  // 报告设置
  reporting: {
    // 输出目录（相对于项目根目录）
    reportsDir: 'reports',
    
    // 日志目录（相对于项目根目录）
    logsDir: 'logs',
    
    // 报告保留天数（超过此天数的报告将被自动删除）
    reportRetentionDays: 30,
    
    // 详细记录检查过程
    verboseLogging: true
  },
  
  // 日志设置
  logging: {
    // 日志目录（相对于项目根目录）
    logsDir: 'logs',
    
    // 日志保留天数
    logRetentionDays: 30
  },
  
  // 通知设置
  notifications: {
    // 电子邮件配置
    email: {
      // 是否启用邮件通知
      enabled: false,
      
      // SMTP服务器配置
      host: 'smtp.example.com',
      port: 587,
      secure: false,
      user: 'your-email@example.com',
      password: 'your-password',
      
      // 发件人
      from: 'AI Navigator <your-email@example.com>',
      
      // 收件人（可以是字符串或数组）
      to: 'admin@example.com',
      
      // 通知触发条件
      sendOnProblems: true,  // 发现问题链接时
      sendOnSuccess: false,  // 所有链接正常时
      sendOnErrors: true     // 执行过程中出错时
    }
  }
}; 
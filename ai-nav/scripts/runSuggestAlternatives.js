const { exec } = require('child_process');
const path = require('path');

// 执行替代链接生成器
console.log('启动替代链接建议工具...');

// 直接执行 JavaScript 版本
const cmd = `node ${path.join(__dirname, 'suggestAlternatives.js')}`;

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行出错: ${error.message}`);
    process.exit(1);
  }
  
  if (stderr) {
    console.error(`错误输出: ${stderr}`);
  }
  
  console.log(stdout);
  console.log('替代链接建议生成完成!');
}); 
const { exec } = require('child_process');
const path = require('path');

// 执行链接检查器
console.log('启动链接检查工具...');

// 直接执行 JavaScript 版本
const cmd = `node ${path.join(__dirname, 'linkChecker.js')}`;

exec(cmd, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行出错: ${error.message}`);
    process.exit(1);
  }
  
  if (stderr) {
    console.error(`错误输出: ${stderr}`);
  }
  
  console.log(stdout);
  console.log('链接检查完成!');
}); 
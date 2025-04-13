const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const nodemailer = require('nodemailer');

// 导入配置
const config = require('./config');

// 设置日志目录
const logDir = path.join(__dirname, '..', config.logging.logsDir);
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

/**
 * 定期链接检查脚本
 * 可以通过系统的计划任务（如Windows的任务计划程序或Linux的cron）定期运行此脚本
 * 它会运行链接检查器并将结果保存到日志文件
 */

// 记录日志的函数
const log = (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}`;
  console.log(logMessage);
  
  // 将日志写入文件
  const logFile = path.join(logDir, `link-check-${new Date().toISOString().slice(0, 10)}.log`);
  fs.appendFileSync(logFile, logMessage + '\n');
};

// 发送邮件通知
const sendEmailNotification = async (subject, content) => {
  if (!config.notifications.email.enabled) {
    log('邮件通知已禁用，跳过发送');
    return;
  }
  
  try {
    // 创建一个邮件传输器
    const transporter = nodemailer.createTransport({
      host: config.notifications.email.host,
      port: config.notifications.email.port,
      secure: config.notifications.email.secure,
      auth: {
        user: config.notifications.email.user,
        pass: config.notifications.email.password
      }
    });
    
    // 发送邮件
    await transporter.sendMail({
      from: config.notifications.email.from,
      to: config.notifications.email.to,
      subject: subject,
      text: content,
      html: content.replace(/\n/g, '<br>')
    });
    
    log('邮件通知发送成功');
  } catch (error) {
    log(`发送邮件通知时出错: ${error.message}`);
  }
};

// 准备邮件内容
const prepareEmailContent = (reportPath, readableReportPath, problemLinks) => {
  const content = [
    '<h1>AI导航网站链接检查报告</h1>',
    `<p>检查时间: ${new Date().toLocaleString()}</p>`,
    `<p>发现 ${problemLinks.length} 个问题链接</p>`,
    '<h2>问题链接摘要:</h2>',
    '<ul>'
  ];
  
  // 添加前10个问题链接
  const previewLinks = problemLinks.slice(0, 10);
  previewLinks.forEach(link => {
    content.push(`<li><strong>${link.title}</strong>: ${link.link} - ${link.status}</li>`);
  });
  
  if (problemLinks.length > 10) {
    content.push(`<li>... 以及其他 ${problemLinks.length - 10} 个问题链接</li>`);
  }
  
  content.push('</ul>');
  content.push('<p>详情请查看附件报告或系统中的完整报告。</p>');
  
  return content.join('\n');
};

// 检查链接函数
const checkLinks = () => {
  return new Promise((resolve, reject) => {
    log('开始执行链接检查...');
    
    // 执行链接检查脚本
    exec('node linkChecker.js', { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        log(`链接检查出错: ${error.message}`);
        log(`stderr: ${stderr}`);
        reject(error);
        return;
      }
      
      log(`链接检查完成: ${stdout}`);
      
      // 查找生成的报告
      const reportsDir = path.join(__dirname, '..', config.reporting.reportsDir);
      
      try {
        // 查找最新的报告文件
        const reportFiles = fs.readdirSync(reportsDir)
          .filter(file => file.startsWith('link-check-report-') && file.endsWith('.json'))
          .sort((a, b) => b.localeCompare(a)); // 按时间戳排序，最新的在前
        
        if (reportFiles.length === 0) {
          log('未找到链接检查报告文件');
          resolve({ success: false, error: '未找到链接检查报告文件' });
          return;
        }
        
        const reportFile = reportFiles[0];
        const reportPath = path.join(reportsDir, reportFile);
        
        // 查找可读报告
        const readableReportFiles = fs.readdirSync(reportsDir)
          .filter(file => file.startsWith('link-check-readable-') && file.endsWith('.md'))
          .sort((a, b) => b.localeCompare(a));
        
        let readableReportPath = null;
        if (readableReportFiles.length > 0) {
          readableReportPath = path.join(reportsDir, readableReportFiles[0]);
        }
        
        // 解析报告内容
        const reportContent = fs.readFileSync(reportPath, 'utf8');
        const report = JSON.parse(reportContent);
        
        log(`报告已解析: ${report.totalLinks} 个链接中发现 ${report.invalidLinks} 个问题`);
        
        resolve({
          success: true,
          reportPath,
          readableReportPath,
          report,
          problemLinks: report.problemLinks || []
        });
      } catch (error) {
        log(`解析报告时出错: ${error.message}`);
        reject(error);
      }
    });
  });
};

// 生成替代建议函数
const suggestAlternatives = () => {
  return new Promise((resolve, reject) => {
    log('开始生成替代链接建议...');
    
    // 执行替代链接建议脚本
    exec('node suggestAlternatives.js', { cwd: __dirname }, (error, stdout, stderr) => {
      if (error) {
        log(`生成替代链接建议出错: ${error.message}`);
        log(`stderr: ${stderr}`);
        reject(error);
        return;
      }
      
      log(`替代链接建议完成: ${stdout}`);
      
      // 查找生成的替代建议报告
      const reportsDir = path.join(__dirname, '..', config.reporting.reportsDir);
      
      try {
        // 查找最新的替代建议报告文件
        const alternativesFiles = fs.readdirSync(reportsDir)
          .filter(file => file.startsWith('link-alternatives-') && file.endsWith('.json'))
          .sort((a, b) => b.localeCompare(a)); // 按时间戳排序，最新的在前
        
        if (alternativesFiles.length === 0) {
          log('未找到替代建议报告文件');
          resolve({ success: false, error: '未找到替代建议报告文件' });
          return;
        }
        
        const alternativesFile = alternativesFiles[0];
        const alternativesPath = path.join(reportsDir, alternativesFile);
        
        // 查找可读替代建议报告
        const readableAlternativesFiles = fs.readdirSync(reportsDir)
          .filter(file => file.startsWith('link-alternatives-readable-') && file.endsWith('.md'))
          .sort((a, b) => b.localeCompare(a));
        
        let readableAlternativesPath = null;
        if (readableAlternativesFiles.length > 0) {
          readableAlternativesPath = path.join(reportsDir, readableAlternativesFiles[0]);
        }
        
        resolve({
          success: true,
          alternativesPath,
          readableAlternativesPath
        });
      } catch (error) {
        log(`解析替代建议报告时出错: ${error.message}`);
        reject(error);
      }
    });
  });
};

// 清理旧日志
const cleanupOldLogs = () => {
  try {
    log('开始清理旧日志...');
    
    const files = fs.readdirSync(logDir);
    const now = new Date();
    const maxAgeMs = config.logging.logRetentionDays * 24 * 60 * 60 * 1000;
    
    let cleanedCount = 0;
    
    files.forEach(file => {
      const filePath = path.join(logDir, file);
      const stats = fs.statSync(filePath);
      const fileAge = now.getTime() - stats.mtime.getTime();
      
      if (fileAge > maxAgeMs) {
        fs.unlinkSync(filePath);
        cleanedCount++;
      }
    });
    
    log(`清理完成，删除了 ${cleanedCount} 个过期日志文件`);
  } catch (error) {
    log(`清理旧日志时出错: ${error.message}`);
  }
};

// 主函数
const main = async () => {
  try {
    log('定时链接检查任务开始执行');
    
    // 检查链接
    const checkResult = await checkLinks();
    
    if (!checkResult.success) {
      log('链接检查失败，任务终止');
      return;
    }
    
    const { reportPath, readableReportPath, report, problemLinks } = checkResult;
    
    // 如果存在问题链接，生成替代建议
    if (problemLinks.length > 0) {
      log(`发现 ${problemLinks.length} 个问题链接，正在生成替代建议...`);
      
      const suggestResult = await suggestAlternatives();
      
      if (suggestResult.success) {
        log('替代建议生成成功');
        
        // 发送通知
        if (config.notifications.email.sendOnProblems) {
          const emailSubject = `[AI导航] 发现 ${problemLinks.length} 个问题链接`;
          const emailContent = prepareEmailContent(
            reportPath, 
            readableReportPath, 
            problemLinks
          );
          
          await sendEmailNotification(emailSubject, emailContent);
        }
      } else {
        log('替代建议生成失败');
      }
    } else {
      log('所有链接正常，无需生成替代建议');
      
      // 如果配置为在所有链接正常时也发送通知
      if (config.notifications.email.sendOnSuccess) {
        const emailSubject = '[AI导航] 链接检查完成 - 所有链接正常';
        const emailContent = `
          <h1>AI导航网站链接检查报告</h1>
          <p>检查时间: ${new Date().toLocaleString()}</p>
          <p>所有链接都正常工作！</p>
          <p>共检查了 ${report.totalLinks} 个链接。</p>
        `;
        
        await sendEmailNotification(emailSubject, emailContent);
      }
    }
    
    // 清理旧日志
    cleanupOldLogs();
    
    log('定时链接检查任务执行完成');
  } catch (error) {
    log(`执行定时链接检查任务时发生错误: ${error.message}`);
    
    // 发送错误通知
    if (config.notifications.email.sendOnErrors) {
      const emailSubject = '[AI导航] 链接检查过程中发生错误';
      const emailContent = `
        <h1>AI导航网站链接检查错误</h1>
        <p>检查时间: ${new Date().toLocaleString()}</p>
        <p>执行链接检查过程中发生错误:</p>
        <pre>${error.stack || error.message}</pre>
      `;
      
      await sendEmailNotification(emailSubject, emailContent);
    }
  }
};

// 执行主函数
main(); 
# AI导航网站链接检查工具

这个目录包含了自动检查和维护AI导航网站链接的工具。这些工具可以帮助您识别失效链接，并提供可能的替代链接建议。

## 可用工具

### 1. 链接检查器 (linkChecker.ts)

检查所有资源链接的有效性，生成包含问题链接信息的报告。

**使用方法:**
```bash
npm run check-links
```

### 2. 替代链接建议生成器 (suggestAlternatives.ts)

分析链接检查报告，为问题链接提供可能的替代链接建议。

**使用方法:**
```bash
npm run suggest-alternatives
```

### 3. 一键链接更新 (update-links)

依次运行链接检查和替代建议生成器。

**使用方法:**
```bash
npm run update-links
```

### 4. 定期链接检查 (scheduledLinkCheck.js)

可通过系统计划任务定期运行的链接检查脚本，执行完整的检查并生成报告。

**使用方法:**
```bash
npm run scheduled-check
```

## 如何设置定期自动检查

### Windows (使用任务计划程序)

1. 打开任务计划程序
2. 创建基本任务
3. 设置任务名称和描述 (例如: "AI导航网站链接检查")
4. 设置触发器 (例如: 每周一次)
5. 设置操作为启动程序
6. 程序/脚本: `npm`
7. 添加参数: `run scheduled-check`
8. 起始位置: 项目的绝对路径 (例如: `E:\项目路径\ai-nav`)
9. 完成设置

### Linux/macOS (使用cron)

1. 打开终端
2. 编辑crontab: `crontab -e`
3. 添加定时任务 (例如每周一凌晨2点运行):
   ```
   0 2 * * 1 cd /path/to/ai-nav && npm run scheduled-check
   ```
4. 保存并退出编辑器

## 输出文件

工具运行后会在以下位置生成输出文件:

- **链接检查报告**: `ai-nav/reports/link-check-report-*.json`
- **替代链接建议**: `ai-nav/reports/link-alternatives-*.json`
- **人类可读报告**: `ai-nav/reports/link-alternatives-readable-*.md`
- **操作日志**: `ai-nav/logs/link-check.log`

## 如何更新失效链接

1. 查看最新的人类可读报告 (link-alternatives-readable-*.md)
2. 检查推荐的替代链接
3. 在相应的数据文件中 (models.ts, datasets.ts 等) 找到问题链接
4. 使用建议的替代链接替换失效链接
5. 重新运行链接检查以验证更新后的链接是否有效 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // 扫描 app 目录下的文件
    "./components/**/*.{js,ts,jsx,tsx,mdx}", // 如果有 components 目录也扫描
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} 
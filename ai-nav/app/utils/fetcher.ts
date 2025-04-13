// 通用数据获取工具

/**
 * 通用 fetcher 函数，用于 SWR
 * 用于获取 JSON 数据
 */
export const fetcher = async (url: string) => {
  const res = await fetch(url);
  
  // 如果请求失败，抛出错误
  if (!res.ok) {
    const error = new Error('获取数据时出错');
    // 添加额外信息到错误对象
    (error as any).info = await res.json();
    (error as any).status = res.status;
    throw error;
  }
  
  return res.json();
};

/**
 * 带缓存控制的 fetcher
 * 允许设置缓存时间
 */
export const fetchWithCache = (url: string, cacheTime = 3600) => {
  // 为 URL 添加缓存破坏参数
  const now = new Date();
  // 根据缓存时间计算缓存标识符
  // 例如，如果缓存时间是 3600 秒（1小时），每小时生成一个新值
  const cacheBreaker = Math.floor(now.getTime() / (cacheTime * 1000));
  
  const urlWithCache = `${url}${url.includes('?') ? '&' : '?'}_cache=${cacheBreaker}`;
  
  return fetcher(urlWithCache);
};

/**
 * 本地数据获取工具
 * 从本地 JSON 文件获取数据
 */
export async function fetchLocalData<T>(path: string): Promise<T> {
  try {
    // 在生产环境中，这将从服务器获取
    // 在开发环境中，这将从公共目录获取
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error("Error fetching local data:", error);
    throw error;
  }
} 
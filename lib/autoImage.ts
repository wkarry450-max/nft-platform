// 自动图片匹配工具函数
import { NFT } from '@/types/nft';

/**
 * 从 NFT 名称中提取关键词
 * 移除 #编号、数字等，只保留核心词
 */
function extractKeywords(name: string): string {
  // 移除 # 和后面的数字编号
  let keywords = name.replace(/#\d+/g, '').trim();
  
  // 移除开头的数字和空格
  keywords = keywords.replace(/^\d+\s*/, '').trim();
  
  // 移除常见的分隔符，替换为空格
  keywords = keywords.replace(/[_-]/g, ' ').trim();
  
  // 如果为空，返回默认值
  if (!keywords) {
    return 'digital art';
  }
  
  return keywords;
}

/**
 * 根据 NFT 生成 Unsplash 图片 URL
 * 使用 source.unsplash.com 服务，无需 API Key
 */
export function getAutoImageUrl(nft: NFT): string {
  const keywords = extractKeywords(nft.metadata.name);
  
  // 使用 Unsplash Source API
  // 格式: https://source.unsplash.com/800x800/?<keywords>
  // 注意：Unsplash Source API 已被弃用，但仍在工作
  const encodedKeywords = encodeURIComponent(keywords);
  return `https://source.unsplash.com/800x800/?${encodedKeywords}`;
}


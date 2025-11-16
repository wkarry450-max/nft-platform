// NFT 工具函数
import { NFT, NFTMetadata } from '@/types/nft';

// 模拟 NFT 数据（实际项目中应该从链上或 API 获取）
export const mockNFTs: NFT[] = [
  {
    id: '1',
    tokenId: '1',
    contractAddress: '0x1234567890123456789012345678901234567890',
    metadata: {
      name: 'Cosmic Explorer #1',
      description: '一个探索宇宙奥秘的数字艺术品，融合了未来科技与神秘美学。',
      image: 'https://picsum.photos/800/800?random=1',
      animation_url: undefined,
      attributes: [
        { trait_type: 'Rarity', value: 'Legendary' },
        { trait_type: 'Power', value: 95 },
        { trait_type: 'Speed', value: 88 },
        { trait_type: 'Element', value: 'Cosmic' },
        { trait_type: 'Background', value: 'Nebula' },
      ],
    },
    price: '0.5',
    mintedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    tokenId: '2',
    contractAddress: '0x1234567890123456789012345678901234567890',
    metadata: {
      name: 'Digital Phoenix #2',
      description: '象征重生与永恒的数字凤凰，每一根羽毛都闪烁着代码的光芒。',
      image: 'https://picsum.photos/800/800?random=2',
      attributes: [
        { trait_type: 'Rarity', value: 'Epic' },
        { trait_type: 'Power', value: 82 },
        { trait_type: 'Speed', value: 92 },
        { trait_type: 'Element', value: 'Fire' },
        { trait_type: 'Background', value: 'Inferno' },
      ],
    },
    price: '0.3',
    mintedAt: new Date('2024-01-16'),
  },
  {
    id: '3',
    tokenId: '3',
    contractAddress: '0x1234567890123456789012345678901234567890',
    metadata: {
      name: 'Neon Dreams #3',
      description: '霓虹梦境中的赛博朋克世界，每一个像素都诉说着未来的故事。',
      image: 'https://picsum.photos/800/800?random=3',
      attributes: [
        { trait_type: 'Rarity', value: 'Rare' },
        { trait_type: 'Power', value: 75 },
        { trait_type: 'Speed', value: 85 },
        { trait_type: 'Element', value: 'Electric' },
        { trait_type: 'Background', value: 'Cyberpunk' },
      ],
    },
    price: '0.2',
    mintedAt: new Date('2024-01-17'),
  },
  {
    id: '4',
    tokenId: '4',
    contractAddress: '0x1234567890123456789012345678901234567890',
    metadata: {
      name: 'Ocean Depths #4',
      description: '深海的秘密花园，数字化的海洋生物在虚拟世界中游弋。',
      image: 'https://picsum.photos/800/800?random=4',
      attributes: [
        { trait_type: 'Rarity', value: 'Common' },
        { trait_type: 'Power', value: 65 },
        { trait_type: 'Speed', value: 70 },
        { trait_type: 'Element', value: 'Water' },
        { trait_type: 'Background', value: 'Abyss' },
      ],
    },
    price: '0.1',
    mintedAt: new Date('2024-01-18'),
  },
  {
    id: '5',
    tokenId: '5',
    contractAddress: '0x1234567890123456789012345678901234567890',
    metadata: {
      name: 'Forest Guardian #5',
      description: '守护数字森林的古老精灵，连接着自然与科技的桥梁。',
      image: 'https://picsum.photos/800/800?random=5',
      attributes: [
        { trait_type: 'Rarity', value: 'Epic' },
        { trait_type: 'Power', value: 88 },
        { trait_type: 'Speed', value: 78 },
        { trait_type: 'Element', value: 'Nature' },
        { trait_type: 'Background', value: 'Enchanted Forest' },
      ],
    },
    price: '0.35',
    mintedAt: new Date('2024-01-19'),
  },
  {
    id: '6',
    tokenId: '6',
    contractAddress: '0x1234567890123456789012345678901234567890',
    metadata: {
      name: 'Stellar Warrior #6',
      description: '来自星系的战士，手持光剑，守护着数字宇宙的和平。',
      image: 'https://picsum.photos/800/800?random=6',
      attributes: [
        { trait_type: 'Rarity', value: 'Legendary' },
        { trait_type: 'Power', value: 98 },
        { trait_type: 'Speed', value: 90 },
        { trait_type: 'Element', value: 'Light' },
        { trait_type: 'Background', value: 'Galaxy' },
      ],
    },
    price: '0.6',
    mintedAt: new Date('2024-01-20'),
  },
];

// 获取所有 NFT
export const getAllNFTs = async (): Promise<NFT[]> => {
  // 模拟 API 延迟
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockNFTs;
};

// 根据 ID 获取 NFT
export const getNFTById = async (id: string): Promise<NFT | null> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return mockNFTs.find((nft) => nft.id === id) || null;
};

// 从 IPFS 或 URL 获取 Metadata
export const fetchNFTMetadata = async (uri: string): Promise<NFTMetadata> => {
  const response = await fetch(uri);
  if (!response.ok) {
    throw new Error('Failed to fetch NFT metadata');
  }
  return response.json();
};


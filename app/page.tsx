'use client';

import { useState } from 'react';
import { NFT } from '@/types/nft';
import { mockNFTs } from '@/lib/nft';
import { getAutoImageUrl } from '@/lib/autoImage';
import NFTCard from '@/components/NFTCard';
import WalletButton from '@/components/WalletButton';
import ParticleBackground from '@/components/ParticleBackground';
import WebGLBackground from '@/components/WebGLBackground';
import { motion } from 'framer-motion';

export default function Home() {
  const [nfts, setNfts] = useState<NFT[]>(mockNFTs);
  const [isSearchingImages, setIsSearchingImages] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleAutoImageSearch = () => {
    setIsSearchingImages(true);
    
    // 模拟异步操作，给用户一个反馈
    setTimeout(() => {
      setNfts(prev =>
        prev.map(nft => ({
          ...nft,
          metadata: {
            ...nft.metadata,
            image: getAutoImageUrl(nft),
          },
        }))
      );
      setIsSearchingImages(false);
      setHasSearched(true);
    }, 500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <WebGLBackground />

      {/* 导航栏 */}
      <nav className="relative z-10 flex items-center justify-between p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            NFT 数字藏品平台
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WalletButton />
        </motion.div>
      </nav>

      {/* 主内容 */}
      <main className="relative z-10 container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            探索数字藏品
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-6">
            发现独特的 NFT 艺术品，连接钱包开始您的数字收藏之旅
          </p>
          
          {/* 一键智能图片搜索按钮 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAutoImageSearch}
            disabled={isSearchingImages}
            className={`px-6 py-3 rounded-full font-semibold shadow-lg transition-all duration-300 ${
              hasSearched
                ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl'
            } ${isSearchingImages ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSearchingImages ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>正在为 NFT 匹配图片…</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span>
                  {hasSearched ? '已为 NFT 自动配图' : '一键智能图片搜索'}
                </span>
              </div>
            )}
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {nfts.map((nft, index) => (
            <NFTCard key={nft.id} nft={nft} index={index} />
          ))}
        </div>

        {nfts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              暂无 NFT 藏品
            </p>
          </div>
        )}
      </main>
    </div>
  );
}


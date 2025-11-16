'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { NFT } from '@/types/nft';
import { getNFTById } from '@/lib/nft';
import NFTDetail from '@/components/NFTDetail';
import MintButton from '@/components/MintButton';
import WalletButton from '@/components/WalletButton';
import ParticleBackground from '@/components/ParticleBackground';
import WebGLBackground from '@/components/WebGLBackground';
import { motion } from 'framer-motion';

export default function NFTDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [nft, setNft] = useState<NFT | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadNFT = async () => {
      try {
        const id = params.id as string;
        const data = await getNFTById(id);
        if (data) {
          setNft(data);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('加载 NFT 失败:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      loadNFT();
    }
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!nft) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ParticleBackground />
      <WebGLBackground />

      {/* 导航栏 */}
      <nav className="relative z-10 flex items-center justify-between p-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
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
              d="M15 19l-7-7 7-7"
            />
          </svg>
          返回
        </motion.button>
        <WalletButton />
      </nav>

      {/* NFT 详情 */}
      <div className="relative z-10">
        <NFTDetail
          nft={nft}
          onImageUpdate={(imageUrl) => {
            // 更新NFT的图片URL
            setNft({
              ...nft,
              metadata: {
                ...nft.metadata,
                image: imageUrl,
              },
            });
          }}
        />
        
        {/* Mint 按钮区域 */}
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              立即 Mint
            </h2>
            <MintButton
              nft={nft}
              onMintSuccess={(txHash) => {
                console.log('Mint 成功:', txHash);
              }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}


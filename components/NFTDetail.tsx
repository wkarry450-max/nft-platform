'use client';

import { NFT } from '@/types/nft';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface NFTDetailProps {
  nft: NFT;
  onImageUpdate?: (imageUrl: string) => void;
}

export default function NFTDetail({ nft, onImageUpdate }: NFTDetailProps) {
  const [currentImageUrl, setCurrentImageUrl] = useState(nft.metadata.image);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // 当NFT变化时更新图片
  useEffect(() => {
    setCurrentImageUrl(nft.metadata.image);
    setImageLoaded(false);
    setImageError(false);
  }, [nft.metadata.image]);

  // 处理图片更新
  const handleImageUpdate = (imageUrl: string) => {
    setCurrentImageUrl(imageUrl);
    setImageLoaded(false);
    setImageError(false);
    if (onImageUpdate) {
      onImageUpdate(imageUrl);
    }
  };

  // 准备图表数据
  const attributeData =
    nft.metadata.attributes
      ?.filter((attr) => typeof attr.value === 'number')
      .map((attr) => ({
        name: attr.trait_type,
        value: attr.value,
      })) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* 左侧：NFT 图片 */}
          <div className="relative space-y-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900"
            >
              {!imageLoaded && !imageError && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              {imageError ? (
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-10">
                  <svg
                    className="w-32 h-32"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              ) : (
                <img
                  key={currentImageUrl}
                  src={currentImageUrl}
                  alt={nft.metadata.name}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => {
                    setImageError(true);
                    setImageLoaded(true);
                  }}
                />
              )}
            </motion.div>
          </div>

          {/* 右侧：NFT 信息 */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {nft.metadata.name}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {nft.metadata.description}
              </p>
            </motion.div>

            {/* 价格和基本信息 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 gap-4"
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">价格</p>
                <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                  {nft.price} ETH
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Token ID</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  #{nft.tokenId}
                </p>
              </div>
            </motion.div>

            {/* 属性 */}
            {nft.metadata.attributes && nft.metadata.attributes.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  属性
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {nft.metadata.attributes.map((attr, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                      className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg p-3"
                    >
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        {attr.trait_type}
                      </p>
                      <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {attr.value}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 图表 */}
            {attributeData.length > 0 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  属性统计
                </h2>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={attributeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#6366f1" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}


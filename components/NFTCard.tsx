'use client';

import { NFT } from '@/types/nft';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

interface NFTCardProps {
  nft: NFT;
  index: number;
}

export default function NFTCard({ nft, index }: NFTCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <Link href={`/nft/${nft.id}`}>
        <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900 dark:to-purple-900">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center z-10">
              <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
          {imageError ? (
            <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-10">
              <svg
                className="w-24 h-24"
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
              src={nft.metadata.image}
              alt={nft.metadata.name}
              className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                setImageError(true);
                setImageLoaded(true);
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
        </div>

        <div className="p-5">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
            {nft.metadata.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
            {nft.metadata.description}
          </p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 dark:text-gray-400">价格</p>
              <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                {nft.price} ETH
              </p>
            </div>
            {nft.metadata.attributes && nft.metadata.attributes.length > 0 && (
              <div className="text-right">
                <p className="text-xs text-gray-500 dark:text-gray-400">稀有度</p>
                <p className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                  {nft.metadata.attributes[0]?.value}
                </p>
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}


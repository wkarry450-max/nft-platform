'use client';

import { NFT } from '@/types/nft';
import { useWallet } from '@/contexts/WalletContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { simulateMint } from '@/lib/web3';

interface MintButtonProps {
  nft: NFT;
  onMintSuccess?: (txHash: string) => void;
}

export default function MintButton({ nft, onMintSuccess }: MintButtonProps) {
  const { wallet } = useWallet();
  const [isMinting, setIsMinting] = useState(false);
  const [mintStatus, setMintStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [txHash, setTxHash] = useState<string | null>(null);

  const handleMint = async () => {
    if (!wallet.isConnected) {
      alert('请先连接钱包');
      return;
    }

    setIsMinting(true);
    setMintStatus('idle');

    try {
      const result = await simulateMint(
        nft.contractAddress,
        nft.tokenId,
        nft.metadata
      );

      if (result.success && result.txHash) {
        setMintStatus('success');
        setTxHash(result.txHash);
        if (onMintSuccess) {
          onMintSuccess(result.txHash);
        }
      } else {
        setMintStatus('error');
      }
    } catch (error) {
      console.error('Mint 失败:', error);
      setMintStatus('error');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="space-y-4">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleMint}
        disabled={isMinting || !wallet.isConnected}
        className={`w-full px-8 py-4 rounded-xl font-bold text-lg shadow-lg transition-all duration-300 ${
          wallet.isConnected
            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl'
            : 'bg-gray-300 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
        } ${isMinting ? 'opacity-75 cursor-wait' : ''}`}
      >
        {isMinting ? (
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Minting...</span>
          </div>
        ) : (
          `Mint - ${nft.price} ETH`
        )}
      </motion.button>

      <AnimatePresence>
        {mintStatus === 'success' && txHash && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4"
          >
            <p className="text-green-800 dark:text-green-200 font-semibold mb-2">
              ✅ Mint 成功！
            </p>
            <p className="text-sm text-green-600 dark:text-green-300 break-all">
              交易哈希: {txHash}
            </p>
          </motion.div>
        )}

        {mintStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4"
          >
            <p className="text-red-800 dark:text-red-200 font-semibold">
              ❌ Mint 失败，请重试
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


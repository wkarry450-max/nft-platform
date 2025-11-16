'use client';

import { useWallet } from '@/contexts/WalletContext';
import { motion } from 'framer-motion';

export default function WalletButton() {
  const { wallet, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={wallet.isConnected ? disconnectWallet : connectWallet}
      className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
    >
      {wallet.isConnected && wallet.address ? (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span>{formatAddress(wallet.address)}</span>
        </div>
      ) : (
        '连接钱包'
      )}
    </motion.button>
  );
}


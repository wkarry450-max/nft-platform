'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { WalletState, WalletContextType } from '@/types/wallet';
import { connectWallet, getWalletInfo } from '@/lib/web3';

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    isConnected: false,
    chainId: null,
    balance: null,
  });

  // 检查是否已连接钱包
  useEffect(() => {
    const checkWallet = async () => {
      const info = await getWalletInfo();
      if (info) {
        setWallet({
          address: info.address,
          isConnected: true,
          chainId: info.chainId,
          balance: info.balance,
        });
      }
    };

    checkWallet();

    // 监听账户变化
    if (typeof window !== 'undefined' && window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          setWallet({
            address: null,
            isConnected: false,
            chainId: null,
            balance: null,
          });
        } else {
          checkWallet();
        }
      });

      window.ethereum.on('chainChanged', () => {
        checkWallet();
      });
    }
  }, []);

  const connectWalletHandler = async () => {
    try {
      const info = await connectWallet();
      setWallet({
        address: info.address,
        isConnected: true,
        chainId: info.chainId,
        balance: info.balance,
      });
    } catch (error: any) {
      console.error('连接钱包失败:', error);
      alert(error.message || '连接钱包失败，请重试');
    }
  };

  const disconnectWallet = () => {
    setWallet({
      address: null,
      isConnected: false,
      chainId: null,
      balance: null,
    });
  };

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connectWallet: connectWalletHandler,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};


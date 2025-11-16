// Web3 工具函数
import { ethers } from 'ethers';

export const connectWallet = async (): Promise<{
  address: string;
  chainId: number;
  balance: string;
}> => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('请安装 MetaMask 或其他 Web3 钱包');
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const accounts = await provider.send('eth_requestAccounts', []);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();
  const network = await provider.getNetwork();
  const balance = await provider.getBalance(address);

  return {
    address,
    chainId: Number(network.chainId),
    balance: ethers.formatEther(balance),
  };
};

export const getWalletInfo = async (): Promise<{
  address: string;
  chainId: number;
  balance: string;
} | null> => {
  if (typeof window === 'undefined' || !window.ethereum) {
    return null;
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send('eth_accounts', []);
    
    if (accounts.length === 0) {
      return null;
    }

    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const network = await provider.getNetwork();
    const balance = await provider.getBalance(address);

    return {
      address,
      chainId: Number(network.chainId),
      balance: ethers.formatEther(balance),
    };
  } catch (error) {
    console.error('获取钱包信息失败:', error);
    return null;
  }
};

// 模拟 Mint 函数（不需要真实合约）
export const simulateMint = async (
  contractAddress: string,
  tokenId: string,
  metadata: any
): Promise<{ success: boolean; txHash?: string }> => {
  // 模拟异步操作
  await new Promise((resolve) => setTimeout(resolve, 2000));
  
  // 生成模拟交易哈希
  const mockTxHash = '0x' + Array.from({ length: 64 }, () => 
    Math.floor(Math.random() * 16).toString(16)
  ).join('');

  return {
    success: true,
    txHash: mockTxHash,
  };
};

// 扩展 Window 接口
declare global {
  interface Window {
    ethereum?: any;
  }
}


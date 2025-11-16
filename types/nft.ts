// NFT 类型定义
export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  animation_url?: string;
  external_url?: string;
  attributes?: NFTAttribute[];
  properties?: {
    [key: string]: any;
  };
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
  display_type?: string;
}

export interface NFT {
  id: string;
  tokenId: string;
  contractAddress: string;
  metadata: NFTMetadata;
  owner?: string;
  price?: string;
  mintedAt?: Date;
}

export interface MintParams {
  contractAddress: string;
  tokenId: string;
  metadata: NFTMetadata;
  price?: string;
}


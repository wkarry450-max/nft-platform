import { NextRequest, NextResponse } from 'next/server';
import { getAllNFTs, getNFTById } from '@/lib/nft';

// 获取所有 NFT
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // 获取单个 NFT
      const nft = await getNFTById(id);
      if (nft) {
        return NextResponse.json({
          success: true,
          data: nft,
        });
      } else {
        return NextResponse.json(
          { error: 'NFT 不存在' },
          { status: 404 }
        );
      }
    } else {
      // 获取所有 NFT
      const nfts = await getAllNFTs();
      return NextResponse.json({
        success: true,
        data: nfts,
        count: nfts.length,
      });
    }
  } catch (error: any) {
    console.error('获取 NFT 错误:', error);
    return NextResponse.json(
      { error: error.message || '服务器错误' },
      { status: 500 }
    );
  }
}


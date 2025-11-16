import { NextRequest, NextResponse } from 'next/server';
import { simulateMint } from '@/lib/web3';

// 预留的 Mint API 接口（后期可连接真实合约）
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { contractAddress, tokenId, metadata } = body;

    if (!contractAddress || !tokenId || !metadata) {
      return NextResponse.json(
        { error: '缺少必要参数' },
        { status: 400 }
      );
    }

    // 模拟 Mint（实际项目中应该调用真实合约）
    const result = await simulateMint(contractAddress, tokenId, metadata);

    if (result.success) {
      return NextResponse.json({
        success: true,
        txHash: result.txHash,
        message: 'Mint 成功',
      });
    } else {
      return NextResponse.json(
        { error: 'Mint 失败' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Mint API 错误:', error);
    return NextResponse.json(
      { error: error.message || '服务器错误' },
      { status: 500 }
    );
  }
}

// 获取 Mint 历史
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    // 实际项目中应该从数据库或链上查询
    return NextResponse.json({
      success: true,
      data: [],
      message: '获取 Mint 历史成功',
    });
  } catch (error: any) {
    console.error('获取 Mint 历史错误:', error);
    return NextResponse.json(
      { error: error.message || '服务器错误' },
      { status: 500 }
    );
  }
}


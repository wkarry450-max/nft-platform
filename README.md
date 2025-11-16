# NFT 数字藏品展示平台

🌟 **一句话亮点**：实现了一个支持 NFT 展示、预览、Mint 操作的 Web3 小平台，包含动态渲染、加载动画和完整交互。

## 🔥 功能亮点

- ✅ **连接钱包** → 加载 NFT → 生成卡片展示
- ✅ 支持 NFT Metadata 渲染（JSON → 动态 UI）
- ✅ 内置动态粒子背景 & WebGL 动效增强视觉体验
- ✅ 支持"模拟 Mint"流程（无需真实链）
- ✅ NFT 详情页带动画、图表与属性展示
- ✅ **智能图片搜索**：根据描述自动搜索并更新 NFT 图片
- ✅ 预留调用合约的 API（后期可加）

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 运行开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看效果。

### 构建生产版本

```bash
npm run build
npm start
```

## 📁 项目结构

```
nft-nft-platform/
├── app/                    # Next.js App Router
│   ├── api/               # API 路由
│   │   ├── mint/         # Mint API（预留合约调用接口）
│   │   ├── nft/          # NFT API
│   │   └── search-image/ # 图片搜索 API
│   ├── nft/[id]/         # NFT 详情页
│   ├── layout.tsx        # 根布局
│   └── page.tsx          # 首页
├── components/            # React 组件
│   ├── ImageSearchButton.tsx   # 图片搜索按钮组件
│   ├── MintButton.tsx    # Mint 按钮组件
│   ├── NFTCard.tsx       # NFT 卡片组件
│   ├── NFTDetail.tsx     # NFT 详情组件
│   ├── ParticleBackground.tsx  # 粒子背景
│   ├── WalletButton.tsx  # 钱包连接按钮
│   └── WebGLBackground.tsx     # WebGL 动效背景
├── contexts/             # React Context
│   └── WalletContext.tsx # 钱包状态管理
├── lib/                  # 工具函数
│   ├── autoImage.ts      # 自动图片匹配
│   ├── imageSearch.ts    # 图片搜索相关函数
│   ├── nft.ts           # NFT 相关函数
│   └── web3.ts          # Web3 相关函数
└── types/               # TypeScript 类型定义
    ├── nft.ts          # NFT 类型
    └── wallet.ts       # 钱包类型
```

## 🎨 主要功能

### 1. 钱包连接

- 支持 MetaMask 等 Web3 钱包
- 自动检测钱包连接状态
- 显示钱包地址和余额

### 2. NFT 展示

- 卡片式布局展示 NFT 列表
- 支持图片懒加载和错误处理
- 响应式设计，适配各种屏幕

### 3. NFT 详情页

- 大图展示 NFT
- 属性列表展示
- 数据可视化图表（使用 Recharts）
- 动画过渡效果

### 4. Mint 功能

- 模拟 Mint 流程（无需真实链）
- 显示 Mint 状态和交易哈希
- 预留真实合约调用接口

### 5. 智能图片搜索 🆕

- **自动搜索**：根据 NFT 描述和属性自动搜索相关图片
- **手动搜索**：在详情页可以手动搜索并选择图片
- **一键配图**：首页一键为所有 NFT 自动匹配图片
- **多源支持**：支持 Unsplash Source API（无需 API key）

### 6. 视觉效果

- **粒子背景**：Canvas 实现的动态粒子连线效果
- **WebGL 动效**：Three.js 实现的 3D 几何体动画
- **页面动画**：Framer Motion 实现的流畅过渡

## 🔧 技术栈

- **框架**：Next.js 16 (App Router)
- **语言**：TypeScript
- **样式**：Tailwind CSS
- **Web3**：Ethers.js
- **动画**：Framer Motion
- **3D 渲染**：Three.js
- **图表**：Recharts

## 📝 API 接口

### GET /api/nft

获取所有 NFT 或单个 NFT

```bash
# 获取所有 NFT
GET /api/nft

# 获取单个 NFT
GET /api/nft?id=1
```

### POST /api/mint

模拟 Mint NFT

```json
{
  "contractAddress": "0x...",
  "tokenId": "1",
  "metadata": { ... }
}
```

### GET /api/search-image

根据关键词搜索图片

```bash
GET /api/search-image?query=宇宙&width=800&height=800
```

## 📄 许可证

MIT

## 🙏 致谢

感谢所有开源项目的贡献者！


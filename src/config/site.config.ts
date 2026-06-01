// ============================================================
//  站点配置文件
//  改这里 → 整个网站就变成不同客户的店
//  品类: drink | clothes | food | digital | beauty | custom
// ============================================================

// ---------- 商品数据 ----------
export interface ProductItem {
  id: string;
  name: string;
  emoji: string;
  price: number;
  originalPrice?: number;
  category: string;
  description: string;
  size: string;
  tags: string[];
  featured: boolean;
  stock: number;
  image?: string;
}

// ---------- 站点配置 ----------
export const siteConfig = {

  // 品类预设: 一键切换整个站的品类词汇
  // 可选: 'drink' | 'clothes' | 'food' | 'digital' | 'beauty' | 'custom'
  preset: 'drink' as 'drink' | 'clothes' | 'food' | 'digital' | 'beauty' | 'custom',

  // ---------- 基本信息 ----------
  brandName: 'DrinkShop',
  brandSlogan: '精选饮品，畅享每一口',
  brandDescription: '精选全球好饮品，冷萃咖啡、鲜榨果汁、进口气泡水、手作茶饮，线上下单配送到家。',

  // ---------- 颜色风格 ----------
  primaryColor: 'zinc',       // 按钮/导航: zinc | rose | blue | green | amber | indigo
  accentColor: 'rose',       // 价格/强调: rose | amber | pink | orange | red
  heroBg: 'from-amber-50 via-orange-50 to-yellow-50',  // Hero 背景渐变

  // ---------- 导航栏 ----------
  navLinks: [
    { label: '首页', href: '/#hero' },
    { label: '产品', href: '/#products' },
    { label: '分类', href: '/#categories' },
  ],

  // ---------- Hero 横幅 ----------
  hero: {
    badge: '新品上市',
    title: '夏日芒果冰茶',
    subtitle: '新鲜芒果搭配精选茶叶，冰爽口感，每一口都是夏天的味道',
    price: 18,
    originalPrice: 22,
    buttonText: '立即选购',
    emoji: '🥭🧊',
  },

  // ---------- 分类标签 ----------
  categories: [
    { key: 'all', label: '全部' },
    { key: 'soda', label: '碳酸饮料' },
    { key: 'juice', label: '果汁' },
    { key: 'tea', label: '茶饮' },
    { key: 'coffee', label: '咖啡' },
    { key: 'energy', label: '功能饮料' },
    { key: 'milk', label: '乳制品' },
  ],

  // ---------- 商品数据 ----------
  products: [
    {
      id: 'mango-ice-tea', name: '芒果冰茶', emoji: '🥭🧊', price: 18, originalPrice: 22,
      category: 'tea', description: '新鲜芒果搭配精选台湾高山茶叶，冰爽口感，每一口都是夏天的味道。', size: '500ml',
      tags: ['新品', '热销'], featured: true, stock: 99,
    },
    {
      id: 'matcha-latte', name: '抹茶拿铁', emoji: '🍵✨', price: 26, originalPrice: 30,
      category: 'tea', description: '日本宇治抹茶，搭配新鲜牛乳，浓郁顺滑。', size: '400ml',
      tags: ['推荐'], featured: true, stock: 50,
    },
    {
      id: 'blueberry-sparkling', name: '蓝莓气泡水', emoji: '🍇💜', price: 15,
      category: 'soda', description: '天然蓝莓汁遇上细腻气泡，清爽解渴，零添加糖。', size: '330ml',
      tags: ['零糖'], featured: true, stock: 200,
    },
    {
      id: 'cold-brew-coffee', name: '冷萃咖啡', emoji: '☕🧊', price: 22, originalPrice: 28,
      category: 'coffee', description: '精选哥伦比亚单品豆，12小时低温萃取。', size: '350ml',
      tags: ['精品'], featured: false, stock: 30,
    },
    {
      id: 'strawberry-milk', name: '草莓牛乳', emoji: '🍓🥛', price: 20,
      category: 'milk', description: '新鲜草莓搭配北海道鲜牛乳，香甜可口。', size: '400ml',
      tags: ['人气'], featured: false, stock: 80,
    },
    {
      id: 'passion-fruit-juice', name: '百香果汁', emoji: '🍊💛', price: 16,
      category: 'juice', description: '100%鲜榨百香果原汁，酸甜清爽。', size: '350ml',
      tags: ['鲜榨'], featured: false, stock: 60,
    },
    {
      id: 'energy-boost', name: '能量牛磺酸', emoji: '⚡🔋', price: 12,
      category: 'energy', description: '富含牛磺酸与B族维生素，运动后快速补充能量。', size: '250ml',
      tags: ['运动必备'], featured: false, stock: 150,
    },
    {
      id: 'lemon-soda', name: '柠檬气泡水', emoji: '🍋🫧', price: 12,
      category: 'soda', description: '西西里柠檬汁搭配绵密气泡，消暑解渴。', size: '330ml',
      tags: ['经典'], featured: false, stock: 180,
    },
    {
      id: 'peach-oolong', name: '蜜桃乌龙', emoji: '🍑🍃', price: 19,
      category: 'tea', description: '福建安溪铁观音乌龙，冷泡蜜桃果香。', size: '500ml',
      tags: ['冷泡'], featured: false, stock: 40,
    },
    {
      id: 'latte', name: '经典拿铁', emoji: '☕🥛', price: 18, originalPrice: 22,
      category: 'coffee', description: '意式浓缩与蒸汽鲜奶的完美融合。', size: '350ml',
      tags: ['经典'], featured: false, stock: 100,
    },
    {
      id: 'mango-lassi', name: '芒果酸奶昔', emoji: '🥭🥤', price: 24,
      category: 'milk', description: '阿方索芒果搭配希腊酸奶，浓郁丝滑。', size: '450ml',
      tags: ['限定'], featured: false, stock: 35,
    },
    {
      id: 'watermelon-juice', name: '西瓜汁', emoji: '🍉❤️', price: 14,
      category: 'juice', description: '现切现榨麒麟西瓜，清甜多汁。', size: '500ml',
      tags: ['季节'], featured: false, stock: 70,
    },
  ] as ProductItem[],

  // ---------- 本月推荐区 ----------
  featured: {
    title: '本月推荐',
    products: ['mango-ice-tea', 'matcha-latte', 'blueberry-sparkling'], // 引用上面商品的 ID
  },

  // ---------- 页脚 ----------
  footer: {
    columns: [
      {
        title: '选购',
        links: ['全部产品', '新品上市', '热销排行', '礼品套装'],
      },
      {
        title: '服务',
        links: ['配送说明', '退换政策', '常见问题', '联系我们'],
      },
      {
        title: '关于',
        links: ['品牌故事', '品质保证', '加入我们', '隐私政策'],
      },
    ],
    newsletter: {
      title: '关注我们',
      subtitle: '获取最新优惠和上新信息',
      placeholder: '输入邮箱地址',
      button: '订阅',
    },
    copyright: ' 保留所有权利。',
  },

  // ---------- SEO ----------
  seo: {
    title: 'DrinkShop - 精选饮品，畅享每一口',
    description: '精选全球好饮品，冷萃咖啡、鲜榨果汁、进口气泡水、手作茶饮，线上下单配送到家。',
    ogTitle: 'DrinkShop - 精选饮品',
    ogDescription: '精选全球好饮品，线上下单配送到家。',
  },
} as const;

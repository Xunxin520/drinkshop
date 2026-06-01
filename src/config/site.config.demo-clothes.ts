// ============================================================
//  Demo 2: 服装店 — XX潮品服饰
//  使用方法: 把这个文件的内容全选复制, 粘贴到 site.config.ts 覆盖
// ============================================================

export const siteConfig = {
  preset: 'clothes' as const,
  brandName: '潮品服饰',
  brandSlogan: '穿出你的态度',
  brandDescription: '潮品服饰，专注年轻时尚女装。连衣裙、上衣、裤装、配饰，每周上新，七天无理由退换。',

  primaryColor: 'zinc',
  accentColor: 'pink',
  heroBg: 'from-pink-50 via-rose-50 to-purple-50',

  navLinks: [
    { label: '首页', href: '/#hero' },
    { label: '全部商品', href: '/#products' },
    { label: '新品', href: '/#categories' },
  ],

  hero: {
    badge: '春季上新',
    title: '法式碎花连衣裙',
    subtitle: '轻盈雪纺面料，浪漫碎花印花，春季约会必备单品',
    price: 199,
    originalPrice: 299,
    buttonText: '立即抢购',
    emoji: '👗🌸',
  },

  categories: [
    { key: 'all', label: '全部' },
    { key: 'dress', label: '连衣裙' },
    { key: 'top', label: '上衣' },
    { key: 'pants', label: '裤装' },
    { key: 'skirt', label: '半身裙' },
    { key: 'outerwear', label: '外套' },
  ],

  products: [
    {
      id: 'floral-dress', name: '法式碎花连衣裙', emoji: '👗🌸', price: 199, originalPrice: 299,
      category: 'dress', description: '轻盈雪纺面料，浪漫碎花印花，收腰设计显瘦。', size: 'S/M/L/XL',
      tags: ['热卖', '春季'], featured: true, stock: 50,
    },
    {
      id: 'white-shirt', name: '基础款白衬衫', emoji: '👔🤍', price: 129, originalPrice: 169,
      category: 'top', description: '纯棉面料，不易皱，通勤百搭。', size: 'S/M/L/XL',
      tags: ['基础款'], featured: true, stock: 100,
    },
    {
      id: 'wide-leg-pants', name: '高腰阔腿裤', emoji: '👖✨', price: 169,
      category: 'pants', description: '垂感面料，高腰设计拉长腿型，舒适不紧绷。', size: 'S/M/L/XL',
      tags: ['显瘦'], featured: true, stock: 80,
    },
    {
      id: 'denim-jacket', name: '复古牛仔外套', emoji: '🧥💙', price: 259, originalPrice: 359,
      category: 'outerwear', description: '经典版型，做旧水洗工艺，春秋必备。', size: 'S/M/L/XL',
      tags: ['经典'], featured: false, stock: 60,
    },
    {
      id: 'pleated-skirt', name: '百褶半身裙', emoji: '👗🤍', price: 149,
      category: 'skirt', description: '学院风百褶设计，A字版型遮肉显瘦。', size: 'S/M/L/XL',
      tags: ['学院风'], featured: false, stock: 70,
    },
    {
      id: 'knit-top', name: '针织短袖T恤', emoji: '👚💛', price: 99,
      category: 'top', description: '冰丝针织面料，透气舒适，多色可选。', size: 'S/M/L/XL',
      tags: ['夏季'], featured: false, stock: 120,
    },
    {
      id: 'slip-dress', name: '缎面吊带裙', emoji: '👗🖤', price: 179, originalPrice: 249,
      category: 'dress', description: '丝滑缎面质感，简约高级，约会年会皆宜。', size: 'S/M/L/XL',
      tags: ['高级感'], featured: false, stock: 40,
    },
    {
      id: 'blazer', name: '轻奢西装外套', emoji: '🤵💼', price: 359,
      category: 'outerwear', description: '修身剪裁，通勤面试必备，气质满分。', size: 'S/M/L/XL',
      tags: ['通勤'], featured: false, stock: 30,
    },
    {
      id: 'skinny-jeans', name: '紧身牛仔小脚裤', emoji: '👖💙', price: 159,
      category: 'pants', description: '弹力面料，显腿直显腿长。', size: 'S/M/L/XL',
      tags: ['百搭'], featured: false, stock: 90,
    },
    {
      id: 'a-line-skirt', name: 'A字短裙', emoji: '👗💖', price: 119,
      category: 'skirt', description: '高腰A字版型，青春俏皮。', size: 'S/M/L/XL',
      tags: ['少女感'], featured: false, stock: 85,
    },
    {
      id: 'silk-shirt', name: '真丝衬衫', emoji: '👚✨', price: 289,
      category: 'top', description: '100%桑蚕丝，光泽高级，亲肤体验。', size: 'S/M/L/XL',
      tags: ['高端'], featured: false, stock: 25,
    },
    {
      id: 'long-dress', name: '气质长裙', emoji: '👗🌟', price: 229, originalPrice: 329,
      category: 'dress', description: '垂坠感长裙，优雅大气，适合各种正式场合。', size: 'S/M/L/XL',
      tags: ['优雅', '人气'], featured: false, stock: 35,
    },
  ],

  featured: {
    title: '本周热销',
    products: ['floral-dress', 'white-shirt', 'wide-leg-pants'],
  },

  footer: {
    columns: [
      { title: '选购', links: ['全部商品', '新品上市', '热销排行', '限时特惠'] },
      { title: '服务', links: ['尺码指南', '配送说明', '退换政策', '联系我们'] },
      { title: '关于', links: ['品牌故事', '品质保证', '加入我们', '隐私政策'] },
    ],
    newsletter: {
      title: '关注我们',
      subtitle: '订阅获取新品上架和优惠信息',
      placeholder: '输入邮箱地址',
      button: '订阅',
    },
    copyright: ' 保留所有权利。',
  },

  seo: {
    title: '潮品服饰 - 穿出你的态度',
    description: '潮品服饰，专注年轻时尚女装。连衣裙、上衣、裤装、配饰，每周上新。',
    ogTitle: '潮品服饰 - 穿出你的态度',
    ogDescription: '专注年轻时尚女装，每周上新。',
  },
};

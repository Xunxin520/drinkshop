// ============================================================
//  Demo 3: 茶叶店 — 茗韵东方 · 中国茶出海
//  FDA合规: 不写疗效、标明成分产地、加免责声明
// ============================================================

export const siteConfig = {
  preset: 'tea' as const,
  brandName: '茗韵东方',
  brandSlogan: '一杯中国茶，半部东方韵',
  brandDescription: '精选中国核心茶产区优质茶叶，FDA注册工厂，美国合规进口。北美现货，48小时发货。',

  primaryColor: 'emerald',
  accentColor: 'amber',
  heroBg: 'from-emerald-50 via-teal-50 to-amber-50',

  navLinks: [
    { label: '首页', href: '/#hero' },
    { label: '全部茶品', href: '/#products' },
    { label: '关于', href: '/#categories' },
  ],

  hero: {
    badge: '中国茶出海 · FDA合规',
    title: '明前龙井 · 头采嫩芽',
    subtitle: '西湖核心产区，一芽一叶手工采摘。北美现货，48小时发货。',
    price: 299,
    originalPrice: 399,
    buttonText: '立即品鉴',
    emoji: '🍵🍃',
  },

  categories: [
    { key: 'all', label: '全部' },
    { key: 'green', label: '绿茶' },
    { key: 'oolong', label: '乌龙茶' },
    { key: 'black', label: '红茶' },
    { key: 'puer', label: '普洱茶' },
    { key: 'white', label: '白茶' },
    { key: 'gift', label: '礼品套装' },
  ],

  products: [
    {
      id: 'longjing-premium', name: '明前特级龙井', emoji: '🍵🌿', price: 299, originalPrice: 399,
      category: 'green', description: '西湖核心产区，明前头采，一芽一叶。汤色嫩绿明亮，豆香馥郁，回甘悠长。', size: '100g/罐',
      tags: ['热门', '头采'], featured: true, stock: 50,
      ingredients: '100% 龙井绿茶 Camellia sinensis', origin: '浙江省杭州市西湖区',
    },
    {
      id: 'biluochun', name: '洞庭碧螺春', emoji: '🍃🌀', price: 269, originalPrice: 349,
      category: 'green', description: '苏州洞庭山原产，卷曲如螺，白毫满披。花果香清雅，鲜爽甘醇。', size: '80g/罐',
      tags: ['春茶', '名茶'], featured: false, stock: 40,
      ingredients: '100% 碧螺春绿茶 Camellia sinensis', origin: '江苏省苏州市洞庭山',
    },
    {
      id: 'tieguanyin', name: '安溪铁观音', emoji: '🍂✨', price: 199,
      category: 'oolong', description: '福建安溪原产，兰花香馥郁，七泡有余香。传统半发酵工艺，观音韵足。', size: '150g/罐',
      tags: ['经典', '兰花香'], featured: true, stock: 80,
      ingredients: '100% 铁观音乌龙茶 Camellia sinensis', origin: '福建省泉州市安溪县',
    },
    {
      id: 'dahongpao', name: '武夷山大红袍', emoji: '🪨🍂', price: 399, originalPrice: 499,
      category: 'oolong', description: '武夷岩茶之王，岩骨花香。炭焙工艺，汤色橙红透亮，岩韵悠长。', size: '100g/罐',
      tags: ['岩茶', '高端'], featured: false, stock: 25,
      ingredients: '100% 大红袍乌龙茶 Camellia sinensis', origin: '福建省南平市武夷山',
    },
    {
      id: 'zhengshan-xiaozhong', name: '正山小种', emoji: '🫖🔥', price: 229, originalPrice: 299,
      category: 'black', description: '世界红茶鼻祖，松烟熏制。桂圆干香与松烟香交织，汤色琥珀，醇厚甜润。', size: '150g/罐',
      tags: ['经典', '烟熏'], featured: true, stock: 60,
      ingredients: '100% 正山小种红茶 Camellia sinensis', origin: '福建省南平市武夷山桐木关',
    },
    {
      id: 'dianhong', name: '云南滇红', emoji: '🌺🍯', price: 149,
      category: 'black', description: '云南大叶种，金毫显露。蜜糖香与花香交融，汤色红艳，滋味浓醇。', size: '200g/罐',
      tags: ['蜜香', '性价比'], featured: false, stock: 100,
      ingredients: '100% 滇红红茶 Camellia sinensis', origin: '云南省凤庆县',
    },
    {
      id: 'shengpu-cake', name: '古树生普 357g饼', emoji: '🫓🌳', price: 359, originalPrice: 459,
      category: 'puer', description: '云南勐海古树春料，石磨压制。花香蜜韵，回甘生津迅猛，越陈越香。', size: '357g/饼',
      tags: ['古树', '收藏'], featured: false, stock: 20,
      ingredients: '100% 云南大叶种晒青毛茶 Camellia sinensis', origin: '云南省西双版纳勐海县',
    },
    {
      id: 'shupu-ripe', name: '陈年熟普', emoji: '🧱🟤', price: 199, originalPrice: 259,
      category: 'puer', description: '2018年渥堆发酵，六年陈化。汤色酒红透亮，陈香糯滑，温润暖胃。', size: '250g/砖',
      tags: ['陈年', '暖胃'], featured: false, stock: 30,
      ingredients: '100% 云南大叶种熟普 Camellia sinensis', origin: '云南省西双版纳勐海县',
    },
    {
      id: 'baihao-yinzhen', name: '白毫银针', emoji: '🤍🌱', price: 299, originalPrice: 389,
      category: 'white', description: '福鼎点头镇纯芽头，日光萎凋。满披白毫，汤色杏白，毫香蜜韵。', size: '50g/罐',
      tags: ['芽茶', '轻奢'], featured: false, stock: 35,
      ingredients: '100% 白毫银针白茶 Camellia sinensis', origin: '福建省福鼎市点头镇',
    },
    {
      id: 'shoumei', name: '老寿眉', emoji: '🍂🤎', price: 129,
      category: 'white', description: '2019年福鼎寿眉，七年自然陈化。枣香药香，汤感稠滑，耐泡度高。', size: '200g/饼',
      tags: ['老白茶', '口粮'], featured: false, stock: 70,
      ingredients: '100% 寿眉白茶 Camellia sinensis', origin: '福建省福鼎市',
    },
    {
      id: 'gift-tea-set', name: '中国名茶礼盒 · 六味', emoji: '🎁🍵', price: 599, originalPrice: 799,
      category: 'gift', description: '龙井+碧螺春+铁观音+大红袍+正山小种+白毫银针，六款名茶一次品鉴。', size: '6罐×50g',
      tags: ['送礼', '必入'], featured: true, stock: 30,
      ingredients: '100% 纯茶叶 Camellia sinensis', origin: '中国各核心产区',
    },
    {
      id: 'gift-oolong-set', name: '乌龙茶三杰礼盒', emoji: '🎁🍂', price: 459, originalPrice: 599,
      category: 'gift', description: '铁观音+大红袍+凤凰单丛，三款经典乌龙。木盒包装，内置茶人冲泡指南。', size: '3罐×80g',
      tags: ['乌龙', '送礼'], featured: false, stock: 25,
      ingredients: '100% 乌龙茶 Camellia sinensis', origin: '中国福建、广东',
    },
  ],

  featured: {
    title: '本周推荐',
    products: ['longjing-premium', 'tieguanyin', 'zhengshan-xiaozhong', 'gift-tea-set'],
  },

  fdaDisclaimer: 'These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.',

  footer: {
    columns: [
      { title: '选购', links: ['全部茶品', '绿茶', '乌龙茶', '红茶', '普洱茶', '白茶'] },
      { title: '服务', links: ['配送说明', '退换政策', '冲泡指南', '联系我们'] },
      { title: '关于', links: ['品牌故事', '茶园溯源', 'FDA注册信息', '隐私政策'] },
    ],
    newsletter: {
      title: '茶友订阅',
      subtitle: '订阅获取新茶上市、冲泡技巧和专属优惠',
      placeholder: '输入邮箱地址',
      button: '订阅',
    },
    copyright: ' 保留所有权利。FDA注册工厂 · 美国合规进口。',
  },

  seo: {
    title: '茗韵东方 | 中国茶出海 · FDA合规 · 北美现货',
    description: '精选龙井、铁观音、大红袍、普洱茶等中国名茶，FDA注册工厂，北美现货直发。',
    ogTitle: '茗韵东方 · 中国茶出海',
    ogDescription: 'FDA合规中国茶，北美现货。龙井丨铁观音丨大红袍丨普洱。',
  },
};

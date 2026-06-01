// 从站点配置中导出商品数据
// 改商品: 编辑 src/config/site.config.ts
export { siteConfig as config } from '@/config/site.config';
export const products = [...siteConfig.products];
export const categories = [...siteConfig.categories];
import { siteConfig } from '@/config/site.config';

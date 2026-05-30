export type Category = 'all' | 'soda' | 'juice' | 'tea' | 'coffee' | 'energy' | 'milk';

export interface Product {
  id: string;
  name: string;
  emoji: string;
  price: number;
  originalPrice?: number;
  category: Exclude<Category, 'all'>;
  description: string;
  size: string;
  tags: string[];
  featured: boolean;
  stock: number;
  image?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerEmail: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  createdAt: string;
  stripeSessionId?: string;
}

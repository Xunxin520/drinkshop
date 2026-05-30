-- 在 Supabase SQL Editor 中运行此文件

-- 产品表
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  emoji TEXT DEFAULT '🥤',
  price INTEGER NOT NULL,
  original_price INTEGER,
  category TEXT NOT NULL CHECK (category IN ('soda', 'juice', 'tea', 'coffee', 'energy', 'milk')),
  description TEXT DEFAULT '',
  size TEXT DEFAULT '500ml',
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  stock INTEGER DEFAULT 0,
  image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 订单表
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  customer_email TEXT NOT NULL,
  items JSONB NOT NULL,
  total INTEGER NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'shipped', 'delivered')),
  stripe_session_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 允许用户读取自己的订单
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users read own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admin read all orders"
  ON orders FOR SELECT
  USING (auth.uid() IN (SELECT id FROM auth.users WHERE raw_user_meta_data->>'role' = 'admin'));

-- 允许任何人创建订单（下单时可能未登录）
CREATE POLICY "Anyone create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-900 text-sm">选购</h4>
            <a href="#" className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">全部产品</a>
            <a href="#" className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">新品上市</a>
            <a href="#" className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">热销排行</a>
            <a href="#" className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">礼品套装</a>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-900 text-sm">服务</h4>
            <a href="#" className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">配送说明</a>
            <a href="#" className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">退换政策</a>
            <a href="#" className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">常见问题</a>
            <a href="#" className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">联系我们</a>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-900 text-sm">关于</h4>
            <a href="#" className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">品牌故事</a>
            <a href="#" className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">品质保证</a>
            <a href="#" className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">加入我们</a>
            <a href="#" className="block text-sm text-zinc-500 hover:text-zinc-900 transition-colors">隐私政策</a>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-zinc-900 text-sm">关注我们</h4>
            <p className="text-sm text-zinc-500">获取最新优惠和上新信息</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="输入邮箱地址"
                className="flex-1 px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-300"
              />
              <button className="px-4 py-2 bg-zinc-900 text-white text-sm rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer">
                订阅
              </button>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-zinc-200 text-center text-sm text-zinc-400">
          &copy; {new Date().getFullYear()} DrinkShop. 保留所有权利。
        </div>
      </div>
    </footer>
  );
}

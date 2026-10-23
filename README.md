# pawmade — 美国宠物用品独立站

Next.js 16 + React 19 前端，WordPress / WooCommerce 商品与订单后台。英文、美元、响应式设计。

## 本地运行

```powershell
npm install
npm run dev
```

访问 http://localhost:3000 。参考 `.env.example` 将需要的设置合并到现有 `.env.local`，不要覆盖已有配置。

默认 `COMMERCE_MODE=demo`，展示示例商品并关闭结账。真实商品模式设置 `COMMERCE_MODE=live`。支付由 WooCommerce 处理，必须安装随项目提供的桥接插件并完成配置后才能启用。

## 验证

```powershell
npm run lint
npm run build
npm run test:e2e
```

浏览器测试需要本地服务运行，默认使用本机 Microsoft Edge。

## 完整教程

阅读 [中文上线指南](docs/上线指南.md)，包含：商品上架、WooCommerce 接入、结账插件、支付验收、GitHub/Vercel 部署、域名、商业上线准备。

- [环境变量示例](.env.example)
- [WordPress 结账插件源码](wordpress/pawmade-checkout/pawmade-checkout.php)
- [预览图片来源](public/images/SOURCES.md)

当前交付是可测试的开店基础版本。品牌名、示例商品、价格与法律页面仍需结合真实经营资料确认；未完成真实支付和物流验收前，不开启正式收款。

![GITHUB]( https://storage.googleapis.com/vue-course-api.appspot.com/umon752/1628598204580.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=Q75JEryOHYSSKN6SD1w2EZPga8ijhUSrjGWwE7JiFdt6Jn4W%2Fw438ko%2FaRdXxE9ClCvXv3YZmeoTYl%2FctcAiv9PmLF1dMqR8GAtLjZz3%2BLyUe%2Bxlb7ku2QNtkibrWjoRL3%2BbV8%2B%2BNp6W9QGW%2FYUyBiArycC030CIuchpFn9F%2FVd%2F0eirkOgaLAQlQEShOSKcdx336IFvPRdXSNFEK1wepRyUj4zVLb3iDWgnqQvgbwCBGFJHE57DY2bIK5p5WmD%2FRLUAa58dX9FeY9LUt7o%2FPnkoM0TqXfZOyHDLhezNb4LyUxYPrO1uJe74wbpdLvzwnzqJkfkCTQyLd1k5RPznuA%3D%3D "60 Movie Poster")

# 60 Movie Poster
**電影海報 SPA 電商網站**  
Demo：https://umon752.github.io/60MoviePoster/#/

## 設計概念
* 視覺概念：運用膠卷和影像元素，營造復古氛圍。
* Logo 概念：60 來自於時間的六十進制，代表時間，以時間與電影結合，表現電影的歷史和年代感。

## 使用技術
* 切版：`SCSS` `Bootstrap5`
* 功能：`Vue3` `Vue Cli` `Axios` `VeeValidate` `CKEditor`
* 動態：`Pixi.js` `AOS`
* 其他套件：`Swiper` `Material Icons`

## 發開功能
表單使用 `VeeValidate` 驗證  
商品設定庫存數量
### 前台
* 首頁面
  - `Swiper` 製作推薦商品區塊，以隨機取得方式呈現商品
* 商品列表頁面
  - 加入 / 取消收藏
  - 加入購物車
  - 類別 / 年份篩選
  - 商品分頁
* 商品詳細頁面
  - 增 / 減商品數量
  - 加入購物車
  - `Swiper` 製作相關商品區塊，以隨機取得方式呈現商品
* 收藏頁面
  - 使用 `LocalStorage` 儲存資料
  - 品項加入購物車
  - 刪除品項
* 購物車頁面
  - 修改商品數量
  - 刪除商品
  - 套用優惠券
* FAQ 頁面
  - 內容使用後台文章資料渲染
### 後台
* 商品管理頁面
  - 新增 / 編輯 / 刪除商品
  - 上傳圖片
* 訂單管理頁面
  - 檢視 / 刪除訂單
* 優惠券管理頁面
  - 新增 / 編輯 / 刪除優惠券
* 文章管理頁面
  - 新增 / 編輯 / 刪除文章
  - 使用 `CKEditor` 編輯器

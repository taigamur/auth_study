```
/src
├── components/        # UIコンポーネント
│   ├── common/        # 汎用コンポーネント (ボタン、モーダルなど)
│   │   ├── Button.js
│   │   ├── Modal.js
│   │   ├── Input.js
│   │   ├── Card.js
│   │   ├── index.js
│   │
│   ├── layout/        # レイアウト関連コンポーネント (ヘッダー、フッターなど)
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   ├── Sidebar.js
│   │   ├── Navbar.js
│   │   ├── index.js
│   │
│   ├── pages/         # 各ページごとのコンポーネント
│   │   ├── Home/
│   │   │   ├── HomeBanner.js
│   │   │   ├── HomeFeatures.js
│   │   │   ├── index.js
│   │   ├── Profile/
│   │   │   ├── ProfileCard.js
│   │   │   ├── ProfileSettings.js
│   │   │   ├── index.js
│   │
│   ├── features/      # 特定の機能に関するコンポーネント
│   │   ├── Auth/
│   │   │   ├── LoginForm.js
│   │   │   ├── RegisterForm.js
│   │   │   ├── index.js
│   │   ├── Posts/
│   │   │   ├── PostItem.js
│   │   │   ├── PostList.js
│   │   │   ├── PostForm.js
│   │   │   ├── index.js
│   │
│   ├── hooks/         # カスタムフック (必要に応じて)
│   │   ├── useModal.js
│   │   ├── useAuth.js
│   │
│   ├── styles/        # スタイル関連 (必要に応じて)
│   │   ├── Button.module.css
│   │   ├── Modal.module.css
│   │   ├── Header.module.css
│
├── pages/             # 画面コンポーネント (ルーティング用)
│   ├── Home.js
│   ├── Profile.js
│   ├── Login.js
```
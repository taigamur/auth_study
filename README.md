# Auth Study

複数の認証方法を理解するためのハンズオン実装です。このプロジェクトでは、様々な認証方法（OIDC、ID/PASS）を実際に実装し、それぞれの特徴や実装方法を学ぶことができます。

## 概要

このアプリケーションは、フロントエンド（Next.js）とバックエンド（FastAPI）で構成されており、以下の認証フローを実装しています：

1. **OIDC認証（Auth0）**: Auth0をIDプロバイダとして使用したOIDC認証
2. **OIDC認証（Google）**: GoogleをIDプロバイダとして使用したOIDC認証
3. **ID/PASS認証**: 従来のユーザー名/パスワードによる認証

## 使い方

1. バックエンドを起動する（詳細は下記「Backend」セクション参照）
2. フロントエンドを起動する（詳細は下記「Frontend」セクション参照）
3. ブラウザで http://localhost:3000 にアクセスする
4. トップページから試したい認証方法を選択する

## 実装されている認証方法

### OIDC認証
- **Auth0**: `@auth0/auth0-react` ライブラリを使用
- **Google**: `next-auth` ライブラリを使用

### ID/PASS認証
- カスタム実装（バックエンドAPIとの連携）


# 🔧 Backend

## 起動
```bash
cd backend
docker compose up -d
```

## 技術スタック
- **FastAPI**: 高速なAPIフレームワーク
- **SQLAlchemy**: ORMライブラリ
- **Alembic**: データベースマイグレーション
- **MySQL**: データベース

## 認証関連エンドポイント
- **/auth/oidc**: OIDC認証関連のエンドポイント
- **/auth/token**: ID/PASS認証のトークン発行
- **/users**: ユーザー管理

## API ドキュメント
FastAPI では Swagger UI による API ドキュメントを提供しています。
起動後、Swagger UI で API を確認できます

**Swagger UI**: [http://localhost:8000/docs](http://localhost:8000/docs)

## プロジェクト構成
```
backend/
├── app/
│   ├── auth/            # 認証関連のモジュール
│   ├── crud/            # データベース操作
│   ├── routers/         # APIエンドポイント
│   └── schemas/         # データモデル
```

# 🛠 Frontend

## 起動
```bash
cd front
npm install  # 初回のみ
npm run dev
```

## 使用ライブラリ

### UI
- **Material UI (MUI)**: [https://mui.com/material-ui/](https://mui.com/material-ui/)

### 認証関連
- **@auth0/auth0-react**: Auth0を使用したOIDC認証
- **next-auth**: Googleを使用したOIDC認証

## プロジェクト構成

```
front/
├── app/                  # Next.jsアプリケーション
│   ├── api/              # API Routes
│   ├── id_pass/          # ID/PASS認証実装
│   ├── oidc/             # Auth0 OIDC認証実装
│   └── oidc2/            # Google OIDC認証実装
```

## 認証方法の詳細

### OIDC認証の特徴
- **標準化された認証プロトコル**: OpenID Connect (OIDC) は OAuth 2.0 をベースにした標準化された認証プロトコル
- **セキュリティ**: トークンベースの認証で、JWTを使用
- **シングルサインオン**: 複数のアプリケーションで同じ認証情報を使用可能
- **外部IDプロバイダ**: Auth0やGoogleなどの外部サービスに認証を委任

#### Auth0 OIDC実装
- `@auth0/auth0-react` ライブラリを使用
- Auth0テナントの設定が必要
- 詳細: [OIDC (Notion)](https://zesty-address-ae0.notion.site/OIDC-1b47d2e4bbf88006a111e360577911e3?pvs=4)

#### Google OIDC実装
- `next-auth` ライブラリを使用
- Google Cloud Platformでの設定が必要
- OAuth 2.0クライアントIDとシークレットの取得

### ID/PASS認証の特徴
- **従来型の認証方式**: ユーザー名とパスワードによる認証
- **バックエンド連携**: フロントエンドからバックエンドAPIへの認証リクエスト
- **JWTトークン**: 認証成功時にJWTトークンを発行
- **セキュリティ考慮点**: パスワードハッシュ化、HTTPS通信、CSRF対策など

## セットアップガイド

各認証方法を試すには、それぞれ以下の設定が必要です：

### Auth0設定
1. [Auth0](https://auth0.com/)でアカウント作成
2. 新しいアプリケーションを作成（Regular Web Application）
3. `.env`ファイルに認証情報を設定

### Google OAuth設定
1. [Google Cloud Console](https://console.cloud.google.com/)でプロジェクト作成
2. OAuth同意画面を設定
3. OAuth 2.0クライアントIDを作成
4. `.env`ファイルに認証情報を設定

### ID/PASS認証設定
1. バックエンドを起動
2. フロントエンドを起動
3. アカウント登録画面からユーザー登録

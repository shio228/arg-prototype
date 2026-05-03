# ビルドステージ
FROM node:22-alpine AS builder

WORKDIR /app

RUN corepack enable

# 依存関係をインストール
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile

# ソースコードをコピー
COPY . .

# アプリケーションをビルド
RUN pnpm run build

# 実行ステージ
FROM node:22-alpine

WORKDIR /app

RUN corepack enable

# 本番環境用の依存関係をインストール
COPY package.json pnpm-lock.yaml ./
COPY patches ./patches
RUN pnpm install --frozen-lockfile --prod

# ビルドステージからビルド結果をコピー
COPY --from=builder /app/dist ./dist

# ポート3000を公開
EXPOSE 3000

# アプリケーションを起動
CMD ["node", "dist/index.js"]

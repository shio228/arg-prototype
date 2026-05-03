
ARG Prototypeをローカル環境のDocker上で動作させるための手順を説明します。

## 前提条件

- Docker がインストールされていること
- Docker Compose がインストールされていること

### 1. Docker イメージのビルドと実行

#### 方法1: Docker Composeを使用（推奨）

```bash
docker-compose up -d --build
```

このコマンドで以下の処理が実行されます：
- Dockerイメージのビルド
- コンテナの起動
- ポート3000でのアプリケーション公開

#### 方法2: Dockerコマンドを直接使用

```bash
# イメージのビルド
docker build -t arg-prototype .

# コンテナの実行
docker run -d -p 3000:3000 --name arg-prototype arg-prototype
```

#### 停止方法

```bash
docker-compose down
```

### 3. アプリケーションへのアクセス

ブラウザで以下のURLにアクセスしてください：

```
http://localhost:3000
```
### Alembic

```bash
# モデルの変更からマイグレーションファイルを生成
alembic revision --autogenerate -m "message"

# マイグレーションファイルを使ってDBを更新
alembic upgrade head
```
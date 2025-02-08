

* このページではID/PASSを使用した認証方法を説明
* クライアント側からID/PASSを送信
* サーバー側でPASSをハッシュ化してDBに保存
* IDをjwt_tokenに変換してsessionに"session"というkeyで保存
* クライアントは都度sessionを送り、サーバー側でユーザーを検証している

```[python]

```

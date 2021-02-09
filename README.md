## アプリの概要

- express-crud
- demo: https://pure-wildwood-70762.herokuapp.com/
- 経緯: node.jsフレームワークであるexpressを使用して、crud操作するアプリケーションを作成。成果物はherokuサーバーにデプロイ。
- 全てapiで操作するブログ投稿アプリ。viewなし。
- userを登録することでjwtトークンを発行し、headerにトークンを追加することでアプリの操作を認証。apiへget,postすることで、ユーザー情報取得や、記事を投稿できる。記事の情報は更新と削除が可能。各のブログは中間テーブルにて、カテゴリー別に分類している。（プログラミング、仕事、趣味）。また、ブログ一覧取得の機能もあり、ステータスをクエリパラメータに入れ込むことで、検索が可能。

## 使用した技術

- express
- bcrypt
- passport
- passport-jwt
- passport-local
- sequelize
- typescript
- heroku

## 起動方法

```
git clone ~~~
cd express-crud
npm install
npm run build
npm run start
※別途、データを保存するためのsqlを用意する必要があります。
```

## 設計

BaseUrl=https://pure-wildwood-70762.herokuapp.com/

認証前

```
①ユーザー作成
url: BaseUrl + auth/signup 
method: post
パラメータ
{
  "user":  {
    "loginId": string,
    "name": string,
    "iconUrl": string,
    "password": string
  }
}
=>ユーザー登録完了。

②jwtトークン取得
url: BaseUrl + auth/login
method: post
パラメータ
①で登録した、loginIdとpassword
  {
    "loginId": string,
    "password": string
  }
  => jwttoken取得
```
認証後 \
headerに下記を追加 \
Authorization: Bearer "jwttoken"

```
①ユーザー詳細情報
url: BaseUrl + user 
method: get
=>ユーザー詳細情報をjsonで返却

②ユーザー投稿一覧
url: BaseUrl + user/posts
method: get
※カテゴリの情報も一緒に返す, ステータスをクエリパラメータで絞り込み
=>ユーザー投稿一覧をjsonで返却
```
認証後 \
headerに下記を追加 \
Authorization: Bearer "jwttoken"

```
①記事詳細情報
url: BaseUrl + posts/:id 
method: get
※カテゴリの情報も一緒に返す, ステータスをクエリパラメータで絞り込み
=>paramsidの投稿をjsonで返却

②記事一覧
url: BaseUrl + posts
method: get
※カテゴリの情報も一緒に返す, ステータスをクエリパラメータで絞り込み
=>記事一覧をjsonで返却

③記事投稿
url: BaseUrl + posts
method: post
パラメータ
{
  "post":  {
    "title": string,
    "body": string,
    "status": number[0,100,200],
    "categoryIds": array[number[1-3]]
  }
}
=>記事を投稿
④記事更新
url: BaseUrl + posts/:id
method: patch
パラメータ
{
  "post":  {
    "title": string,
    "body": string,
    "status": number[0,100,200],
    "categoryIds": array[number[1-3]]
  }
}
=>paramsidの記事を更新

⑤記事削除
url: BaseUrl + posts/:id
method: delete
=>paramsidの記事を削除
```


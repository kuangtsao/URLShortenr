# URLShortenr 1.0.0

## 簡介
alphacamp 2-3 week 4 作業
輸入網址後，會 hash 一個 5 位數(由大小寫英文字母和數字構成)，之後再利用 `heroku 網址/5位數字`，即可轉址到輸入的網址

## 安裝
1. 開啟終端機，確認好路徑，`git clone` 此專案，cd 到底下
```
$ pwd
[current_path]
$ git clone https://github.com/kuangtsao/URLShortenr.git
$ cd URLShortenr
```
2. 透過 `npm install` 安裝需要的 package
```
$ npm install
```
3. 啟動前先檢查有沒有 nodemon，沒有的話請依照這個以下指令安裝
```
$ which nodemon
# 如果有出現路徑就代表已經安裝了
$ npm install nodemon
# 如果要讓他變成到處都可以用，多帶一個 -g 的 flag
```

4. 啟動 mongodb container(optional)
如果已經有裝 mongo 4.2 版，或者不喜歡 container 的可以跳過  
先確認自己有沒有裝 docker 和 docker-compose
```
$ which docker
$ which docker-compose
```
如果沒有出現路徑，可以參考 [docker installation guide](https://docs.docker.com/compose/install/) 安裝  

利用 docker-compose 開啟  
```
[project path] $ docker-compose up -d
```

5. 注入種子資料
請先確認是否還在 clone 下來的路徑
```
[project path] $ npm run seed
```
## 啟動專案
挑一個喜歡的
```
[project path] $ npm run start
[project path] $ node app.js
[project path] $ npm run dev
[project path] $ nodemon app.js
```
只要有看到這個訊息，就可以到瀏覽器輸入 `http://localhost:3000`，就可以使用該專案功能
```
URLShortenr is running on http://localhost:3000
```
## 未來可新增功能
- route post / 檢查重複的 hashValue 與 url
```
觀摩他人作業，發現想處理重複 hashValue 和 url 問題會牽扯到下學期的進度，後續重寫時可以觀察 shorturl 這個分支的 commit d600e900，把所有 query 都放在那裡了
```
- express-validator 優化

## 開發工具
- node 14.16.0
- express 4.17.2
- express-handlebars 6.0.2
- express-validator 6.14.0
- bootstrap 5.0.2
- fontawesome 5.9.0
- mongoose 6.1.6

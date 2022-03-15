# node_mongo_sample
## about
  このブランチはNode.jsにMongoDB連携を組み込む時に利用できるWrapperクラスと利用例＋αを入れています。  

## ファイル構成
### config
#### db_config.js
  データベースの接続設定、メッセージの定義ファイル
### db
#### mongo_wrapper.js
  MongoDBのWrapperクラス
#### mongodb_controller.js
  利用例１（DB、コレクション指定）
#### loggingdb_controller.js
  利用例２（DBのみ指定、コレクション後指定）
### helpers
#### common_util.js
  日時操作系func詰め合わせ
### Logics
#### sample.js
  Controllerの利用例
### mongo
#### docker-compose.yml
  テスト用MongoDB起動yamlファイル（要 docker,　docker-compose）

## その他
  本リポジトリの内容によって発生した事象に対しては一切の責任を負いかねますので、ご利用・ご参考にされる際は内容を良く理解の上ご利用ください。  

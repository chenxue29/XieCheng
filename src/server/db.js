let mysql = require('mysql2')

let db = mysql.createPool({
  host: '127.0.0.1', // 数据库IP地址
  user: 'root', // 数据库登录账号
  password: 'admin123', // 数据库登录密码
  database: 'YXZMZS' // 要操作的数据库
})

// const db = mysql.createPool({
//   host: '127.0.0.1',
//   user: 'root',
//   password: 'zjj19991118',
//   database: 'xiechengdatabase'
// })

module.exports = db;
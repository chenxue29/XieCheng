let db = require('../db')

exports.login = (req,res) =>{
    var username = req.body.username
    var password = req.body.password
    var sql = 'select * from user where username = ?'
    db.query(sql, [username], (err, data) => {
        console.log(data[0])
        if (err) {
          return res.send({
            status: 400,
            message: err
          })
        }
        if (data.length === 0) {
          res.send({
            status: 401,
            message: '用户名不存在'
          })
        } else {
          if (data[0].password === password) {
              res.send({
                status: 200,
                message: '登录成功',
                data: data[0],
                token: 'cx121212'
              })
          } else {
            res.send({
              status: 402,
              message: '密码错误'
            })
          }
        }
      })
    }
    
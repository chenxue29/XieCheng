let db = require('../db')

exports.register = (req, res) => {
    var username = req.body.username
    var password = req.body.password
    var sql = 'select * from user where username = ?'
    var insertsql = 'insert into user (username,password) values (?,?)'
    db.query(sql, [username], (err, data) => {
        if (err) {
          return res.send({
            status: 400,
            message: err
          })
        }
        if (data.length === 0) {
            db.query(insertsql, [username, password], (err, dataStr) => {
                if (err) {
                    return res.send({
                      status: 400,
                      message: err
                    })
                  }
                if(dataStr.affectedRows === 1){
                    res.send({
                        status: 200,
                        message: '注册成功',
                        userid: dataStr.insertId
                      })
                }else{
                    res.send({
                        status: 401,
                        message: '注册失败'
                      })
                }
            })

        } else {
            res.send({
                status: 402,
                message: '用户名已存在'
              })
        }
      })
}
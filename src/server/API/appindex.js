// let db = require('../db')

// exports.getAllUserInfo = (req,res) => {
    
//     var sql = 'select * from user'
//     db.query(sql, (err, data) => {
//       if (err) {
//         return res.send('错误：' + err.message)
//       }else{
//         res.send(data)
//       }
      
//     })
//   };
  
//   exports.getAllTravelInfo = (req,res) => {
    
//     var sql = 'select * from travel'
//     db.query(sql, (err, data) => {
//       if (err) {
//         return res.send('错误：' + err.message)
//       }else{
//         res.send(data)
//       }
      
//     })
//   };
  
//   exports.getAllImageInfo = (req,res) => {
    
//     var sql = 'select * from image'
//     db.query(sql, [user_id], (err, data) => {
//       if (err) {
//         return res.send('错误：' + err.message)
//       }else{
//         console.log('houduan',data)
//         res.send(data)
//       }
      
//     })
//   };

const db = require('../db')

const searchManager = async (req, res) => {
    let travels = []
    let datas = []
    try {
        // 搜索所有未被物理删除的游记
        const sqlSearch = 'SELECT * FROM travel'
        travels = await new Promise((resolve, reject) => {
          db.query(sqlSearch, function (error, dataStr) {
            if (error) {
              reject(error.message)
            } else {
              resolve(dataStr)
            }
          })
        })
      } catch (error) {
        console.log(error)
      }
    // 整理最终返回的数据形式
    for(let i=0; i<travels.length; i++){
        datas.push({
            travelID: travels[i].id,
            title: travels[i].title,
            content: travels[i].content,
            date: travels[i].date,
            state: travels[i].state,
            open: travels[i].open,
            delete: travels[i].deleteOr,
            position: travels[i].position,
            userID: travels[i].user_id,
            username: '',
            profile: '',
            imgurl: [],
        })
    }

    // 通过使用Promise.all等待所有的异步操作完成
    await Promise.all(
    travels.map(async (element,index) => {
        // 查找图片
        let images = []
        try{
            sqlSearchItem = 'SELECT * FROM image WHERE travel_id=?'
            images = await new Promise((resolve, reject) => {
                db.query(sqlSearchItem, element.id, function (error, dataStr) {
                  if (error) {
                    reject(error.message)
                  } else {
                    resolve(dataStr)
                  }
                })
              })
        } catch (error) {
            console.log(error)
        }
        // 将图片写入总的数据中
        images.map(ele => {
            datas[index].imgurl.push(ele.picture)
        })

        // 查找用户
        let username = ''
        try{
            sqlSearchItem = 'SELECT username,profile FROM user WHERE id=?'
            username = await new Promise((resolve, reject) => {
                db.query(sqlSearchItem, element.user_id, function (error, dataStr) {
                  if (error) {
                    reject(error.message)
                  } else {
                    resolve(dataStr)
                  }
                })
              })
        } catch (error) {
            console.log(error)
        }
        // 将用户名写入总的数据中
        datas[index].username = username[0].username
        datas[index].profile = username[0].profile
    })
)
    res.send(datas)

}

module.exports = searchManager
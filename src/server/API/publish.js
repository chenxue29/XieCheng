let db = require('../db')
const multer = require('multer');
const fs = require('fs');
const OSS = require('ali-oss');
const upload = multer({ dest: 'uploads/' }); // 指定上传文件的存储目录
const imageUrl = []
// 配置阿里云OSS
const client = new OSS({
  region: 'oss-cn-shanghai',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: 'xiechengtravel'
});
// 将图片文件上传到阿里云存储桶
async function uploadToAliyun(imagePath, imageName, insertId, user_id) {
  try {
    const result = await client.put(imageName, imagePath);
    console.log('图片上传成功', result.url);
    // 在这里可以将上传成功后的图片URL保存到数据库中
    // imageUrl.push(result.url);
    var sqlimg = 'insert into image (picture,travel_id,user_id) values (?,?,?)'
    db.query(sqlimg, [result.url, insertId, user_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('图片添加成功')
      }
    })
  } catch (err) {
    console.error('图片上传失败', err);
  }
}

async function uploadToAliyun_t(imagePath, imageName, imageId) {
  try {
    const result = await client.put(imageName, imagePath);
    console.log('图片更新成功', result.url);
    // 在这里可以将上传成功后的图片URL保存到数据库中
    // imageUrl.push(result.url);
    var sqlimg = 'update image set picture=? where id=?'
    db.query(sqlimg, [result.url, imageId], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('图片更新成功')
      }
    })
  } catch (err) {
    console.error('图片上传失败', err);
  }
}

exports.publish = [
  upload.array('images'),
  (req, res) => {
    var user_id = req.body.user_id;
    var title = req.body.title;
    var content = req.body.content;
    var date = req.body.date;
    var state = req.body.state;
    var open = req.body.open;
    var deleteOr = req.body.deleteOr;
    var position = req.body.position;
    var base64img = []
    // 获取上传的图片文件数组
    const images = req.files;
    console.log('ssszs', images)

    var sql = 'INSERT INTO travel (title, content, date, state, open, deleteOr, position, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    const values = [title, content, date, state, open, deleteOr, position, user_id];

    db.query(sql, values, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(401).json({
          status: 401,
          message: '发表游记失败'
        });
      } else {
        console.log('成功')
        if (images && images.length > 0) {
          // 用于存储转换为 Base64 编码的图片数据数组
          var base64Images = [];

          // 处理每个图片文件
          for (var i = 0; i < images.length; i++) {
            var image = images[i];
            const imagePath = image.path;
            const imageName = image.filename;
            // 将图片文件上传到阿里云存储桶
            uploadToAliyun(imagePath, imageName, data.insertId, user_id);
            // // console.log(image)
            // // 读取图片文件内容
            // var imageData = fs.readFileSync(image.path);
            // // // 将图片内容转换为 Base64 编码
            // // var base64Image = imageData.toString('base64');
            // // // 将转换后的 Base64 编码添加到数组中
            // // base64Images.push(base64Image);
            // var binaryImage = Buffer.from(imageData, 'binary');

            // // 将转换后的二进制数据添加到数组中
            // base64Images.push(binaryImage);
            // base64img.push(binaryImage)
            // console.log('编码', binaryImage)
          }

          // 在这里将 base64Images 存储到数据库中或进行其他处理

          // 返回成功响应
          // res.status(200).json({ success: true });

        }

        // console.log(data.insertId)
        // const values = imageUrl.map(url => [url, data.insertId])
        // console.log('qqqqq',imageUrl)
        // 存在异步问题
        // imageUrl.forEach((url)=>{
        //   db.query(sqlimg, [url,data.insertId], (err, result) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       console.log('图片添加成功')
        //     }
        //   })
        // })

        console.log(title, content, date, state, open, deleteOr, user_id)
        return res.status(200).json({
          status: 200,
          message: '发表游记成功'
        });
      }
    });
  }
];

exports.update = [
  upload.array('images'),
  (req, res) => {
    var travel_id = req.body.travel_id;
    var title = req.body.title;
    var content = req.body.content;
    var date = req.body.date;
    var state = req.body.state;
    var open = req.body.open;
    var deleteOr = req.body.deleteOr;
    var position = req.body.position;
    // 获取上传的图片文件数组
    const images = req.files;
    console.log('ssszs', images)
    var sql = 'UPDATE travel SET title=?, content=?, date=?, state=?, open=?, deleteOr=?, position=? WHERE id=?';
    const values = [title, content, date, state, open, deleteOr, position, travel_id];

    db.query(sql, values, (err, data) => {
      if (err) {
        console.log(err);
        return res.status(401).json({
          status: 401,
          message: '更新游记失败'
        });
      } else {
        // console.log('成功')
        if (images && images.length > 0) {
          // 处理每个图片文件
          var ids = [];
          var sql = 'SELECT id FROM image WHERE travel_id=?';
          db.query(sql, [travel_id], (err, data) => {
            if (err) {
              console.log(err);
            } else {
              data.forEach(row => {
                ids.push(row.id);
              });
              console.log(ids);
              // 在这里执行上传到阿里云存储桶的逻辑
              for (var i = 0; i < images.length; i++) {
                var image = images[i];
                const imagePath = image.path;
                const imageName = image.filename;
                // 将图片文件上传到阿里云存储桶
                uploadToAliyun_t(imagePath, imageName, ids[i]);
              }
            }
          });
        }
        return res.status(200).json({
          status: 200,
          message: '更新游记成功'
        });
      }
    });
  }]
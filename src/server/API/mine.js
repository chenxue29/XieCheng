let db = require('../db')
const multer = require('multer');
const fs = require('fs');
const OSS = require('ali-oss');
const upload = multer({ dest: 'uploadProfile/' }); // 指定上传文件的存储目录
const imageUrl = []
// 配置阿里云OSS
const client = new OSS({
  region: 'oss-cn-shanghai',
  accessKeyId: '',
  accessKeySecret: '',
  bucket: 'xiechengtravel'
});
async function uploadToAliyun_profile(imagePath, imageName, user_id) {
  try {
    const result = await client.put(imageName, imagePath);
    console.log('头像上传成功', result.url);
    // 在这里可以将上传成功后的图片URL保存到数据库中
    // imageUrl.push(result.url);
    var sql = 'UPDATE user SET profile = ? WHERE id = ?';

    db.query(sql, [result.url, user_id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log('头像上传成功')
      }
    })
  } catch (err) {
    console.error('头像上传失败', err);
  }
}
exports.publishProfile = [
  upload.array('profile'),
  (req, res) => {
    var user_id = req.body.user_id
    const images = req.files;
    console.log(images[0])
    var image = images[0];
    const imagePath = image.path;
    const imageName = image.filename;
    uploadToAliyun_profile(imagePath, imageName, user_id)
  }
];

exports.getUserInfo = (req,res) => {
  var user_id = req.query.user_id
  var sql = 'select * from user where id = ?'
  db.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }else{
      res.send(data)
    }
    
  })
};

exports.getTravelInfo = (req,res) => {
  var user_id = req.query.user_id
  var sql = 'select * from travel where user_id = ?'
  db.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }else{
      res.send(data)
    }
    
  })
};

exports.getImageInfo = (req,res) => {
  var user_id = req.query.user_id
  var sql = 'select * from image where user_id = ?'
  db.query(sql, [user_id], (err, data) => {
    if (err) {
      return res.send('错误：' + err.message)
    }else{
      console.log('houduan',data)
      res.send(data)
    }
    
  })
};


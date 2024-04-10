let db = require('../db')

exports.publish = (req, res) => {
    var user_id = req.query.user_id;
    var title = req.query.title;
    var content = req.query.content;
    var date = req.query.date;
    var state = req.query.state;
    var open = req.query.open;
    var deleteOr = req.query.deleteOr;
    var position = req.query.position;
    
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
        console.log(title, content, date, state, open, deleteOr, user_id)
        return res.status(200).json({
          status: 200,
          message: '发表游记成功'
        });
      }
    });
  };
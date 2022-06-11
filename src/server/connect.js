var mysql = require('mysql');
var config = require('./db.js')



var pool = mysql.createPool({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
});

let allOperation = {
  query: function (sql, values) {

    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          reject(err)
        } else {
          connection.query(sql, values, (err, rows) => {
            console.log(sql)
            if (err) {
              reject(err)
            } else {
              resolve(rows)
            }
            connection.release()
          })
        }
      })
    })

  },
  select() {
    return new Promise((resolve) => {
      pool.query('SELECT * from user', function (error, results) {
        if (error) {
          throw error
        }
        resolve(results)
      });
    })
  },
  selectEmail() {
    return new Promise((resolve) => {
      pool.query('SELECT email from user', function (error, results) {
        if (error) {
          throw error
        }
        resolve(results)
      });
    })
  },
  selectFood() {
    return new Promise((resolve) => {
      pool.query('SELECT * from food', function (error, results) {
        if (error) {
          throw error
        }
        resolve(results)
      });
    })
  },
  selectImg() {
    return new Promise((resolve) => {
      pool.query('SELECT * from testimg', function (error, results) {
        if (error) {
          throw error
        }
        resolve(results)
      });
    })
  },
  selectOrderId() {
    return new Promise((resolve) => {
      pool.query('SELECT id from orderGood', function (error, results) {
        if (error) {
          throw error
        }
        resolve(results)
      });
    })
  },
  selectRealOrderId() {
    return new Promise((resolve) => {
      pool.query('SELECT orderId from realorder', function (error, results) {
        if (error) {
          throw error
        }
        resolve(results)
      });
    })
  },
  getAllRealOrder() {
    return new Promise((resolve) => {
      pool.query('SELECT * from realorder', function (error, results) {
        if (error) {
          throw error
        }
        resolve(results)
      });
    })
  },
  getAllTable() {
    return new Promise((resolve) => {
      pool.query('SELECT * from tables', function (error, results) {
        if (error) {
          throw error
        }
        resolve(results)
      });
    })
  },
  addImg: (obj) => {
    let _sql = "insert into testimg set imgstr = ?;"

    return allOperation.query(_sql, obj)
  },
  addFood: (obj) => {
    let _sql = "insert into food set name=?,price=?,description=?,reserve=?,category=?,img=?,sales = ?;"

    return allOperation.query(_sql, obj)
  },
  addUser: (obj) => {
    let _sql = "insert into user set name=?,password=?,phone=?,email=?,avatar = ?;"

    return allOperation.query(_sql, obj)
  },
  addStaff: (obj) => {
    let _sql = "insert into staff set name=?,password=?,phone=?,email=?,level = ?,avatar = ?;"

    return allOperation.query(_sql, obj)
  },
  addOrder: (obj) => {
    let _sql = "insert into ordergood set id=?,userPhone=?,info=?,sum=?,date=?,isPay=?,tableId=?;"

    return allOperation.query(_sql, obj)
  },
  addOrderOk: (obj) => {
    let _sql = "update ordergood set isPay=? where id = ?;"

    return allOperation.query(_sql, obj)
  },
  addRealOrderOk: (obj) => {
    let _sql = "update realorder set isPay=? where orderId = ?;"

    return allOperation.query(_sql, obj)
  },
  log: (obj) => {
    let _sql = 'select * from user where phone = ?'
    return allOperation.query(_sql, obj)
  },
  logAdmin: (obj) => {
    let _sql = 'select * from staff where phone = ?'
    return allOperation.query(_sql, obj)
  },
  getUser: (obj) => {
    let _sql = 'select * from user where phone = ?'
    return allOperation.query(_sql, obj)
  },
  getFood: (obj) => {
    let _sql = 'select * from food where name = ?'
    return allOperation.query(_sql, obj)
  },
  getUserCart: (obj) => {
    let _sql = 'select * from cart where userPhone = ?'
    return allOperation.query(_sql, obj)
  },
  addCart: (obj) => {
    let _sql = 'update cart set foodInfo = ? where userPhone = ?'
    return allOperation.query(_sql, obj)
  },
  createCart: (obj) => {
    let _sql = 'insert into cart set userPhone=?,foodInfo = ?,sum = 0'
    return allOperation.query(_sql, obj)
  },
  delUser: (obj) => {
    let _sql = 'delete from user where phone = ?'
    return allOperation.query(_sql, obj)
  },
  delFood: (obj) => {
    let _sql = 'delete from food where name = ?'
    return allOperation.query(_sql, obj)
  },
  updateUser: (obj) => {
    let _sql = 'update user set name = ? , password = ?, email = ?, avatar = ? where phone = ?'
    return allOperation.query(_sql, obj)
  },
  updateFood: (obj) => {
    let _sql = 'update food set price = ?, description = ?, reserve = ? , category = ? , img = ? ,sales = ? where name = ?'
    return allOperation.query(_sql, obj)
  },
  getFoodByCategory : (obj) => {
    let _sql = 'select * from food where category = ?'
    return allOperation.query(_sql, obj)
  },
  delCart: (obj) => {
    let _sql = 'delete from cart where userPhone = ?'
    return allOperation.query(_sql, obj)
  },
  orderTable: (obj) => {
    let _sql = 'update tables set ischeck = ? where id = ?'
    return allOperation.query(_sql, obj)
  },
  getOrder: (obj) => {
    let _sql = 'select * from ordergood where userPhone = ?'
    return allOperation.query(_sql, obj)
  },
  getUserByEmail: (obj) => {
    let _sql = 'select * from user where email = ?'
    return allOperation.query(_sql, obj)
  },
  addRealCart: (obj) => {
    let _sql = 'insert into realcart set userPhone=?,foodName=?,foodQuantity=?,foodPrice=?,foodCategory=?,foodImg=?'
    return allOperation.query(_sql, obj)
  },
  getRealCart: (obj) => {
    let _sql = 'select * from realcart where userPhone = ?'
    return allOperation.query(_sql, obj)
  },
  delRealCart:(obj) => {
    let _sql = 'delete from realcart where userPhone = ? and foodName = ?'
    return allOperation.query(_sql, obj)
  },
  updateRealCart:(obj) => {
    let _sql = 'update realcart set foodQuantity = ?  where userPhone = ? and foodName = ?'
    return allOperation.query(_sql, obj)
  },
  addRealOrder:(obj) => {
    let _sql = 'insert into realorder set orderId=? ,userPhone = ?,orderFoodName=?,orderFoodQuantity = ?,orderFoodCategory = ? ,orderValue=?,orderDate=?,orderTable=?,isPay=?'
    return allOperation.query(_sql, obj)
  },
  selectRealOrder:(obj) => {
    let _sql = 'select * from realorder where orderId = ?'
    return allOperation.query(_sql, obj)
  },
  selectRealOrderByUser:(obj) => {
    let _sql = 'select * from realorder where userPhone = ?'
    return allOperation.query(_sql, obj)
  },
  selectRealOrderByServer:(obj) => {
    let _sql = 'select * from realorder where orderTable=? and isPay = ?'
    return allOperation.query(_sql, obj)
  },
  delRealOrderFood:(obj) => {
    let _sql = 'delete from realorder where orderId=? and orderFoodName = ?'
    return allOperation.query(_sql, obj)
  },
  updateOrderFoodQuantity:(obj) => {
    let _sql = 'update realorder set orderFoodQuantity = ?  , orderValue = ? where orderId = ? and orderFoodName = ? and orderTable = ?'
    return allOperation.query(_sql, obj)
  },
  changeUserName:(obj) => {
    let _sql = 'update user set name = ?  where phone = ?'
    return allOperation.query(_sql, obj)
  },
  changeUserEmail:(obj) => {
    let _sql = 'update user set email = ?  where phone = ?'
    return allOperation.query(_sql, obj)
  },
  changeUserAvatar:(obj) => {
    let _sql = 'update user set avatar = ?  where phone = ?'
    return allOperation.query(_sql, obj)
  },
  changeUserPass:(obj) => {
    let _sql = 'update user set password = ?  where phone = ?'
    return allOperation.query(_sql, obj)
  },



}
module.exports = allOperation
// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const appid= wxContext.APPID
  const openid= wxContext.OPENID
  const unionid= wxContext.UNIONID
  var myDate = new Date(new Date().getTime() + 28800 * 1000);
  var orderDate = myDate.getFullYear() + "-" + 
  (myDate.getMonth() + 1) + "-" + 
  myDate.getDate() + " " +
  myDate.getHours() + ":" +
  myDate.getMinutes() + ":" +
  myDate.getSeconds();

  let status = db.collection('shop_user_order_list')
  .add({
    data: [
      {
        openid: openid,
        appid: appid,
        unionid: unionid,
        totalPrice: event.totalPrice,
        shopCartJson: event.shopCartJson,
        userInfoJson: event.userInfoJson,
        orderDate: orderDate,
        timer:myDate.getTime(),
        orderStatus:0
      },
    ]
  })
  return {
    status: 'success',
  }
}
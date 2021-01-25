// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const appid= wxContext.APPID
  const openid= wxContext.APPID
  const unionid= wxContext.APPID
  let status = db.collection('shop_user_order_list')
  .add({
    data: [
      {
        openid: openid,
        appid: appid,
        unionid: unionid,
        totalPrice: event.totalPrice,
        shopCartJson: event.shopCartJson,
        userInfoJson: event.userInfoJson
      },
    ]
  })
  return {
    status: 'success',
  }
}
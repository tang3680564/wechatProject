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
  var json = {};
  return await db.collection('shop_user_order_list')
  .where({
    openid: openid
  })
  .orderBy('_id', 'desc')
  .get({
    success: function (res) {
        return res
    }
  });
}
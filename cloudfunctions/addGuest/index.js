// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();
const col = db.collection('ml-ui-guest');

// 云函数入口函数
exports.main = async (event, context) => {
  const res = await col.add({
    data: [
      {
        openId: event.openId,
        times: 1,
        date: new Date()
      }
    ]
  });
  return {};
};

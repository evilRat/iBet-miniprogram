// 云函数入口文件
const rp = require('request-promise')
const jsdom = require('jsdom')

// 云函数入口函数
exports.main = async (event, context) => {
  let html = await rp(event.url);
  const dom = new jsdom.JSDOM(html)
  const document = dom.window.document
  return document.body.innerHTML;
}

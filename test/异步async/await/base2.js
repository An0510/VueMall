const co = require("co");
const fetch=require("node-fetch")
function* foo(){
    let response1 = yield fetch('https://juejin.cn/')
    console.log('response111')
    let response2 = yield fetch('https://www.Anblog.top')
    console.log('response222')
}
co(foo());
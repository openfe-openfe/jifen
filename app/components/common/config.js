'use strict'

module.exports = {
  header: {
    method: 'POST',
    mode: 'cors'
  },
  api: {
    base: 'http://192.168.1.111/jifen/',
    //首页list
    index: 'api.php/home/index/index_goods',
    log:'api.php/Home/Index/logs',
    goods:'api.php/Home/Goods',
    exchange:'api.php/Home/Goods/exchange',
    seller:'api.php/home/index/index_seller',
    shoplist:'api.php/Home/Goods/lists',
    categorylist:'api.php/Home/Goods/categorylist',
    integral:'api.php/Home/Users/integral',
    integralList:'api.php/Home/Users/integralList',
    exchangeList:'api.php/Home/Users/exchangeList',
    codeDetails:'api.php/Home/Users/codeDetails',
    slide:'api.php/Home/Index/slider'
  }
}
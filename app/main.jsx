import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute,hashHistory } from 'react-router'
/* 组件加载 */
import Container from './components/index/Container.jsx'
// import Home from './components/index/Home.jsx'
// import NewProduct from './components/index/NewProduct.jsx'
// import QualityMerchant from './components/index/QualityMerchant.jsx'
// import MyIntergral from './components/index/MyIntergral.jsx'
// import IntergralDetail from './components/index/IntergralDetail.jsx'
// import IntergralRule from './components/index/IntergralRule.jsx'
// import IntergralList from './components/index/IntergralList.jsx'
// import ExchangeNote from './components/index/ExchangeNote.jsx'
// import Unclaimed from './components/index/Unclaimed.jsx'
// import AlreadyReceive from './components/index/AlreadyReceive.jsx'
// import Expired from './components/index/Expired.jsx'
// import AllProduct from './components/index/Allproduct.jsx'
// import ShopList from './components/index/ShopList.jsx'
// import Detail from './components/index/detail/detail.jsx'
// import Coupon from './components/index/detail/Coupon.jsx'
// import Allshoplist from './components/index/Allshoplist.jsx'
// import AdsDetail from './components/index/detail/newsDetail.jsx'
/* 样式文件加载 */
import './css/reset.css'
import './css/modal.css'
/*slide滚动样式加载*/
import './lib/slick-carousel/slick/slick.css'
import './lib/slick-carousel/slick/slick-theme.css'
/*组件加载动画样式*/
import './components/common/loading.scss'

/*积分商城首页样式,新品推荐,所有分类,个人中心等css */
import './css/home.css'

/*积分商城列表详情样式 */
import './css/homeDetail.css'
const Home = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/Home.jsx'))
    },'Home')
}
const NewProduct = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/NewProduct.jsx'))
    },'newsproduct')
}
const QualityMerchant = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/QualityMerchant.jsx'))
    },'qualityMerchant')
}
const MyIntergral = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/MyIntergral.jsx'))
    },'MyIntergral')
}
const IntergralDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/IntergralDetail.jsx'))
    },'IntergralDetail')
}
const IntergralRule = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/IntergralRule.jsx'))
    },'IntergralRule')
}
const ExchangeNote = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/ExchangeNote.jsx'))
    },'ExchangeNote')
}
const Unclaimed = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/Unclaimed.jsx'))
    },'Unclaimed')
}
const AlreadyReceive = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/AlreadyReceive.jsx'))
    },'AlreadyReceive')
}
const Expired = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/Expired.jsx'))
    },'Expired')
}
const AllProduct = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/Allproduct.jsx'))
    },'AllProduct')
}
const ShopList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/ShopList.jsx'))
    },'ShopList')
}
const Detail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/detail/detail.jsx'))
    },'Detail')
}
const IntergralList = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/IntergralList.jsx'))
    },'IntergralList')
}
const Coupon = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/detail/Coupon.jsx'))
    },'Coupon')
}
const Allshoplist = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/Allshoplist.jsx'))
    },'Allshoplist')
}
const AdsDetail = (location, cb) => {
    require.ensure([], require => {
        cb(null, require('./components/index/detail/newsDetail.jsx'))
    },'AdsDetail')
}
render((
        <Router history={hashHistory}>
                <Route path="/" component={Container}>
                 <IndexRoute getComponent={Home}/>
                 <Route path="newsproduct" getComponent={NewProduct}/>
                 <Route path="qualityMerchant" getComponent={QualityMerchant}/>
                 <Route path="allproduct" getComponent={AllProduct}/>
                 <Route path="myintergral" getComponent={MyIntergral}/>
                 <Route path="intergraldetail" getComponent={IntergralDetail}/>
                 <Route path="intergralrule" getComponent={IntergralRule}/>
                 <Route path="intergrallist" getComponent={IntergralList}/>
                 <Route path="exchangenote" getComponent={ExchangeNote}/>
                 <Route path="unclaimed" getComponent={Unclaimed}/>
                 <Route path="alreadyreceive" getComponent={AlreadyReceive}/>
                 <Route path="shoplist" getComponent={ShopList}/>
                 <Route path="expired" getComponent={Expired}/>
                 <Route path="detail" getComponent={Detail}/>
                 <Route path="coupon" getComponent={Coupon}/>
                 <Route path="allshoplist" getComponent={Allshoplist}/>
                 <Route path="adsdetail" getComponent={AdsDetail}/>
                </Route>
        </Router> 
), document.getElementById('app'))

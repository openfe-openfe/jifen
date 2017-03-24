import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute,hashHistory } from 'react-router'
/* 组件加载 */
import Container from './components/index/Container.jsx'
import Home from './components/index/Home.jsx'
import NewProduct from './components/index/NewProduct.jsx'
import QualityMerchant from './components/index/QualityMerchant.jsx'
import MyIntergral from './components/index/MyIntergral.jsx'
import IntergralDetail from './components/index/IntergralDetail.jsx'
import IntergralRule from './components/index/IntergralRule.jsx'
import IntergralList from './components/index/IntergralList.jsx'
import ExchangeNote from './components/index/ExchangeNote.jsx'
import Unclaimed from './components/index/Unclaimed.jsx'
import AlreadyReceive from './components/index/AlreadyReceive.jsx'
import Expired from './components/index/Expired.jsx'
import AllProduct from './components/index/Allproduct.jsx'
import ShopList from './components/index/ShopList.jsx'
import Detail from './components/index/detail/detail.jsx'
import Coupon from './components/index/detail/Coupon.jsx'
import Allshoplist from './components/index/Allshoplist.jsx'
import AdsDetail from './components/index/detail/newsDetail.jsx'
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
render((
        <Router history={hashHistory}>
                <Route path="/" component={Container}>
                 <IndexRoute component={Home}/>
                 <Route path="newsproduct" component={NewProduct}/>
                 <Route path="qualityMerchant" component={QualityMerchant}/>
                 <Route path="allproduct" component={AllProduct}/>
                 <Route path="myintergral" component={MyIntergral}/>
                 <Route path="intergraldetail" component={IntergralDetail}/>
                 <Route path="intergralrule" component={IntergralRule}/>
                 <Route path="intergrallist" component={IntergralList}/>
                 <Route path="exchangenote" component={ExchangeNote}/>
                 <Route path="unclaimed" component={Unclaimed}/>
                 <Route path="alreadyreceive" component={AlreadyReceive}/>
                 <Route path="shoplist" component={ShopList}/>
                 <Route path="expired" component={Expired}/>
                 <Route path="detail" component={Detail}/>
                 <Route path="coupon" component={Coupon}/>
                 <Route path="allshoplist" component={Allshoplist}/>
                 <Route path="adsdetail" component={AdsDetail}/>
                </Route>
        </Router> 
), document.getElementById('app'))

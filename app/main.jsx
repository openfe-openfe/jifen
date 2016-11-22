import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

/* 组件加载 */
import App from './components/index/App.jsx'
import Home from './components/index/Home.jsx'
import HomeMonthly from './components/index/HomeMonthly.jsx'
import Lives from './components/lives/lives.jsx'
/* 样式文件加载 */
import './css/reset.css'
import './css/hotpage.css'
/*slide滚动样式加载*/
import './lib/slick-carousel/slick/slick.css'
import './lib/slick-carousel/slick/slick-theme.css'

render((
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="HomeMonthly" component={HomeMonthly}/>
            <Route path="home" component={Home}/>
            <Route path="lives" component={Lives}/>
        </Route>
    </Router>
), document.getElementById('app'))

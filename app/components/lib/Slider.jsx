import React from 'react'
import Slider from 'react-slick'
import NavLink from './NavLink.jsx'
import {get,post} from '../common/request.js'
//兼容ios等手机浏览器
import fetch from 'isomorphic-fetch'
import config from '../common/config.js'
import utilities from '../common/Utilities.js'
import Loading  from '../common/Loading.jsx'
export default React.createClass({
  getInitialState() {
    return {
      lists: [],
      loading:false
    }
  },
  componentWillMount(){
    this.setState({
      loading:true
    })
  },
  componentDidMount() {
       this.fetchFn()
  },
  // 获取数据
  fetchFn(){
   var that = this
        //var url='http://rap.taobao.org/mockjsdata/7918/songhao/batch'
        var url=config.api.base+config.api.slide
        var params={
          position:2,
          useraccount:utilities.getParameterByName('wv_account')
        }
       post(url,params)
        .then(function (response) {
            return response.json();
        })
      .then((data) => {
        //console.log(data.data)
        this.setState(
          {
            lists:data.data||'nopic',
            loading:false
          }
        )
       })
      .catch((e) => { console.log(e.message) })
  },
  render: function () {
    var settings = {
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        dots:true,
        touchMove:true
    }
    if(this.state.lists.length==1){
      settings.autoplay=false,
      settings.dots=false,
      settings.touchMove=false
    }
    return (
        <Slider {...settings}>
          {
            this.state.lists=='nopic'
            ?<NavLink to={{pathname:"/intergralrule"}}><div><img src="http://ww3.sinaimg.cn/large/005EbfWqjw1f83ei47xouj30hs04s0ul" className="HomeBanner-image-2T6G"/></div></NavLink>
            :this.state.lists.map((e,index) => {
                return (
                  <div className="slide" key={index}>
                    {
                      e.types=='1'?
                      <NavLink to={{pathname:"/detail",query:{id:e.goodsid,ads:e.id}}}><div><img src={e.img} className="HomeBanner-image-2T6G"/></div></NavLink>
                      :<NavLink to={{pathname:"/adsdetail",query:{id:e.id}}}><div><img src={e.img} className="HomeBanner-image-2T6G"/></div>
                    </NavLink>
                    }
                  </div>
                )
            })
          }
        </Slider>
    );
  }
});

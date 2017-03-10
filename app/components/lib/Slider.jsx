import React from 'react'
import Slider from 'react-slick'
import NavLink from './NavLink.jsx'
import request from '../common/request.js'
import config from '../common/config.js'
import utilities from '../common/Utilities.js'
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
        var formdata=new FormData();
        formdata.append('position',2)
        formdata.append('useraccount',utilities.getParameterByName('wv_account'))
        console.log('123'+utilities.getParameterByName('wv_account'))
        fetch(url,{
            method: 'POST',
            cache: 'default',
            body: formdata
        })
        .then(function (response) {
            return response.json();
        })
      .then((data) => {
        //console.log(data)
        this.setState(
          {
            lists:data.data||[],
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
        dots:true
    }
    return (
        <Slider {...settings}>
          {
            this.state.lists.map((e,index) => {
                return (
                  <div className="slide" key={index}>
                    {
                      e.types=='1'?
                      <NavLink to={{pathname:"/detail",query:{id:e.goodsid,ads:e.id}}}><div style={{height:'8rem'}}><img src={e.img} className="HomeBanner-image-2T6G"/></div></NavLink>
                      :<NavLink to={{pathname:"/adsdetail",query:{id:e.id}}}><div style={{height:'8rem'}}><img src={e.img} className="HomeBanner-image-2T6G"/></div>
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

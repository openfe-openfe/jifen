import React from 'react'
import Slider from 'react-slick'
import request from '../commen/request.js'
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
    var that=this
    request.get('http://rap.taobao.org/mockjsdata/7918/songhao/headlines')
      .then((data) => {
        console.log(data)
        this.setState(
          {
            lists:data.data,
            loading:false
          }
        )
       })
      .catch((e) => { console.log(e.message) })
  },
  render: function () {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true
    }
    return (
        <Slider {...settings}>
          {

            this.state.lists.map((e,index) => {
                return (
                  <div className="" key={index}>
                    <div><img src={e.image_mobile} className="HomeBanner-image-2T6G"/></div>
                  </div>
                )
            })
          }
        </Slider>
    );
  }
});

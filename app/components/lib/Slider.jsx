import React from 'react'
import Slider from 'react-slick'

export default React.createClass({
  render: function () {
    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true
    };
    return (
        <Slider {...settings}>
          <div><img src={require('../../img/eat.jpg')} className="HomeBanner-image-2T6G"/></div>
          <div><img src={require('../../img/network.jpg')} className="HomeBanner-image-2T6G"/></div>
          <div><img src={require('../../img/skip.jpg')} className="HomeBanner-image-2T6G"/></div>
        </Slider>
    );
  }
});

import React from 'react'
import Slider from '../lib/Slider.jsx'
import NavLink from '../lib/NavLink.jsx'
import request from '../common/request.js'
import config from '../common/config.js'
import utilities from '../common/Utilities.js'
import Loading  from '../common/Loading.jsx'
export default class Home extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          lists: [],
          loading:false,
          bottomTxt: '',
          pageIndex:1,
          pageCount: 0,

      }

  }
  componentWillMount(){
    // var WVAccount=this.props.location.query
    // console.log(WVAccount)
    var wv_account=utilities.getParameterByName('wv_account')
    console.log(wv_account)
    localStorage.setItem('wv_account',wv_account)
    this.setState({
      loading:true
    })
  }
  isseller=()=>{
    var that=this
    var url=config.api.base+config.api.isseller
    var formdata=new FormData();
       formdata.append('user_account',utilities.getParameterByName('wv_account'))
       fetch(url,{
          method: 'POST',
          cache: 'default',
          body: formdata
      })
      .then(function (response) {
          return response.json();
      })
      .then((data)=>{
        // console.log(123)
        if(data.flag==1){
          var sid=data.data.sid
          var id='商户中心'+','+sid
          try {
              csb.WVNavRightButton(true,'商户中心',id)
          } catch (e) {
            try{
              window.webkit.messageHandlers.WVNavRightButton.postMessage([true,'商户中心',id])
            }catch(e){
              console.log('没有在潍V内打开')
            }
          }
        }
      })
      .catch((err) => {
      console.log(err)
    })
  }
  log=()=>{
    var that=this
    // 获取用户手机型号(记录日志功能)
    var phonetype=''
    var ua = navigator.userAgent.toLowerCase()
    if (/iphone|ipad|ipod/.test(ua)){
       phonetype='iOS'
      }else if (/android/.test(ua)) {
      phonetype='Android'
    }
    var url=config.api.base+config.api.log
     var formdata=new FormData();
        formdata.append('useraccount',utilities.getParameterByName('wv_account'))
        formdata.append('os',phonetype)
         fetch(url,{
            method: 'POST',
            cache: 'default',
            body: formdata
        })
        .then(function (response) {
            return response.json();
        })
        .then((data)=>{
          //console.log(123)
        })
        .catch((err) => {
        console.log(err)
      })
  }
  wv_account=(WVAccount)=>{
    console.log(WVAccount)
  }
  loadList = () => {
        var that = this
        //var url='http://rap.taobao.org/mockjsdata/7918/songhao/batch'
        var url=config.api.base+config.api.index
        var formdata=new FormData();
        formdata.append('page',that.state.pageIndex)
        formdata.append('type',1)
        fetch(url,{
            method: 'POST',
            cache: 'default',
            body: formdata
        })
        .then(function (response) {
            return response.json();
        })
       .then((data) => {
         //console.log(data.msg)
        //console.log(data.total)
        if(data.flag==0||data.data==''){
            that.setState({loading:false,bottomTxt:'我是有底线的'})
            return false
        }
        that.setState({
          pageCount:data.page.count
        })
        if(data.page.count==1){
          that.setState({lists: data.data,loading:false,bottomTxt:'我是有底线的'})
        }
        if(that.state.pageIndex == 1){
                that.setState({lists: data.data,loading:false})
            }else{
                that.setState({lists: that.state.lists.concat(data.data),loading:false})
            }
            that.setState({pageIndex: that.state.pageIndex+1})
        });
    }
  componentDidMount() {
       document.addEventListener('scroll', this.handleScroll)
       utilities.setLocalTitle('积分商城')
       this.isseller()
       this.loadList()
       this.log()
  }
    componentWillUnmount() {
       document.removeEventListener('scroll', this.handleScroll);
    }
  handleScroll = () => {
        var that = this;
        var a = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var b = document.documentElement.scrollTop==0? document.body.scrollTop : document.documentElement.scrollTop;
        var c = document.documentElement.scrollTop==0? document.body.scrollHeight : document.documentElement.scrollHeight;
        if(a+Math.floor(b)==c || a+Math.ceil(b)==c){
          if (that.state.pageIndex <= that.state.pageCount){

                that.loadList();
            }else{
               that.setState({bottomTxt: '我是有底线的'});
            }
        }
    }
  render() {
    var that=this
    return (
        <div>
          <div className="">
            <div className="">
              <Slider/>
              <div className="In_card shadow">
                <div className="list_icon E_f12 E_fc_grey1">
                  <NavLink to="newsproduct">
                    <div className="rightLine">
                      <img src="http://oeinf1vjn.bkt.clouddn.com/%E7%83%AD%E9%97%A8%E5%85%91%E6%8D%A2.png"  className="icon_breast"/>
                      <p>热门兑换</p>
                    </div>
                  </NavLink>
                  <NavLink to="qualityMerchant">
                    <div className="rightLine">
                      <img src="http://oeinf1vjn.bkt.clouddn.com/%E4%BC%98%E8%B4%A8%E5%95%86%E5%AE%B6.png"  className="icon_breast"/>
                      <p>优质商家</p>
                    </div>
                  </NavLink>

                  <NavLink to="allproduct">
                    <div className="rightLine">
                      <img src="http://oeinf1vjn.bkt.clouddn.com/%E6%89%80%E6%9C%89%E5%88%86%E7%B1%BB.png"  className="icon_breast"/>
                      <p>所有商品</p>
                    </div>
                  </NavLink>
                   <NavLink to="myintergral">
                    <div className="rightLine">
                      <img src="http://oeinf1vjn.bkt.clouddn.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83.png"  className="icon_breast"/>
                      <p>个人中心</p>
                    </div>
                  </NavLink>
                </div>
              </div>

              {
                  that.state.lists.map((e,index) => {
                      return (
                        <NavLink to={{pathname:"/detail",query:{id:e.id}}} className="product_href block_href" key={index}>

                              <div className="gift_list">
                                <img src={e.thumbnail} alt="图片" className="product_img"/>
                                <div className="gift_desc">
                                  <div className="desc_wrap">
                                    <div className="desc_title E_f16 E_fc_grey1">{e.goodsname}</div>
                                    <div className="desc_charge">
                                      <i className="gold_logo"></i>
                                      {
                                        e.youhui>0?
                                        <span className="new_price E_f15 E_fc_orange">{e.jifen_youhui}</span>
                                        : <span className="new_price E_f15 E_fc_orange">{e.jifen}</span>
                                      }
                                      <div className="ori_charge E_f12 E_fc_grey7">
                                        <em>价值: </em><span className="old_price">{e.price}</span>
                                      </div>
                                    </div>
                                    <div className="change_his E_f12 E_fc_grey6">
                                      <span className="left_txt"><span className="exg_txt">已兑</span>
                                      <span className="exg_num">{e.sold+'%'}</span></span>
                                      <span className="right_txt"><span className="rate_bar">
                                        <span style={{width:e.sold+"%"}}></span></span></span>
                                    </div>
                                  </div>
                                </div>
                                <div className="tag_wrap">
                                  {
                                    e.change_percent=='100'?<i className="end_tag"></i>:<i className="desc_tag"></i>
                                  }
                                </div>
                              </div>

                          </NavLink>
                      )
                  })
               }
              { that.state.bottomTxt?<div className="loadmore">{that.state.bottomTxt}</div>:<Loading/>  }
            </div>
          </div>

        </div>
    )
  }
}

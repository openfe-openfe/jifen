import React from 'react'
import Slider from '../lib/Slider.jsx'
import NavLink from '../lib/NavLink.jsx'
import { get, post } from '../common/request.js'
import fetch from 'isomorphic-fetch';
import config from '../common/config.js'
import utilities from '../common/Utilities.js'
import Loading  from '../common/Loading.jsx'
import ItemList from './ItemList.jsx'
class Home extends React.Component {
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
    // console.log(wv_account)
    localStorage.setItem('wv_account',wv_account)
    this.setState({
      loading:true
    })
  }
  isseller=()=>{
    var that=this
    var url=config.api.base+config.api.isseller
    var params={
      user_account:utilities.getParameterByName('wv_account')
    }
    post(url,params)
      .then(function (response) {
          return response.json();
      })
      .then((data)=>{
        // console.log(123)
        if(data.flag==1){
          var sid=data.data.sid
          localStorage.setItem('sid',sid)
          var id='商户中心'+','+sid
          const url='http://webapp.icloudcity.cn:7070/#/seller'

          try {
            csb.WVNavRightButton(true,'商户中心',url)
            WVJsFunction.WVSaveData(JSON.stringify({'sid':sid,'wv_account':utilities.getParameterByName('wv_account')}))
            WVJsFunction.showTitle(true)
       } catch (e) {
         try{
           window.webkit.messageHandlers.WVNavRightButton.postMessage([true,'商户中心',url])
           // alert(sid)
           window.webkit.messageHandlers.WVSaveData.postMessage({'sid':sid,'wv_account':utilities.getParameterByName('wv_account')})
           window.webkit.messageHandlers.WVJsFunction.postMessage({showTitle:true})
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
    var params={
      useraccount:utilities.getParameterByName('wv_account'),
      os:phonetype
    }
     post(url,params)
        .then(function (response) {
            return response.json();
        })
        .then((data)=>{
          //console.log(123)
        })
        .catch((err) => {
        console.log(phonetype)
      })
  }
  wv_account=(WVAccount)=>{
    // console.log(WVAccount)
  }
  loadList = () => {
        var that = this
        //var url='http://rap.taobao.org/mockjsdata/7918/songhao/batch'
        var url=config.api.base+config.api.index
        var params={
           useraccount:utilities.getParameterByName('wv_account'),
           page:that.state.pageIndex,
           type:1
        }
        post(url,params)
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
       console.info("看代码，先来了解一下作者呀~ \n %c https://github.com/songhaoreact","color:#47c9bc;font-size:18px")
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
                  <NavLink to={{pathname:"/newsproduct"}}>
                    <div className="rightLine">
                      <img src="http://oeinf1vjn.bkt.clouddn.com/%E7%83%AD%E9%97%A8%E5%85%91%E6%8D%A2.png"  className="icon_breast"/>
                      <p>热门兑换</p>
                    </div>
                  </NavLink>
                  <NavLink to={{pathname:"/qualityMerchant"}}>
                    <div className="rightLine">
                      <img src="http://oeinf1vjn.bkt.clouddn.com/%E4%BC%98%E8%B4%A8%E5%95%86%E5%AE%B6.png"  className="icon_breast"/>
                      <p>优质商家</p>
                    </div>
                  </NavLink>

                  <NavLink to={{pathname:"/allproduct"}}>
                    <div className="rightLine">
                      <img src="http://oeinf1vjn.bkt.clouddn.com/%E6%89%80%E6%9C%89%E5%88%86%E7%B1%BB.png"  className="icon_breast"/>
                      <p>所有商品</p>
                    </div>
                  </NavLink>
                   <NavLink to={{pathname:"/myintergral"}}>
                    <div className="rightLine">
                      <img src="http://oeinf1vjn.bkt.clouddn.com/%E4%B8%AA%E4%BA%BA%E4%B8%AD%E5%BF%83.png"  className="icon_breast"/>
                      <p>个人中心</p>
                    </div>
                  </NavLink>
                </div>
              </div>
              <ItemList list={that.state.lists}/>
              { that.state.bottomTxt?<div className="loadmore">{that.state.bottomTxt}</div>:<Loading/>  }
            </div>
          </div>

        </div>
    )
  }
}
module.exports=Home
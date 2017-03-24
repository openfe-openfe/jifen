import React from 'react'
import NavLink from '../lib/NavLink.jsx'
import request from '../common/request.js'
import config from '../common/config.js'
import utilities from '../common/Utilities.js'
import Loading  from '../common/Loading.jsx'
// import {CountDownText} from '../common/test/index'
class MyIntergral extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          jifen: '',
          loading:false,
          bottomTxt: '',
          pageIndex:1,
          pageCount: 0,
          countingDone:false,
          codeSent:false
      }
  }
  componentWillMount(){
    this.setState({
      loading:true
    })
    
  }

  componentDidMount() {
       utilities.setLocalTitle('个人中心')
       this.fetchFn()
  }
  // 获取数据
  fetchFn(){
       var that=this
        var url=config.api.base+config.api.integral
        var formdata=new FormData();
        formdata.append('useraccount',localStorage.getItem('wv_account'))
        fetch(url,{
            method: 'POST',
            body: formdata
        })
        .then(function (response) {
            return response.json();
        })
      .then((data) => {
        console.log(data.data)
        that.setState(
          {
            jifen:data.data,
            loading:false
          }
        )
       })
      .catch((e) => { console.log(e.message) })
  }
  _sendVerifyCode(){
    this.setState({
      countingDone:false
    })
  }
  render() {
     var styleObj = {
            color:"#fff",
            fontSize:16,
            fontWeight:"normal",
            textAlign:"center",
            margin:'0 auto',
            background:"#ee735c",
            width:120,
            height:40,
            lineHeight:'40px',
            marginTop:10,
        } 
    var that=this
    return (
        <div>
          <div className="">
              {
                that.state.loading
                ?<Loading/>
                :null
              }
              <div className="shadow">
                  <div className="my_intergral">
                      <p className="integral_rel E_f12">当前积分</p>
                      <p className="point_num">{that.state.jifen}</p>
                      <NavLink to="/intergraldetail" className="rule_link integral_rel E_f12">
                        <i className=""></i>
                      </NavLink>
                  </div>
              </div>
              <div className="In_content_title E_f14 E_fc_grey6">
                  兑换积分领取
              </div>
              <div className="In_card shadow">
                <div className="list_icon list_icon3 E_f12 E_fc_grey1">
                  <NavLink to={{pathname:'/unclaimed'}}>
                    <div className="rightLine">
                      <img src="http://oij04cgoe.bkt.clouddn.com/weilingqu.png"  className="icon_breast"/>
                      <p>已兑换</p>
                    </div>
                  </NavLink>
                  <NavLink to="/alreadyreceive">
                    <div className="rightLine">
                      <img src="http://oij04cgoe.bkt.clouddn.com/yilingqu.png"  className="icon_breast"/>
                      <p>已领取</p>
                    </div>
                  </NavLink>

                  <NavLink to="/expired">
                    <div className="rightLine">
                      <img src="http://oij04cgoe.bkt.clouddn.com/yiguoqi.png"  className="icon_breast"/>
                      <p>已过期</p>
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="instruction">
                  <NavLink to="/exchangenote">兑换说明</NavLink>
              </div>
          </div>
        </div>
    )
  }
}
module.exports=MyIntergral
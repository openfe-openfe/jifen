import React from 'react'
import NavLink from '../lib/NavLink.jsx'
import request from '../common/request.js'
import config from '../common/config.js'
import utilities from '../common/Utilities.js'
import Loading  from '../common/Loading.jsx'
// import {CountDownText} from '../common/test/index'
export default class MyIntergral extends React.Component {
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
                      <NavLink to="intergraldetail" className="rule_link integral_rel E_f12">
                        <i className=""></i>
                      </NavLink>
                  </div>
              </div>
              <div className="In_content_title E_f14 E_fc_grey6">
                  兑换积分领取
              </div>
              <div className="In_card shadow">
                <div className="list_icon list_icon3 E_f12 E_fc_grey1">
                  <NavLink to="unclaimed">
                    <div className="rightLine">
                      <img src="http://oij04cgoe.bkt.clouddn.com/weilingqu.png"  className="icon_breast"/>
                      <p>未领取</p>
                    </div>
                  </NavLink>
                  <NavLink to="alreadyreceive">
                    <div className="rightLine">
                      <img src="http://oij04cgoe.bkt.clouddn.com/yilingqu.png"  className="icon_breast"/>
                      <p>已领取</p>
                    </div>
                  </NavLink>

                  <NavLink to="expired">
                    <div className="rightLine">
                      <img src="http://oij04cgoe.bkt.clouddn.com/yiguoqi.png"  className="icon_breast"/>
                      <p>已过期</p>
                    </div>
                  </NavLink>
                </div>
              </div>
              <div className="instruction">
                  <NavLink to="exchangenote">兑换说明</NavLink>
              </div>
              {/*{
                that.state.countingDone
                ?<p style={styleObj} onClick={this._sendVerifyCode.bind(this)}>获取验证码</p>
                : <CountDownText
                style={styleObj}
                countType='seconds' // 计时类型：seconds / date 
                auto={true} // 自动开始 
                afterEnd={() => {this.setState({
                  countingDone:true
                })}} // 结束回调 
                timeLeft={5} // 正向计时 时间起点为0秒 
                step={-1} // 计时步长，以秒为单位，正数则为正计时，负数为倒计时 
                startText='获取验证码' // 开始的文本 
                endText='获取验证码' // 结束的文本 
                intervalText={(sec) => sec + '秒重新获取'} // 定时的文本回调 
                />
              }
             */}
          </div>
        </div>
    )
  }
}

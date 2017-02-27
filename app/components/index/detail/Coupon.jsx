var React =require('react')
var ReactDOM = require('react-dom')
var QRCode = require('qrcode.react');
import NavLink from '../../lib/NavLink.jsx'
import DetailHeader from './detailHeader.jsx'
import DetailActity from './detailActity.jsx'
import DetailDes from './detailDes.jsx'
import utilities from '../../common/Utilities.js'
import config from '../../common/config.js'
import request from '../../common/request.js'
import Loading  from '../../common/Loading.jsx'
var coupon =React.createClass({
  
  getInitialState: function() {
    return {
       lists: '',
       code: {
         type:'jifenshangcheng',
         code:''
       },
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
     var url=config.api.base+config.api.codeDetails
        var formdata=new FormData();
        formdata.append('code',utilities.getParameterByName('id'))
        formdata.append('goodsname',utilities.getParameterByName('name'))
        formdata.append('useraccount',localStorage.getItem('wv_account'))
     fetch(url,{
            method: 'POST',
            body: formdata
        })
        .then(function (response) {
            return response.json();
        })
      .then((data) => {
        //console.log(data.data)
        that.setState(
          {
            lists:data.data,
            code:{
              type:'jifenshangcheng',
              code:data.data.code
            },
            loading:false
          }
        )
       })
      .catch((e) => { console.log(e.message) })
  },
  render() {
    var lists=this.state.lists
    return (
        <div>
          {
                this.state.loading
                ?<Loading/>
                :null
              }
          <div className="older_detail">
            <div className="older_header">
                <p className="header_detail">订单详情</p>
                <p>订单号码：{lists.orderno}</p>
                <p>支付时间：{lists.paytime}</p>
            </div>
            <div className="coupon_container">
              <div className="stamp coupon_detail">
                <div className="coupon_header">
                  <p>{lists.goodsname}</p>
                </div>
                <div className="coupon_time">
                  <p>有效期至：{lists.endtime}</p>
                </div>
                <div className="coupon_way">
                  <p>使用方法：实体店扫码验证兑换</p>
                </div>
              </div>
            </div>
            <div className="older_code">
              <QRCode value={this.state.code+''}/>
            </div>
            <div className="business_info">
              <p style={{paddingLeft:'10px',marginBottom:'10px'}}>商家信息</p>
              <div className="business_info_detail">
                <div className="shadow In_bg_white">
                    <div className="change_info_business">
                      <a href="#">
                        <div className="business_wrap" style={{height:'6rem'}}>
                          <img src={lists.shoplogo} className="business_img" style={{height:'6rem',width:'6rem'}}/>
                          <div className="business_desc">
                            <div className="desc_wrap">
                              <p className="desc_name E_f16 E_fc_grey1">{lists.shopname}</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                </div>
                <div className="shadow In_bg_white">
                    <div className="change_info_business">
                      <a href="#">
                        <div className="business_wrap2">
                          <div className="business_desc">
                            <div className="desc_wrap">
                              <p className="desc_name E_f16 E_fc_grey2">商家地址：{lists.shopaddress}</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                </div>
                 <div className="shadow In_bg_white">
                    <div className="change_info_business">
                      <a href="#">
                        <div className="business_wrap2">
                          <div className="business_desc">
                            <div className="desc_wrap">
                              <p className="desc_name E_f16 E_fc_grey2">商家电话：{lists.shoptel}</p>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                </div>
              </div> 
            </div>
          </div>
        </div>
    )
  }
})
module.exports = coupon

var React =require('react')
var ReactDOM = require('react-dom')
var Modal = require('react-modal')
// import request from '../../common/request.js'
import fetch from 'isomorphic-fetch'
import Loading  from '../../common/Loading.jsx'
import NavLink from '../../lib/NavLink.jsx'
import config from '../../common/config.js'
import utilities from '../../common/Utilities.js'
var detailHeader =React.createClass({
  getInitialState: function() {
    return {
      modalIsOpen: false,
      modalIsOpenPay:false,
      modalIsOpenLoading:false,
      modalIsOpenError:false,
      residualIntegral:0,
      loading:false,
      errorMsg:'',
      code:''
     }
  },
  componentWillMount(){
    this.setState({
      loading:true
    })
  },
  componentDidMount() {
    this.setState({
      loading:false
    })
  },
  openModalSponsorship(){
   this.setState({modalIsOpen: true})
  },
  closeModal() {
    this.setState({modalIsOpen: false})
  },
  closeModalPay(){
    this.setState({modalIsOpenPay:false})
    location.reload()
  },
  closeModalErr(){
    this.setState({modalIsOpenError:false})
  },
  afterOpenModal() {
  },
//  处理积分兑换的逻辑
  exchange(){
    // 拿到上下文
    var that=this
    //商品的价格
    var price=that.props.detail.price
    var youhui=that.props.detail.price_youhui
    //兑换券有效期天数
    var days=that.props.detail.days
    // 商品所需积分
    const integral=that.props.detail.jifen
    //用户积分
    var crore=that.props.detail.userIntegral
    //商品id
    var goodsid=that.props.detail.goodsid
    //商品分类id
    var catid=that.props.detail.catid
    //商铺shopid
    var shopid=that.props.detail.shopid
    //购买人的潍V号
    var useraccount=localStorage.getItem('wv_account')||utilities.getParameterByName('wv_account')
    //推荐位id
    var tjwid=that.props.detail.tjwid

    //兑换之后的用户剩余积分
    var residualIntegral=crore-integral
    //console.log(residualIntegral)
    if(true){
      that.setState({modalIsOpen: false})
      that.setState({modalIsOpenLoading: true})
      //发送fetch请求处理订单。。。
      var url=config.api.base+config.api.exchange
      var formdata=new FormData();
          formdata.append('goodsid',goodsid)
          formdata.append('catid',catid)
          formdata.append('shopid',shopid)
          formdata.append('useraccount',useraccount)
          formdata.append('price',price)
          formdata.append('jifen',integral)
          formdata.append('days',days)
          formdata.append('youhui',youhui)
      fetch(url,{
            method: 'POST',
            body: formdata
        })
        .then(function (response) {
            return response.json();
        })
      .then((data)=>{
        console.log(data)
        if(data.flag==0){
          that.setState({errorMsg:data.msg})
          that.setState({modalIsOpenLoading:false})
          that.setState({modalIsOpenError:true})
        }
        if(data.flag==1){
          that.setState({code:data.data})
          that.setState({modalIsOpenLoading:false})
          that.setState({modalIsOpenPay:true})
        }
      })
    }
  },
    render() {
      var that=this
      var lists=this.props.detail
      // console.log(lists)
        return(
          <div className="In_card shadow In_bg_white">
            {
                that.state.loading
                ?<Loading/>
                :null
            }
            <div className="change_info_head">
              <div className="head_canbuy">
                <img src={lists.goodslogo} alt="商品"/>
                {
                  lists.mostbuynum>0?<div className="canbuynum">
                    <img src="http://oij04cgoe.bkt.clouddn.com/1.png"alt="商品"/>
                    <span>限购{lists.mostbuynum}件</span>
                  </div>
                  :null
                }
                </div>
              <div className="info_wrap">
                <div className="info_name">
                  <p className="info_title E_f16 E_fc_grey1">{lists.goodsname}</p>
                  <div className="info_act">
                    <div className="value_wrap">
                      <i className="infor_gold"></i>
                      {
                        lists.jifen_youhui>0?
                        <span  className="info_points E_f24 E_fc_orange">{lists.jifen_youhui}</span>
                        :<span  className="info_points E_f24 E_fc_orange">{lists.jifen}</span>
                      }


                      {
                        lists.price_youhui!==0?
                        <span className="info_value2 E_f12 E_fc_grey"><i className="infor_gold" style={{fontSize:'16px',color:'#939393',marginRight:'0.5rem'}}></i>{lists.jifen}</span>
                        :null
                      }
                      <div className="info_box">
                        <span className="E_f12 E_fc_grey7">价值:&nbsp;&nbsp;<span className="info_value">￥{lists.price}</span></span>
                      </div>
                    </div>
                    {
                      
                      lists.userIntegral-lists.jifen>=0 && lists.inventory>0 && lists.canbuynum!==0 ||lists.jifen_youhui>0&&lists.userIntegral-lists.jifen_youhui>=0&& lists.inventory>0 && lists.canbuynum!==0
                      ?<button className="change_btn_org" onClick={this.openModalSponsorship}>
                        兑换
                        </button>
                      :<button className="change_btn_gray">{
                        lists.inventory==0?'已兑完':
                        lists.canbuynum==0? '限购'+lists.mostbuynum+'件':'积分不足'
                        }</button>
                    }

                      <Modal
                          isOpen={this.state.modalIsOpen}
                          onAfterOpen={this.afterOpenModal}
                          onRequestClose={this.closeModal}
                          overlayClassName="Dialog-overlay-2RlI"
                          className="Dialog-content-3qxv"
                          contentLabel="Modal"
                       >
                      <div className="outer E_layer">
                        <div className="content">
                          <div className="layer_common">
                            <span>商品兑换后，积分不返还，请在兑换券有效时间内到指定实体店兑换<label style={{color:'#FF9900'}}>（有效期{lists.days}天)</label>。兑换将消耗<label style={{color:'#FF9900'}}>{lists.integral}</label>积分，确定要兑换吗</span>
                            <ul className="E_layer_btn">
                              <li><a  className="E_btn_grey" onClick={this.closeModal}>取消</a></li>
                              <li><a  className="E_btn_grey btn_ok" onClick={this.exchange}>兑换</a></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                     </Modal>
                       <Modal
                          isOpen={this.state.modalIsOpenLoading}
                          onAfterOpen={this.afterOpenModaLoading}
                          onRequestClose={this.closeModalLoading}
                          overlayClassName="Dialog-overlay-2RlI"
                          className="Dialog-content-3qxv"
                          contentLabel="Modal"
                       >
                      <div className="outer E_layer">
                        <div className="content">
                          <Loading/>
                          <div style={{paddingBottom:'20px'}}>努力兑换中...</div>
                        </div>
                      </div>
                     </Modal>
                     <Modal
                          isOpen={this.state.modalIsOpenError}
                          onAfterOpen={this.afterOpenModaError}
                          onRequestClose={this.closeModalError}
                          overlayClassName="Dialog-overlay-2RlI"
                          className="Dialog-content-3qxv"
                          contentLabel="Modal"
                       >
                      <div className="outer E_layer">
                        <div className="content">
                          <div style={{paddingBottom:'20px',paddingTop:'20px'}}>{this.state.errorMsg}</div>
                          <a  className="E_btn_grey btn_ok" onClick={this.closeModalErr}>确定</a>
                        </div>
                      </div>
                     </Modal>
                      <Modal
                          isOpen={this.state.modalIsOpenPay}
                          onAfterOpen={this.afterOpenModalPay}
                          onRequestClose={this.closeModalPay}
                          overlayClassName="Dialog-overlay-2RlI"
                          className="Dialog-content-3qxv"
                          contentLabel="Modal"
                       >
                      <div className="outer E_layer">
                        <div className="content">
                          <div className="layer_common">
                            <span><label style={{color:'#FF9900'}}>兑换成功</label></span>
                            <ul className="E_layer_btn">
                              <li><a  className="E_btn_grey" onClick={this.closeModalPay}>继续兑换</a></li>
                              <li><NavLink to={{pathname:"/coupon",query:{id:that.state.code,name:that.props.detail.goodsname}}} className="E_btn_grey btn_ok">查看订单</NavLink></li>
                            </ul>
                          </div>
                        </div>
                      </div>
                     </Modal>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
})
module.exports = detailHeader

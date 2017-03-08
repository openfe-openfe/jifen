var React =require('react')
var ReactDOM = require('react-dom')
var Modal = require('react-modal')
import request from '../../common/request.js'
import Loading  from '../../common/Loading.jsx'
import NavLink from '../../lib/NavLink.jsx'
import config from '../../common/config.js'
import utilities from '../../common/Utilities.js'
var detailHeader =React.createClass({
  getInitialState: function() {
    return {
      modalIsOpen: false,
      modalIsOpenPay:false,
      residualIntegral:0,
      loading:false,
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
    if(residualIntegral>0){
      that.setState({modalIsOpen: false})
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
        if(data.flag==1){
             that.setState({code:data.data})
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
              <img src={lists.goodslogo} alt="商品"/>
              <div className="info_wrap">
                <div className="info_name">
                  <p className="info_title E_f16 E_fc_grey1">{lists.item_name}</p>
                  <div className="info_act">
                    <div className="value_wrap">
                      <i className="infor_gold"></i>
                      {
                        lists.jifen_youhui>0?
                        <span  className="info_points E_f24 E_fc_orange">{lists.jifen_youhui}</span>
                        :<span  className="info_points E_f24 E_fc_orange">{lists.jifen}</span>
                      } 
                      <span className="info_value E_f12 E_fc_grey7">价值{lists.price}</span>
                      {
                        lists.price_youhui!==null?
                        <span className="info_value2 E_f12 E_fc_org">优惠积分：{lists.jifen_youhui}</span>
                        :null
                      }
                    </div>
                    {
                      lists.userIntegral-lists.jifen>0 && lists.inventory>0 && lists.canbuynum!==0
                      ?<button className="change_btn_org" onClick={this.openModalSponsorship}>
                        兑换
                        </button>
                      :<button className="change_btn_gray">{
                        lists.userIntegral-lists.jifen>0 && lists.canbuynum==0?'兑换上限':
                        lists.userIntegral-lists.jifen>0 && lists.inventory==0?'已兑完':'积分不足'
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
                            <span>商品兑换后，积分不返还，请在兑换券有效时间内到指定实体店兑换<label style={{color:'#FF9900'}}>（有效期7天)</label>。兑换将消耗<label style={{color:'#FF9900'}}>{lists.integral}</label>积分，确定要兑换吗</span>
                            <ul className="E_layer_btn">
                              <li><a  className="E_btn_grey" onClick={this.closeModal}>取消</a></li>
                              <li><a  className="E_btn_grey btn_ok" onClick={this.exchange}>兑换</a></li>
                            </ul>
                          </div>
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
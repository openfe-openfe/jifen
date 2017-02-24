import React from 'react'
import NavLink from '../lib/NavLink.jsx'
import request from '../common/request.js'
import config from '../common/config.js'
import utilities from '../common/Utilities.js'
import Loading  from '../common/Loading.jsx'
export default class IntergralList extends React.Component {
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
    this.setState({
      loading:true
    })
    
  }
  // 获取数据
  loadList(){
    var that = this
        //var url='http://rap.taobao.org/mockjsdata/7918/songhao/batch'
        var url=config.api.base+config.api.exchangeList
        var formdata=new FormData();
        formdata.append('page',that.state.pageIndex)
        formdata.append('useraccount',localStorage.getItem('wv_account'))
        formdata.append('status',0)
        fetch(url,{
            method: 'POST',
            body: formdata
        })
        .then(function (response) {
            return response.json();
        })
       .then((data) => {
         console.log(data.msg)
        //console.log(data.total)
        that.setState({
          pageCount:data.page.count
        })
        if(data.page.count==1){
          that.setState({lists: data.data,loading:false,bottomTxt:'到底儿了'})
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
       document.addEventListener('scroll', this.handleScroll);
       this.loadList()
  }
    componentWillUnmount() {
       document.removeEventListener('scroll', this.handleScroll);
    }
  handleScroll = () => {
        var _this = this;
        var scrolltop = document.body.scrollTop || document.documentElement.scrollTop;
        var clientHeight = document.documentElement.clientHeight;
        if(scrolltop + clientHeight==document.body.clientHeight){
            if (_this.state.pageIndex <= _this.state.pageCount){
                 _this.loadList();
            }else{
                _this.setState({bottomTxt: '到底儿了~'});

            }
        }
    }
  render() {
    var that=this
    return (
        <div>
          <div className="">
              <div className="change_history">
                  <div  className="history_pay">
                      {
                          that.state.lists.map((e,index)=>{
                              return(
                                 <NavLink to={{pathname:"/coupon",query:{id:e.code,name:e.goodsname}}} className="product_href block_href" key={index}>
                                    <div className="gift_list">
                                        <img src={ e.logo} alt="礼品"/>
                                        <div className="gift_desc">
                                            <div className="desc_wrap">
                                                <div className="desc_title E_f16 E_fc_grey1">{e.goodsname}</div>
                                                <div className="desc_exg_time E_f12 E_fc_grey6">有效期至： {e.endtime}</div>
                                                <div className="desc_charge">
                                                    <i className="gold_logo"></i>
                                                    <span className="new_price E_f15 E_fc_orange">{e.jifen}</span>
                                                </div>
                                                <div className="business_follow2"><span><i className="readyfollow"></i></span></div>
                                                </div>
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
        </div>
    )
  }
}

import React from 'react'
import NavLink from '../lib/NavLink.jsx'
import request from '../common/request.js'
import Loading  from '../common/Loading.jsx'
import config from '../common/config.js'
import utilities from '../common/Utilities.js'
export default class NewProduct extends React.Component {
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
  loadList = () => {
        var that = this
        //var url='http://rap.taobao.org/mockjsdata/7918/songhao/batch'
        var url=config.api.base+config.api.shoplist
        var formdata=new FormData();
        formdata.append('page',that.state.pageIndex)
        formdata.append('catid',utilities.getParameterByName('id'))
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
        if(data.flag==0){
            that.setState({loading:false,bottomTxt:'到底儿了'})
            return false
        }
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
       utilities.setLocalTitle('商家列表')
       document.addEventListener('scroll', this.handleScroll);
       this.loadList()
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
               that.setState({bottomTxt: '到底了'});
            }
        }
    }
  render() {
    var that=this
    return (
        <div>
          <div className="">
            <div className="">
             <NavLink to={{pathname:"/"}} className="backIndex_btn"></NavLink>
              {
                  that.state.lists.map((e,index) => {
                      return (
                        <NavLink to={{pathname:"/detail",query:{id:e.goodsid}}} className="product_href block_href" key={index}>
                         
                              <div className="gift_list">
                                <img src={e.thumbnail} alt="图片" className="product_img"/>
                                <div className="gift_desc">
                                  <div className="desc_wrap">
                                    <div className="desc_title E_f16 E_fc_grey1">{e.goodsname}</div>
                                    <div className="desc_charge">
                                      <i className="gold_logo"></i>
                                      <span className="new_price E_f15 E_fc_orange">{e.jifen}</span>
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

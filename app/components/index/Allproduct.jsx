import React from 'react'
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
          lists2:[],
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
    fetchFn2(){
    //console.log(localStorage.getItem('phone'))
        var that=this
        var url=config.api.base+config.api.categorylist
        var formdata=new FormData();
        formdata.append('page',1)
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
            lists2:data.data,
            loading:false
          }
        )
       })
      .catch((e) => { console.log(e.message) })
  }
  // 获取数据
  fetchFn = () => {
    var that = this
        //var url='http://rap.taobao.org/mockjsdata/7918/songhao/batch'
        var url=config.api.base+config.api.index
        var formdata=new FormData();
        formdata.append('page',that.state.pageIndex)
        formdata.append('type',1)
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
          that.setState({lists: data.data,loading:false,bottomTxt:''})
        }
        if(that.state.pageIndex == 1){
                that.setState({lists: data.data,loading:false})
            }else{
                that.setState({lists: that.state.lists.concat(data.data),loading:false})
            }
            that.setState({pageIndex: that.state.pageIndex+1}) 
        });
  }
  componentWillUnmount() {
         document.removeEventListener('scroll', this.handleScroll);
    }
  componentDidMount() {
       utilities.setLocalTitle('所有商品')
       this.fetchFn()
       this.fetchFn2()
       document.addEventListener('scroll', this.handleScroll);
  }
  handleScroll = () => {
        var that = this;
        var a = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var b = document.documentElement.scrollTop==0? document.body.scrollTop : document.documentElement.scrollTop;
        var c = document.documentElement.scrollTop==0? document.body.scrollHeight : document.documentElement.scrollHeight;
        if(a+Math.floor(b)==c || a+Math.ceil(b)==c){
          if (that.state.pageIndex <= that.state.pageCount){
                
                that.fetchFn();  
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
            <NavLink to={{pathname:"/"}} className="backIndex_btn"></NavLink>
            <div className="">
              <div className="In_card2 shadow">
                <div className="list_icon list_icon2 E_f12 E_fc_grey1">
                  {
                    that.state.lists2.map((e,index)=>{
                      return(
                           <NavLink to={{pathname:"/allshoplist",query:{id:e.id}}} key={index}>
                              <div className="rightLine">
                                <p style={{borderColor:e.color}}><span>{e.catname}</span></p>
                              </div>
                           </NavLink>
                      )
                    })
                  }
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

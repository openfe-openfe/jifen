import React from 'react'
import NavLink from '../lib/NavLink.jsx'
import request from '../common/request.js'
import Loading  from '../common/Loading.jsx'
import config from '../common/config.js'
import utilities from '../common/Utilities.js'
var util=require('../../utils/util')
export default class qualityMerchant extends React.Component {
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
        var url=config.api.base+config.api.seller
        var formdata=new FormData();
        formdata.append('page',that.state.pageIndex)
        fetch(url,{
            method: 'POST',
            body: formdata
        })
        .then(function (response) {
            return response.json();
        })
       .then((data) => {
        that.setState({
          pageCount:data.page.count
        })
        console.log(that.state.pageIndex)
        if(data.page.count==1){
          that.setState({lists: data.data,loading:false,bottomTxt:''})
        }
        if(that.state.pageIndex == 1){
                that.setState({lists: data.data,loading:false,bottomTxt:'我是有底线的'})
            }else{
                that.setState({lists: that.state.lists.concat(data.data),loading:false})
            }
            that.setState({pageIndex: that.state.pageIndex+1})
        });
    }
  componentDidMount() {
       utilities.setLocalTitle('优质商家')
       this.loadList()
       document.addEventListener('scroll', this.handleScroll)
  }
    componentWillUnmount() {
       document.removeEventListener('scroll', this.handleScroll)
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

                         <div className="shadow In_bg_white" key={index}>
                                <div className="change_info_business">
                                  <NavLink to={{pathname:"/shoplist",query:{id:e.id}}}>
                                    <div className="business_wrap">
                                      <img src={e.seller_logo} className="business_img"/>
                                      <div className="business_desc">
                                        <div className="desc_wrap">
                                          <p className="desc_name E_f16 E_fc_grey1">{e.seller_name}</p>
                                          <p className="desc_info E_f16 E_fc_grey7">
                                            </p>
                                        </div>
                                      </div>
                                      <div className="business_follow"><span>
                                        <i className="readyfollow"></i>
                                        </span>
                                      </div>
                                    </div>
                                  </NavLink>
                                </div>
                         </div>
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

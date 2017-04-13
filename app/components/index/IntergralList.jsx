import React from 'react'
import NavLink from '../lib/NavLink.jsx'
import {post,get} from '../common/request.js'
import fetch from 'isomorphic-fetch';
import config from '../common/config.js'
import utilities from '../common/Utilities.js'
import Loading  from '../common/Loading.jsx'
 class IntergralList extends React.Component {
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
        var url=config.api.base+config.api.integralList
        var params={
          page:that.state.pageIndex,
          useraccount:utilities.getParameterByName('wv_account')||localStorage.getItem('wv_account'),
          user_id:utilities.getParameterByName('user_id')||''
        }
   post(url,params)
        .then(function (response) {
            return response.json();
        })
       .then((data) => {
         console.log(data.msg)
        //console.log(data.total)
         if(data.flag==0||data.data.length==0){
            that.setState({loading:false,bottomTxt:'我是有底线的'})
            return false
        }
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
   componentDidMount() {
       utilities.setLocalTitle('积分明细')
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
                <div className="IN_list">
                  {
                    that.state.lists.map((e,index)=>{
                      return (
                        <div className="intergral_history child_block" key={index}>
                        <p className="E_f16 E_fc_grey1">
                          <span className="point_desc">{e.title}</span>
                          <span id="intergral_negative" className="cut_point">{e.jifen}</span>
                        </p>
                        <p className="E_f12 E_fc_grey7">&nbsp;&nbsp;{e.time}</p>
                      </div>
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
module.exports=IntergralList
import React from 'react'
import NavLink from '../lib/NavLink.jsx'
// import request from '../common/request.js'
import fetch from 'isomorphic-fetch';
import Loading  from '../common/Loading.jsx'
import config from '../common/config.js'
import utilities from '../common/Utilities.js'
import ItemList from './ItemList.jsx'
class AllShopList extends React.Component {
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
        var id=that.props.location.query.id
        var formdata=new FormData();
        formdata.append('page',that.state.pageIndex)
        formdata.append('catid',utilities.getParameterByName('id')||id)
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
            that.setState({loading:false,bottomTxt:'我是有底线的'})
            return false
        }
        that.setState({
          pageCount:data.page.count
        })
        if(data.page.count==1){
          that.setState({lists: data.data,loading:false,bottomTxt:'我是有底线的'})
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
             <NavLink to={{pathname:"/"}} className="backIndex_btn"></NavLink>
              <ItemList list={that.state.lists}/>
              { that.state.bottomTxt?<div className="loadmore">{that.state.bottomTxt}</div>:<Loading/>  }
            </div>
          </div>
        </div>
    )
  }
}
module.exports=AllShopList
import React from 'react'
import ReactDOM from 'react-dom'
import NavLink from '../lib/NavLink.jsx'
import {post,get} from '../common/request.js'
import fetch from 'isomorphic-fetch';
import config from '../common/config.js'
import utilities from '../common/Utilities.js'
import Loading  from '../common/Loading.jsx'
import ItemList from './ItemList.jsx'
// import BScroll from 'better-scroll'
class Allproduct extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          lists: [],
          lists2:[],
          loading:false,
          bottomTxt: '',
          pageIndex:1,
          catpageIndex:1,
          pageCount: 0,
          color:'#fff',
          currentIndex:0,
          id:''
      }
  }
  componentWillMount(){
    this.setState({
      loading:true
    })
  }
  //获取所有分类
  fetchFn2(){
    //console.log(localStorage.getItem('phone'))
        var that=this
        var url=config.api.base+config.api.categorylist
        var params={
          page:1
        }
      post(url,params)
        .then(function (response) {
            return response.json();
        })
      .then((data) => {
       // console.log(data.data)
       if(data.data==''){
         that.setState({bottomTxt: '我是有底线的'})
         return false
       }
        that.setState(
          {
            lists2:data.data,
            loading:false
          }
        )
        var id=localStorage.getItem('id')||data.data[0].id
        //console.log(id)
        that.setState(
          {
            id:id
          },function(){
            // console.log(123123)
            that.loadList(this.state.id)
          }
        )
       })
      .catch((e) => { console.log(e.message) })
  }
  componentWillUnmount() {
         document.removeEventListener('scroll', this.handleScroll);
    }
  componentDidMount() {
       utilities.setLocalTitle('所有商品')
       this.fetchFn2()
       document.addEventListener('scroll', this.handleScroll);
       let offsetWidth=200
      //  console.log(this.refs.lalala.style.scrollTop)
      // let scroll=new BScroll(this.refs.lalala,{})
    //   scroll.on('scroll', (pos) => {
    //     console.log(pos.x + '~' + pos.y)
    // })
  }
  
  
  
  handleScroll = () => {
        var that = this;
        var a = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var b = document.documentElement.scrollTop==0? document.body.scrollTop : document.documentElement.scrollTop;
        var c = document.documentElement.scrollTop==0? document.body.scrollHeight : document.documentElement.scrollHeight;
        if(a+Math.floor(b)==c || a+Math.ceil(b)==c){
          if (that.state.pageIndex <= that.state.pageCount){
                console.log(this.state.pageIndex)
                that.loadList(that.state.id)
            }else{
              console.log(that.state.pageIndex)
                that.setState({bottomTxt: '我是有底线的'});
            }
        }
    }
     check_tittle_index(index){
       //console.log(this.state.currentIndex)
       //console.log(localStorage.getItem('keyid'))
       return index==localStorage.getItem('keyid') || 0? "CampaignTabBar-tabInner-3qGE active" : "CampaignTabBar-tabInner-3qGE";
    }
      loadList = (id) => {
        console.log(id)
        var that = this
        //var url='http://rap.taobao.org/mockjsdata/7918/songhao/batch'
        var url=config.api.base+config.api.shoplist
        var params={
          page:that.state.pageIndex,
          catid:id
        }
      post(url,params)
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
        console.log(that.state.pageIndex)
        if(that.state.pageIndex == 1){
                that.setState({lists: data.data,loading:false})
            }else{
                that.setState({lists: that.state.lists.concat(data.data),loading:false})
            }
            that.setState({pageIndex: that.state.pageIndex+1})
        });
    }
    catFetch(id,color,index){
      var that=this
       /*获取id并本地存储id */
      localStorage.setItem('id',id)
      localStorage.setItem('keyid',index+'')
      localStorage.setItem('scrollLeft',document.getElementById(index).offsetLeft+'')
      that.setState({
        loading:true,
        lists:[],
        currentIndex:localStorage.getItem('keyid')||index,
        bottomTxt:'',
        pageIndex:1,
        id:id
      },function(){
        var url=config.api.base+config.api.shoplist
        var params={
          page:that.state.catpageIndex,
          catid:id
        }
       post(url,params)
        .then(function (response) {
            return response.json();
        })
       .then((data) => {
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
      })
    }
  render() {
    var that=this
    return (
        <div>
          <div className="">
            <NavLink to={{pathname:"/"}} className="backIndex_btn"></NavLink>
            <div className="">
              <div className="In_card2">
                <div className=" E_f12 E_fc_grey1">
                    <div className="CampaignTabBar-tabs-1WkC" ref="lalala">
                      {
                        that.state.lists2.map((e,index)=>{
                          return(
      
                          <a className="CampaignTabBar-tab-3ryG" onClick={this.catFetch.bind(this,e.id,e.color,index)} key={index} id={index}>
                            <span className={ this.check_tittle_index(index) }>
                              <span className="CampaignTabBar-tabText-3TwF">{e.catname}</span>
                            </span>
                          </a>

                          )
                        })
                    }
                    </div>
                  
                </div>
              </div>
              <ItemList list={that.state.lists}/>
              { that.state.bottomTxt?<div className="loadmore">{that.state.bottomTxt}</div>:<Loading/>  }
            </div>
          </div>
        </div>
    )
  }
}
module.exports=Allproduct
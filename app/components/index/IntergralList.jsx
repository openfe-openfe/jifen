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
        var url=config.api.base+config.api.integralList
        var formdata=new FormData();
        formdata.append('page',that.state.pageIndex)
        formdata.append('useraccount',localStorage.getItem('wv_account'))
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
             <NavLink to={{pathname:"/"}} className="backIndex_btn"></NavLink>
               <div className="shadow">
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

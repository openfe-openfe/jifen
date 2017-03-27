import React from 'react'
import NavLink from '../lib/NavLink.jsx'
// import request from '../common/request.js'
import fetch from 'isomorphic-fetch';
import config from '../common/config.js'
import utilities from '../common/Utilities.js'
import Loading  from '../common/Loading.jsx'
class IntergralDetail extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          lists: '',
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
  componentDidMount() {
       utilities.setLocalTitle('我的积分')
       this.fetchFn()
  }
  // 获取数据
  fetchFn(){
       var that=this
        var url=config.api.base+config.api.integral
        var formdata=new FormData();
        formdata.append('useraccount',utilities.getParameterByName('wv_account')||localStorage.getItem('wv_account'))
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
            jifen:data.data,
            loading:false
          }
        )
       })
      .catch((e) => { console.log(e.message) })
  }
  render() {
    var that=this
    return (
        <div>
          <div className="">
              {
                that.state.loading
                ?<Loading/>
                :null
              }
              <div className="intergral_icon">
                  <i className="infor_gold_big"></i>
              </div>
              <div className="intergral_text">
                  <p>{that.state.jifen}<span>个</span></p>
              </div>
              <NavLink to={{pathname:"/intergrallist"}} className="btn_org">积分明细</NavLink>
              <NavLink to={{pathname:"/intergralrule"}} className="btn_gray">积分规则</NavLink>
          </div>
        </div>
    )
  }
}
module.exports=IntergralDetail
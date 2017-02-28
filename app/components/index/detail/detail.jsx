var React =require('react')
var ReactDOM = require('react-dom')
import NavLink from '../../lib/NavLink.jsx'
import DetailHeader from './detailHeader.jsx'
import DetailActity from './detailActity.jsx'
import DetailDes from './detailDes.jsx'
import request from '../../common/request.js'
import Loading  from '../../common/Loading.jsx'
import config from '../../common/config.js'
import utilities from '../../common/Utilities.js'
var detail =React.createClass({
  
  getInitialState: function() {
    return {
       lists: [],
       loading:false
     }
  },
  componentWillMount(){
    this.setState({
      loading:true
    })
  },
  componentDidMount() {
       utilities.setLocalTitle('商品详情')
       this.fetchFn()
  },
  // 获取数据
  fetchFn(){
    //console.log(localStorage.getItem('phone'))
        var that=this
        var url=config.api.base+config.api.goods
        var formdata=new FormData();
        formdata.append('id',utilities.getParameterByName('id'))
        formdata.append('useraccount',localStorage.getItem('wv_account'))
        fetch(url,{
            method: 'POST',
            body: formdata
        })
        .then(function (response) {
            return response.json();
        })
      .then((data) => {
        //console.log(data.data)
        that.setState(
          {
            lists:data.data,
            loading:false
          }
        )
       })
      .catch((e) => { console.log(e.message) })
  },
  render() {
    return (
        <div>
          <div className="change_mall_info">
            {
              this.state.loading
                ?<Loading/>
                :null
            }
            <NavLink to={{pathname:"/"}} className="backIndex_btn"></NavLink>
            <div className="">
              <DetailHeader detail={this.state.lists}/>
              <DetailActity agents={this.state.lists}/>
              <DetailDes content={this.state.lists}/>
            </div>
          </div>
        </div>
    )
  }
})
module.exports = detail

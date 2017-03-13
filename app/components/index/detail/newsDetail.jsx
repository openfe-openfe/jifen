import React from 'react'
import request from '../../common/request.js'
import Loading  from '../../common/Loading.jsx'
import NavLink from '../../lib/NavLink.jsx'
import config from '../../common/config.js'
import utilities from '../../common/Utilities.js'
export default class detailDes extends React.Component {
  constructor(props) {
      super(props)
      this.state={
          content:'',
          title:''
      }
  }
  componentWillMount(){
    this.setState({
      loading:true
    })
    utilities.setLocalTitle(this.state.title)
  }
    fetchFn(){
       var that=this
        var url=config.api.base+config.api.view
        var formdata=new FormData();
        var id=that.props.location.query.id
        formdata.append('useraccount',utilities.getParameterByName('wv_account'))
        formdata.append('id',utilities.getParameterByName('id')||id)
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
            content:data.data.content,
            title:data.data.title,
            loading:false
          }
        )
       })
      .catch((e) => { console.log(e.message) })
  }
  createMarkup() {
  return {__html: this.state.content};
}
 componentDidMount() {
       this.fetchFn()
  }
    render() {
        return(
          <div className="pro_info_content">
            <div className="change_info_content">
             <div dangerouslySetInnerHTML={this.createMarkup()}></div>  
            </div> 
          </div>

        )
    }
}

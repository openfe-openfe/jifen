import React from 'react'
export default class Screen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loades: [1,2,3,4,5,6,7,8,9,10],
        }
    }
  render() {
    return (
        <div className="timeline-item">
             <div className="animated-test"></div>
            <div className="animated-test"></div>
            {
                this.state.loades.map((e,index)=>{
                    return (
                        <div className="animated-background" key={index}>
                            <div className="background-masker header-top"></div>
                            <div className="background-masker header-left"></div>
                            <div className="background-masker header-right"></div>
                            <div className="background-masker header-bottom"></div>
                            <div className="background-masker subheader-left"></div>
                            <div className="background-masker subheader-right"></div>
                            <div className="background-masker subheader-bottom"></div>
                        </div>
                    )
                })
            }
            
        </div>
    )
  }
}

var  React =require('react')
var ReactDOM = require('react-dom');
var Modal = require('react-modal')
const customStyles = {
  content : {
    top  : '50%',
    left : '50%',
    right : 'auto',
    bottom  : 'auto',
    marginRight : '-50%',
    transform  : 'translate(-50%, -50%)'
  }
}

var detailActity =React.createClass({
    getInitialState: function() {
    return { modalIsOpen: false }
  },

  openModal: function() {
    this.setState({modalIsOpen: true})
  },

  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    //this.refs.subtitle.style.color = '#f00'
  },

  closeModal: function() {
    this.setState({modalIsOpen: false})
 },
    render() {
        return(
        <div className="LivePage-liveActions-EgLr Card-root-1Dmx">
            <div className="LivePage-buttonWrapper-2FzJ">
            <button className="LivePage-button-181X LivePage-applyButton-3KH8 Button-primary-5q6- Button-buttonBase-3YR6 Button-base-3ydE Button-block-3rjb"
            onClick={this.openModal}>赞助并参与活动¥1.9
            </button>
            <Modal
              isOpen={this.state.modalIsOpen}
              onAfterOpen={this.afterOpenModal}
              onRequestClose={this.closeModal}
              overlayClassName="Dialog-overlay-2RlI"
              className="Dialog-content-3qxv"
            >
            <div className="DialogContent-content-2pSe">
              <h1 className="DialogTitle-root-1xzv">提示</h1>
              <div className="ConfirmDialog-text-SoKk">当前 Live 互动环节已结束，你仍然可以参与并浏览全部内容，但将不能提问，是否继续？</div>
              <button className="Button-primary-5q6- Button-buttonBase-3YR6 Button-base-3ydE Button-block-3rjb">继续</button>
            </div>
            <button title="关闭" className="Dialog-closeButton-2qrC" onClick={this.closeModal}>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><title>close</title>
            <path d="M11.75 10.94L8.034 7.223c-.29-.29-.764-.29-1.057.003-.295.295-.294.766-.003 1.057L10.69 12l-3.716 3.716c-.29.29-.292.762.003 1.057.293.293.766.294 1.057.003l3.716-3.715 3.716 3.718c.29.29.764.29 1.057-.003.295-.295.294-.766.003-1.057L12.81 12l3.716-3.716c.29-.29.292-.762-.003-1.057-.293-.293-.766-.294-1.057-.003L11.75 10.94z" fillRule="evenodd"></path>
            </svg></button>
            </Modal>
            <button className="LivePage-giftButton-1fYX Button-ghost-37SQ Button-buttonBase-3YR6 Button-base-3ydE Button-primary-5q6- Button-buttonBase-3YR6 Button-base-3ydE Button-block-3rjb">
            <svg fill="currentColor" width="22" height="22" className="LivePage-giftIcon-29DK" viewBox="0 0 44 44">
            <path fillRule="evenodd" d="M18.8612798,16 L9,16 L9,38 L21,38 L21,18.1039516 L17.5787887,21.6452164 L15.4212113,19.5607836 L18.8612798,16 L18.8612798,16 Z M26.3625418,16 L36,16 L36,38 L24,38 L24,17.8981528 L28.0656575,21.6987748 L30.1143425,19.5072252 L26.3625418,16 L26.3625418,16 Z M34.9498943,13 C35.8413503,11.9542909 36.37,10.6670339 36.37,9.253 C36.37,5.40725129 33.9476021,2.5 29.922,2.5 C26.8447702,2.5 24.2661468,3.98247309 22.685,6.77307456 C21.1038532,3.98247309 18.5252298,2.5 15.448,2.5 C11.4223979,2.5 9,5.40725129 9,9.253 C9,10.6670339 9.52864968,11.9542909 10.4201057,13 L9.00135749,13 C7.33451092,13 6,14.3415745 6,15.9964905 L6,38.0035095 C6,39.6495018 7.34375352,41 9.00135749,41 L35.9986425,41 C37.6654891,41 39,39.6584255 39,38.0035095 L39,15.9964905 C39,14.3504982 37.6562465,13 35.9986425,13 L34.9498943,13 L34.9498943,13 Z M16.685,12.695 C15.0153042,12.3281695 12,11.0707373 12,9.253 C12,6.95538513 13.212665,5.5 15.448,5.5 C18.5820251,5.5 20.930499,7.80473787 21.3146969,12.7214081 C21.3512279,13.1889031 18.3546958,13.0618305 16.685,12.695 L16.685,12.695 Z M33.37,9.253 C33.37,11.0707373 30.9924107,12.3072825 28.685,12.695 C26.3775893,13.0827175 24.0173788,13.226092 24.0512337,12.7745617 C24.4226173,7.82134685 26.7767026,5.5 29.922,5.5 C32.157335,5.5 33.37,6.95538513 33.37,9.253 L33.37,9.253 Z"></path></svg>送给好友</button>
            </div>
            <div className="LivePage-alert-14y5">为了让更多人拥有参与 Live 的机会，本场 Live 特别定价为 1.90 元，Live 结束后价格将回到 19 元，欢迎大家参与。</div>
        </div>
        )
    }
})
module.exports = detailActity

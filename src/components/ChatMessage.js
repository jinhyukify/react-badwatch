import React from 'react';
import { browserHistory } from 'react-router';
class ChatMessage extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ChatMessage';
        this._openWhisper = this._openWhisper.bind(this);
        this._closeWhisper = this._closeWhisper.bind(this);
        this._lookThisRecord = this._lookThisRecord.bind(this);
        this._handleWhisper =this._handleWhisper.bind(this);
        this.state = {
          whisperOpen: false
        };
    }

    chat_dateFormat(date) 
    {
      let now = new Date(date);
      let year = "" + now.getFullYear();
      let month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
      let day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
      let hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
      let minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
      let second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
      return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
    }

    _handleWhisper()
    {
       this.props.handleWhisperOpen(this.props.message.battletag.split('#')[0], this.props.message.overwatch_id);
       this.setState({
          whisperOpen: false
      });
    }

    _openWhisper()
    {
      this.setState({
        whisperOpen: !this.state.whisperOpen
      });
    }    

    _closeWhisper()
    {
      this.setState({
        whisperOpen: false
      });
    }

    _lookThisRecord()
    {
       let bt = this.props.message.battletag.replace("#", "-");
       browserHistory.push('/user/' + bt);
    }

    render() {
    	const message = this.props.message;
      const whisper = (
          <div className="whisper-div">
                    <div className="whisper-1" onClick={this._handleWhisper}>귓말하기</div>
                    <div className="whisper-2" onClick={this._lookThisRecord}>전적보기</div>
                    <div className="whisper-3" onClick={this._closeWhisper}>
                      <i className="fa fa-times" aria-hidden="true"></i><span>닫기</span>
                    </div>
          </div>
        );  
      const message_battletag = (
                     <div className="chat-box-name pointer" onClick={this._openWhisper}>
                        {message.battletag.split('#')[0]} <span className="meta">{this.chat_dateFormat(message.written_time)}</span> 
                     </div>
        );
        return (
        	<div className="relative">
               <div className={`whisper-from ${message.type==5? 'active': ''}`}>FROM : {message.battletag.split('#')[0]}</div>
               <div className={`whisper-to ${message.type==7? 'active': ''}`}>TO : {message.to}</div>
                              
               <img src={message.avatar} className="chat-avatar pointer" onClick={this._openWhisper}/>
                    {message.type==4? message_battletag: undefined}
                <div className="chat-log">  
                    {message.point}점 (<span className="log-name">{message.most_hero}</span>) : <br className="computer-hide"/>{message.message}
                </div>

                {this.state.whisperOpen? whisper: undefined}
          </div>
        	);
      
    }
}

ChatMessage.propTypes = {
	message: React.PropTypes.object,
  handleWhisperOpen: React.PropTypes.func
};

export default ChatMessage;

import React from 'react';

class Reply extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Reply';
    }

    _dateFormat(date) 
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

    render() {
    	const reply = this.props.reply;
        return (
        		<div className="reply">
                    <div>
                        <img src={reply.avatar} className="comment-avatar"/>
                    <div className="right-comment-div">
                        <span className="comment-name">{reply.name? reply.name: "익명"}</span>
                         <span className="meta">{this._dateFormat(reply.written_time)}</span>
                         <span className="red-text ip">[{reply.ip}]</span>
                         <div>{reply.content}</div>
                    </div>
                    </div>
        		</div>
        	);
    }
}

Reply.propTypes = {
	reply: React.PropTypes.object
};

export default Reply;

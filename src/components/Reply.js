import React from 'react';

class Reply extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Reply';
    }

    _dateFormat(date)
    {
      var today = new Date();   

      var dateObj = new Date(date);
      var month = Math.floor((today.getTime() - dateObj.getTime()) / 1000 / 60 / 60/ 24 /30);
      var day = Math.floor((today.getTime() - dateObj.getTime()) / 1000 / 60 / 60/ 24);
      var hour = Math.floor((today.getTime() - dateObj.getTime()) / 1000 / 60 / 60);
      var minute = Math.floor((today.getTime() - dateObj.getTime()) / 1000 / 60);

      if( month == 0 )
      {
         if( day != 0 )
         {
            if( day == 1 )
               return "어제";
            else
               return day+"일 전";
         }
         else
         {
            if( hour !=0 )
               return hour+"시간 전";
            else
               return minute+"분 전";
         }

      }
      else if( minute <= 0 )
      {
         return "방금";
      }
      else
      {
         return month+"달 전"
      }
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

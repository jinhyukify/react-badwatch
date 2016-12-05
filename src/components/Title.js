import React from 'react';

class Title extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Title';
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
        return (
            <div>
                <div className="youtube-title">
                    {this.props.title}
                </div>
                <div className="youtube-writer">
                    <span>글쓴이 : </span> {this.props.name? this.props.name: "익명"}<span className="youtube-date">{this._dateFormat(this.props.written_time)}</span>
                </div>
        		
            </div> 
        	);
    }
}

Title.propTypes = {
	title: React.PropTypes.string,
	comment_count: React.PropTypes.number,
	hit_count: React.PropTypes.number,
	like_count: React.PropTypes.number,
	written_time: React.PropTypes.string
};

export default Title;

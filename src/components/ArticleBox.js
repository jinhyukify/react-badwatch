import React from 'react';
import {Link} from 'react-router';

class ArticleBox extends React.Component{
	constructor(props){
		super(props);
		this.displayName = 'ArticleBox';
	}
	_boardType(type)
	{
		switch(type)
		{
			case "free":
				return "자유";
			case "strategy":
				return "공략";
		}
	}
	_dateFormat(date) 
    {
      let now = new Date(date);
      let year = "" + now.getFullYear();
      let month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
      let day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
      let hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
      let minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
      return month + "/" + day + " " + hour + ":" + minute;
    }

    

	render(){
		const article = this.props.article;
		return(
			<tr>
				<td className="left-align article-type mobile-hide">{this._boardType(this.props.boardType)}</td>
				<td className="left-align article-title"><Link to={"/board/" + this.props.boardType + "/page/" + this.props.pageId +"/article/" + article.article_id}>{article.title}<span className="article-comment-count">+{article.comment_count}</span></Link></td>
				<td className="collapsing hit-pad">{article.name? article.name: "익명"}</td>
				<td className="collapsing hit-pad mobile-hide">{article.hit_count}</td>
				<td className="collapsing hit-pad mobile-hide">{article.like_count}</td>
				<td className="collapsing mobile-hide">{this._dateFormat(article.written_time)}</td>
				
			</tr>	
		);
	}
}

export default ArticleBox;
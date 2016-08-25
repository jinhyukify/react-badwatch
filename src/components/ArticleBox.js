import React from 'react';
import {Link} from 'react-router';

class ArticleBox extends React.Component{
	constructor(props){
		super(props);
		this.displayName = 'ArticleBox';
	}

	render(){
		const article = this.props.article;
		return(
			<div>
				{article.article_id} <Link to={"/board/" + this.props.boardType + "/page/" + this.props.pageId +"/article/" + article.article_id}>   {article.title}</Link> 
			</div>	
		);
	}
}

export default ArticleBox;
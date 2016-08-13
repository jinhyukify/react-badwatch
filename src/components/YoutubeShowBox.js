import React from 'react';
import axios from 'axios';
import Title from './Title';
import YoutubeCommentBox from './YoutubeCommentBox';
class YoutubeShowBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'YoutubeShowBox';
        this.state = {
        	youtube: {},
            comments: []
        };
    }

    componentDidMount()
    {
    	axios.get('http://bad.watch/api/youtube/'+this.props.params.id)
    		.then((response) => {
    			let data = response.data;
    			if(data.responseCode == 6)
    			{
    				this.setState({
    					youtube: data.youtubeData
    				});
    			}
    			else
    			{
    				sweetAlert(
                      '데이터를 불러오는데 오류가 발생했습니다.',
                      '잠시후 다시시도해주세요.',
                      'error'
                    )
                    return;
    			}
    		});   
    }

    render() {
        return (
            <div>
                <Title title={this.state.youtube.title} 
                       comment_count={this.state.youtube.comment_count}
                       hit_count={this.state.youtube.hit_count}
                       like_count={this.state.youtube.like_count}
                       written_time={this.state.youtube.written_time} 
                       name={this.state.youtube.name}/>
        		<div className="video-container">
		           <iframe width="853" height="480" src={"//www.youtube.com/embed/"+this.state.youtube.youtube_key} frameBorder="0" allowFullScreen></iframe>
		        </div>
                <YoutubeCommentBox id={this.props.params.id}/>
            </div>               
        	);
    }
}

export default YoutubeShowBox;

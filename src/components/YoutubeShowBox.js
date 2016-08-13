import React from 'react';
import axios from 'axios';
import Title from './Title';
import YoutubeCommentBox from './YoutubeCommentBox';
import LikeBox from './LikeBox';
import { Link, browserHistory } from 'react-router';
import update from 'react-addons-update'

class YoutubeShowBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'YoutubeShowBox';
        this.state = {
        	youtube: {},
            comments: []
        };
        this._onDeleteYoutube = this._onDeleteYoutube.bind(this);
        this._onDisLike = this._onDisLike.bind(this);
        this._onLike = this._onLike.bind(this);
    }

    _onLike()
    {
         axios.get('http://bad.watch/api/youtube-like/'+this.props.params.id)
            .then((response) => {
                let data = response.data;
                if(data.responseCode == 50)
                {
                    //좋아요 성공
                    this.setState({
                        youtube: update(this.state.youtube, {
                            like_count: { $set: data.like_count },
                            like_status: { $set: true }
                        })
                    });
                }
                else if(data.responseCode == 49)
                {
                     sweetAlert(
                          '',
                          '이미 좋아요를 하셨습니다.',
                          'error'
                      )
                     return;
                }
                else
                {
                     sweetAlert(
                      '',
                      '실패했습니다.',
                      'error'
                    )
                     return;
                }
            })
    }

    _onDisLike()
    {
         axios.get('http://bad.watch/api/youtube-dislike/' + this.props.params.id)
            .then((response) => {
                let data = response.data;
                if(data.responseCode == 52)
                {
                    //좋아요 취소 성공
                    this.setState({
                        youtube: update(this.state.youtube, {
                            like_count: { $set: data.like_count },
                            like_status: { $set: false }
                        })
                    });
                }
                else
                {
                     sweetAlert(
                      '',
                      '오류가 발생했습니다.',
                      'error'
                    )
                     return;
                }
            })
    }

    _onDeleteYoutube()
    {
        axios.delete('http://bad.watch/api/youtube/'+this.props.params.id)
            .then((response) => {
                let data = response.data;
                if(data.responseCode == 47)
                {
                    sweetAlert(
                      '',
                      '글이 삭제되었습니다.',
                      'success'
                    )
                    browserHistory.push('/youtube');
                    return;
                }
                else 
                {
                    sweetAlert(
                      '',
                      '권한이 없습니다.',
                      'error'
                    )
                    return;
                }

            })
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
        const auth_box = (
                <div>
                    <Link to={"/youtube/edit/" + this.props.params.id} className="btn">수정</Link>
                    <a onClick={this._onDeleteYoutube} className="btn">삭제</a>
                </div>
            );
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
                <LikeBox like_count={this.state.youtube.like_count} 
                         handleLike={this._onLike} 
                         handleDisLike={this._onDisLike}
                         like_status={this.state.youtube.like_status} />
                {this.state.youtube.authentication? auth_box: undefined}
                <YoutubeCommentBox id={this.props.params.id} />
            </div>               
        	);
    }
}

export default YoutubeShowBox;

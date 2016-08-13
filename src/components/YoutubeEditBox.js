import React from 'react';
import axios from 'axios';
import { browserHistory } from 'react-router';
class YoutubeEditBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'YoutubeEditBox';
    	this.state = {
    		title: '',
    		url: ''
    	};
    	this._handleChange = this._handleChange.bind(this);
    	this._onEditYoutube = this._onEditYoutube.bind(this);
    }

    _handleChange(e)
    {
    	var nextState = {};
    	nextState[e.target.name] = e.target.value;
    	this.setState(nextState);
    }

    _onEditYoutube()
    {
    	axios.put('http://bad.watch/api/youtube/'+this.props.params.id, {
    		title: this.state.title,
    		url: this.state.url
    	})
    		.then((response) => {
    			let data = response.data;
    			if(data.responseCode == 45)
    			{
    				browserHistory.push('/youtube/show/' + this.props.params.id);
    				return;
    			}
    			else 
    			{
    				sweetAlert(
                      '글을 수정하는데 실패했습니다.',
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
    					title: data.youtubeData.title,
    					url: "https://www.youtube.com/watch?v=" + data.youtubeData.youtube_key
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
        			<div className="input-field col s10">
                        <input type="text" 
                               name="title"
                               value={this.state.title}
                               onChange={this._handleChange}/>
                    	<label>제목</label>
                    </div>
                    <h5>유튜브 동영상 링크</h5>
                    <p>ex) https://www.youtube.com/watch?v=nxoAEKVPVF8</p>
                    <p>ex) https://youtu.be/nxoAEKVPVF8</p>
                    <div className="input-field col s10">
                        <input type="text" 
                               name="url"
                               value={this.state.url}
                               onChange={this._handleChange}/>
                        <label>링크</label>
                    </div>
                    <button onClick={this._onEditYoutube}>수정</button>
        		</div>
        	);
    }
}

export default YoutubeEditBox;

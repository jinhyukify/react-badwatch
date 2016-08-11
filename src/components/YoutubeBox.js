import React from 'react';
import YoutubeCard from './YoutubeCard';
import axios from 'axios';
class YoutubeBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'YoutubeBox';
        this.state = {
            youtubes: []
        };
    }

    componentDidMount()
    {
        axios.get('http://bad.watch/api/youtube-list?page='+this.props.location.query.page)
            .then((response) => {
                let data = response.data;
                if(data.responseCode == 6)
                {
                    this.setState({
                        youtubes: data.youtubeData
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
            })
    }

    render() {  
        return (
        		<div className="row">
                {this.state.youtubes.map((youtube) => {
                    return (
                            <YoutubeCard key={youtube.youtube_id}
                                         youtube_id={youtube.youtube_id}
                                         title={youtube.title}
                                         member_id={youtube.member_id}
                                         thumbnail={youtube.thumbnail}
                                         comment_count={youtube.comment_count}
                                         hit_count={youtube.hit_count}
                                         like_count={youtube.like_count}
                                         written_time={youtube.written_time}/>
                        );
                })}
        		</div>
        	);
    }
}

export default YoutubeBox;

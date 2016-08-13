import React from 'react';
import YoutubeCard from './YoutubeCard';
import axios from 'axios';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';

class YoutubeBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'YoutubeBox';
        this.state = {
            youtubes: [],
            title: '',
            url: ''
        };
        this._handleChange = this._handleChange.bind(this);
        this._onSubmitYoutube = this._onSubmitYoutube.bind(this);
    }

    _openModal()
    {
        $('#modal1').openModal();
    }

    _handleChange(e)
    {
        var nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    _onSubmitYoutube()
    {
        console.log(1);
        axios.post('http://bad.watch/api/youtube', {
            title: this.state.title,
            url: this.state.url
        }).then((response) => {
            let data = response.data;
            if(data.responseCode == 8)
            {
                $('#modal1').closeModal();
                browserHistory.push('/youtube/show/' + data.youtubeData.id);
                return;
            }
            else
            {
                $('#modal1').closeModal();
                sweetAlert(
                      '데이터를 불러오는데 오류가 발생했습니다.',
                      '잠시후 다시시도해주세요.',
                      'error'
                    )
                    return;
            }
        })
    }

    componentDidMount()
    {
        axios.get('http://bad.watch/api/youtube-list?value='+ Number.MAX_SAFE_INTEGER)
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
      const create_modal = (
                  <div id="modal1" className="modal">
                        <div className="modal-content">
                          <h5>제목(생략가능)</h5>
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
                        </div>
                        <div className="modal-footer">
                          <a onClick={this._onSubmitYoutube} 
                             className="waves-effect waves-light btn">글작성</a>
                          <a className="modal-action modal-close waves-effect waves-green btn-flat">닫기</a>
                        </div>
                    </div>
        );


        return (
                <div>
                    <a className="modal-trigger waves-effect waves-light btn" onClick={this._openModal}>글쓰기</a>
                    {create_modal}
            		<div className="row">
                    {this.state.youtubes.map((youtube) => {
                        return (
                                <YoutubeCard key={youtube.youtube_id}
                                             youtube={youtube}/>
                            );
                    })}
            		</div>
                </div>
        	);
    }
}

export default YoutubeBox;

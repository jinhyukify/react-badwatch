import React from 'react';
import YoutubeCard from './YoutubeCard';
import axios from 'axios';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { getYoutubes } from '../actions/youtubes'; 

class YoutubeBox extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'YoutubeBox';
        this.state = {
            youtubes: [],
            title: '',
            url: '',
            order: 'new',
            loadingState: false,
            searchOpen: false
        };
        this._selectChange = this._selectChange.bind(this);
        this._handleChange = this._handleChange.bind(this);
        this._onSubmitYoutube = this._onSubmitYoutube.bind(this);
        this._openSearch = this._openSearch.bind(this);
    }

    _selectChange(e)
    {
        let current_page = this.props.youtube[e.target.value].current_page;
        let youtubes = this.props.youtube[e.target.value].data;
        if(!youtubes.length)
        {
           this.props.getYoutubes(current_page+1, e.target.value);
        }

        this.setState({
          order: e.target.value
        });
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

    _openSearch()
    {
       this.setState({
         searchOpen: !this.state.searchOpen
       });
    }

    componentDidMount()
    {
      //const MAX_SAFE_INTEGER = 9007199254740991;
      if(!this.props.youtube[this.state.order].data.length)
      {
        this.props.getYoutubes(1, this.state.order);
      }
      

      $(window).scroll(() => {

            if ($(document).height() - $(window).height() - $(window).scrollTop() < 250) {
                if(!this.state.loadingState) 
                {
                  
                  if(this.props.youtube[this.state.order].isEnd || this.props.youtube[this.state.order].current_page == 0)
                     return;
                     
                  this.props.getYoutubes(this.props.youtube[this.state.order].current_page+1, this.state.order); 
                  this.setState({
                    loadingState: true
                  });
                }
            }
            else 
            {
              if(this.state.loadingState)
              {
                this.setState({
                  loadingState: false
                });
              }
            }
        });
    }

    componentWillUnmount()
    {
        $(window).unbind();
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
  
        const new_order = (
              <div className="row">
                    {this.props.youtube.new.data.map((youtube) => {
                        return (
                                <YoutubeCard key={youtube.youtube_id}
                                             youtube={youtube}/>
                            );
                    })}
                </div>
          );  

        const like_order = (
              <div className="row">
                    {this.props.youtube.like.data.map((youtube) => {
                        return (
                                <YoutubeCard key={youtube.youtube_id}
                                             youtube={youtube}/>
                            );
                    })}
                </div>
          );  

        const hit_order = (
              <div className="row">
                    {this.props.youtube.hit.data.map((youtube) => {
                        return (
                                <YoutubeCard key={youtube.youtube_id}
                                             youtube={youtube}/>
                            );
                    })}
                </div>
          );            
        
        const youtube_search = (
                <div className="youtube-search-box" id="youtube-search">
                   <select className="browser-default">
                      <option value="new" defaultValue>글제목</option>
                      <option value="like">글작성자</option>
                   </select> 
                 <input type="text"
                       className="youtube-search-input"/>
                 <img src="/asset/images/youtube-search-icon.png" className="youtube-search-icon"/>       
                </div>
          );
        let youtubes = undefined;

        if(this.state.order == 'new')
        {
           youtubes = new_order;
        }
        else if(this.state.order == 'like')
        {
           youtubes = like_order;
        }
        else if(this.state.order == 'hit')
        {
           youtubes = hit_order;
        }

        return (
                <div>
                  <div className="input-field youtube-select">
                    <select className="browser-default" 
                            onChange={this._selectChange} 
                            value={this.state.order} >
                      <option value="new" defaultValue>최신순</option>
                      <option value="like">인기순</option>
                      <option value="hit">조회순</option>
                    </select> 
                  </div>
                   <div className="youtube-fixed">
                        <a className="modal-trigger youtube-write" onClick={this._openModal}>
                          <img src="/asset/images/write-icon.png" className="write-icon"/>
                        </a>
                        <a className="youtube-search" onClick={this._openSearch}>
                          <img src="/asset/images/youtube-search-icon.png" className="youtube-search-icon"/>
                        </a>
                        {this.state.searchOpen? youtube_search: undefined}
                   </div> 
                    {create_modal}
            		{youtubes}
                </div>
        	);
    }
}

const mapStateToProps = (state) => {
    return {
      youtube: state.youtubes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
      getYoutubes: (page, order) => {
        return dispatch(getYoutubes(page, order));
      }
    };
};

YoutubeBox.propTypes = {
    youtube: React.PropTypes.object,
    getYoutubes: React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(YoutubeBox);

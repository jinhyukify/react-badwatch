import React from 'react';
import io from 'socket.io-client';
import update from 'react-addons-update';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import ChatMessage from './ChatMessage';
import { getMessage, getConnectionCount, updateCurrentRoom, addConnection, deleteConnection, leaveRoom } from '../actions/chat';
let connectOptions = {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
            "transports" : ["websocket"],
            "path": '/api/chat'
        };
class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ChatRoom';
        this.state = {
            message: '',
            showList: false,
            whisperMessage: '',
            whisperInputOpen: false,
            whisperTo: {}
        };
        this._handleChange = this._handleChange.bind(this);
        this._sendMessage = this._sendMessage.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this._showList = this._showList.bind(this);
        this._onWhisperOpen = this._onWhisperOpen.bind(this);
        this._handleWhisperKeyPress = this._handleWhisperKeyPress.bind(this);
        this._sendWhisperMessage = this._sendWhisperMessage.bind(this);
        this.socket = io.connect('http://bad.watch', connectOptions)
    }

    chat_dateFormat(date) 
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

    _onWhisperOpen(name, overwatch_id)
    {
        this.setState({
            whisperTo: {
                name: name,
                overwatch_id: overwatch_id
            },
            whisperInputOpen: true
        }, function(){
            $('#whisper').focus();
        });

    }

    _handleWhisperKeyPress(e)
    {
        if(e.key == 'Enter')
        {
            this._sendWhisperMessage();
        }
    }

    _showList()
    {
        this.setState({
            showList: !this.state.showList
        });
    }

    _handleChange(e)
    {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    _handleKeyPress(e)
    {
        if(e.key == 'Enter')
        {
            this._sendMessage();
        }
    }

    _sendMessage()
    {
        if(!this.state.message) 
            return;
        this.socket.emit('send', { "message": this.state.message });
        this.setState({
            message: ''
        });
    }

    _sendWhisperMessage()
    {
        if(!this.state.whisperMessage)
            return;
        if(!this.state.whisperTo.overwatch_id)
        {
            sweetAlert(
                '',
                '대상이 선택되지 않았습니다.',
                'error'
            )
            return;
        }
        this.socket.emit('send_whisper', { "message": this.state.whisperMessage, "overwatch_id": this.state.whisperTo.overwatch_id, "to": this.state.whisperTo.name })
        this.setState({
            whisperMessage: ''
        });
    }

    _goRoomList()
    {
        browserHistory.push('/chat');
    }

    componentDidMount()
    {
        $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
        let room_list = ["bronze", "silver", "gold", "platinum", "diamond"];
        if(!room_list.includes(this.props.params.room))
        {
            sweetAlert(
                '',
                '잘못된 접근입니다.',
                'error'
            )
            browserHistory.push('/');
            return;
        }
        let current_room = {
            room: this.props.params.room,
            overwatch_id: this.props.authentication.status.current_user.id
        };
    	
        
        //방입장
        this.socket.emit('room_join', current_room);
        this.props.updateCurrentRoom(current_room.room);


        this.socket.on('connection_count', function(data){
            console.log("connection_count");
            this.props.getConnectionCount(data.count, data.user_list);
        }.bind(this));

        this.socket.on('connection_add', function(data){
            console.log("add");
            console.log(data);
            this.props.addConnection(data.count, data.user_data);
        }.bind(this));

        this.socket.on('connection_delete', function(data){
            console.log("delete");
            this.props.deleteConnection(data.count, data.user_data);
        }.bind(this));  

        this.socket.on('receive', function(data){
            console.log("receive");
            console.log(data.type);
            if(data.type == 1)
            {
                sweetAlert(
                    '',
                    '로그인후 작성하실 수 있습니다.',
                    'error'
                )
                return;
            }
            else if(data.type == 2)
            {
                sweetAlert(
                    '',
                    '이 점수대와 맞지않아 채팅을 작성할 수 없습니다.',
                    'error'
                )
                return;
            }
            else if(data.type == 3)
            {
                sweetAlert(
                    '',
                    '접속중인 방이 없습니다.',
                    'error'
                )
                return;
            }
            else
            {
                this.props.getMessage(data);
            }

            $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
        }.bind(this));

        this.socket.on('receive_whisper', function(data){
            console.log(data.type);
            if(data.type == 1)
            {
                sweetAlert(
                    '',
                    '로그인후 작성하실 수 있습니다.',
                    'error'
                )
                return;
            }
            else if(data.type == 2)
            {
                sweetAlert(
                    '',
                    '이 점수대와 맞지않아 채팅을 작성할 수 없습니다.',
                    'error'
                )
                return;
            }
            else if(data.type == 6)
            {
                sweetAlert(
                    '',
                    '대상이 없습니다.',
                    'error'
                )
                return;
            }
            else
            {
                this.props.getMessage(data);
            }

            $('.chat-box').scrollTop($('.chat-box')[0].scrollHeight);
        }.bind(this))
            
    }

    componentWillUnmount()
    {
        this.socket.emit('room_leave');
    }


    render() {
        const mobile_close = (
                <div className="mobile-chat-list" onClick={this._showList}>
                        접속 인원 {this.props.chat[this.props.chat.current_room].connection_count}명 ▼
                </div>
            );
        const mobile_open = (
                 <div>
                        <div className="mobile-connect">
                                {this.props.chat[this.props.chat.current_room].room_userlist.map((user, i) => {
                                    return (
                                            <div key={i+user}>
                                                {user}
                                            </div>
                                        );
                                })}
                
                        </div>
                        <div className="mobile-chat-list-close" onClick={this._showList}>
                            닫기 ▲
                        </div>
                    </div>
            );
        const whisper_input = (
                <div className="youtube-search-box">
                    <div className="whisper-to-box">
                        To: {this.state.whisperTo.name} : 
                    </div>
                    <input id="whisper"
                           className="youtube-search-input"
                           type="text" 
                           name="whisperMessage"
                           onChange={this._handleChange}
                           onKeyPress={this._handleWhisperKeyPress}
                           value={this.state.whisperMessage}/>
                    <div className="whisper-send" onClick={this._sendWhisperMessage}>
                        <i className="fa fa-arrow-right fa-2x pointer" aria-hidden="true"></i>
                    </div>  
                </div> 
            );


        return (
        		<div>
                    {this.state.showList? mobile_open: mobile_close}
                   
        			<div className="chat-box">
                        {this.props.chat[this.props.chat.current_room].messages.map((message, i) => {
                            return (
                                    <ChatMessage key={i} 
                                                 message={message}
                                                 handleWhisperOpen={this._onWhisperOpen}/>
                                );
                        })}
                        
                    </div>
                    
                    <div className="chat-name-list">
                        <div className="connect-title">
                            접속 인원 {this.props.chat[this.props.chat.current_room].connection_count}명           
                            
                          
                        </div>
                        <div className="connect">
                            {this.props.chat[this.props.chat.current_room].room_userlist.map((user, i) => {
                                return (
                                        <div key={i+user}>
                                            {user.split('#')[0]}
                                        </div>
                                    );
                            })}
                            

                        </div>
                        <div className="get-out-chat" onClick={this._goRoomList}>
                            대화방 나가기
                        </div>        
                    </div>

                    <div className="chat-input-div">
                            <input id="chat"
                                   type="text" 
                                   name="message"
                                   className="input-field"
                                   value={this.state.message}
                                   onChange={this._handleChange}
                                   onKeyPress={this._handleKeyPress} /> 
                            <span onClick={this._sendMessage}>
                                전송
                            </span>
                    </div>
                    {this.state.whisperInputOpen? whisper_input: undefined}
                    <br/><br/><br/><br/><br/><br/>
        		</div>
        	);
    }
}

const mapStateToProps = (state) => {
    return {
        chat: state.chat,
        authentication: state.authentication
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getMessage: (message) => {
            return dispatch(getMessage(message));
        },
        updateCurrentRoom: (room) => {
            return dispatch(updateCurrentRoom(room));
        },
        getConnectionCount: (count, userlist) => {
            return dispatch(getConnectionCount(count, userlist));
        },
        addConnection: (count, user) => {
            return dispatch(addConnection(count, user));
        },
        deleteConnection: (count, user) => {
            return dispatch(deleteConnection(count, user));
        },
        leaveRoom: () => {
            return dispatch(leaveRoom());
        }
    };
}

ChatRoom.propTypes = {
    chat: React.PropTypes.object,
    getMessage: React.PropTypes.func,
    updateCurrentRoom: React.PropTypes.func,
    getConnectionCount: React.PropTypes.func,
    addConnection: React.PropTypes.func,
    deleteConnection: React.PropTypes.func,
    leaveRoom: React.PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);

import React from 'react';
import io from 'socket.io-client';
import update from 'react-addons-update';
import { browserHistory } from 'react-router';
class ChatRoom extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'ChatRoom';
        this.state = {
            socket: {},
            message: '',
            name: '',
            results: []
        };
        this._handleChange = this._handleChange.bind(this);
        this._sendMessage = this._sendMessage.bind(this);
        this._receive = this._receive.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        //socket.on('news', this._receive);
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
        console.log("sending");
        //socket.emit('send', { "name": this.state.name, "message": this.state.message });
        this.setState({
            message: ''
        });
    }

    _receive(data)
    {
        console.log(data);
        this.setState({
            results: update(this.state.results, {
                $push: [data]
            })
        });
    }

    componentDidMount()
    {
        let room_list = ["bronze", "silver", "gold", "platinum", "diamond"];
        if(!room_list.includes(this.props.params))
        {
            sweetAlert(
                '데이터를 불러오는데 오류가 발생했습니다.',
                '잠시후 다시시도해주세요.',
                'error'
            )
            return;
        }
    	let connectOptions = {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
            "transports" : ["websocket"],
            "path": '/api/chat'
        };
        this.setState({
            socket: io.connect('http://bad.watch', connectOptions)
        }, function(){
            this.state.socket.emit()
        });

    }

    componentWillUnMount()
    {
        this.state.socket.emit('disconnect');
        this.setState({
            socket: {}
        });
    }

    render() {
        return (
        		<div>
        			<div className="chat-box">
                        <div>
                            <div className="chat-box-name">
                                홍대자퇴생 <span className="meta">2016-08-18 18:55:20</span> 
                            </div>
                            <div className="chat-log">  
                                (<span className="log-name">던지기만하는 라인하르트</span>) : 라인 각 인정?
                            </div>
                        </div>
                        <div className="chat-input-div">
                            <input type="text" /> 
                            <span>
                                전송
                            </span>
                        </div>
                    </div>
                    
                    <div className="chat-name-list">
                        <div className="connect-title">
                            접속 인원 3명           
                        </div>
                        <div className="connect">
                            <div>
                                홍대자퇴생
                            </div>

                        </div>
                        <div className="get-out-chat">
                            대화방 나가기
                        </div>        
                    </div>
                    {this.state.results.map((result, i) => {
                        return (
                                <div key={i}>
                                    <p>{result.name} : {result.message}</p>
                                </div>
                            );
                    })}
                    <div className="row">
                        <div className="row">
                            <div className="input-field col s2">
                                <input type="text" 
                                           onChange={this._handleChange}
                                           name="name"
                                           value={this.state.name}/>
                            </div>
                            <div className="input-field col s9">
                                <i className="material-icons prefix">message</i>
                                <input className="input-field col s9"
                                       type="text" 
                                       name="message"
                                       value={this.state.message}
                                       onChange={this._handleChange}
                                       onKeyPress={this._handleKeyPress}/>
                            </div>
                                
                              
                            <button onClick={this._sendMessage}>전송</button>
                        </div>
                        
                    </div>
        		</div>
        	);
    }
}

export default ChatRoom;

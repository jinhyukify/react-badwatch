import React from 'react';
import io from 'socket.io-client';
import update from 'react-addons-update';
let connectOptions = {
            "force new connection" : true,
            "reconnectionAttempts": "Infinity", //avoid having user reconnect manually in order to prevent dead clients after a server restart
            "transports" : ["websocket"],
            "path": '/api/chat'
        };
let socket = io.connect('http://bad.watch', connectOptions);
class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Chat';
        this.state = {
            message: '',
            name: '',
            results: []
        };
        this._handleChange = this._handleChange.bind(this);
        this._sendMessage = this._sendMessage.bind(this);
        this._receive = this._receive.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        socket.on('news', this._receive);
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
        socket.emit('send', { "name": this.state.name, "message": this.state.message });
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

    render() {
        return (
        		<div>
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

export default Chat;

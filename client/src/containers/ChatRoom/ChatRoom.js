import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col, Row} from "reactstrap";

class ChatRoom extends Component {
    state = {
        username: '',
        messages: [],
        text: '',
        usernames: [],
    };

    setChat = () => {
        this.websocket = new WebSocket('ws://localhost:8000/chat?token=' + this.props.user.token);
        this.websocket.onmessage = event => {
            const parsed = JSON.parse(event.data);

            if (parsed.type === 'LAST_MESSAGES') {
                this.setState({
                    messages: parsed.messages
                })
            }

            if (parsed.type === 'NEW_MESSAGE') {
                this.setState({
                    messages: [...this.state.messages, parsed.message]
                })
            }

            if (parsed.type === 'ONLINE_USERS') {
                this.setState({
                    usernames: parsed.usernames
                })
            }

            if (parsed.type === 'SET_USERNAME') {
                this.setState({
                    username: parsed.username,
                })
            }

        };
        this.websocket.onerror = error => {
            const interval = setInterval(
                () => {
                    this.websocket = new WebSocket('ws://localhost:8000/chat?token=' + this.props.user.token);
                    console.log(error);
                    if (!error) {
                        return clearInterval(interval);
                    }
                }, 1000)
        }
    };

    componentDidMount() {
        this.setChat();
    }

    sendMessage = () => {
        const message = JSON.stringify({
            type: 'ADD_MESSAGE',
            text: this.state.text,
        });

        this.websocket.send(message);
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    render() {

        let users = (
            <div>
                {this.state.usernames && this.state.usernames.map(user => (
                    <li key={user}>{user}</li>
                ))}
            </div>
        );

        let chat = (
            <div>
                {this.state.messages.map((message, i) => (
                    <div key={i}>
                        <b>{message.username || 'Anonymous'}</b>:
                        <span>{message.text}</span>
                    </div>
                ))}
                <div>
                    <input type="text" onChange={this.inputChangeHandler} name="messageText" value={this.state.text}/>
                    <input type="button" value="send" onClick={this.sendMessage}/>
                </div>
            </div>
        );

        return (
            <div>
                <Row>
                    <Col sm={3}>
                        <h5>Online users</h5>
                        {users}
                    </Col>
                    <Col sm={9} className="Chat">
                        {chat}
                    </Col>
                </Row>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    user: state.users.user
});

export default connect(mapStateToProps)(ChatRoom);
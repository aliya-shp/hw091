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

    componentDidMount() {
        this.websocket = new WebSocket('ws://localhost:8000/chat?token=' + this.props.user.token);
        this.websocket.onmessage = event => {
            const parsed = JSON.parse(event.data);

            if (parsed.type === 'LAST_MESSAGES') {
                this.setState({
                    messages: parsed.messages,
                })
            }

            if (parsed.type === 'NEW_MESSAGE') {
                this.setState({
                    messages: this.state.messages.concat({
                        username: parsed.username,
                        text: parsed.text,
                    })
                })
            }

            if (parsed.type === 'ONLINE_USERS') {
                this.setState({
                    usernames: parsed.usernames,
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
    }

    sendMessage = () => {
        const message = JSON.stringify({
            type: 'ADD_MESSAGE',
            text: this.state.text,
        });

        this.websocket.send(message);
        this.setState({ text: '' });
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    };

    render() {
        return (
            <div>
                <Row>
                    <Col sm={3}>
                        <h5>Online users</h5>
                        {this.state.usernames && this.state.usernames.map(user => (
                            <li key={user}>{user}</li>
                        ))}
                    </Col>
                    <Col sm={9} className="Chat">
                        {this.state.messages.map((message, i) => (
                            <div key={i}>
                                <b>{message.username}</b>:
                                <span>{message.text}</span>
                            </div>
                        ))}
                    </Col>
                    <Col sm={{offset: 3, size: 9}}>
                        <input type="text" onChange={this.inputChangeHandler} name="text" value={this.state.text}/>
                        <input type="button" value="Send message" onClick={this.sendMessage}/>
                    </Col>
                </Row>
            </div>
        );
    }
}


const mapStateToProps = state => ({
    user: state.users.user,
});

export default connect(mapStateToProps)(ChatRoom);
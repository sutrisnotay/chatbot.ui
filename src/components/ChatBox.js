import React, {Component} from "react";
import PropTypes from "prop-types";

import ConversationItem from "./ConversationItem";

class ChatBox extends Component{
    constructor(props){
        super(props)
        this.onBtnSendClick = this.onBtnSendClick.bind(this);
        this.onTxtMessageKeydown = this.onTxtMessageKeydown.bind(this);
        this.onTxtMessageChange = this.onTxtMessageChange.bind(this);
        this.client = new window.ApiAi.ApiAiClient({accessToken: "ff265fdc6e5545cdb0440b7d1b800fd9 "})
        this.state = {
            listConversation: [],
            message: ""
        }
    }

    onTxtMessageKeydown(e){
        if(e.keyCode === 13){
            e.preventDefault()
            this.onBtnSendClick()
        }
    }

    onTxtMessageChange(e){
        this.setState({message: e.target.value})
    }

    onBtnSendClick(e){
        let message = this.state.message
        this.setState({listConversation: [...this.state.listConversation, {
            from: {type: "user", name: "The User"},
            message: message
        }]})

        this.client.textRequest(message).then(response => {
            this.setState({listConversation: [...this.state.listConversation, {
                from: {type: "bot", name: "Beautiful Bot"},
                message: response.result.fulfillment.speech
            }]})
        }).catch(error => {
            console.log(error)
        })
        this.setState({message: ""})
    }

    componentDidUpdate(){
        window.$(".custom-scroll").scrollTop(window.$(".custom-scroll")[0].scrollHeight)
    }

    render(){return (
        <section className="panel panel-with-borders messaging">
            <div className="panel-heading">
                <h6 className="messaging-title">{this.props.title}</h6>
            </div>
            <div className="panel-body">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="conversation-block height-500 custom-scroll">
                            {this.state.listConversation.map(item => {
                                return <ConversationItem from={item.from} message={item.message}/>
                            })}
                        </div>
                        <div className="form-group padding-top-20 margin-bottom-0">
                            <textarea 
                                className="form-control adjustable-textarea" 
                                placeholder="Type and press enter" 
                                style={{overflowX: "hidden", wordWrap: "break-word", resize: "none", overflowY: "visible"}}
                                onChange={this.onTxtMessageChange}
                                onKeyDown={this.onTxtMessageKeydown}
                                value={this.state.message}>
                            </textarea>
                            <button className="btn btn-primary width-200 margin-top-10" onClick={this.onBtnSendClick}>
                                <i className="fa fa-send margin-right-5"></i>
                                Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )}
}
ChatBox.propTypes = {
    listConversation: PropTypes.array.isRequired
}
ChatBox.defaultProps = {
    listConversation: [
        {from: {name: "Frans Huang", type: "user"}, message: "Hello, my name is Frans. I am user"},
        {from: {name: "Beautiful Bot", type: "bot"}, message: "Nice to meet you Frans. I am bot"}
    ]
}
export default ChatBox;
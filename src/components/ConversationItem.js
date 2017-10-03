import React, {Component} from "react";
import PropTypes from "prop-types";

class ConversationItem extends Component{
    render(){return (
        <div className={(this.props.from.type === "user")?"conversation-item": "conversation-item you"}>
            <div className="s1">
                <a className="avatar" href="javascript:void(0);">
                    <img src="../assets/common/img/temp/avatars/3.jpg" alt="Alternative text to the image" />
                </a>
            </div>
            <div className="s2">
                <strong>{this.props.from.name}</strong>
                <p>{this.props.message}</p>
            </div>
        </div>
    )}
}
ConversationItem.propTypes = {
    from: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired
}
ConversationItem.defaultProps = {
    from: {type: "user", name: ""},
    message: ""
}
export default ConversationItem
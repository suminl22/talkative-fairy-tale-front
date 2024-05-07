import React from 'react';

class ChatBubble extends React.Component {
    render() {
        const { message, isUser } = this.props;
        const className = isUser ? 'message user-message' : 'message computer-message';

        return (
            <div className={className}>
                {message}
            </div>
        );
    }
}

export default ChatBubble;

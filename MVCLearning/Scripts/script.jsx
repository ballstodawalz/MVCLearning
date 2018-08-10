class CommentBox extends React.Component {
    render() {
        return (
            <div className="w3-card-2">
                {this.props.name}
            </div>
        );
    }
}

ReactDOM.render(
    <CommentBox name='I am a prop in a react world' />,
    document.getElementById('reactIsh')
);
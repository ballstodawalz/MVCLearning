class CommentBox extends React.Component {
    render() {
        return (
            <div>
                {this.props.name}
            </div>
        );
    }
}

ReactDOM.render(
    <CommentBox name='I am a prop in a react world' />,
    document.getElementById('reactIsh')
);
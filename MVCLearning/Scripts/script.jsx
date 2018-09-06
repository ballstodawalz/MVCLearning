class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            homeTeam: '',
            awayTeam: ''
        }
    }

    render() {
        return (
            < div className='w3-card' >
                {this.props.home} <span className='w3-round w3-teal w3-center'> vs </span> {this.props.away}
            </div >
        )
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: []
        };

        this.handleRepeatChange = this.handleRepeatChange.bind(this);
        this.repeatEvent = this.repeatEvent.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.changeName = this.changeName.bind(this);
        this.handle = this.handleError.bind(this);
    }

    handleRepeatChange(e) {
        const num = e.target.value;
        this.repeatEvent(num);
    }

    handleNameChange(e) {
        const name = e.target.value;
        this.changeName(name);
    }

    handleError(e) {
        const error = e.target.value;
        alert(error);
    }

    repeatEvent(newNumber) {
        if (newNumber < this.state.repeat[this.state.repeat.length - 1]) {
            this.setState({ repeat: [...this.state.repeat.splice(0, newNumber)] });
        }
        else {
            this.setState({ repeat: [...this.state.repeat, newNumber] });
        }
    }

    changeName(newName) {
        this.setState({ name: newName });
    }

    componentDidMount() {
        fetch('/home/getsportsdataasync')
            .then(response => {
                let textResponse = response.text();
                return textResponse;
            })
            .then(jsonObj => {
                let y = JSON.parse(jsonObj);
                y = JSON.parse(y);
                var ar = Array.from(y.games);
                ar.forEach(item => this.setState({ games: [...this.state.games, item] }))
            }
            )
    }


    render() {
        return (
            <div>
                {this.state.games.map((i) => <div key={i}><Game home={i.home} away={i.away} /></div>)}
            </div>
        );
    }
}

class Parent extends React.Component {
    render() {
        return (
            <Form />
        )
    }
}

ReactDOM.render(
    <Parent />,
    document.getElementById('reactIsh')
);
class Game extends React.Component {
    constructor(props) {
        super(props);
        this.dateTimeConvert = this.dateTimeConvert.bind(this);
        this.getNetwork = this.getNetwork.bind(this);
    }
    dateTimeConvert(value) {
        var date = new Date(value);

        return date.toLocaleDateString() + '          ' + date.toLocaleTimeString()
    }

    getNetwork(broadcast) {
        let net = broadcast == undefined ? '' : broadcast.network;
        return net;
    }

    render() {
        return (
            < div className='w3-card w3-center' >
                <div>
                    {this.props.home} <span className='w3-round w3-center text-align-center'>vs</span> {this.props.away}
                </div>
                <div>
                    {this.dateTimeConvert(this.props.date)}
                </div>
                <div className='w3-left'>
                    {this.props.homeScore}
                </div>
                <div className='w3-right'>
                    {this.props.awayScore}
                </div>
                <span className='w3-round w3-red w3-center text-align-center'>{this.getNetwork(this.props.broadcast)}</span>
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
                console.log(ar);
                ar.forEach(item => this.setState({ games: [...this.state.games, item] }))
            }
            )
    }


    render() {
        return (
            <div>
                {this.state.games.map((i) => i.status == 'closed' ? '' : <div key={i}><Game home={i.home} away={i.away} date={i.scheduled} homeScore={i.home_points} awayScore={i.away_points} broadcast={i.broadcast} /></div>)}
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
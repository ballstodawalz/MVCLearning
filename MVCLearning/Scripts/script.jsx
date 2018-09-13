class Game extends React.Component {
    constructor(props) {
        super(props);
        this.dateConvert = this.dateConvert.bind(this);
        this.timeConvert = this.timeConvert.bind(this);
        this.getNetwork = this.getNetwork.bind(this);
        this.getOdds = this.getOdds.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    dateConvert(value) {
        var date = new Date(value);

        return date.toLocaleDateString();
    }
    timeConvert(value) {
        var date = new Date(value);
        return date.toLocaleTimeString();
    }

    getNetwork(broadcast) {
        let net = broadcast == undefined ? '' : broadcast.network;
        return net;
    }

    getOdds(game) {
        ar = []
        fetch('/home/getsportsoddsdataasync')
            .then(response => {
                let textResponse = response.text();
                return textResponse;
            })
            .then(jsonObj => {
                let y = JSON.parse(jsonObj);
                y = JSON.parse(y);
                ar = Array.from(y.game_data);
            }
            )
        console.log(ar);
    }

    handleClick() {
    }

    render() {
        return (
            < div className='w3-card w3-center' onClick={this.handleClick}>
                <div className="matchup">
                    <div className={this.props.homeScore > this.props.awayScore ? "winning scoreHome" : "losing scoreHome"}>
                        {this.props.homeScore}
                    </div>

                    <div className={this.props.awayScore > this.props.homeScore ? "winning scoreAway" : "losing scoreAway"}>
                        {this.props.awayScore}
                    </div>
                    <div>
                        {this.props.home} <span className='w3-round w3-center text-align-center'>vs</span> {this.props.away}
                    </div>


                    <div>
                        {this.dateConvert(this.props.date)}
                    </div>
                    <div>
                        {this.timeConvert(this.props.date)}
                    </div>
                    <span className='w3-round w3-red w3-center text-align-center'>{this.getNetwork(this.props.broadcast)}</span>
                </div>
                <Odds home={this.props.home} away={this.props.away} />
            </div >

        )
    }
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [],
            gamesFull : []
        };

        this.handleRepeatChange = this.handleRepeatChange.bind(this);
        this.repeatEvent = this.repeatEvent.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.changeName = this.changeName.bind(this);
        this.handleError = this.handleError.bind(this);
        this.matchUpBettingData = this.matchUpBettingData.bind(this);
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
            );

        this.matchUpBettingData();
    }

    matchUpBettingData() {
        var myarray = [];
        fetch('/home/getsportsoddsdataasync')
            .then(response => {
                let textResponse = response.text();
                return textResponse;
            })
            .then(jsonObj => {
                let y = JSON.parse(jsonObj);
                y = JSON.parse(y);
                var ar = Array.from(y.sport_events);
                ar.forEach(item => {
                    let y = this.state.games.find(otheritem => {
                        if (otheritem.home == item.competitors[0].abbreviation) {
                            let yay = { ...otheritem, ...item };
                            console.log(yay);
                            this.setState({
                                gamesFull: [...this.state.gamesFull, yay]
                            });
                        }
                    });
                });
            });
    }

    render() {
        return (
            <div>
                {this.state.games.map((i) => <div key={i}><Game home={i.home} away={i.away} date={i.scheduled} homeScore={i.home_points} awayScore={i.away_points} broadcast={i.broadcast} /></div>)}
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

class Odds extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (this.props.home);
    }
}

ReactDOM.render(
    <Parent />,
    document.getElementById('reactIsh')
);
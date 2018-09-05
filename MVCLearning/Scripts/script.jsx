﻿class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            repeat: [0],
            name: '',
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
        fetch('https://api.sportradar.us/ncaafb-t1/2018/REG/2/schedule.json?api_key=tmgx6wjpu45uzjn732ke4swx', {
            headers: new Headers({
                'X-Originating-IP':'198.175.141.60'
            })
        })
            .then(results => {
                console.log(results.json())
            })
    }

    render() {
        return (
            <div>
                <form>
                    <label>
                        Name:
                        <input type="text" maxLength={40} value={this.state.name} onChange={this.handleNameChange} />
                    </label>

                    <br />

                    <label>
                        Repeat:
                        <input type="range" min={0} max={7} value={this.state.repeat[this.state.repeat.length - 1]} onChange={this.handleRepeatChange} /> {this.state.repeat[this.state.repeat.length - 1]}
                    </label>
                </form>

                {this.state.repeat.map((i) => <div key={i}>{this.state.name}</div>)}

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
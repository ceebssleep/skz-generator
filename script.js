function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
}

class ClipboardCopier extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            copied: false
        };

    }

    componentDidMount() {
        const clipboard = new Clipboard('.btn-copy', {
            text: function() {
                return document.querySelector('#name').value;
            }
        });


        clipboard.on('success', e => {
            this.setState({
                copied: true
            });


            setTimeout(() => this.setState({ copied: false }), 1000);
        });
    }

    render() {
        const { value } = this.props;
        const { copied } = this.state;

        return (
            React.createElement("div", { className: 'd-grid gap-2 d-md-flex' },
                React.createElement("input", { type: "hidden", id: "name", value: value }),
                React.createElement("button", { disabled: copied, className: "btn btn-copy btn-outline-light" }, copied ? 'Copied!' : 'Copy to clipboard')));
    }
}


const Button = ({ name, onClick, children }) => {
    return (
        React.createElement("input", { className: "btn btn-randomize-namepart btn-outline-light", type: "submit", name: name, onClick: onClick, value: children }));

};

class App extends React.Component {

    constructor(props) {
        super(props);
        _defineProperty(this, "handleGetNameClick",
            e => {
                this.setState({
                    [e.target.name]: getRandom(nameData[e.target.name])
                });

            });
        this.state = { firstName: '', secondName: '', prompt: '' };
    }
    componentWillMount() { this._randomAll(); }
    _randomAll() {
        Object.keys(this.state).forEach(name => {
            this.setState({
                [name]: getRandom(nameData[name])
            });
        });
    }

    render() {
        const { firstName, secondName, prompt } = this.state;
        return (
            React.createElement("div", null,
                React.createElement("div", { className: "py-4" },
                    React.createElement("div", { className: "h1" },
                        React.createElement("div", null,
                            React.createElement("span", { className: "d-inline fw-bold text-uppercase" }, firstName),
                            React.createElement("span", { className: "d-inline fs-2" }, " x "),
                            React.createElement("span", { className: "d-inline fw-bold text-uppercase" }, secondName))),

                    React.createElement("div", { className: "fs-2 pb-4" },
                        React.createElement("span", null, prompt), ),

                    React.createElement("div", { className: "d-grid gap-2 d-md-flex" },
                        React.createElement("button", { className: "btn btn-light", onClick: this._randomAll.bind(this) }, "Get new pairing & prompt"),
                        React.createElement(ClipboardCopier, { value: firstName + ' x ' + secondName + ', ' + prompt }))),

                React.createElement("hr"),
                React.createElement("div", { className: "py-4" },
                    React.createElement("h2", { className: "h6" }, "Randomize only one value"),
                    React.createElement("div", { className: "pb-4  d-grid gap-2 d-md-flex" },
                        React.createElement(Button, { name: "firstName", onClick: this.handleGetNameClick }, "New member 1"),
                        React.createElement(Button, { name: "secondName", onClick: this.handleGetNameClick }, "New member 2"),
                        React.createElement(Button, { name: "prompt", onClick: this.handleGetNameClick }, "New prompt")))));
    }
}

const nameData = {
    "firstName": [
        "Bang Chan",
        "Lee Know",
        "Changbin",
        "Hyunjin",
        "Han",
        "Felix",
        "Seungmin",
        "I.N."
    ],

    "secondName": [
        "Bang Chan",
        "Lee Know",
        "Changbin",
        "Hyunjin",
        "Han",
        "Felix",
        "Seungmin",
        "I.N."
    ],

    "prompt": [
        "Accidental relationship",
        "Body Swap",
        "Character study",
        "Cheating or netorare/NTR",
        "Coming of age",
        "Enemies to lovers",
        "Established relationship",
        "Exes to lovers",
        "Fake/pretend Relationship",
        "First kiss",
        "Flirting",
        "Friends to lovers",
        "Holidays",
        "Hurt/Comfort",
        "Keepings secrets",
        "Long distance",
        "Meet-cute/meet-ugly",
        "Misunderstandings",
        "Neighbors",
        "No homo",
        "Parties",
        "Pining",
        "Polyamory",
        "Revenge",
        "Roommates",
        "School reunion",
        "Sharing clothes",
        "Slice of life",
        "Tension",
        "There was only one bed",
        "Time loop/travel/skip",
        "Travel",
        "Unrequited love",
    ]
};




ReactDOM.render(React.createElement(App, null), document.getElementById('app'));
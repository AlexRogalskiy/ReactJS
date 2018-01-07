var Mixin1 = {
	log: function(message) {
		console.log(message);
	},
	componentWillMount: function() {
		this.log('componentWillMount: Mixin1');
	}
};

var Mixin2 = {
	componentWillMount: function() {
		console.log('componentWillMount: Mixin2');
	}
};

var Header2 = React.createClass({
	mixins: [Mixin1, Mixin2],
	propTypes: {
        message: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            message: ''
        };
    },
    getInitialState: function() {
		return { message: '' };
	},
	render: function() {
		console.log('render: Header2');
		return <h2>{this.props.message}</h2>;
	},
	componentWillMount: function() {
		console.log('componentWillMount: Header2');
	},
	componentDidMount: function() {
		console.log('componentDidMount: Header2');
	},
	componentWillUnmount: function() {
		console.log('componentWillUnmount: Header2');
	}
});

var Button = React.createClass({
	mixins: [Mixin1, Mixin2],
	propTypes: {
		id: React.PropTypes.string,
		name: React.PropTypes.string,
		className: React.PropTypes.string
	},
    getDefaultProps: function() {
        return {
        	className: '',
        };
    },
    onClick: function() {
		this.log(ReactDOM.findDOMNode(this).id + ' clicked');
	},
    getInitialState: function() {
		return { className: '' };
	},
	componentWillMount: function() {
		console.log('componentWillMount: Button');
	},
	render: function() {
		return (
			<button id={this.props.id} name={this.props.name} type='button' onClick={this.props.onClick ? this.props.onClick : this.onClick} className={'btn ' + this.props.className}>
				{this.props.children}
			</button>
		);
	}
});

var View = React.createClass({
	clicked: function() {
		console.log('clicked');
	},
	render: function() {
		return (
			<div>
				<Header2 message='Hi' />
				<Button id='22' onClick={this.clicked}>Ok</Button>
			</div>
		);
	}
});

ReactDOM.render(<View />, document.getElementById('view'));
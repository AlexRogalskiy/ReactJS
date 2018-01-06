var Button = React.createClass({
	propTypes: {
		className: React.PropTypes.string
	},
    getDefaultProps: function() {
        return {
        	className: ''
        };
    },
    getInitialState: function() {
		return { className: '' };
	},
	render: function() {
		return (
			<button type='button' className={'btn ' + this.props.className} onClick={this.props.onClick}>
				{this.props.children}
			</button>
		);
	}
});

var GlyphIcon = React.createClass({
	propTypes: {
        icon: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            icon: ''
        };
    },
    getInitialState: function() {
		return { icon: 'pencil' };
	},
	render: function() {
		return (
			<span className={'glyphicon glyphicon-' + this.props.icon} aria-hidden='true'></span>
		);
	}
});

var View = React.createClass({
	propTypes: {
		counter: React.PropTypes.number,
		min: React.PropTypes.number,
		max: React.PropTypes.number,
		isIncreasing: React.PropTypes.bool,
		isVisible: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            counter: 0,
            min: 0,
            max: Number.MAX_VALUE,
            isIncreasing: false,
			isVisible: false
        };
    },
	getInitialState: function() {
		return { counter: 0, isIncreasing: false, isVisible: true };
	},
	// componentWillReceiveProps: function(nextProps) {
	// 	this._logPropsAndState('componentWillReceiveProps: View');
	// 	console.log('nextProps.counter: ', nextProps.counter);
	// 	this.setState({
	// 		isIncreasing: nextProps.counter > this.props.counter
	// 	});
	// },
	shouldComponentUpdate: function(nextProps, nextState) {
		this._logPropsAndState('shouldComponentUpdate: View');
		console.log('nextState.counter: ', nextState.counter, ' nextState.isIncreasing: ', nextState.isIncreasing);
		return (nextState.counter >= this.props.min && nextState.counter <= this.props.max);
	},
	componentDidUpdate: function(prevProps, prevState) {
		this._logPropsAndState('componentDidUpdate: view');
		console.log('prevState.counter: ', prevState.counter, ' prevState.isIncreasing: ', prevState.isIncreasing);
	},
	_logPropsAndState: function(callback) {
		console.log('=> ', callback);
		console.log('this.props.counter: ', this.props.counter);
		console.log('this.state.isIncreasing: ', this.state.isIncreasing);
	},
	up: function() {
		if(this.state.counter < this.props.max) {
		 	this.setState({
		 		counter: this.state.counter+1,
		 		isIncreasing: true
		 	});
		}
		//ReactDOM.render({ counter: this.props.counter+1 });
		//this.props.counter += 1;
		//ReactDOM.render(<View />, document.getElementById('view'));
		//this.setProps({ counter: this.props.counter++ });
	},
	down: function() {
		if(this.state.counter > this.props.min) {
		 	this.setState({
		 		counter: this.state.counter-1,
		 		isIncreasing: false
			});
		}
		//ReactDOM.render({ counter: this.props.counter-1 });
		//this.props.counter -= 1;
		//ReactDOM.render(<View />, document.getElementById('view'));
		//this.setProps({ counter: this.props.counter-- });
	},
	render: function() {
		this._logPropsAndState("render: View");
		return (
			<div className={ this.state.isVisible ? 'show' : 'hidden' }>
				<Button onClick={this.up}><GlyphIcon icon='thumbs-up' /> Like</Button>
				<Button onClick={this.down}><GlyphIcon icon='thumbs-down' /> Unlike</Button>
				<br />
				Likes {this.state.counter}&nbsp;
				<GlyphIcon icon={this.state.isIncreasing ? 'circle-arrow-up' : 'circle-arrow-down'} />
			</div>
		);
	}
});

ReactDOM.render(<View />, document.getElementById('view'));
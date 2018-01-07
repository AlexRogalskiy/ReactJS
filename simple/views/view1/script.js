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
        message: React.PropTypes.string,
        className: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            message: '',
            className: ''
        };
    },
    getInitialState: function() {
		return { message: this.props.message, className: this.props.className };
	},
	render: function() {
		console.log('render: Header2');
		return <h2 className={this.props.className}>{this.props.message}</h2>;
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
		isDisabled: React.PropTypes.bool,
		className: React.PropTypes.string
	},
    getDefaultProps: function() {
        return {
        	isDisabled: false,
        	className: ''
        };
    },
    getInitialState: function() {
		return { isDisabled: this.props.isDisabled, className: this.props.className };
	},
	onClick: function() {
		this.log(ReactDOM.findDOMNode(this).id + ' clicked');
	},
	render: function() {
		return (
			<button id={this.props.id} name={this.props.name} type='button' className={this.state.className} disabled={this.props.isDisabled} onClick={this.props.onClick ? this.props.onClick : this.onClick}>
				{this.props.children}
			</button>
		);
	}
});

var GlyphIcon = React.createClass({
	propTypes: {
        className: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            className: ''
        };
    },
    getInitialState: function() {
		return { className: this.props.className };
	},
	render: function() {
		return (
			<span className={this.props.className} aria-hidden='true'></span>
		);
	}
});

var TextBox = React.createClass({
	propTypes: {
		id: React.PropTypes.string,
		name: React.PropTypes.string,
		isReadOnly: React.PropTypes.bool,
        message: React.PropTypes.string,
        isRequired: React.PropTypes.bool,
        isDisabled: React.PropTypes.bool,
        placeholder: React.PropTypes.string,
        className: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
        	isReadOnly: false,
            message: '',
            isRequired: false,
            isDisabled: false,
            placeholder: '',
            className: 'form-control'
        };
    },
    getInitialState: function() {
		return { isReadOnly: this.props.isReadOnly, message: this.props.message, isRequired: this.props.isRequired, isDisabled: this.props.isDisabled, className: this.props.className };
	},
	onChange: function(e) {
		this.setState({ message: e.target.value });
	},
	render: function() {
		return (
			this.state.isRequired ?
				<input id={this.props.id} name={this.props.name} ref='textBox' type='text' className={this.props.className} value={this.state.message} disabled={this.props.isDisabled} placeholder={this.props.placeholder} onChange={this.props.isReadOnly ? this.props.onChange : this.onChange} required />
				:
				<input id={this.props.id} name={this.props.name} ref='textBox' type='text' className={this.props.className} value={this.state.message} disabled={this.props.isDisabled} placeholder={this.props.placeholder} onChange={this.props.isReadOnly ? this.props.onChange : this.onChange}/>
		);
	},
});

var EditTextBox = React.createClass({
	propTypes: {
		id: React.PropTypes.string,
		name: React.PropTypes.string,
		isReadOnly: React.PropTypes.bool,
        message: React.PropTypes.string,
		isEditing: React.PropTypes.bool,
		isRequired: React.PropTypes.bool,
		update: React.PropTypes.func,
        label: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
        	isReadOnly: false,
            message: '',
        	isEditing: false,
        	isRequired: false,
        	update: null,
            label: '',
            placeholder: ''
        };
    },
	getInitialState: function() {
		return { isReadOnly: this.props.isReadOnly, message: this.props.message, isRequired: this.props.isRequired, update: this.props.update, label: this.props.label, placeholder: this.props.placeholder };
	},
	update: function(e) {
		this.setState({ isEditing: false });
		this.refs.editTextBox.setState({ isDisabled: true });
		this.props.update(e);
	},
	edit: function(e) {
		this.setState({ isEditing: true });
		this.refs.editTextBox.setState({ isDisabled: false });
	},
	onChange: function(e) {
		this.setState({ message: e.target.value });
	},
	render: function() {
		return (
			<div className='form-group'>
				<label>{this.props.label}</label>
				<div className='input-group'>
					<TextBox id={this.props.id} name={this.props.name} ref='editTextBox' message={this.state.message} isDisabled={!this.state.isEditing} placeholder={this.props.placeholder} isReadOnly={this.props.isReadOnly} isRequired={this.props.isRequired} />
					{
						this.state.isEditing ?
							<Button id={'button-' + this.props.id} onClick={this.update} className='btn btn-info btn-lg'><GlyphIcon className='glyphicon glyphicon-ok' />&nbsp;Update</Button>
							:
							<Button id={'button-' + this.props.id} onClick={this.edit} className='btn btn-info btn-lg'><GlyphIcon className='glyphicon glyphicon-pencil' />&nbsp;Edit</Button>
					}
				</div>
			</div>
		);
	}
});

var TextContent = React.createClass({
	propTypes: {
		id: React.PropTypes.string,
		name: React.PropTypes.string,
        content: React.PropTypes.string,
        className: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
        	content: '',
        	className: ''
        };
    },
	getInitialState: function() {
		return { content: this.props.content, className: this.props.className };
	},
	render: function() {
		return (
			<span className={this.props.className}>{this.props.content}</span>
		);
	}
});

var View = React.createClass({
	propTypes: {
		firstName: React.PropTypes.string,
		lastName: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            firstName: '',
            lastName: ''
        };
    },
	getInitialState: function() {
		return { firstName: '', lastName: '' };
	},
	update: function(e) {
		switch(e.target.id) {
			case 'button-firstName':
				this.setState({
					// firstName: ReactDOM.findDOMNode(this.refs.firstName.refs.editTextBox).value,
					firstName: this.refs.firstName.refs.editTextBox.refs.textBox.value
				});
				break;
			case 'button-lastName':
				this.setState({
					lastName: this.refs.lastName.refs.editTextBox.refs.textBox.value
				});
				break;
			default:
				break;
		}
		// this.setState({
		// 	// firstName: ReactDOM.findDOMNode(this.refs.firstName.refs.editTextBox).value,
		// 	firstName: this.refs.firstName.refs.editTextBox.refs.textBox.value,
		// 	lastName: this.refs.lastName.refs.editTextBox.refs.textBox.value,
		// });
	},
	// update: function(key, value) {
	// 	var newState = {};
	// 	newState[key] = value;
	// 	this.setState(newState);
	// },
	reload: function() {
		ReactDOM.unmountComponentAtNode(document.getElementById('view'));
		ReactDOM.render(<View />, document.getElementById('view'));
	},
	render: function() {
		//update={this.update.bind(this, 'lastName')}
		return (
			<div>
				<Header2 message={'Hello ' + this.state.firstName + ' ' + this.state.lastName}></Header2>
				<EditTextBox id='firstName' label='First Name' ref='firstName' update={this.update} placeholder='First Name'></EditTextBox>
				<EditTextBox id='lastName' label='Last Name' ref='lastName' update={this.update} placeholder='Last Name'></EditTextBox>
				<Button onClick={this.reload} className='btn'>Reload</Button>
				<Counter min={0} />
			</div>
		);
	}
});

var Counter = React.createClass({
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
            min: Number.MIN_VALUE,
            max: Number.MAX_VALUE,
            isIncreasing: false,
			isVisible: false
        };
    },
	getInitialState: function() {
		return { counter: this.props.counter, min: this.props.min, max: this.props.max, isIncreasing: false, isVisible: this.props.isVisible };
	},
	// componentWillReceiveProps: function(nextProps) {
	// 	this._logPropsAndState('componentWillReceiveProps: View');
	// 	console.log('nextProps.counter: ', nextProps.counter);
	// 	this.setState({
	// 		isIncreasing: nextProps.counter > this.props.counter
	// 	});
	// },
	shouldComponentUpdate: function(nextProps, nextState) {
		this._logPropsAndState('shouldComponentUpdate: Counter');
		console.log('nextState.counter: ', nextState.counter, ' nextState.isIncreasing: ', nextState.isIncreasing);
		return (nextState.counter >= this.props.min && nextState.counter <= this.props.max);
	},
	componentDidUpdate: function(prevProps, prevState) {
		this._logPropsAndState('componentDidUpdate: Counter');
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
	},
	down: function() {
		if(this.state.counter > this.props.min) {
		 	this.setState({
		 		counter: this.state.counter-1,
		 		isIncreasing: false
			});
		}
	},
	render: function() {
		this._logPropsAndState("render: Counter");
		return (
			<div className={ this.state.isVisible ? 'show' : 'hidden' }>
				<Button onClick={this.up} className='btn'><GlyphIcon className='glyphicon glyphicon-thumbs-up' /> Like</Button>
				<Button onClick={this.down} className='btn'><GlyphIcon className='glyphicon glyphicon-thumbs-down' /> Unlike</Button>
				<br />
				Total: {this.state.counter}&nbsp;
				<GlyphIcon className={this.state.isIncreasing ? 'glyphicon glyphicon-circle-arrow-up' : 'glyphicon glyphicon-circle-arrow-down'} />
			</div>
		);
	}
});

// var Form = React.createClass({
// 	propTypes: { },
//     getDefaultProps: function() {
//         return { };
//     },
// 	getInitialState: function() {
// 		return { };
// 	},
//     submitHandler: function(e) {
//         e.preventDefault();
//         var fieldName = this.refs.fieldName.value;
//         alert(fieldName);
//     },
//     render: function() {
//         return(
//             <form onSubmit={this.submitHandler} method="POST" role="form">
//             	<div className="row">
//                 	<input type="text" className="form-control" ref="fieldName" defaultValue="Hello World!" />
//                 </div>
//                 <Button type="submit" className='btn'>Send</Button>
//             </form>
//         );
//     }
// });

ReactDOM.render(<View />, document.getElementById('view'));
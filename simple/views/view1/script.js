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
		className: React.PropTypes.string,
		type: React.PropTypes.string
	},
    getDefaultProps: function() {
        return {
        	isDisabled: false,
        	className: '',
        	type: 'button'
        };
    },
    getInitialState: function() {
		return { isDisabled: this.props.isDisabled, className: this.props.className, type: this.props.type };
	},
	onClick: function() {
		//onClick={this.props.onClick ? this.props.onClick : this.onClick}
		this.log(ReactDOM.findDOMNode(this).id + ' clicked');
	},
	render: function() {
		return (
			<button id={this.props.id} name={this.props.name} type={this.props.type} className={this.state.className} disabled={this.props.isDisabled} onClick={this.props.onClick}>
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
        value: React.PropTypes.string,
        isRequired: React.PropTypes.bool,
        isDisabled: React.PropTypes.bool,
        placeholder: React.PropTypes.string,
        className: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
        	isReadOnly: false,
            value: '',
            isRequired: false,
            isDisabled: false,
            placeholder: '',
            className: 'form-control'
        };
    },
    getInitialState: function() {
		return { isReadOnly: this.props.isReadOnly, value: this.props.value, isRequired: this.props.isRequired, isDisabled: this.props.isDisabled, className: this.props.className };
	},
	onChange: function(e) {
		this.setState({ value: e.target.value });
	},
	render: function() {
		return (
			this.state.isRequired ?
				<input id={this.props.id} name={this.props.name} ref='textBox' type='text' className={this.props.className} value={this.state.value} disabled={this.props.isDisabled} placeholder={this.props.placeholder} onChange={this.props.isReadOnly ? this.props.onChange : this.props.onChange ? this.props.onChange : this.onChange} required />
				:
				<input id={this.props.id} name={this.props.name} ref='textBox' type='text' className={this.props.className} value={this.state.value} disabled={this.props.isDisabled} placeholder={this.props.placeholder} onChange={this.props.isReadOnly ? this.props.onChange : this.props.onChange ? this.props.onChange : this.onChange} />
		);
	},
});

var EditTextBox = React.createClass({
	propTypes: {
		id: React.PropTypes.string,
		name: React.PropTypes.string,
		isReadOnly: React.PropTypes.bool,
        value: React.PropTypes.string,
		isEditing: React.PropTypes.bool,
		isRequired: React.PropTypes.bool,
		update: React.PropTypes.func,
        label: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        item: React.PropTypes.object,
		key: React.PropTypes.string.isRequired
    },
    getDefaultProps: function() {
        return {
        	isReadOnly: false,
            value: '',
        	isEditing: false,
        	isRequired: false,
        	update: null,
            label: '',
            placeholder: '',
            item: {},
        	key: '',
        	buttonPrefix: 'b'
        };
    },
	getInitialState: function() {
		return { isReadOnly: this.props.isReadOnly, value: this.props.value, isRequired: this.props.isRequired, update: this.props.update, label: this.props.label, placeholder: this.props.placeholder, item: this.props.item, key: this.props.key };
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
		this.setState({ value: e.target.value });
	},
	render: function() {
		return (
			<div className='form-group'>
				<label>{this.props.label}</label>
				<div className='input-group'>
					<TextBox id={this.props.id} name={this.props.name} ref='editTextBox' value={this.state.value} isDisabled={!this.state.isEditing} placeholder={this.props.placeholder} isReadOnly={this.props.isReadOnly} isRequired={this.props.isRequired} />
					{
						this.state.isEditing ?
							<Button name={this.props.buttonPrefix + this.props.name} onClick={this.update} className='btn btn-info btn-lg'><GlyphIcon className='glyphicon glyphicon-ok' />&nbsp;Update</Button>
							:
							<Button name={this.props.buttonPrefix + this.props.name} onClick={this.edit} className='btn btn-info btn-lg'><GlyphIcon className='glyphicon glyphicon-pencil' />&nbsp;Edit</Button>
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
		fields: React.PropTypes.object
    },
    getDefaultProps: function() {
        return {
        	fields: {
				firstName: {
					id: 1,
					name: 'firstName',
					label: 'First Name',
					ref: 'firstName',
					placeholder: 'First Name',
					value: ''
				},
				lastName: {
					id: 2,
					name: 'lastName',
					label: 'Last Name',
					ref: 'lastName',
					placeholder: 'Last Name',
					value: ''
				}
			}
        };
    },
	getInitialState: function() {
		return {
			fields: this.props.fields
		};
	},
	update: function(e) {
		var fieldName = e.target.name.substring(1);
		this.state.fields[fieldName].value = this.refs[fieldName].refs.editTextBox.refs.textBox.value;
		this.setState({ fields: this.state.fields });
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
		var self = this;
		var header = Object.keys(this.state.fields).map(function(key, index) {
			return self.state.fields[key].value;
		}).join(' ');
		var editFields = Object.keys(this.state.fields).map(function(key, index) {
			return (
				<EditTextBox item={self.state.fields[key]} key={key} name={self.state.fields[key].name} label={self.state.fields[key].label} ref={self.state.fields[key].ref} update={self.update} placeholder={self.state.fields[key].placeholder}></EditTextBox>
			);
		});
		return (
			<div>
				<Header2 message={'Hello ' + header}></Header2>
				<EditTextBox name='firstName' label='First Name' ref='firstName' update={this.update} placeholder='First Name'></EditTextBox>
				<EditTextBox name='lastName' label='Last Name' ref='lastName' update={this.update} placeholder='Last Name'></EditTextBox>
				<Button onClick={this.reload} className='btn'>Reload</Button>
				<Counter min={0} />
				<Form />
			</div>
		);
	}
});

var Counter = React.createClass({
	propTypes: {
		counter: React.PropTypes.number,
		min: React.PropTypes.number,
		max: React.PropTypes.number,
		step: React.PropTypes.number,
		isIncreasing: React.PropTypes.bool,
		isVisible: React.PropTypes.bool
    },
    getDefaultProps: function() {
        return {
            counter: 0,
            min: Number.MIN_VALUE,
            max: Number.MAX_VALUE,
            step: 1,
            isIncreasing: false,
			isVisible: false
        };
    },
	getInitialState: function() {
		return { counter: this.props.counter, min: this.props.min, max: this.props.max, step: this.props.step, isIncreasing: false, isVisible: this.props.isVisible };
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
		 		counter: this.state.counter + this.props.step,
		 		isIncreasing: true
		 	});
		}
	},
	down: function() {
		if(this.state.counter > this.props.min) {
		 	this.setState({
		 		counter: this.state.counter - this.props.step,
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

var Form = React.createClass({
	propTypes: {
		form: React.PropTypes.object,
		id: React.PropTypes.string,
		name: React.PropTypes.string,
		className: React.PropTypes.string,
		method: React.PropTypes.string
	},
    getDefaultProps: function() {
        return {
        	form: {
        		firstName: {
        			id: '1',
        			name: 'firstName',
        			ref: 'firstName',
        			placeholder: 'First Name',
        			value: ''
        		},
        		lastName: {
        			id: '1',
        			name: 'lastName',
        			ref: 'lastName',
        			placeholder: 'Last Name',
        			value: ''
        		}
        	},
        	className: 'form-horizontal',
        	method: 'POST'
        };
    },
	getInitialState: function() {
		return {
			form: this.props.form,
			className: this.props.className,
			method: this.props.method
		};
	},
	onChange: function(e) {
		console.log('onChange: key=', e.target.name, ', value=', e.target.value);
		this.state.form[e.target.name].value = e.target.value;
		// this.refs[this.state.form.firstName.ref].refs.textBox.value
		this.setState({form: this.state.form});
	},
    onSubmit: function(e) {
        e.preventDefault();
        console.log('onSubmit: firstName=' + this.state.form.firstName.value, ', lastName=', this.state.form.lastName.value);
    },
    render: function() {
    	var self = this;
        return(
            <form className={this.props.className} onSubmit={this.onSubmit} method={this.props.method} role='form' autoComplete='off'>
            	<div className="form-group">
                	<input type="text" className="form-control" ref="fieldName" defaultValue="Hello World!" />
                </div>
                <div className="form-group">
                	<TextBox id={this.state.form.firstName.id} name={this.state.form.firstName.name} ref={this.state.form.firstName.ref} value={this.state.form.firstName.value} placeholder={this.state.form.firstName.placeholder} className='form-control' onChange={this.onChange} />
                </div>
                <div className="form-group">
                	<TextBox id={this.state.form.lastName.id} name={this.state.form.lastName.name} ref={this.state.form.lastName.ref} value={this.state.form.lastName.value} placeholder={this.state.form.lastName.placeholder} className='form-control' onChange={this.onChange} />
                </div>
                <Button type="submit" className='btn btn-success'>Send</Button>
            </form>
        );
    }
});

ReactDOM.render(<View />, document.getElementById('view'));
"use strict";
/**
 * Module dependencies
 */
const React = require("react");
const ReactDOM = require("react-dom")
const Joi = require("joi");
const JoiValidationStrategy = require("joi-validation-strategy");
const ReactValidationMixin = require("react-validation-mixin");
const Utils = require('./libs/utils');

const Mixin1 = {
	log: function(message) {
		console.log(message);
	},
	componentWillMount: function() {
		this.log('componentWillMount: Mixin1');
	}
};

const Mixin2 = {
	componentWillMount: function() {
		console.log('componentWillMount: Mixin2');
	}
};

const Header2 = React.createClass({
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

const Button = React.createClass({
	mixins: [Mixin1, Mixin2],
	propTypes: {
		id: React.PropTypes.string,
		name: React.PropTypes.string,
		isDisabled: React.PropTypes.bool,
		className: React.PropTypes.string,
		type: React.PropTypes.string,
		item: React.PropTypes.object,
		key: React.PropTypes.string
	},
    getDefaultProps: function() {
        return {
        	item: {},
        	isDisabled: false,
        	className: '',
        	type: 'button'
        };
    },
    getInitialState: function() {
		return { item: this.props.item, isDisabled: this.props.isDisabled, className: this.props.className, type: this.props.type };
	},
	onClick: function() {
		//onClick={this.props.onClick ? this.props.onClick : this.onClick}
		this.log(ReactDOM.findDOMNode(this).id + ' clicked');
	},
	render: function() {
		return (
			<button id={this.props.id} name={this.props.name} type={this.props.type} className={this.state.className} disabled={this.props.isDisabled} onClick={this.props.onClick} {...this.props}>
				{this.props.children}
			</button>
		);
	}
});

const GlyphIcon = React.createClass({
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

const TextBox = React.createClass({
	propTypes: {
		id: React.PropTypes.string,
		name: React.PropTypes.string,
		isReadOnly: React.PropTypes.bool,
        value: React.PropTypes.string,
        isDisabled: React.PropTypes.bool,
        placeholder: React.PropTypes.string,
        className: React.PropTypes.string,
        type: React.PropTypes.string,
        label: React.PropTypes.string,
        item: React.PropTypes.object,
		key: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
        	isReadOnly: false,
            value: '',
            isDisabled: false,
            placeholder: '',
            className: 'form-control',
            type: 'text',
            label: '',
            item: {},
        	key: ''
        };
    },
    getInitialState: function() {
		return { isReadOnly: this.props.isReadOnly, value: this.props.value, isDisabled: this.props.isDisabled, className: this.props.className, type: this.props.type, label: this.props.label, item: this.props.item, key: this.props.key };
	},
	onChange: function(e) {
		this.setState({ value: e.target.value });
	},
	renderHelpText: function(message) {
        return (
            <div className='help-block'>
                {message}
            </div>
        );
    },
	render: function() {
		var error = this.props.getValidationMessages(this.props.name);
		var controlClass = 'row no-gutters';

        if (error.length > 0) {
            controlClass += ' has-error';
        }

		return (
			<div className='input-group'>
				<div className={controlClass}>
					<input id={this.props.id} name={this.props.name} ref={this.props.ref} type={this.props.type} className={this.state.className} value={this.state.value} disabled={this.props.isDisabled} placeholder={this.props.placeholder} onChange={this.props.onChange ? this.props.onChange : this.onChange} {...this.props} />
					{this.props.decorator}
				</div>
				{this.renderHelpText(error)}
			</div>
		);
	},
});

const EditTextBox = React.createClass({
	propTypes: {
		id: React.PropTypes.string,
		name: React.PropTypes.string,
		ref: React.PropTypes.string,
		isReadOnly: React.PropTypes.bool,
        value: React.PropTypes.string,
        textBoxClassName: React.PropTypes.string,
        buttonClassName: React.PropTypes.string,
		isEditing: React.PropTypes.bool,
		isRequired: React.PropTypes.bool,
		update: React.PropTypes.func,
        label: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        item: React.PropTypes.object,
		key: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
        	name: '',
        	ref: '',
        	isReadOnly: false,
            value: '',
        	isEditing: false,
        	isRequired: false,
        	update: null,
            label: '',
            placeholder: '',
        	textBoxClassName: 'form-control',
        	buttonClassName: 'btn btn-info btn-lg',
        	buttonPrefix: 'b',
        	item: {},
        	key: ''
        };
    },
	getInitialState: function() {
		return { name: this.props.name, ref: this.props.ref, isReadOnly: this.props.isReadOnly, value: this.props.value, isRequired: this.props.isRequired, update: this.props.update, label: this.props.label, placeholder: this.props.placeholder, textBoxClassName: this.props.textBoxClassName, buttonClassName: this.props.buttonClassName, item: this.props.item, key: this.props.key };
	},
	update: function(e) {
		this.setState({ isEditing: false });
		var target = e.target.name.substring(1);
		this.refs['t' + target].setState({ isDisabled: true });
		this.props.update(e);

		// var self = this;
		// return function (event) {
		// 	var state = {};
		// 	state[e] = event.target.value;
		// 	self.setState(state);
		// };
	},
	edit: function(e) {
		this.setState({ isEditing: true });
		var target = e.target.name.substring(1);
		this.refs['t' + target].setState({ isDisabled: false });
		// var self = this;
		// return function (event) {
		// 	var state = {};
		// 	state[e] = event.target.value;
		// 	self.setState(state);
		// };
	},
	onChange: function(e) {
		this.setState({ value: e.target.value });
		this.refs['t' + e.target.name].onChange(e);
		// var self = this;
		// return function (event) {
		// 	var state = {};
		// 	state[e] = event.target.value;
		// 	self.setState(state);
		// };
	},
	render: function() {
		var formClass = "form-group";
		var button = this.state.isEditing ? <Button ref={this.props.buttonPrefix + this.props.ref} name={this.props.buttonPrefix + this.props.name} onClick={this.update} className={this.state.buttonClassName}><GlyphIcon className='glyphicon glyphicon-ok' />&nbsp;Update</Button> : <Button ref={'b' + this.props.ref} name={this.props.buttonPrefix + this.props.name} onClick={this.edit} className={this.state.buttonClassName}><GlyphIcon className='glyphicon glyphicon-pencil' />&nbsp;Edit</Button>;
		return (
			<div className={formClass}>
				<label className="control-label" htmlFor={this.props.name}>{this.props.label}</label>
				<div className='input-group'>
					<TextBox id={this.props.id} name={this.props.name} ref={'t' + this.props.item.ref} value={this.state.value} isDisabled={!this.state.isEditing} placeholder={this.props.placeholder} isReadOnly={this.props.isReadOnly} isRequired={this.props.isRequired} className={this.state.textBoxClassName} onChange={this.onChange} onBlur={this.props.onBlur} getValidationMessages={this.props.getValidationMessages} decorator={button} />
				</div>
			</div>
		);
	}
});

const TextContent = React.createClass({
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

const View = React.createClass({
	propTypes: {
		fields: React.PropTypes.object,
		getValidationMessages: React.PropTypes.func
    },
    getDefaultProps: function() {
        return {
        	fields: {
				firstName: {
					id: '1',
					name: 'firstName',
					label: 'First Name',
					ref: 'firstName',
					placeholder: 'First Name',
					// textBoxClassName: '',
					// buttonClassName: '',
					value: ''
				},
				lastName: {
					id: '2',
					name: 'lastName',
					label: 'Last Name',
					ref: 'lastName',
					placeholder: 'Last Name',
					// textBoxClassName: '',
					// buttonClassName: '',
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
		this.state.fields[fieldName].value = this.refs[fieldName].refs['t' + fieldName].props.value;
		this.setState({ fields: this.state.fields });
		// var self = this;
		// return function (event) {
		// 	var state = {};
		// 	state[e] = event.target.value;
		// 	self.setState(state);
		// };
	},
	// update: function(key, value) {
	// 	var newState = {};
	// 	newState[key] = value;
	// 	this.setState(newState);
	// },
	reload: function() {
		ReactDOM.unmountComponentAtNode(document.getElementById('view'));
		ReactDOM.render(<ValidationView />, document.getElementById('view'));
	},
	componentWillUnmount: function() {
		console.log('componentWillUnmount: View');
	},
	render: function() {
		//update={this.update.bind(this, 'lastName')}
		var self = this;
		var header = Object.keys(this.state.fields).map(function(key, index) {
			return self.state.fields[key].value;
		}).join(' ');
		var editFields = Object.keys(this.state.fields).map(function(key, index) {
			return (
				<EditTextBox item={self.state.fields[key]} key={key} id={self.state.fields[key].id} name={self.state.fields[key].name} label={self.state.fields[key].label} ref={self.state.fields[key].ref} update={self.update} placeholder={self.state.fields[key].placeholder} textBoxClassName={self.state.fields[key].textBoxClassName} buttonClassName={self.state.fields[key].buttonClassName} getValidationMessages={self.props.getValidationMessages} onChange={self.props.onChange} />
			);
		});
		return (
			<div>
				<Header2 message={'Hello ' + header}></Header2>
				{editFields}
				<Counter min={0} />
				<Button onClick={this.reload} className='btn btn-primary'>Reload</Button>
			</div>
		);
	}
});

const Counter = React.createClass({
	propTypes: {
		counter: React.PropTypes.number,
		min: React.PropTypes.number,
		max: React.PropTypes.number,
		step: React.PropTypes.number,
		isIncreasing: React.PropTypes.bool,
		isVisible: React.PropTypes.bool,
		item: React.PropTypes.object,
		key: React.PropTypes.string
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

const Form = React.createClass({
	propTypes: {
		fields: React.PropTypes.object,
		id: React.PropTypes.string,
		name: React.PropTypes.string,
		className: React.PropTypes.string,
		method: React.PropTypes.string
	},
    getDefaultProps: function() {
        return {
        	fields: {},
        	className: 'form-horizontal',
        	method: 'POST'
        };
    },
	getInitialState: function() {
		return {
			fields: {
        		firstName2: {
        			id: '1',
        			name: 'firstName2',
        			label: 'First Name2',
        			ref: 'firstName2',
        			placeholder: 'First2 Name',
        			//className: 'form-control',
        			value: 'First2',
        			subView: false
        		},
        		lastName2: {
        			id: '2',
        			name: 'lastName2',
        			label: 'Last Name2',
        			ref: 'lastName2',
        			placeholder: 'Last2 Name',
        			//className: 'form-control',
        			value: 'Last2',
        			subView: false
        		},
				firstName: {
					id: '3',
					name: 'firstName',
					label: 'First Name',
					ref: 'firstName',
					placeholder: 'First Name',
					// textBoxClassName: '',
					// buttonClassName: '',
					value: '',
					subView: true
				},
				lastName: {
					id: '4',
					name: 'lastName',
					label: 'Last Name',
					ref: 'lastName',
					placeholder: 'Last Name',
					// textBoxClassName: '',
					// buttonClassName: '',
					value: '',
					subView: true
				}
        	},
			className: this.props.className,
			method: this.props.method
		};
	},
	validatorTypes: function() {
		return {
			username: Joi.string().alphanum().min(3).max(30).required(),
			name: Joi.string().allow(null),
			email: Joi.string().email(),
			firstName: Joi.string().required().label(this.refs.firstName.props.item.label),
			lastName: Joi.string().required().label(this.refs.lastName.props.item.label),
			firstName2: Joi.string().required().label("First 2"),
			lastName2: Joi.string().required().regex(/[a-zA-Z0-9]{3,30}/).label("Last 2")
		}
	},
	getValidatorData: function() {
		return {
			firstName: this.state.fields.firstName.value, 
			lastName: this.state.fields.lastName.value,
			firstName2: this.state.fields.firstName2.value, 
			lastName2: this.state.fields.lastName2.value
		}
	},
	onChange: function(e) {
		//var field = e.target.name.substring(1);
		console.log('onChange: key =', e.target.name, ', value =', e.target.value);
		this.state.fields[e.target.name].value = e.target.value;
		this.setState({ fields: this.state.fields });

		// this.refs[e.target.name].onChange(e);
		// console.log(ReactDOM.findDOMNode(e.target));
		// ReactDOM.findDOMNode(e.target).value = e.target.value;
		//ReactDOM.findDOMNode(e.target).onChange(e);
		// this.refs.view.refs[e.target.name].onChange(e);
		// this.refs.view.refs[e.target.name].refs['editTextBox'].onChange(e);

		const validationState = {};
   	 	validationState[e.target.name] = e.target.value;
    	this.setState(this.state.fields);

    	//this.onChange(self.state.fields[key].name)
		// var self = this;
		// return function (event) {
		// 	var state = {};
		// 	state[e] = event.target.value;
		// 	self.setState(state);
		// };
	},
	onSubmit: function(e) {
		e.preventDefault();
		console.log('onSubmit: firstName=' + this.refs.firstName.props.value, ', lastName=', this.refs.lastName.props.value);
		console.log('onSubmit: firstName2=' + this.refs.view.refs.firstName2.props.value, ', lastName2=', this.refs.view.refs.lastName2.props.value);
	    var onValidate = function(err) {
	        if (err) {
	            if (err.userName) {
	                alert(err.userName);
	            }
	            if (err.password) {
	                alert(err.password);
	            }
	        }
	        var passwordContainsUserName = this.refs.firstName.props.value.indexOf(this.refs.lastName.props.value) > -1;
	        // if (this.refs.lastName.props.value && passwordContainsUserName) {
	        //     alert("Password cannot contain the user name.");
	        //     return;
	        // }
	        if (!err) {
	            alert("Account created!");
	        }
	    };
	    this.props.validate(onValidate.bind(this));
	},
	render: function() {
		var self = this;
		var editFields = Utils.filter(this.state.fields, field => !field.subView);
		var subFields = Utils.filter(this.state.fields, field => field.subView);
		var editFields = Object.keys(editFields).map(function(key, index) {
			return (
				<div className='form-group' key={key}>
					<label className="control-label" htmlFor={self.state.fields[key].name}>{self.state.fields[key].label}</label>
					<TextBox item={self.state.fields[key]} key={key} id={self.state.fields[key].id} name={self.state.fields[key].name} ref={self.state.fields[key].ref} value={self.state.fields[key].value} placeholder={self.state.fields[key].placeholder} className={self.state.fields[key].className} onChange={self.onChange} onBlur={self.props.handleValidation(self.state.fields[key].name)} getValidationMessages={self.props.getValidationMessages} />
				</div>
			);
		});
		return (
			<form className={this.props.className} onSubmit={this.onSubmit} method={this.props.method} role='form' autoComplete='off'>
				<div className='form-group'>
					<input type='text' className='form-control' ref='fieldName' defaultValue='Hello World!' />
				</div>
				{editFields}
				<View fields={subFields} ref='view' onChange={this.onChange} getValidationMessages={this.props.getValidationMessages} />
				<Button type='submit' className='btn btn-success'>Send</Button>
			</form>
		);
	}
});

const ValidationView = ReactValidationMixin(JoiValidationStrategy)(Form);
ReactDOM.render(<ValidationView />, document.getElementById('view'));

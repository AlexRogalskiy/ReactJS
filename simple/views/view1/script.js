var Header2 = React.createClass({
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
	propTypes: {
		id: React.PropTypes.string,
		name: React.PropTypes.string,
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
			<button id={this.props.id} name={this.props.name} type='button' className={'btn ' + this.props.className} onClick={this.props.onClick}>
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

var EditTextBox = React.createClass({
	propTypes: {
		isEditing: React.PropTypes.bool,
		isRequired: React.PropTypes.bool,
		update: React.PropTypes.func,
        label: React.PropTypes.string.isRequired,
        text: React.PropTypes.string,
        placeholder: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
        	isEditing: false,
        	isRequired: false,
        	update: null,
            label: '',
            text: '',
            placeholder: ''
        };
    },
	getInitialState: function() {
		return { isEditing: false, text: this.props.label };
	},
	update: function(e) {
		this.setState({ 
			isEditing: false,
			text: this.refs.messageTextBox.value
		});
		this.props.update();
	},
	edit: function(e) {
		this.setState({ isEditing: true });
	},
	render: function() {
		return (
			<div className='form-group'>
				<label>{this.props.label}</label>
				<div className='input-group'>
					{
						this.props.isRequired ?
							<input type='text' className='form-control' ref='messageTextBox' disabled={!this.state.isEditing} placeholder={this.props.placeholder} required />
							:
							<input type='text' className='form-control' ref='messageTextBox' disabled={!this.state.isEditing} placeholder={this.props.placeholder} />
					}
					{
						this.state.isEditing ?
							<Button onClick={this.update} className='btn-info btn-lg'><GlyphIcon icon='ok' />&nbsp;Update</Button>
							:
							<Button onClick={this.edit} className='btn-info btn-lg'><GlyphIcon icon='pencil' />&nbsp;Edit</Button>
					}
				</div>
			</div>
		);
	}
});

var TextContent = React.createClass({
	propTypes: {
        content: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
        	content: ''
        };
    },
	getInitialState: function() {
		return { content: '' };
	},
	render: function() {
		return (
			<span>{this.props.content}</span>
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
	update: function() {
		this.setState({
			// firstName: ReactDOM.findDOMNode(this.refs.firstName.refs.messageTextBox).value,
			firstName: this.refs.firstName.refs.messageTextBox.value,
			lastName: this.refs.lastName.refs.messageTextBox.value
		});
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
				<EditTextBox label='First Name' ref='firstName' update={this.update} placeholder='First Name'></EditTextBox>
				<EditTextBox label='Last Name' ref='lastName' update={this.update} placeholder='Last Name'></EditTextBox>
				<Button onClick={this.reload}>Reload</Button>
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
//                 <Button type="submit">Send</Button>
//             </form>
//         );
//     }
// });

ReactDOM.render(<View />, document.getElementById('view'));
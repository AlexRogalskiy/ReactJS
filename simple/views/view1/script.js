var HelloMessage = React.createClass({
	propTypes: {
        message: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
            message: 'default'
        };
    },
    getInitialState: function() {
		return { message: '' };
	},
	render: function() {
		return <h2>{this.props.message}</h2>;
	}
});

var Button = React.createClass({
	render: function() {
		return (
			<button onClick={this.props.onClick}>
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
	render: function() {
		return (
			<span className={'glyphicon glyphicon-' + this.props.icon} aria-hidden='true'></span>
		);
	}
});

var TextBox = React.createClass({
	propTypes: {
        update: React.PropTypes.func,
        label: React.PropTypes.string.isRequired,
    },
    getDefaultProps: function() {
        return {
            update: null,
            label: 'default'
        };
    },
	getInitialState: function() {
		return { update: null, label: '' };
	},
	update: function(e) {
		this.props.update(this.refs.messageTextBox.value);
		this.setState({ isEditing: false });
	},
	edit: function(e) {
		this.setState({ isEditing: true });
	},
	render: function() {
		return (
			<div>
				{this.props.label}<br />
				<input type='text' ref='messageTextBox' disabled={!this.state.isEditing} />
				{
					this.state.isEditing ?
						<button onClick={this.update}><GlyphIcon icon='ok' />&nbsp;Update</button>
						:
						<button onClick={this.edit}><GlyphIcon icon='pencil' />&nbsp;Edit</button>
				}
			</div>
		);
	}
});

var HelloReact = React.createClass({
	getInitialState: function() {
		return { firstName: '', lastName: '' };
	},
	update: function(key, value) {
		var newState = {};
		newState[key] = value;
		this.setState(newState);
	},
	render: function() {
		return (
			<div>
				<HelloMessage message={'Hello ' + this.state.firstName + ' ' + this.state.lastName}></HelloMessage>
				<TextBox label='First Name' update={this.update.bind(this, 'firstName')}></TextBox>
				<TextBox label='Last Name' update={this.update.bind(this, 'lastName')}></TextBox>
			</div>
		);
	}
});

ReactDOM.render(<HelloReact />, document.getElementById('view'));
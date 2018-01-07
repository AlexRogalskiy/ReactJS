var TextBox = React.createClass({
	propTypes: {
		isReadOnly: React.PropTypes.bool,
        message: React.PropTypes.string
    },
    getDefaultProps: function() {
        return {
        	isReadOnly: false,
            message: ''
        };
    },
    getInitialState: function() {
		return { isReadOnly: false, message: '' };
	},
	onChange: function(e) {
		this.setState({ message: e.target.value });
	},
	render: function() {
		return (
			<input id='id' type='text' className='form-control' value={this.state.message} onChange={this.props.isReadOnly ? this.props.onChange : this.onChange} />
		);
	},
});

ReactDOM.render(<TextBox isReadOnly={true} />, document.getElementById('view'));
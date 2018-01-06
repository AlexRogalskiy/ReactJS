var Row = React.createClass({
	propTypes: {
		user: React.PropTypes.object,
		key: React.PropTypes.string.isRequired
	},
    getDefaultProps: function() {
        return {
        	user: null,
        	key: ''
        };
    },
    getInitialState: function() {
		return { user: null, key: '' };
	},
	render: function() {
		return (
			<tr>
				<td>{this.props.user.userName}</td>
				<td><a href={'mailto:' + this.props.user.email}>{this.props.user.email}</a></td>
			</tr>
		);
	}
});

var Table = React.createClass({
	propTypes: {
		users: React.PropTypes.array
	},
    getDefaultProps: function() {
        return {
        	users: []
        };
    },
	getInitialState: function() {
		return {
			users: [
				{
					id: 1,
					userName: 'userName1',
					email: 'email1'
				},
				{
					id: 2,
					userName: 'userName2',
					email: 'email2'
				}
			]
		};
	},
	render: function() {
		var users = this.state.users.map(function(user) {
			return (
				<Row user={user} key={user.id} />
			);
		});
		return (
			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					{users}
				</tbody>
			</table>
		);
	}
});

ReactDOM.render(<Table />, document.getElementById('view'));
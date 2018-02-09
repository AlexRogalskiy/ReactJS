"use strict";
/**
 * Module dependencies
 */
import React from 'react';
// import update     from 'react-addons-update';
// import ClassNames from 'classnames';
import Utils from 'appRoot/js/mixins/logger';
import BasicHeader from '../elements/basicHeader';
import BasicButtonControl from '../controls/basicButtonControl';
import BasicEditTextControl from '../controls/basicEditTextControl';

let Types = React.PropTypes;

export default class BasicView extends React.Component {
	displayName: 'BasicView'
	static propTypes: {
		fields: Types.array,
		item: Types.object,
        key: Types.string
    }
    static defaultProps = {
        fields: [
			{
				id: '1',
				name: 'firstName',
				label: 'First Name',
				ref: 'firstName',
				placeholder: 'First Name',
				// textBoxClassName: '',
				// buttonClassName: '',
				value: ''
			},
			{
				id: '2',
				name: 'lastName',
				label: 'Last Name',
				ref: 'lastName',
				placeholder: 'Last Name',
				// textBoxClassName: '',
				// buttonClassName: '',
				value: ''
			}
		],
		item: {},
        key: ''
    }
    constructor(props) {
        super(props);
        this.update = this.update.bind(this);
        this.state = {
            fields: this.props.fields,
			item: this.props.item,
			key: this.props.key
        };
    }
	update(field) {
		// var fieldName = e.target.name.substring(1);
		// this.state.fields[fieldName].value = this.refs[fieldName].refs['t' + fieldName].props.value;
		// this.setState({ fields: this.state.fields });
		const self = this;
		return function (event) {
			var state = {};
			state[field] = event.target.value;
			self.setState(state);
		};
	}
	reload() {
		// ReactDOM.unmountComponentAtNode(document.getElementById('view'));
		// ReactDOM.render(<ValidationView />, document.getElementById('view'));
	}
	render() {
		const self = this;
		console.log(this.props);
		const header = this.props.fields.map(function(item) {
			return item.value;
		}).join(' ');
		const editFields = this.props.fields.map(function(item) {
			return (
				<BasicEditTextControl item={item} key={item.id} name={item.name} label={item.label} ref={item.ref} update={self.update.bind(self, item.name)} placeholder={item.placeholder} getValidationMessages={self.props.getValidationMessages} onChange={self.props.onChange} />
			);
		});
		return (
			<div>
				<BasicHeader message={'Hello ' + header}></BasicHeader>
					{editFields}
				<BasicButtonControl onClick={this.reload} className='btn btn-primary'>Reload</BasicButtonControl>
			</div>
		);
	}
}
"use strict";
/**
 * Module dependencies
 */
import { React } from 'react';
import { CSSTransitionGroup } from 'react-transition-group/CSSTransitionGroup';
// import update     from 'react-addons-update';
import { ClassNames } from 'classnames/bind';
// import Logger from 'appRoot/js/mixins/logger';
// import { BasicListStyle } from 'appRoot/css/components/controls/basicListControl';

let Types = React.PropTypes;
// let Styles = ClassNames.bind(BasicListStyle);

export default class BasicListControl extends React.Component{
    displayName: 'BasicListControl'
	static propTypes: {
        dataClass: Types.object,
        transition: Types.object,
        items: Types.array,
		item: Types.object
	}
    static defaultProps = {
        dataClass: {},
        transition: {
            component: "ul",
            name: "listGroup",
            enterTimeout: { 300 },
            leaveTimeout: { 300 }
        },
        items: [],
        item: {}
    }
	constructor(props) {
        super(props);
        // this.onClick = this.onClick.bind(this);
        this.state = {
            dataClass: props.dataClass,
            transition: props.transition,
            items: props.items,
            item: props.item
        };
    }
    // componentDidMount() {
    //     this.setState({
    //         itemHeight: ReactDOM.findDOMNode(this).querySelector('li').clientHeight
    //     });
    // }
    render() {
        const { dataClass, transition, items, item, ...rest } = this.props;
        const { ...restClass } = dataClass;
        return (
            <CSSTransitionGroup
                component={transition.component} 
                transitionName={transition.name}
                transitionEnterTimeout={transition.enterTimeout}
                transitionLeaveTimeout={transition.leaveTimeout}
                {...rest}>
                {items}
            </CSSTransitionGroup>
        );
    }
}
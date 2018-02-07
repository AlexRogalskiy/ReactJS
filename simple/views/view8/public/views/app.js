import React from 'react';
import { Provider } from 'mobx-react';
import { useStrict } from 'mobx';

/* components */
import Menu from '../components/menu';
import AppHeader from 'appRoot/js/views/appHeader';

/* stores */
import leftMenuStore from '../stores/menu-store';
import userStore from '../stores/user-store';

/* styles */
import './global.css';
import styles from './app.css';

/* use mobx strict mode */
useStrict(true);

const stores = { leftMenuStore, userStore };

const AppLayout = props => (
  <Provider { ...stores }>
    <div className={styles['app-container']}>
      <AppHeader />
      <Menu />
      <div className={styles['page-container']}>
        {props.children}
      </div>
    </div>
  </Provider>
);

// class AppLayout extends React.Component {
// 	constructor(props) {
//     	super(props);
//     	this.state = { };
//   	}
//   	// componentDidUpdate(nextProps, nextState) {
// 	  //   //let newShoppingItems = this.calculateShoppingItems();
// 	  //   //this.setState({ listOfShoppingItems: newShoppingItems });
//   	// }
//   	// shouldComponentUpdate(nextProps, nextState) {
//    //      //this.setState({ src: this.props.initialImage });
//    //      //return true;
//    //  }
//    //{this.props.children}
// 	render() {
// 		return (
// 			<div className='app-container'>
// 				<AppHeader />
// 				<main>
// 					{React.cloneElement(this.props.children, this.props)}
// 				</main>
// 			</div>
// 		);
// 	}
// };

export default AppLayout;
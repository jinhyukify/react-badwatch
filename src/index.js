import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { App, Home, Login, Register, User, Youtube } from './containers';
import { YoutubeBox, YoutubeShowBox } from './components';
//Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById('root');
ReactDOM.render(
		<Provider store={store}>
			<Router history={browserHistory}>
				<Route path="/" component={App}>
					<IndexRoute component={Home}/>
					<Route path="home" component={Home}/>
					<Route path="user/:userName" component={User} />
					<Route path="login" component={Login}/>
					<Route path="youtube" component={Youtube}>
						<IndexRoute component={YoutubeBox}/>
						<Route path="show/:id" component={YoutubeShowBox}/>
					</Route>
				</Route>
			</Router>
		</Provider>, rootElement
		);

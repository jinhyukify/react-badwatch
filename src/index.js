import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { App, Home, Login, Register, User, Youtube, Chat, UserByName, Board } from './containers';
import { YoutubeBox, YoutubeShowBox, YoutubeEditBox, ChatRoom, RoomList, ArticleWrite, ArticleModify, BoardBox, BoardShowBox } from './components';
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
					<Route path="userByName/:userName" component={UserByName} />
					<Route path="login" component={Login}/>
					<Route path="chat" component={Chat}>
						<IndexRoute component={RoomList}/>
						<Route path=":room" component={ChatRoom} />
					</Route>
					<Route path="youtube" component={Youtube}>
						<IndexRoute component={YoutubeBox}/>
						<Route path="show/:id" component={YoutubeShowBox}/>
						<Route path="edit/:id" component={YoutubeEditBox} />
					</Route>
					<Route path="board" component={Board}>
						<Route path=":boardType/page/:pageId" component={BoardBox}/>
						<Route path=":boardType/page/:pageId/article/:articleId" component={BoardShowBox}/>
						<Route path="write" component={ArticleWrite}/>
						<Route path="modify/:boardType/:articleId" component={ArticleModify}/>
					</Route>
				</Route>
			</Router>
		</Provider>, rootElement
		);

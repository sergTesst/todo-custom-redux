// import { createStore } from "redux";

import rootReducer from "../features/reducer";
import {createMiniStore} from './miniReduxStoreExample';

let preloadedState;
const persistedTodosJSON = localStorage.getItem('todos');
if(persistedTodosJSON){
	preloadedState = {
		todos: JSON.parse(persistedTodosJSON)
	}
}

// const store = createStore(rootReducer, preloadedState);

//for testing 
const store = createMiniStore(rootReducer, preloadedState); // passed all tests



export default store;
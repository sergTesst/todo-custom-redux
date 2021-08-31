import todosReducer from "./todos/todoSlice";
import filtersReducer from './filters/filtersSlice';
import { combineReducers } from "redux";

//reducer rules
//	to calculate the new state based on the state and action arguments
//	not to modify existing state. to make immutable updates, by copying the existing
//		state and making changes to the copied values.
// not to do asynchronous logic or other 'side effects'

/* ✅ This is safe, because we made a copy
	return {  
		...state,  
		value: 123
	}
*/

/*
	A critical rule of immutable updates is that you must make a copy of every 
	level of nesting that needs to be update.
*/
/*
	writing immutable updates by hand this way looks hard to remember
*/


// state = {
//  todos:todosReducer,
//  filters:filtersReducer
// }
 
//reducer composition

const rootReducer = combineReducers( {

  // todos field handled by todosReducer
  todos:todosReducer,
  filters: filtersReducer

})

export default rootReducer;

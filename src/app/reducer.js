import todosReducer from "../features/todos/todoSlice";
import filtersReducer from '../features/filters/filtersSlice';


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
//  todos:{...},
//  filters:{...}
// }
 
export default function rootReducer(state = {}, action) {
  //always return a new object for the root state
  return {
    todos:todosReducer(state.todos, action),
    filters: filtersReducer(state.filters, action)
  }
}

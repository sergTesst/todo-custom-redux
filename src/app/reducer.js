import { actionTypes } from '../features/appActionTypes'

const initialState = {
  todos: [
    { id: 0, text: 'Learn React', completed: true },
    { id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
    { id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
  ],
  filters: {
    status: 'All',
    colors: [],
  },
}

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

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.todosAdded: {
      // returns new state object
      return {
        //that has all the existing state data
        ...state,
        //but has a new array for the `todos` field
        todos: [
          //with all of the old todos
          ...state.todos,
          //and the new todo object
          {
            id: nextTodoId(state.todos),
            text: action.payload,
            completed: false,
          },
        ],
      }
    }
    case actionTypes.todosToggled: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          //if this isn't the todo item we're looking for, leave it alone
          if (todo.id !== action.payload) {
            return todo
          }
          //We've found the todo that has to change. Return a copy:
          return {
            ...todo,
            completed: !todo.completed,
          }
        }),
      }
    }
    case actionTypes.statusFilterChanged: {
      return {
        ...state,
        filters: {
          ...state.filters,
          status: action.payload,
        },
      }
    }
    default:
      return state
  }
}

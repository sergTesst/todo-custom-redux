
import { actionTypes } from "./todoActionTypes";



function nextTodoId(todos) {
  const maxId = todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1)
  return maxId + 1
}

const initialState = [
	{ id: 0, text: 'Learn React', completed: true },
	{ id: 1, text: 'Learn Redux', completed: false, color: 'purple' },
	{ id: 2, text: 'Build something fun!', completed: false, color: 'blue' },
]

/*	this file only has to update the todos-related state - it's not nested any more!
		this is called reducer composition
*/


export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.todosAdded: {
      return [
        ...state,
				{
					id: nextTodoId(state.todos),
					text: action.payload,
					completed: false,
				}
			]
    }
    case actionTypes.todosAdded: {
      
			return state.map((todo) => {
				if (todo.id !== action.payload) {
					return todo
				}
				
				return {
					...todo,
					completed: !todo.completed,
				}
			})
    }
    default:
      return state
  }
}




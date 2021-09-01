import { actionTypes } from '../appActionTypes'

function nextTodoId(todos) {
  const maxId = Array.from(todos).reduce(
    (maxId, todo) => Math.max(todo.id, maxId),
    -1
  );

  return maxId + 1 + Number((new Date()).getTime());

}

/**
 * interface Todo {
 * 	id: number;
 * 	text: string;
 * 	completed: boolean;
 * 	color: string;
 * }
 */


export const initialState = [];

/*	this file only has to update the todos-related state 
			- it's not nested any more!
			
		this is called reducer composition
*/

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    //action.payload :string //text
    case actionTypes.todosAdded: {

      const nextIdOfTodo = nextTodoId(state);
      const nextTodoText = action.payload;

      return [
        ...state,
        {
          id: nextIdOfTodo,
          text: nextTodoText,
          completed: false,
        },

      ]
    }
    case actionTypes.todosFetchAdded: {

      const newTodo = action.payload;

      return [
        ...state,
        {
          ...newTodo
        }
      ]
    }
    
    // action.payload: number //id
    case actionTypes.todosToggled: {
      const targetTodoId = action.payload

      return state.map((todo) => {
        if (todo.id !== targetTodoId) {
          return todo
        }

        return {
          ...todo,
          completed: !todo.completed,
        }
      })
    }

    /*action.payload = {
			color:string,
			todoId:number
		}
		*/
    case actionTypes.todosColorSelected: {
      const { color, todoId } = action.payload

      return state.map((todo) => {
        if (todo.id !== todoId) {
          return todo
        }

        //return todo with todoId with added || modified color prop
        return {
          ...todo,
          color,
        }
      })
    }

    /**
     * action.payload = {
     * 	todoId:number
     * }
     */
    case actionTypes.todoDeleted: {
      const { todoId } = action.payload
      return state.filter((todo) => todo.id !== todoId)
    }
    case actionTypes.allTodosCompleted: {
      return state.map((todo) => {
        return { ...todo, completed: true }
      })
    }
    case actionTypes.todosCompletedCleared: {
      //return all todo[] with completed false
      return state.filter((todo) => !todo.completed)
    }
    case actionTypes.todosLoaded:{
      const {todos} = action.payload;
      return [
        ...state,
        ...todos
      ]
    }

    default:
      return state
  }
}

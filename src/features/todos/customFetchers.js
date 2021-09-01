import { client } from '../../api/client'
import { actionTypes } from '../appActionTypes'

//Write a function that has `dispatch ` nad `getState` as arguments
// export const fetchTodosData = (dispatch, getState)=>{

// 	client.get('/fakeApi/todos').then(response=>{
// 		dispatch({type:actionTypes.todosLoaded, payload: response});

// 		const allTodos = getState().todos;
// 		console.log('allTodos.length after dispatch', Array.from(allTodos).length);

// 	})
// }

export async function fetchTodosData(dispatch, getState) {
  const response = await client.get('/fakeApi/todos')
  const stateBefore = getState()
  console.log(
    'todos before dispatch stateBefore.todos.length',
    stateBefore.todos.length
  )

  dispatch({ type: actionTypes.todosLoaded, payload: response })

  const allTodos = getState().todos
  console.log('allTodos.length after dispatch', Array.from(allTodos).length)
}

//write a synchronous outer function that receives the 'text' parameter:
export function saveNewTodo(text){
	return async function saveNewTodoThunk(dispatch, getState){
		const newTodo = {text};
		const response = await client.post('/fakeApi/todos',{todo:newTodo});
		dispatch({type: actionTypes.todosFetchAdded, payload:response.todo});
	}
}

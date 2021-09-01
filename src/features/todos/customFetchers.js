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




/*export function fetchTodos() {
  return async function fetchTodosThunk(dispatch, getState) {
    const stateBefore = getState()
    console.log(
      'todos before dispatch stateBefore.todos.length',
      stateBefore.todos.length
    )

    const response = await client.get('/fakeApi/todos')

    dispatch(todosLoaded(response))

    const allTodos = getState().todos
    console.log('allTodos.length after dispatch', Array.from(allTodos).length)
  }
}
*/

export const todosLoading = () => {
  return { type: actionTypes.todosLoading }
}

export const todosLoaded = (todos) => {
  return { type: actionTypes.todosLoaded, payload: todos }
}

//shorter and the same as function above
export const fetchTodos = () =>  async dispatch=> {
  
  dispatch(todosLoading());

  const response = await client.get('/fakeApi/todos');
  dispatch(todosLoaded(response));
}


export const todoSaved = (todos) => {
  return { type: actionTypes.todosFetchAdded, payload: todos }
}

//write a synchronous outer function that receives the 'text' parameter:
export function saveNewTodo(text) {
  return async function saveNewTodoThunk(dispatch, getState) {
    const newTodo = { text }
    const response = await client.post('/fakeApi/todos', { todo: newTodo })
    dispatch(todoSaved(response.todo))
  }
}

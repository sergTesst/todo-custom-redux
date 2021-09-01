import { client } from "../../api/client"
import { actionTypes } from "../appActionTypes";

//Write a function that has `dispatch ` nad `getState` as arguments
export const fetchTodosData = (dispatch, getState)=>{

	client.get('/fakeApi/todos').then(todos=>{
		dispatch({type:actionTypes.todosLoaded, payload: todos});

		const allTodos = getState().todos;
		console.log('allTodos.length after dispatch', Array.from(allTodos).length);

	})
}
import { actionTypes } from "../features/appActionTypes";
import { client } from "../api/client";


//works as expected 
// i didn't know about return; and next(action) in the end of the block
export const delayedActionMiddleware = storeAPI => next =>  action =>{

  if(action.type===actionTypes.todosAdded){
		setTimeout(()=>{
			next(action);
		},1000);
		return;
  }

	next(action);
}

//not using right now
export const fetchTodosMiddleware = storeAPI => next => action =>{
	if(action.type === 'todos/fetchTodos'){
		client.get('/fakeApi/todos').then(todos=>{
			storeAPI.dispatch({type:'todos/todosLoaded', payload: todos});
		})
	}
	next(action);
}


export const asyncFunctionMiddleware = storeAPI => next => action =>{
	if(typeof action ==='function'){
		return action(storeAPI.dispatch, storeAPI.getState);
	}
	//otherwise, it's a normal action - send it onward
	return next(action);
}

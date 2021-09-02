import { client } from '../../api/client'
import { actionTypes } from '../appActionTypes'

import { createAsyncThunk } from '@reduxjs/toolkit';

//you can only pass one argument to the thunk when you dispatch it.
//for multiple values, pass them in a single object

//the payload creator will recieve an obj as its second arg, which contains
// {getState, dispatch }and some other useful value

//thunk dispatches the pending action before running your payload creator
// then dispatchs either fulfilled or rejected based on whether the 
// promise you return succeeds of fails

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async()=>{
  const response = await client.get('/fakeApi/todos');
  return response;
})

export const saveNewTodo = createAsyncThunk('todos/saveNewTodo',async (text) => {

  const newTodo = { text }
  const response = await client.post('/fakeApi/todos', { todo: newTodo });
  return response.todo;
  
})

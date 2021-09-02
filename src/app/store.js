import { loggerMiddleware } from '../exampleAddons/middleware';

import { configureStore } from '@reduxjs/toolkit';

import todosReducer from '../features/todos/todoSlice';
import filtersReducer from '../features/filters/filtersSlice';


//combines todosReducer & filtersReducer into the root reducer
//creates a Redux store using root reducer
//automatically adds thunk middleware
//added more middlewares to check for common mistakes like accidentally 
//mutating the state
// automatically set up redux devTools extension

const store = configureStore({
  reducer: {
    todos:todosReducer,
    filters: filtersReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
})

export default store

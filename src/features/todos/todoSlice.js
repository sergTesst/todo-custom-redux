import { actionTypes } from '../appActionTypes'

import { createSelector } from 'reselect'

import { StatusFilters } from '../filters/filtersSlice'

import { createSlice, createEntityAdapter } from '@reduxjs/toolkit'

import { fetchTodos, saveNewTodo } from './customFetchers'

function nextTodoId(todos) {
  const maxId = Array.from(todos).reduce(
    (maxId, todo) => Math.max(todo.id, maxId),
    -1
  )

  return maxId + 1 + Number(new Date().getTime())
}

export const StatusLoadingData = {
  loading: 'loading',
  succeeded: 'succeeded',
  failed: 'failed',
  idle: 'idle',
}



export const initialState = {
  status: StatusLoadingData.idle,
  entities: {},
}

/**
 * sample example of entities object (lookup table)
 * entities:{
 * '20':{id: 20, value:'Some value'}
 * '21':{id: 21, value:'Some other value'}
 * ...
 * }
 */


/** interface Todo {
 * 	id: number;
 * 	text: string;
 * 	completed: boolean;
 * 	color: string;
 * }
 */

//mutating code is ok inside createSlice

const todosSlice = createSlice({
  name: 'todos',
  initialState,

  reducers: {
    todosAdded(state, action) {
      const nextIdOfTodo = nextTodoId(state.entities)
      const nextTodoText = action.payload
      const newTodo = {
        id: nextIdOfTodo,
        text: nextTodoText,
        completed: false,
      }

      state.entities[nextIdOfTodo] = newTodo
    },

    todosToggled(state, action) {
      const targetTodoId = action.payload
      const todo = state.entities[targetTodoId]
      todo.completed = !todo.completed
    },

    /*action.payload = {
			color:string,
			todoId:number
		}
		*/
    todosColorSelected: {
      reducer(state, action) {
        const { color, todoId } = action.payload
        state.entities[todoId].color = color
      },
      prepare(todoId, color) {
        return {
          payload: { todoId, color },
        }
      },
    },

    /**
     * action.payload = {
     * 	todoId:number
     * }
     */
    todoDeleted(state, action) {
      const { todoId } = action.payload
      delete state.entities[todoId]
    },
    allTodosCompleted(state, action) {
      Object.values(state.entities).forEach((todo) => {
        todo.completed = true
      })
    },
    todosCompletedCleared(state, action) {
      Object.values(state.entities).forEach((todo) => {
        if (todo.completed) {
          delete state.entities[todo.id]
        }
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state, action) => {
        state.status = StatusLoadingData.loading
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        const { todos } = action.payload
        const newEntities = {}
        todos.forEach((todo) => {
          newEntities[todo.id] = todo
        })

        state.entities = newEntities
        state.status = StatusLoadingData.idle
      })
      .addCase(saveNewTodo.fulfilled, (state, action) => {
        const newTodo = action.payload
        state.entities[newTodo.id] = newTodo
      })
  },
})

export const {
  todosAdded,
  todosToggled,
  todosColorSelected,
  todoDeleted,
  allTodosCompleted,
  todosCompletedCleared,
} = todosSlice.actions

export default todosSlice.reducer

export const selectTodoEntities = (state) => state.todos.entities

export const selectTodos = createSelector(selectTodoEntities, (entities) => {
  return Object.values(entities)
})

export const selectTodosStatus = (state) => state.todos.status

export const selectTodoById = (state, todoId) => {
  return selectTodoEntities(state)[todoId]
}

//todoSlice is importing a value from the filtersSlice

//if two slices both try to import smth from each other, you
//can end up with a 'cyclic import dependency' problem that can cause your code to crash

export const selectFilteredTodos = createSelector(
  //First input selector: all todos,
  selectTodos,
  //second input selector: current status filter
  (state) => state.filters,
  //Output selector: receives both values
  (todos, filters) => {
    const { status, colors } = filters
    const showAllCompleted = `${status}`.toLowerCase() === StatusFilters.All

    if (showAllCompleted && colors.length === 0) {
      return todos
    }

    const completedStatus = status === StatusFilters.Completed

    //Return either active or completed todos based on filter
    return todos.filter((todo) => {
      const statusMatches =
        showAllCompleted || todo.completed === completedStatus

      const colorMatches = colors.length === 0 || colors.includes(todo.color)

      return statusMatches && colorMatches
    })
  }
)

export const selectFilteredTodoIds = createSelector(
  //Pass our other memoized selector as an input
  selectFilteredTodos,

  //And derive data in the output selector
  (filteredTodos) => filteredTodos.map((todo) => todo.id)
)

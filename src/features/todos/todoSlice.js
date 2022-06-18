import { actionTypes } from '../appActionTypes'

import { createSelector } from 'reselect'

import { StatusFilters } from '../filters/filtersSlice'

function nextTodoId(todos) {
  const maxId = Array.from(todos).reduce(
    (maxId, todo) => Math.max(todo.id, maxId),
    -1
  )

  return maxId + 1 + Number(new Date().getTime())
}

/** interface Todo {
 * 	id: number;
 * 	text: string;
 * 	completed: boolean;
 * 	color: string;
 * }
 */

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

/*	this file only has to update the todos-related state 
			- it's not nested any more!
			
		this is called reducer composition
*/

export default function todosReducer(state = initialState, action) {
  switch (action.type) {
    //action.payload :string //text
    case actionTypes.todosAdded: {
      const nextIdOfTodo = nextTodoId(state.entities)
      const nextTodoText = action.payload

      return {
        ...state,
        entities: {
          ...state.entities,
          nextIdOfTodo: {
            id: nextIdOfTodo,
            text: nextTodoText,
            completed: false,
          },
        },
      }
    }
    case actionTypes.todosLoading: {
      return {
        ...state,
        status: StatusLoadingData.loading,
      }
    }
    case actionTypes.todosLoaded: {
      const { todos } = action.payload
      const newEntities = {}
      todos.forEach((todo) => {
        newEntities[todo.id] = todo
      })

      return {
        ...state,
        status: StatusLoadingData.idle,
        entities: {
          ...state.entities,
          ...newEntities,
        },
      }
    }

    case actionTypes.todosFetchAdded: {
      const newTodo = action.payload

      return {
        ...state,
        entities: {
          ...state.entities,
          [newTodo.id]: newTodo,
        },
      }
    }

    // action.payload: number //id
    case actionTypes.todosToggled: {
      const targetTodoId = action.payload
      const todo = state.entities[targetTodoId]

      return {
        ...state,
        entities: {
          ...state.entities,
          [targetTodoId]: {
            ...todo,
            completed: !todo.completed,
          },
        },
      }
    }

    /*action.payload = {
			color:string,
			todoId:number
		}
		*/
    case actionTypes.todosColorSelected: {
      const { color, todoId } = action.payload
      const todo = state.entities[todoId]

      return {
        ...state,
        entities: {
          ...state.entities,
          [todoId]: {
            ...todo,
            color,
          },
        },
      }
    }

    /**
     * action.payload = {
     * 	todoId:number
     * }
     */
    case actionTypes.todoDeleted: {
      const { todoId } = action.payload
      const newEntities = { ...state.entities }
      delete newEntities[todoId]

      return {
        ...state,
        entities: newEntities,
      }
    }

    case actionTypes.allTodosCompleted: {
      const newEntities = { ...state.entities }

      Object.values(newEntities).forEach((todo) => {
        newEntities[todo.id] = {
          ...todo,
          completed: true,
        }
      })

      return {
        ...state,
        entities: newEntities,
      }
    }
    case actionTypes.todosCompletedCleared: {
      const newEntities = { ...state.entities }

      Object.values(newEntities).forEach((todo) => {
        if (todo.completed) {
          delete newEntities[todo.id]
        }
      })

      return {
        ...state,
        entities: newEntities,
      }
    }

    default:
      return state
  }
}

/*export const selectTodoIds = createSelector(
  // first, pass one or more "input selector " functions:
  state => selectTodos,
  //then, an 'output selector' that receives all the input results as arguments
  // and returns a final result value
  todos=>todos.map(todo=>todo.id)
)
*/

/*export const selectFilteredTodoIds = ({ status, colors }) => {

  // first, pass one or more "input selector " functions:
  return createSelector(
    (state) => {
      return selectTodos(state).filter((todo) => {
        const { completed, color } = todo

        let colorsSelected = Array.from(colors).length > 0
        let byColor = colorsSelected === false
        if (colorsSelected) {
          byColor = Array.from(colors).includes(color)
        }

        let byStatus
        switch (`${status}`.toLowerCase()) {
          case StatusFilters.All: {
            byStatus = true
            break
          }
          case StatusFilters.Active: {
            byStatus = completed === false
            break
          }
          case StatusFilters.Completed: {
            byStatus = completed === true
            break
          }
          default:
            byStatus = true
        }
        return byColor && byStatus
      })
    },


    //then, an 'output selector' that receives all the input results as arguments
    // and returns a final result value
    (todos) => todos.map((todo) => todo.id)
  )
}
*/

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

import store from './store'

import { initialState as filterState } from '../features/filters/filtersSlice'
import { initialState as todosState } from '../features/todos/todoSlice'

describe('store data', () => {
  const testFilterState = {
    ...filterState,
  }

  const testTodoState = [...todosState]

  it('gets initial state', () => {
    const expectedState = {
      todos: [...testTodoState],
      filters: {
        ...testFilterState,
      },
    }
    const actualState = store.getState()
    expect(actualState).toEqual(expectedState)
  })
  describe('store dispatching todo actions ', () => {
    let unsubscribe
    let mockCallback
    beforeAll(() => {
      if (!unsubscribe) {
        mockCallback = jest.fn(() => {
          console.log('State after dispatch: ', store.getState())
        })
        unsubscribe = store.subscribe(mockCallback)
      }

      store.dispatch({
        type: 'todos/todoAdded',
        payload: 'Learn about actions',
      })
      store.dispatch({
        type: 'todos/todoAdded',
        payload: 'Learn about reducers',
      })
      store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about stores' })

      store.dispatch({ type: 'todos/todoToggled', payload: 0 })
      store.dispatch({ type: 'todos/todoToggled', payload: 1 })

      store.dispatch({ type: 'filters/statusFilterChanged', payload: 'Active' })
      store.dispatch({
        type: 'filters/colorFilterChanged',
        payload: { color: 'red', changeType: 'added' },
      })
    })
    afterAll(() => {
      if (unsubscribe) {
        unsubscribe()
      }
    })

    it('store state is as expected after todo add ', () => {
      const actualState = store.getState()
      const expectedState = {
        todos: [
          ...testTodoState,
          {
            id: 0,
            text: 'Learn about actions',
            completed: true,
          },
          {
            id: 1,
            text: 'Learn about reducers',
            completed: true,
          },
          {
            id: 2,
            text: 'Learn about stores',
            completed: false,
          },
        ],
        filters: {
          ...testFilterState,
          status: 'Active',
          colors: ['red'],
        },
      }
      expect(actualState).toEqual(expectedState)
    })

    it('unsubscribe was called after each dispatch', () => {
      // The mock function is called twice
      const expectedNumberOfCalls = 7
      expect(mockCallback.mock.calls.length).toBe(expectedNumberOfCalls)
    })
  })


  it('subscribe and unsubscribe works correctly', () => {

		const mockCallback = jest.fn(() => {
			console.log('State after dispatch: ', store.getState())
		})
		const unsubscribe = store.subscribe(mockCallback)

		store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about actions' })
		unsubscribe()
		// Dispatch one more action to see what happens
		store.dispatch({ type: 'todos/todoAdded', payload: 'Try creating a store' })

		expect(mockCallback.mock.calls.length).toBe(1)
  })
})

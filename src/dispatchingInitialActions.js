import {fetchTodosData} from './features/todos/customFetchers';

export const InitialActions = (store) => {

  //initial state
  console.log('Initial state: ', store.getState())

  //Every time the state changes, log it
  //subscribe() returns a function for unregistering the listeners
  const unsubscribe = store.subscribe(() => {
    console.log('State after dispatch: ', store.getState())
  })

  const resultOfFirstTodoAddDispatch = store.dispatch({
    type: 'todos/todoAdded',
    payload: 'Learn about actions',
  })
  console.log('resultOfFirstTodoAddDispatch', resultOfFirstTodoAddDispatch)

  const resultOfSecondTodoAddDispatch = store.dispatch({
    type: 'todos/todoAdded',
    payload: 'Learn about reducers',
  })
  console.log('resultOfSecondTodoAddDispatch', resultOfSecondTodoAddDispatch)

  store.dispatch({ type: 'todos/todoAdded', payload: 'Learn about stores' })

  store.dispatch({ type: 'todos/todoToggled', payload: 0 })
  store.dispatch({ type: 'todos/todoToggled', payload: 1 })

  store.dispatch({ type: 'filters/statusFilterChanged', payload: 'Active' })
  // store.dispatch({
  //   type: 'filters/colorFilterChanged',
  //   payload: { color: 'red', changeType: 'added' },
  // })

  // Stop listening to state updates
  unsubscribe()
  // Dispatch one more action to see what happens
  store.dispatch({ type: 'todos/todoAdded', payload: 'Try creating a store' })

	//Pass the _function_ we wrote to `dispatch`
	store.dispatch(fetchTodosData);
	//logs: allTodos.length after dispatch


}

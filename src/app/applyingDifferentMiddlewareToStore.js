import {
  sayHiOnDispatch,
  includeMeaningOfLife,
} from '../exampleAddons/enhancers'


import {
  print1,
  print2,
  print3,
  loggerMiddleware,
  alwaysStringResultMiddleware,
  delayedMessageMiddleware,
} from '../exampleAddons/middleware'


// import {createMiniStore} from './miniReduxStoreExample';

// let preloadedState // second argument of createStore

// const persistedTodosJSON = localStorage.getItem('todos')
// if (persistedTodosJSON) {
//   preloadedState = {
//     todos: JSON.parse(persistedTodosJSON),
//   }
// }

//const store = createStore(rootReducer, preloadedState);

//for testing. Using custom store
//const store = createMiniStore(rootReducer, preloadedState); //all tests passed

// const composedEnhancer = compose(sayHiOnDispatch, includeMeaningOfLife);

// const store = createStore(rootReducer, undefined, composedEnhancer);

//using middlewares
//print1 print2 print3 runs before every dispatch

// initial middlewares
// const middlewareEnhancer = applyMiddleware(print1, print2, print3);

//use logger middleware
// const loggerMiddlewareEnhancer = applyMiddleware(loggerMiddleware)

// const middlewareEnhancer = applyMiddleware(alwaysStringResultMiddleware);

//const middlewareEnhancer = applyMiddleware(delayedMessageMiddleware)

//Pass enhancer as the second arg, since there's no preloadedState
//const store = createStore(rootReducer, middlewareEnhancer)


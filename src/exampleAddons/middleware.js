import { actionTypes } from "../features/appActionTypes";


/*
 a middleware can do anything it wants when it sees a dispatched action:
 log something to the console
 set timeouts 
 make async api calls
 modify the action
 pause the action or even stop it entirely

 middleware are intended to contain logic with side effects
 middleware can modify dispatch to accept things that are not plain action objects
 more part 6 async logic
*/

export const print1 = (storeAPI) => (next) => (action) => {
  console.log('1');
  return next(action);
}

export const print2 = (storeAPI) => (next) => (action) => {
  console.log('2');
  return next(action);
}

export const print3 = (storeAPI) => (next) => (action) => {
  console.log('3');
  return next(action);
}

function exampleMiddleware(storeAPI){
  console.log('exampleMiddleware storeApi', storeAPI);

  return function wrapDispatch(next){
    console.log('wrapDispatch next', next);

    return function handleAction(action){
      console.log('handleAction action', action);

      // Do anything here: pass the action onward with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() here

      return next(action);
    }
  }
}

const anotherExampleMiddleware = storeApi => next => action => {
  // some actions here on dispatch

  return next(action);
} 

export const loggerMiddleware = storeAPI => next => action =>{

  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', storeAPI.getState());
  return result;

}
export const alwaysStringResultMiddleware = storeAPI => next => action =>{

  let result = next(action);
  //ignore the original result, return something else
  return 'result';

}
export const delayedMessageMiddleware = storeAPI => next => action =>{

  if(action.type===actionTypes.todosAdded){
    setTimeout(()=>{
      console.log('added a new todo', action.payload);
    },1000)
  }

  return next(action);

}








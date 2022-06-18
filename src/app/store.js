import { createStore, compose, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from '../features/reducer'

import {
  loggerMiddleware,
} from '../exampleAddons/middleware'

import {
  delayedActionMiddleware,
  asyncFunctionMiddleware,
} from '../exampleAddons/asyncMiddleware';

import thunkMiddleware from 'redux-thunk'



const composedEnhancer = composeWithDevTools(

  // add whatever middleware you actually want to use here
  applyMiddleware(
    //custom middlewares
    loggerMiddleware,

    // delays todoAdd on 1 second
    // delayedActionMiddleware,

    //calls action with dispatch and getState
    // asyncFunctionMiddleware,

    //redux middlewares
    //calls action with dispatch and getState like asyncFunctionMiddleware
    thunkMiddleware 
  )
)
const store = createStore(rootReducer, composedEnhancer)

export default store

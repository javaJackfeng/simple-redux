// import { createStore } from 'redux'
import logger from "redux-logger"
import thunk from "redux-thunk"
import { createStore, applyMiddleware } from '../cRedux'
import reducers from '../reducer'

const enhancer = applyMiddleware(thunk, logger)

const store = createStore(reducers, enhancer)

export default store
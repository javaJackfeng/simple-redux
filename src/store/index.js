// import { createStore } from 'redux'
import { createStore } from '../cRedux'
import todoReducer from '../reducer'

const store = createStore(todoReducer)

export default store
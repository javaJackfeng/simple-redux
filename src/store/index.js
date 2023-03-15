// import { createStore } from 'redux'
import { createStore } from '../cRedux'
import reducers from '../reducer'

const store = createStore(reducers)

export default store
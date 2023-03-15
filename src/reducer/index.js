import { combineReducers } from "../cRedux/index"
const defaultState = [
    {
        text: "Eat food",
        completed: true,
    },
    {
        text: "Exercise",
        completed: false,
    },
];

const todoReducer = (state = defaultState, action) => {
    const { type, payload } = action || {};
    const { text } = payload || {};
    switch (type) {
        case "ADD_TODO":
            return state.concat([{ text, completed: false }]);
        default:
            return state;
    }
};

const countReducer = (state = 2, action) => {
  const {type, payload} = action
  switch (type) {
      case 'ADD': return state + payload
      default: return state
  }
}

const reducers = combineReducers({
    todoList: todoReducer,
    count: countReducer,
});

export default reducers

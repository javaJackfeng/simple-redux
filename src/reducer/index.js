const defaultState = [
    {
      text: "Eat food",
      completed: true,
    },
    {
      text: "Exercise",
      completed: false,
    },
]

const reducer = (state = defaultState, action) => {
    const { type, payload } = action || {}
    const { text } = payload || {}
    switch (type) {
        case 'ADD_TODO':
          return state.concat([{ text, completed: false }])
        default:
          return state
    }
}

export default reducer

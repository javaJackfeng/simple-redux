const createStore = (reducer) => {
    let currentState
    let currentListeners = []
    let nextListeners = currentListeners
    const dispatch = (action) => {
        currentState = reducer(currentState, action)
        currentListeners = nextListeners
        currentListeners.forEach(listener => listener())
        return action
    }

    const getState = () => {
        return currentState
    }

    const ensureCanMutateNextListeners = () => {
        if (nextListeners === currentListeners) {
          nextListeners = currentListeners.slice()
        }
      }

    const subscribe = (listener) => {
        nextListeners.push(listener)
        ensureCanMutateNextListeners()
        return () => {
            ensureCanMutateNextListeners()
            const index = nextListeners.indexOf(listener)
            nextListeners.splice(index, 1)
            currentListeners = null
        }
    }

    const store = {
        dispatch,
        getState,
        subscribe,
    }

    dispatch({type: 'init_____'})

    return store
}

export {
    createStore
}
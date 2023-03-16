const createStore = (reducer, enhancer) => {
    let currentState
    let currentListeners = []
    let nextListeners = currentListeners

    if (typeof enhancer === 'function') {
        return enhancer(createStore)(reducer)
    }

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

const combineReducers = (reducers) => {
    const newReducers = {}
    Object.entries(reducers).forEach((item) => {
        const [key, value] = item;
        if (typeof value === 'function') {
            newReducers[key] = value
        }
    })

    return (state = {}, action) => {
        const result = state ? {...state} : {}
        let hasChanged = false
        Object.entries(newReducers).forEach((item) => {
            const [key, reducer] = item;
            const value = result[key]
            const newValue = reducer(value, action)
            result[key] = newValue
            hasChanged = hasChanged || value !== newValue
        })
        return hasChanged ? result : state
    }
}

const compose = (...funcs) => {
    if (funcs.length === 0) {
        return (arg) => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return (...args) => {
        return funcs.reduce((a, b) => {
            return a(b(...args))
        })
    }
}

const applyMiddleware = (...middlewares) => {
    return (createStore) => {
        return (reducer) => {
            const store = createStore(reducer)
            let dispatch = store.dispatch
            const middlewareApi = {
                getState: store.getState,
                dispatch: (action, ...args) => dispatch(action, ...args) 
            }
            const chain = middlewares.map((fn) => fn(middlewareApi))
            dispatch = compose(...chain)(dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}

export {
    createStore,
    combineReducers,
    applyMiddleware
}
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import { setHeader } from './actions/login';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);


//Check global state for sessions debugging
console.log(store.getState());

//Sets default for when application is first run to prevent errors
let currentState = {
    register: { isAuthenticated: null, token: null, loading: true, user: null }
}


//Runs to detect any state/token changes, if token has changed or is added (token will be different to default (null)),
//setHeader function will be called, setting headers with token.
store.subscribe(() => {
    console.log('Token state being checked');
    const prevState = currentState;
    currentState = store.getState();
    //If the state/token has changed, set headers and local storage with new token
    if (prevState.register.token !== currentState.register.token) {
        const token = currentState.register.token;
        setHeader(token);
    }
})

export default store;

import getLocalStorage from "../../helpers/getLocalStorage.js"

// CONSTANTS
const TOKEN_FETCH_STARTED = 'token/FETCH_STARTED'
const TOKEN_FETCH_SUCCESS = 'token/FETCH_SUCCESS'
const TOKEN_FETCH_ERROR = 'token/FETCH_ERROR'

// ACTIONS CREATORS
const tokenFetchStarted = () => ({ type: TOKEN_FETCH_STARTED })
const tokenFetchSuccess = (payload) => ({ type: TOKEN_FETCH_SUCCESS, payload, localStorage: 'token' })
const tokenFetchError = (payload) => ({ type: TOKEN_FETCH_ERROR, payload })

// ASYNCHRONOUS FUNCTION - THUNK FUNCTION
export const tokenFetch = (user) => async(dispatch) => {
  try {
    dispatch(tokenFetchStarted());
    const response = await fetch('https://dogsapi.origamid.dev/json/jwt-auth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    const { token } = await response.json()
    dispatch(tokenFetchSuccess(token))
  } catch(error) {
    dispatch(tokenFetchError(error.message))
  }
}

// INITIAL STATE
const initialState = {
  loading: false,
  data: getLocalStorage('token', null),
  error: null,
}

// REDUCER MAIN FUNCTION
function token(state = initialState, action) {
  switch (action.type) {
    case TOKEN_FETCH_STARTED:
      return { ...state, loading: true }
    case TOKEN_FETCH_SUCCESS:
      return { data: action.payload, loading: false, error: null }
    case TOKEN_FETCH_ERROR:
      return { data: null, loading: false, error: action.payload }
    default:
      return state
  }
}

export default token

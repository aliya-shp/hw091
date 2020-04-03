import {
    LOGIN_USER_FAILURE,
    LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAILURE, LOGOUT_USER_REQUEST, LOGOUT_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS
} from "../actions/usersActions";

const initialState = {
    registerLoading: false,
    registerError: null,
    user: null,
    loginLoading: false,
    loginError: null,
    loggingOut: false,
    logoutError: null,
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
            return {...state, registerLoading: true};
        case REGISTER_USER_SUCCESS:
            return {...state, registerLoading: false, registerError: null};
        case REGISTER_USER_FAILURE:
            return {...state, registerError: action.error, registerLoading: false};
        case LOGIN_USER_REQUEST:
            return {...state, loginLoading: true};
        case LOGIN_USER_SUCCESS:
            return {...state, loginLoading: false, loginError: null, user: action.user};
        case LOGIN_USER_FAILURE:
            return {...state, loginLoading: false, loginError: action.error};
        case LOGOUT_USER_REQUEST:
            return {...state, loggingOut: true, logoutError: null};
        case LOGOUT_USER_SUCCESS:
            return {...state, loggingOut: true, user: null};
        case LOGOUT_USER_FAILURE:
            return {...state, loggingOut: false, logoutError: action.error}
        default:
            return state;
    }
};

export default usersReducer;
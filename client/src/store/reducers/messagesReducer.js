import {
    ADD_MESSAGE_FAILURE,
    ADD_MESSAGE_REQUEST, ADD_MESSAGE_SUCCESS,
    FETCH_MESSAGES_FAILURE,
    FETCH_MESSAGES_REQUEST,
    FETCH_MESSAGES_SUCCESS
} from "../actions/messagesActions";

const initialState = {
    messages: [],
    message: null,
    isLoading: false,
    error: null,
};

const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MESSAGES_REQUEST:
            return {...state, isLoading: true};
        case FETCH_MESSAGES_SUCCESS:
            return {...state, messages: action.messages};
        case FETCH_MESSAGES_FAILURE:
            return {...state, error: action.error};
        case ADD_MESSAGE_REQUEST:
            return {...state, isLoading: true};
        case ADD_MESSAGE_SUCCESS:
            return {...state, message: action.message};
        case ADD_MESSAGE_FAILURE:
            return {...state, error: action.error};
        default:
            return state;
    }
};

export default messagesReducer;
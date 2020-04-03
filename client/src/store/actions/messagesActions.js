import axiosApi from "../../axiosApi";
import {push} from 'connected-react-router';

export const FETCH_MESSAGES_REQUEST = 'FETCH_MESSAGES_REQUEST';
export const FETCH_MESSAGES_SUCCESS = 'FETCH_MESSAGES_SUCCESS';
export const FETCH_MESSAGES_FAILURE = 'FETCH_MESSAGES_FAILURE';

export const ADD_MESSAGE_REQUEST = 'ADD_MESSAGE_REQUEST';
export const ADD_MESSAGE_SUCCESS = 'ADD_MESSAGE_SUCCESS';
export const ADD_MESSAGE_FAILURE = 'ADD_MESSAGE_FAILURE';

export const fetchMessagesRequest = () => ({type: 'FETCH_MESSAGES_REQUEST'});
export const fetchMessagesSuccess = messages => ({type: 'FETCH_MESSAGES_SUCCESS'});
export const fetchMessagesFailure = error => ({type: FETCH_MESSAGES_FAILURE, error});

export const addMessageRequest = () => ({type: ADD_MESSAGE_REQUEST});
export const addMessageSuccess = () => ({type: ADD_MESSAGE_SUCCESS});
export const addMessageFailure = error => ({type: ADD_MESSAGE_FAILURE, error});

export const fetchMessages = () => {
    return async dispatch => {
        try {
            dispatch(fetchMessagesRequest());
            const response = await axiosApi.get('/messages');
            dispatch(fetchMessagesSuccess(response.data));
            dispatch(push('/'));
        } catch (error) {
            dispatch(fetchMessagesFailure(error.response.data));
        }
    }
};

export const addMessage = messageData => {
  return async dispatch => {
      try {
          dispatch(addMessageRequest());
          const response = await axiosApi.post('/messages', messageData);
          dispatch(addMessageSuccess(response.data));
          dispatch(push('/'));
      } catch (error) {
          dispatch(addMessageFailure(error.response.data));
      }
  }  
};
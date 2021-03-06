import axios from "axios";

import {
  GET_ERRORS,
  CLEAR_ERRORS,
  GET_EVENTS,
  GET_EVENT,
  CREATE_EVENT,
  DELETE_EVENT,
  EVENT_LOADING
} from "./types";

// Create Event
export const createEvent = (eventData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post("/api/events", eventData)
    .then(res => {
      dispatch(addAttendee(res.data._id));
      dispatch({ type: CREATE_EVENT, payload: res.data });
      history.push("/events");
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Delete Event
export const deleteEvent = (id, history) => dispatch => {
  axios
    .delete(`/api/events/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_EVENT,
        payload: id
      });
      history.push("/events");
    })
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Get Events
export const getEvents = () => dispatch => {
  dispatch(setEventLoading());
  axios
    .get("/api/events")
    .then(res =>
      dispatch({
        type: GET_EVENTS,
        payload: res.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_EVENTS,
        payload: null
      })
    );
};

// Get event by id
export const getEventById = id => dispatch => {
  dispatch(setEventLoading());
  axios
    .get(`/api/events/id/${id}`)
    .then(res => {
      dispatch({ type: GET_EVENT, payload: res.data });
    })
    .catch(error =>
      dispatch({
        type: GET_EVENT,
        payload: null
      })
    );
};

// Add attendee
export const addAttendee = id => dispatch => {
  axios
    .post(`/api/events/go/${id}`)
    .then(res => dispatch(getEvents()))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Remove attendee
export const removeAttendee = id => dispatch => {
  axios
    .post(`/api/events/nogo/${id}`)
    .then(res => dispatch(getEvents()))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Add Comment
export const addComment = (eventId, commentData) => dispatch => {
  dispatch(clearErrors());
  axios
    .post(`/api/events/comment/${eventId}`, commentData)
    .then(res =>
      dispatch({
        type: GET_EVENT,
        payload: res.data
      })
    )
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Delete Comment
export const deleteComment = (eventId, commentId) => dispatch => {
  axios
    .delete(`/api/events/comment/${eventId}/${commentId}`)
    .then(res => dispatch({ type: GET_EVENT, payload: res.data }))
    .catch(error =>
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data
      })
    );
};

// Set loading state
export const setEventLoading = () => {
  return {
    type: EVENT_LOADING
  };
};

// Clear Errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};

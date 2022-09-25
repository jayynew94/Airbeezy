import { csrfFetch } from "./csrf";

const LOAD = "spots/LOAD";
const CREATE = "spots/CREATE";
const UPDATE = "spots/UPDATE";
const DELETE = "spots/DELETE";
const LOADONE = "spots/LOADONE";

const load = (spotlist) => {
  return {
    type: LOAD,
    spotlist,
  };
};

const addSpot = (spotlist) => {
  return {
    type: CREATE,
    spotlist,
  };
};

const updateSpot = (spotlist) => {
  return {
    type: UPDATE,
    spotlist,
  };
};

const removeSpot = (spotlist) => {
  return {
    type: DELETE,
    spotlist,
  };
};

const loadOne = (spot) => {
  return {
    type: LOADONE,
    spot,
  };
};

export const getAllSpots = () => async (dispatch) => {
  // console.log("before fetch")
  const response = await fetch(`/api/spots`);

  if (response.ok) {
    const spotlist = await response.json();
    //  console.log(spotlist.Spots, "this is spotlist ")
    dispatch(load(spotlist.Spots));
  }
};

export const getSpotId = (spotId) => async (dispatch) => {
  console.log(spotId, "this is the spot id");
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
 
    dispatch(loadOne(spot));
  }
};

export const getOwnerSpot = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);

  if (response.ok) {
    const spotList = await response.json();
    console.log(spotList.Spots, "this is the SPOTLIST");
    dispatch(load(spotList.Spots));
  }
};

export const spotForm = (payload) => async (dispatch) => {
  const {
    ownerId,
    address,
    city,
    country,
    description,
    name,
    price,
    state,
    url,
  } = payload;
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ownerId,
      address,
      city,
      country,
      description,
      name,
      price,
      state,
    }),
  });

  if (response.ok) {
    const data = await response.json();
    const imgRes = await csrfFetch(`/api/spots/${data.id}/images`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        preview: true,
      }),
    });
    if (imgRes.ok) {
      const dataImg = await imgRes.json();
      data.SpotImages = [dataImg];
      dispatch(addSpot(data));
      return data;
    }
  }
};

export const editSpot = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(updateSpot(updatedSpot));
    // dispatch(addSpot(updatedSpot));
    return updatedSpot;
  }
};

export const deleteSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const deleteSpot = await response.json();
    dispatch(removeSpot(spotId));
  }
};

const initialState = {};
// console.log(initialState,"this is the initial state")

const spotReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD:
      const allSpots = {};

      action.spotlist.forEach((spot) => {
        allSpots[spot.id] = spot;
      });
      return allSpots;

    case CREATE:
      const newState = { ...state };
      console.log(action.spotlist.id);
      newState[action.spotlist.id] = action.spotlist;
      return newState;
    case UPDATE:
      if (!state[action.spotlist.id]) {
        const newState = {
          ...state,
          [action.spotlist.id]: action.spotlist,
        };
        const spotList = newState.spotlist.map((id) => newState[id]);
        spotList.push(action.spotlist);
        newState.spotlist = spotList;
        return newState;
      }
      return {
        ...state,
        [action.spotlist.id]: {
          ...state[action.spotlist.id],
          ...action.spotlist,
        },
      };
    case DELETE:
      const deleteState = { ...state };

      delete deleteSpot[action.spotlist];
      return deleteState;

    case LOADONE: {
      const newState = { ...state };

      newState[action.spot.id] = action.spot;
    
      return newState;
    }

    default:
      return state;
  }
};

export default spotReducer;

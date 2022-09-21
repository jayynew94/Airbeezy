import { csrfFetch } from "./csrf"

const LOAD = 'spots/LOAD'
const CREATE = 'spots/CREATE'
const UPDATE = 'spots/UPDATE'
const DELETE = 'spots/DELETE'


const load = spotlist => {
  return {
    type: LOAD,
    spotlist
  }
}

const addSpot = spotlist => {
  return {
    type: CREATE,
    spotlist
  }
}

const updateSpot = spotlist => {
  return {
    type: UPDATE,
    spotlist
  }
}

const removeSpot = spotlist => {
  return{
    type: DELETE,
    spotlist
  }
}


export const getAllSpots = () => async dispatch => {
    // console.log("before fetch")
      const response = await fetch(`/api/spots`);
     
     if (response.ok) {
         const spotlist = await response.json();
        //  console.log(spotlist.Spots, "this is spotlist ")
         dispatch(load(spotlist.Spots));
      }
}

export const getSpotId = (spotId) => async (dispatch) => {
  console.log(spotId, "this is the spot id")
  const response = await fetch(`/api/spots/${spotId}`);

  if (response.ok) {
    const spot = await response.json();
    dispatch(load(spot));
  }
};

export const spotForm = (payload) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const newspot = await response.json();
    dispatch(addSpot(newspot));
    return newspot;
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
     return updatedSpot;
   }
}

export const deleteSpot = (spotId) => async (dispatch) =>{
  console.log(spotId, "this is delete spot thunk")
    const response = await csrfFetch(`/api/spots/${spotId}`, {

      method: "DELETE",
    });

    if(response.ok){
      const deleteSpot = await response.json()
      dispatch(removeSpot(spotId))
    }
}


const initialState = {}
// console.log(initialState,"this is the initial state")

const spotReducer = (state = initialState, action) =>{
    switch (action.type) {
      case LOAD:
        const allSpots = {};

        action.spotlist.forEach((spot) => {
          allSpots[spot.id] = spot;
        });
        return allSpots
        
      case CREATE:
          const newState = {...state}
          console.log(action.spotlist.id)
          newState[action.spotlist.id] = action.spotlist
        return newState
        case UPDATE:
             if (!state[action.spotlist.id]) {
          const newState = {
            ...state,
            [action.spotlist.id]: action.spotlist,
          };
          const spotList = newState.spotlist.map((id) => newState[id]);
          spotList.push(action.spotlist);
          newState.spotlist = spotList
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
            const deleteState = {...state}
            console.log(action, "this is action data in reducer")
            delete deleteSpot[action.spotlist]
            return deleteState
      default:
        return state;
    }
}


export default spotReducer;
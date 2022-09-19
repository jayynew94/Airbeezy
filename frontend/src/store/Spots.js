import { csrfFetch } from "./csrf"

const LOAD = 'spots/LOAD'
const CREATE = 'spots/CREATE'



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




const initialState = {}
// console.log(initialState,"this is the initial state")

const spotReducer = (state = initialState, action) =>{
    switch (action.type) {
      case LOAD:
        const allSpots = {};
        console.log(action.spotlist, "whats going on man")
        action.spotlist.forEach((spot) => {
          allSpots[spot.id] = spot;
        });
        return {
          ...allSpots,
          ...state,
          spotlist: action.spotlist,
        };
      case CREATE:
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
      default:
        return state;
    }
}


export default spotReducer;
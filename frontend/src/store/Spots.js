

const LOAD = 'spots/LOAD'



const load = spotlist => {
  return {
    type: LOAD,
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




const initialState = {}
// console.log(initialState,"this is the initial state")

const spotReducer = (state =initialState, action) =>{
    switch (action.type) {
      case LOAD:
        const allSpots = {};
        // console.log(action, "this is action console")
        action.spotlist.forEach((spot) => {
          allSpots[spot.id] = spot;
        });
        return {
          ...allSpots,
          ...state,
          spotlist: action.spotlist,
        };
      // case ADDSPOT:
      //   if (!state[action.spotlist.id]) {
      //     const newState = {
      //       ...state,
      //       [action.spotlist.id]: action.spotlist,
      //     };
      //     const spotList = newState.spotlist.map((id) => newState[id]);
      //     spotList.push(action.spotlist);
      //     return newState;
      //   }
      //   return {
      //     ...state,
      //     [action.spotlist.id]: {
      //       ...state[action.spotlist.id],
      //       ...action.spotlist,
      //     },
        // };
      default:
        return state;
    }
}


export default spotReducer;
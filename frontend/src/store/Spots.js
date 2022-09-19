

const LOAD = 'spots/LOAD'
const ADDSPOT = 'spots/ADD'


const load = spotlist => {
  return {
    type: LOAD,
    spotlist
  }
}

const addSpot = spotlist => {
  return {
    type: ADDSPOT,
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

export const editSpot = (payload) => async (dispatch) => {
  const response = await fetch(`/api/spots/${payload.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (response.ok) {
    const updatedSpot = await response.json();
    dispatch(addSpot(updatedSpot));
   return updatedSpot
  }
}

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
          spotlist: (action.spotlist)
        };
        default:
            return state
    }
}


export default spotReducer;
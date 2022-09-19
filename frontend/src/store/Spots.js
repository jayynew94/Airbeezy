

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
   
      return response
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


export default spotReducer
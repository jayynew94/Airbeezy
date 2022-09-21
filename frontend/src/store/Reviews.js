import { csrfFetch } from "./csrf";

const LOAD = 'reviews/LOAD'
const CREATE = 'reviews/CREATE'

const load = reviewList => {

    return {
        type: LOAD,
        reviewList
    }

}

const addReview = reviewList => {
    return {
        type: CREATE,
        reviewList
    }
}

export const getAllReviews = (spotId) => async dispatch => {
    console.log(spotId,"SPOTID IN THUNK")
    const response = await fetch(`/api/spots/${spotId}/reviews`)

    

    if(response.ok){
        const reviewList = await response.json()
       
        dispatch(load(reviewList.Reviews))
    }
}

export const reviewForm = (payload, spotId) => async(dispatch) =>{
    console.log(payload, "this is my payload")
 
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
       
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
     console.log(spotId, "THIS IS THE SPOT ID!!!!");
    console.log(response, "this is reviewform response")
    if(response.ok) {
        const newReview = await response.json()
        dispatch(addReview(newReview))
        return newReview
    }
}

const initialState = {};

const reviewReducer = (state = initialState, action) => {
    switch (action.type){
            
        case LOAD:
            const allReviews ={};
            
            action.reviewList.forEach((review) => {
                allReviews[review.id] = review
            })

            return allReviews
         

            case CREATE:
                const newState ={...state}
                newState[action.reviewList.id] = action.reviewList
                return newState


                 default: 
            return state;
    }
}

export default reviewReducer
import { csrfFetch } from "./csrf";

const LOAD = 'reviews/LOAD'
const CREATE = 'reviews/CREATE'
const DELETE = 'reviews/DELETE'

const load = reviewList => {

    return {
        type: LOAD,
        reviewList
    }

}

const remove = reviewId => {
    return{
        type: DELETE,
        reviewId
    }
}

const addReview = reviewList => {
    return {
        type: CREATE,
        reviewList,
      
    }
}

export const getAllReviews = (spotId) => async dispatch => {

    const response = await fetch(`/api/spots/${spotId}/reviews`)
    if(response.ok){
        const reviewList = await response.json()
       
        dispatch(load(reviewList.Reviews))
    }
}

export const getOwnerReviews = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`)
    if(response.ok){
        const reviewList = await response.json()
        dispatch(load(reviewList.Reviews))
    }

}

export const reviewForm = (payload, spotId, userObj) => async(dispatch) =>{

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload, userObj),
    });
   
    if(response.ok) {
        const newReview = await response.json()
        newReview.User = userObj;
       
        dispatch(reviewForm(payload, spotId, userObj))
        return newReview
    }
}

export const deleteReview = (reviewId) => async (dispatch) => {
    
    const response  = await csrfFetch(`/api/reviews/${reviewId}`,{
        method: "DELETE",
    });

    if(response.ok) {
        const deleteReview = await response.json()
        dispatch(remove(reviewId))
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

            case DELETE:
                const deleteState = {...state}
                delete deleteState[action.reviewId]
                return deleteState

                 default: 
            return state;
    }
}

export default reviewReducer
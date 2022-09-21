import { csrfFetch } from "./csrf";

const LOAD = 'reviews/LOAD'

const load = reviewList => {
    return {
        type: LOAD,
        reviewList
    }

}

export const getAllReviews = () => async dispatch => {
    const response = await fetch(`/api/reviews`)

    console.log(response)

    if(response.ok){
        const reviewList = await response.json()
        console.log(reviewList.reviews, "this is reviews")
        dispatch(load(reviewList.reviews))
    }
}

const initialState = {};
console.log(initialState, "this is initial state")

const reviewReducer = (state = initialState, action) => {
    switch (action.type){
        case LOAD:
            const allReviews ={};

            action.reviewList.forEach((review) => {
                allReviews[review.id] = review
            })
            return allReviews

            default: 
            return state;
    }
}

export default reviewReducer
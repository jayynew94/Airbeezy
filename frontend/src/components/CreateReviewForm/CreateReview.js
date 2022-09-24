import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { reviewForm } from "../../store/Reviews";
import './createReview.css'


const CreateReviewForm = () => {
    const user = useSelector(state => state.session.user)
   
    const reviews = useSelector((state) => state.reviews)
  
    const dispatch = useDispatch()
    const history = useHistory()
    const {spotId} = useParams()
  


    const [stars, setStars] = useState("")
    const [review, setReview] = useState("")
    const [ValidationErrors, setValidationErrors] = useState([])

    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() =>{
        const errors =[]

        if(!user) errors.push("Please Log In")
        if(user === reviews.userId)errors.push("User already has a review for this spot")
        if(stars > 5 || stars < 1)errors.push("Stars must be Between 1 and 5")
        if(!review) errors.push("Please write a Review")


        setValidationErrors(errors)
        // if(user)setOwnerId(user?.id)
    }, [user, stars, review, reviews.userId])


    const updateStars = (e) => setStars(e.target.value)
    const updateReview = (e) => setReview(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)
        if(ValidationErrors.length) return alert(`CANNOT SUBMIT`)

        const payload ={
            stars,
            review,
            
        }

     await dispatch(reviewForm(payload, spotId))
        .then((res) => {
             history.push(`/spots/${spotId}`);
        })
        .catch(async(res) => {
            const data =  await res.json()
            if(data && data.message){
                setValidationErrors([data.message])
            }
        })

       
       
    }

    return (
      <div className="reviewspan">
        {!user && <h1>Please Sign In</h1>}
        {user && (
          <form onSubmit={handleSubmit}>
            <div className="review-title">
              <h1>Create a Review</h1>
            </div>
            {ValidationErrors.length > 0 && (
              <div className="reviewCenter">
                <ul className="createReviewdots">
                  {ValidationErrors.map((error) => (
                    <li className="rev-errors" key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
            <div className="reviewElement">
              <div className="Review-inputs">
                <input
                  className="stars-field"
                  type="number"
                  placeholder="Stars"
                  value={stars}
                  onChange={updateStars}
                />
              </div>
              <div>
                <input
                  className="review-field"
                  type="text"
                  placeholder="Leave a Review"
                  value={review}
                  onChange={updateReview}
                />
              </div>
            </div>
            <div className="createreviewInput">
              <button  className="createRev-btn"onClick={handleSubmit}>Submit</button>
            </div>
          </form>
        )}
      </div>
    );
}

export default CreateReviewForm
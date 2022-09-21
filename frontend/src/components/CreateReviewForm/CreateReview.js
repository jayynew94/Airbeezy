import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { reviewForm } from "../../store/Reviews";
import  SpotDetail from '../SpotDetail/oneSpot'

const CreateReviewForm = () => {
    const user = useSelector(state => state.session.user)
   
    const reviews = useSelector((state) => state.reviews)
  
    const dispatch = useDispatch()
    const history = useHistory()
    const {spotId} = useParams()
  


    const [ownerId, setOwnerId] = useState(null)
    const [stars, setStars] = useState("")
    const [review, setReview] = useState("")
    const [ValidationErrors, setValidationErrors] = useState([])
    const [errors, setErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false)


    useEffect(() =>{
        const errors =[]

        if(!user) errors.push("Please Log In")
        if(user === reviews.userId)errors.push("User already has a review for this spot")
        if(stars > 5 || stars < 1)errors.push("Stars must be Between 1 and 5")
        if(!review) errors.push("Please write a Review")


        setValidationErrors(errors)
        // if(user)setOwnerId(user?.id)
    }, [user, stars, review])


    const updateStars = (e) => setStars(e.target.value)
    const updateReview = (e) => setReview(e.target.value)

    const handleSubmit = async (e) => {
        e.preventDefault();

        setHasSubmitted(true)
        if(ValidationErrors.length) return alert(`CANNOT SUBMIT`)

        const payload ={
            stars,
            review
        }

     await dispatch(reviewForm(payload, spotId))
        .then((res) => {
             history.push(`/spots/${spotId}`);
        })
        .catch(async(res) => {
            const data =  await res.json()
            if(data && data.message){
                console.log(data.message,"THIS IS ERROR")
                setValidationErrors([data.message])
            }
        })

       
       
    }

    return (
      <div>
        {!user && <h1>Please Sign In</h1>}
        {user && (
          <div>
            <form onSubmit={handleSubmit}>
              <h1>Create a Review</h1>
              {ValidationErrors.length > 0 && (
                <div>
                  The following errors were found:
                  <ul>
                    {ValidationErrors.map((error) => (
                      <li key={error}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
              <input
                type="number"
                placeholder="Stars"
                value={stars}
                onChange={updateStars}
              />
              <input
                type="text"
                placeholder="Leave a Review"
                value={review}
                onChange={updateReview}
              />
            <button onClick={handleSubmit}>Submit</button>
            </form>
          </div>
        )}
      </div>
    );
}

export default CreateReviewForm
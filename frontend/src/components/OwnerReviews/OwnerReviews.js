import { useSelector } from "react-redux";
import { deleteReview, getOwnerReviews } from "../../store/Reviews";
import { useDispatch } from "react-redux";
import { useEffect } from "react";


export default function GetReviews() {
     const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews)
 



    useEffect(() => {
      dispatch(getOwnerReviews());
    }, [dispatch]);

    if(!reviews) return null
  return (
    <div>
      <div>
        Reviews
        {Object.values(reviews).map((review) => (
          <div key={review.id}>
              <div>
                  <button 
                  onClick={(e) => dispatch(deleteReview(review.id))}
                  >Delete Your Review</button>
              </div>
            {review.review}
          </div>
        ))}
      </div>
    </div>
  );
}

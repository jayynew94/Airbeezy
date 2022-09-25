import { useSelector } from "react-redux";
import { deleteReview, getOwnerReviews } from "../../store/Reviews";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import "./ownerReview.css";

export default function GetReviews() {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getOwnerReviews());
  }, [dispatch]);

  if (!reviews) return null;
  return (
    <div>
      <div>
        <h1 className="yourReview">Your Reviews</h1>
        <div className="reviewGrid">
          {Object.values(reviews).map((review) => (
            <div key={review.id}>
              <div>
                <button className="deleteReview"onClick={(e) => dispatch(deleteReview(review.id))}>
                  Delete Your Review
                </button>
              </div>

              <div className="reviewPage">
                Review By: {review.User?.firstName}
              </div>
              <div className="reviewPage">Aug 2022</div>
              <div className="reviewReview">{review.review}</div>
              <div id="Starpower" className="fas fa-solid fa-star">{review.stars}
              </div>
              {/* {review.review} */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

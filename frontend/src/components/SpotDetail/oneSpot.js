import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotId } from "../../store/Spots";
import { NavLink } from "react-router-dom";
import { deleteSpot } from "../../store/Spots";
import { useHistory } from "react-router-dom";
import "./spotdetail.css";
import Reviews from "../ReviewComponent/Review";

import { getAllReviews } from "../../store/Reviews";

const SpotDetail = () => {
  const { spotId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const spot = useSelector((state) => state.spots[spotId]);

  const user = useSelector((state) => state.session.user);
  const review = useSelector((state) => state.reviews);
 console.log()

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpot(spotId));
    history.push("/");
  };

  useEffect(() => {
    dispatch(getSpotId(spotId))
    dispatch(getAllReviews(spotId));

  }, [dispatch, spotId]);

  if (!spot || !spot.SpotImages) {
    return <h1>Loading</h1>;
  }

const ownerUser = (user && user.id === spot.ownerId)


  return (
    <div key={spot} className="MainDiv">
      <div>
        <h1>{spot?.name}</h1>
        <h4 className="fas fa-solid fa-star">
          {" "}
          &nbsp;
          {spot?.avgRating} &nbsp;<span className="space">·</span> {spot?.city},{" "}
          {spot?.state}, {spot?.country}
        </h4>

        <div>
          {spot.SpotImages.map((image) => {
            return (
              <div key={image.id}>
                <img className="spotImage" src={image.url} alt="spot Homes" />
              </div>
            );
          })}
        </div>

        <div className="rightDiv">
          <div className="textBlock">
            <div className="hosteddiv"> HOSTED BY: {spot?.Owner.firstName} </div>
            <div className="descriptiondiv">
              Description: {spot?.description}
            </div>

            <div className="cancellation">FREE CANCELLATION FOR 48 HOURS</div>
            <div className="para">
              <div className="parapadding">
                Every booking includes free protection from Host cancellations,
                listing inaccuracies, and other issues like trouble checking in.
              </div>
              <hr className="borderBox"></hr>
            </div>
          </div>

          <div className="reviewcard">
            <div className="pricediv">
              <div>
                <span className="BigPrice">${spot?.price}</span> night
              </div>
              <div className="fas fa-solid fa-star">
                &nbsp; {spot?.avgRating}
              </div>
            </div>

            {ownerUser && (
              <div key={spot} className="twoBtn">
                <button className="deleteBtn" onClick={(e) => handleDelete(e)}>
                  Delete Your Spot
                </button>
                &nbsp;
                <NavLink to={`/spots/${spot.id}/edit`}>
                  <button className="editsbtn">click me to edit</button>
                </NavLink>
              </div>
            )}
            <div className="priceText">Available Soon</div>
            <div className="priceText">Cleaning Fee: $100</div>
            <div>
              {!ownerUser && (
                <div key={spot}>
                  <NavLink to={`/spots/${spot.id}/reviews`}>
                    <button className="review-btn">Leave a Review</button>
                  </NavLink>
                </div>
              )}
              <div className="total-text">Total:$450.36</div>
            </div>
          </div>
        </div>
      </div>

      <div className="reviewSpace">
        <Reviews key={review} review={review} />
      </div>
    </div>
  );

};

export default SpotDetail;

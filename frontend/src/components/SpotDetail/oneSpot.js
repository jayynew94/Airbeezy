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
  console.log(spot, "this is SPOT!!!!!!!!!!")
  const user = useSelector((state) => state.session.user);
  const review = useSelector((state) => state.reviews);
 

  const handleDelete = async (e) => {
    e.preventDefault();
    await dispatch(deleteSpot(spotId));
    history.push("/");
  };

  useEffect(() => {
    dispatch(getSpotId(spotId))
    dispatch(getAllReviews(spotId));

  }, [dispatch, spot]);

  if (!spot || !spot.SpotImages) {
    return <h1>Loading</h1>;
  }

const ownerUser = (user && user.id === spot.ownerId)

  return (
    <div className="MainDiv">
      <div>
        <h1>Spot Detail</h1>
        <div>
          {spot.SpotImages.map((image) =>(
            <img className="spotImage" src={image.url} alt ="spot Homes"/>
          ))}
        </div>

        <div className="rightDiv">
          <div>
            <p>{spot?.ownerId}</p>
            <p>{spot?.address}</p>
            <p>{spot?.city}</p>
            <p>{spot?.state}</p>
            <p>{spot?.country}</p>
            <p>{spot?.lat}</p>
            <p>{spot?.lng}</p>
            <p>{spot?.name}</p>
            <p>{spot?.description}</p>
            <p>{spot?.price}</p>
            <p>{spot?.avgRating}</p>
          </div>

          <div className="reviewcard">
            <div className="pricediv">
              <div>{spot?.price} night</div>
              <div>&nbsp; {spot?.avgRating}</div>
            </div>

            {ownerUser && (
              <div>
                <button onClick={(e) => handleDelete(e)}>
                  Delete Your Spot
                </button>
                <NavLink to={`/spots/${spot.id}/edit`}>
                  <button>click me to edit</button>
                </NavLink>
              </div>
            )}
            <div>
              {!ownerUser && (
              <div>
                <NavLink to={`/spots/${spot.id}/reviews`}>
                  <button>Leave a Review</button>
                </NavLink>
              </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <Reviews key={review} review={review} />
        </div>
      </div>
    </div>
  );

};

export default SpotDetail;

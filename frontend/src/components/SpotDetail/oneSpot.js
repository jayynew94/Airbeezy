import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotId } from "../../store/Spots";
import { NavLink } from "react-router-dom";
import { deleteSpot } from "../../store/Spots";
import { useHistory } from "react-router-dom";




const SpotDetail = () => {
  const { spotId } = useParams();
  const history = useHistory()
  const dispatch = useDispatch()
  console.log(spotId, "spotId from params")

  const spot = useSelector((state) => state.spots[spotId]);
   const user = useSelector((state) => state.session.user);

   const handleDelete = async(e) =>{
     e.preventDefault()
    await dispatch(deleteSpot(spotId))
    history.push('/')
   }

  // useEffect(() => {
  //   dispatch(getSpotId(spotId));
  // }, [spotId, dispatch]);

  if(!spot){ return (
      <h1>loading</h1>
  )
  }
  return (
    <div>
      <h1>Spot Detail</h1>
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
      <p>{spot?.previewImage}</p>
      {user && (
        <div>
          <button onClick={(e) => handleDelete(e)}>Delete Your Spot</button>
          <NavLink to={`/spots/${spot.id}/edit`}>
            <button>click me to edit</button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default SpotDetail;

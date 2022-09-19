import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSpotId } from "../../store/Spots";

const SpotDetail = () => {
  const { spotId } = useParams();
  const allParams = useParams();
  console.log(allParams,'this is all params')
  console.log(spotId, "spotId from params")

  const spot = useSelector((state) => state.spots[spotId]);
  const dispatch = useDispatch();

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
      <p>{spot.ownerId}</p>
      <p>{spot.address}</p>
      <p>{spot.city}</p>
      <p>{spot.state}</p>
      <p>{spot.country}</p>
      <p>{spot.lat}</p>
      <p>{spot.lng}</p>
      <p>{spot.name}</p>
      <p>{spot.description}</p>
      <p>{spot.price}</p>
      <p>{spot.avgRating}</p>
      <p>{spot.previewImage}</p>
    </div>
  );
};

export default SpotDetail;

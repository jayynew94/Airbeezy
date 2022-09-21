

import { Link } from "react-router-dom";
import './Spotcards.css'

export default function SpotCards({spot}){
  
    return (
      <>
        {spot && (
          <div>
            <div className="SpotImages" key={spot?.id}>
              <Link className="link" to={`/spots/${spot?.id}`}>
                <img
                  className="SpotImages"
                  src={spot.previewImage}
                  alt="basketball"
                />
                <div className="detailcontainer">
                  <div className="spotText">
                    <p>
                      {spot?.city}, {spot?.state}
                    </p>
                    <p className="rating">{spot?.avgRating}</p>
                  </div>

                  <div className="bottomcard">
                    <p>{spot?.name}</p>
                    <p>{spot?.description}</p>
                    <p>{spot?.price} night</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </>
    );
}


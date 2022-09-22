

import { Link } from "react-router-dom";
import './Spotcards.css'

export default function SpotCards({spot}){
  
    return (
      <>
        {spot && (
          <div>
            <div className="SpotImages" key={spot?.id}>
              <Link className="link" to={`/spots/${spot?.id}`}>
                <div>
                  <img
                    className="SpotImages"
                    src={spot.previewImage}
                    alt="basketball"
                  />
                </div>
                <div className="detailcontainer">
                  <div className="spotText">
                    <div>
                      {spot?.city}, {spot?.state}
                    </div>
                    <div className="rating">{spot?.avgRating}</div>
                  </div>

                  <div className="details">
                    <div className="detailText">
                      {spot?.name}
                      </div>
                    <div className="detailText">
                      {spot?.description}
                    </div>
                    <div className="priceDet">
                      <span className="price">${spot?.price}</span> night
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </>
    );
}


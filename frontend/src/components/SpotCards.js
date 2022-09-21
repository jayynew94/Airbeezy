

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
                      <span className="cardDetail">
                    <p className="pTag2">{spot?.name}</p>
                    <p className="pTag">{spot?.description}</p>
                    </span>
                    <p><span className="price">${spot?.price}</span> night</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        )}
      </>
    );
}


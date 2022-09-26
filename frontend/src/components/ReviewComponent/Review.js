import './review.css'



export default function Reviews({review}){
    
  if(review.stars === 0){
    review.stars = "No Reviews Yet"
  }

    return (
      <div>
        {review.stars}
        <div>
          <h2 className='Bottom-page'>REVIEWS</h2>
          {Object.values(review).map((review) => (
            <div className="starBlock" key={review.id}>
              <div className="nameDiv">Review By: {review.User?.firstName}</div>
              <div id="Aug"className="nameDiv">Aug 2022</div>
              <div className="nameDiv">{review.review}</div>
             
              <div id="StarId" className="fas fa-solid fa-star">
                {review.stars}
              </div>
            </div>
          ))}
        </div>
      </div>
    );


}
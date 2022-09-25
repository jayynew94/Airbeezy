import './review.css'



export default function Reviews({review}){
    

 
    
    return (
      <div>
        {review.stars}
        <div>
          <h2 className='Bottom-page'>REVIEWS</h2>
          {Object.values(review).map((review) => (
            <div className="starBlock" key={review.id}>
              <div className="nameDiv">Review By: {review.User?.firstName}</div>
              <div className="nameDiv">Aug 2022</div>
              <div className="nameDiv">{review.review}</div>
              <div>{console.log(review)}</div>
              <div id="StarId" className="fas fa-solid fa-star">
                {review.stars}
              </div>
            </div>
          ))}
        </div>
      </div>
    );


}
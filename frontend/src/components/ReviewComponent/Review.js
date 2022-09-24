



export default function Reviews({review}){
    

 
    
    return (
      <div>
        {Object.values(review).map((review) => (
          <div key={review.id}>
            <i className="fas fa-solid fa-star"></i> {review.stars}
            
            {review?.User.firstName}
            <div>{review.review}</div>
          </div>
        ))}
      </div>
    );


}
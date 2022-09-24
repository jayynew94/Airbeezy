


export default function Reviews({review}){
    

 
    
    return (
      <div>
        <div></div>
        {Object.values(review).map((review) => (
          <div key={review.id}>
            <i className="fas fa-solid fa-star"></i> {review.stars}
            <div>{review.review}</div>
          </div>
        ))}
      </div>
    );


}
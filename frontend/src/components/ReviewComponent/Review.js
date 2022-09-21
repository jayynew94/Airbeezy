import { useSelector } from "react-redux"


export default function Reviews({review}){
    
const user = useSelector(state=> state.session.user)
    
    return (
      <div>
        <div>
          Reviews
          {Object.values(review).map((review) => (
            <div key={review.id}>
              <div key={review.id}>{user.firstName} {user.lastName}</div>
              {review.review}
            </div>
          ))}
        </div>
      </div>
    );


}
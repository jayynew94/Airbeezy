import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import { getAllSpots } from '../../store/Spots'
import { NavLink } from 'react-router-dom'


const SpotComponent = () =>{
    const dispatch = useDispatch();
    

    useEffect(() =>{
        dispatch(getAllSpots());
    },[dispatch])

     const spots = useSelector((state) => state.spots.spotlist);
     const user = useSelector((state) => state.session.user)

    if(!spots){
        return null
    }

    const spotlist = spots.map((spot) =>{
        return (    
            <div key={spot.id}>   
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
            <NavLink to={`/spots/${spot.id}`}>
            {spot.previewImage}
            </NavLink>
            </div>   
            )
    })

    return (
        <div>
            <h1>AllSpots</h1>
            {spotlist}
            {user && (
                <div>
                click me to edit
                </div>
            )}
        </div>
    )
}

export default SpotComponent
import {useSelector} from 'react-redux'
import {useDispatch} from 'react-redux'
import {useEffect} from 'react'
import { getAllSpots } from '../../store/Spots'
import SpotCards from '../SpotCards'
import './getSpots.css'



const SpotComponent = () =>{
    const dispatch = useDispatch();
    

    useEffect(() =>{
        dispatch(getAllSpots());
    },[dispatch])

     const spots = useSelector((state) => Object.values(state.spots));
     console.log(spots, "this is getallspots")
     
    if(!spots){
        return null
    }

    const spotlist = spots.map((spot) =>(<SpotCards spot={spot} />))

    return (
        
        <div>
            <h1>AllSpots</h1>
            <div className='cards'>
            {spotlist}
            </div>
        </div>
    )
}

export default SpotComponent
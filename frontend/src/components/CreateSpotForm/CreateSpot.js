 import {  useEffect, useState } from "react";
 import { useDispatch, useSelector } from "react-redux";
 import { useHistory } from "react-router-dom";
 import { spotForm } from "../../store/Spots";


 const CreateSpotForm = () => {
     const user = useSelector(state => state.session.user)
     const dispatch = useDispatch();
     const history = useHistory();
  
     
     const [ownerId, setOwnerId] = useState(null)
     const [address, setAdress] = useState("")
     const [city, setCity] = useState("")
     const [country, setCountry] = useState("");
     const [description, setDescription] = useState("");
     const [lat, setLat] = useState("");
     const [lng, setLng] = useState("");
     const [name, setName] = useState("");
     const [price,setPrice] = useState("");
     const [state, setState] = useState("");
     const [ValidationErrors, setValidationErrors] = useState([])
     const [hasSubmitted, setHasSubmitted] = useState(false)
     
        useEffect(()=>{
            const errors = []
              if(!user) errors.push("Please Log In")
              if(!address)errors.push("Please Enter an Address")
              if(!city)errors.push("Please Enter a City")
              if(!state) errors.push("Please Enter a State");
              if(!country) errors.push("Please Enter a Country")
              if(!description)errors.push("Please Enter a Description")
              if(!lat)errors.push("Please Enter Latitude")
              if(!lng)errors.push("Please Enter Longitude")
              if(!name)errors.push("Please Enter a Spot Name")
              if(name.length > 50) errors.push("Name Exceeds Character Limit")
              if(!price)errors.push("Price Per Day is Required")
     
               
              setValidationErrors(errors)
              
                if(user)setOwnerId(user?.id)   
        },[user, address, city, country, description, lat, lng, name, price, state])

    
     const updateAddress = (e) => setAdress(e.target.value)
     const updateCity = (e) => setCity(e.target.value);
     const updateCountry = (e) => setCountry(e.target.value);
     const updateDescription = (e) => setDescription(e.target.value);
     const updateLat = (e) => setLat(e.target.value);
     const updateLng = (e) => setLng(e.target.value);
     const updateName = (e) => setName(e.target.value);
     const updatePrice = (e) => setPrice(e.target.value);
     const updateState = (e) => setState(e.target.value);

       const handleSubmit = async (e) => {
         e.preventDefault();

        setHasSubmitted(true)
        if(ValidationErrors.length) return alert(`Cannot Submit`)

         const payload = {
            ownerId,
            address,
            city,
            country,
            description,
            lat,
            lng,
            name,
            price,
            state
         };

         let createdSpot = await dispatch(spotForm(payload));
         if (createdSpot) {
           history.push(`/spots/${createdSpot.id}`);
         }
       };



       return (
         <div>
             {!user && (
                 <h1>Please Sign In</h1>
             )}
           {user && (
             <div>
               <form onSubmit={handleSubmit}>
                 <h1>Create a Spot</h1>
                 {ValidationErrors.length > 0 && (
                   <div>
                     The following errors were found:
                     <ul>
                       {ValidationErrors.map((error) => (
                         <li key={error}>{error}</li>
                       ))}
                     </ul>
                   </div>
                 )}
                 <input
                   type="text"
                   placeholder="Address"
                   value={address}
                   onChange={updateAddress}
                 />
                 <input
                   type="text"
                   placeholder="City"
                   value={city}
                   onChange={updateCity}
                 />
                 <input
                   type="text"
                   placeholder="State"
                   value={state}
                   onChange={updateState}
                 />
                 <input
                   type="text"
                   placeholder="Country"
                   value={country}
                   onChange={updateCountry}
                 />
                 <input
                   type="text"
                   placeholder="Description"
                   value={description}
                   onChange={updateDescription}
                 />
                 <input
                   type="text"
                   placeholder="Lat"
                   value={lat}
                   onChange={updateLat}
                 />
                 <input
                   type="text"
                   placeholder="Lng"
                   value={lng}
                   onChange={updateLng}
                 />
                 <input
                   type="text"
                   placeholder="Name"

                   value={name}
                   onChange={updateName}
                 />
                 <input
                   type="number"
                   placeholder="Price"
                   value={price}
                   onChange={updatePrice}
                 />
               </form>
               <button onClick={handleSubmit}>Submit</button>
             </div>
           )}
         </div>
       );
 }

 export default CreateSpotForm;
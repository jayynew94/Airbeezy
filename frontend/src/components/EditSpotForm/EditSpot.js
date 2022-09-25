import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editSpot, getSpotId } from "../../store/Spots";
import { useHistory } from "react-router-dom";
import './editspot.css'

const EditSpotForm = () =>{
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const history = useHistory();
  
   const id =parseInt(spotId)
  const spot = useSelector((state) => state.spots[id]);
  const user = useSelector((state) => state.session.user);

  const [ownerId, setOwnerId] = useState(null);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [ValidationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);

  useEffect(()=>{
setAddress(spot.address)
setCity(spot.city)
setState(spot.state)
setCountry(spot.country)
setDescription(spot.description)
setName(spot.name)
setPrice(spot.price)
  },[spot])

useEffect(() => {
  dispatch(getSpotId(parseInt(spotId))).then((res)=>{
    console.log(res,spotId,"this is RES")
  }).catch(res => console.log(res,"this is catch res"))
},[dispatch])

  useEffect(() => {
    
    const errors = [];
    if (!user) errors.push("Please Log In");
    if (!address) errors.push("Please Enter an Address");
    if (!city) errors.push("Please Enter a City");
    if (!state) errors.push("Please Enter a State");
    if (!country) errors.push("Please Enter a Country");
    if (!description) errors.push("Please Enter a Description");
    if (!name) errors.push("Please Enter a Spot Name");
    if (name.length > 50) errors.push("Name Exceeds Character Limit");
    if (!price) errors.push("Price Per Day is Required");

    setValidationErrors(errors);

    if (user) setOwnerId(user?.id);

  }, [user, address, city, country, description, name, price, state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (ValidationErrors.length) return alert(`Cannot Submit`);

    const payload = {
      ...spot,
      ownerId,
      address,
      city,
      country,
      description,
      name,
      price,
      state,
    };

    let updatedSpot = await dispatch(editSpot(payload));
    if (updatedSpot) {
        console.log("MADE IT")
      history.push(`/spots/${updatedSpot.id}`);
    }
  };

  return spot && (
    <div className="editmaindiv">
      {user.id === +ownerId && (
        <form onSubmit={handleSubmit}>
          <div className="editcontainer">
            <h1>Edit a Spot</h1>
          </div>

          {ValidationErrors.length > 0 && (
            <div className="editerrors">
              <ul className="editdots">
                {ValidationErrors.map((error) => (
                  <li className="editText" key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <div className="editpad">
              <input
                className="editinputs"
                type="text"
                placeholder="Address"
                value={address}
                onChange={updateAddress}
              />
            </div>
            <div className="editpad">
              <input
                className="editinputs"
                type="text"
                placeholder="City"
                value={city}
                onChange={updateCity}
              />
            </div>
            <div className="editpad">
              <input
                className="editinputs"
                type="text"
                placeholder="State"
                value={state}
                onChange={updateState}
              />
            </div>
            <div className="editpad">
              <input
                className="editinputs"
                type="text"
                placeholder="Country"
                value={country}
                onChange={updateCountry}
              />
            </div>

            <div className="editpad">
              <input
                className="editinputs"
                type="text"
                placeholder="Description"
                value={description}
                onChange={updateDescription}
              />
            </div>

            <div className="editpad">
              <input
                className="editinputs"
                type="text"
                placeholder="Name"
                value={name}
                onChange={updateName}
              />
            </div>
            <div className="editpad">
              <input
                className="editinputs"
                type="number"
                placeholder="Price"
                value={price}
                onChange={updatePrice}
              />
            </div>
          </div>
          <div className="editpad">
            <button className="edit-btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
export default EditSpotForm
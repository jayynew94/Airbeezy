import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { spotForm } from "../../store/Spots";
import "./createspot.css";

const CreateSpotForm = () => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [ownerId, setOwnerId] = useState(null);
  const [address, setAdress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [state, setState] = useState("");
  const [image, setImage] = useState("");
  const [ValidationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = [];
  
    if (!user) errors.push("Please Log In");
    if (!address) errors.push("Please Enter an Address");
    if (!city) errors.push("Please Enter a City");
    if (!state) errors.push("Please Enter a State");
    if (!country) errors.push("Please Enter a Country");
    if (!description) errors.push("Please Enter a Description");
    if (!name) errors.push("Please Enter a Spot Name");
    if (name.length > 26) errors.push("Name Exceeds Character Limit");
    if (!price) errors.push("Price Per Day is Required");
    if(isNaN(price))errors.push("Price should be a number")
       if (
         !image.endsWith(".jpg") &&
         !image.endsWith(".png") &&
         !image.endsWith(".jpeg")
       ) {
         errors.push("Please provide a valid image");
       }
        
    setValidationErrors(errors);

    if (user) setOwnerId(user?.id);
  }, [user, address, city, country, description,  name, price, state, image]);

  const updateAddress = (e) => setAdress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateImage = (e) => setImage(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setHasSubmitted(true);
    if (ValidationErrors.length) return alert(`Cannot Submit`);

    const payload = {
      ownerId,
      address,
      city,
      country,
      description,
      name,
      price,
      state,
      url: image,
    };

    let createdSpot = await dispatch(spotForm(payload));
    if (createdSpot) {
      history.push(`/spots/${createdSpot.id}`);
    }
  };

  return (
    // <div className="subDiv">
    <div className="expandDiv">
      <form onSubmit={handleSubmit}>
        {!user && <h1>Please Sign In</h1>}
        <div className="title">
          <h1>Create a Spot</h1>
        </div>
        {ValidationErrors.length > 0 && (
          <div className="errorcenter">
            <ul className="createspotdots">
              {ValidationErrors.map((error) => (
                <li className="errortext"key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="inputElement">
          <div className="createspot-input">
            <input
              className="inputs"
              type="text"
              placeholder="Address"
              value={address}
              min={5}
              onChange={updateAddress}
            />
          </div>
          <div className="createspot-input">
            <input
              className="inputs"
              type="text"
              placeholder="City"
              value={city}
              onChange={updateCity}
            />
          </div>
          <div className="createspot-input">
            <input
              className="inputs"
              type="text"
              placeholder="State"
              value={state}
              onChange={updateState}
            />
          </div>
          <div className="createspot-input">
            <input
              className="inputs"
              type="text"
              placeholder="Country"
              value={country}
              onChange={updateCountry}
            />
          </div>
          <div className="createspot-input">
            <input
              className="inputs"
              type="text"
              placeholder="Description"
              value={description}
              onChange={updateDescription}
            />
          </div>
          <div className="createspot-input">
            <input
              className="inputs"
              type="text"
              placeholder="Name"
              value={name}
              onChange={updateName}
            />
          </div>
          <div className="createspot-input">
            <input
              className="inputs"
              type="text"
              placeholder="Price"
              value={price}
              onChange={updatePrice}
            />
          </div>
          <div className="createspot-input">
            <input
              className="inputs"
              type="text"
              placeholder="Image"
              value={image}
              onChange={updateImage}
            />
          </div>

          <div className="createspot-input">
            <button className="createspotbtn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
    // </div>
  );
};

export default CreateSpotForm;

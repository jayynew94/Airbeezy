// frontend/src/App.js
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import SpotComponent from "./components/SpotComponent/getSpots";
import SpotDetail from "./components/SpotDetail/oneSpot";
import { getAllSpots } from "./store/Spots";
import '../src/components/Navigation/navigation.css'
import CreateSpotForm from "./components/CreateSpotForm/CreateSpot";
import EditSpotForm from "./components/EditSpotForm/EditSpot";
import CreateReviewForm from "./components/CreateReviewForm/CreateReview";
import OwnerSpots from "./components/OwnerSpots/OwnerSpots";
import GetReviews from "./components/OwnerReviews/OwnerReviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
   
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation className="nav" isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <SpotComponent />
          </Route>
          <Route path="/newspot">
            <CreateSpotForm />
          </Route>
          <Route exact path="/spots/current">
            <OwnerSpots />
          </Route>
          <Route path="/reviews/current">
          <GetReviews />
          </Route>
          <Route exact path="/spots/:spotId">
            <SpotDetail />
          </Route>
          <Route path="/spots/:spotId/edit">
            <EditSpotForm />
          </Route>
          <Route path="/spots/:spotId/reviews">
            <CreateReviewForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

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


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(getAllSpots())
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

          <Route path="/spots/:spotId">
            <SpotDetail />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;

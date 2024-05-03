import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux"
import ReduxStore from "./ReduxStore";
import {positions,transitions,Provider as AlertProvider} from "react-alert"

import AlertTemplate from "react-alert-template-basic"



import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from "@stripe/stripe-js" 

const options ={
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transition:transitions.SCALE
}

const options2 = {
  // passing the client secret obtained from the server
  clientSecret: '{{sk_test_51LqbsDSEXYJYfw16xB2Ki9mhvjcgMoIbU15iGVDsbWeGGOZ2TevnDlbhLZjN8F4bKby4CkWyabWlA3V7VXDhqpXv00RgOTba2d}}',
};

const stripePromise = loadStripe("pk_test_51LqbsDSEXYJYfw16PPnMORYOPWJakqmNjH2k0ihYZ7cGOsSAB62VxMnrF6ZTvSjiMuPaUkU2FO2FtQqn1Utx4OXi00WHQjlNz2")

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store={ReduxStore}>
    <AlertProvider template={AlertTemplate} {...options}>
    <Elements stripe={stripePromise} >
    <App />
    </Elements>
    </AlertProvider>
  </Provider>
  
);


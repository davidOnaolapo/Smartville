import {useState, useEffect} from "react";
import axios from 'axios';

import { checkForUser } from "../helpers/dataOrganisers"
import { removeProductFromRecs } from "../helpers/selectors"
import { API_URL } from "../constants"

const LOADING = "LOADING"

export default function useApplicationData () {
  const [products, setProducts] = useState([]);
  const [rooms, setRooms] = useState({});
  const [hasProductStore, setProductStore] = useState([]);
  const [surveys, setSurveys] = useState({});
  const [username, setUsername] = useState("");
  const [recommendations, setRec] = useState([]);
  const [recommendationsAnon, setRecAnon] = useState([]);
  const [isloggedin, setloggedin] = useState(null);
  const [ modeNao, transitionNao ] = useState(LOADING)

  useEffect(() => {
    //Load all the data from the database when the page loads
    Promise.all([
      axios.get(`${API_URL}/products`),
      axios.get(`${API_URL}/rooms`),
      axios.get(`${API_URL}/productInStore`)

    ]).then((all) => {
      setProducts(all[0].data);
      console.log("this is form useapp",products)
      setRooms(all[1].data);
      setProductStore(all[2].data);
    });
  },[])

  useEffect(() => {
    //Load Recommendations
    if (checkForUser()) {
      axios.post(`${API_URL}/grabResults`, checkForUser())
        .then((res) => {
          console.log("GRABBING RESULTS YO", res)
          setRec(res.data)
        })
    } else {
      //Redirect to homepage
    }
  },[])

  useEffect(() => {
    //Load Recommendations
      axios.get('https://api.thecatapi.com/v1/images/search?breed_ids=beng')
        .then((res) => {
          console.log("GRABBING RESULTS FOR CATS YO", res)
        })
  },[])

  const submitSurveyUser = (surveyData) => {

    console.log("IN SUBMIT SURVEY", surveyData)

    // send data to the backend
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/surveyData`, surveyData)
      .then((res) => {
        // const survey = {
        // }
        // setState({
        //   // ...state,
        //   // survey
        // })
        console.log("GOT BACK A MESSAGE SUBMIT SURVEY")
        console.log("MESSAGE IS", res)
        setRec(res.data);
        return resolve(res);
      })
      .catch((err) => {
        return reject(console.log(err.message))
      })
    })
  }

  const submitSurveyAnon = (surveyDataAnon) => {

    console.log("IN SUBMIT SURVEY", surveyDataAnon)

    // send data to the backend
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/surveyDataAnon`, surveyDataAnon)
      .then((res) => {
        // const survey = {
        // }
        // setState({
        //   // ...state,
        //   // survey
        // })
        console.log("GOT BACK A MESSAGE SUBMIT SURVEY ANON")
        console.log("MESSAGE IS", res)
        setRecAnon(res.data);
        return resolve(res);
      })
      .catch((err) => {
        return reject(console.log(err.message))
      })
    })
  }

  //Delete the appointment from the db, then update the state of the app
  const gotProductHome = (addProdData) => {
    console.log("IN GET PRODUCT HOME")
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/addProductHome`, addProdData)
      .then((res) => {
        console.log("GOT BACK A MESSAGE GOT PROD IN HOME")
        return resolve(console.log(res));
      })
      .catch((err) => {
        return reject(console.log(err.message));
      })
    })
  }

  const removeProductHome = (removeProdData) => {
    console.log("IN REMOVE PRODUCT HOME")

    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/deleteProductHome`, removeProdData)
      .then((res) => {
        console.log("GOT BACK A MESSAGE REMOVE PROD FROM HOME")
        return resolve(console.log(res));
      })
      .catch((err) => {
        return reject(console.log(err.message));
      })
    })
  }

  const deleteRecommendation = (removeRecData) => {
    console.log("****TO BE DELETED ***", removeRecData);
    return new Promise((resolve, reject) => {
      axios.post(`${API_URL}/removeRecommendation`, removeRecData)
      .then((res) => {
        console.log("SUCCESSFUL DELETE") 
        setRec(recs => removeProductFromRecs(recs, removeRecData.product_id)); 
        return resolve(res.data);
      })
      .catch((err) => {
        return reject(err.message);
      })
    })
  }

  const switchSurvey = (id) => {
      console.log("IN SWITCH SURVEY")

    // return new Promise((resolve, reject) => {
    //   axios.post()
    //   .then((res) => {
    //     const survey = {
    //     }
    //     setState({
    //       ...state,
    //       survey
    //     })
    //     return resolve(console.log(res));
    //   })
    //   .catch((err) => {
    //     return reject(console.log(err.message));
    //   })
    // })
  }

  return {
    products,
    rooms,
    surveys,
    username,
    hasProductStore,
    setUsername,
    setRec,
    modeNao,
    transitionNao,
    recommendations,
    recommendationsAnon,
    submitSurveyAnon,
    submitSurveyUser,
    gotProductHome,
    removeProductHome,
    deleteRecommendation,
    switchSurvey,
    isloggedin,
    setloggedin
  }
}
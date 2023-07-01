// index.html
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';


import theme from "../styles/theme";
import {ThemeProvider } from "@mui/material/styles";

import styles from "../styles/Home.module.css";


import axios from "axios";




export default function HomePage() {


  const [status, setStatus] = useState("Start");

  const [occupations, setOccupations] = useState([]);
  const [states, setStates] = useState([]);

  const [submitButtonPressed, setSubmitButtonPressed] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [occupation, setOccupation] = useState("");
  const [state, setState] = useState("");

  const [nameCorrect, setNameCorrect] = useState(true);
  const [emailCorrect, setEmailCorrect] = useState(true);
  const [passwordCorrect, setPasswordCorrect] = useState(true);
  const [occupationCorrect, setOccupationCorrect] = useState(true);
  const [stateCorrect, setStateCorrect] = useState(true);

  const [ruleValid1, setRuleValid1] = useState(true);
  const [ruleValid2, setRuleValid2] = useState(true);
  const [ruleValid3, setRuleValid3] = useState(true);
  const [ruleValid4, setRuleValid4] = useState(true);
  const [ruleValid5, setRuleValid5] = useState(true);



  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);


  const checkName = () => {
    setNameCorrect(true);
    if (name === "") {
      setNameCorrect(false);
      return false;
    }
    return true;
  }

  // check if email address is valid
  const checkEmail = () => {
    setEmailCorrect(true);
    if (email === "" || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
      setEmailCorrect(false);
      return false;
    }
    return true;
  }

  // check if the password follow certain rules
  const checkPassword = () => {
    setPasswordCorrect(true);
    let resRule1 = password.length >= 8;
    let resRule2 = /[0123456789]/.test(password);
    let resRule3 = /[abcdefghijklmnopqrstuvwxyz]/.test(password);
    let resRule4 = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/.test(password);
    let resRule5 = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);
    setRuleValid1(resRule1);
    setRuleValid2(resRule2);
    setRuleValid3(resRule3);
    setRuleValid4(resRule4);
    setRuleValid5(resRule5);

    if (!resRule1 || !resRule2 || !resRule3 || !resRule4 || !resRule5) {
      setPasswordCorrect(false);
      return false;
    }
    return true;
  }

  const checkOccupation = () => {
    setOccupationCorrect(true);
    if (occupation === "") {
      setOccupationCorrect(false);
      return false;
    }
    return true;
  }

  const checkState = () => {
    setStateCorrect(true);
    if (state === "") {
      setStateCorrect(false);
      return false;
    }
    return true;
  }

  // callback function when submit button clicked
  const handleClickSubmit = () => {
    setSubmitButtonPressed(true)

    if (checkName() & checkEmail() & checkPassword() & checkOccupation() & checkState()) {
      const userData = {
        name: name,
        email: email,
        password: password,
        occupation: occupation,
        state: state
      };
      axios.post("https://frontend-take-home.fetchrewards.com/form", userData).then(response => {
        if (response.status === 201) {
          setStatus("Success");
        } else {
          setStatus("Server Error");
        }

      })
      .catch(error => {
        console.log(error);
      })
    } else {
      setStatus("Fields Incorrect");
    }
  }

  // fetch api when loading
  useEffect(() => {
    axios.get("https://frontend-take-home.fetchrewards.com/form").then(response => {
      setOccupations(response.data.occupations)
      setStates(response.data.states)
    })
    .catch(error => {
      console.log(error)
    })
  }, []);

  useEffect(() => {
    if (submitButtonPressed) {
      checkName();
    }
  }, [name]);

  useEffect(() => {
    if (submitButtonPressed) {
      checkEmail();
    }
  }, [email]);

  useEffect(() => {
    if (submitButtonPressed) {
      checkPassword();
    }
  }, [password]);

  useEffect(() => {
    if (submitButtonPressed) {
      checkOccupation();
    }
  }, [occupation]);

  useEffect(() => {
    if (submitButtonPressed) {
      checkState();
    }
  }, [state]);



  return (
    <ThemeProvider theme={theme}>

      <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", flexWrap: "wrap", height: "100vh", backgroundColor: "GhostWhite" }} >
        <Box sx={{display: "flex", flexDirection: "column", flexWrap: "wrap", p: 2, backgroundColor: "White", boxShadow: 3}} >

          <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
            <h1>Sign up</h1>
          </Box>


          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <TextField sx={{ m: 1, width: "25ch", fieldset: { borderColor: nameCorrect ?"":"red" } }} id="outlined-basic" label="Full Name" variant="outlined" onChange={e => setName(e.target.value)} />
            <TextField sx={{ m: 1, width: "25ch", fieldset: { borderColor: emailCorrect ?"":"red" } }} id="outlined-basic" label="Email" variant="outlined" onChange={e => setEmail(e.target.value)}/>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>

            <FormControl sx={{ m: 1, width: "25ch", fieldset: { borderColor: passwordCorrect?"":"red" } }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
                onChange={e => setPassword(e.target.value)}
              />
            </FormControl>
            {passwordCorrect 
              ? <></>
              :
              <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", flexWrap: "wrap", m: 1 }}>
              <p style={{fontSize: "12px", color: ruleValid1?"green":"red", margin: 0}}>Must be longer than 8 characters</p>
              <p style={{fontSize: "12px", color: ruleValid2?"green":"red", margin: 0}}>Must contain at least one digit</p>
              <p style={{fontSize: "12px", color: ruleValid3?"green":"red", margin: 0}}>Must contain at least one lowercase letter</p>
              <p style={{fontSize: "12px", color: ruleValid4?"green":"red", margin: 0}}>Must contain at least one uppercase letter</p>
              <p style={{fontSize: "12px", color: ruleValid5?"green":"red", margin: 0}}>Must contain at least one special character</p>

            </Box>}


          </Box>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>

            <TextField
              sx={{ m: 1, width: "25ch", fieldset: { borderColor: occupationCorrect?"":"red" } }}
              id="occupation"
              select
              label="Occupation"
              onChange={e => setOccupation(e.target.value)}
            >
              {occupations.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              sx={{ m: 1, width: "25ch", fieldset: { borderColor: stateCorrect?"":"red"} }}
              id="state"
              select
              label="State"
              onChange={e => setState(e.target.value)}
            >
              {states.map((option) => (
                <MenuItem key={option.name} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

          </Box>
          <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", m: 1 }}>
            <Button variant="contained" onClick={handleClickSubmit}>
              Submit
            </Button>
            
          </Box>

          {
            status == "Fields Incorrect" 
            ?
            <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", m: 1}}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Please make sure all the fields are correct! — <strong>check it out!</strong>
              </Alert>
            </Box>
            : null
          } 
          {
            status == "Server Error"
            ?
            <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", m: 1}}>
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Server error! — <strong>Please try again later!</strong>
              </Alert>
            </Box>   
            : null
          }
          {
            status == "Success"
            ?
            <Box sx={{ display: "flex", justifyContent: "center", flexWrap: "wrap", m: 1}}>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Submitted successfully!
              </Alert>
            </Box>
            : null
          }

        </Box>
      


      </Box>
    </ThemeProvider>
  );
}

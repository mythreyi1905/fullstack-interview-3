import { useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom";
import VirtualizedList from "../components/VirtualizedList";

import { Typography, Button, TextField, InputAdornment, IconButton,  } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import "../styles/ListView.scss"
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { getAllUsersAsync, getUserByFirstNameAsync } from "../app/PageStatusSlice";

import debounce from 'lodash.debounce';

function ListView(){


    const people = useSelector((state:RootState) => state.counter.personsData);

    const person = useSelector((state:RootState) => state.counter.globalPerson);

    const [searchTerm, setSearchTerm] = useState<string>("");
    
    const fetchByFlag = (individualUser:boolean, firstName:string) => {
        if(individualUser){
            dispatch(getUserByFirstNameAsync(firstName))
        } else {
            dispatch(getAllUsersAsync());
        }
    }

    const debouncedChangeHandler = useMemo(
        () => debounce(fetchByFlag, 500)
      , []);
      
    const checkForFirstName = (change:string) => {
        setSearchTerm(change);
        if(change==""){
            debouncedChangeHandler(false, "");
        } else {
            debouncedChangeHandler(true, change);
        }
        
    }


    // const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

    const history = useHistory();

    const dispatch = useDispatch<AppDispatch>();

    useEffect(()=>{
        dispatch(getAllUsersAsync());

        return () => {
            debouncedChangeHandler.cancel();
          }
          
    },[])

    return <section className="wrapper"> 

        <section className="header">
            <Typography variant="h3" sx={{'color':'#1976d2'}} >
                    List of all people
            </Typography>
            <div className="searchBarContainer">
            <TextField
                value={searchTerm}    
                id="outlined-start-adornment"
                sx={{ m: 0, width: '25ch', display:'flex', alignItems:'center' }}
                onChange={(ch) => checkForFirstName(ch.target.value)}
                InputProps={{
                    startAdornment: <InputAdornment position="start"><SearchRoundedIcon sx={{'height':'2rem', 'width':'2rem', }}  /></InputAdornment>,
                    endAdornment: <InputAdornment position="end">    <IconButton
                    aria-label="toggle password visibility"
                    edge="end"
                    onClick={() => checkForFirstName("")}
                  >
                    <HighlightOffIcon sx={{'height':'1rem', }} />
                  </IconButton></InputAdornment>
                    
                }}
                />
            </div>
        </section>
        <VirtualizedList message={ (people.length == 0 && searchTerm == "") ? "No members added yet!" : (people.length == 0 ?  `No user has the first name: ${searchTerm}` : "")} person={person} data={people} />

        <Button variant="contained" disableElevation  onClick={() => history.push("/add")}>
                 Add Person
        </Button>
    </section>
}

export default ListView;

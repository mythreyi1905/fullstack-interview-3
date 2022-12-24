import { TextField, Button, Typography } from '@mui/material';
import { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { addPerson } from '../service/PersonService';



import  "../styles/AddView.scss"

import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react';
import { useDispatch } from 'react-redux';
import { addUserAsync } from '../app/PageStatusSlice';
import { AppDispatch } from '../app/store';
import { idText } from 'typescript';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function AddView(){

    const navigate = useHistory();

    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");

    const [open, setSnackBarOpen] = useState<boolean>(false);

    const dispatch = useDispatch<AppDispatch>();

    /**
     * This function takes in the change value and updates the state of the component
     * @param event ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
     * @param value string | undefined
     */
    const updateName = (event:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, value: string | undefined) => {
        if(value=='first'){
            setFirstName(event.target.value);
        } else {
            setLastName(event.target.value);
        }
    }

    /**
     * This function accesses the first name and the last
     * name of the person and calls the add person method from the person service
     */
    const add = async () => {
        let res = await dispatch(addUserAsync( { person:  {
            id : 0,
            firstName: firstName,
            lastName: lastName,
        } }))

        // console.log(res);

        if(res.payload !== undefined){
            console.log("Succesfully added a person")

            setSnackBarOpen(true);

            setTimeout(() => {
                navigate.push("/");
            }, 1000)
            

        } else {
            console.log("Error in adding person")
        }
    }

    return <section className="wrapper">

            <Snackbar anchorOrigin={{ vertical:'top', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={() => setSnackBarOpen(false)}>
                <Alert onClose={() => setSnackBarOpen(false)} severity="success" sx={{ width: '100%' }}>
                    User added!
                </Alert>
            </Snackbar>

            <section className='header'>

                <Typography variant="h3" sx={{'color':'#1976d2'}} >
                        Add Person
                </Typography>


            </section>

            <section className='fieldsContainer'>
                <TextField autoComplete='off' error={firstName==""} id="outlined-basic" label="First Name" variant="outlined" value={firstName} onChange={(ch) => updateName(ch, 'first')} />
                <TextField autoComplete='off' error={lastName==""} id="outlined-basic" label="Last Name" variant="outlined" value={lastName} onChange={(ch) => updateName(ch, 'last')} />
                <Button variant="contained" disableElevation disabled={firstName == "" || lastName == ""} onClick={add}>
                 Add
                </Button>
                <Button variant="text" disableElevation  onClick={() => {navigate.push("/");}}>
                 Back
                </Button>
            </section>


    </section>;
}

export default AddView;
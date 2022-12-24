
import {ListItemButton, ListItem, ListItemText, Box, Snackbar, Alert, TextField, AlertColor, Typography} from '@mui/material'
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import Person from '../models/Person';

import IconButton from '@mui/material/IconButton';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUserAsync, setDeleteDialogOpenState, setEditDialogOpenState,  setGlobalPersonInfo, updateUserAsync } from '../app/PageStatusSlice';
import AlertDialog from './Alert';
import { AppDispatch, RootState } from '../app/store';
import { useState } from 'react';

import "../styles/VirtualizedList.scss"
 
export default function VirtualizedList({message, person, data}:{message:string, person:Person, data:Person[]}) {

    const dispatch = useDispatch<AppDispatch>();

    const [open, setSnackBarOpen] = useState<boolean>(false);
    const [snackBarMessage, setSnackMessage] =  useState<string>("false");
    const [snackBarSeverity, setSnackSeverity] =  useState<AlertColor>("warning");


    const [openDeleteDialog, firstName, lastName, openEdit] = useSelector((state:RootState) => 
    [state.counter.showDeleteDialog, 
      state.counter.globalPerson.firstName, 
      state.counter.globalPerson.lastName, 
      state.counter.showEditDialog
    ])

    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");



    const handleDeleteResponse = async (proceed:boolean) => {

        dispatch(setDeleteDialogOpenState(false));
        
        if(proceed){
            let success = await dispatch(deleteUserAsync({person:person}));

            console.log(success);

            if(success.payload !== undefined){

                // console.log("Succesfully delete the person")
                setSnackMessage("Succesfully deleted user!")
                setSnackSeverity("warning");
                setSnackBarOpen(true);                
    
            } else {
                setSnackMessage("Error in  deleting user!")
                setSnackSeverity("error");
                setSnackBarOpen(true); 
                // console.log("Error in deleting person")
            }
        } 
    }

    const handleEditResponse = async (proceed:boolean) => {

        dispatch(setEditDialogOpenState(false));


        setEditFirstName("");
        setEditLastName("");  
        
        if(proceed){
            let success = await dispatch(updateUserAsync({person:{
                id: person.id,
                firstName: editFirstName,
                lastName: editLastName
            }}));

            // console.log(success)


            if(success.payload !== undefined){

                // console.log("Succesfully delete the person")
    
                setSnackMessage("Succesfully updated user!")
                setSnackSeverity("success");
                setSnackBarOpen(true);                
    
            } else {
                // console.log("Error in deleting person")
                setSnackMessage("Error in updating user!")
                setSnackSeverity("error");
                setSnackBarOpen(true);     
            }
        }
    }
    



    const renderRow = (props: ListChildComponentProps) =>  {

        const { index, style } = props;

      
        return (
            <>

                <ListItem style={style} key={index} component="div" disablePadding  >
                    <ListItemButton onClick={() => dispatch( setGlobalPersonInfo({ id:data[index].id,  firstName: data[index].firstName, lastName:data[index].lastName }))}>
                        
                    <ListItemText data-testid={`listItem-${index}`} primary={`${data[index].firstName} ${data[index].lastName}`}  />
                    <IconButton onClick={() =>{dispatch(setEditDialogOpenState(true))}} color="primary" sx={{'margin':'0 1rem', 'color':'#1976d2'}} aria-label="Delete person row">
                        <ModeEditOutlineOutlinedIcon sx={{'margin':'0 1rem', 'color':'#1976d2'}} />
                    </IconButton>
                    <IconButton onClick={() =>{dispatch(setDeleteDialogOpenState(true))}} color="primary" sx={{'margin':'0 1rem', 'color':'#1976d2'}} aria-label="Delete person row">
                        <DeleteOutlineIcon />
                    </IconButton>
                    </ListItemButton>
                </ListItem>
            </>
        );
    }

    return (
        <div data-testid="list">

            <Snackbar anchorOrigin={{ vertical:'top', horizontal: 'right' }} open={open} autoHideDuration={6000} onClose={() => setSnackBarOpen(false)}>
                <Alert onClose={() => setSnackBarOpen(false)} severity={snackBarSeverity} sx={{ width: '100%' }}>
                    {snackBarMessage}
                </Alert>
            </Snackbar>


                
            <Typography variant="h5" sx={{'color':'gray'}} >
                    {message}
            </Typography>    

            <Box
            sx={{ width: '100%', height: 400,  bgcolor: 'background.paper' }}
            >
            <FixedSizeList
                height={400}
                width={'100%'}
                itemSize={46}
                itemCount={data.length}
                overscanCount={5}
                
            >
                {renderRow}
            </FixedSizeList>
            </Box>

            <AlertDialog disableYes={false}  openControl={openDeleteDialog} heading={"Delete person ?"} 
            content={`${firstName} ${lastName}`} yes={"Delete"} no={"Cancel"}  responseController={handleDeleteResponse} >{null}</ AlertDialog>
            
            <AlertDialog content={`${firstName} ${lastName}`} disableYes={editFirstName.length == 0 || editLastName.length == 0}  openControl={openEdit} heading={"Edit person details ?"} yes={"Submit"} no={"Cancel"} responseController={handleEditResponse}>
                
                <div className="editModalInputDiv">
                    <TextField error={editFirstName.length == 0} autoComplete='off'  id="outlined-basic" label="First Name" variant="outlined" value={editFirstName} onChange={(ch) => setEditFirstName(ch.target.value)} />
                    <TextField error={editLastName.length == 0}  autoComplete='off' id="outlined-basic" label="Last Name" variant="outlined" value={editLastName} onChange={(ch) => setEditLastName(ch.target.value)}/>
                </div>
            </ AlertDialog> 
            
            
                
            
        </div>

    );
}


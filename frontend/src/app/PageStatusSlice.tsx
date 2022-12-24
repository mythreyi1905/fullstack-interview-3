import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import Person from "../models/Person";
import { addPerson, deletePerson, getAll, getUserByFirstName, updatePerson } from "../service/PersonService";

export interface PageStatus {
    globalPerson: Person;
    showDeleteDialog:boolean;
    showEditDialog:boolean;
    personsData:Person[]
}
  
let initialState: PageStatus = {
    globalPerson:{

    },
    personsData : [],
    showDeleteDialog: false,
    showEditDialog:false,
}

export const getAllUsersAsync = createAsyncThunk(
    'pageStatus/getAllUsers',
    async () => {
        const response = await getAll();
        return response.data;
    }
)

export const getUserByFirstNameAsync = createAsyncThunk(
    'pageStatus/getUserByFirstName',
    async (firstName:string) => {
        const response = await getUserByFirstName(firstName);
        return response.data;
    }
)

export const addUserAsync = createAsyncThunk(
    'pageStatus/addUser',
    async ({person}:{person:Person}) => {
        const response = await addPerson(person);
        return response.data;
    }
)

export const deleteUserAsync = createAsyncThunk(
    'pageStatus/delete',
    async ({person}:{person:Person}) => {
        const response = await deletePerson(person);
        return {data: response.data, id: person.id};
    }
)

export const updateUserAsync = createAsyncThunk(
    'pageStatus/update',
    async ({person}:{person:Person}) => {
        const response = await updatePerson(person);
        return response.data;
    }
)



export const pageStatusSlice = createSlice({
    name: 'pageStatus',
    initialState,
    reducers: {
        updateFirstName: (state, action: PayloadAction<string>) => {
            state.globalPerson.firstName = action.payload;
        },
        setDeleteDialogOpenState: (state, action: PayloadAction<boolean>) => {
            state.showDeleteDialog = action.payload;
        },
        setEditDialogOpenState: (state, action: PayloadAction<boolean>) => {
            state.showEditDialog = action.payload;
        },
        setGlobalPersonInfo: (state, action: PayloadAction<Person>) => {
            const {firstName, lastName, id} = action.payload;
            state.globalPerson.firstName = firstName;
            state.globalPerson.lastName = lastName;
            state.globalPerson.id = id;
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(getAllUsersAsync.fulfilled, (state, action) => {
                state.personsData = [...action.payload];
            }) 
            .addCase(getUserByFirstNameAsync.fulfilled, (state, action) => {
                state.personsData = [...action.payload];
            }) 
            .addCase(addUserAsync.fulfilled, (state, action) => {
                state.personsData = [...state.personsData, action.payload];
            }) 
            .addCase(deleteUserAsync.fulfilled, (state, action) => {
                state.personsData = [...state.personsData.filter(person => person.id !== action.payload.id)];
            }) 
            .addCase(updateUserAsync.fulfilled, (state, action) => {
                
                let person = state.personsData.filter(p => p.id === action.payload.id)[0];
                
                let index = state.personsData.indexOf(person);

                // we need to update state at this index

                state.personsData = [...state.personsData.slice(0, index), action.payload, ...state.personsData.slice(index+1)];
            }) 
            
    }
});

export const { 
    actions: pageStatusActions,
    reducer: pageStatusReducer,
    name: pageStatusSliceKey,
} = pageStatusSlice;

export const { setDeleteDialogOpenState, setGlobalPersonInfo, setEditDialogOpenState } = pageStatusSlice.actions;

export default pageStatusSlice.reducer
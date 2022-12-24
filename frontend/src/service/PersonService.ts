import axios, { AxiosResponse } from "axios";
import Person from "../models/Person";

export const addPerson = async (person:Person) => {

    return await axios.post("http://localhost:8080/add", null, { params: {
        firstName: person.firstName,
        lastName: person.lastName
      }})
    
}



export const deletePerson = async (person:Person) => {

    return await axios.delete(`http://localhost:8080/delete?id=${person.id}&firstName=${person.firstName}&lastName=${person.lastName}`)
}

export const getAll = async () => {
    return await axios("http://localhost:8080/all");
}

export const getUserByFirstName = async (firstName:string) => {
    return await axios(`http://localhost:8080/findByFirstName?firstName=${firstName}`);
}

export const updatePerson = async (person:Person) => {

    return await axios.put("http://localhost:8080/update", null, { params: {
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName
      }})
    
}



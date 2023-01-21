import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
//import DatePicker from '@mui/lab/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { LocalizationProvider } from '@mui/x-date-pickers'
//import DatePicker from '@mui/lab/DatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios'
import { useParams } from 'react-router-dom'


const CreateVehiclePage = () => {
    const { id } = useParams()
    const initialState = {
        vehicle: {
            date: new Date(),
            customerId: 0,
            model: "",
            plaka: "",
            
        },
        alert: {
            show: false,
            content: ""
        },
        customerList: [],
       

    }

    const handleChange = (evt) => {

        let { name, value } = evt.target
        setState({ ...state, vehicle: { ...state.vehicle, [name]: value } })

    }

    const [state, setState] = useState(initialState);


    useEffect(() => {

        const fetchData = async () => {

            const resVehicle = await axios.get(`https://localhost:7259/api/Vehicle/` + id)

            const resCustomers = await axios.get(`https://localhost:7259/api/Customers`)
          
            .catch(error => {
                // console.log(error);
                 throw error;
             });
       
          //  const resStatus = await axios.get(`https://localhost:44357/api/Status`)
            setState({ ...state,  customerList: resCustomers.data, vehicle: resVehicle.data })
       
        };
        
        fetchData();

    }, []);


    return (
        <div>
            <h2>Edit Vehicle Form</h2>
            {state.alert.show && <p>{state.alert.content}</p>}
            <Box sx={{ display: 'block', width: "30%", marginLeft: "35%" }}>
                <TextField label="Model" variant="outlined" type="text"
                    name="model"
                    multiline
                   
                    sx={{ width: '100%' }}
                    value={state.vehicle.model}
                    onChange={handleChange}


            
                />


                <TextField label="Plaka" variant="outlined" type="text"
                    name="plaka"
                    multiline                   
                    sx={{ width: '100%' , marginTop: "18px" }}
                    value={state.vehicle.plaka}
                    onChange={handleChange}
                />

               
                <div style={{ width: "100%", marginTop: "18px", textAlign: "left" }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                           value={state.vehicle.date}
                           label=" Date"

                            inputFormat="dd/MM/yyyy"
                            onChange={(newValue) => {
                                newValue.setHours(newValue.getHours() + 3)
                                setState({ ...state, vehicle: { ...state.vehicle, date: newValue.toISOString() } })
                            }}
                            renderInput={(params) => <TextField {...params} sx={{ width: "100%" }} />}
                        />
                    </LocalizationProvider>
                </div>
                <div style={{display:"flex"}}>
                <Button
                    variant="contained"
                    color="inherit"
                    endIcon={<SendIcon />}
                    sx={{ width: '25%', marginTop: "12px" }}
                    onClick={() => {
                        console.log(state)
                        axios("https://localhost:7259/api/Vehicle/" + id, {
                            method: "PUT",
                            header: { "Context-type": "application/json" },
                            data: state.vehicle
                        })
                            .then(response => {
                                window.location = '/VehicleDetailsPage/'+id;
                             
                            })

                    }}>
                    apply</Button>
                    <div style={{width:"50%"}}></div>
                    <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    color="inherit"
                    sx={{ width: '25%', marginTop: "12px" }}
                    onClick={() => {
                        window.location = '/VehicleDetailsPage/'+id;

                    }}>
                    Cancel</Button>
                    </div>

            </Box>
        </div>
    )
}

export default CreateVehiclePage






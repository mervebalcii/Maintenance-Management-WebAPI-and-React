import React, { useState,useEffect,useContext } from 'react'

import { VehicleContext } from './VehicleContext';
import axios from 'axios'


import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { LocalizationProvider } from '@mui/x-date-pickers'
//import DatePicker from '@mui/lab/DatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { isToday, toDate } from 'date-fns';



const CreateVehiclePage = (props) => {
    const { vehicleAlert,setAlert } = useContext(VehicleContext)
    const initialState = {
        vehicle: {
          //  vehicleId:"",
            date:new Date(),
            customerId:"",
            model:"",
            plaka:"",
            
          },
        alert:{

            show:false,
            content:""
        },
        customerList:[]
    }

    const handleChange = (evt) => {
        
        let {name,value}=evt.target
        setState({...state,vehicle:{...state.vehicle,[name]: value}})
        
    }

    const [state, setState] = useState(initialState);
    

        useEffect(() => {
            const fetchData = async () => {
                const result = await axios.get(`https://localhost:7259/api/Customers`).catch(error => {
                   // console.log(error);
                    throw error;
                });
                setState({...state,customerList:result.data})
                console.log({...state,customerList:result.data})
                
            };
            fetchData();
    
         }, []);



    return (
        <div>
            <h2>New vehicle Form</h2>
            {state.alert.show && <p>{state.alert.content}</p>}
            


            <Box  sx={{ display: 'block', width: "30%", marginLeft: "35%" }}>
            

                <TextField  label="model" variant="outlined" type="text"
                    name="model"
                 //   multiline
                    rows={3}
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                />

            <TextField  label="plaka" variant="outlined" type="text"
                    name="plaka"
                
                    rows={3}
                    sx={{ width: '100%' }}
                    onChange={handleChange}
                />

                
                <div style={{width:"100%",marginTop:"14px",textAlign:"left"}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                            value={state.vehicle.date}
                            label="Date"
                           
                            inputFormat="dd/MM/yyyy"
                            onChange={(newValue)=>{
                                newValue.setHours(newValue.getHours()+3)
                                setState({...state,vehicle:{...state.vehicle,date:newValue.toISOString()}})
                            }}
                            renderInput={(params) => <TextField {...params} sx={{width:"100%"}} />}
                            />
                 </LocalizationProvider>


                 
                </div>




                <FormControl  sx={{marginTop:"12px"}}>
                <InputLabel  id="demo-simple-select-label">Customer</InputLabel >
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={state.vehicle.customerId}
                        label="Customer"
                        onChange={(e)=>{
                            setState({...state,vehicle:{...state.vehicle,customerId:e.target.value}})
                        }}
                        sx={{textAlign:"left"}}
                    >
                        {
                        state.customerList &&
                        state.customerList.map(item =>(
                            <MenuItem  key={item.customerId} value={item.customerId}>{item.cName +item.cLastName }</MenuItem>
                     
                        ))
                        }

                        
                       
                    </Select>

                </FormControl >



               
               
                
                
                <div style={{display:"flex"}}>
                <Button
                    variant="contained"
                    color="inherit"
                    endIcon={<SendIcon />}
                    
                    sx={{ width: '25%', marginTop: "12px" }}
                    onClick={() => {
                        if(state.vehicle.model!=="" && state.vehicle.plaka!=="" &&
                        state.vehicle.customerId!==""){
                        
                            try {

                                axios("https://localhost:7259/api/Vehicle", {
                                    method: "POST",
                                 //   mode: 'cors',
                                    header: {"Content-Type":"application/json" },
                                    data: state.vehicle
                                    
                                })
                                    .then(response => {
                                        
                                        window.location = '/';
                                    })
                            } catch (error) {
                               
                                console.log("Add vehicle Error:", error)
                            }
                        }else{
                            setState({...state,alert:{show:true, type: "error", 
                           
                            content: "Please Fill Form Properly"}})
                            console.log(state.vehicle)

                        }
                        
                    }}>
                    apply</Button>
                    <div style={{width:"50%"}}></div>
                    <Button
                    variant="contained"
                    
                    color="inherit"
                    endIcon={<SendIcon />}
                    
                    sx={{ width: '25%', marginTop: "12px" }}
                    onClick={() => {
                        
                        window.location = '/VehiclePage/';

                    }}>
                    Cancel</Button>
                    </div>
            </Box >
        </div>
    )
}

export default CreateVehiclePage
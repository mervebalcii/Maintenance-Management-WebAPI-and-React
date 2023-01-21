import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button } from '@mui/material';


import FilterListIcon from '@mui/icons-material/FilterList';
function VehicleQueryComp(props) {

    const initialState = {

        selected: 0,
        statusList: [],

    }

    const handleChange = (evt) => {

        let { name, value } = evt.target
        setState({ ...state, [name]: value })

    }
    const [state, setState] = useState(initialState);


    useEffect( () => {

       
        const fetchData = async () => {
            const resStatus = await axios.get(`https://localhost:7259/api/Customers`).catch(error => {
                // console.log(error);
                 throw error;
             });
            setState({ ...state, statusList: resStatus.data })
        };
        fetchData();

            

    }, []);


    return (
        <div style={{display:"flex",width:"100%",justifyContent:"end"}}>
            <FormControl fullWidth sx={{ width:"20%" }}>
                <InputLabel id="demo-simple-select-label">Customer Filter</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={state.selected}
                    label="Vehicle"
                    onChange={(e) => {
                        setState({ ...state, selected: e.target.value })
                    }}
                    sx={{ textAlign: "left" , height:"46px"}}
                >
                    <MenuItem selected key={0} value={0}>All</MenuItem>
                    {
                        state.statusList &&
                        state.statusList.map(item => (
                            <MenuItem key={item.customerId} value={item.customerId}>{item.cName + item.cLastName}</MenuItem>
                        ))
                    }

                </Select>
            </FormControl>
            <div style={{width: '10%',alignSelf:"center"}}>
            <Button
                sx={{height:"46px"}}
                variant="contained"
                color="inherit"
                onClick={() => {
                    console.log(state.selected)
                    props.setQuery(state.selected)
                }}
                endIcon={<FilterListIcon/>}
                
                
            >
                Filter</Button>
                </div>
        </div>
    )
}

export default VehicleQueryComp
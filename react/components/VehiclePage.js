import React, { Component } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InfoIcon from '@mui/icons-material/Info';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Button from '@mui/material/Button';
import { useContext,useEffect  } from 'react';
import { VehicleContext } from './VehicleContext';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
//import StatusQueryComp from './StatusQueryComp';
import VehicleQueryComp from './VehicleQueryComp';

function VehiclePage() {
    const { vehicles,getVehicles,setDetails, vehicleDetails} = useContext(VehicleContext)
    
    const [query, setQuery] = useState(0)

      useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get(`https://localhost:7259/api/Vehicle`).catch(error => {
               // console.log(error);
                throw error;
            });
            getVehicles(result.data)
            console.log(result.data)
        };
        fetchData();

    }, []);




    return (
        <div>
            <h2>Vehicle List Page</h2>
            
            <Link to={"/CreateVehiclePage"}>                            
                    <Button
                    variant="contained"
                    color="inherit"
                    endIcon={<AddCircleOutlineIcon />}
                    sx={{ color: 'black'}}
                    >
                    New Vehicle</Button>
                </Link>
           
            <div style={{ display: "block", width: "100%"}}>
                {
                
               
                   
                        <div style={{ width: "60%",marginLeft:"20%" }}>
                           <VehicleQueryComp setQuery={setQuery}/>
                           <TableContainer component={Paper} >
                            
                            <Table  aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <th>Vehicle ID</th>
                                        <th >Customer ID</th>
                                        <th >Customer Name</th>
                                        <th>Model</th>
                                        <th >Plaka</th>
                                        <th >Date</th>
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                               
                                    {
                                        vehicles.map(item =>
                                        (
                                            <TableRow
                                          
                                                key={item.vehicleId}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } ,
                                                display:(query===0 | item.customer.customerId===query)?"table-row":"none"
                                            }}
                                            >
                                                <TableCell  align="center" >{item.vehicleId}</TableCell >
                                                <TableCell align="center"  >{item.customerId}</TableCell >    
                                                <TableCell align="center"  >{item.customer.cName + item.customer.cLastName }</TableCell >                                           
                                                <TableCell align="center"  >{item.model}</TableCell >
                                                <TableCell align="center"  >{item.plaka}</TableCell >
                                                <TableCell align="center"  >{item.date}</TableCell >
                                                
                                               
                                                
                                                <TableCell  align="right">
                                                <Link to={`/VehicleDetailsPage/${item.vehicleId}`}
                                                >
                                                
                                                
                                                    <Button
                                                    variant="contained"
                                                    color="inherit"
                                                    endIcon={<InfoIcon/>}
                                                    sx={{ color: 'black'}}
                                                    onClick={() => {
                                                        setDetails({vehicleId:item.vehicleId})
                                                    }}>
                                                        
                                                    MORE</Button>
                                                </Link>
                                                </TableCell >

                                            </TableRow>
                                        )
                                        )
                                        
                                            
                                    }
                                </TableBody>
                            </Table>

                            </TableContainer>
                        </div>
                        
                    
                }
            </div>
        </div >

    )
}


export default VehiclePage;
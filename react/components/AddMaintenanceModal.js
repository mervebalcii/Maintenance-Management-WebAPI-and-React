import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import InputLabel from '@mui/material/InputLabel';
import { useState } from 'react';
//import { VehicleContext } from './VehicleContext';
import { useContext } from 'react';
import axios from 'axios';
import { VehicleContext } from './VehicleContext';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,

};

export default function AddMaintenanceModal(props) {

    
    const [maintenances, setMaintenances] = useState(props.info)
    const { vehicleDetails, setDetails } = useContext(VehicleContext)
    const [selectedItem, setselectedItem] = useState(-1)
    return (
        <Modal
            open={(maintenances !== "")}
            onClose={() => {
                props.setInfo("")
            }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Add Maintenance
                </Typography>
                <FormControl fullWidth sx={{ marginTop: "12px" }}>
                    <InputLabel id="demo-simple-select-label">Maintenance</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value= {selectedItem === -1 ? '' : selectedItem}
                        label="Maintenance"
                        onChange={(e) => {
                            setselectedItem(e.target.value)
                        }}
                        sx={{ textAlign: "left" }}
                    >
                        {
                            maintenances &&
                            maintenances.map(item => (
                                <MenuItem key={item.maintenanceId} value={item}>{item.name}</MenuItem>
                            ))
                        }



                    </Select>
                </FormControl>

                <div style={{ display: "flex" }}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        
                        endIcon={<SaveAsIcon />}
                        sx={{ width: '25%', marginTop: "12px" }}
                        onClick={() => {
                            axios("https://localhost:7259/api/VehicleItems", {
                                method: "POST",
                                header: { "Context-type": "application/json" },
                                data: {
                                    vehicleId: props.vehicleId,
                                    maintenanceId: selectedItem.maintenanceId,
                                }
                            })
                                .then(response => {
                                    
                                    setDetails({
                                        ...vehicleDetails, vehicleItems: [...vehicleDetails.vehicleItems, {
                                            vehicleId: props.vehicleId,
                                            vehicleItemId: response.data.vehicleItemId,
                                            maintenance: {
                                                maintenanceId: selectedItem.maintenanceId,
                                                bakim: selectedItem.bakim,
                                                name: selectedItem.name,
                                                vehicleItems: []
                                            },
                                            maintenanceId: selectedItem.maintenanceId
                                        }]
                                    })
                                    props.setInfo("")
                                    props.setTotalPrice(props.totalPrice+selectedItem.bakim)
                                })


                        }}
                    >
                        SAVE</Button>
                    <div style={{ width: "50%" }}></div>
                    <Button
                        variant="outlined"
                        color="inherit"
                        
                       
                        onClick={() => {
                           
                            console.log("back")
                        }}
                        endIcon={<CancelIcon />}
                        sx={{ width: '25%', marginTop: "12px" }}
                    >
                        cancel</Button>
                </div>
            </Box>
        </Modal>
    );
}

import React from 'react'
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';

import MyAlert from './MyAlert';
function CustomerForm(props) {
    return (
        <div style={{ width: "50%", textAlign: "center" }}>
            <h2>Customer Register Form</h2>
           
            {
                props.alert && props.alert.at===1 && <MyAlert alert={props.alert} width={"50%"} closeAlert={props.closeAlert}/>
            }
            <Box  sx={{ display: 'block', width: "50%", marginLeft: "25%" }}>
            
                      
              
           
               <TextField  label="Full Name" variant="outlined" type="text"
                    name="cName"
                    sx={{ width: '100%' }}
                    onChange={props.changeNewCustomerName}
                />

               

                 <TextField  label="Last Name" variant="outlined" type="text"
                    name="cLastName"
                    sx={{ width: '100%' }}
                    onChange={props.changeNewCustomerLName}
                />
               
                <TextField  label="Phone Number" variant="outlined" type="number"
                    name="cNumber"
                    sx={{ width: '100%' }}
                    onChange={props.changeNewCustomerPhone}
                />
                    <TextField label="Gender" variant="outlined" type="text"
                    name="cinsiyet"
                    sx={{ width: '100%'}}
                    onChange={props.changeNewCustomerGender}
                />
                <Button


                    variant="contained"
                    
                    color="inherit"
                    endIcon={<SendIcon />}
                    sx={{ width: '50%', marginTop: "12px" }}
                    onClick={() => {
                       
                        props.addNewCustomer(props.newCustomer)
                    }}>
                    apply</Button>
            </Box >

        </div>
    )
}

export default CustomerForm

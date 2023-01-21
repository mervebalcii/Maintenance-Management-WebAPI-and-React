import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import { useContext, useEffect,useState } from 'react';
import { VehicleContext } from './VehicleContext';
import axios from 'axios'; 
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';
//import AddProductModal from './AddProductModal';
import AddMaintenanceModal from './AddMaintenanceModal';

export default function VehicleDetailsPage() {

    const { id } = useParams()
    const { vehicleDetails, setDetails } = useContext(VehicleContext)
    const [date, setdate] = useState("")
    const [totalPrice, setTotalPrice] = useState(0)
    const [addMaintenanceState, setaddMaintenanceState] = useState("")
    

    useEffect( () => {

        const fetchData = async () => {
      
            const res = await axios.get(`https://localhost:7259/api/Vehicle/` + id).catch(error => {
                // console.log(error);
                 throw error;
             });
            setDetails(res.data)
            
            var d = new Date(res.data.date);
            setdate(d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear())

            let total=0
            console.log(res.data)
            
            res.data.vehicleItems.map(i=>{
                total=total+i.maintenance.bakim
                console.log(total)
                setTotalPrice(total)
            })
        };
        fetchData();
      
    }, []);



    
    return (
        <div>
             {
              
                 addMaintenanceState!=="" &&
                    <AddMaintenanceModal 
                    info={addMaintenanceState}
                   setInfo={setaddMaintenanceState} 
                    vehicleId={id}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}

                    />
                }

            <Typography gutterBottom variant="h5" component="div" sx={{fontFamily:"monospace"}}>
                Vehicle Report
            </Typography>

           
            <Card sx={{ maxWidth: "50%", textAlign: "left", marginLeft: "25%" }}>
                {
                    vehicleDetails !== undefined && vehicleDetails.customer !== undefined && 
                    (
                        <React.Fragment>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Customer
                                </Typography>
                                <Typography gutterBottom variant="h7" component="div">
                                    {vehicleDetails.customer.cName + vehicleDetails.customer.cLastName}
                                </Typography>
                               
                                
                                <Typography gutterBottom variant="h6" component="div">
                                     Date
                                </Typography>
                                <Typography gutterBottom variant="h7" component="div">
                                    {date}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    Maintenances
                                </Typography>
                               
                                {
                                    <TableContainer component={Paper} >
                                        <Table aria-label="simple table" >
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell sx={{ fontSize: "16px" }}> All Maintenances</TableCell>
                                                    <TableCell sx={{ fontSize: "16px" }} align="right">Cost</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            
                                            <TableBody>

                                            {

                        vehicleDetails.vehicleItems.map(item =>
(
                        <TableRow
        key={item.vehicleItemId}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
        <TableCell component="th" scope="row">{item.maintenance.name}</TableCell>
        <TableCell align="right">{item.maintenance.bakim}</TableCell>
       
       
        <TableCell align="right">
            <Button
                variant="contained"
                color="inherit"
                startIcon={<DeleteIcon />}
                onClick={async()=>{
                    const res = await axios.delete(`https://localhost:7259/api/VehicleItems/`+item.vehicleItemId)
                    if(res.status===204){
                        setDetails({
                            ...vehicleDetails,
                            vehicleItems:vehicleDetails.vehicleItems.filter(e => e.vehicleItemId !== item.vehicleItemId)
                        })
                       
                        setTotalPrice(totalPrice-item.maintenance.bakim)
                    }
                }}>
                Remove </Button>
        </TableCell>

    </TableRow>
)
)
    
}
            <TableRow
                    key={99}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
>
                                    <TableCell component="th" scope="row" sx={{fontWeight:"bold"}} > 
                                            Total Cost
                            </TableCell>
                <TableCell component="th" scope="row" sx={{fontWeight:"bold"}} align="right"> 
                                {totalPrice}
                            </TableCell>
                </TableRow>
            </TableBody>
                </Table>

            </TableContainer>

                                }
                                <Typography gutterBottom variant="h6" component="div" mt={2}>
                                    model
                                </Typography>
                                <Typography variant="body2" color="text.primary">
                                    {vehicleDetails.model}
                                </Typography>
                            </CardContent>
                            <CardActions>

                            <Button 
                                color="inherit"
                                size="small"
                                onClick={async ()=>{
                                    const res = await axios.get('https://localhost:7259/api/Maintenance')
                                    
                                    if(res.status===200){
                                        setaddMaintenanceState(res.data)
                                     }
                                }}
                                >Add Maintenance</Button>
                                   <Link to={`/EditVehiclePage/${id}`}>
                                    <Button 
                                    color="inherit" 
                                    sx={{ color: 'black'}}
                                    size="small">Edit </Button>
                                </Link>

                                <Button color="inherit" size="small" onClick={async()=>{
                                    try {
                                        const res = await axios.delete(`https://localhost:7259/api/Vehicle/` + id)
                                        if(res.status===204)
                                            window.location = '/';
                                    }
                                    catch (e) {
                                        console.log("error")
                                        }
                                }}>Remove This Vehicle</Button>
                            </CardActions>
                        </React.Fragment>
                    )
                }
            </Card>
        </div>
    );
}
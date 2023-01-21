
import React, { Component } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
//import DeleteIcon from '@mui/icons-material/Delete';
import DeleteIcon from '@mui/icons-material/Delete';
import Alert from '@mui/material/Alert';
import { connect } from 'react-redux'
import {
    getCustomers, changeNewCustomerName, changeNewCustomerPhone,changeNewCustomerId,changeNewCustomerLName,
    changeNewCustomerGender,
    addNewCustomer, deleteCustomer,getCustomer,updateCustomer,
    cancelUpdateCustomer,closeAlert
} from '../reducers/CustomerActions'
import CustomerForm from './CustomerForm';
import CustomerEditModal from './CustomerEditModal';
import MyAlert from './MyAlert';


class CustomerPage extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {

        this.props.getCustomers()

    }
    componentDidUpdate() {
        
    }

    render() {

        return (
       
            <div >
                 <h2>Customer Page</h2>
                {
                    this.props.edit &&
                    this.props.edit.modalIsOpen &&
                    <CustomerEditModal 
                    edit={this.props.edit} 
                    cancelUpdateCustomer={this.props.cancelUpdateCustomer}
                    updateCustomer={this.props.updateCustomer}/>
                }
               
                <div style={{ display: "flex", width: "100%" }}>
                    {
                        this.props.localCustomerList && (
                          
                            <div style={{ width: "50%" }}>


{
                                    this.props.alert && 
                                    this.props.alert.at===0 && 
                                    <MyAlert alert={this.props.alert} width={"55%"} closeAlert={this.props.closeAlert} />
                                }


                    <TableContainer component={Paper} >
                                
                    <Table aria-label="simple table">

                                
                                    <TableHead>
                                        <TableRow>
                                            <th  >Customer ıd</th >
                                            <th   >customer name</th >
                                            <th  >customer lastname</th >
                                            <th  >customer phone</th >
                                            <th  >gender</th >
                                            <th  >number of vehicle</th >
 
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {

                                            this.props.localCustomerList.map(item =>
                                            (
                                                <TableRow
                                                    key={item.customerId}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell  >{item.customerId}</TableCell >
                                                    <TableCell >{item.cName}</TableCell >
                                                    <TableCell  >{item.cLastName}</TableCell >
                                                    <TableCell  >{item.cNumber}</TableCell >
                                                    <TableCell >{item.cinsiyet}</TableCell >
                                                    <TableCell >{item.vehicles.length}</TableCell >
                                                   
                                                    <TableCell  ><Button
                                                        variant="outlined"
                                                        color="inherit"
                                                        startIcon={<EditIcon />}
                                                        sx={{justifyContent:"end"}}
                                                        onClick={() => {
                                                            this.props.getCustomer(item.customerId)
                                                        }}>
                                                        </Button>
                                                    </TableCell >

                                                    <TableCell  >
                                                        
                                                        <Button
                                                        variant="outlined"
                                                        color="inherit"
                                                       
                                                       startIcon={<DeleteIcon />}
                                                       
                                                        sx={{justifyContent:"end"}}
                                                        onClick={() => {
                                                            if(item.vehicles.length>0){
                                                             window.alert("This Customer Has Vehicle. Please Check It")
                                    
                                                            }else{
                                                            this.props.deleteCustomer(item.customerId)}
                                                        }}>
                                                           
                                                        </Button>
                                                    </TableCell >

                                                </TableRow>
                                            )
                                            )

                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                                </div>
                            
                           
                            
                        )
                    }
                    
                    <CustomerForm  
                    alert={this.props.alert}
                   
                   newCustomer={this.props.newCustomer}
                   
                   changeNewCustomerId={this.props.changeNewCustomerId}
                   changeNewCustomerName={this.props.changeNewCustomerName}
                   changeNewCustomerLName={this.props.changeNewCustomerLName}
                   changeNewCustomerPhone={this.props.changeNewCustomerPhone}
                   changeNewCustomerGender={this.props.changeNewCustomerGender}       
                   addNewCustomer={this.props.addNewCustomer}
                   closeAlert={this.props.closeAlert}
                   />
                  
                </div>
            </div >

        )
    }
}

const mapStateToProps = (state) => {

    return {
        localCustomerList: state.customers,
        newCustomer: state.newCustomer,
        alert: state.alert,
        edit:state.edit,
    }
}
const myDispatchFuncs = {
    getCustomers,
    changeNewCustomerId,
    changeNewCustomerName,
    changeNewCustomerLName,
    changeNewCustomerPhone,
    changeNewCustomerGender,
    addNewCustomer,
    deleteCustomer,
    getCustomer,
    updateCustomer,
    cancelUpdateCustomer,
    closeAlert
}

export default connect(mapStateToProps, myDispatchFuncs)(CustomerPage);



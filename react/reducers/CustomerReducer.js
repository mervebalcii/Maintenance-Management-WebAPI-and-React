
const initialState = {
    customers: [],
    newCustomer: {
        customerId:NaN,
        cName: "",
        cLastName: "",
        cNumber: "",
        cinsiyet:""
    },
    alert: {
        show: false,
        type: "",
        at:0,
        content: ""
    },
    edit: {
        modalIsOpen: false,
        editCustomer: {
        cName: "",
        cLastName: "",
        cNumber: "",
        cinsiyet:""
        }
    }
};


const CustomerReducer = (state = initialState, action) => {


    switch (action.type) {
        case 'LIST':
            return {

                ...state,
                customers: action.payload

            }
        case "changeNewCustomerId":
            return {
                    ...state,
                    newCustomer: { ...state.newCustomer, customerId: action.payload }
                }
        case "changeNewCustomerName":
            return {
                ...state,
                newCustomer: { ...state.newCustomer, cName: action.payload }
            }

        case "changeNewCustomerLName":
            return {
                ...state,
                newCustomer: { ...state.newCustomer, cLastName: action.payload }
            }
        case "changeNewCustomerPhone":
            return {
                ...state,
                newCustomer: { ...state.newCustomer, cNumber: action.payload }
            }
        case "changeNewCustomerGender":
            return {
                    ...state,
                    newCustomer: { ...state.newCustomer, cinsiyet: action.payload }
                }
        case 'ADD':
            return {
                ...state,
                customers: [
                    ...state.customers, action.payload
                ],
                alert: {
                    show: true,
                    type: "success",
                    at: 1,
                    content: "Customer Add the System Successfull"
                }
            }
        case 'ADDERROR':
            return {
                ...state,
                alert: {
                    show: true,
                    at: 1,
                    type: "error",
                    content: "Please Fill Form Properly"
                }
            }
        case 'DELETE':
            return {
                ...state,
                customers: state.customers.filter(item => item.customerId !== action.payload),
                alert: {
                    show: true,
                    at: 0,
                    type: "success",
                    content: "Delete Successfull"
                }
            }
        case 'DELETEERROR':
            return {
                ...state,
                alert: {
                    show: true,
                    at: 0,
                    type: "error",
                    content: "This Customer Has Vehicles"
                }
            }
        case 'GETCUSTOMER':
            return {
                ...state,
                edit: {
                    modalIsOpen: true,
                    editCustomer: action.payload
                }
            }
        case 'UPDATECUSTOMER':
            return {
                ...state,
                customers:state.customers.map(item => (item.customerId === action.payload.customerId?action.payload:item)),
                edit: {
                    ...state.edit,
                    modalIsOpen: false,
                },
                alert: {
                    show: true,
                    at: 0,
                    type: "success",
                    content: "Customer Updated"
                },

            }
        case 'CANCELUPDATECUSTOMER':
            return {
                ...state,
                edit: {
                    modalIsOpen: false,
                },

            }
        case 'NOUPDATECUSTOMER':
            return {
                ...state,
                alert: {
                    show: true,
                    at: 0,
                    type: "info",
                    content: "No Change"
                },
                edit: {
                    modalIsOpen: false,
                },

            }
        case 'CLOSEALERT':
            return {
                ...state,
                alert: {
                    ...state.alert,
                    show: false,
                },

            }
        default: return state
    }

    return state;
}

export default CustomerReducer;

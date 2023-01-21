
import axios from 'axios'


export const getCustomers = () => async dispatch => {

    try {
        const res = await axios.get("https://localhost:7259/api/Customers")
        dispatch({
            type: "LIST",
            payload: res.data
        })
    }
    catch (e) {
        console.log("error")
    }

}
export const changeNewCustomerId = (e) => async dispatch => {

    dispatch({
        type: "changeNewCustomerId",
        payload: e.target.value
    })

}

export const changeNewCustomerName = (e) => async dispatch => {

    dispatch({
        type: "changeNewCustomerName",
        payload: e.target.value
    })

}
export const changeNewCustomerLName = (e) => async dispatch => {

    dispatch({
        type: "changeNewCustomerLName",
        payload: e.target.value
    })

}



export const changeNewCustomerPhone = (e) => async dispatch => {

    dispatch({
        type: "changeNewCustomerPhone",
        payload: e.target.value
    })

}

export const changeNewCustomerGender = (e) => async dispatch => {

    dispatch({
        type: "changeNewCustomerGender",
        payload: e.target.value
    })

}




export const addNewCustomer = (newCustomer) => async dispatch => {

   
        try {
            axios("https://localhost:7259/api/Customers", {
                method: "POST",
                header: { "Context-type": "application/json" },
                data: newCustomer
            })
                .then(response => {

                    dispatch({
                        type: "ADD",
                        payload: response.data
                    })
                })
        } catch (error) {
            console.log("Add Error:", error)
        }



}

export const deleteCustomer = (id) => async dispatch => {
  
      
            axios("https://localhost:7259/api/Customers/" + id, {
                method: "DELETE",
                header: { "Context-type": "application/json" },
            })
                .then(response => {
                    
                    dispatch({
                        type: "DELETE",
                        payload: id
                    })
                })
      
    
}




export const getCustomer = (id) => async dispatch => {

    try {
        const res = await axios.get(`https://localhost:7259/api/Customers/` + id)
        dispatch({
            type: "GETCUSTOMER",
            payload: res.data
        })
    }
    catch (e) {
        console.log("error")
    }

}

export const updateCustomer = (id, customer) => async dispatch => {

    try {
        axios("https://localhost:7259/api/Customers/" + id, {
            method: "PUT",
            header: { "Context-type": "application/json" },
            data: customer
        })
            .then(response => {
                if (response.status === 200) {
                    dispatch({
                        type: "UPDATECUSTOMER",
                        payload: customer
                    })
                } else {
                    dispatch({
                        type: "NOUPDATECUSTOMER",
                    })
                }

            })
    } catch (error) {
        console.log("Update Error:", error)
    }

}


export const cancelUpdateCustomer = () => async dispatch => {
    dispatch({
        type: "CANCELUPDATECUSTOMER"
    })
}

export const closeAlert = () => async dispatch => {
    dispatch({
        type: "CLOSEALERT"
    })
}

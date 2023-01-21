import React, { useState } from 'react'
import axios from 'axios'
const CreateMaintenancePage = () => {

    const initialState = {
        maintenance: {
           
            name: "",
            bakim: "",
          },
        alert:{
            show:false,
            content:""
        }
    }

    const handleChange = (evt) => {
        let {name,value}=evt.target
        setState({...state,maintenance:{...state.maintenance,[name]: value}})
        console.log(state)
    }

    const [state, setState] = useState(initialState);

    return (
        <div>
            <h2>New Maintenance Form</h2>
            {state.alert.show && <p>{state.alert.content}</p>}
            <p>
                <label>Maintenance
                    <input type="text"
                        name="name"
                        onChange={handleChange}
                    />
                </label>
                <label>cost
                    <input type="number"
                        name="bakim"
                        onChange={handleChange}
                    />
                </label>
                <button onClick={() => {
                    if(state.maintenance.name==="" | state.maintenance.bakim===null){
                        setState({...state,alert:{show:true,content: "İlgili alanlari doldurunuz."}})
                        
                    }else{
                        if(state.maintenance.bakim<=0){
                            setState({...state,alert:{show:true,content: "Ücret Sifirdan Büyük olmalı"}})
                        }else{

                        
                        axios("https://localhost:7259/api/Maintenance", {
                            method: "POST",
                            header: { "Context-type": "application/json" },
                            data: state.maintenance
                        })
                            console.log(state.maintenance)
                            .then(response => {
                                response.data && setState({...state,alert:{show:true,content: "success"}})
                            })
                        }
                    }
                    
                }}>Add</button>
            </p>
        </div>
    )
}

export default CreateMaintenancePage
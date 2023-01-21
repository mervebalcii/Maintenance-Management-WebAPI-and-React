import React, { createContext } from 'react'
import { useState } from 'react'
export const VehicleContext = createContext()

export const VehicleContextProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([])
  const [vehicleDetails, setVehicleDetails] = useState()

  const getVehicles = (vehicles) =>{
    setVehicles(vehicles)
  }

  const setDetails = (vehicle) =>{
    setVehicleDetails(vehicle)
  }

 

  const value = {
    vehicles,
    getVehicles,
    vehicleDetails,
    setDetails,

  }

  return <VehicleContext.Provider value={value}>{children}</VehicleContext.Provider>
}
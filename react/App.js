import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route,Router, Link } from "react-router-dom"
import OwnerCreate from './CustomerComponent/OwnerCreate';
import OwnerList from './CustomerComponent/OwnerList';
import CustomerUpdate from './CustomerComponent/CustomerUpdate';
import { Customers } from './Customers';
import VehicleList from './CustomerComponent/VehicleList';
import VehicleCreate from './CustomerComponent/VehicleCreate';
import CustomerPage from './components/CustomerPage';
import CustomerEditModal from './components/CustomerEditModal';
import CustomerForm from './components/CustomerForm';
import store from './reducers/CustomerStore';
import VehiclePage from './components/VehiclePage';
import { VehicleContextProvider } from './components/VehicleContext';
import CreateVehiclePage from './components/CreateVehiclePage';
import EditVehiclePage from './components/EditVehiclePage';
import VehicleDetailsPage from './components/VehicleDetailsPage';
import Navbar from './components/Navbar';
import AddMaintenanceModal from './components/AddMaintenanceModal';
import CreateMaintenancePage from './components/CreateMaintenancePage';
function App() {
  return (

    <Provider store={store}>
     
    <VehicleContextProvider>
          <Navbar />
          <div className="App" style={{ marginTop: "100px" }}>
          <Routes>
            <Route exact path="/" element={<CustomerPage />} />
            <Route exact path="/CustomerPage" element={<CustomerPage />} />
            <Route exact path="/VehiclePage" element={<VehiclePage />} />
            <Route exact path="/CustomerForm" element={<CustomerForm />} />
            <Route exact path="/CreateVehiclePage" element={<CreateVehiclePage />} />
            <Route exact path="/EditVehiclePage/:id" element={<EditVehiclePage />} />
            <Route exact path="/VehicleDetailsPage/:id" element={<VehicleDetailsPage />} />
            <Route exact path="/AddMaintenanceModal" element={<AddMaintenanceModal />} />
            <Route exact path="/CreateMaintenancePage" element={<CreateMaintenancePage />} />
          </Routes>
        </div>
      
</VehicleContextProvider>
    </Provider >
    
  );
}

export default App;







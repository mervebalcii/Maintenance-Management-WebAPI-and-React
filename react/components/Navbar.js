import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate  } from 'react-router-dom';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import PersonIcon from '@mui/icons-material/Person';
import HandymanIcon from '@mui/icons-material/Handyman';
import AddIcon from '@mui/icons-material/Add';
const Navbar = () => {
  const navigate  = useNavigate ();
 
  return (
    <AppBar position="fixed" sx={{background:"#121212"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
           // icon={<HandymanIcon/>}
            sx={{ mr: 6, display: { xs: 'none', md: 'flex' }, }}
          >
              Vehicle Management
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            
              <Button
                key={0}
                onClick={
                    ()=>{
                        navigate("/CustomerPage")
                    }
                    }
                    startIcon={<PersonIcon/>}
                sx={{ my: 2, color: 'white', display: 'flex',mr:2 }}
              >
                 Customers
              </Button>

              <Button
                key={1}
                onClick={
                    ()=>{
                        navigate("/VehiclePage")
                    }
                    }
                    startIcon={<DirectionsCarIcon/>}
                sx={{ my: 2, color: 'white', display: 'flex' }}
              >
                Vehicles
              </Button>

              <Button
                key={2}
                onClick={
                    ()=>{
                        navigate("/CreateMaintenancePage")
                    }
                    }
                    startIcon={<AddIcon/>}
                sx={{ my: 2, color: 'white', display: 'flex' }}
              >
                Create Maintenance
              </Button>
            
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
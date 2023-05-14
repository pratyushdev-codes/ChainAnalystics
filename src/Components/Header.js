import { AppBar, Container, createTheme, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from 'tss-react/mui';
import { useNavigate } from 'react-router-dom'
import { Cryptostate } from '../CryptoContext';

const useStyles = makeStyles()(() => ({
  title: {
    flex: 1, 
    color: 'white',
    fontFamily: 'Roboto Condensed',
    
    cursor: "pointer",
    fontSize:20,
    marginLeft:-210,
  }
}));
const Header = () => {
  const {classes} = useStyles();

  const navigate = useNavigate();

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  const { currency, setCurrency } = Cryptostate();
   // console.log(currency);
    return (
    <ThemeProvider theme={darkTheme}>
    <AppBar style={{ backgroundColor: 'black',height: 60}} position='static'>
      <Container>
        <Toolbar>
          <Typography onClick={() => navigate("/")} className={classes.title}>&nbsp;&nbsp;&nbsp;&nbsp;Home &nbsp;&nbsp;&nbsp; &nbsp;&nbsp; Featured &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;    Blogs    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  About us    &nbsp;&nbsp; &nbsp;&nbsp;&nbsp;  Contact us</Typography>

          <Select variant="outlined" style={{
            width: 100, 
            height: 40,
            marginRight:-150,
            color: "white"
          }}
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          >
          
            <MenuItem value={"USD"}>USD</MenuItem>
            <MenuItem value={"INR"}>INR</MenuItem>
          </Select>
        </Toolbar>
      </Container>
    </AppBar>
    <br/>
    </ThemeProvider>
    
  )
}

export default Header
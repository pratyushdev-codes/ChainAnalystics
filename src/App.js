import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Coins from './Pages/CoinsPage'
import Homepage from './Pages/Homepage';
import { makeStyles } from 'tss-react/mui';
import Carousel from './Components/Banner/Carousel';
import CoinsTable from './Components/CoinsTable';
function App() {
  const useStyles = makeStyles()(() => ({
    App: {
      backgroundColor: "black",
      color: "white",
      minHeight: "100vh",
    }
  }));

  const { classes } = useStyles();
  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
        <Route path='/' element={<Homepage/>} exact />
        <Route path='/coins/:id' element={<Coins/>}/>
        </Routes>
        
         <br/>
         <br/>
         <br/>
        <Carousel/>
        <br/>
        <br/>
        <CoinsTable/>
      </div>
      
    </BrowserRouter>
  );
}

export default App;
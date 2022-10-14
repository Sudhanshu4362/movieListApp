import logo from './logo.svg';
import './App.css';
import Navbar from './Components/navbar';
import Banner from './Components/banner';
import List from './Components/list';
import Favourites from './Components/favourites';

import {BrowserRouter,Routes, Route} from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
     <Navbar/>
     <Routes>
       <Route path= "/" element = {<><Banner/><List/></>} />  
       <Route path= "/fav" element ={<Favourites/>} />
     </Routes>
    </BrowserRouter>
    // <Banner/>
  );
}

export default App;

import './App.css';
import {Menu} from "./components/Menu";
import {NavBar} from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import { Home } from './pages/Home';
import { Video } from './pages/Video';
import { Auth } from './Auth/Auth';
import { Search } from './pages/Search';
function App() {
  return (
      <div className="container">
        <Menu />
        <div className="main">
        <NavBar />
        <div className="wrapper">
          <Routes>
            <Route exact path='/' element={<Home type="random"/>} />
            <Route  path='/trend' element={<Home type="trend"/>} />
            <Route  path='/sub' element={<Home type="sub"/>} />
            <Route  path='/search' element={<Search />} />
            <Route  path='/video/:id' element={<Video/>} />              
            <Route  path='/auth' element={<Auth/>} />
          </Routes>
          </div>
        </div>
      </div>
  );
}

export default App;

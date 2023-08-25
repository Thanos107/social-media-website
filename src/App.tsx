import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login';
import { Navbar } from './components/navbar';
import { CreatePost } from './pages/CreatePost';

function App() {
  return (
    <div className="App">
     <Router>
        <Navbar/>
        
      <Routes>
        <Route path='/' element={<Home/>}/>  
        <Route path='/login' element={<Login/>}/>
        <Route path='/createpost' element={<CreatePost/>}/>
      </Routes>

     </Router>
    </div>
  );
}

export default App;

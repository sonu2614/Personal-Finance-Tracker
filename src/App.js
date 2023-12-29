import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
    <ToastContainer
    position="bottom-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="dark"
    //That is the way to modify your tostify acc to you 
    />
    <Router>
      <Routes>
        <Route path='/' element={<Signup/>} />
        <Route path='/dashboard' element={<Dashboard/>} />
      </Routes>
    </Router>
    </>
  );
}

export default App;

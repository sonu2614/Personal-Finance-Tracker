import './style.css';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import userImg from "../../assets/user.svg"

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate =  useNavigate();
  useEffect(() => {
    if(user){
      navigate("/dashboard");
    }
  
  }, [user,loading,navigate]);
  
  
  function LogoutFunc(){
    try{
      signOut(auth).then(() => {
        toast.success("Logout Successfully")
        navigate("/");
      }).catch((error) => {
        toast.error(error.message)
      });
    }
    catch(e){
      toast.error(e.message)
    }
  }

  return (
    <div className='navbar'>
      <p className='logo' >Finance Tracker.</p>
      {
        user && (
          <div style={{
            display:"flex",
            alignItems:"center",
            gap:"0.5rem"
          }}>
            <img src={user.photoURL ? user.photoURL : userImg}
            style={{
              height:"2rem",
              width:"2rem",
              borderRadius:"50%"
            }}/>
          <p className='link' onClick={LogoutFunc}>Logout</p>
          </div>
        )
      }
    </div>
  )
}

export default Header
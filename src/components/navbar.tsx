import { Link } from "react-router-dom"
import { auth } from "../config/firebase"
import {useAuthState} from 'react-firebase-hooks/auth'
import { signOut } from "firebase/auth"
export const Navbar = () =>{
    const [user, loading, error] = useAuthState(auth);


    const signUserOut = async ()=>{
        await signOut(auth)
    }
    return (
        <div className="navbar">
            <div className="links">   
            <Link to="/">Home</Link>
            {!user ? (<Link to="/login"> Login</Link>) : (<Link to="/createpost">Create Post</Link>)}
            {/* // if user's there then show Create Post else show login and enclose link in () curly brackets */}
         

            </div>
       

            <div className="user">
                {user && (

                    <>
                    <p>
                        {/* // this is the way to display user name : auth.currentUser.displayName */}
                    {user?.displayName}</p>
                    
                    <img src={user?.photoURL || ""} width="100" height="100"/>
                    <button onClick={signUserOut}>Log Out</button>
                    </>

                )}
               
             
            </div>
        </div>
    )
}

// installing react-firebase-hooks to update the user everytime a new user logs in
// user updates the login person on the dashboard with the help of react-firebase-hooks by importing  useAuthState Hook

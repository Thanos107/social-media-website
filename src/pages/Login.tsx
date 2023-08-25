import { auth, provider } from "../config/firebase"
import { signInWithPopup } from "firebase/auth"
import { useNavigate } from "react-router-dom" // hook used to navigate to some page

export const Login = () =>{

    const navigate  =  useNavigate(); 

    const signInWithGoogle = async ()=>{
        const result = await signInWithPopup(auth, provider)  // this requires both the auth and the provider
        console.log(result)
        navigate('/') // this will take the user to the home page
        
    }
    return (
        <div>
            <p> Sign in With google to continue</p>
            <button onClick={signInWithGoogle}>Sign in With Google</button>
        </div>
    )
}
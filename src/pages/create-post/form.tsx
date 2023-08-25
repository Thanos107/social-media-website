import {useForm} from 'react-hook-form'
import  * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { auth, db } from '../../config/firebase'
import { addDoc, collection } from 'firebase/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router-dom'

interface createFormData{
    title: string,
    description: string
}

export const CreateForm = () =>{

    
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title"),
        description: yup.string().required("You must add a description"),
    })

    const {register , handleSubmit, formState: {errors}} = useForm<createFormData>({
        resolver: yupResolver(schema),
    })  // useForm hook 


    const postsReference = collection(db, "posts");
    

    const onCreatePost = async (data : createFormData) =>{
        await addDoc(postsReference, {
            // title: data.title,
            // description : data.description,
            ...data, // this is how to include everything from the data: spread operator
            username: user?.displayName,
            userId: user?.uid,
        })
        navigate("/")
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onCreatePost)}>
            
                <input placeholder='title ...' {...register("title")}/>
                <p style={{color: "red"}}>{errors.title?.message}</p>
               <textarea placeholder='description' {...register("description")}/>
               <p style={{color: "red"}}>{errors.description?.message}</p>

                <input type='submit' className='submitForm' />
            </form>
        </div>
    )
}
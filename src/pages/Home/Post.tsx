import { useEffect, useId, useState } from "react";
import { Post as IPost } from "./Home"
import { addDoc, collection, getDocs , query, where, deleteDoc, doc} from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

interface Props{
    post: IPost
}

interface Like {
    likeId : string,
    userId : string;

}

export const Post = (props: Props) =>{
    const {post}  = props;

    const [likes ,setLikes]= useState<Like[] | null>(null)

    const likesRef = collection(db, "likes");
    const [user] = useAuthState(auth)

    const likeDoc = query(likesRef, where("postId", "==", post.id) )

    const getLikes =async () =>{
        const data = await getDocs(likeDoc)
         setLikes(data.docs.map((doc)=>({userId: doc.data().userId, likeId: doc.id})));
        
    }

    useEffect(()=>{
        getLikes()
    },[])


    const addLike= async () =>{

        try {
           const newDoc =  await addDoc(likesRef, {userId: user?.uid, postId: post.id})
            if(user){
                setLikes((prev)=> 
                prev ? [...prev, {userId: user.uid , likeId: newDoc.id}]: 
                [{userId: user.uid, likeId: newDoc.id}] )
              
            } // this is optimistic rendering: reload is not required
            
        } catch (error) {
            console.log(error);
            
        }
     
     
    };

    const deleteLike= async () =>{

        try {
            const likeToDeleteQuery = query(likesRef, where("postId", "==", post.id), where ("userId", "==" , user?.uid) )
            
            const likeToDeleteData = await getDocs(likeToDeleteQuery)
            const likeId =  likeToDeleteData.docs[0].id
            const likeToDelete = doc(db, "likes", likeId)
            await deleteDoc(likeToDelete);

            await addDoc(likesRef, {userId: user?.uid, postId: post.id})


            if(user){
                setLikes((prev)=> prev && prev.filter((like) => like.likeId !== likeId))
              
            } // this is optimistic rendering: reload is not required
            
        } catch (error) {
            console.log(error);
            
        }
     
     
    };

    const hasUserLiked = likes?.find((like) => like.userId == user?.uid)

    return <div> 
        <div className="title">
            <h1>{post.title}</h1>

        </div>
        <div className="body">
            <p>{post.description}</p>

        </div>
            <div className="footer">
                <p>@{post.username}</p>
                <button onClick={hasUserLiked ? deleteLike : addLike}> 
                {hasUserLiked ? <>&#128078;</> : <>&#128077;</>} </button>
             {likes &&   <p>Likes = {likes?.length}</p>}
            </div>
        </div >
}
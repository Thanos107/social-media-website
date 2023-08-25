import { getDoc, collection, getDocs } from "firebase/firestore"
import { db } from "../../config/firebase";
import { useEffect, useState } from "react";
import { Post } from "./Post";

export interface Post {
    id: string,
    userId : String,
    title: String,
    username: String,
    description : String,

}
export const Home =()=>{


    const postRef = collection(db, "posts");
    const [postList, setPostList] = useState<Post[] | null>(null);

    const getPost = async () =>{
       const data =  await getDocs(postRef)
       setPostList(data.docs.map((doc)=>({
        ...doc.data(), id: doc.id  // this is how to get doc data 
       })) as Post[]);  
    }

    useEffect(()=>{
        getPost();
    },[])
   
    return (
        <div>
           {postList?.map((post)=> <Post post={post}/>)}
        </div>
    )
}


// cant use react query : because all the fetching is done through firebase
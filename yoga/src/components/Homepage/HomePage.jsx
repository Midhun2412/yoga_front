import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

function HomePage() {
   
  const {uid} =useParams();
  console.log(uid);

  const [user, setUser]=useState({signupname: "",signuppassword: "",signupdob: "",signupemail: ""});

  useEffect(()=>{
    const getUser= async()=>{
         const reqData= await fetch('http://127.0.0.1:8000/home/userDetails/'+uid);
         const resData= reqData.json();
         setUser(await resData);
    }
    getUser()
},[]);

console.log(user);

  return (
    <div>HomePage</div>
  )
}

export default HomePage
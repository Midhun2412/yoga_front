import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import DemoPose from'./DemoPose'
import './HomePage.css'

function Posepage( ){
    const {uid} =useParams();
    console.log(uid);
    const {poseName} =useParams();
  
    const [user, setUser]=useState({signupname: "",signuppassword: "",signupdob: "",signupemail: ""});
  
    useEffect(()=>{
      const getUser= async()=>{
           const reqData= await fetch('http://127.0.0.1:8000/home/userDetails/'+uid);
           const resData= reqData.json();
           setUser(await resData);
      }
      getUser()
  },[]);
  
  // console.log(poseName);
  // console.log(user);
  
    return (
      <div className='homepage'>
        <div className='homep' id='#hp1'>
          <h1><span className="chfont">Hello</span> {user.signupname}</h1>
          <p id="pg1">Welcome To MATYOGI</p>
          <p id="pg2">Try out This pose</p>
        </div>
        
        <DemoPose poseName={poseName} uid={uid}/>
      </div>
    )
}

export default Posepage
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'


function HomePage() {
  const [difficulty,setDifficulty]=useState(1)
  const {uid} =useParams();
  console.log(uid);

  const [user, setUser]=useState({signupname: "",signuppassword: "",signupdob: "",signupemail: ""});
  const [poseData, setPoseData] = useState(null);
  useEffect(()=>{
    const getUser= async()=>{
         const reqData= await fetch('http://127.0.0.1:8000/home/userDetails/'+uid);
         const resData= reqData.json();
         setUser(await resData);
    }
    getUser()

    const fetchData = () =>{
      fetch('http://127.0.0.1:8000/home/userpose/')
          .then((response) => response.json())
          .then(data => setPoseData(data))
    }
     fetchData()

},[]);

function handleClick(x){
   setDifficulty(x)
}

//filter by difficulty
const filteredDiff = poseData ? poseData.filter(item => item.index_no === difficulty) : [];
  console.log(filteredDiff);

console.log(difficulty)
// console.log(user);
// console.log(poseData)



  return (
   
      <div >
        <div>
        <button onClick={() => handleClick(1)}>Easy</button>
        <button onClick={() => handleClick(2)}>Medium</button>
        <button onClick={() => handleClick(3)}>Hard</button>
        </div>

        
      </div>
   
  )
}

export default HomePage
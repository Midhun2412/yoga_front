import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Posepage from './Posepage'

function HomePage() {
  const [difficulty, setDifficulty] = useState(1);
  const { uid } = useParams();
  console.log(uid);

  const [user, setUser] = useState({ signupname: "", signuppassword: "", signupdob: "", signupemail: "" });
  const [poseData, setPoseData] = useState(null);
  const [selectedPose, setSelectedPose] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const reqData = await fetch('http://127.0.0.1:8000/home/userDetails/' + uid);
      const resData = await reqData.json();
      setUser(resData);
    };
    getUser();

    const fetchData = () => {
      fetch('http://127.0.0.1:8000/home/userpose/')
        .then((response) => response.json())
        .then(data => setPoseData(data))
        .catch(error => console.error('Error fetching poseData:', error));
    };
    fetchData();
  }, [uid]);

  function handleClick(x) {
    setDifficulty(x);
  }

  function handlePose(poseName) {
    setSelectedPose(poseName);
    window.location.href='/login/home/pose/'+uid+'/'+poseName;
    // console.log(poseName)

  }

  // Filter by difficulty
  const filteredDiff = poseData ? poseData.filter(item => item.index_no === difficulty) : [];
  console.log(filteredDiff);

  console.log(difficulty);

  return (
    <div>
      <div>
        <button onClick={() => handleClick(1)}>Easy</button>
        <button onClick={() => handleClick(2)}>Medium</button>
        <button onClick={() => handleClick(3)}>Hard</button>
      </div>
      <div>
      {filteredDiff && filteredDiff.map((image, index) => (
  <button key={index} onClick={() => handlePose(image.poseName)}>{image.poseName}</button>
))}

      </div>
      {selectedPose && <Posepage poseName={selectedPose} />}
    </div>
  );
}

export default HomePage;
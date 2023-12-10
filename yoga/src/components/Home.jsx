
import "./home.css"
import { useNavigate } from "react-router-dom";
function Home(){
  
    let navigate=useNavigate();
function handleClick(){
  console.log("hi there")
  navigate("/login/home/start");
}
    

    return(
        <div className="homee">
        
            <h1 className="dash">CHOOSE YOUR LEVEL</h1>
            <br/>
            <button className="box2" onClick={handleClick}>
            <div>
                 <h4 className="dashtitle">BEGINNER</h4>
                
            </div></button>


            <button className="box3">
            <div>
            <h4 className="dashtitle">INTERMEDIATE</h4>
           
            </div>
            </button>
            
            <button className="box4">
            <div>
            <h4 className="dashtitle">ADVANCED</h4>
           
            </div>
            </button>
            
            
           
        </div>
    );
}
export default Home;
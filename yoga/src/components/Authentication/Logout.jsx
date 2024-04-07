import React from 'react'
import './logout.css'
const Logout = () => {

function handleLogout(){
    window.location.href='/';
};

  return (
    <div className='logout-link'>
        <button className="learn-more" onClick={handleLogout}>
  <span className="circle" aria-hidden="true">
  <span className="icon arrow"></span>
  </span>
  <span className="button-text">Logout</span>
</button>
    </div>
  )
}

export default Logout
import React from 'react'
import './logout.css'
const Logout = () => {

function handleLogout(){
    window.location.href='/';
};

  return (
    <div className='logout-link'>
        <button class="learn-more" onClick={handleLogout}>
  <span class="circle" aria-hidden="true">
  <span class="icon arrow"></span>
  </span>
  <span class="button-text">Logout</span>
</button>
    </div>
  )
}

export default Logout
import {RxCrossCircled} from 'react-icons/rx';
import {FiUserCheck} from 'react-icons/fi';
import './alert.css'
// import { useEffect } from 'react';

export default function Alert(props) {
  // useEffect(()=>{
  //   const _alertEle = document.querySelector(".alert_wrapper");
  //   setTimeout(()=>{
  //     _alertEle.parentNode.removeChild(_alertEle);
  //   },5000);
  // },[]);
  
  return (
    <div className="alert_wrapper">
      <div className="alert_content" id="alertBox">
        {
          props.type === "ERROR" ? <div><span><RxCrossCircled size={"32px"}/></span><p>{props.msg}</p></div> :
          <div><span><FiUserCheck/></span><p>{props.msg}</p></div>
        }
      </div>
    </div>
  )
}
import {RxCrossCircled} from 'react-icons/rx';
import {FiUserCheck} from 'react-icons/fi';
import './alert.css'

export default function Alert(props) {
  
  return (
    <div className="alertBox" id="alertBox">
      {
        props.type === "ERROR" ? <div><span><RxCrossCircled size={"32px"}/></span><p>{props.msg}</p></div> :
        <div><span><FiUserCheck/></span><p>{props.msg}</p></div>
      }
    </div>
  )
}
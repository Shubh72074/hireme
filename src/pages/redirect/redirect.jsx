import { useNavigate } from 'react-router-dom';

const Redirect = () => {
  const history = useNavigate();
  const shouldRedirect = true; // Set this based on your condition

  if (shouldRedirect) {
    history('/home');
  }

  return (
    <div>redirect</div>
  )
}

export default Redirect
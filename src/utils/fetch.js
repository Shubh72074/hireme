const Jobs = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/jobs`);
    const jobs = await response.json();
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
  }
};

const User = async(token) => {
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/user`,{
      method: 'POST',
      headers : {
        'accept' : 'application/json',
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({token}),
    });
    return res;
  }
  catch(err) {
    console.log('Error fetching user:', err);
  }
}
export {Jobs,User};
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const Blogs = () => {
  const params = useParams();
  const [blog, setBlog] = useState([]);
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await fetch(`${process.env.REACT_APP_API_URL}/blogs/${params.id}`);
      console.log(blogs);
      const jsonBlogs = await blogs.json();
      console.log(jsonBlogs);
      setBlog(jsonBlogs);
    }

    fetchBlogs();
  },[params]);

  return (
    <div>{blog.map((b,idx)=>(
      <p key={idx}>{b.title}</p>
    ))}</div>
  )
}

export default Blogs;
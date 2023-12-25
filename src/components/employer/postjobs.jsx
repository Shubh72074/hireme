import "./postjobs.css";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../job-apply/jobApply";

const PostJobs = () => {
  const [tags,setTags] = useState([]);
  const [categories,setCategories] = useState([]);
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_API_URL}/categories`).then(res => {
      res.json().then(data => setCategories(data));
    }).catch(err => console.log(err));
  },[])
  const [documentContent, setDocumentContent] = useState("");

  const handleEditorChange = (content) => {
    setDocumentContent(content);
  };

  const handleSelection = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_URL}/tags/${encodeURIComponent(e.target.value)}`).then(res=>res.json().then((data)=>setTags(data))).catch(err=>console.log(err));
  }

  const handleTags = (e) => {
    const val = document.getElementById("_jtag").value;
    if(val !== "") {
      const ele = document.createElement("label");
    const content = document.createTextNode(val);
    const sp = document.createElement("span");
    sp.addEventListener("click",(e)=>{
      e.preventDefault();
      const parent = e.target.parentNode;
      parent.parentNode.removeChild(e.target.parentNode);
    })
    const spc = document.createTextNode("X");
    sp.appendChild(spc);
    ele.appendChild(content)
    ele.appendChild(sp)
    document.getElementById("_jtags").appendChild(ele);
    document.getElementById("_jtag").value = "";
    }
    else {
      document.getElementById("_jtag").focus()
    }
  }

  return (
    <>
    <div className="post_wrapper">
      <div className="_pjw">
          <div className="_pjd">
            <h4>Job Details</h4>
            <div>
              <label htmlFor="_jt">Job Title</label>
              <span style={{fontSize:'x-small',fontStyle:'italic'}}>* Keep it short and Descriptive</span>
              <input type="text" id="_jt" name="_jt"  pattern="[a-zA-Z\s]+" maxLength={24} minLength={8} required />
            </div>
            <div>
              <label htmlFor="_jtype">Job Type</label>
              <select name="_jtype" id="_jtype" onChange={handleSelection}>
                <option value="In-Office">In-Office</option>
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div>
              <label htmlFor="_jtype">Job Category</label>
              <select name="_jtype" id="_jtype" onChange={handleSelection}>
                {categories.map((category,idx) => (
                  <option value={category._id} key={idx}>{category._id}</option>
                ))}
              </select>
            </div>
            <div className="doc-container">
              <label htmlFor="_jdesc">Job Description</label>
              <span style={{fontSize:'x-small',fontStyle:'italic'}}>* Tell something about the job profile and the work culture, benefits and perks. You can edit it anytime you feel to.</span>
              <ReactQuill
                id="_jdesc"
                value={documentContent}
                onChange={handleEditorChange}
                placeholder="Write your document..."
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, 4, 5, 6, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["link"],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "list",
                  "bullet",
                  "link",
                ]}
              />
            </div>
            <div>
              <label htmlFor="_jurl">Job URL</label>
              <span style={{fontSize:'x-small',fontStyle:'italic'}}>* URL were users can apply for the opening.</span>
              <input type="url" id="_jurl" name="_jurl" placeholder="example.com/careers/page" />
            </div>
            <div>
              <label htmlFor="_jtag">Required Skills</label>
              <div id="tags_wrapper">
                <div id="i_wrapper">
                  <input type="text" name="_jtag" id="_jtag" list="tags"/>
                  <datalist id="tags">
                    {
                      tags.map((tag,idx) => (
                        <option key={idx} value={tag}/>
                      ))
                    }
                  </datalist>
                  <button onClick={handleTags}>ADD</button>
                </div>
                <div id="_jtags">
                </div>
              </div>
            </div>
            <input type="submit" value="SUBMIT"/>
          </div>
      </div>
    </div>
    </>
  );
};

export default PostJobs;

import "./postjobs.css"
import { useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const PostJobs = () => {
  const [documentContent, setDocumentContent] = useState('');
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");

  const handleEditorChange = (content) => {
    setDocumentContent(content);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const handleName = (e) => {
    setName(e.target.value);
    
  }

  const handleCompanyName = (e) => {
    setCompany(e.target.value);
  }


  return (
    <div>
      <div>
        <label htmlFor="name">Full Name</label>
       <input type="text" name="name" id="name" onChange={handleName} value={name}/>
        <label htmlFor="company_name">Company Name</label>
       <input type="text" name="company_name" id="company_name" onChange={handleCompanyName} value={company}/>
      <div className="doc-container">
        <ReactQuill
        value={documentContent}
        onChange={handleEditorChange}
        placeholder="Write your document..."
        modules={{
          toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link'],
            ['clean'],
          ]
        }}
        formats={[
          'header',
          'bold', 'italic', 'underline', 'strike',
          'list', 'bullet',
          'link',
        ]}
        />
      </div>
        <button onClick={handleSubmit}>POST IT</button>
        </div>
    </div>

  )
}

export default PostJobs;
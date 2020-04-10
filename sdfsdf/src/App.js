import React, { useState, useEffect } from 'react';
import axios from "axios"
import './App.css';
import PostPage from './components/PostsPage';

function App() {

  const [data,setData] = useState([]);

  const handleDelete = (id) => {
    console.log("deleting",id);
    axios.delete(`http://localhost:5000/api/posts/${id}`).then(res=>{
      console.log(res.data);
    })
  } 
  const handleEdit = (id,post) => {
    console.log("editing",id);
    console.log("widh",post);
    // axios.put(`http://localhost:5000/api/posts/${id}`,post).then(res=>{
    //   console.log(res.data);
    //   setData(res.data);
    // })
  } 

  useEffect(()=>{
    axios.get("http://localhost:5000/api/posts").then(res=>{
      console.log(res.data);
      setData(res.data.post);
    })
  },[handleDelete])

  return (
    <div className="App">
      <PostPage data={data} handleDelete={handleDelete} handleEdit={handleEdit}></PostPage>
    </div>
  );
}

export default App;

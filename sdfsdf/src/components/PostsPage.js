import React from 'react';
import Post from "./Post";
function PostPage(props) {
  return (
    <div className="postPage-wrapper">
        {props.data.map(post=>{
            return <Post post={post} key={post.id} handleDelete={props.handleDelete} handleEdit={props.handleEdit}></Post>
        })}

    </div>
  );
}

export default PostPage;

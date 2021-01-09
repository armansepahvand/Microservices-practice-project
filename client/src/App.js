import React, { useEffect, useState } from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import axios from "axios";

// eslint-disable-next-line
export default () => {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    const res = await axios.get("http://localhost:4002/posts");

    return res.data;
  };

  useEffect(async () => {
    setPosts(await fetchPost());
  }, []);

  const onSubmit = async (title) => {
    await axios.post("http://localhost:4000/posts", { title });
    //set title to empty string to show empty input space after submitting
    //setTilte("");
    setPosts(await fetchPost());
  };
  return (
    <div className="container">
      <h1>Create Post</h1>
      <PostCreate onSubmit={onSubmit} />
      <hr />
      <h1>Posts</h1>
      <PostList posts={posts} />
    </div>
  );
};

import React, { useEffect, useState } from "react";
import PostCreate from "./PostCreate";
import PostList from "./PostList";
import axios from "axios";

// eslint-disable-next-line
export default () => {
  const [posts, setPosts] = useState({});

  const fetchPost = async () => {
    const res = await axios.get("http://localhost:4000/posts");

    return res.data;
  };

  useEffect(async () => {
    setPosts(await fetchPost());
  }, []);

import React, { useState, useEffect } from "react";

export default ({ posts }) => {
  const [postlist, setPostlist] = useState({});

  useEffect(() => {
    setPostlist(posts);
  }, [posts]);

  const renderedPosts = Object.values(posts).map((post) => {
    return (
      <div
        className="card"
        style={{ width: "30%", marginBottom: "20px" }}
        key={post.id}
      >
        <div className="card-body">
          <h3>{post.title}</h3>
        </div>
      </div>
    );
  });
  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {renderedPosts}
    </div>
  );
};

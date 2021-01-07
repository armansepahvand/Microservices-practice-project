import React, { useState } from "react";
import axios from "axios";

export default () => {
  //state to keep track of the Title input
  const [title, setTilte] = useState("");

  //function to handle sending the form input value to backend using axios
  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post("http://localhost:4000/posts", {
      title,
    });
    //set title to empty string to show empty input space after submitting
    setTilte("");
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTilte(e.target.value)}
          />
        </div>
        <butto className="btn btn-primary"> Submit</butto>
      </form>
    </div>
  );
};

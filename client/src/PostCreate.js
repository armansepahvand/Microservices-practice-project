import React, { useState } from "react";

export default (props) => {
  //state to keep track of the Title input
  const [title, setTilte] = useState("");

  //function to handle sending the form input value to backend using axios

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.onSubmit(title);
          setTilte("");
        }}
      >
        <div className="form-group">
          <label>Title</label>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTilte(e.target.value)}
          />
        </div>
        <button className="btn btn-primary"> Submit</button>
      </form>
    </div>
  );
};

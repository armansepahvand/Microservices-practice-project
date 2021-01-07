import React, {useState} from "react";
import axios from "axios";

// eslint-disable-next-line
export default ()=> {
  return (
    <div>
      <form>
        <div className="form-group">
          <label>Title</label>
          <input className="form-control" />
        </div>
        <butto className="btn btn-primary"> Submit</butto>
      </form>
    </div>
  );
}

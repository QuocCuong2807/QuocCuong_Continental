import React from "react";

function Loading() {
  return (
    <div className="spinner-border text-info " role="status" style={{marginTop: '10% ', marginLeft: '50%'}}>
      <span className="visually-hidden">Loading...</span>
    </div>
  );
}

export default Loading;

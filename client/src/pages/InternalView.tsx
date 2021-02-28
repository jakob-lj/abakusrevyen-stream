import React, { useState } from "react";

const InternalView = () => {
  const [val, setVal] = useState<string>("");

  return (
    <div>
      <p>Enter token to go to secret page</p>
      <input
        placeholder={"Input token"}
        onChange={(e: any) => {
          setVal(e.target.value);
        }}
      />
      <button
        onClick={() => {
          window.location.href = `/login/${val}`;
        }}
      >
        Take me there
      </button>
    </div>
  );
};

export default InternalView;

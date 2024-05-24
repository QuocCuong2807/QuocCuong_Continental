import React, { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";

function BookingProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initState);

  return (
    <div>
      <Context.Provider value={{ state, dispatch }}>
        {children}
      </Context.Provider>
    </div>
  );
}

export default BookingProvider;

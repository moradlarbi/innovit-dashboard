import React, { createContext, useContext, useReducer } from "react";

const appProducer = (
  state,
  action
) => {

  switch (action.type) {
    case "setUser": {
      console.log(action.payload)
      return { ...state, user: action.payload };
    }

    default:
      return { ...state };
  }
};

const defaultValues = {
  user:  (typeof window !== "undefined" && (window.localStorage.getItem('user') !== "undefined") )? JSON.parse(window.localStorage.getItem('user')): null,
};

const myState = {
  ctxt: defaultValues,
  dispatch: (action) => {},
};

const AppContext = createContext(myState); //initialize context with default value



export const AppProvider = ({ children }) => {
  const [ctxt, dispatch] = useReducer(appProducer, defaultValues);

return (
    <AppContext.Provider value={{ ctxt, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useCtxt = () => useContext(AppContext);

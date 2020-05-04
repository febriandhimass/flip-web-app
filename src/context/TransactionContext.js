import React, { createContext } from 'react';

const initialState = {
  transaction: window.localStorage.transaction ? JSON.parse(window.localStorage.transaction) : []
}
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH":
      // save in local storage to persist prev data before fetching
      localStorage.setItem("transaction", JSON.stringify(action.payload));
      return {
        ...state,
        transaction: action.payload
      };
    default:
      return state;
  }
};

export const TransactionContext = createContext();

export const TransactionProvider = props => {

  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <TransactionContext.Provider value={[state, dispatch]}>
      {props.children}
    </TransactionContext.Provider>
  )
}
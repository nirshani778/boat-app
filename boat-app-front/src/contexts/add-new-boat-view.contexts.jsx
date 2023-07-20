import { createContext, useState } from 'react';

export const AddNewBoatViewContext = createContext({
  newBoatView: null,
  setNewBoatView: () => {},
});

export const NewBoatViewProvider = ({ children }) => {
  const [newBoatView, setNewBoatView] = useState(false);
  const value = { newBoatView, setNewBoatView };
  return (
    <AddNewBoatViewContext.Provider value={value}>
      {children}
    </AddNewBoatViewContext.Provider>
  );
};

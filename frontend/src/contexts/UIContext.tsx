import { ReactNode, createContext, useContext, useState } from "react";

interface UIProviderProps {
  children: ReactNode;
}

interface UIContextInterface {
  showModal: "signin" | "signup" | "null";
  setShowModal: (val: "signin" | "signup" | "null") => void;
}

const defaultState = {
  showModal: "null",
  setShowModal: () => {},
} as UIContextInterface;

const UIContext = createContext<UIContextInterface>(defaultState);

export function useUI() {
  return useContext(UIContext);
}

export function UIProvider({ children }: UIProviderProps) {
  const [showModal, setShowModal] = useState(defaultState.showModal);

  const value: UIContextInterface = {
    showModal,
    setShowModal,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

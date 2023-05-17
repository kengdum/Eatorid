import { ReactNode, createContext, useContext, useState } from "react";

interface UIProviderProps {
  children: ReactNode;
}

interface UIContextInterface {
  showSignInModal: boolean;
  showSignUpModal: boolean;
  toggleSignInModal: (show: boolean | null) => void;
}

const defaultState = {
  showSignInModal: true,
  showSignUpModal: false,
  toggleSignInModal: () => {},
} as UIContextInterface;

const UIContext = createContext<UIContextInterface>(defaultState);

export function useUI() {
  return useContext(UIContext);
}

export function UIProvider({ children }: UIProviderProps) {
  const [showSignInModal, setShowSignInModal] = useState(defaultState.showSignInModal);
  const [showSignUpModal, setShowSignUpModal] = useState(defaultState.showSignUpModal);

  const toggleSignInModal = (show: boolean | null = null): void => {
    setShowSignInModal(curr => (show ? show : !curr));
  };

  const value: UIContextInterface = {
    showSignInModal,
    showSignUpModal,
    toggleSignInModal,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

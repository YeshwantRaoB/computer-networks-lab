import React, { useState } from 'react';
import { SidebarContext } from './SidebarContextValue';

export const SidebarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(prev => !prev);
  };

  const openSidebar = () => {
    setIsOpen(true);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <SidebarContext.Provider value={{
      isOpen,
      toggleSidebar,
      openSidebar,
      closeSidebar
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

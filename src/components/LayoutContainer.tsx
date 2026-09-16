import React from 'react';

interface LayoutContainerProps {
  children: React.ReactNode;
}

export const LayoutContainer: React.FC<LayoutContainerProps> = ({ children }) => {
  return (
    <>
      <div className="bg-mesh-container" />
      <div className="bg-grid-overlay" />
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {children}
      </div>
    </>
  );
};

import React from 'react';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children }) => {
  return <div style={{ maxWidth: '90%', minWidth: '80%', margin: '24px 24px'}}>{children}</div>;
};

export default ResponsiveLayout;

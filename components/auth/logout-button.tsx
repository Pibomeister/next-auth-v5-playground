'use client';

import React from 'react';
import { logout } from '@/actions/logout';

interface LogoutButtonProps {
  children?: React.ReactNode;
}

const LogoutButton = ({ children }: LogoutButtonProps) => {
  const onClick = () => {
    logout();
  };
  return (
    <span onClick={onClick} className="cursor-pointer">
      {children || 'Logout'}
    </span>
  );
};

export default LogoutButton;

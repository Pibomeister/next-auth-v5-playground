'use client';

import React from 'react';
import { UserRole } from '@prisma/client';
import { useCurrentRole } from '@/hooks/use-current-role';
import { FormError } from '@/components/form-error';

interface RoleGateProps {
  allowedRole: UserRole;
  children: React.ReactNode;
}

const RoleGate = ({ children, allowedRole }: RoleGateProps) => {
  const role = useCurrentRole();
  if (role !== allowedRole) {
    return (
      <FormError message="You do not have permission to view this content" />
    );
  }
  return <>{children}</>;
};

export default RoleGate;

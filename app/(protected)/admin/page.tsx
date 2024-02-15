'use client';

import React from 'react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RoleGate from '@/components/auth/role-gate';
import { FormSuccess } from '@/components/form-success';
import { UserRole } from '@prisma/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { admin } from '@/actions/admin';

function AdminPage() {
  const onServerActionClick = async () => {
    const data = await admin();
    if (data.error) {
      toast.error(data.error);
    }
    if (data.success) {
      toast.success(data.success);
    }
  };
  const onApiRouteClick = async () => {
    const res = await fetch('/api/admin');
    if (res.ok) {
      toast.success('Allowed API route!');
    } else {
      toast.error('Forbidden API route');
    }
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center">
          🔑 Admin
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are allowed to see this content" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin only API Route</p>
          <Button onClick={onApiRouteClick}>Click to test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin only server action</p>
          <Button onClick={onServerActionClick}>Click to test</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default AdminPage;

'use server';

import { signOut } from '@/auth';

export const logout = async () => {
  // Here you can do server operations before signing out.
  await signOut();
};

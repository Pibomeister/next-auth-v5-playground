'use server';

import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { getVerificationTokenByToken } from '@/data/verification-token';

export const verifyEmail = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: 'Token does not exist!' };
  }

  if (new Date(existingToken.expires) < new Date()) {
    return { error: 'Token expired!' };
  }

  const user = await getUserByEmail(existingToken.email);

  if (!user) {
    return { error: 'Email not found!' };
  }

  await db.user.update({
    where: {
      email: existingToken.email,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: 'Email verified!' };
};

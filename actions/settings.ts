'use server';

import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { getUserById } from '@/data/user';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/mail';
import { generateVerificationToken } from '@/lib/tokens';
import { SettingsSchema } from '@/schemas';

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  console.log('values', values);
  const user = await currentUser();
  if (!user) {
    return {
      error: 'Unauthorized!',
    };
  }

  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return {
      error: 'Unauthorized!',
    };
  }
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== dbUser.email) {
    const existingUser = await db.user.findUnique({
      where: { email: values.email },
    });
    if (existingUser && existingUser.id !== user.id) {
      return {
        error: 'Email already in use!',
      };
    }

    const verifficationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verifficationToken.email,
      verifficationToken.token
    );

    return {
      success: 'Verification email sent!',
    };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );
    if (!passwordsMatch) {
      return {
        error: 'Password is incorrect!',
      };
    }
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }
  await db.user.update({
    where: { id: user.id },
    data: {
      ...values,
    },
  });
  return {
    success: 'Settings updated!',
  };
};

import db from '../';
import { User, Session } from '@prisma/client';

const getById = async (id: number): Promise<User> => {
  const user = await db.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  return user;
};

const getByEmail = async (email: string): Promise<User> => {
  const user = await db.user.findUnique({
    where: {
      email: String(email),
    },
  });
  return user;
};

const getByAccessToken = async (accessToken: string): Promise<User> => {
  const session = await db.session.findUnique({
    where: {
      accessToken: accessToken,
    },
  });
  if (!session || !session.userId) return null;

  const user = await db.user.findUnique({
    where: {
      id: session.userId,
    },
  });

  if (!user) return null;

  return user;
};

const user = { getById, getByEmail, getByAccessToken };

export default user;

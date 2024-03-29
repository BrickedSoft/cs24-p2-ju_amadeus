import bcrypt from "bcrypt";
import { randomBytes } from "crypto";

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const validatePassword = async (
  plainPassword: string,
  hashedPassword: string,
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const generateRandomToken = (length: number): string => {
  return randomBytes(Math.ceil(length / 2))
    .toString("hex")
    .slice(0, length);
};

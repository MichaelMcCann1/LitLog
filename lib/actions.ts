"use server";

import { registrationFormSchema } from "@/app/(withoutNav)/register/_components/registrationForm";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { loginFormSchema } from "@/app/(withoutNav)/login/_components/loginForm";
import { signIn } from "@/auth";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}

export const createUser = async (
  userData: z.infer<typeof registrationFormSchema>
) => {
  const { username, email, password } = userData;
  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await sql<User>`
    SELECT email, username
    FROM users 
    WHERE email = ${email} OR username = ${username}`;

  if (rows.length) {
    if (rows[0].email === email) {
      return "Error! The email entered is already in use.";
    }
    return "Error! The username entered is already in use.";
  }

  try {
    await sql<User>`INSERT INTO users (username, email, password)
    VALUES (${username}, ${email}, ${hashedPassword})
    `;
  } catch (error) {
    console.log(error);
  }

  await logInUser({ email, password });
};

export const logInUser = async (userData: z.infer<typeof loginFormSchema>) => {
  const { email, password } = userData;

  const { rows } = await sql<User>`
  SELECT * FROM users WHERE email=${email}
  `;

  if (!rows.length) {
    return "Error! Invalid credentials";
  }

  const entry = rows[0];
  const passwordsMatch = await bcrypt.compare(password, entry.password);

  if (!passwordsMatch) {
    return "Error! Invalid credentials";
  }

  await signIn("credentials", { ...entry, redirectTo: "/" });
};

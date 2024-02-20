"use server";

import { registrationFormSchema } from "@/app/(withoutNav)/register/_components/registrationForm";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import bcrypt from "bcrypt";
import { User } from "../createTables";
import { revalidatePath } from "next/cache";
import { loginFormSchema } from "@/app/(withoutNav)/login/_components/loginForm";
import { signIn, signOut } from "@/auth";
import { addDefaultBookshelves } from "./bookshelfActions";

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

  await addDefaultBookshelves(username, email);
  await logInUser({ email, password });

  revalidatePath("/bookshelves");
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

export const logoutButtonCallback = async () => {
  await signOut();
};

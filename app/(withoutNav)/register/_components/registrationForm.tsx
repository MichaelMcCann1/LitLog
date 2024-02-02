"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createUser } from "@/lib/actions";
import Link from "next/link";

export const registrationFormSchema = z
  .object({
    email: z.string().email(),
    username: z
      .string()
      .min(4, { message: "Username must be at least 2 characters." })
      .max(20, { message: "Username must be less than 20 characters." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .max(20, { message: "Password must be less than 20 characters." }),
    passwordConfirm: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .max(20, { message: "Password must be less than 20 characters." }),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    message: "Passwords do not match!",
    path: ["passwordConfirm"],
  });

export default function RegistrationForm() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: "",
      username: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const handleSubmit = (userData: z.infer<typeof registrationFormSchema>) => {
    setErrorMessage(undefined);
    startTransition(() => {
      createUser(userData).then((error) => {
        setErrorMessage(error);
      });
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col w-[500px] border rounded-sm px-6 py-8 gap-4"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        {errorMessage && <p className="text-red-400">{errorMessage}</p>}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirm"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-8" type="submit" disabled={isPending}>
          Register
        </Button>
        <Link className="text-center mt-4 text-sm" href="/login">
          Already have an account?
        </Link>
      </form>
    </Form>
  );
}

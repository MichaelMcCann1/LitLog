"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { logInUser } from "@/lib/actions/userActions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (userData: z.infer<typeof loginFormSchema>) => {
    setErrorMessage(undefined);
    startTransition(() => {
      logInUser(userData).then((error) => {
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} disabled={isPending} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-8" type="submit" disabled={isPending}>
          Sign In
        </Button>
        <Link className="text-center mt-4 text-sm" href="/register">
          Don&apos;t have an account?
        </Link>
      </form>
    </Form>
  );
}

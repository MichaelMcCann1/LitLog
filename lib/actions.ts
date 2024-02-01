import { registrationFormSchema } from "@/app/(withoutNav)/register/_components/registrationForm";
import { z } from "zod";

export const createUser = async (
  userData: z.infer<typeof registrationFormSchema>
) => {
  console.log(userData);
};

import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { SignupValidation } from "@/lib/validation";
import { useCreateUserAccountMutation } from "@/hooks/useUser";
import { z } from "zod";
import Loader from "@/components/shared/Loader";
import axios from "axios";

const SignupForm = () => {
  const { toast } = useToast();
  const { mutate: registerUser, isLoading: isCreatingUser } = useCreateUserAccountMutation();

  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    },
  });

  const createDefaultAvatar = (firstName: string, lastName: string) => {
    const initials = `${firstName[0]}${lastName[0]}`.toUpperCase();
    return `https://ui-avatars.com/api/?name=${initials}`;
  };

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
      console.log("Sending POST request with data:", values);
      const avatarUrl = createDefaultAvatar(values.firstName, values.lastName);
      const newUser = { ...values, imageUrl: avatarUrl };
      registerUser(newUser);
  }
     
  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          {" "}
          Create a new Account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use Snapgram enter your detail
        </p>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>firstName</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>lastName</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
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
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isCreatingUser ? (
              <div className="flex-center gap-2">
                <Loader /> Loading..
              </div>
            ) : (
              "Sign up"
            )}
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an Account?
            <Link
              to="sign-in"
              className="text-primary-500 text-small-semibold ml-1"
            >
              Log in{" "}
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignupForm;

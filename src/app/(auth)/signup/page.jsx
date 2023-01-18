"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const schema = object({
  name: string().required().min(3).max(16).trim(),
  email: string().required().email().trim(),
  password: string().required().min(9).max(26).trim(),
}).required();

const Signup = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { name, email, password } = data;
    console.log("email: ", email);
    console.log("password: ", password);

    // TODO:
    // Use NextAuth.js to connect.
    // then redirect to Profile.
  };

  return (
    <main className="flex flex-col justify-center items-center h-[100%]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
        <Controller
          name="name"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              id="name"
              type="text"
              variant="standard"
              className="ml-[20px] mr-[20px]"
              label="Name"
              placeholder="Enter your name"
              helperText={errors.name ? errors.name?.message : ""}
              error={errors.name ? Boolean(true) : Boolean(false)}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              id="email"
              type="email"
              variant="standard"
              className="ml-[20px] mr-[20px]"
              label="Email"
              placeholder="Enter your email"
              helperText={errors.email ? errors.email?.message : ""}
              autoComplete="off"
              error={errors.email ? Boolean(true) : Boolean(false)}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              id="password"
              type="password"
              variant="standard"
              className="ml-[20px] mr-[20px]"
              label="Password"
              placeholder="Enter your password"
              helperText={errors.password ? errors.password?.message : ""}
              error={errors.password ? Boolean(true) : Boolean(false)}
            />
          )}
        />

        <Button
          type="submit"
          variant="outlined"
          className="mt-[40px] ml-[20px] mr-[20px]"
        >
          Register
        </Button>

        <Button
          type="button"
          variant="outlined"
          color="warning"
          className="mt-[40px] ml-[20px] mr-[20px]"
        >
          <Link href="/signin">Go to sign-in</Link>
        </Button>

        <Button
          type="button"
          variant="outlined"
          color="secondary"
          className="ml-[20px] mr-[20px]"
        >
          <Link href="/">Back to home page</Link>
        </Button>
      </form>
    </main>
  );
};

export default Signup;

"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const schema = object({
  email: string().required().email(),
  password: string().required().min(9).max(26),
}).required();

const Signin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    console.log("email: ", email);

    // Use NextAuth.js to connect.
  };

  return (
    <main className="flex flex-col justify-center items-center h-[100%]">
      <h1 className="font-bold text-[40px] text-gray-900 mb-[60px]">Sign-in</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-7">
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
          Submit
        </Button>

        <Button
          type="button"
          variant="outlined"
          color="secondary"
          className="mt-[20px] ml-[20px] mr-[20px]"
        >
          <Link href="/">Back to home page</Link>
        </Button>
      </form>
    </main>
  );
};

export default Signin;

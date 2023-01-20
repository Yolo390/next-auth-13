"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validator from "validator";
import { object, ref, string } from "yup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import AuthError from "@/components/error/AuthError.jsx";

const schema = object({
  name: string()
    .required("Please enter your name.")
    .min(3, "Must be between 3 to 16 characters.")
    .max(16, "Must be between 3 to 16 characters.")
    .trim(),
  email: string()
    .required("Please enter your email.")
    .email("Email is invalid.")
    .trim(),
  password: string()
    .required("Please enter your password.")
    .min(9, "Must be between 9 to 16 characters.")
    .max(16, "Must be between 9 to 16 characters.")
    .trim(),
  confirmPassword: string()
    .required("Please re enter your password.")
    .oneOf([ref("password"), null], "Passwords don't match !"),
}).required();

const SignUpForm = () => {
  const [error, setError] = useState({});

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    const { name, email, password, confirmPassword } = data;

    // Use validator to avoid XSS attacks.
    const safeData = {
      name: validator.escape(name),
      email: validator.escape(email),
      password: validator.escape(password),
      confirmPassword: validator.escape(confirmPassword),
    };

    // Create an user account.
    fetch("/api/signUp", {
      body: JSON.stringify(safeData),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          setError({ message: res.error });
          return null;
        }

        // Redirect to `/signin` if ok.
        router.push("/signin");
      });
  };

  return (
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

      <Controller
        name="confirmPassword"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            id="confirmPassword"
            type="password"
            variant="standard"
            className="ml-[20px] mr-[20px]"
            label="Confirm password"
            placeholder="Enter again your password"
            helperText={
              errors.confirmPassword ? errors.confirmPassword?.message : ""
            }
            error={errors.confirmPassword ? Boolean(true) : Boolean(false)}
          />
        )}
      />

      {error?.message && <AuthError error={error} setError={setError} />}

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
  );
};

export default SignUpForm;

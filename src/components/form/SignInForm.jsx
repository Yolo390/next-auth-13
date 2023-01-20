"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import AuthError from "@/components/error/AuthError.jsx";

const schema = object({
  email: string()
    .required("Please enter your email adress.")
    .email("Invalid email adress !"),
  password: string()
    .required("Please enter your password.")
    .min(9, "Must be between 9 to 26 characters !")
    .max(26, "Must be betwen 9 to 26 characters !"),
}).required();

const LoginForm = () => {
  const [error, setError] = useState({});

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const { email, password } = data;

    try {
      const { ok, error, url } = await signIn("credentials", {
        redirect: Boolean(false),
        email,
        password,
        callbackUrl: callbackUrl || "/",
      });

      if (!ok && error === "CredentialsSignin")
        setError({ message: "Bad email or password !" });

      if (ok && url) router.push(url);
    } catch (error) {
      setError({ message: error.message });
    }
  };

  return (
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

      {error?.message && <AuthError error={error} setError={setError} />}

      <Button
        type="submit"
        variant="outlined"
        className="mt-[40px] ml-[20px] mr-[20px]"
      >
        Login
      </Button>

      <Button
        type="button"
        variant="outlined"
        color="warning"
        className="mt-[40px] ml-[20px] mr-[20px]"
      >
        <Link href="/signup">Go to sign-up</Link>
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

export default LoginForm;

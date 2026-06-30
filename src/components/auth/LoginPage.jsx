"use client";

import Link from "next/link";

import {
  Card,
  CardHeader,
  CardContent as CardBody,
  Input,
  Button,
  Label,
  Form,
} from "@heroui/react";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

import Logo from "@/components/ui/Logo";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { authClient } from "@/lib/auth-client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { syncUser } from "@/lib/api/users/action";

const LoginPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  console.log(errors);
  const onSubmit = async (formData) => {
    try {
      const { error: signInError } =
        await authClient.signIn.email({
          email: formData.email,
          password: formData.password,
        });
      // 1. Check for operational errors returned by Better Auth
      if (signInError) {
        toast.error(signInError.message || "Login failed.");
        return;
      }
      await syncUser();
      toast.success("Logged in successfully!");
      router.push("/");

    } catch (error) {
      toast.error(`Login failed: ${error.message}`);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      toast.error(`Google Sign-In failed: ${error.message}`);
    }
  };
  return (
    <div className="flex justify-center bg-background max-w-7xl mx-auto rounded-2xl shadow-md my-20">
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <Image
          src="/destination-banner.png"
          alt="Destination Banner"
          width={400}
          height={400}
          className="object-cover h-full w-full rounded-tl-2xl rounded-bl-2xl"
        />
      </div>
      <Card className="w-1/2 border border-white/5 bg-background/50 backdrop-blur-xl p-4 rounded-bl-none">
        <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
          <Logo />
          <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-blue-900 via-blue-500 to-blue-200 bg-clip-text text-transparent">
            Welcome Back
          </h1>
          <p className="text-sm mt-1">
            Access your RouteGo account and purchase tickets.
          </p>
        </CardHeader>
        <CardBody className="gap-4 mx-auto">
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-md">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <FaEnvelope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+\.\S+$/,
                })}
                id="email"
                placeholder="john@example.com"
                type="email"
                className="w-full rounded-xl border border-border bg-background py-3 pl-9 pr-3 text-foreground placeholder:text-muted-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <FaLock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                {...register("password", {
                  required: true,
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                    message:
                      "Password must contain at least one uppercase letter, one lowercase letter, and one number",
                  },
                  minLength: 6,
                  maxLength: 20,
                })}
                id="password"
                placeholder="••••••••"
                type="password"
                className="w-full rounded-xl border border-border bg-background py-3 pl-9 pr-3 text-foreground placeholder:text-muted-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-linear-to-r from-blue-900 text-white font-bold h-12 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20"
              radius="lg"
            >
              Sign In
            </Button>
          </Form>

          <div className="flex items-center my-4">
            <div className="grow border-t border-white/5" />
            <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">
              Or Login With
            </span>
            <div className="grow border-t border-white/5" />
          </div>

          <Button
            variant="bordered"
            onClick={handleGoogleSignIn}
            className="w-full bg-white border-black/40 hover:translate-y-0.5 font-semibold h-11"
            radius="lg"
          >
            <FaGoogle className="pointer-events-none h-4 w-4 text-blue-500" />
          </Button>

          <p className="text-center text-sm text-slate-400 mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-900 hover:text-blue-400 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginPage;

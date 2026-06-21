"use client";

import Link from "next/link";

import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form, Select, SelectTrigger, SelectValue, SelectIndicator, SelectPopover, ListBox, ListBoxItem } from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaUserCircle } from "react-icons/fa";
import Logo from "@/components/ui/Logo";
import Image from "next/image";

import { useForm } from "react-hook-form"
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";


export default function RegisterPage() {
    const { register, handleSubmit, formState: {errors}} = useForm();
    console.log(errors);
    const onSubmit = async (formData) => {
    const { data: signUpData, error: signUpError } = await authClient.signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: formData.role
});
        console.log(signUpData, signUpError);

        if(signUpError) {
            toast.error("Registration failed. Please try again.");
        }
        else {
            redirect('/login');
        }
    };

    return (
        <div className="flex justify-center bg-background max-w-7xl mx-auto rounded-2xl shadow-md my-20">
            <div className="hidden md:flex w-1/2 items-center justify-center">
                <Image
                src="/auth-travel.png"
                alt="Destination Banner"
                width={400}
                height={400}
                className="object-cover h-full w-full rounded-tl-2xl rounded-bl-2xl"
                />
            </div>
            <Card className="w-1/2 border border-white/5 bg-background/50 backdrop-blur-xl rounded-bl-none rounded-tl-none p-4">
            <CardHeader className="flex flex-col gap-1 items-center pb-6 text-center">
                <Logo />
                <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r  from-blue-900 via-blue-500 to-blue-200 bg-clip-text text-transparent">
                    Create an Account
                </h1>
                <p className="text-slate-400 text-sm mt-1">
                    Join RouteGo to book premium events or host your own organization.
                </p>
            </CardHeader>
            <CardBody className="gap-4 mx-auto">
                <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-md">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                    <FaUser className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        {...register("name", { required: true, minLength: 3, maxLength: 20 })}
                        id="name"
                        placeholder="John Doe"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-9 pr-3 text-foreground placeholder:text-muted-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm">Name is required and should be between 3 and 20 characters</p>}

                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                    <FaEnvelope className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        {...register("email", { required: true, pattern: /^\S+@\S+\.\S+$/ })}
                        id="email"
                        placeholder="john@example.com"
                        type="email"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-9 pr-3 text-foreground placeholder:text-muted-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm">Please enter a valid email address</p>}

                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                    <FaLock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        {...register("password", { required: true, pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    }, minLength: 6, maxLength: 20 })}
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        className="w-full rounded-xl border border-border bg-background py-3 pl-9 pr-3 text-foreground placeholder:text-muted-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    </div>
                    {errors.password && <p className="text-red-500 text-sm">Password is required and should be between 6 and 20 characters</p>}

                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="role">Select Role</Label>
                        <div className="relative">
                            <FaUserCircle className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <select
                            {...register("role", { required: true })}
                            id="role"
                            aria-label="Select Role"
                            placeholder="Select Role"
                            className="w-full rounded-xl border border-border bg-background py-5 pl-18 pr-3 text-foreground transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                            <option value="">Select Role</option>
                            <option value="user">User (Browse & Book Tickets)</option>
                            <option value="vendor">Vendor (Create Tickets)</option>
                        </select>
                        </div>
                    </div>
                    {errors.role && <p className="text-red-500 text-sm">Please select a role.</p>}

                    <Button
                        type="submit"
                        className="w-full bg-linear-to-r from-blue-900 text-white font-bold h-12 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20"
                        radius="lg"
                    >
                        Create Account
                    </Button>
                </Form>

                <div className="flex items-center my-4">
                    <div className="grow border-t border-white/5" />
                    <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">Or Sign Up With</span>
                    <div className="grow border-t border-white/5" />
                </div>

                <Button
                    variant="bordered"
                    className="w-full bg-white border-black/40 hover:translate-y-0.5 font-semibold h-11"
                    radius="lg"
                >
                    <FaGoogle className="pointer-events-none h-4 w-4 text-blue-500" />
                </Button>

                <p className="text-center text-sm text-slate-400 mt-6">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-500 hover:text-blue-400 font-semibold hover:underline">
                        Log In
                    </Link>
                </p>
            </CardBody>
        </Card>
        </div>
        
    );
}

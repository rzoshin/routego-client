"use client";


import Link from "next/link";

import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form } from "@heroui/react";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";

import Logo from "@/components/ui/Logo";
import Image from "next/image";
const LoginPage = () => {
    return (
        <div className="flex justify-center bg-background max-w-7xl mx-auto my-4 rounded-2xl shadow-lg">
            <div className="hidden md:flex w-1/2 items-center justify-center">
                <Image
                src="/destination-banner.png"
                alt="Destination Banner"
                width={400}
                height={400}
                className="object-cover h-full w-full rounded-tl-2xl rounded-bl-2xl shadow-2xl"
                />
            </div>
            <Card className="w-1/2 border border-white/5 bg-background/50 backdrop-blur-xl shadow-2xl p-4 rounded-bl-none">
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
                <Form className="space-y-4 w-md">
                    <Label htmlFor="email">
                        Email Address
                    </Label>
                    <Input
                        id="email"
                        placeholder="john@example.com"
                        type="email"
                        labelplacement="outside"
                        startcontent={<FaEnvelope className="text-slate-400 text-sm" />}
                        className="w-full border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
                    />
                    <Label htmlFor="password">
                        Password
                    </Label>
                    <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        labelplacement="outside"
                        startcontent={<FaLock className="text-slate-400 text-sm" />}
                        className="w-full border-white/10 hover:border-pink-500/50 focus-within:border-pink-500"
                    />

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
                    <span className="mx-4 text-xs text-slate-500 font-semibold uppercase">Or Login With</span>
                    <div className="grow border-t border-white/5" />
                </div>

                <Button
                    variant="bordered"
                    className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 font-semibold h-11"
                    radius="lg"
                    startContent={<FaGoogle className="text-blue-500" />}
                >
                    Google Account
                </Button>

                <p className="text-center text-sm text-slate-400 mt-6">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-blue-500 hover:text-blue-400 font-semibold hover:underline">
                        Sign Up
                    </Link>
                </p>
            </CardBody>
        </Card>
        </div>
        
    )
}

export default LoginPage;
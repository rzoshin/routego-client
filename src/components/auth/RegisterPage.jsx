"use client";

import Link from "next/link";

import { Card, CardHeader, CardContent as CardBody, Input, Button, Label, Form, Select, SelectTrigger, SelectValue, SelectIndicator, SelectPopover, ListBox, ListBoxItem } from "@heroui/react";
import { FaUser, FaEnvelope, FaLock, FaImage, FaGoogle } from "react-icons/fa";
import Logo from "@/components/ui/Logo";
import Image from "next/image";

export default function RegisterPage() {
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
            <Card className="w-1/2 border border-white/5 bg-background/50 backdrop-blur-xl shadow-2xl rounded-bl-none rounded-tl-none p-4">
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
                <Form className="space-y-4 w-md">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        labelplacement="outside"
                        startcontent={<FaUser className="text-slate-400 text-sm" />}
                        className="w-full border-white/10 hover:border-blue-500/50 focus-within:border-blue-500"
                    />
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        placeholder="john@example.com"
                        type="email"
                        labelplacement="outside"
                        startcontent={<FaEnvelope className="text-slate-400 text-sm" />}
                        className="w-full border-white/10 hover:border-blue-500/50 focus-within:border-blue-500"
                    />
                    <Label htmlFor="image">Profile Image URL</Label>
                    <Input
                        id="image"
                        placeholder="https://example.com/avatar.jpg"
                        labelplacement="outside"
                        startcontent={<FaImage className="text-slate-400 text-sm" />}
                        className="w-full border-white/10 hover:border-blue-500/50 focus-within:border-blue-500"
                    />

                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        placeholder="••••••••"
                        type="password"
                        labelplacement="outside"
                        startcontent={<FaLock className="text-slate-400 text-sm" />}
                        className="w-full border-white/10 hover:border-blue-500/50 focus-within:border-blue-500"
                    />

                    <div className="flex flex-col gap-2 w-full">
                        <Label htmlFor="role" className="text-sm font-semibold text-slate-300">Select Role</Label>
                        <Select
                            id="role"
                            aria-label="Select Role"
                            placeholder="Select Role"
                            className="w-full"
                        >
                            <SelectTrigger className="w-full flex items-center justify-between border border-white/10 rounded-xl px-3 h-11 text-white text-sm">
                                <SelectValue />
                                <SelectIndicator />
                            </SelectTrigger>
                            <SelectPopover className="bg-slate-950 border border-white/10 rounded-xl shadow-2xl p-1 min-w-50">
                                <ListBox className="outline-none">
                                    <ListBoxItem key="attendee" id="attendee" textValue="Attendee" className="p-2 text-white hover:bg-blue-500/20 rounded-lg cursor-pointer">User (Browse & Book Tickets)</ListBoxItem>
                                    <ListBoxItem key="organizer" id="organizer" textValue="Organizer" className="p-2 text-white hover:bg-blue-500/20 rounded-lg cursor-pointer">Vendor (Create Tickets)</ListBoxItem>
                                </ListBox>
                            </SelectPopover>
                        </Select>
                    </div>

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
                    className="w-full border-white/10 hover:bg-white/5 hover:border-white/20 font-semibold h-11"
                    radius="lg"
                    startcontent={<FaGoogle className="text-blue-500" />}
                >
                    Google OAuth
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

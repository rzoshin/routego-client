"use server";

import { serverMutation } from "../server";

export const createUser = async (userData) => {
    const resData = await serverMutation(userData, "/api/users", "POST");
    return resData;
}
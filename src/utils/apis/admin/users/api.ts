/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminGetUsers } from "./types";
import axiosWithConfig from "../../axiosWithConfig";

export const getUsers = async (pageNumber: number, limit: number) => {
  try {
    const response = await axiosWithConfig.get(`/admin/users?page=${pageNumber}&limit=${limit}`);
    return response.data as AdminGetUsers;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

"use client";
import { useAppDispatch } from "@/hooks/hook";
import { setToken } from "@/redux/features/authSlice";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
const SetToken = () => {
  const session = useSession();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setToken(session.data?.user.token));
  }, [dispatch, session]);

  return null;
};

export default SetToken;

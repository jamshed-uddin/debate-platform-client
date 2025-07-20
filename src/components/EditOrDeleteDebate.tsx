"use client";

import { DebateType } from "@/lib/definition";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import ModalClient from "./ModalClient";
import toast from "react-hot-toast";
import { useDeleteDebateMutation } from "@/redux/api/debateApi";
import { useRouter } from "next/navigation";

const EditOrDeleteDebate = ({ debate }: { debate: DebateType }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [deleteDebate, { isLoading }] = useDeleteDebateMutation();
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const deleteDebateHandler = async () => {
    try {
      await deleteDebate(debate?._id).unwrap();
      toast.success("Debate deleted");
      router.replace("/debates");
    } catch {
      toast.error("Failed to delete debate");
    }
  };

  return (
    <>
      {open && (
        <ModalClient open={open} close={closeModal}>
          <div>
            <h3 className=" text-lg font-semibold">
              Are you sure you want to delete the debate?
            </h3>
            <div className="flex justify-end items-center gap-3 mt-3">
              <Button
                onClick={deleteDebateHandler}
                disabled={isLoading}
                className=""
                variant={"destructive"}
                size={"sm"}
              >
                Delete
              </Button>
              <Button
                onClick={() => closeModal()}
                size={"sm"}
                variant={"secondary"}
              >
                Cancel
              </Button>
            </div>
          </div>
        </ModalClient>
      )}
      <div>
        <div className=" ">
          <Link href={`/edit-debate/${debate?._id}`}>
            <Button variant={"ghost"}>
              <PencilSquareIcon className="w-4 h-4" />
            </Button>
          </Link>
          <Button variant={"ghost"} onClick={openModal}>
            <TrashIcon className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default EditOrDeleteDebate;

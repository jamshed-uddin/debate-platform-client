"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  close: () => void;
  children: ReactNode;
  internalCloseButton?: boolean;
}

const ModalClient = ({
  open = false,
  close,
  children,
  internalCloseButton = false,
}: ModalProps) => {
  return (
    <Dialog
      open={open}
      as="div"
      className="relative z-30 focus:outline-none"
      onClose={close}
    >
      <DialogBackdrop className="fixed inset-0 bg-black/30" />

      <div className="fixed inset-0 z-40 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="h-fit w-full max-w-md rounded-xl bg-white p-6  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-xl relative"
          >
            {internalCloseButton && (
              <button
                role="button"
                onClick={close}
                className="absolute top-2 right-2 cursor-pointer"
              >
                <XMarkIcon className="w-4" />
              </button>
            )}
            {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalClient;

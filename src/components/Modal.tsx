"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  className,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={cn(
              "relative w-full max-w-md bg-[#FAF9F5] rounded-2xl p-5 sm:p-6 border border-[#191919]/20 shadow-xl z-10 overflow-y-auto max-h-[90dvh] text-[#191919]",
              className
            )}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#191919]/10">
              {title && (
                <h3 className="text-base sm:text-lg font-heading font-bold text-[#191919] tracking-tight">
                  {title}
                </h3>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#ECEAE4] hover:bg-[#E2E0D8] text-[#191919] transition-all ml-auto cursor-pointer"
                title="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="font-body text-xs sm:text-sm">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


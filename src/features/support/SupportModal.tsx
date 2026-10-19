"use client";

import React from "react";
import { Sparkles, CheckCircle, ExternalLink } from "lucide-react";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { SupportModalProps } from "@/types";
import { SOCIAL_LINKS } from "@/constants/frames";

export const SupportModal: React.FC<SupportModalProps> = ({
  isOpen,
  onClose,
  onConfirmDownload,
}) => {
  const handleFollowClick = () => {
    window.open(SOCIAL_LINKS.instagram, "_blank");
    onConfirmDownload();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Dukung SKYTIVE PHOTOBOOTH">
      <div className="flex flex-col items-center text-center py-2">
        <div className="w-12 h-12 rounded-xl bg-[#ECEAE4] border border-[#191919]/15 flex items-center justify-center text-[#191919] shadow-xs mb-3.5 shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>

        <p className="text-base font-heading font-bold text-[#191919] mb-1.5 tracking-tight leading-snug">
          Terima kasih telah berkreasi bersama kami
        </p>

        <p className="text-xs text-[#595856] font-body leading-relaxed mb-5 px-2">
          Suka dengan pengalaman studio photobooth kontemporer ini? Dukung kami dengan mengikuti akun Instagram creator & SKYTIVE PHOTOBOOTH.
        </p>

        <div className="flex flex-col gap-2.5 w-full">
          <Button
            size="md"
            variant="primary"
            onClick={handleFollowClick}
            className="w-full py-2.5 text-xs font-semibold"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            <span>Follow Instagram Creator</span>
          </Button>

          <Button
            variant="ghost"
            size="md"
            onClick={onConfirmDownload}
            className="w-full py-2 text-xs font-mono text-[#595856] hover:text-[#191919]"
          >
            <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
            <span>Sudah Follow (Lanjut ke Unduhan)</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
};


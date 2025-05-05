"use client";

import { Button } from "@/components/ui/button";
import { ProfileData } from "@/types/profile";

interface DeleteConfirmProps {
  profile: ProfileData | null;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirm({
  profile,
  isDeleting,
  onConfirm,
  onCancel,
}: DeleteConfirmProps) {
  return (
    <div className="w-full p-4 text-neutral-900">
      <h3 className="mb-4 text-center text-lg font-medium">프로필 삭제</h3>
      <p className="mb-6 text-center">
        정말로 &ldquo;{profile?.name}&rdquo; 프로필을 삭제하시겠습니까?
      </p>
      <div className="flex justify-center gap-3">
        <Button variant="default" onClick={onConfirm} disabled={isDeleting} className="w-1/2">
          {isDeleting ? "삭제 중..." : "삭제"}
        </Button>
        <Button variant="cancel" onClick={onCancel} disabled={isDeleting} className="w-1/2">
          취소
        </Button>
      </div>
    </div>
  );
}

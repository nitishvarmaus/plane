"use client";

import { useRouter } from "next/navigation";
// components
import { EmptyState } from "@/components/common";
// assets
import emptyInvitation from "public/empty-state/invitation.svg";

export const InvitationsEmptyState = () => {
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0 grid h-full w-full place-items-center">
      <EmptyState
        title="No pending invites"
        description="You can see here if someone invites you to a workspace."
        image={emptyInvitation}
        primaryButton={{
          text: "Back to home",
          onClick: () => router.push("/"),
        }}
      />
    </div>
  );
};

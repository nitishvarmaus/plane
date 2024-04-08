"use client";

import React from "react";
import useSWR from "swr";
// hooks
import { useUser, useUserInvitations } from "@/hooks/store";
// components
import { InvitationsEmptyState } from "./empty-state";
import { InvitationsHeader } from "./header";
import { InvitationsList } from "./invitations-list";

const UserInvitationsPage = () => {
  // store hooks
  const { currentUser } = useUser();
  const { fetchWorkspaceInvitations, workspaceInvitation } = useUserInvitations();
  // fetching invitations data
  useSWR("USER_WORKSPACE_INVITATIONS", () => fetchWorkspaceInvitations());

  console.log("currentUser", currentUser);

  return (
    <>
      <div className="flex h-full flex-col gap-y-2 overflow-hidden sm:flex-row sm:gap-y-0">
        <InvitationsHeader currentUser={currentUser} />
        {workspaceInvitation ? (
          workspaceInvitation.length > 0 ? (
            <div className="relative flex h-full justify-center px-8 pb-8 sm:w-10/12 sm:items-center sm:justify-start sm:p-0 sm:pr-[8.33%] md:w-9/12 lg:w-4/5">
              <div className="w-full space-y-10">
                <h5 className="text-lg">We see that someone has invited you to</h5>
                <h4 className="text-2xl font-semibold">Join a workspace</h4>
                <InvitationsList invitations={workspaceInvitation} />
              </div>
            </div>
          ) : (
            <InvitationsEmptyState />
          )
        ) : null}
      </div>
    </>
  );
};

export default UserInvitationsPage;

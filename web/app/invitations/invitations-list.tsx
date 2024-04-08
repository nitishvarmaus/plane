"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
// types
import { IWorkspaceMemberInvitation } from "@plane/types";
// ui
import { Button, TOAST_TYPE, setToast } from "@plane/ui";
// constants
import { MEMBER_ACCEPTED } from "@/constants/event-tracker";
import { ROLE } from "@/constants/workspace";
// helpers
// import { truncateText } from "@/helpers/string.helper";
import { getUserRole } from "@/helpers/user.helper";
// hooks
import { useEventTracker, useUser } from "@/hooks/store";
// services
import { UserService } from "@/services/user.service";
import { WorkspaceService } from "@/services/workspace.service";

const workspaceService = new WorkspaceService();
const userService = new UserService();

export type InvitationsListProps = {
  invitations: IWorkspaceMemberInvitation[];
  mutateInvitations?: () => void;
};

export const InvitationsList = (props: InvitationsListProps) => {
  const { invitations } = props;
  // router
  const router = useRouter();
  // states
  const [invitationsRespond, setInvitationsRespond] = useState<string[]>([]);
  const [isJoiningWorkspaces, setIsJoiningWorkspaces] = useState(false);
  // store hooks
  const { currentUserSettings } = useUser();
  const { captureEvent, joinWorkspaceMetricGroup } = useEventTracker();

  const redirectWorkspaceSlug =
    currentUserSettings?.workspace?.last_workspace_slug ||
    currentUserSettings?.workspace?.fallback_workspace_slug ||
    "";

  const handleInvitation = (workspace_invitation: IWorkspaceMemberInvitation, action: "accepted" | "withdraw") => {
    if (action === "accepted") {
      setInvitationsRespond((prevData) => [...prevData, workspace_invitation.id]);
    } else if (action === "withdraw") {
      setInvitationsRespond((prevData) => prevData.filter((item: string) => item !== workspace_invitation.id));
    }
  };

  const submitInvitations = () => {
    if (invitationsRespond.length === 0) {
      setToast({
        type: TOAST_TYPE.ERROR,
        title: "Error!",
        message: "Please select at least one invitation.",
      });
      return;
    }

    setIsJoiningWorkspaces(true);

    workspaceService
      .joinWorkspaces({ invitations: invitationsRespond })
      .then(() => {
        // mutate("USER_WORKSPACES");
        const firstInviteId = invitationsRespond[0];
        const invitation = invitations?.find((i) => i.id === firstInviteId);
        const redirectWorkspace = invitations?.find((i) => i.id === firstInviteId)?.workspace;
        joinWorkspaceMetricGroup(redirectWorkspace?.id);
        captureEvent(MEMBER_ACCEPTED, {
          member_id: invitation?.id,
          // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
          role: getUserRole(invitation?.role!),
          project_id: undefined,
          accepted_from: "App",
          state: "SUCCESS",
          element: "Workspace invitations page",
        });
        userService
          .updateUser({ last_workspace_id: redirectWorkspace?.id })
          .then(() => {
            setIsJoiningWorkspaces(false);
            router.push(`/${redirectWorkspace?.slug}`);
          })
          .catch(() => {
            setToast({
              type: TOAST_TYPE.ERROR,
              title: "Error!",
              message: "Something went wrong, Please try again.",
            });
            setIsJoiningWorkspaces(false);
          });
      })
      .catch(() => {
        captureEvent(MEMBER_ACCEPTED, {
          project_id: undefined,
          accepted_from: "App",
          state: "FAILED",
          element: "Workspace invitations page",
        });
        setToast({
          type: TOAST_TYPE.ERROR,
          title: "Error!",
          message: "Something went wrong, Please try again.",
        });
        setIsJoiningWorkspaces(false);
      });
  };

  return (
    <>
      <div className="max-h-[37vh] space-y-4 overflow-y-auto md:w-3/5">
        {invitations.map((invitation) => {
          const isSelected = invitationsRespond.includes(invitation.id);

          return (
            <div
              key={invitation.id}
              className={`flex cursor-pointer items-center gap-2 rounded border px-3.5 py-5 ${
                isSelected ? "border-custom-primary-100" : "border-custom-border-200 hover:bg-custom-background-80"
              }`}
              onClick={() => handleInvitation(invitation, isSelected ? "withdraw" : "accepted")}
            >
              <div className="flex-shrink-0">
                <div className="grid h-9 w-9 place-items-center rounded">
                  {invitation.workspace.logo && invitation.workspace.logo.trim() !== "" ? (
                    <img
                      src={invitation.workspace.logo}
                      height="100%"
                      width="100%"
                      className="rounded"
                      alt={invitation.workspace.name}
                    />
                  ) : (
                    <span className="grid h-9 w-9 place-items-center rounded bg-gray-700 px-3 py-1.5 uppercase text-white">
                      {invitation.workspace.name[0]}
                    </span>
                  )}
                </div>
              </div>
              <div className="min-w-0 flex-1">
                {/* <div className="text-sm font-medium">{truncateText(invitation.workspace.name, 30)}</div> */}
                <p className="text-xs text-custom-text-200">{ROLE[invitation.role]}</p>
              </div>
              <span className={`flex-shrink-0 ${isSelected ? "text-custom-primary-100" : "text-custom-text-200"}`}>
                <CheckCircle2 className="h-5 w-5" />
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          type="submit"
          size="md"
          onClick={submitInvitations}
          disabled={isJoiningWorkspaces || invitationsRespond.length === 0}
          loading={isJoiningWorkspaces}
        >
          Accept & Join
        </Button>
        <Link href={`/${redirectWorkspaceSlug}`}>
          <span>
            <Button variant="neutral-primary" size="md">
              Go Home
            </Button>
          </span>
        </Link>
      </div>
    </>
  );
};

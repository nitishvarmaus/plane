import { makeObservable, observable, runInAction } from "mobx";
// types
import { IWorkspaceMemberInvitation } from "@plane/types";
// services
import { WorkspaceService } from "@/services/workspace.service";

const workspaceService = new WorkspaceService();

export interface IUserInvitationStore {
  workspaceInvitation: IWorkspaceMemberInvitation[] | undefined;
  fetchWorkspaceInvitations: () => Promise<void>;
}

export class UserInvitationStore implements IUserInvitationStore {
  workspaceInvitation: IWorkspaceMemberInvitation[] | undefined = undefined;

  constructor() {
    makeObservable(this, {
      workspaceInvitation: observable,
    });
  }

  async fetchWorkspaceInvitations() {
    const invitations = await workspaceService.userWorkspaceInvitations();
    runInAction(() => {
      this.workspaceInvitation = invitations;
    });
  }
}

// services
import { APIService } from "../api.service";
// types
import {
  IWorkspace,
  IWorkspaceMemberMe,
  IWorkspaceMember,
  IWorkspaceMemberInvitation,
  ILastActiveWorkspaceDetails,
  IWorkspaceSearchResults,
  IProductUpdateResponse,
  IWorkspaceBulkInviteFormData,
  IWorkspaceViewProps,
  IUserProjectsRole,
  TIssue,
  IWorkspaceView,
} from "@plane/types";

export interface IWorkspaceService {
  list(): Promise<IWorkspace[]>;
  retrieve(workspaceSlug: string): Promise<IWorkspace>;
  create(data: Partial<IWorkspace>): Promise<IWorkspace>;
  update(workspaceSlug: string, data: Partial<IWorkspace>): Promise<IWorkspace>;
  delete(workspaceSlug: string): Promise<undefined>;
  invite(
    workspaceSlug: string,
    data: IWorkspaceBulkInviteFormData
  ): Promise<any>;
  join(workspaceSlug: string, invitationId: string, data: any): Promise<any>;
  joinMany(data: any): Promise<any>;
  getLastActiveWorkspaceAndProjects(): Promise<ILastActiveWorkspaceDetails>;
  userWorkspaceInvitations(): Promise<IWorkspaceMemberInvitation[]>;
  workspaceMemberMe(workspaceSlug: string): Promise<IWorkspaceMemberMe>;
  updateWorkspaceView(
    workspaceSlug: string,
    data: { view_props: IWorkspaceViewProps }
  ): Promise<any>;
  fetchWorkspaceMembers(workspaceSlug: string): Promise<IWorkspaceMember[]>;
  updateWorkspaceMember(
    workspaceSlug: string,
    memberId: string,
    data: Partial<IWorkspaceMember>
  ): Promise<IWorkspaceMember>;
  deleteWorkspaceMember(workspaceSlug: string, memberId: string): Promise<any>;
  workspaceInvitations(
    workspaceSlug: string
  ): Promise<IWorkspaceMemberInvitation[]>;
  getWorkspaceInvitation(
    workspaceSlug: string,
    invitationId: string
  ): Promise<IWorkspaceMemberInvitation>;
  updateWorkspaceInvitation(
    workspaceSlug: string,
    invitationId: string,
    data: Partial<IWorkspaceMember>
  ): Promise<any>;
  deleteWorkspaceInvitations(
    workspaceSlug: string,
    invitationId: string
  ): Promise<any>;
  workspaceSlugCheck(slug: string): Promise<any>;
  searchWorkspace(
    workspaceSlug: string,
    params: { project_id?: string; search: string; workspace_search: boolean }
  ): Promise<IWorkspaceSearchResults>;
  getProductUpdates(): Promise<IProductUpdateResponse[]>;
  createView(
    workspaceSlug: string,
    data: Partial<IWorkspaceView>
  ): Promise<IWorkspaceView>;
  updateView(
    workspaceSlug: string,
    viewId: string,
    data: Partial<IWorkspaceView>
  ): Promise<IWorkspaceView>;
  deleteView(workspaceSlug: string, viewId: string): Promise<any>;
  getAllViews(workspaceSlug: string): Promise<IWorkspaceView[]>;
  getViewDetails(
    workspaceSlug: string,
    viewId: string
  ): Promise<IWorkspaceView>;
  getViewIssues(workspaceSlug: string, params: any): Promise<TIssue[]>;
  getWorkspaceUserProjectsRole(
    workspaceSlug: string
  ): Promise<IUserProjectsRole>;
}

export class WorkspaceService extends APIService implements IWorkspaceService {
  constructor(BASE_URL: string) {
    super(BASE_URL);
  }

  async list(): Promise<IWorkspace[]> {
    return this.get("/api/users/me/workspaces/")
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async retrieve(workspaceSlug: string): Promise<IWorkspace> {
    return this.get(`/api/workspaces/${workspaceSlug}/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response;
      });
  }

  async create(data: Partial<IWorkspace>): Promise<IWorkspace> {
    return this.post("/api/workspaces/", data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async update(
    workspaceSlug: string,
    data: Partial<IWorkspace>
  ): Promise<IWorkspace> {
    return this.patch(`/api/workspaces/${workspaceSlug}/`, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async delete(workspaceSlug: string): Promise<any> {
    return this.delete(`/api/workspaces/${workspaceSlug}/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async invite(
    workspaceSlug: string,
    data: IWorkspaceBulkInviteFormData
  ): Promise<any> {
    return this.post(`/api/workspaces/${workspaceSlug}/invitations/`, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async join(
    workspaceSlug: string,
    invitationId: string,
    data: any
  ): Promise<any> {
    return this.post(
      `/api/workspaces/${workspaceSlug}/invitations/${invitationId}/join/`,
      data,
      {
        headers: {},
      }
    )
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async joinMany(data: any): Promise<any> {
    return this.post("/api/users/me/workspaces/invitations/", data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getLastActiveWorkspaceAndProjects(): Promise<ILastActiveWorkspaceDetails> {
    return this.get("/api/users/last-visited-workspace/")
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async userWorkspaceInvitations(): Promise<IWorkspaceMemberInvitation[]> {
    return this.get("/api/users/me/workspaces/invitations/")
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async workspaceMemberMe(workspaceSlug: string): Promise<IWorkspaceMemberMe> {
    return this.get(`/api/workspaces/${workspaceSlug}/workspace-members/me/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response;
      });
  }

  async updateWorkspaceView(
    workspaceSlug: string,
    data: { view_props: IWorkspaceViewProps }
  ): Promise<any> {
    return this.post(`/api/workspaces/${workspaceSlug}/workspace-views/`, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async fetchWorkspaceMembers(
    workspaceSlug: string
  ): Promise<IWorkspaceMember[]> {
    return this.get(`/api/workspaces/${workspaceSlug}/members/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async updateWorkspaceMember(
    workspaceSlug: string,
    memberId: string,
    data: Partial<IWorkspaceMember>
  ): Promise<IWorkspaceMember> {
    return this.patch(
      `/api/workspaces/${workspaceSlug}/members/${memberId}/`,
      data
    )
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteWorkspaceMember(
    workspaceSlug: string,
    memberId: string
  ): Promise<any> {
    return this.delete(`/api/workspaces/${workspaceSlug}/members/${memberId}/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async workspaceInvitations(
    workspaceSlug: string
  ): Promise<IWorkspaceMemberInvitation[]> {
    return this.get(`/api/workspaces/${workspaceSlug}/invitations/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getWorkspaceInvitation(
    workspaceSlug: string,
    invitationId: string
  ): Promise<IWorkspaceMemberInvitation> {
    return this.get(
      `/api/workspaces/${workspaceSlug}/invitations/${invitationId}/join/`,
      { headers: {} }
    )
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async updateWorkspaceInvitation(
    workspaceSlug: string,
    invitationId: string,
    data: Partial<IWorkspaceMember>
  ): Promise<any> {
    return this.patch(
      `/api/workspaces/${workspaceSlug}/invitations/${invitationId}/`,
      data
    )
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteWorkspaceInvitations(
    workspaceSlug: string,
    invitationId: string
  ): Promise<any> {
    return this.delete(
      `/api/workspaces/${workspaceSlug}/invitations/${invitationId}/`
    )
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async workspaceSlugCheck(slug: string): Promise<any> {
    return this.get(`/api/workspace-slug-check/?slug=${slug}`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async searchWorkspace(
    workspaceSlug: string,
    params: {
      project_id?: string;
      search: string;
      workspace_search: boolean;
    }
  ): Promise<IWorkspaceSearchResults> {
    return this.get(`/api/workspaces/${workspaceSlug}/search/`, {
      params,
    })
      .then((res) => res?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
  async getProductUpdates(): Promise<IProductUpdateResponse[]> {
    return this.get("/api/release-notes/")
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async createView(
    workspaceSlug: string,
    data: Partial<IWorkspaceView>
  ): Promise<IWorkspaceView> {
    return this.post(`/api/workspaces/${workspaceSlug}/views/`, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async updateView(
    workspaceSlug: string,
    viewId: string,
    data: Partial<IWorkspaceView>
  ): Promise<IWorkspaceView> {
    return this.patch(`/api/workspaces/${workspaceSlug}/views/${viewId}/`, data)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteView(workspaceSlug: string, viewId: string): Promise<any> {
    return this.delete(`/api/workspaces/${workspaceSlug}/views/${viewId}/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getAllViews(workspaceSlug: string): Promise<IWorkspaceView[]> {
    return this.get(`/api/workspaces/${workspaceSlug}/views/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getViewDetails(
    workspaceSlug: string,
    viewId: string
  ): Promise<IWorkspaceView> {
    return this.get(`/api/workspaces/${workspaceSlug}/views/${viewId}/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getViewIssues(workspaceSlug: string, params: any): Promise<TIssue[]> {
    return this.get(`/api/workspaces/${workspaceSlug}/issues/`, {
      params,
    })
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getWorkspaceUserProjectsRole(
    workspaceSlug: string
  ): Promise<IUserProjectsRole> {
    return this.get(`/api/users/me/workspaces/${workspaceSlug}/project-roles/`)
      .then((response) => response?.data)
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}
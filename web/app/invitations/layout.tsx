import { ReactNode } from "react";

const InvitationsLayout = ({ children }: { children: ReactNode }) => (
  <div className="h-screen w-full overflow-hidden bg-custom-background-100">{children}</div>
);

export default InvitationsLayout;

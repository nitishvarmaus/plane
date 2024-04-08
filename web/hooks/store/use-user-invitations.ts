import { useContext } from "react";
// mobx store
import { StoreContext } from "@/contexts/store-context";

export const useUserInvitations = () => {
  const context = useContext(StoreContext);
  if (context === undefined) throw new Error("useProject must be used within StoreProvider");
  return context.userInvitations;
};

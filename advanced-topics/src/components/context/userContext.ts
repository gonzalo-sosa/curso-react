import { createContext } from "react";

type IUserContext = {
  currentUser: { name?: string } | null
  onLoggedIn?: (username: string) => void
} 

const UserContext = createContext<IUserContext>({
  currentUser: null
});
UserContext.displayName = "UserContext"

export default UserContext
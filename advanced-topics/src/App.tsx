import { useState } from "react";
import MoviePage from "./components/context/MoviePage";
import UserContext from "./components/context/userContext";
import Login from "./components/context/Login";
import CartContext from "./components/context/cartContext";

function App() {
  const [currentUser, setCurrentUser] = useState<null | { name?: string }>(
    null
  );

  const handleLoggedIn = (username: string) => {
    console.log(`Getting the user: ${username}`);
    const user = { name: "Gonzalo" };
    setCurrentUser(user);
  };

  return (
    <CartContext.Provider value={{ cart: [] }}>
      <UserContext.Provider value={{ currentUser, onLoggedIn: handleLoggedIn }}>
        <div>
          <MoviePage />
          <Login />
        </div>
      </UserContext.Provider>
    </CartContext.Provider>
  );
}

export default App;

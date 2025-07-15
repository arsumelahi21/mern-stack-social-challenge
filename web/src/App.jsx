import { useAuth, AuthProvider } from "./AuthContext";
import { useState } from "react";
import Login from "./Login";
import Feed from "./Feed";

function AppBody() {
  const { token } = useAuth();
  const [loggedIn, setLoggedIn] = useState(!!token);

  return loggedIn && token ? (
    <Feed />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppBody />
    </AuthProvider>
  );
}

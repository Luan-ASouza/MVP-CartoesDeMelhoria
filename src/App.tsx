import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
    </UserProvider>
  );
};

export default App;
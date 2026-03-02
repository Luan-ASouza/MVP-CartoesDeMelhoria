import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <UserProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </UserProvider>
  );
};

export default App;
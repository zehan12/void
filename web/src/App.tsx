import { BrowserRouter as Router } from "react-router-dom";
import { ThemeProvider } from "@/context/theme-provider"
import ApplicationRoutes from "./routes/ApplicationRoutes";
import TailwindIndicator from "./components/common/TailwindIndicator";

const App = () => {

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <ApplicationRoutes />
          <TailwindIndicator />
        </Router>
      </ThemeProvider>
    </>
  )
}

App.displayName = "App";
export default App

import { BrowserRouter as Router } from "react-router-dom";
import ApplicationRoutes from "./routes/ApplicationRoutes";
import TailwindIndicator from "./components/common/TailwindIndicator";

const App = () => {

  return (
    <>
      <Router>
        <ApplicationRoutes />
        <TailwindIndicator />
      </Router>
    </>
  )
}

App.displayName = "App";
export default App

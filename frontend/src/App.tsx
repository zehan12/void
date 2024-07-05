import { BrowserRouter as Router } from "react-router-dom";
import ApplicationRoutes from "./routes/ApplicationRoutes";

const App = () => {

  return (
    <>
      <Router>
        <ApplicationRoutes />
      </Router>
    </>
  )
}

App.displayName = "App";
export default App

import { version } from "react";
import { Button } from "./components/ui/button";

const App = () => {

  return (
    <>
      <h1 className="text-xs font-bold underline">
        "Never missing a lucky day because you try every single day."
        <Button variant={"secondary"}>{version}</Button>
      </h1>
    </>
  )
}

App.displayName = "App";
export default App

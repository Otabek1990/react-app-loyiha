import { useRoutes } from "react-router-dom"
import Navbar from "./assets/components/navbar/Navbar"
import { routes } from "./assets/routes/Routes"

function App() {

  const element = useRoutes(routes)

  return (
    <div className="bg-slate-900 w-full min-h-screen h-auto text-white font-mono mx-auto " >
      <div className="container px-20 py-10 border mx-auto " >
        <Navbar />

        {element}
      </div>


    </div>
  )
}

export default App
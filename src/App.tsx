import "./index.css"
import Aurora from "./components/ui/aurora"
import PasswordGenerator from "./components/PasswordGenerator"
import PasswordManager from "./components/PasswordManager"

export function App() {
  return (
    <div className="w-full h-full bg-black relative">
      <div className="w-full h-full absolute z-0">
        <Aurora
          // colorStops={["#3A29FF", "#FF94B4",s "#FF3232"]}
          // colorStops={["#fb8b24", "#d90368", "#820263"]}
          colorStops={["#092327", "#0b5351", "#00a9a5"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>

      <span className="absolute z-10 mt-8 ml-8 text-white">passgen.io</span>

      <div className="absolute z-10 w-full h-full">
        <div className="flex flex-col w-full h-full justify-center items-center">
          <h1 className="text-white text-5xl text-center">
            Your personal password fortress
          </h1>
          <h1 className="text-white text-5xl text-center">
            built in seconds.
          </h1>

          <div className="flex flex-row mt-4 gap-2">
            <PasswordGenerator />
            <PasswordManager />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

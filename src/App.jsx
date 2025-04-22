import { useState } from "react";
import Header from "./components/Header.jsx";
import Section from "./components/Section.jsx";
import { ThemeContext } from "./components/useTheme.jsx";

function App() {
  const [isLight, setIsLight] = useState(false);

  function handleTheme() {
    setIsLight((prev) => !prev);
  }

  return (
    <ThemeContext.Provider value={isLight}>
      <div
        className={` ${
          isLight
            ? "bg-[linear-gradient(180deg,_#EBF2FC_0%,_#EEF8F9_100%)]"
            : "bg-[linear-gradient(180deg,_#040918_0%,_#091540_100%)]"
        } min-h-screen py-8`}
      >
        <div className="container">
          <Header handleTheme={handleTheme} />
          <main>
            <Section />
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;

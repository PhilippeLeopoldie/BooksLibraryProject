import "./App.css";
import { BookCreate } from "../Books/BookCreate/BookCreate";
import { BookList } from "../Books/BookList/BookList";
import { Routes, BrowserRouter, Route} from "react-router-dom";
import { BookSearch } from "../Books/BookSearch/BookSearch";
import { createContext, useContext, useState } from "react";
import { NavBar } from "../NavBar/NavBar";

export const ThemeContext = createContext<string>("natural");

export const App = () => {
  const [theme, setTheme] = useState<string>("black");
  const handleTheme = () => {
    setTheme(theme === "natural" ? "black" : "natural");
  }
  
  return (
    <div className={`App App--${theme}`}>
      <ThemeContext.Provider value={theme}>
        <BrowserRouter>
          <NavBar theme={theme} handleTheme={handleTheme}/>
          <Routes>
            <Route path="/" element={<BookList />} />
            <Route path="/addBook" element={<BookCreate />} />
            <Route path="/Search" element={<BookSearch />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </div>
  );
};

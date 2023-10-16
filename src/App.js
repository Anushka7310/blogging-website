import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Main";
import BlogDetails from "./pages/BlogDetails";
import Favourites from "./pages/Favourites";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/blog/:id" component={<BlogDetails />} />
        <Route path="/favorites" component={<Favourites />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

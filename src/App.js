import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/MainPage";
import Favourites from "./pages/FavouritePage";
import PostDetail from "./pages/PostDetailPage";
import Header from "./components/Header";
import Footer from "./components/Footer";
function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" exact element={<Main />} />
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/favorites" element={<Favourites />} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;

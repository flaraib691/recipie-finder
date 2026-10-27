import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import RecipeDetails from "./pages/RecipeDetails";
import Favorites from "./pages/Favorites";
import SummerRecipes from "./pages/SummerRecipies";
import Occasions from "./pages/Ocassions";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/summer-recipes" element={<SummerRecipes />} />
        <Route path="/occasions" element={<Occasions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
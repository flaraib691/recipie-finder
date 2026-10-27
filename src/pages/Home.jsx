import { useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipeList from "../components/RecipeList";
import Categories from "../components/Catagories";

function Home() {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔍 Search API
  const fetchRecipes = async (query) => {
    if (!query) return;

    setLoading(true);

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const data = await res.json();

    setMeals(data.meals || []);
    setLoading(false);
  };

  // 🍽️ Category API
  const fetchByCategory = async (category) => {
    setLoading(true);

    if (!category) {
      setMeals([]);
      setLoading(false);
      return;
    }

    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    const data = await res.json();

    setMeals(data.meals || []);
    setLoading(false);
  };

  return (
    <div className="home-wrapper">

      {/* 🌟 HERO SECTION */}
      <div className="hero-section text-center text-white">
        <h1>🍲 Recipe Finder</h1>
        <p>Search delicious recipes from around the world</p>
      </div>

      <div className="container py-4">

        {/* 🔍 SEARCH CARD */}
        <div className="card shadow-sm p-3 mb-3">
          <SearchBar onSearch={fetchRecipes} />
        </div>

        {/* 🍽️ CATEGORY CARD */}
        <div className="card shadow-sm p-3 mb-3">
          <Categories onSelectCategory={fetchByCategory} />
        </div>

        {/* ⚡ LOADING */}
        {loading && (
          <div className="text-center my-4">
            <div className="spinner-border text-primary"></div>
            <p>Loading recipes...</p>
          </div>
        )}

        {/* 🍔 RESULTS */}
        {!loading && meals?.length > 0 && (
          <RecipeList meals={meals} />
        )}

        {/* ❌ EMPTY STATE */}
        {!loading && meals?.length === 0 && (
          <div className="text-center mt-5 text-muted">
            <h4>Start searching or select a category 🍕</h4>
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;
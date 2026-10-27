
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecipeDetails() {
  const { id } = useParams();

  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [error, setError] = useState("");

  // Fetch recipe from TheMealDB
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );

        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
          setMeal(data.meals[0]);
        } else {
          setMeal(null);
          setError("This recipe is not available in TheMealDB.");
        }
      } catch (err) {
        setError("Unable to load recipe.");
      } finally {
        setLoading(false);
      }
    };

    fetchMeal();
  }, [id]);

  // Check favourite
  useEffect(() => {
    const favs =
      JSON.parse(localStorage.getItem("favourites")) || [];

    const exists = favs.some(
      (item) => String(item.idMeal) === String(id)
    );

    setIsFav(exists);
  }, [id]);

  // Favourite button
  const toggleFavourite = () => {
    let favs =
      JSON.parse(localStorage.getItem("favourites")) || [];

    if (isFav) {
      favs = favs.filter(
        (item) => String(item.idMeal) !== String(id)
      );

      setIsFav(false);
    } else {
      if (meal) {
        favs.push(meal);
        setIsFav(true);
      }
    }

    localStorage.setItem(
      "favourites",
      JSON.stringify(favs)
    );
  };

  // Loading
  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h3>Loading recipe...</h3>
      </div>
    );
  }

  // Error
  if (error || !meal) {
    return (
      <div className="container mt-5 text-center">
        <h3>Recipe not found</h3>
        <p>{error}</p>
      </div>
    );
  }

  // Ingredients
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push({
        ingredient,
        measure,
      });
    }
  }

  return (
    <div className="container mt-4 mb-5">

      {/* Recipe Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>{meal.strMeal}</h1>

        <button
          onClick={toggleFavourite}
          style={{
            border: "none",
            background: "transparent",
            fontSize: "30px",
            cursor: "pointer",
          }}
          title="Add to favourites"
        >
          {isFav ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Category */}
      <p className="text-muted">
        {meal.strCategory && (
          <span>Category: {meal.strCategory}</span>
        )}

        {meal.strArea && (
          <span className="ms-3">
            Cuisine: {meal.strArea}
          </span>
        )}
      </p>

      {/* Recipe Image */}
      <div className="text-center mb-4">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="img-fluid rounded shadow"
          style={{
            maxWidth: "650px",
            width: "100%",
            height: "auto",
          }}
        />
      </div>

      {/* Ingredients */}
      <div className="card shadow-sm p-4 mb-4">
        <h2>🥕 Ingredients</h2>

        <ul className="list-group list-group-flush mt-3">
          {ingredients.map((item, index) => (
            <li
              key={index}
              className="list-group-item"
            >
              <strong>{item.ingredient}</strong>

              {item.measure && (
                <span className="ms-2 text-muted">
                  - {item.measure}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="card shadow-sm p-4 mb-4">
        <h2>👩‍🍳 Instructions</h2>

        <p
          style={{
            whiteSpace: "pre-line",
            lineHeight: "1.8",
          }}
        >
          {meal.strInstructions}
        </p>
      </div>

      {/* YouTube Video */}
      {meal.strYoutube && (
        <div className="card shadow-sm p-4 mb-4">
          <h2>🎥 Recipe Video</h2>

          <div className="ratio ratio-16x9 mt-3">
            <iframe
              src={meal.strYoutube
                .replace("watch?v=", "embed/")
                .replace("youtu.be/", "youtube.com/embed/")}
              title={`${meal.strMeal} video`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

      {/* Source */}
      {meal.strSource && (
        <div className="text-center mt-4">
          <a
            href={meal.strSource}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline-primary"
          >
            View Original Recipe
          </a>
        </div>
      )}

    </div>
  );
}

export default RecipeDetails;


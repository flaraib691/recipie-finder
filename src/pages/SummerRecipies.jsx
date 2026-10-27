
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SummerRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummerRecipes = async () => {
      try {
        // Summer ke liye fresh/light recipes
        const categories = ["Seafood", "Vegetarian", "Pasta"];

        let allRecipes = [];

        for (const category of categories) {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
              category
            )}`
          );

          const data = await response.json();

          if (data.meals) {
            allRecipes = [...allRecipes, ...data.meals];
          }
        }

        // Duplicate recipes remove karna
        const uniqueRecipes = Array.from(
          new Map(
            allRecipes.map((meal) => [meal.idMeal, meal])
          ).values()
        );

        setRecipes(uniqueRecipes.slice(0, 18));
      } catch (error) {
        console.log("Summer Recipes Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSummerRecipes();
  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <h3>Loading Summer Recipes...</h3>
      </div>
    );
  }

  return (
    <div className="container occasion-container">
      <h1 className="text-center mb-5">
        🌞 Summer Recipes
      </h1>

      <section className="recipe-section">
        <h2 className="mb-4">
          ☀️ Summer Favorites
        </h2>

        <div className="row">
          {recipes.map((meal) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
              key={meal.idMeal}
            >
              <Link
                to={`/recipe/${meal.idMeal}`}
                state={{ meal }}
                className="occasion-link"
              >
                <div className="card occasion-card h-100">
                  <img
                    src={meal.strMealThumb}
                    className="card-img-top"
                    alt={meal.strMeal}
                  />

                  <div className="card-body">
                    <h6 className="mb-0">
                      {meal.strMeal}
                    </h6>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SummerRecipes;


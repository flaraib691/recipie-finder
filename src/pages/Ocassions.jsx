
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Occasions() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  // Different sections ke liye TheMealDB categories
  const occasionSections = [
    {
      title: "🎂 Birthday Special",
      category: "Dessert",
    },
    {
      title: "🎉 Party Recipes",
      category: "Chicken",
    },
    {
      title: "🌙 Eid Special",
      category: "Lamb",
    },
    {
      title: "❤️ Romantic Dinner",
      category: "Seafood",
    },
    {
      title: "☕ Tea Time Snacks",
      category: "Dessert",
    },
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = [];

        for (const section of occasionSections) {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(
              section.category
            )}`
          );

          const data = await response.json();

          const recipes = data.meals
            ? data.meals.slice(0, 12)
            : [];

          result.push({
            ...section,
            recipes,
          });
        }

        setSections(result);
      } catch (error) {
        console.log("Occasions Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return (
      <div className="container text-center mt-5">
        <h3>Loading Occasions...</h3>
      </div>
    );
  }

  return (
    <div className="container occasion-container">

      <h1 className="text-center mb-5">
        🎉 Occasions
      </h1>

      {sections.map((section) => (
        <section
          className="recipe-section mb-5"
          key={section.category}
        >

          <h2 className="mb-4">
            {section.title}
          </h2>

          <div className="row">

            {section.recipes.map((meal) => (
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
      ))}

    </div>
  );
}

export default Occasions;


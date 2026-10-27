
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const data =
      JSON.parse(localStorage.getItem("favourites")) || [];

    setFavorites(data);
  }, []);

  return (
    <div className="container py-4">

      <h2 className="mb-4">⭐ Favorites</h2>

      {favorites.length === 0 ? (
        <p>No favorite recipes yet.</p>
      ) : (
        <div className="row">

          {favorites.map((meal) => (
            <div
              key={meal.idMeal}
              className="col-lg-3 col-md-4 col-sm-6 mb-4"
            >

              <Link
                to={`/recipe/${meal.idMeal}`}
                state={{ meal }}
                className="text-decoration-none text-dark"
              >

                <div className="card h-100 shadow-sm">

                  <img
                    src={meal.strMealThumb}
                    className="card-img-top"
                    alt={meal.strMeal}
                    style={{
                      height: "220px",
                      objectFit: "cover",
                    }}
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
      )}

    </div>
  );
}

export default Favorites;


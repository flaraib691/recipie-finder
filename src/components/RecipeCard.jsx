import { Link } from "react-router-dom";

export default function RecipeCard({ meal }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={meal.strMealThumb} className="card-img-top" />

        <div className="card-body">
          <h5>{meal.strMeal}</h5>

          <Link
            to={`/recipe/${meal.idMeal}`}
            className="btn btn-success btn-sm"
          >
            View Recipe
          </Link>
        </div>
      </div>
    </div>
  );
}
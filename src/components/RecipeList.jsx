import RecipeCard from "./RecipeCard";

export default function RecipeList({ meals }) {
  if (!meals) return <p>No recipes found.</p>;

  return (
    <div className="row mt-4">
      {meals.map((meal) => (
        <RecipeCard key={meal.idMeal} meal={meal} />
      ))}
    </div>
  );
}
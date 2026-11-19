
import { useEffect, useState } from "react";

export default function Categories({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://www.themealdb.com/api/json/v1/1/categories.php"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data = await response.json();
        setCategories(data.categories || []);

      } catch (error) {
        console.error("Categories Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="my-3">
      <h5>🍽️ Categories</h5>

      <div className="d-flex flex-wrap gap-2">
        <button
          className="btn btn-dark btn-sm"
          onClick={() => onSelectCategory("")}
        >
          All
        </button>

        {categories.map((cat) => (
          <button
            key={cat.idCategory}
            className="btn btn-outline-primary btn-sm"
            onClick={() => onSelectCategory(cat.strCategory)}
          >
            {cat.strCategory}
          </button>
        ))}
      </div>
    </div>
  );
}

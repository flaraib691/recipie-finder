import { useEffect, useState } from "react";

export default function Categories({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await res.json();
      setCategories(data.categories);
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
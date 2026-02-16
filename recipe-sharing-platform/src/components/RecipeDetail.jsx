import React from "react";
import { useParams, Link } from "react-router-dom";
import recipesData from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const recipe = recipesData.find((item) => item.id === parseInt(id));

  if (!recipe) {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">Recipe Not Found</h2>
        <Link to="/" className="text-blue-600 hover:underline">
          Go Back Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
        {/* Image */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />

        {/* Title */}
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {recipe.title}
        </h1>

        {/* Ingredients */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Ingredients</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Instructions</h2>
          <ol className="list-decimal list-inside text-gray-700 space-y-2">
            {recipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        {/* Back Button */}
        <div className="mt-6">
          <Link to="/" className="text-blue-600 font-medium hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;

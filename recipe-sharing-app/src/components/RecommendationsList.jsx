import useRecipeStore from "./recipeStore";

const RecommendationsList = () => {
  const recommendations = useRecipeStore((state) => state.recommendations);

  const generateRecommendations = useRecipeStore(
    (state) => state.generateRecommendations,
  );

  if (recommendations.length === 0)
    return (
      <div>
        <p>No recommendations yet.</p>
        <button onClick={generateRecommendations}>
          Generate Recommendations
        </button>
      </div>
    );

  return (
    <div>
      <h2>Recommended Recipes</h2>
      {recommendations.map((recipe) => (
        <div key={recipe.id}>
          <h3>{recipe.title}</h3>
          <p>{recipe.description}</p>
        </div>
      ))}
      <button onClick={generateRecommendations}>Refresh Recommendations</button>
    </div>
  );
};

export default RecommendationsList;

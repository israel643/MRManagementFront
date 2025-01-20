const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category.id_categoria || category} 
          className={`btn ${selectedCategory === category.nombre_categoria ? 'active' : 'btn-outline-secondary'} m-1`}
          onClick={() => onSelectCategory(category.nombre_categoria || 'All')}
        >
          {category.nombre_categoria || category} 
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter; 

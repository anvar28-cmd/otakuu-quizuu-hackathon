import { CATEGORIES } from "../../const";
import "./Categories.scss";

function Categories({ currentCategory, setCurrentCategory }) {
  const setClassName = (category) =>
    currentCategory === category
      ? "categories__item categories__item--current"
      : "categories__item";

  return (
    <>
      <h1 className="otaku">Otakuu Quizzu</h1>
      <ul className="categories">
        {CATEGORIES.map((category, index) => (
          <li key={index} className={setClassName(category)}>
            <button
              className="categories__button"
              type="button"
              onClick={() => setCurrentCategory(category)}
            >
              {category.toUpperCase()}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default Categories;

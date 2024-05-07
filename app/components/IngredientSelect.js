import { useState } from "react";
import UpdateIngredient from "./UpdateIngredient";
import { MdEdit } from "react-icons/md";

const IngredientSelect = ({ index, ingredients, setQuantity }) => {
  const [showEditIngredient, setShowEditIngredient] = useState(false);
  const [id, setId] = useState(0);

  function handleChange(e) {
    const select = e.target;

    const options = select.querySelectorAll("option");
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        setId(options[i].value);
        break;
      }
    }

    if (select.value != "") {
      setShowEditIngredient(true);
    } else {
      setShowEditIngredient(false);
    }
  }

  return (
    <div className="flex items-center gap-3" id="ingredientRow">
      <select
        className="h-full w-full basis-2/3 rounded-md border border-[lightGrey] bg-White px-4 py-1.5"
        name="ingredient"
        id="ingredient"
        onChange={(e) => handleChange(e)}
      >
        <option value="">-- Select an Ingredient --</option>
        {ingredients &&
          ingredients.map((ingredient, index) => {
            return (
              <option key={index} value={ingredient.Id}>
                Name: {ingredient.Name} - UM: {ingredient.UM} - Carbs:{" "}
                {ingredient.Carbs} - Proteins: {ingredient.Proteins} - Fat:{" "}
                {ingredient.Fat}
              </option>
            );
          })}
      </select>
      <input
        type="number"
        name="quantity"
        id="quantity"
        placeholder="Qty"
        className="w-full basis-1/3 rounded-md border border-[lightGrey] px-4 py-1.5"
        onChange={(e) => setQuantity(...ingredients, e.target.value)}
      />
      <UpdateIngredient
        showEditIngredient={showEditIngredient}
        id={id}
        icon={<MdEdit className="m-auto h-full font-OutfitBold text-Nutmeg" />}
      />
    </div>
  );
};

export default IngredientSelect;

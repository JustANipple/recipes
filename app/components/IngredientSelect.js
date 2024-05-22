import { useState } from "react";
import UpdateIngredient from "./UpdateIngredient";
import { MdEdit } from "react-icons/md";

const IngredientSelect = ({ index, ingredients, register }) => {
  const [showEditIngredient, setShowEditIngredient] = useState(false);

  const [ingredientId, setIngredientId] = useState(0);
  const [quantity, setQuantity] = useState();

  function handleChange(value) {
    setIngredientId(value);

    if (value !== "") {
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
        value={ingredientId}
        {...register(`ingredients[${index}].id`)}
      >
        <option value="" onClick={(e) => handleChange(e.target.value)}>
          -- Select an Ingredient --
        </option>
        {ingredients &&
          ingredients.map((ingredient, index) => {
            return (
              <option
                key={index}
                value={ingredient.Id}
                onClick={(e) => handleChange(e.target.value)}
              >
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
        placeholder="Qty"
        className="w-full basis-1/3 rounded-md border border-[lightGrey] px-4 py-1.5"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        {...register(`ingredients[${index}].quantity`)}
      />
      <UpdateIngredient
        showEditIngredient={showEditIngredient}
        id={ingredientId}
        icon={<MdEdit className="m-auto h-full font-OutfitBold text-Nutmeg" />}
      />
    </div>
  );
};

export default IngredientSelect;

import { useEffect, useState } from "react";
import UpdateIngredient from "./UpdateIngredient";
import { MdEdit } from "react-icons/md";

const IngredientSelect = ({ index, ingredients, register, defaultValue }) => {
  const [showEditIngredient, setShowEditIngredient] = useState(false);

  const [ingredientId, setIngredientId] = useState(0);
  const [quantity, setQuantity] = useState();

  useEffect(() => {
    if (defaultValue) {
      setIngredientId(defaultValue.IngredientId);
      setQuantity(defaultValue.Quantity);
    }
  }, [defaultValue]);

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
        <option
          value={ingredientId}
          onClick={(e) => handleChange(e.target.value)}
        >
          {defaultValue
            ? defaultValue.Ingredient.Name
            : "-- Select an Ingredient --"}
        </option>
        {ingredients &&
          ingredients.map((item, index) => {
            return (
              <option
                key={index}
                value={item.Ingredient.Id}
                onClick={(e) => handleChange(e.target.value)}
              >
                Name: {item.Ingredient.Name} - UM: {item.Ingredient.UM} - Carbs:{" "}
                {item.Ingredient.Carbs} - Proteins: {item.Ingredient.Proteins} -
                Fat: {item.Ingredient.Fat}
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

import { useEffect, useState } from "react";

const IngredientSelect = ({
  index,
  recipeIngredients,
  register,
  setValue,
  id,
  watch,
}) => {
  const [showEditIngredient, setShowEditIngredient] = useState(false);

  useEffect(() => {
    if (id > 0) {
      setShowEditIngredient(true);
      if (recipeIngredients) {
        setValue(
          `ingredients[${index}].Ingredient.Id`,
          recipeIngredients[index].Ingredient.Id,
        );
        setValue(
          `ingredients[${index}].quantity`,
          recipeIngredients[index].Quantity,
        );
      }
    }
  }, [setValue]);

  return (
    <div className="flex items-center gap-3" id="ingredientRow">
      <select
        className={`h-full w-full basis-2/3 cursor-pointer rounded-md border border-[lightGrey] bg-White px-4 py-1.5 disabled:opacity-50`}
        disabled={id > 0}
        name="ingredient"
        {...register(`ingredients[${index}].Ingredient.Id`)}
      >
        <option value="" onClick={() => setShowEditIngredient(false)}>
          Select Ingredient
        </option>
        {recipeIngredients &&
          recipeIngredients.map((item, index) => {
            return (
              <option
                key={index}
                onClick={() => setShowEditIngredient(true)}
                value={item.Id}
              >
                {item.Name}
              </option>
            );
          })}
      </select>

      <input
        type="number"
        name={`ingredients[${index}].Quantity`}
        placeholder="Qty"
        className="w-full basis-1/3 rounded-md border border-[lightGrey] px-4 py-1.5"
        {...register(`ingredients[${index}].Quantity`)}
      />
    </div>
  );
};

export default IngredientSelect;

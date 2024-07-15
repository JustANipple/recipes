import { useEffect, useState } from "react";
import {
  ingredient,
  ingredientRelationship,
  recipe,
} from "../lib/utils/interfaces";
import {
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

const IngredientSelect = ({
  index,
  recipeIngredients,
  register,
  setValue,
  id,
  watch,
}: {
  index: number;
  recipeIngredients: ingredientRelationship[] | ingredient[];
  register: UseFormRegister<recipe>;
  setValue: UseFormSetValue<recipe>;
  id: number;
  watch: UseFormWatch<recipe>;
}) => {
  const [showEditIngredient, setShowEditIngredient] = useState(false);

  useEffect(() => {
    setShowEditIngredient(true);
    if (id > 0) {
      if (recipeIngredients) {
        if (recipeIngredients as ingredientRelationship[]) {
          setValue(
            `Ingredients.${index}.Ingredient.Id`,
            (recipeIngredients as ingredientRelationship[])[index].Ingredient
              .Id,
          );
          setValue(
            `Ingredients.${index}.Quantity`,
            (recipeIngredients as ingredientRelationship[])[index].Quantity,
          );
        } else if (recipeIngredients as ingredient[]) {
          setValue(
            `Ingredients.${index}.Ingredient.Id`,
            (recipeIngredients as ingredient[])[index].Id,
          );
          setValue(
            `Ingredients.${index}.Quantity`,
            (recipeIngredients as ingredient[])[index].Quantity,
          );
        }
      }
    }
  }, [setValue]);

  return (
    <div className="flex items-center gap-3" id="ingredientRow">
      {id > 0 ? (
        <input
          type="text"
          className="h-full w-full basis-2/3 border border-[lightGrey] px-4 py-1.5 disabled:opacity-50"
          disabled
          value={
            (recipeIngredients as ingredientRelationship[])[index].Ingredient
              .Name
          }
        />
      ) : (
        <select
          className={`h-full w-full basis-2/3 cursor-pointer rounded-md border border-[lightGrey] bg-White px-4 py-1.5 disabled:opacity-50`}
          disabled={id > 0}
          name="ingredient"
          {...register(`Ingredients.${index}.Ingredient.Id`)}
        >
          <option value="" onClick={() => setShowEditIngredient(false)}>
            Select Ingredient
          </option>
          {recipeIngredients &&
            (recipeIngredients as ingredient[]).map((item, index) => {
              return (
                <option
                  key={index}
                  value={item.Id}
                  onClick={() => setShowEditIngredient(true)}
                >
                  {item.Name}
                </option>
              );
            })}
        </select>
      )}

      <input
        type="number"
        name={`ingredients[${index}].Quantity`}
        placeholder="Qty"
        className="w-full basis-1/3 rounded-md border border-[lightGrey] px-4 py-1.5"
        {...register(`Ingredients.${index}.Quantity`)}
      />
    </div>
  );
};

export default IngredientSelect;

import Ingredient from "../components/Ingredient";
import IngredientForm from "../components/IngredientForm";

const Page = ({ id }) => {
  console.log("ID:" + id);
  return (
    <>
      <Ingredient />
      <IngredientForm />
    </>
  );
};

export default Page;

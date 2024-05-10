import { useState } from "react";

const InstructionInput = ({ index, register }) => {
  const [instruction, setInstruction] = useState();

  return (
    <input
      type="text"
      name="instruction"
      placeholder="Instruction"
      className="rounded-md border border-[lightGrey] px-4 py-1.5"
      onChange={(e) => setInstruction(e.target.value)}
      value={instruction}
      {...register(`instructions[${index}]`)}
    />
  );
};

export default InstructionInput;

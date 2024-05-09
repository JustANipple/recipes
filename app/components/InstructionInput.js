import { useState } from "react";

const InstructionInput = ({ index, register }) => {
  const [instruction, setInstruction] = useState();

  return (
    <input
      type="text"
      name="instruction"
      id={`instruction${index}`}
      placeholder="Instruction"
      className="rounded-md border border-[lightGrey] px-4 py-1.5"
      onChange={(e) => setInstruction(e.target.value)}
      value={instruction}
      {...register(`instruction${index}`)}
    />
  );
};

export default InstructionInput;

export const normalizeOptions = (
  inputs: Spacing,
): [number, number, number, number] => {
  if (!Array.isArray(inputs)) {
    const value = inputs;
    return [value, value, value, value];
  }
  if (inputs.length === 2) {
    const value1 = inputs[0],
      value2 = inputs[1];
    return [value1, value2, value1, value2];
  }
  if (inputs.length === 4) {
    const value1 = inputs[0],
      value2 = inputs[1],
      value3 = inputs[2],
      value4 = inputs[3];
    return [value1, value2, value3, value4];
  }
  return inputs;
};

export type Spacing =
  | number
  | [number, number]
  | [number, number, number, number];

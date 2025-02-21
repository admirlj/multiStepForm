export const cleanValues = (value) =>
  value === "null" || value === "undefined" ? null : value;

export const toCamelCase = (str) => {
  return str
    .trim()
    .toLowerCase()
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) =>
      index === 0 ? match.toLowerCase() : match.toUpperCase()
    )
    .replace(/\s+/g, "");
};

export const getInputsValue = (listOfInputs, stepName, formData) => {
  const values = listOfInputs.reduce((prev, curr) => {
    const value = formData.get(curr.name);
    return {
      ...prev,
      [curr.name]: value,
    };
  }, {});

  const data = {
    stepName,
    inputs: values,
  };

  return data;
};

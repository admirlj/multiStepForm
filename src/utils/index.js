export const cleanValues = (value) => value === 'null' || value === 'undefined' ? null : value


export const toCamelCase = (str) => {
    return str
      .trim() // Remove leading and trailing spaces
      .toLowerCase() // Convert everything to lowercase
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase()
      )
      .replace(/\s+/g, ""); // Remove all spaces
  }
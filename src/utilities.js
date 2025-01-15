function toCamelCase(string) {
  let lowerCase = string.toLowerCase();

  return lowerCase
    .split(" ")
    .reduce((s, c) => s + (c.charAt(0).toUpperCase() + c.slice(1)));
}

export { toCamelCase };

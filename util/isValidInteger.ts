// Validates if a string is an integer
export const isValidInteger = (num: string): boolean => (isNaN(parseInt(num)) ? false : true);

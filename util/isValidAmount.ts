// Validates if a monetary amount is a number and at most 2 decimal places
export const isValidAmount = (num: string | number): boolean => {
    if (typeof num !== "number") {
        return false;
    }

    return num.toString().split(".")[1]?.length > 2 ? false : true;
};

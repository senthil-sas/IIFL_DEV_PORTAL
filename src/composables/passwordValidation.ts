export function passwordValidation() {
    const containsSpaceOrDot = (str: any) => {
        // Regular expression to check for space or dot
      
        const regex = /[ .]/;
      
        return regex.test(str);
      };
    const containsNumber = (str: any) => {
        // Regular expression to check for any digit
      
        const regex = /\d/;
      
        return regex.test(str);
    };
    const containsSpecialChar = (str: any) => {
        const regex = /[^a-zA-Z0-9\s]/;
        return regex.test(str);
    };
    const containsUpperCase = (str: any) => {
        const regex = /[A-Z]/;
      
        return regex.test(str);
    };
    const containsLowerCase = (str: any) => {
        const regex = /[a-z]/;
      
        return regex.test(str);
    };
    const keyPress = (event: any) => {
        if (event.keyCode == 32 || event.keyCode == 46) {
          event.preventDefault();
          return false;
          // Prevent the input of space or period
        }
    };
    const validationArrayVal = [
        { name: "8 - 12 Characters", active: false, value: "character" },
      
        { name: "At least 1 Number", active: false, value: "number" },
      
        { name: "At least 1 Lower Case", active: false, value: "lowerCase" },
        { name: "At least 1 Upper Case", active: false, value: "upperCase" },
        { name: "At least 1 Special Character", active: false, value: "specialChar" },
      ]
   
      return { containsSpaceOrDot,containsNumber, containsSpecialChar,containsUpperCase, containsLowerCase,keyPress , validationArrayVal};
}

export type ValidationType =
| "character"
| "number"
| "spaceAndDots"
| "upperCase"
| "lowerCase"
| "specialChar"
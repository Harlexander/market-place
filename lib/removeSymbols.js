export function removeSymbols(str) {
    // Regular expression to match symbols and special characters
    const symbolRegex = /[^a-zA-Z0-9\s]/g;
  
    // Remove symbols from the string using replace method
    const result = str.replace(symbolRegex, '');
  
    return result;
  }
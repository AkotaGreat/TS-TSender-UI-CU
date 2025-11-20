export function calculateTotal(input: string): number {

  if (!input || input.trim() === '') {
    return 0;
  }


  const numbers = input
    .split(/[\n,]+/)           
    .map(str => str.trim())    
    .filter(str => str !== '') 
    .map(str => parseFloat(str)) 
    .filter(num => !isNaN(num)); 

  // Sum all valid numbers
  return numbers.reduce((sum, num) => sum + num, 0);
}

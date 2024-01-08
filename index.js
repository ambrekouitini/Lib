import { convertCurrency } from './src/average.js';

convertCurrency(100, 'USD', 'EUR').then(convertedAmount => console.log(`Converti: ${convertedAmount}`));

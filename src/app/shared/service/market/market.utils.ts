export function validateStockSymbol(symbol: string): Promise<string | Error> {
  // TODO: fetch symbols from API and validate
  return new Promise((resolve, reject) => {
    if (symbol && symbol.length) {
      resolve(symbol);
    } else {
      reject(new Error('Symbol is invalid.'));
    }
  });
}

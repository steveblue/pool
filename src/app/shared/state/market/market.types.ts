/**
 * Map of trade conditions from Finnhub
 * Adapted from Google spreadsheet
 * https://docs.google.com/spreadsheets/d/1PUxiSWPHSODbaTaoL2Vef6DgU-yFtlRGZf19oBb9Hp0/edit#gid=0
 */
export const TradeConditionsMap: Record<string, string> = {
  '1': 'Regular',
  '2': 'Acquisition',
  '3': 'Average Price Trade',
  '4': 'Bunched ',
  '5': 'Cash Sale',
  '6': 'Distribution',
  '7': 'Auomatic Execution',
  '8': 'Intermarket Sweep Order',
  '9': 'Bunched Sold',
  '10': 'Price Variation Trade',
  '11': 'Cap Election',
  '12': 'Odd Lot Trade',
  '13': 'Rule 127',
  '14': 'Rule 155',
  '15': 'Sold last',
  '16': 'Market Center Official Close',
  '17': 'Next day',
  '18': 'Market Center Opening Trade',
  '19': 'Opening Prints',
  '20': 'Market Center Official Open',
  '21': 'Prior Reference Price',
  '22': 'Seller',
  '23': 'Split Trade',
  '24': 'Form-T Trade',
  '25': 'Extended Hours (Sold Out of Sequence)',
  '26': 'Contingent Trade',
  '27': 'Stock Option Trade',
  '28': 'Cross Trade',
  '29': 'Yellow Flag',
  '30': 'Sold (Out of Sequence)',
  '31': 'Stopped Stock',
  '32': 'Derivatively Priced',
  '33': 'Market Center Re-opening Trade',
  '34': 'Re-opening Prints',
  '35': 'Market Center Closing Trade',
  '36': 'Closing Prints',
  '37': 'Qualified Contigent Trade',
  '38': 'Placeholder for 611 Exempt',
  '39': 'Corrected Consolidated Close',
  '40': 'Opened',
  '41': 'Trade Through Exempt (TTE)',
};

/**
 * Represents a serialized data point from the Finnhub API that is more human headable.
 * @interface
 * @param {string} conditions - List of trade conditions in human readable format.
 * @param {string} lastPrice - Last price.
 * @param {string} symbol - Symbol.
 * @param {string} timestamp - Date.
 * @param {string} volume - Volume.
 */
export interface StockValue {
  symbol: string;
  lastPrice: number;
  timestamp: Date;
  conditions: Array<string>;
  volume: number;
}

/**
 * Represents a data point from the Finnhub API.
 * @type
 * @param {string} c - List of trade conditions. A comprehensive list of trade conditions code can be found at
 * https://docs.google.com/spreadsheets/d/1PUxiSWPHSODbaTaoL2Vef6DgU-yFtlRGZf19oBb9Hp0/edit#gid=0
 * @param {string} p - Last price.
 * @param {string} s - Symbol.
 * @param {string} t - UNIX milliseconds timestamp.
 * @param {string} v - Volume.
 */
export type FinnData = {
  c: Array<string>;
  p: number;
  s: string;
  t: number;
  v: number;
};

/**
 * Represents a message from the Finnhub API.
 * @interface
 * @param {string} data - The last known data points of any given type.
 * @param {string} type - The kind of message, i.e. "trade".
 */
export interface FinnMessage {
  data: Array<FinnData>;
  type: string;
}

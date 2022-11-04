export interface Tweet {
  tweet_id: string;
  'Source unknown': boolean;
  'Source screenshot static': boolean;
  'Source screenshot dashboard': boolean;
  'Title neutral': boolean;
  'Title support': boolean;
  'Title oppose': boolean;
  'Title alt': boolean;
  'Native annotation neutral': boolean;
  'Native annotation support': boolean;
  'Native annotation oppose': boolean;
  'Native annotation alt': boolean;
  'Added annotation neutral': boolean;
  'Added annotation support': boolean;
  'Added annotation oppose': boolean;
  'Added annotation alt': boolean;
  'Tweet text neutral': boolean;
  'Tweet text support': boolean;
  'Tweet text oppose': boolean;
  'Tweet text alt': boolean;
  'Truncated axis': boolean;
  'Dual axis': boolean;
  'Value as area/volume': boolean;
  'Inverted axis': boolean;
  'Uneven binning': boolean;
  'Unclear encoding': boolean;
  'Inappropriate encoding': boolean;
  'Cherry-picking': boolean;
  'Setting an arbitrary threshold': boolean;
  'Causal inference': boolean;
  'Issues with data validity': boolean;
  'Failure to account for statistical nuance': boolean;
  'Misrepresentation of scientific studies': boolean;
  'Incorrect reading of chart': boolean;
}

export interface RowData {
  'Tweet text oppose': number;
  'Tweet text neutral': number;
  'Tweet text support': number;
  'Tweet text alt': number;
}

export type RowLabelOptions = 
  'Dual axis' 
  | 'Value as area/volume'
  | 'Inverted axis'
  | 'Uneven binning'
  | 'Unclear encoding'
  | 'Inappropriate encoding'
  | 'Cherry-picking'
  | 'Setting an arbitrary threshold'
  | 'Causal inference'
  | 'Issues with data validity'
  | 'Failure to account for statistical nuance'
  | 'Misrepresentation of scientific studies'
  | 'Incorrect reading of chart';

export type SentimentOptions = 
  'Tweet text oppose'
  | 'Tweet text neutral'
  | 'Tweet text support'
  | 'Tweet text alt';

export interface Partner {
  id: string;
  name: string;
}

export interface RevShareEntry {
  partner: Partner;
  rate: number;
  currency: string;
  period: string;
}

export interface Event {
  eventId: number;
  gmtdatetime: string;
  title: string;
  country: string | null;
  city: string | null;
  timezone: string;
  price: number;
  currency: string;
  duration_in_minutes: number;
  soldOut: boolean;
  eventType: string;
  zoomInvite: string;
}

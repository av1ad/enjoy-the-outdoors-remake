export interface Mountain {
  name: string;
  elevation: number;
  effort: string;
  img: string;
  desc: string;
  coords: {
    lat: number;
    lng: number;
  };
}

export interface NationalPark {
  LocationID: string;
  LocationName: string;
  Address: string | number;
  City: string;
  State: string;
  ZipCode: number | string;
  Phone: string | number;
  Fax: string | number;
  Visit?: string;
  Latitude: number;
  Longitude: number;
  Location: {
    type: string;
    coordinates: [number, number];
  };
}

export interface Activity {
  id: number;
  name: string;
}

export interface ParkType {
  id: number;
  name: string;
}

export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

export interface SearchFilters {
  location?: string;
  parkType?: string;
  activity?: string;
}
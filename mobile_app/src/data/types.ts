export type LoginType = {
  email: string;
  password: string
}

export type SignUpType = {
  email: string;
  password: string,
  repeatPassword: string,
  name: string
}

export type Coordinate = { lat: number; lng: number };

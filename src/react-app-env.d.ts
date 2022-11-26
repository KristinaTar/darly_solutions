/// <reference types="react-scripts" />


type User = {
  id: number,
  name: string,
  username: string,
  email: string,
  address: {
    street?: string,
    suite?: string,
    city: string,
    zipcode?: string,
    geo?: {
      lat: string,
      lng: string,
    }
  },
  phone: string,
  website?: string,
  company?: {
    name: string,
    catchPhrase?: string,
    bs?: string,
  }
}

type UserData = {
  name: string,
  userName: string,
  email: string,
  phone: string,
  city: string,
};

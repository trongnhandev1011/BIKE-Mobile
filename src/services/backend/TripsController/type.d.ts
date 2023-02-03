export type Location = {
  id: number;
  name: string;
  address: string;
};

export type Trip = {
  from_location: Location;
  to_location: Location;
  partner: {
    type: string;
    email: string;
    name: string;
    phone_number: string;
  };
  start_at: string;
  status: string;
};

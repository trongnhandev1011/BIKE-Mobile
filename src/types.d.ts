export type User =
  | {
      id: string;
      email: string;
      name: string;
      phone: string;
      avatar: string;
      card: string;
      averagePoint: number;
      isUpdated: boolean;
    }
  | {};

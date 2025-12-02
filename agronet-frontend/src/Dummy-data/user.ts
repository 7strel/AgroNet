export interface User {
    id: number;
    name: string;
    email: string;
    avatar: string;
    isOnline: boolean;
  }
  
  export const users: User[] = [
    {
      id: 1,
      name: "Amina Bello",
      email: "amina.bello@example.com",
      avatar: "https://i.pravatar.cc/150?img=32",
      isOnline: true,
    },
    {
      id: 2,
      name: "Chinedu Okoro",
      email: "chinedu.okoro@example.com",
      avatar: "https://i.pravatar.cc/150?img=45",
      isOnline: false,
    },
    {
      id: 3,
      name: "Fatima Yusuf",
      email: "fatima.yusuf@example.com",
      avatar: "https://i.pravatar.cc/150?img=12",
      isOnline: true,
    },
  ];
  
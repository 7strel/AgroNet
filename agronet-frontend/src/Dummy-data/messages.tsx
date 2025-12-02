type Message = {
    id: number;
    avatar: string;
    name: string;
    handle: string;
    message: string;
    time: string;
    isBookmarked: boolean;
  };
  

const messages: Message[] = [
    {
      id: 1,
      avatar: "/images/man-derek.png",
      name: "Derek",
      handle: "",
      message: "You should go through those notes",
      time: "3:30pm",
      isBookmarked: true,
    },
    {
      id: 2,
      avatar: "/images/woman.png",
      name: "Sarah",
      handle: "@glok10",
      message: "good day my potatoe",
      time: "10:00am",
      isBookmarked: true,
    },
    {
      id: 3,
      avatar: "/images/man.png",
      name: "Mike",
      handle: "",
      message: "Morning my wonderful carrot..",
      time: "1:00pm",
      isBookmarked: true,
    },
    {
      id: 4,
      avatar: "/images/man-tensor.png",
      name: "Lil",
      handle: "@tensor",
      message: "Do you want my banana",
      time: "01:00am",
      isBookmarked: false,
    },
    {
      id: 5,
      avatar: "/images/office-man.png",
      name: "Bar",
      handle: "",
      message: "send me those peaches",
      time: "09:00am",
      isBookmarked: false,
    },
  ];


  export default messages;
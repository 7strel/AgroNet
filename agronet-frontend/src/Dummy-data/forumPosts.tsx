import forumPostInterface from "../Interfaces/community/forum_post_interface";


const forumPosts: forumPostInterface[] = [
  {
    id: 1,
    title: "Sustainable Farming: Best Practices for Maximizing Crop Yield",
    tags: ["farming", "sustainability", "agriculture"],
    author: "John Farmer",
    date: "3 weeks ago",
    views: "651,324 Views",
    likes: "36,654",
    comments: 56,
    image: "/images/modern-farming.png",
    liked: false,
  },
  {
    id: 2,
    title: "The 4-Step Guide to Organic Farming for Higher Crop Production",
    tags: ["organic", "farming", "agriculture"],
    author: "Emily Greenfield",
    date: "3 days ago",
    views: "244,564 Views",
    likes: "10,920",
    comments: 184,
    image: "/images/organic.jpg",
    liked: true,
  },
  {
    id: 3,
    title: "Smart Irrigation: Using Technology to Improve Water Efficiency",
    tags: ["irrigation", "technology", "water management"],
    author: "Robert Hayfield",
    date: "1 week ago",
    views: "601,066 Views",
    likes: "24,753",
    comments: 209,
    image: "/images/greener-future.jpg",
    liked: true,
  },
  {
    id: 4,
    title: "Modern Agricultural Equipment: Boosting Productivity on Farms",
    tags: ["equipment", "agriculture", "technology"],
    author: "Sarah Fields",
    date: "2 weeks ago",
    views: "964,258 Views",
    likes: "64,755",
    comments: 44,
    image: "/images/agriculture-analytics.jpg",
    liked: false,
  },
];



export default forumPosts;
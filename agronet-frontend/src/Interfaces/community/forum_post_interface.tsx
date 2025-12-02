interface forumPostInterface {
  id: number;
  title: string;
  tags: string[];
  author: string;
  date: string;
  views: string;
  likes: string;
  comments: number;
  image: string;
  liked: boolean;
}



export default forumPostInterface;
import React from "react";

interface Meetup {
  date: string;
  title: string;
  platform: string;
  location: string;
  tags: string[];
}

interface Podcast {
  title: string;
  author: string;
  image: string;
}

const meetups: Meetup[] = [
  {
    date: "FEB 7",
    title: "UIHUT - Crunchbase Company Profile...",
    platform: "UIHUT",
    location: "Sylhet, Bangladesh",
    tags: ["Remote", "Part-time", "Worldwide"],
  },
  {
    date: "FEB 3",
    title: "Design Meetups USA | Dribbble",
    platform: "Dribbble",
    location: "Austin, Texas, USA",
    tags: ["Remote", "Part-time"],
  },
  {
    date: "FEB 5",
    title: "Meetup Brand Identity Design - Beha...",
    platform: "Behance",
    location: "San Jose, California, USA",
    tags: ["Full-time", "Contract", "Worldwide"],
  },
];

const podcasts: Podcast[] = [
  {
    title: "Selling a Business and Scaling Another Amidst Tragedy.",
    author: "Michele Hansen",
    image: "/podcast1.png",
  },
  {
    title: "Mental health as a founder and the importance of community...",
    author: "James McKirven",
    image: "/podcast2.png",
  },
  {
    title: "Growing to $8.5k MRR in 1 year - Marie Martens, Tally.so",
    author: "Mahfuzul Nabil",
    image: "/podcast3.png",
  },
  {
    title: "Mental Health and Bootstrapping in 2022 with Rob Walling of TinySe",
    author: "Dr. Jubed",
    image: "/podcast4.png",
  },
  {
    title: "Money, Happiness, and Productivity as a Solo Founder with Pieter Levels",
    author: "Jesse Hanley",
    image: "/podcast5.png",
  },
];

const MeetupsAndPodcasts: React.FC = () => {
  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg space-y-6 max-w-lg mx-auto">
      <div>
        <h2 className="text-lg font-semibold mb-4">Meetups →</h2>
        <div className="space-y-4">
          {meetups.map((meetup, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-400">{meetup.date}</p>
              <h3 className="text-md font-semibold">{meetup.title}</h3>
              <p className="text-sm text-gray-400">{meetup.platform} • {meetup.location}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {meetup.tags.map((tag, i) => (
                  <span key={i} className="bg-gray-700 text-xs px-2 py-1 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-4">Podcasts →</h2>
        <div className="space-y-4">
          {podcasts.map((podcast, index) => (
            <div key={index} className="bg-gray-800 p-4 rounded-lg flex items-center space-x-4">
              <img
                src={podcast.image}
                alt={podcast.title}
                className="w-12 h-12 rounded-lg"
              />
              <div>
                <h3 className="text-md font-semibold leading-tight">{podcast.title}</h3>
                <p className="text-sm text-gray-400">by {podcast.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetupsAndPodcasts;
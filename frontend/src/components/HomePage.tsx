import React, { useEffect, useState } from "react";
import axios from "axios";
import { localAddress } from "../appconfig.tsx";

import User from "../interfaces/user.interface";

const articleText = `
    Shares on Wall Street and in London have fallen heavily amid a global stock market rout triggered by fears of a recession in the US.
    The tech-focused Nasdaq index dropped by 6% as trading in New York opened on Monday, while the broader S&P 500 index fell by 4.2% in a sell-off triggered by weak US jobs data. The Dow Jones industrial average lost more than 1,100 points, a 2.8% decline.
    Japan’s benchmark stock index, the Nikkei 225, suffered its biggest decline for nearly four decades. It was down by 12%, the biggest single-day fall since the Black Monday crash of 1987. Other stock indices around the world were lower as investors dumped riskier assets. South Korea’s Kospi fell by 9%, Germany’s Dax was down 2%, and share indices in Australia, Hong Kong and China also fell heavily.
    London’s FTSE 100 ended the day 166.5 points down at 8,008, its lowest close since April, and down more than 2% across the day.
    Investors are concerned that the Federal Reserve may have left it too late to try to support the world’s biggest economy, with fears of the ripple effect from a US recession shaking economies around the world.
    A much-anticipated report on Friday showed the US economy added just 114,000 jobs last month, well down from June and far fewer than expected, while the jobless rate rose to the highest level since October 2021. Weak factory data last week also added to concern about a recession less than 100 days from the US presidential election.....
`;

const HomePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get(
        "https://random-data-api.com/api/v2/users"
      );
      const newUser: User = {
        userId: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        avatar: data.avatar,
      };
      setUser(newUser);
      await axios.post(`${localAddress}/api/users`, newUser);
    };

    fetchUser();
  }, []);

  const handleScroll = async () => {
    const imgElement = document.getElementById(
      "user-avatar"
    ) as HTMLImageElement | null;
    if (!imgElement || !user) return;

    const rect = imgElement.getBoundingClientRect();
    if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
      await axios.patch(`${localAddress}/api/users/${user.userId}`, {
        scrolledToImage: true,
      });
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user]);

  return (
    <div>
      {user && (
        <>
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i}>
              <div>Article {i + 1} </div>
              <div>{articleText}</div>
            </p>
          ))}
          <img id="user-avatar" src={user.avatar} alt="User Avatar" />
          {Array.from({ length: 10 }, (_, i) => (
            <p key={i + 10}>
              <div>Article {i + 10} </div>
              <div>{articleText}</div>
            </p>
          ))}
        </>
      )}
    </div>
  );
};

export default HomePage;

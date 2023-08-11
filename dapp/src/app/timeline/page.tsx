"use client";
import NewTweet from "@/components/NewTweet";
import Tweet from "@/components/Tweet";
import { getLastTweets } from "@/services/Web3Service";
import { TTweet } from "@/type";
import Head from "next/head";
import React from "react";

export default function Timeline() {
  const [tweets, setTweets] = React.useState<TTweet[]>([]);
  const [page, setPage] = React.useState<number>(1);

  const btnLoadMoreClick = () => {
    setPage((prev) => prev + 1);
  };

  const loadTweets = async (page = 1) => {
    try {
      const results = await getLastTweets(page);
      if (page > 1) {
        setTweets((prev) => [...prev, ...results].reverse());
        return;
      } else {
        setTweets(results);
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  React.useEffect(() => {
    loadTweets(page);
  }, [page]);

  return (
    <>
      <Head>
        <title>CrypTwitter | Timeline</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">
        <div className="row">
          <div className="layout">
            <NewTweet />
            {tweets && tweets.length ? (
              tweets.map((tweet, i) => (
                <Tweet key={`${tweet.author}-${i}`} data={tweet} />
              ))
            ) : (
              <p>Nothing to see here, do the first tweet</p>
            )}
            {tweets.length > 0 && tweets.length % 10 === 0 ? (
              <div className="center">
                <input
                  type="button"
                  className="btn btn-primary"
                  value="More Tweets"
                  onClick={btnLoadMoreClick}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

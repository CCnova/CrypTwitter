"use client";
import { addTweet } from "@/services/Web3Service";
import { useRouter } from "next/navigation";
import React from "react";

export default function NewTweet() {
  const [text, setText] = React.useState<string>("");
  const [message, setMessage] = React.useState<string>("");
  const { push } = useRouter();

  const btnPublishClick = () => {
    setMessage("Sending your tweet to blockchain...Hold on...");
    addTweet(text)
      .then((result) => {
        setText("");
        setMessage("Tweet was sent, Wait one minute to update.");
      })
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  };

  React.useEffect(() => {
    const wallet = localStorage.getItem("wallet");
    if (!wallet) push("/");
  }, [push]);

  return (
    <>
      <div className="top">
        <h1>Welcome Back!</h1>
        <p>What is happening?</p>
        <textarea
          className="form-control my-3"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <div>
          <input
            type="button"
            onClick={btnPublishClick}
            className="btn btn-primary"
            value="Send"
          />
          <span className="message">{message}</span>
        </div>
      </div>
    </>
  );
}

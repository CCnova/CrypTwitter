"use client";
import { doLogin } from "@/services/Web3Service";
import Head from "next/head";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const { push } = useRouter();
  const [message, setMessage] = React.useState<string>();

  const btnLoginClick = () => {
    setMessage("Connecting with MetaMask");
    doLogin()
      .then((wallet) => push("/timeline"))
      .catch((error) => {
        console.error(error);
        setMessage(error.message);
      });
  };

  return (
    <>
      <Head>
        <title>CrypTwitter | Login</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
          <div className="col-10 col-sm-8 col-lg-6">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80"
              className="d-block mx-lg-auto img-fluid"
              width="700"
              height="500"
            />
          </div>
          <div className="col-lg-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">
              CrypTwitter
            </h1>
            <p className="lead">Your descentralized social network</p>
            <p className="lead mb-3">
              Auth with your wallet and be on top of what is happening in the
              world
            </p>
            <div className="d-grid gap-2 d-md-flex justify-content-md-start">
              <button
                type="button"
                className="btn btn-primary btn-lg px-4 me-md-2"
                onClick={btnLoginClick}
              >
                <img src="/metamask.svg" width="64" className="me-3" />
                Connect with MetaMask
              </button>
            </div>
            <p className="message">{message}</p>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Background from "./Background";
import Chat from "./Chat";
import Youtube from "react-youtube";
import { get } from "../utils/network";
import ExperimentalPlayer from "./ExperimentalPlayer";
import { Redirect } from "react-router-dom";

type Sources = {
  youtube: string;
  experimental: string;
};

const StreamingApp = () => {
  const [useExperimental, setUse] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [sources, setSources] = useState<Sources>({
    youtube: "",
    experimental: "",
  });
  const [videoId, setVideoId] = useState<string>("");

  useEffect(() => {
    get("/video")
      .then((r) => r.json())
      .then((r) => {
        setSources(r as Sources);
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <Redirect to={"/digital-ticket"} />;
  }

  return (
    <Background>
      <button
        onClick={() => {
          setUse(!useExperimental);
        }}
      >
        Endre spiller
      </button>

      {useExperimental ? (
        <ExperimentalPlayer id={sources.experimental} />
      ) : (
        <Youtube videoId={sources.youtube} />
      )}
      <Chat />
    </Background>
  );
};

export default StreamingApp;

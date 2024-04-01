import throttle from "lodash.throttle";
import React, { useEffect, useRef } from "react";
import useWebSocket from "react-use-websocket";

const Home = ({ username }) => {
  const WS_URL = "ws://localhost:8000";

  const { sendJsonMessage } = useWebSocket(WS_URL, {
    queryParams: { username },
  });

  const THROTTLE = 1000; // 1s;
  const sendJsonMessageThrottled = useRef(throttle(sendJsonMessage, THROTTLE));

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      sendJsonMessageThrottled({ x: e.clientX, y: e.clientY });
    });

    return () => {
      window.removeEventListener("mousemove", () => {});
    };
  }, []);

  return <h1>Hello, {username}</h1>;
};

export default Home;

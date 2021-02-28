import React, { useEffect, useState } from "react";
import { Redirect, RouteComponentProps, RouterProps } from "react-router-dom";
import {
  getAccessToken,
  getBackend,
  setAccessToken,
  unPost,
} from "../utils/network";

const Login: React.FC<RouteComponentProps<{ token: string }>> = ({ match }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [redirect, setRedirect] = useState<string>("/stream");

  useEffect(() => {
    if (getAccessToken() !== undefined) {
      unPost("/login", {
        token: match.params.token,
      })
        .then((r) => {
          if (r.status === 401) {
            throw "Unathenticated";
          } else if (r.status !== 200) {
            throw "Unknown error";
          }
          return r;
        })
        .then((r) => r.json())
        .then((r) => {
          setAccessToken(r.token);
          setLoading(false);
        })
        .catch((err) => {
          setRedirect("/error");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  });

  if (loading) {
    return <div>loading...</div>;
  }

  return <Redirect to={redirect} />;
};

export default Login;

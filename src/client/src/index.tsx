import React, { createContext } from "react";
import ReactDOM from "react-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
  ApolloLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import "./index.css";
import App from "./App";
import { getAccessToken, setAccessToken } from "./auth/jwt";
import decode from "jwt-decode";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/graphql",
  credentials: "include",
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token = getAccessToken();

  if (token) {
    try {
      //check if token is expiring in the next minute
      const { exp }: { iat: number; exp: number; userId: number } =
        decode(token);

      const currentTime = new Date().getTime() / 1000;

      if (exp - currentTime < 60) {
        //get new access token
        const data = await fetch("http://localhost:4000/refresh_token", {
          method: "POST",
          credentials: "include",
        });
        const accessToken = await data.json();

        //set new token
        setAccessToken(accessToken.jwt);

        //set current token
        token = getAccessToken();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([authLink, httpLink]),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

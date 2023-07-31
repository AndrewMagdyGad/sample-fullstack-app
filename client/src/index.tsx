import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <Provider store={store}>
                <BrowserRouter>
                    <SnackbarProvider maxSnack={4}>
                        <App />
                    </SnackbarProvider>
                </BrowserRouter>
            </Provider>
        </ApolloProvider>
    </React.StrictMode>
);

import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import "./global.scss";
import { Provider } from "react-redux";
import store from "./redux/store";

export const wa = window.Telegram.WebApp;
export const isDesktop = ["tdesktop", "macos"].includes(wa.platform);

export const tgPaddingTop = { paddingTop: isDesktop ? "10px" : "var(--tg-padding-top)" }

if (!["tdesktop", "macos"].includes(wa.platform)) {
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.requestFullscreen();
    window.Telegram.WebApp.enableClosingConfirmation();
    wa.disableVerticalSwipes();
}

ReactDOM.createRoot(document.getElementById("root")!).render(
    <TonConnectUIProvider manifestUrl="https://static.daytona-project.com/black_jack/manifest.json">
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </TonConnectUIProvider>
);

import "../styles/globals.css";
import { TaskProvider } from "../context/taskContext";
import { WalletContextProvider } from "../context/WalletContext";

global.Buffer = Buffer;

function MyApp({ Component, pageProps }) {
  return (
    <WalletContextProvider>
      <TaskProvider>
        <Component {...pageProps} />
      </TaskProvider>
    </WalletContextProvider>
  );
}

export default MyApp;


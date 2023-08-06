import { type AppType } from "next/dist/shared/lib/utils";
import { Major_Mono_Display } from "next/font/google";
import "~/styles/globals.css";

const majorMono = Major_Mono_Display({
  weight: "400",
  subsets: ["latin"], 
})

const MyApp: AppType = ({ Component, pageProps }) => {
  return <div className={majorMono.className}>
    <Component {...pageProps} />
  </div>;
};

export default MyApp;

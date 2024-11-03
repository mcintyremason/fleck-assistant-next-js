import { ThemeProvider } from "@emotion/react";
import { AppContainer } from "../containers/AppContainer";
import originalTheme from "../themes/original-theme";

const Application = ({ Component, pageProps }) => {
  return (
    <AppContainer>
      <ThemeProvider theme={originalTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AppContainer>
  );
};

export default Application;

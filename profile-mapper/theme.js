import { createTheme } from "@mui/material/styles";

const setAppMode = (mode) => ({
  palette: {
    mode,
    background: {
      default: mode === 'light' ? "#ffffff" : '#17153B', // Body background
      paper: mode === 'light' ? '#fff9e6' : '#2E236C',
      primary:mode === 'light' ? '#6a4dff' : '#A53860',
    },
    primary: {
      main: mode === 'light' ? "#A0C878" : "#C8ACD6",
      contrastText: mode === 'light' ? "#121212" : '#fff',
    },
    text: {
      optional:'#fff',
      primary: mode === 'light' ? "#121212" : '#ffff',
      secondary: mode === 'light' ? "#4F4F4F" : '#f2f2f2',
    },
    divider: "#D1D1D1",
    custom: {
      iconBackground: '#6a4dff',
      linkMain: mode === 'light' ? "#6a4dff" : '#fff',
      buttonBackground: mode === 'light' ? "#f1e6c1" : '#17153B',
      onHover: mode === 'light' ? '#A0C878' : '#584185',
    },
  },
  typography: {
    fontFamily: "Nunito, sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14 },
  },
});

const theme = (mode = "light") => createTheme(setAppMode(mode));

export default theme;

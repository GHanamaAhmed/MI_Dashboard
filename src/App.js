import { useSelector } from 'react-redux';

import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from 'routes';
// defaultTheme
import themes from 'themes';

// project imports
import NavigationScroll from 'layout/NavigationScroll';
import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { infoContext } from 'contexts/infoContext';
import { specialityContext } from 'contexts/speciality';
import ToastProvider from 'utils/toast';
// ==============================|| APP ||============================== //

const App = () => {
  const customization = useSelector((state) => state.customization);
  const { info, loading, auth } = useContext(infoContext);
  const {pathname} = useLocation();
  return (
    <ToastProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>{(!loading && auth) || RegExp('/auth*').test(pathname) ? <Routes /> : <div>Loading...</div>}</NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </ToastProvider>
  );
};

export default App;

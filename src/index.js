import { createRoot } from 'react-dom/client';

// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

// project imports
import * as serviceWorker from 'serviceWorker';
import App from 'App';
import { store } from 'store';

// style + assets
import 'assets/scss/style.scss';
import config from './config';
import InfoContextProvider from 'contexts/infoContext';
import SpecialityContextProvider from 'contexts/speciality';
import AnnoucementContextProvider from 'contexts/annoucement';
import SearchContextProvider from 'contexts/searchContext';

// ==============================|| REACT DOM RENDER  ||============================== //

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <InfoContextProvider>
        <SpecialityContextProvider>
          <SearchContextProvider>
            <AnnoucementContextProvider>
              <App />
            </AnnoucementContextProvider>
          </SearchContextProvider>
        </SpecialityContextProvider>
      </InfoContextProvider>
    </BrowserRouter>
  </Provider>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

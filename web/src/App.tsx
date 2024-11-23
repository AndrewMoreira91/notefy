import Routes from "./routes";
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <PrimeReactProvider value={{unstyled: true}}>
      <Routes />
    </PrimeReactProvider>
  )
}

export default App

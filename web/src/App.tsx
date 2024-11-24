import Routes from "./routes";
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <PrimeReactProvider>
      <Routes />
    </PrimeReactProvider>
  )
}

export default App

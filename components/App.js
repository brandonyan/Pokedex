import Encabezado from './Encabezado'
import { Provider } from 'react-redux'
import store from '../redux/store'

const App = ({children}) => (
    <Provider store={store}>
    <main>
        <Encabezado />
        {children}
    </main>
    </Provider>
)

export default App;
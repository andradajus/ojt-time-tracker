import { UserProvider } from '../context/UserContext';
import RouteNavigator from './RouteNavigator';

const RouterLayout = () => {
  return (
    <UserProvider>
      <RouteNavigator />
    </UserProvider>
  );
};

export default RouterLayout;

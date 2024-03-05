import React, { useEffect } from 'react';
import Navigator from './components/navigator';
import SplashScreen from './components/SplashScreen';
const App = () => {
  const [isShown, setShown] = React.useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShown(true);
    }, 3000);
  }
  );
  if (!isShown) {
    return <SplashScreen />;
  }else{
  return <Navigator />;
};
}
export default App;

import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { View } from 'react-native';

const EBAY_LOGOUT_URL = 'https://signin.ebay.com/ws/eBayISAPI.dll?SignIn&lgout=1';

const LogoutScreen = () => {
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    if (loggedOut) {
      // eBayからログアウトした後の処理をここに書く
    }
  }, [loggedOut]);

  return (
    <View style={{ flex: 1 }}>
      {!loggedOut && (
        <WebView
          source={{ uri: EBAY_LOGOUT_URL }}
          onNavigationStateChange={(navState) => {
            if (navState.url === 'YOUR_REDIRECT_URL_AFTER_LOGOUT') {
              setLoggedOut(true);
            }
          }}
        />
      )}
    </View>
  );
};

export default LogoutScreen;

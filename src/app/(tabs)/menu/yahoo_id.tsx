import { Stack } from 'expo-router'
import { useRef } from 'react'
import { View, StyleSheet, Text, Button } from 'react-native'
import { WebView } from 'react-native-webview'

const YahooId = (): JSX.Element => {
  const webViewRef = useRef(null)

  // const handleGoBack = () => {
  //   if (webViewRef.current) {
  //     webViewRef.current.goBack()
  //   }
  // }

  // const handleReload = () => {
  //   if (webViewRef.current) {
  //     webViewRef.current.reload()
  //   }
  // }

  // const handleGoToSpecificUrl = () => {
  //   if (webViewRef.current) {
  //     webViewRef.current.injectJavaScript(
  //       'window.location.href = \'https://www.anime-chiikawa.jp/\';'
  //     )
  //   }
  // }

  return (
    <>
      <Stack.Screen options={{ headerShown: true, title: 'Yahoo ID 登録' }} />
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: 'https://login.yahoo.co.jp/config/login' }}
          style={styles.webview}
          onMessage={(event) => {
            const data = event.nativeEvent.data
            console.log(new Date(), data)
          }}
          injectedJavaScript={`
          (function() {
              // ページからデータを取得するスクリプトをここに書く
              // const scrapedData = document.body.innerText;
              // window.ReactNativeWebView.postMessage(scrapedData);
              // const button = document.getElementsByTagName('button')
              // const button2 = Array.prototype.slice.call(button);
              const nextButton = document.querySelector('button[type="button"]');
              const subButton = document.querySelector('button[type="submit"]');
              window.ReactNativeWebView.postMessage('$$$$$$$$$$$');
              window.ReactNativeWebView.postMessage(nextButton.textContent);
              window.ReactNativeWebView.postMessage(subButton.textContent);
              let submitButton
              let password
              const id2 = document.getElementById('login_handle')

              nextButton.addEventListener('click', () => {
                window.ReactNativeWebView.postMessage('次へをクリック');
                const id = document.getElementById('login_handle')
                window.ReactNativeWebView.postMessage(id.value);
                setTimeout(() => {
                  submitButton = document.querySelector('button[type="submit"]');
                  window.ReactNativeWebView.postMessage('------');
                  password = document.getElementById('password')
                  window.ReactNativeWebView.postMessage(password.textContent);
                }, 2000);
                })();

              subButton.addEventListener('click', (e) => {
                window.ReactNativeWebView.postMessage('###########');
                window.ReactNativeWebView.postMessage(e.target.value);
                })();

          })();
          `}
        />
        {/* <View style={styles.buttonContainer}>
          <Button title="戻る" onPress={handleGoBack} />
          <Button title="リロード" onPress={handleReload} />
          <Button title="特定のリンクへ遷移" onPress={handleGoToSpecificUrl} />
        </View> */}
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginBottom: 40
  },
  webview: {
    flex: 1
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10
  }
})

export default YahooId

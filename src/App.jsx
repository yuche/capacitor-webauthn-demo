import logo from './logo.svg';
import styles from './App.module.css';
import { WebAuthn } from 'capacitor-native-passkey'

function App() {
  const onClick = async () => {
    const isReady = await WebAuthn.isWebAuthnAvailable()
    // alert(isReady.value)
    // alert(location.href)
    try {
      await WebAuthn.startRegistration({
        "user": {
          "id": "227cc20b-86bb-4719-80d8-22af0ae967dc",
          "name": "JoyID 2023-07-25 15:47:08",
          "displayName": "JoyID 2023-07-25 15:47:08"
        },
        "authenticatorSelection": {
          "userVerification": "required",
          "authenticatorAttachment": "platform",
          "requireResidentKey": true,
          "residentKey": 'preferred'
        },
        "challenge": "mVi_4nnrnuRGG7OBcPpcnzi7Zh6E_C56aXm-EJl4v6k",
        "rp": {
          "id": "app.joyid.dev",
          "name": "JoyID"
        },
        "excludeCredentials": [],
        "pubKeyCredParams": [
          {
            "alg": -7,
            "type": "public-key"
          },
          {
            "alg": -257,
            "type": "public-key"
          }
        ]
      })
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }
  return (
    <div class={styles.App}>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <button onClick={onClick}>Detect Webauthn</button>
      </header>
    </div>
  );
}

export default App;

import logo from './logo.svg';
import styles from './App.module.css';
import { WebAuthn } from 'capacitor-native-passkey'
import { createSignal } from 'solid-js'

function randomBase64ID() {
  return btoa(Math.random().toString(36))
}


function App() {
  const [loggedCid, setLoggedCid] = createSignal('')
  const onRegister = async () => {
    // alert(location.href)
    try {
      const now = Date.now()
      const res = await WebAuthn.startRegistration({
        "user": {
          "id": randomBase64ID(),
          "name": `JoyID ${now}`,
          "displayName": `JoyID ${now}`
        },
        "authenticatorSelection": {
          "userVerification": "required",
          "authenticatorAttachment": "platform",
          "requireResidentKey": true,
          "residentKey": 'preferred'
        },
        "challenge": "mVi_4nnrnuRGG7OBcPpcnzi7Zh6E_C56aXm-EJl4v6k",
        "rp": {
          "id": "joyid-app-git-mobile-test-nervina.vercel.app",
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
      setLoggedCid(res.id)
      alert(JSON.stringify(res))
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  const onRecover = async () => {
    try {
      if (!loggedCid()) {
        alert('Please register first')
        return
      }
      const res = await WebAuthn.startAuthentication({
        "challenge": "-4jq3HNSNHJG6KvWJQuSkksER_Xj2dtDu5pRG_utt6Y",
        "allowCredentials": [{
          "id": loggedCid(),
          type: 'public-key',
          'transports': ['internal']
        }],
        "userVerification": "required",
        rpId: 'joyid-app-git-mobile-test-nervina.vercel.app'
      })
      alert(JSON.stringify(res))
    } catch (error) {
      alert(JSON.stringify(error))
    }
  }

  const onRecover2 = async () => {
    try {
      const res = await WebAuthn.startAuthentication({
        "challenge": "-4jq3HNSNHJG6KvWJQuSkksER_Xj2dtDu5pRG_utt6Y",
        "allowCredentials": [],
        "userVerification": "required",
        rpId: 'joyid-app-git-mobile-test-nervina.vercel.app'
      })
      alert(JSON.stringify(res))
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
        <button onClick={onRegister}>Register</button>
        <button onClick={onRecover} style={{ "margin-top": '50px' }}>Recover single</button>
        <button onClick={onRecover2} style={{ "margin-top": '50px' }}>Recover multiple</button>
      </header>
    </div>
  );
}

export default App;

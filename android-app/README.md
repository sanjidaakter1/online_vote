# Android Fingerprint App (Academic Demo)

1. Open `android-app` in Android Studio.
2. In `MainActivity.java`, change `BASE_URL` to the PHP server URL. Prefer HTTPS for a real network demo.
3. Build/install on an Android phone with an enrolled fingerprint/biometric.
4. Register on the web page. The browser opens the app using `votingapp://biometric/enroll...`.
5. The app requests the server challenge, shows Android BiometricPrompt, signs the challenge with a private key protected by Android Keystore, and sends only the public key/signature to PHP.
6. After successful verification, the server issues a one-time biometric session token and opens `voting.php`.

The app does not read or store a raw fingerprint image. Android performs biometric matching locally.

For local XAMPP Android Emulator testing, `10.0.2.2` maps to the host PC. A physical phone needs the PC LAN IP or an online HTTPS server.

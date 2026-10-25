# Kylo Client for Android

This Android app packages the existing Kylo Client mobile UI inside a native Android WebView. The build workflow copies the root `index.html`, `style.css`, and `app.js` into the app's assets before compiling.

## Build an APK on GitHub Actions

1. Open the repository's **Actions** tab.
2. Select **Build Kylo Client Android APK**.
3. Choose **Run workflow**, or push a commit to `main`.
4. Open the completed run and download the **Kylo-Client-Android-APK** artifact.
5. Extract the ZIP to get `app-debug.apk`, then install it on your Android device.

The generated debug APK is unsigned for Play Store distribution, but Android can install it after allowing installs from the source app.

## Current limitations

This packages the launcher interface only. It does not include a Minecraft Java runtime, download game assets, implement actual in-game mods, or authenticate Microsoft accounts. The Microsoft sign-in button remains a safe placeholder.

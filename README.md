# Kylo Client

A mobile-first black-and-red Kylo Client interface, packaged as an Android WebView app with an automatic GitHub Actions APK build.

## Current scope
- Mobile-responsive launcher home screen
- Minecraft Java 1.8.9 shown as the target version
- Offline username field with basic format validation
- Settings and a 30-feature customization preview
- Black/red theme with motion effects
- Android WebView wrapper in `app/`
- GitHub Actions workflow that builds a debug APK on every push to `main` or manually

## Important status
The APK packages the launcher interface. It does **not** install or launch Minecraft, authenticate Microsoft accounts, or run the preview mod toggles inside the game. A compatible Java runtime, game assets, secure official authentication, and real mod implementations are separate work.


## Real Minecraft engine work

The original APK is still the **UI preview only**. A separate workflow now builds an engine preview from the open-source Amethyst Android launcher source so we can validate real Minecraft Java execution before merging the Kylo UI.

- See [ENGINE_INTEGRATION.md](ENGINE_INTEGRATION.md) for the current architecture and limitations.
- Open **Actions → Build Kylo Minecraft Engine Preview → Run workflow** to build the engine APK.
- The engine preview is currently a separate app; the custom Kylo interface has **not** been merged into the engine yet.
- Upstream source and licensing: https://github.com/AngelAuraMC/Amethyst-Android

## Preview on a phone
Open the [Kylo Client GitHub Pages preview](https://email1fje-dev.github.io/Kylo-client/) in a browser.

## Build and download the Android APK
1. Open the repository's **Actions** tab.
2. Select **Build Kylo Client Android APK**.
3. Choose **Run workflow**, or push a commit to `main`.
4. Open the completed run and download the `Kylo-Client-Android-APK` artifact.
5. Extract the ZIP to get `app-debug.apk` and install it on Android. You may need to allow installs from the app used to open the APK.

The workflow automatically copies the root `index.html`, `style.css`, and `app.js` into Android assets before compiling.

Kylo is an independent community project and is not affiliated with Mojang or Microsoft.

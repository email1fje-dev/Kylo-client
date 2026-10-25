# Kylo Client + Fold Craft Launcher engine

## Integrated Android build

The `Build Kylo Client with FCL Engine` workflow checks out the open-source Fold Craft Launcher engine, overlays Kylo's HTML/CSS/JavaScript home screen into the same APK, changes the Android app label to **Kylo Client**, and makes the Kylo home screen the first screen after the engine's required startup, legal and runtime setup.

- **Kylo home screen:** `index.html`, `style.css`, and `app.js` are packaged inside the engine APK.
- **Native engine:** FCL remains the embedded Minecraft Java launcher/runtime in the same app.
- **Launch button:** the Kylo button opens FCL's native launcher screen from inside the same APK. The user can then select/install a Minecraft version and use FCL's launch controls.
- **Build artifact:** open the repository's Actions tab, select the latest successful `Build Kylo Client with FCL Engine` run, and download `Kylo-Client-ARM64`.

## Current limitation

This is the first integrated-shell milestone, not yet full one-tap version management. Kylo's selected version is passed along as an intent hint, but the FCL UI does not yet automatically select/install that version, expose download progress in the Kylo screen, or start the game directly. Those require wiring into FCL's version/download/launch APIs rather than faking progress. The APK build checks packaging and DEX presence; it does not replace testing on a physical Android device.

## Accounts, licensing and attribution

The app does not bundle Minecraft credentials or bypass official account ownership/authentication. Use a legitimate account and game entitlement where required. FCL and its dependencies retain their own licenses and copyright notices; review upstream licensing before redistributing a derivative. Kylo is an independent community project and is not affiliated with Mojang or Microsoft.

Upstream engine: https://github.com/FCL-Team/FoldCraftLauncher

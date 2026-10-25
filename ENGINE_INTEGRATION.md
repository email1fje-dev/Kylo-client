# Kylo Client + Fold Craft Launcher engine

## Integrated Android build

The `Build Kylo Client with FCL Engine` workflow packages Kylo's HTML/CSS/JavaScript home screen inside the Fold Craft Launcher Android application, changes the app label to **Kylo Client**, and shows Kylo first after FCL's required startup, legal and runtime setup.

- **Kylo home screen:** `index.html`, `style.css`, and `app.js` are packaged inside the same APK.
- **Native engine:** FCL handles Minecraft Java runtime setup, version metadata, libraries, assets, authentication and launching.
- **Launch button:** the Android bridge checks whether the selected vanilla Minecraft version exists in the selected FCL profile. If installed, it selects and launches that version through FCL. If missing, it invokes FCL's `GameBuilder` task, shows FCL's native cancellable installation progress dialog, refreshes the profile, and attempts launch when installation succeeds.
- **Build artifact:** open the repository's Actions tab, select the latest successful `Build Kylo Client with FCL Engine` run, and download `Kylo-Client-ARM64`.

## Testing status and known limitations

The workflow's APK checks confirm that the APK is structurally valid and contains DEX code; they do not replace installation and runtime testing on a physical Android device. The installation task uses FCL's native progress dialog rather than a custom progress meter embedded in the Kylo web UI. The one-tap flow is for vanilla versions whose version IDs match the selected version; mod-loader profiles and custom version IDs are not automatically created by this bridge. Launch still depends on a valid account/runtime/device compatibility and network availability. The bridge does not fake a successful install if FCL reports failure.

## Accounts, licensing and attribution

The app does not bundle Minecraft credentials or bypass official account ownership/authentication. Use a legitimate account and game entitlement where required. FCL and its dependencies retain their own licenses and copyright notices; review upstream licensing before redistributing a derivative. Kylo is an independent community project and is not affiliated with Mojang or Microsoft.

Upstream engine: https://github.com/FCL-Team/FoldCraftLauncher

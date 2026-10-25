# Kylo Minecraft engine integration

## Current architecture

Kylo currently has two separate pieces:

- **Kylo UI APK** — the existing lightweight WebView launcher preview. It does not run Minecraft.
- **Kylo Minecraft Engine Preview** — a CI-built APK based on the open-source Amethyst Android launcher source. This is the first real Java Edition runtime milestone; it is intentionally built separately so the existing UI APK stays stable while integration is developed.

Upstream engine source: https://github.com/AngelAuraMC/Amethyst-Android  
Upstream branch used by the workflow: `v3_openjdk`

## Build the engine preview

1. Open the repository's **Actions** tab.
2. Choose **Build Kylo Minecraft Engine Preview**.
3. Select **Run workflow**.
4. When it finishes successfully, download the `Kylo-Minecraft-Engine-Preview` artifact.
5. Extract the ZIP and install the APK on Android.

The workflow checks out the upstream source and its submodules, fetches the Java 8 runtime artifact used by upstream CI, changes the debug app label to `Kylo Client (Engine Preview)`, builds the Android APK, and validates the resulting package.

## Important limitations

- This milestone is a separate engine-preview app; it does **not yet merge the custom Kylo WebView UI into the game engine**.
- It does not bundle Mojang/Microsoft account credentials or bypass official account requirements. Use a legitimate Minecraft account and game entitlement.
- The build depends on public upstream repositories and their CI runtime artifact; an upstream branch, submodule, or artifact change can break the workflow.
- The upstream project and its dependencies have their own licenses. Keep their license texts, copyright notices, and attribution with any redistributed derivative. Review the current upstream license before publishing builds.
- Kylo is an independent community project and is not affiliated with Mojang, Microsoft, or the Amethyst maintainers.

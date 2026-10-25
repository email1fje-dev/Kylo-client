const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const app = $(".app");
const username = $("#username");
const accountUsername = $("#accountUsername");
const status = $("#status");
const accountLabel = $("#accountLabel");
const dialog = $("#settingsDialog");
const sectionDialog = $("#sectionDialog");

const state = {
  section: "home",
  version: "1.8.9",
  profile: "BedWars profile",
  username: "",
  mods: { "FPS Display": true, "CPS Counter": true, "Minimal HUD": false, "Sprint Toggle": false },
  glow: true,
  compact: false
};

function saveState() {
  try { localStorage.setItem("kylo-client-preview", JSON.stringify(state)); } catch (_) {}
}
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("kylo-client-preview") || "null");
    if (!saved) return;
    if (typeof saved.version === "string") state.version = saved.version;
    if (typeof saved.profile === "string") state.profile = saved.profile;
    if (typeof saved.username === "string") state.username = saved.username;
    if (saved.mods && typeof saved.mods === "object") state.mods = { ...state.mods, ...saved.mods };
    if (typeof saved.glow === "boolean") state.glow = saved.glow;
    if (typeof saved.compact === "boolean") state.compact = saved.compact;
  } catch (_) {}
}
function validUsername(value) {
  return /^[A-Za-z0-9_]{3,16}$/.test(value);
}
function showSection(name) {
  if (!$('[data-page="' + name + '"]')) return;
  state.section = name;
  $$(".page").forEach(page => page.classList.toggle("active", page.dataset.page === name));
  $$(".tab").forEach(tab => tab.classList.toggle("active", tab.dataset.section === name));
  saveState();
  window.scrollTo({ top: 0, behavior: "smooth" });
}
function syncAccount() {
  const name = state.username || "Offline profile";
  accountLabel.textContent = name;
  $("#accountName").textContent = name;
  $("#accountType").textContent = state.username ? "Offline username · not authenticated" : "Offline profile · not authenticated";
  if (username.value !== state.username) username.value = state.username;
  if (accountUsername.value !== state.username) accountUsername.value = state.username;
}
function syncVersion() {
  $("#homeVersion").textContent = "Minecraft " + state.version;
  $("#homeProfile").textContent = state.profile;
  $("#versionSummary").textContent = state.version + " selected";
  $$(".option[data-version]").forEach(option => option.classList.toggle("selected", option.dataset.version === state.version));
}
function syncMods() {
  $$(".switch[data-mod]").forEach(toggle => { toggle.checked = Boolean(state.mods[toggle.dataset.mod]); });
  const enabled = Object.values(state.mods).filter(Boolean).length;
  $("#modsStatus").textContent = enabled + " planned mod" + (enabled === 1 ? "" : "s") + " enabled. Changes are saved on this device.";
}
function syncSettings() {
  $("#glowToggle").checked = state.glow;
  $("#compactToggle").checked = state.compact;
  app.classList.toggle("no-glow", !state.glow);
  app.classList.toggle("compact", state.compact);
}
function saveOfflineProfile() {
  const value = accountUsername.value.trim();
  if (value && !validUsername(value)) {
    $("#accountStatus").textContent = "Invalid name. Use 3–16 letters, numbers, or underscores.";
    accountUsername.focus();
    return false;
  }
  state.username = value;
  syncAccount();
  saveState();
  $("#accountStatus").textContent = value
    ? "Saved preview profile: " + value + ". This is not a Microsoft-authenticated account."
    : "Offline profile cleared. Offline-mode access depends on the server.";
  status.textContent = value ? "Offline profile saved: " + value + ". Game engine is not connected yet." : "Preview mode · Minecraft game engine is not connected.";
  return true;
}

loadState();
syncAccount();
syncVersion();
syncMods();
syncSettings();
showSection("home");

$("#settingsButton").addEventListener("click", () => showSection("settings"));
$$(".tab").forEach(tab => tab.addEventListener("click", () => showSection(tab.dataset.section)));
$("#sectionPicker").addEventListener("click", () => sectionDialog.showModal());
$$("[data-go]").forEach(button => button.addEventListener("click", () => {
  showSection(button.dataset.go);
  sectionDialog.close();
}));
$("#openVersions").addEventListener("click", () => showSection("versions"));

$$(".option[data-version]").forEach(option => option.addEventListener("click", () => {
  state.version = option.dataset.version;
  state.profile = option.dataset.profile;
  syncVersion();
  saveState();
}));

username.addEventListener("input", () => {
  const value = username.value.trim();
  accountLabel.textContent = value || "Offline profile";
  if (accountUsername.value !== username.value) accountUsername.value = username.value;
});
username.addEventListener("change", () => {
  const value = username.value.trim();
  if (value && !validUsername(value)) {
    status.textContent = "Use 3–16 letters, numbers, or underscores.";
    return;
  }
  state.username = value;
  syncAccount();
  saveState();
});
$("#playButton").addEventListener("click", () => {
  const value = username.value.trim();
  if (!value) {
    status.textContent = "Enter an offline username first.";
    username.focus();
    return;
  }
  if (!validUsername(value)) {
    status.textContent = "Use 3–16 letters, numbers, or underscores.";
    username.focus();
    return;
  }
  state.username = value;
  syncAccount();
  saveState();
  status.textContent = "Profile ready: " + value + " · " + state.version + ". The Minecraft engine is not connected, so the game cannot launch yet.";
});

$("#saveAccount").addEventListener("click", saveOfflineProfile);
$("#microsoftButton").addEventListener("click", () => {
  $("#accountStatus").textContent = "Microsoft sign-in isn't connected in this preview. Official authentication needs a secure native/backend integration; don't enter your Microsoft password here.";
});

$$(".switch[data-mod]").forEach(toggle => toggle.addEventListener("change", () => {
  state.mods[toggle.dataset.mod] = toggle.checked;
  syncMods();
  saveState();
}));
$("#glowToggle").addEventListener("change", event => {
  state.glow = event.target.checked;
  syncSettings();
  saveState();
});
$("#compactToggle").addEventListener("change", event => {
  state.compact = event.target.checked;
  syncSettings();
  saveState();
});
$("#resetButton").addEventListener("click", () => {
  try { localStorage.removeItem("kylo-client-preview"); } catch (_) {}
  state.version = "1.8.9";
  state.profile = "BedWars profile";
  state.username = "";
  state.mods = { "FPS Display": true, "CPS Counter": true, "Minimal HUD": false, "Sprint Toggle": false };
  state.glow = true;
  state.compact = false;
  syncAccount();
  syncVersion();
  syncMods();
  syncSettings();
  $("#accountStatus").textContent = "Preview preferences reset.";
  status.textContent = "Preview preferences reset. Game engine is not connected.";
  showSection("home");
});

// UI selections and preview preferences work. This page does not authenticate accounts,
// install Minecraft/mod files, or launch the game; those require the native launcher engine.

const username = document.querySelector("#username");
const status = document.querySelector("#status");
const accountLabel = document.querySelector("#accountLabel");
const playButton = document.querySelector("#playButton");
const dialog = document.querySelector("#settingsDialog");
document.querySelector("#settingsButton").addEventListener("click", () => dialog.showModal());
username.addEventListener("input", () => {
  const value = username.value.trim();
  accountLabel.textContent = value ? value : "Offline profile";
});
playButton.addEventListener("click", () => {
  const value = username.value.trim();
  if (!value) {
    status.textContent = "Enter an offline username first.";
    username.focus();
    return;
  }
  if (!/^[A-Za-z0-9_]{3,16}$/.test(value)) {
    status.textContent = "Use 3–16 letters, numbers, or underscores.";
    username.focus();
    return;
  }
  status.textContent = "Profile ready: " + value + ". Game engine is not connected yet.";
});
// This is a launcher UI prototype only. It does not authenticate accounts or launch Minecraft.

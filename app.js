const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const app = $(".app");
const accountSelect = $("#accountSelect");
const status = $("#status");
const accountLabel = $("#accountLabel");
const modDetailsDialog = $("#modDetailsDialog");

const modDefs = [
  {id:"fps",name:"FPS Display",icon:"FPS",category:"Performance",desc:"Track the frame rate you are getting in game.",tag:"PERFORMANCE",defaults:true,settings:[{id:"position",label:"HUD position",type:"select",options:["Top left","Top right","Bottom left","Bottom right"],value:"Top left"},{id:"scale",label:"Text size",type:"range",min:10,max:24,value:14,unit:" px"},{id:"background",label:"Dark background",type:"checkbox",value:true}]},
  {id:"cps",name:"CPS Counter",icon:"CPS",category:"PvP",desc:"Plan a left/right clicks-per-second overlay.",tag:"PVP",defaults:true,settings:[{id:"mouse",label:"Mouse buttons",type:"select",options:["Left + Right","Left only","Right only"],value:"Left + Right"},{id:"position",label:"HUD position",type:"select",options:["Top left","Top right","Bottom left","Bottom right"],value:"Top right"}]},
  {id:"keystrokes",name:"Keystrokes",icon:"WASD",category:"PvP",desc:"A configurable W A S D and mouse key display.",tag:"PVP",defaults:true,settings:[{id:"showMouse",label:"Show mouse buttons",type:"checkbox",value:true},{id:"showSpace",label:"Show spacebar",type:"checkbox",value:true},{id:"scale",label:"Widget scale",type:"range",min:70,max:140,value:100,unit:"%"}]},
  {id:"ping",name:"Ping Display",icon:"PING",category:"HUD",desc:"Show network latency in your planned HUD.",tag:"HUD",defaults:true,settings:[{id:"position",label:"HUD position",type:"select",options:["Top left","Top right","Bottom left","Bottom right"],value:"Top right"},{id:"color",label:"Colorize high ping",type:"checkbox",value:true}]},
  {id:"armor",name:"Armor Status",icon:"ARM",category:"HUD",desc:"A compact armor durability display concept.",tag:"HUD",defaults:true,settings:[{id:"style",label:"Display style",type:"select",options:["Icons","Bars","Numbers"],value:"Icons"},{id:"durability",label:"Show durability percent",type:"checkbox",value:true}]},
  {id:"potions",name:"Potion Effects",icon:"POT",category:"HUD",desc:"Customize the planned potion-effect list.",tag:"HUD",defaults:true,settings:[{id:"icons",label:"Show effect icons",type:"checkbox",value:true},{id:"timers",label:"Show effect timers",type:"checkbox",value:true}]},
  {id:"scoreboard",name:"Scoreboard Tweaks",icon:"SB",category:"HUD",desc:"Choose compact scoreboard layout preferences.",tag:"HUD",defaults:false,settings:[{id:"scale",label:"Scoreboard scale",type:"range",min:70,max:120,value:90,unit:"%"},{id:"shadow",label:"Text shadow",type:"checkbox",value:true}]},
  {id:"crosshair",name:"Crosshair Editor",icon:"＋",category:"Visuals",desc:"Configure a custom crosshair preset for the future client.",tag:"VISUALS",defaults:true,settings:[{id:"style",label:"Crosshair style",type:"select",options:["Classic","Dot","Cross","Circle"],value:"Classic"},{id:"size",label:"Size",type:"range",min:2,max:15,value:6,unit:" px"},{id:"dynamic",label:"Dynamic crosshair",type:"checkbox",value:false}]},
  {id:"hitcolor",name:"Hit Color",icon:"HIT",category:"Visuals",desc:"Set a planned hit feedback color.",tag:"VISUALS",defaults:false,settings:[{id:"color",label:"Hit color",type:"select",options:["Kylo Red","White","Cyan","Gold"],value:"Kylo Red"},{id:"fade",label:"Fade duration",type:"range",min:100,max:1000,value:300,unit:" ms"}]},
  {id:"motionblur",name:"Motion Blur",icon:"BLUR",category:"Visuals",desc:"Save a motion-blur preference for a future renderer.",tag:"VISUALS",defaults:false,settings:[{id:"strength",label:"Effect strength",type:"range",min:0,max:10,value:3,unit:""},{id:"onlySprint",label:"Only while sprinting",type:"checkbox",value:false}]},
  {id:"zoom",name:"Zoom",icon:"ZOOM",category:"Quality of Life",desc:"Configure a planned hold-to-zoom feature.",tag:"UTILITY",defaults:true,settings:[{id:"level",label:"Zoom level",type:"range",min:2,max:10,value:4,unit:"x"},{id:"smooth",label:"Smooth zoom",type:"checkbox",value:true}]},
  {id:"sprint",name:"Toggle Sprint",icon:"SPR",category:"PvP",desc:"Remember sprint-toggle behavior for the game client.",tag:"PVP",defaults:true,settings:[{id:"hold",label:"Sneak behavior",type:"select",options:["Normal","Toggle sneak","Hold sneak"],value:"Normal"},{id:"auto",label:"Auto sprint",type:"checkbox",value:false}]},
  {id:"reach",name:"Reach Display",icon:"RCH",category:"PvP",desc:"A training overlay concept for viewing distance.",tag:"PVP",defaults:false,settings:[{id:"units",label:"Distance units",type:"select",options:["Blocks","Decimal blocks"],value:"Blocks"},{id:"showTarget",label:"Only show with target",type:"checkbox",value:true}]},
  {id:"combo",name:"Combo Counter",icon:"COM",category:"PvP",desc:"Track consecutive hits in a planned overlay.",tag:"PVP",defaults:true,settings:[{id:"reset",label:"Reset after",type:"range",min:1,max:10,value:3,unit:" s"},{id:"sound",label:"Sound on combo",type:"checkbox",value:false}]},
  {id:"blockoverlay",name:"Block Overlay",icon:"BLK",category:"Visuals",desc:"Choose outline preferences for targeted blocks.",tag:"VISUALS",defaults:false,settings:[{id:"style",label:"Outline style",type:"select",options:["Thin","Bold","Filled"],value:"Thin"},{id:"depth",label:"Depth effect",type:"checkbox",value:false}]},
  {id:"motioncamera",name:"Smooth Camera",icon:"CAM",category:"Visuals",desc:"Store camera smoothing preferences.",tag:"VISUALS",defaults:false,settings:[{id:"smoothness",label:"Smoothness",type:"range",min:1,max:10,value:5,unit:""},{id:"viewBobbing",label:"View bobbing",type:"checkbox",value:true}]},
  {id:"saturation",name:"Color Boost",icon:"COL",category:"Visuals",desc:"Configure a vivid-color display preference.",tag:"VISUALS",defaults:false,settings:[{id:"level",label:"Saturation",type:"range",min:0,max:200,value:120,unit:"%"},{id:"vignette",label:"Vignette",type:"checkbox",value:false}]},
  {id:"clearwater",name:"Clear Water",icon:"H2O",category:"Visuals",desc:"Plan a clearer water visual setting.",tag:"VISUALS",defaults:false,settings:[{id:"opacity",label:"Water opacity",type:"range",min:0,max:100,value:35,unit:"%" }]},
  {id:"particles",name:"Particle Control",icon:"FX",category:"Performance",desc:"Choose a reduced particle setting for visibility.",tag:"PERFORMANCE",defaults:true,settings:[{id:"amount",label:"Particle amount",type:"select",options:["All","Decreased","Minimal"],value:"Decreased"}]},
  {id:"animations",name:"Animations",icon:"ANI",category:"Performance",desc:"Save preferences for first-person item animations.",tag:"PERFORMANCE",defaults:false,settings:[{id:"mode",label:"Animation preset",type:"select",options:["Vanilla","Smooth","Minimal"],value:"Vanilla"},{id:"swing",label:"Swing speed",type:"range",min:50,max:150,value:100,unit:"%"}]},
  {id:"entityculling",name:"Entity Optimizer",icon:"ENT",category:"Performance",desc:"A planned setting for reducing unnecessary entity rendering.",tag:"PERFORMANCE",defaults:true,settings:[{id:"aggressive",label:"Optimization level",type:"select",options:["Safe","Balanced","Aggressive"],value:"Balanced"}]},
  {id:"chunk",name:"Chunk Updates",icon:"CHK",category:"Performance",desc:"Save a render/update preference for future optimization.",tag:"PERFORMANCE",defaults:false,settings:[{id:"threads",label:"Update mode",type:"select",options:["Balanced","Fast","Conservative"],value:"Balanced"}]},
  {id:"screenshot",name:"Screenshot Tool",icon:"SHOT",category:"Quality of Life",desc:"Plan screenshot behavior and filename preferences.",tag:"UTILITY",defaults:false,settings:[{id:"format",label:"Image format",type:"select",options:["PNG","JPG"],value:"PNG"},{id:"hideHud",label:"Hide HUD in screenshot",type:"checkbox",value:false}]},
  {id:"coordinates",name:"Coordinates HUD",icon:"XYZ",category:"HUD",desc:"Choose how coordinates would appear in the HUD.",tag:"HUD",defaults:false,settings:[{id:"format",label:"Coordinate format",type:"select",options:["XYZ","Compact","XYZ + Facing"],value:"XYZ"},{id:"position",label:"Position",type:"select",options:["Top left","Top right","Bottom left","Bottom right"],value:"Bottom left"}]},
  {id:"direction",name:"Direction HUD",icon:"DIR",category:"HUD",desc:"Plan a compass/direction indicator.",tag:"HUD",defaults:false,settings:[{id:"style",label:"Compass style",type:"select",options:["Text","Compass bar","Compact"],value:"Text"}]},
  {id:"chat",name:"Chat Customizer",icon:"CHAT",category:"Quality of Life",desc:"Save chat appearance and readability preferences.",tag:"UTILITY",defaults:false,settings:[{id:"scale",label:"Chat scale",type:"range",min:70,max:130,value:100,unit:"%"},{id:"timestamps",label:"Show timestamps",type:"checkbox",value:false}]},
  {id:"autogg",name:"Auto GG Reminder",icon:"GG",category:"Quality of Life",desc:"A post-match reminder preference; no messages are sent automatically.",tag:"UTILITY",defaults:false,settings:[{id:"reminder",label:"Reminder",type:"select",options:["After match","After win","Off"],value:"After match"}]},
  {id:"keybinds",name:"Keybind Profiles",icon:"KEY",category:"Quality of Life",desc:"Choose a saved keybind layout preset.",tag:"UTILITY",defaults:false,settings:[{id:"profile",label:"Keybind preset",type:"select",options:["Default","Compact PvP","Left-handed"],value:"Default"}]},
  {id:"interface",name:"Interface Scale",icon:"UI",category:"HUD",desc:"Set the preferred overall interface scale.",tag:"HUD",defaults:false,settings:[{id:"scale",label:"UI scale",type:"range",min:70,max:130,value:100,unit:"%"}]},
  {id:"minimalhud",name:"Minimal HUD",icon:"MIN",category:"HUD",desc:"Keep only essential elements visible in the planned HUD.",tag:"HUD",defaults:false,settings:[{id:"hideScoreboard",label:"Hide scoreboard",type:"checkbox",value:false},{id:"hidePotionIcons",label:"Hide potion icons",type:"checkbox",value:false}]}
];

const state = {
  section:"home", version:"1.8.9", profile:"BedWars profile", username:"",
  mods:{}, modSettings:{}, glow:true, compact:false, modCategory:"All", modSearch:"", preset:"BedWars"
};
modDefs.forEach(mod => { state.mods[mod.id] = mod.defaults; state.modSettings[mod.id] = Object.fromEntries(mod.settings.map(setting => [setting.id,setting.value])); });

function saveState() { try { localStorage.setItem("kylo-client-preview", JSON.stringify(state)); } catch (_) {} }
function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem("kylo-client-preview") || "null");
    if (!saved) return;
    if (typeof saved.version === "string") state.version = saved.version;
    if (typeof saved.profile === "string") state.profile = saved.profile;
    if (typeof saved.username === "string") state.username = saved.username;
    if (saved.mods && typeof saved.mods === "object") {
      // Migrate the older prototype's display-name keys to the new mod IDs.
      const legacy = {"FPS Display":"fps","CPS Counter":"cps","Minimal HUD":"minimalhud","Sprint Toggle":"sprint"};
      Object.entries(saved.mods).forEach(([key,value]) => { const id = legacy[key] || key; if (id in state.mods && typeof value === "boolean") state.mods[id] = value; });
    }
    if (saved.modSettings && typeof saved.modSettings === "object") {
      Object.entries(saved.modSettings).forEach(([id,values]) => { if (state.modSettings[id] && values && typeof values === "object") state.modSettings[id] = {...state.modSettings[id],...values}; });
    }
    if (typeof saved.glow === "boolean") state.glow = saved.glow;
    if (typeof saved.compact === "boolean") state.compact = saved.compact;
    if (typeof saved.preset === "string") state.preset = saved.preset;
  } catch (_) {}
}
function validUsername(value) { return /^[A-Za-z0-9_]{3,16}$/.test(value); }
function showSection(name) {
  if (!$('[data-page="' + name + '"]')) return;
  state.section = name;
  $$(".page").forEach(page => page.classList.toggle("active",page.dataset.page === name));
  $$(".tab").forEach(tab => tab.classList.toggle("active",tab.dataset.section === name));
  saveState();
  window.scrollTo({top:0,behavior:"smooth"});
}
let nativeAccounts = [];
function syncAccount() {
  const selected = nativeAccounts.find(account => account.selected);
  const name = selected ? selected.name : "No account selected";
  $("#accountLabel").textContent = name;
  $("#accountName").textContent = name;
  $("#accountType").textContent = selected ? "Saved in Fold Craft Launcher" : "Select an account to play";
  $("#homeAccountStatus").textContent = name;
}
function refreshKyloAccounts() {
  if (!window.KyloAndroid || typeof window.KyloAndroid.getAccounts !== "function") {
    syncAccount();
    return;
  }
  try {
    nativeAccounts = JSON.parse(window.KyloAndroid.getAccounts() || "[]");
    accountSelect.innerHTML = "";
    if (!nativeAccounts.length) {
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "No account saved — add one first";
      accountSelect.appendChild(option);
    } else {
      nativeAccounts.forEach(account => {
        const option = document.createElement("option");
        option.value = String(account.index);
        option.textContent = account.name + (account.selected ? " · SELECTED" : "");
        option.selected = Boolean(account.selected);
        accountSelect.appendChild(option);
      });
    }
    syncAccount();
    $("#accountStatus").textContent = nativeAccounts.length
      ? "Choose an account. Kylo saves your selection directly in Fold Craft Launcher."
      : "No saved account found. Tap ADD / MANAGE ACCOUNTS to add one in Fold Craft Launcher.";
  } catch (_) {
    $("#accountStatus").textContent = "Couldn't read saved accounts. Try reopening Kylo.";
  }
}
window.refreshKyloAccounts = refreshKyloAccounts;
window.kyloAccountRequired = function() {
  status.textContent = "Please select an account first.";
  showSection("accounts");
  $("#accountStatus").textContent = "Please select an account first, then choose or add an account below.";
};
function syncVersion() {
  $("#homeVersion").textContent = "Minecraft " + state.version;
  $("#homeProfile").textContent = state.profile;
  $("#versionSummary").textContent = state.version + " selected";
  $$(".option[data-version]").forEach(option => option.classList.toggle("selected",option.dataset.version === state.version));
}
function syncSettings() {
  $("#glowToggle").checked = state.glow;
  $("#compactToggle").checked = state.compact;
  app.classList.toggle("no-glow",!state.glow);
  app.classList.toggle("compact",state.compact);
}
function renderMods() {
  const grid = $("#modsGrid");
  const query = state.modSearch.trim().toLowerCase();
  const filtered = modDefs.filter(mod => (state.modCategory === "All" || mod.category === state.modCategory) && (!query || (mod.name+" "+mod.desc+" "+mod.category+" "+mod.tag).toLowerCase().includes(query)));
  grid.innerHTML = "";
  $("#modResults").textContent = filtered.length + (filtered.length === 1 ? " FEATURE" : " FEATURES");
  const enabled = modDefs.filter(mod => state.mods[mod.id]).length;
  $("#modsCount").textContent = enabled + " / " + modDefs.length + " ENABLED";
  $("#modsStatus").textContent = enabled + " of " + modDefs.length + " preview features enabled. Your configuration is saved on this device; in-game integration is not connected.";
  if (!filtered.length) {
    grid.innerHTML = '<div class="mod-empty">No mods match your search.<br>Try another name or select “All mods”.</div>';
    return;
  }
  filtered.forEach(mod => {
    const card = document.createElement("article");
    card.className = "mod-card" + (state.mods[mod.id] ? " enabled" : "");
    const icon = document.createElement("span"); icon.className = "mod-card-icon"; icon.textContent = mod.icon;
    const copy = document.createElement("div"); copy.className = "mod-card-copy";
    const title = document.createElement("strong"); title.textContent = mod.name;
    const desc = document.createElement("p"); desc.textContent = mod.desc;
    const meta = document.createElement("div"); meta.className = "mod-meta";
    const tag = document.createElement("span"); tag.className = "mod-tag"; tag.textContent = mod.category.toUpperCase();
    const config = document.createElement("button"); config.type = "button"; config.className = "mod-config"; config.textContent = "⚙"; config.title = "Configure " + mod.name; config.setAttribute("aria-label","Configure " + mod.name);
    meta.appendChild(tag); copy.append(title,desc,meta);
    const toggle = document.createElement("input"); toggle.type = "checkbox"; toggle.className = "switch"; toggle.checked = Boolean(state.mods[mod.id]); toggle.setAttribute("aria-label","Enable " + mod.name);
    toggle.addEventListener("change",() => { state.mods[mod.id] = toggle.checked; state.preset = ""; syncPresetButtons(); saveState(); renderMods(); });
    config.addEventListener("click",() => openModDetails(mod.id));
    card.append(icon,copy,toggle,config); grid.appendChild(card);
  });
  syncPresetButtons();
}
function syncPresetButtons() {
  $$(".preset-button").forEach(button => button.classList.toggle("active",button.dataset.preset === state.preset));
}
function setCategory(category) {
  state.modCategory = category;
  $$(".category-chip").forEach(button => button.classList.toggle("active",button.dataset.category === category));
  renderMods();
}
function applyPreset(name) {
  const selected = {
    BedWars:["fps","cps","keystrokes","ping","armor","potions","crosshair","zoom","sprint","combo","particles","entityculling"],
    Performance:["fps","ping","particles","entityculling","chunk","animations"],
    Minimal:["fps","ping","crosshair","minimalhud","interface"]
  }[name];
  if (!selected) return;
  modDefs.forEach(mod => { state.mods[mod.id] = selected.includes(mod.id); });
  state.preset = name;
  saveState(); renderMods();
}
function openModDetails(id) {
  const mod = modDefs.find(item => item.id === id);
  if (!mod) return;
  $("#detailTitle").textContent = mod.name;
  $("#detailDescription").textContent = mod.desc + " These settings are saved as a preview configuration.";
  const controls = $("#detailControls"); controls.innerHTML = "";
  mod.settings.forEach(setting => {
    const row = document.createElement("label"); row.className = "detail-setting";
    const label = document.createElement("span"); label.textContent = setting.label;
    const current = state.modSettings[id][setting.id] ?? setting.value;
    let input;
    if (setting.type === "select") {
      input = document.createElement("select");
      setting.options.forEach(option => { const el = document.createElement("option"); el.value = option; el.textContent = option; input.appendChild(el); });
      input.value = current;
    } else if (setting.type === "checkbox") {
      input = document.createElement("input"); input.type = "checkbox"; input.checked = Boolean(current);
    } else {
      input = document.createElement("input"); input.type = "range"; input.min = setting.min; input.max = setting.max; input.value = current;
      const output = document.createElement("output"); output.textContent = current + (setting.unit || "");
      input.addEventListener("input",() => output.textContent = input.value + (setting.unit || ""));
      row.append(label,input,output); input.dataset.setting = setting.id; controls.appendChild(row); return;
    }
    input.dataset.setting = setting.id;
    row.append(label,input); controls.appendChild(row);
  });
  $("#saveModDetails").onclick = () => {
    $$("#detailControls [data-setting]").forEach(input => {
      const setting = mod.settings.find(item => item.id === input.dataset.setting);
      state.modSettings[id][input.dataset.setting] = setting.type === "checkbox" ? input.checked : setting.type === "range" ? Number(input.value) : input.value;
    });
    saveState();
    modDetailsDialog.close();
    $("#modsStatus").textContent = mod.name + " settings saved locally. They will take effect in-game only after engine integration.";
  };
  modDetailsDialog.showModal();
}

loadState(); syncAccount(); syncVersion(); syncSettings(); renderMods(); showSection("home"); refreshKyloAccounts();
$("#settingsButton").addEventListener("click",() => showSection("settings"));
$$(".tab").forEach(tab => tab.addEventListener("click",() => showSection(tab.dataset.section)));
$("#openVersions").addEventListener("click",() => showSection("versions"));
$$(".option[data-version]").forEach(option => option.addEventListener("click",() => { state.version=option.dataset.version; state.profile=option.dataset.profile; syncVersion(); saveState(); }));
username.addEventListener("input",() => { const value=username.value.trim(); accountLabel.textContent=value||"Offline profile"; if(accountUsername.value!==username.value) accountUsername.value=username.value; });
username.addEventListener("change",() => {
  const value=username.value.trim();
  if(value&&!validUsername(value)){status.textContent="Use 3–16 letters, numbers, or underscores.";return;}
  state.username=value;syncAccount();saveState();
});
$("#playButton").addEventListener("click",() => {
  if (window.KyloAndroid && typeof window.KyloAndroid.launchMinecraft === "function") {
    if (!nativeAccounts.some(account => account.selected)) {
      status.textContent = "Please select an account first.";
      showSection("accounts");
      $("#accountStatus").textContent = "Please select an account first.";
      return;
    }
    status.textContent = "Launching Minecraft " + state.version + "…";
    window.KyloAndroid.launchMinecraft(state.version || "1.8.9");
    return;
  }
  status.textContent = "Open the Kylo Android app to launch Minecraft.";
});
$("#selectAccountButton").addEventListener("click", () => {
  const index = Number(accountSelect.value);
  if (!Number.isInteger(index) || !nativeAccounts.some(account => account.index === index)) {
    $("#accountStatus").textContent = "Please select an account first.";
    return;
  }
  if (window.KyloAndroid && window.KyloAndroid.selectAccount(index)) {
    nativeAccounts = nativeAccounts.map(account => ({...account, selected: account.index === index}));
    syncAccount();
    refreshKyloAccounts();
    $("#accountStatus").textContent = "Account selected and saved in Fold Craft Launcher.";
  } else {
    $("#accountStatus").textContent = "Could not select that account. Reopen Kylo and try again.";
  }
});
$("#manageAccountsButton").addEventListener("click", () => {
  if (window.KyloAndroid && window.KyloAndroid.openAccountManager) window.KyloAndroid.openAccountManager();
  else $("#accountStatus").textContent = "Account management is available in the Android app.";
});
$("#homeAccountsButton").addEventListener("click", () => showSection("accounts"));
$("#modSearch").addEventListener("input",event => {state.modSearch=event.target.value;renderMods();});
$$(".category-chip").forEach(button => button.addEventListener("click",() => setCategory(button.dataset.category)));
$$(".preset-button").forEach(button => button.addEventListener("click",() => applyPreset(button.dataset.preset)));
$("#glowToggle").addEventListener("change",event=>{state.glow=event.target.checked;syncSettings();saveState();});
$("#compactToggle").addEventListener("change",event=>{state.compact=event.target.checked;syncSettings();saveState();});
$("#resetButton").addEventListener("click",() => {
  try{localStorage.removeItem("kylo-client-preview");}catch(_){}
  state.version="1.8.9";state.profile="BedWars profile";state.username="";state.glow=true;state.compact=false;state.preset="BedWars";
  modDefs.forEach(mod=>{state.mods[mod.id]=mod.defaults;state.modSettings[mod.id]=Object.fromEntries(mod.settings.map(setting=>[setting.id,setting.value]));});
  syncAccount();syncVersion();syncSettings();renderMods();
  $("#accountStatus").textContent="Preview preferences reset.";status.textContent="Preview preferences reset. Game engine is not connected.";showSection("home");
});

// This is a UI/configuration prototype. It does not install Java mods, authenticate Microsoft,
// or launch Minecraft. Those require a native launcher, trusted mod implementations and runtime.

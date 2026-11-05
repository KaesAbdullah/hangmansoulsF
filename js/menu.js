(function () {
  var S = HS.load();
  var menuParams = new URLSearchParams(location.search);
  var requestedLanguage = menuParams.get("lang");
  if (requestedLanguage === "en" || requestedLanguage === "es") {
    HS.setLanguage(requestedLanguage);
    S = HS.load();
  }

  var $ = function (id) {
    return document.getElementById(id);
  };
  function tr(key) {
    var language = S.language === "es" ? "es" : "en";
    return HS_I18N[language][key] || HS_I18N.en[key] || key;
  }
  function applyLanguage() {
    var spanish = S.language === "es";
    document.documentElement.lang = spanish ? "es" : "en";
    document.querySelector(".title").textContent = tr("mainTitle");
    $("info").textContent = tr("menuInfo");
    $("opts").textContent = tr("menuOptions");
    $("exit").textContent = tr("menuExit");
    $("languageLabel").textContent = tr("languageLabel");
    $("languageSelect").setAttribute("aria-label", tr("language"));
    $("infoT").textContent = tr("infoTitle");
    $("infoVersion").textContent = tr("version");
    $("infoCreator").textContent = tr("informationCreator");
    $("infoCredits").textContent = tr("credits");
    $("infoClose").textContent = tr("menuOkay");
    $("optsT").textContent = tr("optionsTitle");
    $("bgmLabel").firstChild.textContent = tr("musicVolume");
    $("sfxLabel").firstChild.textContent = tr("sfxVolume");
    $("optsClose").textContent = tr("close");
    $("debugTitle").textContent = tr("debugTitle");
    $("debugPrompt").textContent = tr("debugPrompt");
    $("debugSubmit").textContent = tr(
      S.debugEnabled ? "debugDeactivate" : "debugSubmit",
    );
    $("debugClose").textContent = tr("debugClose");
    $("bgmVol").setAttribute("aria-label", tr("musicVolume"));
    $("sfxVol").setAttribute("aria-label", tr("sfxVolume"));
    $("languageSelect").value = spanish ? "es" : "en";
  }
  function refreshMenu() {
    S = HS.load();
    var debugParam = new URLSearchParams(location.search).get("debug");
    if (debugParam === "1" || debugParam === "0") {
      S.debugEnabled = debugParam === "1";
      HS.save();
    }
    var hasSave = false;
    try {
      hasSave = localStorage.getItem("hangmanSouls.v2") !== null;
    } catch (e) {}
    applyLanguage();
    $("new").textContent = hasSave ? tr("menuContinue") : tr("menuNew");
  }
  function after(fn) {
    HS.sfx("menuSelect");
    setTimeout(fn, 600);
  }
  function selectedLanguage() {
    return S.language === "es" ? "es" : "en";
  }
  function open(id) {
    $(id).classList.add("open");
    $(id).querySelector("[data-close]").focus();
  }

  refreshMenu();
  HS.music("menuTheme");
  document.querySelectorAll(".item").forEach(function (button) {
    button.addEventListener("pointerenter", function () {
      HS.sfx("menuHover");
    });
  });
  $("new").onclick = function () {
    refreshMenu();
    var hasSave = false;
    try {
      hasSave = localStorage.getItem("hangmanSouls.v2") !== null;
    } catch (e) {}
    if (!hasSave) {
      var language = S.language;
      HS.resetRun();
      HS.setLanguage(language);
    }
    after(function () {
      location.href =
        "game.html?lang=" +
        encodeURIComponent(selectedLanguage()) +
        "&debug=" +
        (S.debugEnabled ? "1" : "0");
    });
  };
  window.addEventListener("focus", refreshMenu);
  $("info").onclick = function () {
    HS.sfx("menuSelect");
    open("infoBox");
  };
  $("opts").onclick = function () {
    HS.sfx("menuSelect");
    open("optsBox");
  };
  function closeDebugDialog() {
    $("debugBox").classList.remove("open");
    $("debugPassword").value = "";
    $("debugError").hidden = true;
  }
  function activateDebug() {
    if ($("debugPassword").value === "debugsouls") {
      S.debugEnabled = !S.debugEnabled;
      HS.save();
      const currentUrl = new URL(location.href);
      currentUrl.searchParams.set("debug", S.debugEnabled ? "1" : "0");
      history.replaceState(null, "", currentUrl);
      applyLanguage();
      $("debugError").hidden = true;
      $("debugError").textContent = tr(
        S.debugEnabled ? "debugEnabled" : "debugDisabled",
      );
      $("debugError").hidden = false;
      setTimeout(closeDebugDialog, 900);
    } else {
      $("debugError").textContent = tr("debugWrongPassword");
      $("debugError").hidden = false;
      $("debugPassword").select();
    }
  }
  $("debugTrigger").onclick = function () {
    HS.sfx("menuSelect");
    $("debugBox").classList.add("open");
    $("debugPassword").focus();
  };
  $("debugSubmit").onclick = activateDebug;
  $("debugClose").onclick = closeDebugDialog;
  $("debugPassword").addEventListener("keydown", function (event) {
    if (event.key === "Enter") activateDebug();
  });
  $("exit").onclick = function () {
    after(function () {
      location.href =
        "index.html?lang=" + encodeURIComponent(selectedLanguage());
    });
  };
  document.querySelectorAll("[data-close]").forEach(function (button) {
    button.onclick = function () {
      HS.sfx("menuSelect");
      button.closest(".overlay").classList.remove("open");
    };
  });
  $("languageSelect").onchange = function () {
    HS.setLanguage($("languageSelect").value);
    refreshMenu();
  };
  $("bgmVol").value = S.bgmVolume;
  $("bgmVol").oninput = function () {
    HS.setAudio({ bgmVolume: parseFloat($("bgmVol").value) });
  };
  $("sfxVol").value = S.sfxVolume;
  $("sfxVol").oninput = function () {
    HS.setAudio({ sfxVolume: parseFloat($("sfxVol").value) });
  };
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      document.querySelectorAll(".overlay.open").forEach(function (overlay) {
        overlay.classList.remove("open");
      });
    }
  });
})();

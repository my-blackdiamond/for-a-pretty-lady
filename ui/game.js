(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // src/Utilities/cryptogram.cjs
  var require_cryptogram = __commonJS({
    "src/Utilities/cryptogram.cjs"(exports, module) {
      var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      var NUMBERS = [17, 4, 22, 9, 3, 25, 11, 6, 20, 1, 14, 8, 26, 5, 16, 12, 2, 23, 10, 7, 24, 15, 19, 13, 21, 18];
      var ANSWER2 = "A LUZ DA TOCHA REVELA A PASSAGEM";
      var CIPHER = Object.fromEntries([...ALPHABET].map((letter2, i) => [letter2, NUMBERS[i]]));
      var WORDS2 = ANSWER2.split(" ").map((word) => [...word].map((letter2) => CIPHER[letter2]));
      var CODES2 = [...new Set(WORDS2.flat())].sort((a, b) => a - b);
      var GIVEN2 = { [CIPHER.A]: "A", [CIPHER.E]: "E" };
      function freshGate2() {
        return { entries: { ...GIVEN2 }, hints: 0, attempts: 0, tutorialSeen: false, decoded: false, solved: false };
      }
      function normalizeLetter2(value) {
        return String(value).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase().replace(/[^A-Z]/g, "").slice(-1);
      }
      function evaluateGate2(entries) {
        const letters = { ...entries, ...GIVEN2 }, used = /* @__PURE__ */ new Set();
        for (const code of CODES2) {
          const letter2 = normalizeLetter2(letters[code] || "");
          if (!letter2) return "incomplete";
          if (used.has(letter2)) return "conflict";
          used.add(letter2);
        }
        return WORDS2.map((word) => word.map((code) => normalizeLetter2(letters[code])).join("")).join(" ") === ANSWER2 ? "solved" : "incorrect";
      }
      var HINTS2 = ["Comece pelas palavras de uma letra: o n\xFAmero 17 j\xE1 representa A. Uma letra descoberta vale para todas as casas com o mesmo n\xFAmero.", "Na segunda palavra, o n\xFAmero 8 representa L. Na palavra de cinco letras depois de DA, o n\xFAmero 7 representa T. Pense no que o grupo carrega para iluminar uma tumba.", "A segunda palavra \xE9 LUZ; a palavra depois de DA \xE9 TOCHA. O que a luz pode revelar em uma entrada escondida?"];
      module.exports = { ANSWER: ANSWER2, WORDS: WORDS2, CODES: CODES2, GIVEN: GIVEN2, CIPHER, HINTS: HINTS2, freshGate: freshGate2, normalizeLetter: normalizeLetter2, evaluateGate: evaluateGate2 };
    }
  });

  // src/Utilities/rules.cjs
  var require_rules = __commonJS({
    "src/Utilities/rules.cjs"(exports, module) {
      var { freshGate: freshGate2 } = require_cryptogram();
      function randomDie2(sides2, fill = (a) => globalThis.crypto.getRandomValues(a)) {
        if (!Number.isInteger(sides2) || sides2 < 2) throw Error("Invalid die");
        const a = new Uint32Array(1), limit = 4294967296 - 4294967296 % sides2;
        do {
          fill(a);
        } while (a[0] >= limit);
        return a[0] % sides2 + 1;
      }
      function resolve2(n, modifier, dc) {
        return { n, modifier, dc, total: n + modifier, critical: n === 20 ? "success" : n === 1 ? "failure" : null, success: n === 20 || n !== 1 && n + modifier >= dc };
      }
      var ACTIONS2 = [{ id: "dagger", name: "Ataque furtivo", who: "Astarion", skill: "Destreza", modifier: 5, dc: 12, damage: 4, description: "Astarion distrai o inimigo enquanto voc\xEA procura uma abertura. Destreza +5, CD 12. Causa 4 de dano; 8 em um cr\xEDtico." }, { id: "magic", name: "Raio arcano", who: "Gale", skill: "Arcanismo", modifier: 4, dc: 13, damage: 5, description: "Canalize a magia com Gale. Arcanismo +4, CD 13. Causa 5 de dano; 10 em um cr\xEDtico." }, { id: "shield", name: "Investida", who: "Karlach", skill: "For\xE7a", modifier: 5, dc: 14, damage: 6, description: "Avance com Karlach. For\xE7a +5, CD 14. Causa 6 de dano; 12 em um cr\xEDtico." }];
      function hit2(combat, result, action) {
        const next = { ...combat };
        next.round++;
        if (result.success) {
          next.hp = Math.max(0, next.hp - action.damage * (result.n === 20 ? 2 : 1));
          next.misses = 0;
        } else {
          next.misses++;
          next.vigor = Math.max(0, next.vigor - 2);
        }
        return next;
      }
      function assist2(combat) {
        return { ...combat, hp: Math.max(0, combat.hp - 3), misses: 0, vigor: Math.max(combat.vigor, 6), round: combat.round + 1 };
      }
      function chestDie2(index, fill) {
        if (index < 0 || index > 2) throw Error("Chest already open");
        return index === 2 ? 200 : randomDie2(199, fill);
      }
      function fresh2() {
        return { version: 2, gate: freshGate2(), name: "", scene: "camp", line: 0, phase: "entry", history: [], decisions: {}, combat: null, selected: null, result: null, chest: [], finalPlayed: false, settings: { volume: 0.45, muted: false, large: false, reduced: false }, savedAt: null };
      }
      function validate2(s) {
        return s?.version === 2 && typeof s.name === "string" && ["entry", "dialogue", "combat", "roll", "chest", "letter", "reveal", "gate-tutorial", "cryptogram"].includes(s.phase) && Array.isArray(s.history) && Array.isArray(s.chest) && s.chest.length <= 3;
      }
      module.exports = { randomDie: randomDie2, resolve: resolve2, ACTIONS: ACTIONS2, hit: hit2, assist: assist2, chestDie: chestDie2, fresh: fresh2, validate: validate2 };
    }
  });

  // ../../node_modules/howler/dist/howler.js
  var require_howler = __commonJS({
    "../../node_modules/howler/dist/howler.js"(exports) {
      (function() {
        "use strict";
        var HowlerGlobal2 = function() {
          this.init();
        };
        HowlerGlobal2.prototype = {
          /**
           * Initialize the global Howler object.
           * @return {Howler}
           */
          init: function() {
            var self = this || Howler3;
            self._counter = 1e3;
            self._html5AudioPool = [];
            self.html5PoolSize = 10;
            self._codecs = {};
            self._howls = [];
            self._muted = false;
            self._volume = 1;
            self._canPlayEvent = "canplaythrough";
            self._navigator = typeof window !== "undefined" && window.navigator ? window.navigator : null;
            self.masterGain = null;
            self.noAudio = false;
            self.usingWebAudio = true;
            self.autoSuspend = true;
            self.ctx = null;
            self.autoUnlock = true;
            self._setup();
            return self;
          },
          /**
           * Get/set the global volume for all sounds.
           * @param  {Float} vol Volume from 0.0 to 1.0.
           * @return {Howler/Float}     Returns self or current volume.
           */
          volume: function(vol) {
            var self = this || Howler3;
            vol = parseFloat(vol);
            if (!self.ctx) {
              setupAudioContext();
            }
            if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
              self._volume = vol;
              if (self._muted) {
                return self;
              }
              if (self.usingWebAudio) {
                self.masterGain.gain.setValueAtTime(vol, Howler3.ctx.currentTime);
              }
              for (var i = 0; i < self._howls.length; i++) {
                if (!self._howls[i]._webAudio) {
                  var ids = self._howls[i]._getSoundIds();
                  for (var j = 0; j < ids.length; j++) {
                    var sound2 = self._howls[i]._soundById(ids[j]);
                    if (sound2 && sound2._node) {
                      sound2._node.volume = sound2._volume * vol;
                    }
                  }
                }
              }
              return self;
            }
            return self._volume;
          },
          /**
           * Handle muting and unmuting globally.
           * @param  {Boolean} muted Is muted or not.
           */
          mute: function(muted) {
            var self = this || Howler3;
            if (!self.ctx) {
              setupAudioContext();
            }
            self._muted = muted;
            if (self.usingWebAudio) {
              self.masterGain.gain.setValueAtTime(muted ? 0 : self._volume, Howler3.ctx.currentTime);
            }
            for (var i = 0; i < self._howls.length; i++) {
              if (!self._howls[i]._webAudio) {
                var ids = self._howls[i]._getSoundIds();
                for (var j = 0; j < ids.length; j++) {
                  var sound2 = self._howls[i]._soundById(ids[j]);
                  if (sound2 && sound2._node) {
                    sound2._node.muted = muted ? true : sound2._muted;
                  }
                }
              }
            }
            return self;
          },
          /**
           * Handle stopping all sounds globally.
           */
          stop: function() {
            var self = this || Howler3;
            for (var i = 0; i < self._howls.length; i++) {
              self._howls[i].stop();
            }
            return self;
          },
          /**
           * Unload and destroy all currently loaded Howl objects.
           * @return {Howler}
           */
          unload: function() {
            var self = this || Howler3;
            for (var i = self._howls.length - 1; i >= 0; i--) {
              self._howls[i].unload();
            }
            if (self.usingWebAudio && self.ctx && typeof self.ctx.close !== "undefined") {
              self.ctx.close();
              self.ctx = null;
              setupAudioContext();
            }
            return self;
          },
          /**
           * Check for codec support of specific extension.
           * @param  {String} ext Audio file extention.
           * @return {Boolean}
           */
          codecs: function(ext) {
            return (this || Howler3)._codecs[ext.replace(/^x-/, "")];
          },
          /**
           * Setup various state values for global tracking.
           * @return {Howler}
           */
          _setup: function() {
            var self = this || Howler3;
            self.state = self.ctx ? self.ctx.state || "suspended" : "suspended";
            self._autoSuspend();
            if (!self.usingWebAudio) {
              if (typeof Audio !== "undefined") {
                try {
                  var test = new Audio();
                  if (typeof test.oncanplaythrough === "undefined") {
                    self._canPlayEvent = "canplay";
                  }
                } catch (e) {
                  self.noAudio = true;
                }
              } else {
                self.noAudio = true;
              }
            }
            try {
              var test = new Audio();
              if (test.muted) {
                self.noAudio = true;
              }
            } catch (e) {
            }
            if (!self.noAudio) {
              self._setupCodecs();
            }
            return self;
          },
          /**
           * Check for browser support for various codecs and cache the results.
           * @return {Howler}
           */
          _setupCodecs: function() {
            var self = this || Howler3;
            var audioTest = null;
            try {
              audioTest = typeof Audio !== "undefined" ? new Audio() : null;
            } catch (err) {
              return self;
            }
            if (!audioTest || typeof audioTest.canPlayType !== "function") {
              return self;
            }
            var mpegTest = audioTest.canPlayType("audio/mpeg;").replace(/^no$/, "");
            var ua = self._navigator ? self._navigator.userAgent : "";
            var checkOpera = ua.match(/OPR\/(\d+)/g);
            var isOldOpera = checkOpera && parseInt(checkOpera[0].split("/")[1], 10) < 33;
            var checkSafari = ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1;
            var safariVersion = ua.match(/Version\/(.*?) /);
            var isOldSafari = checkSafari && safariVersion && parseInt(safariVersion[1], 10) < 15;
            self._codecs = {
              mp3: !!(!isOldOpera && (mpegTest || audioTest.canPlayType("audio/mp3;").replace(/^no$/, ""))),
              mpeg: !!mpegTest,
              opus: !!audioTest.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
              ogg: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
              oga: !!audioTest.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
              wav: !!(audioTest.canPlayType('audio/wav; codecs="1"') || audioTest.canPlayType("audio/wav")).replace(/^no$/, ""),
              aac: !!audioTest.canPlayType("audio/aac;").replace(/^no$/, ""),
              caf: !!audioTest.canPlayType("audio/x-caf;").replace(/^no$/, ""),
              m4a: !!(audioTest.canPlayType("audio/x-m4a;") || audioTest.canPlayType("audio/m4a;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              m4b: !!(audioTest.canPlayType("audio/x-m4b;") || audioTest.canPlayType("audio/m4b;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              mp4: !!(audioTest.canPlayType("audio/x-mp4;") || audioTest.canPlayType("audio/mp4;") || audioTest.canPlayType("audio/aac;")).replace(/^no$/, ""),
              weba: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
              webm: !!(!isOldSafari && audioTest.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")),
              dolby: !!audioTest.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
              flac: !!(audioTest.canPlayType("audio/x-flac;") || audioTest.canPlayType("audio/flac;")).replace(/^no$/, "")
            };
            return self;
          },
          /**
           * Some browsers/devices will only allow audio to be played after a user interaction.
           * Attempt to automatically unlock audio on the first user interaction.
           * Concept from: http://paulbakaus.com/tutorials/html5/web-audio-on-ios/
           * @return {Howler}
           */
          _unlockAudio: function() {
            var self = this || Howler3;
            if (self._audioUnlocked || !self.ctx) {
              return;
            }
            self._audioUnlocked = false;
            self.autoUnlock = false;
            if (!self._mobileUnloaded && self.ctx.sampleRate !== 44100) {
              self._mobileUnloaded = true;
              self.unload();
            }
            self._scratchBuffer = self.ctx.createBuffer(1, 1, 22050);
            var unlock = function(e) {
              while (self._html5AudioPool.length < self.html5PoolSize) {
                try {
                  var audioNode = new Audio();
                  audioNode._unlocked = true;
                  self._releaseHtml5Audio(audioNode);
                } catch (e2) {
                  self.noAudio = true;
                  break;
                }
              }
              for (var i = 0; i < self._howls.length; i++) {
                if (!self._howls[i]._webAudio) {
                  var ids = self._howls[i]._getSoundIds();
                  for (var j = 0; j < ids.length; j++) {
                    var sound2 = self._howls[i]._soundById(ids[j]);
                    if (sound2 && sound2._node && !sound2._node._unlocked) {
                      sound2._node._unlocked = true;
                      sound2._node.load();
                    }
                  }
                }
              }
              self._autoResume();
              var source = self.ctx.createBufferSource();
              source.buffer = self._scratchBuffer;
              source.connect(self.ctx.destination);
              if (typeof source.start === "undefined") {
                source.noteOn(0);
              } else {
                source.start(0);
              }
              if (typeof self.ctx.resume === "function") {
                self.ctx.resume();
              }
              source.onended = function() {
                source.disconnect(0);
                self._audioUnlocked = true;
                document.removeEventListener("touchstart", unlock, true);
                document.removeEventListener("touchend", unlock, true);
                document.removeEventListener("click", unlock, true);
                document.removeEventListener("keydown", unlock, true);
                for (var i2 = 0; i2 < self._howls.length; i2++) {
                  self._howls[i2]._emit("unlock");
                }
              };
            };
            document.addEventListener("touchstart", unlock, true);
            document.addEventListener("touchend", unlock, true);
            document.addEventListener("click", unlock, true);
            document.addEventListener("keydown", unlock, true);
            return self;
          },
          /**
           * Get an unlocked HTML5 Audio object from the pool. If none are left,
           * return a new Audio object and throw a warning.
           * @return {Audio} HTML5 Audio object.
           */
          _obtainHtml5Audio: function() {
            var self = this || Howler3;
            if (self._html5AudioPool.length) {
              return self._html5AudioPool.pop();
            }
            var testPlay = new Audio().play();
            if (testPlay && typeof Promise !== "undefined" && (testPlay instanceof Promise || typeof testPlay.then === "function")) {
              testPlay.catch(function() {
                console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.");
              });
            }
            return new Audio();
          },
          /**
           * Return an activated HTML5 Audio object to the pool.
           * @return {Howler}
           */
          _releaseHtml5Audio: function(audio) {
            var self = this || Howler3;
            if (audio._unlocked) {
              self._html5AudioPool.push(audio);
            }
            return self;
          },
          /**
           * Automatically suspend the Web Audio AudioContext after no sound has played for 30 seconds.
           * This saves processing/energy and fixes various browser-specific bugs with audio getting stuck.
           * @return {Howler}
           */
          _autoSuspend: function() {
            var self = this;
            if (!self.autoSuspend || !self.ctx || typeof self.ctx.suspend === "undefined" || !Howler3.usingWebAudio) {
              return;
            }
            for (var i = 0; i < self._howls.length; i++) {
              if (self._howls[i]._webAudio) {
                for (var j = 0; j < self._howls[i]._sounds.length; j++) {
                  if (!self._howls[i]._sounds[j]._paused) {
                    return self;
                  }
                }
              }
            }
            if (self._suspendTimer) {
              clearTimeout(self._suspendTimer);
            }
            self._suspendTimer = setTimeout(function() {
              if (!self.autoSuspend) {
                return;
              }
              self._suspendTimer = null;
              self.state = "suspending";
              var handleSuspension = function() {
                self.state = "suspended";
                if (self._resumeAfterSuspend) {
                  delete self._resumeAfterSuspend;
                  self._autoResume();
                }
              };
              self.ctx.suspend().then(handleSuspension, handleSuspension);
            }, 3e4);
            return self;
          },
          /**
           * Automatically resume the Web Audio AudioContext when a new sound is played.
           * @return {Howler}
           */
          _autoResume: function() {
            var self = this;
            if (!self.ctx || typeof self.ctx.resume === "undefined" || !Howler3.usingWebAudio) {
              return;
            }
            if (self.state === "running" && self.ctx.state !== "interrupted" && self._suspendTimer) {
              clearTimeout(self._suspendTimer);
              self._suspendTimer = null;
            } else if (self.state === "suspended" || self.state === "running" && self.ctx.state === "interrupted") {
              self.ctx.resume().then(function() {
                self.state = "running";
                for (var i = 0; i < self._howls.length; i++) {
                  self._howls[i]._emit("resume");
                }
              });
              if (self._suspendTimer) {
                clearTimeout(self._suspendTimer);
                self._suspendTimer = null;
              }
            } else if (self.state === "suspending") {
              self._resumeAfterSuspend = true;
            }
            return self;
          }
        };
        var Howler3 = new HowlerGlobal2();
        var Howl3 = function(o) {
          var self = this;
          if (!o.src || o.src.length === 0) {
            console.error("An array of source files must be passed with any new Howl.");
            return;
          }
          self.init(o);
        };
        Howl3.prototype = {
          /**
           * Initialize a new Howl group object.
           * @param  {Object} o Passed in properties for this group.
           * @return {Howl}
           */
          init: function(o) {
            var self = this;
            if (!Howler3.ctx) {
              setupAudioContext();
            }
            self._autoplay = o.autoplay || false;
            self._format = typeof o.format !== "string" ? o.format : [o.format];
            self._html5 = o.html5 || false;
            self._muted = o.mute || false;
            self._loop = o.loop || false;
            self._pool = o.pool || 5;
            self._preload = typeof o.preload === "boolean" || o.preload === "metadata" ? o.preload : true;
            self._rate = o.rate || 1;
            self._sprite = o.sprite || {};
            self._src = typeof o.src !== "string" ? o.src : [o.src];
            self._volume = o.volume !== void 0 ? o.volume : 1;
            self._xhr = {
              method: o.xhr && o.xhr.method ? o.xhr.method : "GET",
              headers: o.xhr && o.xhr.headers ? o.xhr.headers : null,
              withCredentials: o.xhr && o.xhr.withCredentials ? o.xhr.withCredentials : false
            };
            self._duration = 0;
            self._state = "unloaded";
            self._sounds = [];
            self._endTimers = {};
            self._queue = [];
            self._playLock = false;
            self._onend = o.onend ? [{ fn: o.onend }] : [];
            self._onfade = o.onfade ? [{ fn: o.onfade }] : [];
            self._onload = o.onload ? [{ fn: o.onload }] : [];
            self._onloaderror = o.onloaderror ? [{ fn: o.onloaderror }] : [];
            self._onplayerror = o.onplayerror ? [{ fn: o.onplayerror }] : [];
            self._onpause = o.onpause ? [{ fn: o.onpause }] : [];
            self._onplay = o.onplay ? [{ fn: o.onplay }] : [];
            self._onstop = o.onstop ? [{ fn: o.onstop }] : [];
            self._onmute = o.onmute ? [{ fn: o.onmute }] : [];
            self._onvolume = o.onvolume ? [{ fn: o.onvolume }] : [];
            self._onrate = o.onrate ? [{ fn: o.onrate }] : [];
            self._onseek = o.onseek ? [{ fn: o.onseek }] : [];
            self._onunlock = o.onunlock ? [{ fn: o.onunlock }] : [];
            self._onresume = [];
            self._webAudio = Howler3.usingWebAudio && !self._html5;
            if (typeof Howler3.ctx !== "undefined" && Howler3.ctx && Howler3.autoUnlock) {
              Howler3._unlockAudio();
            }
            Howler3._howls.push(self);
            if (self._autoplay) {
              self._queue.push({
                event: "play",
                action: function() {
                  self.play();
                }
              });
            }
            if (self._preload && self._preload !== "none") {
              self.load();
            }
            return self;
          },
          /**
           * Load the audio file.
           * @return {Howler}
           */
          load: function() {
            var self = this;
            var url = null;
            if (Howler3.noAudio) {
              self._emit("loaderror", null, "No audio support.");
              return;
            }
            if (typeof self._src === "string") {
              self._src = [self._src];
            }
            for (var i = 0; i < self._src.length; i++) {
              var ext, str;
              if (self._format && self._format[i]) {
                ext = self._format[i];
              } else {
                str = self._src[i];
                if (typeof str !== "string") {
                  self._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                  continue;
                }
                ext = /^data:audio\/([^;,]+);/i.exec(str);
                if (!ext) {
                  ext = /\.([^.]+)$/.exec(str.split("?", 1)[0]);
                }
                if (ext) {
                  ext = ext[1].toLowerCase();
                }
              }
              if (!ext) {
                console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
              }
              if (ext && Howler3.codecs(ext)) {
                url = self._src[i];
                break;
              }
            }
            if (!url) {
              self._emit("loaderror", null, "No codec support for selected audio sources.");
              return;
            }
            self._src = url;
            self._state = "loading";
            if (window.location.protocol === "https:" && url.slice(0, 5) === "http:") {
              self._html5 = true;
              self._webAudio = false;
            }
            new Sound2(self);
            if (self._webAudio) {
              loadBuffer(self);
            }
            return self;
          },
          /**
           * Play a sound or resume previous playback.
           * @param  {String/Number} sprite   Sprite name for sprite playback or sound id to continue previous.
           * @param  {Boolean} internal Internal Use: true prevents event firing.
           * @return {Number}          Sound ID.
           */
          play: function(sprite, internal) {
            var self = this;
            var id = null;
            if (typeof sprite === "number") {
              id = sprite;
              sprite = null;
            } else if (typeof sprite === "string" && self._state === "loaded" && !self._sprite[sprite]) {
              return null;
            } else if (typeof sprite === "undefined") {
              sprite = "__default";
              if (!self._playLock) {
                var num = 0;
                for (var i = 0; i < self._sounds.length; i++) {
                  if (self._sounds[i]._paused && !self._sounds[i]._ended) {
                    num++;
                    id = self._sounds[i]._id;
                  }
                }
                if (num === 1) {
                  sprite = null;
                } else {
                  id = null;
                }
              }
            }
            var sound2 = id ? self._soundById(id) : self._inactiveSound();
            if (!sound2) {
              return null;
            }
            if (id && !sprite) {
              sprite = sound2._sprite || "__default";
            }
            if (self._state !== "loaded") {
              sound2._sprite = sprite;
              sound2._ended = false;
              var soundId = sound2._id;
              self._queue.push({
                event: "play",
                action: function() {
                  self.play(soundId);
                }
              });
              return soundId;
            }
            if (id && !sound2._paused) {
              if (!internal) {
                self._loadQueue("play");
              }
              return sound2._id;
            }
            if (self._webAudio) {
              Howler3._autoResume();
            }
            var seek = Math.max(0, sound2._seek > 0 ? sound2._seek : self._sprite[sprite][0] / 1e3);
            var duration = Math.max(0, (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1e3 - seek);
            var timeout = duration * 1e3 / Math.abs(sound2._rate);
            var start = self._sprite[sprite][0] / 1e3;
            var stop = (self._sprite[sprite][0] + self._sprite[sprite][1]) / 1e3;
            sound2._sprite = sprite;
            sound2._ended = false;
            var setParams = function() {
              sound2._paused = false;
              sound2._seek = seek;
              sound2._start = start;
              sound2._stop = stop;
              sound2._loop = !!(sound2._loop || self._sprite[sprite][2]);
            };
            if (seek >= stop) {
              self._ended(sound2);
              return;
            }
            var node = sound2._node;
            if (self._webAudio) {
              var playWebAudio = function() {
                self._playLock = false;
                setParams();
                self._refreshBuffer(sound2);
                var vol = sound2._muted || self._muted ? 0 : sound2._volume;
                node.gain.setValueAtTime(vol, Howler3.ctx.currentTime);
                sound2._playStart = Howler3.ctx.currentTime;
                if (typeof node.bufferSource.start === "undefined") {
                  sound2._loop ? node.bufferSource.noteGrainOn(0, seek, 86400) : node.bufferSource.noteGrainOn(0, seek, duration);
                } else {
                  sound2._loop ? node.bufferSource.start(0, seek, 86400) : node.bufferSource.start(0, seek, duration);
                }
                if (timeout !== Infinity) {
                  self._endTimers[sound2._id] = setTimeout(self._ended.bind(self, sound2), timeout);
                }
                if (!internal) {
                  setTimeout(function() {
                    self._emit("play", sound2._id);
                    self._loadQueue();
                  }, 0);
                }
              };
              if (Howler3.state === "running" && Howler3.ctx.state !== "interrupted") {
                playWebAudio();
              } else {
                self._playLock = true;
                self.once("resume", playWebAudio);
                self._clearTimer(sound2._id);
              }
            } else {
              var playHtml5 = function() {
                node.currentTime = seek;
                node.muted = sound2._muted || self._muted || Howler3._muted || node.muted;
                node.volume = sound2._volume * Howler3.volume();
                node.playbackRate = sound2._rate;
                try {
                  var play = node.play();
                  if (play && typeof Promise !== "undefined" && (play instanceof Promise || typeof play.then === "function")) {
                    self._playLock = true;
                    setParams();
                    play.then(function() {
                      self._playLock = false;
                      node._unlocked = true;
                      if (!internal) {
                        self._emit("play", sound2._id);
                      } else {
                        self._loadQueue();
                      }
                    }).catch(function() {
                      self._playLock = false;
                      self._emit("playerror", sound2._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                      sound2._ended = true;
                      sound2._paused = true;
                    });
                  } else if (!internal) {
                    self._playLock = false;
                    setParams();
                    self._emit("play", sound2._id);
                  }
                  node.playbackRate = sound2._rate;
                  if (node.paused) {
                    self._emit("playerror", sound2._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                    return;
                  }
                  if (sprite !== "__default" || sound2._loop) {
                    self._endTimers[sound2._id] = setTimeout(self._ended.bind(self, sound2), timeout);
                  } else {
                    self._endTimers[sound2._id] = function() {
                      self._ended(sound2);
                      node.removeEventListener("ended", self._endTimers[sound2._id], false);
                    };
                    node.addEventListener("ended", self._endTimers[sound2._id], false);
                  }
                } catch (err) {
                  self._emit("playerror", sound2._id, err);
                }
              };
              if (node.src === "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA") {
                node.src = self._src;
                node.load();
              }
              var loadedNoReadyState = window && window.ejecta || !node.readyState && Howler3._navigator.isCocoonJS;
              if (node.readyState >= 3 || loadedNoReadyState) {
                playHtml5();
              } else {
                self._playLock = true;
                self._state = "loading";
                var listener = function() {
                  self._state = "loaded";
                  playHtml5();
                  node.removeEventListener(Howler3._canPlayEvent, listener, false);
                };
                node.addEventListener(Howler3._canPlayEvent, listener, false);
                self._clearTimer(sound2._id);
              }
            }
            return sound2._id;
          },
          /**
           * Pause playback and save current position.
           * @param  {Number} id The sound ID (empty to pause all in group).
           * @return {Howl}
           */
          pause: function(id) {
            var self = this;
            if (self._state !== "loaded" || self._playLock) {
              self._queue.push({
                event: "pause",
                action: function() {
                  self.pause(id);
                }
              });
              return self;
            }
            var ids = self._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              self._clearTimer(ids[i]);
              var sound2 = self._soundById(ids[i]);
              if (sound2 && !sound2._paused) {
                sound2._seek = self.seek(ids[i]);
                sound2._rateSeek = 0;
                sound2._paused = true;
                self._stopFade(ids[i]);
                if (sound2._node) {
                  if (self._webAudio) {
                    if (!sound2._node.bufferSource) {
                      continue;
                    }
                    if (typeof sound2._node.bufferSource.stop === "undefined") {
                      sound2._node.bufferSource.noteOff(0);
                    } else {
                      sound2._node.bufferSource.stop(0);
                    }
                    self._cleanBuffer(sound2._node);
                  } else if (!isNaN(sound2._node.duration) || sound2._node.duration === Infinity) {
                    sound2._node.pause();
                  }
                }
              }
              if (!arguments[1]) {
                self._emit("pause", sound2 ? sound2._id : null);
              }
            }
            return self;
          },
          /**
           * Stop playback and reset to start.
           * @param  {Number} id The sound ID (empty to stop all in group).
           * @param  {Boolean} internal Internal Use: true prevents event firing.
           * @return {Howl}
           */
          stop: function(id, internal) {
            var self = this;
            if (self._state !== "loaded" || self._playLock) {
              self._queue.push({
                event: "stop",
                action: function() {
                  self.stop(id);
                }
              });
              return self;
            }
            var ids = self._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              self._clearTimer(ids[i]);
              var sound2 = self._soundById(ids[i]);
              if (sound2) {
                sound2._seek = sound2._start || 0;
                sound2._rateSeek = 0;
                sound2._paused = true;
                sound2._ended = true;
                self._stopFade(ids[i]);
                if (sound2._node) {
                  if (self._webAudio) {
                    if (sound2._node.bufferSource) {
                      if (typeof sound2._node.bufferSource.stop === "undefined") {
                        sound2._node.bufferSource.noteOff(0);
                      } else {
                        sound2._node.bufferSource.stop(0);
                      }
                      self._cleanBuffer(sound2._node);
                    }
                  } else if (!isNaN(sound2._node.duration) || sound2._node.duration === Infinity) {
                    sound2._node.currentTime = sound2._start || 0;
                    sound2._node.pause();
                    if (sound2._node.duration === Infinity) {
                      self._clearSound(sound2._node);
                    }
                  }
                }
                if (!internal) {
                  self._emit("stop", sound2._id);
                }
              }
            }
            return self;
          },
          /**
           * Mute/unmute a single sound or all sounds in this Howl group.
           * @param  {Boolean} muted Set to true to mute and false to unmute.
           * @param  {Number} id    The sound ID to update (omit to mute/unmute all).
           * @return {Howl}
           */
          mute: function(muted, id) {
            var self = this;
            if (self._state !== "loaded" || self._playLock) {
              self._queue.push({
                event: "mute",
                action: function() {
                  self.mute(muted, id);
                }
              });
              return self;
            }
            if (typeof id === "undefined") {
              if (typeof muted === "boolean") {
                self._muted = muted;
              } else {
                return self._muted;
              }
            }
            var ids = self._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              var sound2 = self._soundById(ids[i]);
              if (sound2) {
                sound2._muted = muted;
                if (sound2._interval) {
                  self._stopFade(sound2._id);
                }
                if (self._webAudio && sound2._node) {
                  sound2._node.gain.setValueAtTime(muted ? 0 : sound2._volume, Howler3.ctx.currentTime);
                } else if (sound2._node) {
                  sound2._node.muted = Howler3._muted ? true : muted;
                }
                self._emit("mute", sound2._id);
              }
            }
            return self;
          },
          /**
           * Get/set the volume of this sound or of the Howl group. This method can optionally take 0, 1 or 2 arguments.
           *   volume() -> Returns the group's volume value.
           *   volume(id) -> Returns the sound id's current volume.
           *   volume(vol) -> Sets the volume of all sounds in this Howl group.
           *   volume(vol, id) -> Sets the volume of passed sound id.
           * @return {Howl/Number} Returns self or current volume.
           */
          volume: function() {
            var self = this;
            var args = arguments;
            var vol, id;
            if (args.length === 0) {
              return self._volume;
            } else if (args.length === 1 || args.length === 2 && typeof args[1] === "undefined") {
              var ids = self._getSoundIds();
              var index = ids.indexOf(args[0]);
              if (index >= 0) {
                id = parseInt(args[0], 10);
              } else {
                vol = parseFloat(args[0]);
              }
            } else if (args.length >= 2) {
              vol = parseFloat(args[0]);
              id = parseInt(args[1], 10);
            }
            var sound2;
            if (typeof vol !== "undefined" && vol >= 0 && vol <= 1) {
              if (self._state !== "loaded" || self._playLock) {
                self._queue.push({
                  event: "volume",
                  action: function() {
                    self.volume.apply(self, args);
                  }
                });
                return self;
              }
              if (typeof id === "undefined") {
                self._volume = vol;
              }
              id = self._getSoundIds(id);
              for (var i = 0; i < id.length; i++) {
                sound2 = self._soundById(id[i]);
                if (sound2) {
                  sound2._volume = vol;
                  if (!args[2]) {
                    self._stopFade(id[i]);
                  }
                  if (self._webAudio && sound2._node && !sound2._muted) {
                    sound2._node.gain.setValueAtTime(vol, Howler3.ctx.currentTime);
                  } else if (sound2._node && !sound2._muted) {
                    sound2._node.volume = vol * Howler3.volume();
                  }
                  self._emit("volume", sound2._id);
                }
              }
            } else {
              sound2 = id ? self._soundById(id) : self._sounds[0];
              return sound2 ? sound2._volume : 0;
            }
            return self;
          },
          /**
           * Fade a currently playing sound between two volumes (if no id is passed, all sounds will fade).
           * @param  {Number} from The value to fade from (0.0 to 1.0).
           * @param  {Number} to   The volume to fade to (0.0 to 1.0).
           * @param  {Number} len  Time in milliseconds to fade.
           * @param  {Number} id   The sound id (omit to fade all sounds).
           * @return {Howl}
           */
          fade: function(from, to, len, id) {
            var self = this;
            if (self._state !== "loaded" || self._playLock) {
              self._queue.push({
                event: "fade",
                action: function() {
                  self.fade(from, to, len, id);
                }
              });
              return self;
            }
            from = Math.min(Math.max(0, parseFloat(from)), 1);
            to = Math.min(Math.max(0, parseFloat(to)), 1);
            len = parseFloat(len);
            self.volume(from, id);
            var ids = self._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              var sound2 = self._soundById(ids[i]);
              if (sound2) {
                if (!id) {
                  self._stopFade(ids[i]);
                }
                if (self._webAudio && !sound2._muted) {
                  var currentTime = Howler3.ctx.currentTime;
                  var end = currentTime + len / 1e3;
                  sound2._volume = from;
                  sound2._node.gain.setValueAtTime(from, currentTime);
                  sound2._node.gain.linearRampToValueAtTime(to, end);
                }
                self._startFadeInterval(sound2, from, to, len, ids[i], typeof id === "undefined");
              }
            }
            return self;
          },
          /**
           * Starts the internal interval to fade a sound.
           * @param  {Object} sound Reference to sound to fade.
           * @param  {Number} from The value to fade from (0.0 to 1.0).
           * @param  {Number} to   The volume to fade to (0.0 to 1.0).
           * @param  {Number} len  Time in milliseconds to fade.
           * @param  {Number} id   The sound id to fade.
           * @param  {Boolean} isGroup   If true, set the volume on the group.
           */
          _startFadeInterval: function(sound2, from, to, len, id, isGroup) {
            var self = this;
            var vol = from;
            var diff = to - from;
            var steps = Math.abs(diff / 0.01);
            var stepLen = Math.max(4, steps > 0 ? len / steps : len);
            var lastTick = Date.now();
            sound2._fadeTo = to;
            sound2._interval = setInterval(function() {
              var tick = (Date.now() - lastTick) / len;
              lastTick = Date.now();
              vol += diff * tick;
              vol = Math.round(vol * 100) / 100;
              if (diff < 0) {
                vol = Math.max(to, vol);
              } else {
                vol = Math.min(to, vol);
              }
              if (self._webAudio) {
                sound2._volume = vol;
              } else {
                self.volume(vol, sound2._id, true);
              }
              if (isGroup) {
                self._volume = vol;
              }
              if (to < from && vol <= to || to > from && vol >= to) {
                clearInterval(sound2._interval);
                sound2._interval = null;
                sound2._fadeTo = null;
                self.volume(to, sound2._id);
                self._emit("fade", sound2._id);
              }
            }, stepLen);
          },
          /**
           * Internal method that stops the currently playing fade when
           * a new fade starts, volume is changed or the sound is stopped.
           * @param  {Number} id The sound id.
           * @return {Howl}
           */
          _stopFade: function(id) {
            var self = this;
            var sound2 = self._soundById(id);
            if (sound2 && sound2._interval) {
              if (self._webAudio) {
                sound2._node.gain.cancelScheduledValues(Howler3.ctx.currentTime);
              }
              clearInterval(sound2._interval);
              sound2._interval = null;
              self.volume(sound2._fadeTo, id);
              sound2._fadeTo = null;
              self._emit("fade", id);
            }
            return self;
          },
          /**
           * Get/set the loop parameter on a sound. This method can optionally take 0, 1 or 2 arguments.
           *   loop() -> Returns the group's loop value.
           *   loop(id) -> Returns the sound id's loop value.
           *   loop(loop) -> Sets the loop value for all sounds in this Howl group.
           *   loop(loop, id) -> Sets the loop value of passed sound id.
           * @return {Howl/Boolean} Returns self or current loop value.
           */
          loop: function() {
            var self = this;
            var args = arguments;
            var loop, id, sound2;
            if (args.length === 0) {
              return self._loop;
            } else if (args.length === 1) {
              if (typeof args[0] === "boolean") {
                loop = args[0];
                self._loop = loop;
              } else {
                sound2 = self._soundById(parseInt(args[0], 10));
                return sound2 ? sound2._loop : false;
              }
            } else if (args.length === 2) {
              loop = args[0];
              id = parseInt(args[1], 10);
            }
            var ids = self._getSoundIds(id);
            for (var i = 0; i < ids.length; i++) {
              sound2 = self._soundById(ids[i]);
              if (sound2) {
                sound2._loop = loop;
                if (self._webAudio && sound2._node && sound2._node.bufferSource) {
                  sound2._node.bufferSource.loop = loop;
                  if (loop) {
                    sound2._node.bufferSource.loopStart = sound2._start || 0;
                    sound2._node.bufferSource.loopEnd = sound2._stop;
                    if (self.playing(ids[i])) {
                      self.pause(ids[i], true);
                      self.play(ids[i], true);
                    }
                  }
                }
              }
            }
            return self;
          },
          /**
           * Get/set the playback rate of a sound. This method can optionally take 0, 1 or 2 arguments.
           *   rate() -> Returns the first sound node's current playback rate.
           *   rate(id) -> Returns the sound id's current playback rate.
           *   rate(rate) -> Sets the playback rate of all sounds in this Howl group.
           *   rate(rate, id) -> Sets the playback rate of passed sound id.
           * @return {Howl/Number} Returns self or the current playback rate.
           */
          rate: function() {
            var self = this;
            var args = arguments;
            var rate, id;
            if (args.length === 0) {
              id = self._sounds[0]._id;
            } else if (args.length === 1) {
              var ids = self._getSoundIds();
              var index = ids.indexOf(args[0]);
              if (index >= 0) {
                id = parseInt(args[0], 10);
              } else {
                rate = parseFloat(args[0]);
              }
            } else if (args.length === 2) {
              rate = parseFloat(args[0]);
              id = parseInt(args[1], 10);
            }
            var sound2;
            if (typeof rate === "number") {
              if (self._state !== "loaded" || self._playLock) {
                self._queue.push({
                  event: "rate",
                  action: function() {
                    self.rate.apply(self, args);
                  }
                });
                return self;
              }
              if (typeof id === "undefined") {
                self._rate = rate;
              }
              id = self._getSoundIds(id);
              for (var i = 0; i < id.length; i++) {
                sound2 = self._soundById(id[i]);
                if (sound2) {
                  if (self.playing(id[i])) {
                    sound2._rateSeek = self.seek(id[i]);
                    sound2._playStart = self._webAudio ? Howler3.ctx.currentTime : sound2._playStart;
                  }
                  sound2._rate = rate;
                  if (self._webAudio && sound2._node && sound2._node.bufferSource) {
                    sound2._node.bufferSource.playbackRate.setValueAtTime(rate, Howler3.ctx.currentTime);
                  } else if (sound2._node) {
                    sound2._node.playbackRate = rate;
                  }
                  var seek = self.seek(id[i]);
                  var duration = (self._sprite[sound2._sprite][0] + self._sprite[sound2._sprite][1]) / 1e3 - seek;
                  var timeout = duration * 1e3 / Math.abs(sound2._rate);
                  if (self._endTimers[id[i]] || !sound2._paused) {
                    self._clearTimer(id[i]);
                    self._endTimers[id[i]] = setTimeout(self._ended.bind(self, sound2), timeout);
                  }
                  self._emit("rate", sound2._id);
                }
              }
            } else {
              sound2 = self._soundById(id);
              return sound2 ? sound2._rate : self._rate;
            }
            return self;
          },
          /**
           * Get/set the seek position of a sound. This method can optionally take 0, 1 or 2 arguments.
           *   seek() -> Returns the first sound node's current seek position.
           *   seek(id) -> Returns the sound id's current seek position.
           *   seek(seek) -> Sets the seek position of the first sound node.
           *   seek(seek, id) -> Sets the seek position of passed sound id.
           * @return {Howl/Number} Returns self or the current seek position.
           */
          seek: function() {
            var self = this;
            var args = arguments;
            var seek, id;
            if (args.length === 0) {
              if (self._sounds.length) {
                id = self._sounds[0]._id;
              }
            } else if (args.length === 1) {
              var ids = self._getSoundIds();
              var index = ids.indexOf(args[0]);
              if (index >= 0) {
                id = parseInt(args[0], 10);
              } else if (self._sounds.length) {
                id = self._sounds[0]._id;
                seek = parseFloat(args[0]);
              }
            } else if (args.length === 2) {
              seek = parseFloat(args[0]);
              id = parseInt(args[1], 10);
            }
            if (typeof id === "undefined") {
              return 0;
            }
            if (typeof seek === "number" && (self._state !== "loaded" || self._playLock)) {
              self._queue.push({
                event: "seek",
                action: function() {
                  self.seek.apply(self, args);
                }
              });
              return self;
            }
            var sound2 = self._soundById(id);
            if (sound2) {
              if (typeof seek === "number" && seek >= 0) {
                var playing = self.playing(id);
                if (playing) {
                  self.pause(id, true);
                }
                sound2._seek = seek;
                sound2._ended = false;
                self._clearTimer(id);
                if (!self._webAudio && sound2._node && !isNaN(sound2._node.duration)) {
                  sound2._node.currentTime = seek;
                }
                var seekAndEmit = function() {
                  if (playing) {
                    self.play(id, true);
                  }
                  self._emit("seek", id);
                };
                if (playing && !self._webAudio) {
                  var emitSeek = function() {
                    if (!self._playLock) {
                      seekAndEmit();
                    } else {
                      setTimeout(emitSeek, 0);
                    }
                  };
                  setTimeout(emitSeek, 0);
                } else {
                  seekAndEmit();
                }
              } else {
                if (self._webAudio) {
                  var realTime = self.playing(id) ? Howler3.ctx.currentTime - sound2._playStart : 0;
                  var rateSeek = sound2._rateSeek ? sound2._rateSeek - sound2._seek : 0;
                  return sound2._seek + (rateSeek + realTime * Math.abs(sound2._rate));
                } else {
                  return sound2._node.currentTime;
                }
              }
            }
            return self;
          },
          /**
           * Check if a specific sound is currently playing or not (if id is provided), or check if at least one of the sounds in the group is playing or not.
           * @param  {Number}  id The sound id to check. If none is passed, the whole sound group is checked.
           * @return {Boolean} True if playing and false if not.
           */
          playing: function(id) {
            var self = this;
            if (typeof id === "number") {
              var sound2 = self._soundById(id);
              return sound2 ? !sound2._paused : false;
            }
            for (var i = 0; i < self._sounds.length; i++) {
              if (!self._sounds[i]._paused) {
                return true;
              }
            }
            return false;
          },
          /**
           * Get the duration of this sound. Passing a sound id will return the sprite duration.
           * @param  {Number} id The sound id to check. If none is passed, return full source duration.
           * @return {Number} Audio duration in seconds.
           */
          duration: function(id) {
            var self = this;
            var duration = self._duration;
            var sound2 = self._soundById(id);
            if (sound2) {
              duration = self._sprite[sound2._sprite][1] / 1e3;
            }
            return duration;
          },
          /**
           * Returns the current loaded state of this Howl.
           * @return {String} 'unloaded', 'loading', 'loaded'
           */
          state: function() {
            return this._state;
          },
          /**
           * Unload and destroy the current Howl object.
           * This will immediately stop all sound instances attached to this group.
           */
          unload: function() {
            var self = this;
            var sounds2 = self._sounds;
            for (var i = 0; i < sounds2.length; i++) {
              if (!sounds2[i]._paused) {
                self.stop(sounds2[i]._id);
              }
              if (!self._webAudio) {
                self._clearSound(sounds2[i]._node);
                sounds2[i]._node.removeEventListener("error", sounds2[i]._errorFn, false);
                sounds2[i]._node.removeEventListener(Howler3._canPlayEvent, sounds2[i]._loadFn, false);
                sounds2[i]._node.removeEventListener("ended", sounds2[i]._endFn, false);
                Howler3._releaseHtml5Audio(sounds2[i]._node);
              }
              delete sounds2[i]._node;
              self._clearTimer(sounds2[i]._id);
            }
            var index = Howler3._howls.indexOf(self);
            if (index >= 0) {
              Howler3._howls.splice(index, 1);
            }
            var remCache = true;
            for (i = 0; i < Howler3._howls.length; i++) {
              if (Howler3._howls[i]._src === self._src || self._src.indexOf(Howler3._howls[i]._src) >= 0) {
                remCache = false;
                break;
              }
            }
            if (cache && remCache) {
              delete cache[self._src];
            }
            Howler3.noAudio = false;
            self._state = "unloaded";
            self._sounds = [];
            self = null;
            return null;
          },
          /**
           * Listen to a custom event.
           * @param  {String}   event Event name.
           * @param  {Function} fn    Listener to call.
           * @param  {Number}   id    (optional) Only listen to events for this sound.
           * @param  {Number}   once  (INTERNAL) Marks event to fire only once.
           * @return {Howl}
           */
          on: function(event, fn, id, once) {
            var self = this;
            var events = self["_on" + event];
            if (typeof fn === "function") {
              events.push(once ? { id, fn, once } : { id, fn });
            }
            return self;
          },
          /**
           * Remove a custom event. Call without parameters to remove all events.
           * @param  {String}   event Event name.
           * @param  {Function} fn    Listener to remove. Leave empty to remove all.
           * @param  {Number}   id    (optional) Only remove events for this sound.
           * @return {Howl}
           */
          off: function(event, fn, id) {
            var self = this;
            var events = self["_on" + event];
            var i = 0;
            if (typeof fn === "number") {
              id = fn;
              fn = null;
            }
            if (fn || id) {
              for (i = 0; i < events.length; i++) {
                var isId = id === events[i].id;
                if (fn === events[i].fn && isId || !fn && isId) {
                  events.splice(i, 1);
                  break;
                }
              }
            } else if (event) {
              self["_on" + event] = [];
            } else {
              var keys = Object.keys(self);
              for (i = 0; i < keys.length; i++) {
                if (keys[i].indexOf("_on") === 0 && Array.isArray(self[keys[i]])) {
                  self[keys[i]] = [];
                }
              }
            }
            return self;
          },
          /**
           * Listen to a custom event and remove it once fired.
           * @param  {String}   event Event name.
           * @param  {Function} fn    Listener to call.
           * @param  {Number}   id    (optional) Only listen to events for this sound.
           * @return {Howl}
           */
          once: function(event, fn, id) {
            var self = this;
            self.on(event, fn, id, 1);
            return self;
          },
          /**
           * Emit all events of a specific type and pass the sound id.
           * @param  {String} event Event name.
           * @param  {Number} id    Sound ID.
           * @param  {Number} msg   Message to go with event.
           * @return {Howl}
           */
          _emit: function(event, id, msg) {
            var self = this;
            var events = self["_on" + event];
            for (var i = events.length - 1; i >= 0; i--) {
              if (!events[i].id || events[i].id === id || event === "load") {
                setTimeout(function(fn) {
                  fn.call(this, id, msg);
                }.bind(self, events[i].fn), 0);
                if (events[i].once) {
                  self.off(event, events[i].fn, events[i].id);
                }
              }
            }
            self._loadQueue(event);
            return self;
          },
          /**
           * Queue of actions initiated before the sound has loaded.
           * These will be called in sequence, with the next only firing
           * after the previous has finished executing (even if async like play).
           * @return {Howl}
           */
          _loadQueue: function(event) {
            var self = this;
            if (self._queue.length > 0) {
              var task = self._queue[0];
              if (task.event === event) {
                self._queue.shift();
                self._loadQueue();
              }
              if (!event) {
                task.action();
              }
            }
            return self;
          },
          /**
           * Fired when playback ends at the end of the duration.
           * @param  {Sound} sound The sound object to work with.
           * @return {Howl}
           */
          _ended: function(sound2) {
            var self = this;
            var sprite = sound2._sprite;
            if (!self._webAudio && sound2._node && !sound2._node.paused && !sound2._node.ended && sound2._node.currentTime < sound2._stop) {
              setTimeout(self._ended.bind(self, sound2), 100);
              return self;
            }
            var loop = !!(sound2._loop || self._sprite[sprite][2]);
            self._emit("end", sound2._id);
            if (!self._webAudio && loop) {
              self.stop(sound2._id, true).play(sound2._id);
            }
            if (self._webAudio && loop) {
              self._emit("play", sound2._id);
              sound2._seek = sound2._start || 0;
              sound2._rateSeek = 0;
              sound2._playStart = Howler3.ctx.currentTime;
              var timeout = (sound2._stop - sound2._start) * 1e3 / Math.abs(sound2._rate);
              self._endTimers[sound2._id] = setTimeout(self._ended.bind(self, sound2), timeout);
            }
            if (self._webAudio && !loop) {
              sound2._paused = true;
              sound2._ended = true;
              sound2._seek = sound2._start || 0;
              sound2._rateSeek = 0;
              self._clearTimer(sound2._id);
              self._cleanBuffer(sound2._node);
              Howler3._autoSuspend();
            }
            if (!self._webAudio && !loop) {
              self.stop(sound2._id, true);
            }
            return self;
          },
          /**
           * Clear the end timer for a sound playback.
           * @param  {Number} id The sound ID.
           * @return {Howl}
           */
          _clearTimer: function(id) {
            var self = this;
            if (self._endTimers[id]) {
              if (typeof self._endTimers[id] !== "function") {
                clearTimeout(self._endTimers[id]);
              } else {
                var sound2 = self._soundById(id);
                if (sound2 && sound2._node) {
                  sound2._node.removeEventListener("ended", self._endTimers[id], false);
                }
              }
              delete self._endTimers[id];
            }
            return self;
          },
          /**
           * Return the sound identified by this ID, or return null.
           * @param  {Number} id Sound ID
           * @return {Object}    Sound object or null.
           */
          _soundById: function(id) {
            var self = this;
            for (var i = 0; i < self._sounds.length; i++) {
              if (id === self._sounds[i]._id) {
                return self._sounds[i];
              }
            }
            return null;
          },
          /**
           * Return an inactive sound from the pool or create a new one.
           * @return {Sound} Sound playback object.
           */
          _inactiveSound: function() {
            var self = this;
            self._drain();
            for (var i = 0; i < self._sounds.length; i++) {
              if (self._sounds[i]._ended) {
                return self._sounds[i].reset();
              }
            }
            return new Sound2(self);
          },
          /**
           * Drain excess inactive sounds from the pool.
           */
          _drain: function() {
            var self = this;
            var limit = self._pool;
            var cnt = 0;
            var i = 0;
            if (self._sounds.length < limit) {
              return;
            }
            for (i = 0; i < self._sounds.length; i++) {
              if (self._sounds[i]._ended) {
                cnt++;
              }
            }
            for (i = self._sounds.length - 1; i >= 0; i--) {
              if (cnt <= limit) {
                return;
              }
              if (self._sounds[i]._ended) {
                if (self._webAudio && self._sounds[i]._node) {
                  self._sounds[i]._node.disconnect(0);
                }
                self._sounds.splice(i, 1);
                cnt--;
              }
            }
          },
          /**
           * Get all ID's from the sounds pool.
           * @param  {Number} id Only return one ID if one is passed.
           * @return {Array}    Array of IDs.
           */
          _getSoundIds: function(id) {
            var self = this;
            if (typeof id === "undefined") {
              var ids = [];
              for (var i = 0; i < self._sounds.length; i++) {
                ids.push(self._sounds[i]._id);
              }
              return ids;
            } else {
              return [id];
            }
          },
          /**
           * Load the sound back into the buffer source.
           * @param  {Sound} sound The sound object to work with.
           * @return {Howl}
           */
          _refreshBuffer: function(sound2) {
            var self = this;
            sound2._node.bufferSource = Howler3.ctx.createBufferSource();
            sound2._node.bufferSource.buffer = cache[self._src];
            if (sound2._panner) {
              sound2._node.bufferSource.connect(sound2._panner);
            } else {
              sound2._node.bufferSource.connect(sound2._node);
            }
            sound2._node.bufferSource.loop = sound2._loop;
            if (sound2._loop) {
              sound2._node.bufferSource.loopStart = sound2._start || 0;
              sound2._node.bufferSource.loopEnd = sound2._stop || 0;
            }
            sound2._node.bufferSource.playbackRate.setValueAtTime(sound2._rate, Howler3.ctx.currentTime);
            return self;
          },
          /**
           * Prevent memory leaks by cleaning up the buffer source after playback.
           * @param  {Object} node Sound's audio node containing the buffer source.
           * @return {Howl}
           */
          _cleanBuffer: function(node) {
            var self = this;
            var isIOS = Howler3._navigator && Howler3._navigator.vendor.indexOf("Apple") >= 0;
            if (!node.bufferSource) {
              return self;
            }
            if (Howler3._scratchBuffer && node.bufferSource) {
              node.bufferSource.onended = null;
              node.bufferSource.disconnect(0);
              if (isIOS) {
                try {
                  node.bufferSource.buffer = Howler3._scratchBuffer;
                } catch (e) {
                }
              }
            }
            node.bufferSource = null;
            return self;
          },
          /**
           * Set the source to a 0-second silence to stop any downloading (except in IE).
           * @param  {Object} node Audio node to clear.
           */
          _clearSound: function(node) {
            var checkIE = /MSIE |Trident\//.test(Howler3._navigator && Howler3._navigator.userAgent);
            if (!checkIE) {
              node.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA";
            }
          }
        };
        var Sound2 = function(howl) {
          this._parent = howl;
          this.init();
        };
        Sound2.prototype = {
          /**
           * Initialize a new Sound object.
           * @return {Sound}
           */
          init: function() {
            var self = this;
            var parent = self._parent;
            self._muted = parent._muted;
            self._loop = parent._loop;
            self._volume = parent._volume;
            self._rate = parent._rate;
            self._seek = 0;
            self._paused = true;
            self._ended = true;
            self._sprite = "__default";
            self._id = ++Howler3._counter;
            parent._sounds.push(self);
            self.create();
            return self;
          },
          /**
           * Create and setup a new sound object, whether HTML5 Audio or Web Audio.
           * @return {Sound}
           */
          create: function() {
            var self = this;
            var parent = self._parent;
            var volume = Howler3._muted || self._muted || self._parent._muted ? 0 : self._volume;
            if (parent._webAudio) {
              self._node = typeof Howler3.ctx.createGain === "undefined" ? Howler3.ctx.createGainNode() : Howler3.ctx.createGain();
              self._node.gain.setValueAtTime(volume, Howler3.ctx.currentTime);
              self._node.paused = true;
              self._node.connect(Howler3.masterGain);
            } else if (!Howler3.noAudio) {
              self._node = Howler3._obtainHtml5Audio();
              self._errorFn = self._errorListener.bind(self);
              self._node.addEventListener("error", self._errorFn, false);
              self._loadFn = self._loadListener.bind(self);
              self._node.addEventListener(Howler3._canPlayEvent, self._loadFn, false);
              self._endFn = self._endListener.bind(self);
              self._node.addEventListener("ended", self._endFn, false);
              self._node.src = parent._src;
              self._node.preload = parent._preload === true ? "auto" : parent._preload;
              self._node.volume = volume * Howler3.volume();
              self._node.load();
            }
            return self;
          },
          /**
           * Reset the parameters of this sound to the original state (for recycle).
           * @return {Sound}
           */
          reset: function() {
            var self = this;
            var parent = self._parent;
            self._muted = parent._muted;
            self._loop = parent._loop;
            self._volume = parent._volume;
            self._rate = parent._rate;
            self._seek = 0;
            self._rateSeek = 0;
            self._paused = true;
            self._ended = true;
            self._sprite = "__default";
            self._id = ++Howler3._counter;
            return self;
          },
          /**
           * HTML5 Audio error listener callback.
           */
          _errorListener: function() {
            var self = this;
            self._parent._emit("loaderror", self._id, self._node.error ? self._node.error.code : 0);
            self._node.removeEventListener("error", self._errorFn, false);
          },
          /**
           * HTML5 Audio canplaythrough listener callback.
           */
          _loadListener: function() {
            var self = this;
            var parent = self._parent;
            parent._duration = Math.ceil(self._node.duration * 10) / 10;
            if (Object.keys(parent._sprite).length === 0) {
              parent._sprite = { __default: [0, parent._duration * 1e3] };
            }
            if (parent._state !== "loaded") {
              parent._state = "loaded";
              parent._emit("load");
              parent._loadQueue();
            }
            self._node.removeEventListener(Howler3._canPlayEvent, self._loadFn, false);
          },
          /**
           * HTML5 Audio ended listener callback.
           */
          _endListener: function() {
            var self = this;
            var parent = self._parent;
            if (parent._duration === Infinity) {
              parent._duration = Math.ceil(self._node.duration * 10) / 10;
              if (parent._sprite.__default[1] === Infinity) {
                parent._sprite.__default[1] = parent._duration * 1e3;
              }
              parent._ended(self);
            }
            self._node.removeEventListener("ended", self._endFn, false);
          }
        };
        var cache = {};
        var loadBuffer = function(self) {
          var url = self._src;
          if (cache[url]) {
            self._duration = cache[url].duration;
            loadSound(self);
            return;
          }
          if (/^data:[^;]+;base64,/.test(url)) {
            var data = atob(url.split(",")[1]);
            var dataView = new Uint8Array(data.length);
            for (var i = 0; i < data.length; ++i) {
              dataView[i] = data.charCodeAt(i);
            }
            decodeAudioData(dataView.buffer, self);
          } else {
            var xhr = new XMLHttpRequest();
            xhr.open(self._xhr.method, url, true);
            xhr.withCredentials = self._xhr.withCredentials;
            xhr.responseType = "arraybuffer";
            if (self._xhr.headers) {
              Object.keys(self._xhr.headers).forEach(function(key) {
                xhr.setRequestHeader(key, self._xhr.headers[key]);
              });
            }
            xhr.onload = function() {
              var code = (xhr.status + "")[0];
              if (code !== "0" && code !== "2" && code !== "3") {
                self._emit("loaderror", null, "Failed loading audio file with status: " + xhr.status + ".");
                return;
              }
              decodeAudioData(xhr.response, self);
            };
            xhr.onerror = function() {
              if (self._webAudio) {
                self._html5 = true;
                self._webAudio = false;
                self._sounds = [];
                delete cache[url];
                self.load();
              }
            };
            safeXhrSend(xhr);
          }
        };
        var safeXhrSend = function(xhr) {
          try {
            xhr.send();
          } catch (e) {
            xhr.onerror();
          }
        };
        var decodeAudioData = function(arraybuffer, self) {
          var error = function() {
            self._emit("loaderror", null, "Decoding audio data failed.");
          };
          var success = function(buffer) {
            if (buffer && self._sounds.length > 0) {
              cache[self._src] = buffer;
              loadSound(self, buffer);
            } else {
              error();
            }
          };
          if (typeof Promise !== "undefined" && Howler3.ctx.decodeAudioData.length === 1) {
            Howler3.ctx.decodeAudioData(arraybuffer).then(success).catch(error);
          } else {
            Howler3.ctx.decodeAudioData(arraybuffer, success, error);
          }
        };
        var loadSound = function(self, buffer) {
          if (buffer && !self._duration) {
            self._duration = buffer.duration;
          }
          if (Object.keys(self._sprite).length === 0) {
            self._sprite = { __default: [0, self._duration * 1e3] };
          }
          if (self._state !== "loaded") {
            self._state = "loaded";
            self._emit("load");
            self._loadQueue();
          }
        };
        var setupAudioContext = function() {
          if (!Howler3.usingWebAudio) {
            return;
          }
          try {
            if (typeof AudioContext !== "undefined") {
              Howler3.ctx = new AudioContext();
            } else if (typeof webkitAudioContext !== "undefined") {
              Howler3.ctx = new webkitAudioContext();
            } else {
              Howler3.usingWebAudio = false;
            }
          } catch (e) {
            Howler3.usingWebAudio = false;
          }
          if (!Howler3.ctx) {
            Howler3.usingWebAudio = false;
          }
          var iOS = /iP(hone|od|ad)/.test(Howler3._navigator && Howler3._navigator.platform);
          var appVersion = Howler3._navigator && Howler3._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
          var version = appVersion ? parseInt(appVersion[1], 10) : null;
          if (iOS && version && version < 9) {
            var safari = /safari/.test(Howler3._navigator && Howler3._navigator.userAgent.toLowerCase());
            if (Howler3._navigator && !safari) {
              Howler3.usingWebAudio = false;
            }
          }
          if (Howler3.usingWebAudio) {
            Howler3.masterGain = typeof Howler3.ctx.createGain === "undefined" ? Howler3.ctx.createGainNode() : Howler3.ctx.createGain();
            Howler3.masterGain.gain.setValueAtTime(Howler3._muted ? 0 : Howler3._volume, Howler3.ctx.currentTime);
            Howler3.masterGain.connect(Howler3.ctx.destination);
          }
          Howler3._setup();
        };
        if (typeof define === "function" && define.amd) {
          define([], function() {
            return {
              Howler: Howler3,
              Howl: Howl3
            };
          });
        }
        if (typeof exports !== "undefined") {
          exports.Howler = Howler3;
          exports.Howl = Howl3;
        }
        if (typeof global !== "undefined") {
          global.HowlerGlobal = HowlerGlobal2;
          global.Howler = Howler3;
          global.Howl = Howl3;
          global.Sound = Sound2;
        } else if (typeof window !== "undefined") {
          window.HowlerGlobal = HowlerGlobal2;
          window.Howler = Howler3;
          window.Howl = Howl3;
          window.Sound = Sound2;
        }
      })();
      (function() {
        "use strict";
        HowlerGlobal.prototype._pos = [0, 0, 0];
        HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];
        HowlerGlobal.prototype.stereo = function(pan) {
          var self = this;
          if (!self.ctx || !self.ctx.listener) {
            return self;
          }
          for (var i = self._howls.length - 1; i >= 0; i--) {
            self._howls[i].stereo(pan);
          }
          return self;
        };
        HowlerGlobal.prototype.pos = function(x, y, z) {
          var self = this;
          if (!self.ctx || !self.ctx.listener) {
            return self;
          }
          y = typeof y !== "number" ? self._pos[1] : y;
          z = typeof z !== "number" ? self._pos[2] : z;
          if (typeof x === "number") {
            self._pos = [x, y, z];
            if (typeof self.ctx.listener.positionX !== "undefined") {
              self.ctx.listener.positionX.setTargetAtTime(self._pos[0], Howler.ctx.currentTime, 0.1);
              self.ctx.listener.positionY.setTargetAtTime(self._pos[1], Howler.ctx.currentTime, 0.1);
              self.ctx.listener.positionZ.setTargetAtTime(self._pos[2], Howler.ctx.currentTime, 0.1);
            } else {
              self.ctx.listener.setPosition(self._pos[0], self._pos[1], self._pos[2]);
            }
          } else {
            return self._pos;
          }
          return self;
        };
        HowlerGlobal.prototype.orientation = function(x, y, z, xUp, yUp, zUp) {
          var self = this;
          if (!self.ctx || !self.ctx.listener) {
            return self;
          }
          var or = self._orientation;
          y = typeof y !== "number" ? or[1] : y;
          z = typeof z !== "number" ? or[2] : z;
          xUp = typeof xUp !== "number" ? or[3] : xUp;
          yUp = typeof yUp !== "number" ? or[4] : yUp;
          zUp = typeof zUp !== "number" ? or[5] : zUp;
          if (typeof x === "number") {
            self._orientation = [x, y, z, xUp, yUp, zUp];
            if (typeof self.ctx.listener.forwardX !== "undefined") {
              self.ctx.listener.forwardX.setTargetAtTime(x, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.forwardY.setTargetAtTime(y, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.forwardZ.setTargetAtTime(z, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.upX.setTargetAtTime(xUp, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.upY.setTargetAtTime(yUp, Howler.ctx.currentTime, 0.1);
              self.ctx.listener.upZ.setTargetAtTime(zUp, Howler.ctx.currentTime, 0.1);
            } else {
              self.ctx.listener.setOrientation(x, y, z, xUp, yUp, zUp);
            }
          } else {
            return or;
          }
          return self;
        };
        Howl.prototype.init = /* @__PURE__ */ (function(_super) {
          return function(o) {
            var self = this;
            self._orientation = o.orientation || [1, 0, 0];
            self._stereo = o.stereo || null;
            self._pos = o.pos || null;
            self._pannerAttr = {
              coneInnerAngle: typeof o.coneInnerAngle !== "undefined" ? o.coneInnerAngle : 360,
              coneOuterAngle: typeof o.coneOuterAngle !== "undefined" ? o.coneOuterAngle : 360,
              coneOuterGain: typeof o.coneOuterGain !== "undefined" ? o.coneOuterGain : 0,
              distanceModel: typeof o.distanceModel !== "undefined" ? o.distanceModel : "inverse",
              maxDistance: typeof o.maxDistance !== "undefined" ? o.maxDistance : 1e4,
              panningModel: typeof o.panningModel !== "undefined" ? o.panningModel : "HRTF",
              refDistance: typeof o.refDistance !== "undefined" ? o.refDistance : 1,
              rolloffFactor: typeof o.rolloffFactor !== "undefined" ? o.rolloffFactor : 1
            };
            self._onstereo = o.onstereo ? [{ fn: o.onstereo }] : [];
            self._onpos = o.onpos ? [{ fn: o.onpos }] : [];
            self._onorientation = o.onorientation ? [{ fn: o.onorientation }] : [];
            return _super.call(this, o);
          };
        })(Howl.prototype.init);
        Howl.prototype.stereo = function(pan, id) {
          var self = this;
          if (!self._webAudio) {
            return self;
          }
          if (self._state !== "loaded") {
            self._queue.push({
              event: "stereo",
              action: function() {
                self.stereo(pan, id);
              }
            });
            return self;
          }
          var pannerType = typeof Howler.ctx.createStereoPanner === "undefined" ? "spatial" : "stereo";
          if (typeof id === "undefined") {
            if (typeof pan === "number") {
              self._stereo = pan;
              self._pos = [pan, 0, 0];
            } else {
              return self._stereo;
            }
          }
          var ids = self._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            var sound2 = self._soundById(ids[i]);
            if (sound2) {
              if (typeof pan === "number") {
                sound2._stereo = pan;
                sound2._pos = [pan, 0, 0];
                if (sound2._node) {
                  sound2._pannerAttr.panningModel = "equalpower";
                  if (!sound2._panner || !sound2._panner.pan) {
                    setupPanner(sound2, pannerType);
                  }
                  if (pannerType === "spatial") {
                    if (typeof sound2._panner.positionX !== "undefined") {
                      sound2._panner.positionX.setValueAtTime(pan, Howler.ctx.currentTime);
                      sound2._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime);
                      sound2._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime);
                    } else {
                      sound2._panner.setPosition(pan, 0, 0);
                    }
                  } else {
                    sound2._panner.pan.setValueAtTime(pan, Howler.ctx.currentTime);
                  }
                }
                self._emit("stereo", sound2._id);
              } else {
                return sound2._stereo;
              }
            }
          }
          return self;
        };
        Howl.prototype.pos = function(x, y, z, id) {
          var self = this;
          if (!self._webAudio) {
            return self;
          }
          if (self._state !== "loaded") {
            self._queue.push({
              event: "pos",
              action: function() {
                self.pos(x, y, z, id);
              }
            });
            return self;
          }
          y = typeof y !== "number" ? 0 : y;
          z = typeof z !== "number" ? -0.5 : z;
          if (typeof id === "undefined") {
            if (typeof x === "number") {
              self._pos = [x, y, z];
            } else {
              return self._pos;
            }
          }
          var ids = self._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            var sound2 = self._soundById(ids[i]);
            if (sound2) {
              if (typeof x === "number") {
                sound2._pos = [x, y, z];
                if (sound2._node) {
                  if (!sound2._panner || sound2._panner.pan) {
                    setupPanner(sound2, "spatial");
                  }
                  if (typeof sound2._panner.positionX !== "undefined") {
                    sound2._panner.positionX.setValueAtTime(x, Howler.ctx.currentTime);
                    sound2._panner.positionY.setValueAtTime(y, Howler.ctx.currentTime);
                    sound2._panner.positionZ.setValueAtTime(z, Howler.ctx.currentTime);
                  } else {
                    sound2._panner.setPosition(x, y, z);
                  }
                }
                self._emit("pos", sound2._id);
              } else {
                return sound2._pos;
              }
            }
          }
          return self;
        };
        Howl.prototype.orientation = function(x, y, z, id) {
          var self = this;
          if (!self._webAudio) {
            return self;
          }
          if (self._state !== "loaded") {
            self._queue.push({
              event: "orientation",
              action: function() {
                self.orientation(x, y, z, id);
              }
            });
            return self;
          }
          y = typeof y !== "number" ? self._orientation[1] : y;
          z = typeof z !== "number" ? self._orientation[2] : z;
          if (typeof id === "undefined") {
            if (typeof x === "number") {
              self._orientation = [x, y, z];
            } else {
              return self._orientation;
            }
          }
          var ids = self._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            var sound2 = self._soundById(ids[i]);
            if (sound2) {
              if (typeof x === "number") {
                sound2._orientation = [x, y, z];
                if (sound2._node) {
                  if (!sound2._panner) {
                    if (!sound2._pos) {
                      sound2._pos = self._pos || [0, 0, -0.5];
                    }
                    setupPanner(sound2, "spatial");
                  }
                  if (typeof sound2._panner.orientationX !== "undefined") {
                    sound2._panner.orientationX.setValueAtTime(x, Howler.ctx.currentTime);
                    sound2._panner.orientationY.setValueAtTime(y, Howler.ctx.currentTime);
                    sound2._panner.orientationZ.setValueAtTime(z, Howler.ctx.currentTime);
                  } else {
                    sound2._panner.setOrientation(x, y, z);
                  }
                }
                self._emit("orientation", sound2._id);
              } else {
                return sound2._orientation;
              }
            }
          }
          return self;
        };
        Howl.prototype.pannerAttr = function() {
          var self = this;
          var args = arguments;
          var o, id, sound2;
          if (!self._webAudio) {
            return self;
          }
          if (args.length === 0) {
            return self._pannerAttr;
          } else if (args.length === 1) {
            if (typeof args[0] === "object") {
              o = args[0];
              if (typeof id === "undefined") {
                if (!o.pannerAttr) {
                  o.pannerAttr = {
                    coneInnerAngle: o.coneInnerAngle,
                    coneOuterAngle: o.coneOuterAngle,
                    coneOuterGain: o.coneOuterGain,
                    distanceModel: o.distanceModel,
                    maxDistance: o.maxDistance,
                    refDistance: o.refDistance,
                    rolloffFactor: o.rolloffFactor,
                    panningModel: o.panningModel
                  };
                }
                self._pannerAttr = {
                  coneInnerAngle: typeof o.pannerAttr.coneInnerAngle !== "undefined" ? o.pannerAttr.coneInnerAngle : self._coneInnerAngle,
                  coneOuterAngle: typeof o.pannerAttr.coneOuterAngle !== "undefined" ? o.pannerAttr.coneOuterAngle : self._coneOuterAngle,
                  coneOuterGain: typeof o.pannerAttr.coneOuterGain !== "undefined" ? o.pannerAttr.coneOuterGain : self._coneOuterGain,
                  distanceModel: typeof o.pannerAttr.distanceModel !== "undefined" ? o.pannerAttr.distanceModel : self._distanceModel,
                  maxDistance: typeof o.pannerAttr.maxDistance !== "undefined" ? o.pannerAttr.maxDistance : self._maxDistance,
                  refDistance: typeof o.pannerAttr.refDistance !== "undefined" ? o.pannerAttr.refDistance : self._refDistance,
                  rolloffFactor: typeof o.pannerAttr.rolloffFactor !== "undefined" ? o.pannerAttr.rolloffFactor : self._rolloffFactor,
                  panningModel: typeof o.pannerAttr.panningModel !== "undefined" ? o.pannerAttr.panningModel : self._panningModel
                };
              }
            } else {
              sound2 = self._soundById(parseInt(args[0], 10));
              return sound2 ? sound2._pannerAttr : self._pannerAttr;
            }
          } else if (args.length === 2) {
            o = args[0];
            id = parseInt(args[1], 10);
          }
          var ids = self._getSoundIds(id);
          for (var i = 0; i < ids.length; i++) {
            sound2 = self._soundById(ids[i]);
            if (sound2) {
              var pa = sound2._pannerAttr;
              pa = {
                coneInnerAngle: typeof o.coneInnerAngle !== "undefined" ? o.coneInnerAngle : pa.coneInnerAngle,
                coneOuterAngle: typeof o.coneOuterAngle !== "undefined" ? o.coneOuterAngle : pa.coneOuterAngle,
                coneOuterGain: typeof o.coneOuterGain !== "undefined" ? o.coneOuterGain : pa.coneOuterGain,
                distanceModel: typeof o.distanceModel !== "undefined" ? o.distanceModel : pa.distanceModel,
                maxDistance: typeof o.maxDistance !== "undefined" ? o.maxDistance : pa.maxDistance,
                refDistance: typeof o.refDistance !== "undefined" ? o.refDistance : pa.refDistance,
                rolloffFactor: typeof o.rolloffFactor !== "undefined" ? o.rolloffFactor : pa.rolloffFactor,
                panningModel: typeof o.panningModel !== "undefined" ? o.panningModel : pa.panningModel
              };
              var panner = sound2._panner;
              if (!panner) {
                if (!sound2._pos) {
                  sound2._pos = self._pos || [0, 0, -0.5];
                }
                setupPanner(sound2, "spatial");
                panner = sound2._panner;
              }
              panner.coneInnerAngle = pa.coneInnerAngle;
              panner.coneOuterAngle = pa.coneOuterAngle;
              panner.coneOuterGain = pa.coneOuterGain;
              panner.distanceModel = pa.distanceModel;
              panner.maxDistance = pa.maxDistance;
              panner.refDistance = pa.refDistance;
              panner.rolloffFactor = pa.rolloffFactor;
              panner.panningModel = pa.panningModel;
            }
          }
          return self;
        };
        Sound.prototype.init = /* @__PURE__ */ (function(_super) {
          return function() {
            var self = this;
            var parent = self._parent;
            self._orientation = parent._orientation;
            self._stereo = parent._stereo;
            self._pos = parent._pos;
            self._pannerAttr = parent._pannerAttr;
            _super.call(this);
            if (self._stereo) {
              parent.stereo(self._stereo);
            } else if (self._pos) {
              parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
            }
          };
        })(Sound.prototype.init);
        Sound.prototype.reset = /* @__PURE__ */ (function(_super) {
          return function() {
            var self = this;
            var parent = self._parent;
            self._orientation = parent._orientation;
            self._stereo = parent._stereo;
            self._pos = parent._pos;
            self._pannerAttr = parent._pannerAttr;
            if (self._stereo) {
              parent.stereo(self._stereo);
            } else if (self._pos) {
              parent.pos(self._pos[0], self._pos[1], self._pos[2], self._id);
            } else if (self._panner) {
              self._panner.disconnect(0);
              self._panner = void 0;
              parent._refreshBuffer(self);
            }
            return _super.call(this);
          };
        })(Sound.prototype.reset);
        var setupPanner = function(sound2, type) {
          type = type || "spatial";
          if (type === "spatial") {
            sound2._panner = Howler.ctx.createPanner();
            sound2._panner.coneInnerAngle = sound2._pannerAttr.coneInnerAngle;
            sound2._panner.coneOuterAngle = sound2._pannerAttr.coneOuterAngle;
            sound2._panner.coneOuterGain = sound2._pannerAttr.coneOuterGain;
            sound2._panner.distanceModel = sound2._pannerAttr.distanceModel;
            sound2._panner.maxDistance = sound2._pannerAttr.maxDistance;
            sound2._panner.refDistance = sound2._pannerAttr.refDistance;
            sound2._panner.rolloffFactor = sound2._pannerAttr.rolloffFactor;
            sound2._panner.panningModel = sound2._pannerAttr.panningModel;
            if (typeof sound2._panner.positionX !== "undefined") {
              sound2._panner.positionX.setValueAtTime(sound2._pos[0], Howler.ctx.currentTime);
              sound2._panner.positionY.setValueAtTime(sound2._pos[1], Howler.ctx.currentTime);
              sound2._panner.positionZ.setValueAtTime(sound2._pos[2], Howler.ctx.currentTime);
            } else {
              sound2._panner.setPosition(sound2._pos[0], sound2._pos[1], sound2._pos[2]);
            }
            if (typeof sound2._panner.orientationX !== "undefined") {
              sound2._panner.orientationX.setValueAtTime(sound2._orientation[0], Howler.ctx.currentTime);
              sound2._panner.orientationY.setValueAtTime(sound2._orientation[1], Howler.ctx.currentTime);
              sound2._panner.orientationZ.setValueAtTime(sound2._orientation[2], Howler.ctx.currentTime);
            } else {
              sound2._panner.setOrientation(sound2._orientation[0], sound2._orientation[1], sound2._orientation[2]);
            }
          } else {
            sound2._panner = Howler.ctx.createStereoPanner();
            sound2._panner.pan.setValueAtTime(sound2._stereo, Howler.ctx.currentTime);
          }
          sound2._panner.connect(sound2._node);
          if (!sound2._paused) {
            sound2._parent.pause(sound2._id, true).play(sound2._id, true);
          }
        };
      })();
    }
  });

  // ../../node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
  var min = Math.min;
  var max = Math.max;
  var round = Math.round;
  var createCoords = (v) => ({
    x: v,
    y: v
  });
  var oppositeSideMap = {
    left: "right",
    right: "left",
    bottom: "top",
    top: "bottom"
  };
  function clamp(start, value, end) {
    return max(start, min(value, end));
  }
  function evaluate(value, param) {
    return typeof value === "function" ? value(param) : value;
  }
  function getSide(placement) {
    return placement.split("-")[0];
  }
  function getAlignment(placement) {
    return placement.split("-")[1];
  }
  function getOppositeAxis(axis) {
    return axis === "x" ? "y" : "x";
  }
  function getAxisLength(axis) {
    return axis === "y" ? "height" : "width";
  }
  function getSideAxis(placement) {
    const firstChar = placement[0];
    return firstChar === "t" || firstChar === "b" ? "y" : "x";
  }
  function getAlignmentAxis(placement) {
    return getOppositeAxis(getSideAxis(placement));
  }
  function getAlignmentSides(placement, rects, rtl) {
    if (rtl === void 0) {
      rtl = false;
    }
    const alignment = getAlignment(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const length = getAxisLength(alignmentAxis);
    let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
    if (rects.reference[length] > rects.floating[length]) {
      mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
    }
    return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
  }
  function getExpandedPlacements(placement) {
    const oppositePlacement = getOppositePlacement(placement);
    return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
  }
  function getOppositeAlignmentPlacement(placement) {
    return placement.includes("start") ? placement.replace("start", "end") : placement.replace("end", "start");
  }
  var lrPlacement = ["left", "right"];
  var rlPlacement = ["right", "left"];
  var tbPlacement = ["top", "bottom"];
  var btPlacement = ["bottom", "top"];
  function getSideList(side, isStart, rtl) {
    switch (side) {
      case "top":
      case "bottom":
        if (rtl) return isStart ? rlPlacement : lrPlacement;
        return isStart ? lrPlacement : rlPlacement;
      case "left":
      case "right":
        return isStart ? tbPlacement : btPlacement;
      default:
        return [];
    }
  }
  function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
    const alignment = getAlignment(placement);
    let list = getSideList(getSide(placement), direction === "start", rtl);
    if (alignment) {
      list = list.map((side) => side + "-" + alignment);
      if (flipAlignment) {
        list = list.concat(list.map(getOppositeAlignmentPlacement));
      }
    }
    return list;
  }
  function getOppositePlacement(placement) {
    const side = getSide(placement);
    return oppositeSideMap[side] + placement.slice(side.length);
  }
  function expandPaddingObject(padding) {
    var _padding$top, _padding$right, _padding$bottom, _padding$left;
    return {
      top: (_padding$top = padding.top) != null ? _padding$top : 0,
      right: (_padding$right = padding.right) != null ? _padding$right : 0,
      bottom: (_padding$bottom = padding.bottom) != null ? _padding$bottom : 0,
      left: (_padding$left = padding.left) != null ? _padding$left : 0
    };
  }
  function getPaddingObject(padding) {
    return typeof padding !== "number" ? expandPaddingObject(padding) : {
      top: padding,
      right: padding,
      bottom: padding,
      left: padding
    };
  }
  function rectToClientRect(rect) {
    const {
      x,
      y,
      width,
      height
    } = rect;
    return {
      width,
      height,
      top: y,
      left: x,
      right: x + width,
      bottom: y + height,
      x,
      y
    };
  }

  // ../../node_modules/@floating-ui/core/dist/floating-ui.core.mjs
  function computeCoordsFromPlacement(_ref, placement, rtl) {
    let {
      reference,
      floating
    } = _ref;
    const sideAxis = getSideAxis(placement);
    const alignmentAxis = getAlignmentAxis(placement);
    const alignLength = getAxisLength(alignmentAxis);
    const side = getSide(placement);
    const isVertical = sideAxis === "y";
    const commonX = reference.x + reference.width / 2 - floating.width / 2;
    const commonY = reference.y + reference.height / 2 - floating.height / 2;
    const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
    let coords;
    switch (side) {
      case "top":
        coords = {
          x: commonX,
          y: reference.y - floating.height
        };
        break;
      case "bottom":
        coords = {
          x: commonX,
          y: reference.y + reference.height
        };
        break;
      case "right":
        coords = {
          x: reference.x + reference.width,
          y: commonY
        };
        break;
      case "left":
        coords = {
          x: reference.x - floating.width,
          y: commonY
        };
        break;
      default:
        coords = {
          x: reference.x,
          y: reference.y
        };
    }
    const alignment = getAlignment(placement);
    if (alignment) {
      coords[alignmentAxis] += commonAlign * (alignment === "end" ? 1 : -1) * (rtl && isVertical ? -1 : 1);
    }
    return coords;
  }
  async function detectOverflow(state2, options) {
    var _await$platform$isEle;
    if (options === void 0) {
      options = {};
    }
    const {
      x,
      y,
      platform: platform2,
      rects,
      elements,
      strategy
    } = state2;
    const {
      boundary = "clippingAncestors",
      rootBoundary = "viewport",
      elementContext = "floating",
      altBoundary = false,
      padding = 0
    } = evaluate(options, state2);
    const paddingObject = getPaddingObject(padding);
    const altContext = elementContext === "floating" ? "reference" : "floating";
    const element = elements[altBoundary ? altContext : elementContext];
    const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
      element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element))) != null ? _await$platform$isEle : true) ? element : element.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
      boundary,
      rootBoundary,
      strategy
    }));
    const rect = elementContext === "floating" ? {
      x,
      y,
      width: rects.floating.width,
      height: rects.floating.height
    } : rects.reference;
    const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
    const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) && await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
      x: 1,
      y: 1
    };
    const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
      elements,
      rect,
      offsetParent,
      strategy
    }) : rect);
    return {
      top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
      bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
      left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
      right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
    };
  }
  var MAX_RESET_COUNT = 50;
  var computePosition = async (reference, floating, config) => {
    const {
      placement = "bottom",
      strategy = "absolute",
      middleware = [],
      platform: platform2
    } = config;
    const platformWithDetectOverflow = platform2.detectOverflow ? platform2 : {
      ...platform2,
      detectOverflow
    };
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
    let rects = await platform2.getElementRects({
      reference,
      floating,
      strategy
    });
    let {
      x,
      y
    } = computeCoordsFromPlacement(rects, placement, rtl);
    let statefulPlacement = placement;
    let resetCount = 0;
    const middlewareData = {};
    for (let i = 0; i < middleware.length; i++) {
      const currentMiddleware = middleware[i];
      if (!currentMiddleware) {
        continue;
      }
      const {
        name,
        fn
      } = currentMiddleware;
      const {
        x: nextX,
        y: nextY,
        data,
        reset
      } = await fn({
        x,
        y,
        initialPlacement: placement,
        placement: statefulPlacement,
        strategy,
        middlewareData,
        rects,
        platform: platformWithDetectOverflow,
        elements: {
          reference,
          floating
        }
      });
      x = nextX != null ? nextX : x;
      y = nextY != null ? nextY : y;
      middlewareData[name] = {
        ...middlewareData[name],
        ...data
      };
      if (reset && resetCount < MAX_RESET_COUNT) {
        resetCount++;
        if (typeof reset === "object") {
          if (reset.placement) {
            statefulPlacement = reset.placement;
          }
          if (reset.rects) {
            rects = reset.rects === true ? await platform2.getElementRects({
              reference,
              floating,
              strategy
            }) : reset.rects;
          }
          ({
            x,
            y
          } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
        }
        i = -1;
      }
    }
    return {
      x,
      y,
      placement: statefulPlacement,
      strategy,
      middlewareData
    };
  };
  var flip = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "flip",
      options,
      async fn(state2) {
        var _middlewareData$arrow, _middlewareData$flip;
        const {
          placement,
          middlewareData,
          rects,
          initialPlacement,
          platform: platform2,
          elements
        } = state2;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = true,
          fallbackPlacements: specifiedFallbackPlacements,
          fallbackStrategy = "bestFit",
          fallbackAxisSideDirection = "none",
          flipAlignment = true,
          ...detectOverflowOptions
        } = evaluate(options, state2);
        if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        const side = getSide(placement);
        const initialSideAxis = getSideAxis(initialPlacement);
        const isBasePlacement = getSide(initialPlacement) === initialPlacement;
        const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
        const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
        const hasFallbackAxisSideDirection = fallbackAxisSideDirection !== "none";
        if (!specifiedFallbackPlacements && hasFallbackAxisSideDirection) {
          fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
        }
        const placements2 = [initialPlacement, ...fallbackPlacements];
        const overflow = await platform2.detectOverflow(state2, detectOverflowOptions);
        const overflows = [];
        let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
        if (checkMainAxis) {
          overflows.push(overflow[side]);
        }
        if (checkCrossAxis) {
          const sides2 = getAlignmentSides(placement, rects, rtl);
          overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
        }
        overflowsData = [...overflowsData, {
          placement,
          overflows
        }];
        if (!overflows.every((side2) => side2 <= 0)) {
          var _middlewareData$flip2, _overflowsData$filter;
          const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
          const nextPlacement = placements2[nextIndex];
          if (nextPlacement) {
            const ignoreCrossAxisOverflow = checkCrossAxis === "alignment" ? initialSideAxis !== getSideAxis(nextPlacement) : false;
            if (!ignoreCrossAxisOverflow || // We leave the current main axis only if every placement on that axis
            // overflows the main axis.
            overflowsData.every((d) => getSideAxis(d.placement) === initialSideAxis ? d.overflows[0] > 0 : true)) {
              return {
                data: {
                  index: nextIndex,
                  overflows: overflowsData
                },
                reset: {
                  placement: nextPlacement
                }
              };
            }
          }
          let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a, b) => a.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
          if (!resetPlacement) {
            switch (fallbackStrategy) {
              case "bestFit": {
                var _overflowsData$filter2;
                const placement2 = (_overflowsData$filter2 = overflowsData.filter((d) => {
                  if (hasFallbackAxisSideDirection) {
                    const currentSideAxis = getSideAxis(d.placement);
                    return currentSideAxis === initialSideAxis || // Create a bias to the `y` side axis due to horizontal
                    // reading directions favoring greater width.
                    currentSideAxis === "y";
                  }
                  return true;
                }).map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a, b) => a[1] - b[1])[0]) == null ? void 0 : _overflowsData$filter2[0];
                if (placement2) {
                  resetPlacement = placement2;
                }
                break;
              }
              case "initialPlacement":
                resetPlacement = initialPlacement;
                break;
            }
          }
          if (placement !== resetPlacement) {
            return {
              reset: {
                placement: resetPlacement
              }
            };
          }
        }
        return {};
      }
    };
  };
  var originSides = /* @__PURE__ */ new Set(["left", "top"]);
  async function convertValueToCoords(state2, options) {
    const {
      placement,
      platform: platform2,
      elements
    } = state2;
    const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
    const side = getSide(placement);
    const alignment = getAlignment(placement);
    const isVertical = getSideAxis(placement) === "y";
    const mainAxisMulti = originSides.has(side) ? -1 : 1;
    const crossAxisMulti = rtl && isVertical ? -1 : 1;
    const rawValue = evaluate(options, state2);
    let {
      mainAxis,
      crossAxis,
      alignmentAxis
    } = typeof rawValue === "number" ? {
      mainAxis: rawValue,
      crossAxis: 0,
      alignmentAxis: null
    } : {
      mainAxis: rawValue.mainAxis || 0,
      crossAxis: rawValue.crossAxis || 0,
      alignmentAxis: rawValue.alignmentAxis
    };
    if (alignment && typeof alignmentAxis === "number") {
      crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
    }
    return isVertical ? {
      x: crossAxis * crossAxisMulti,
      y: mainAxis * mainAxisMulti
    } : {
      x: mainAxis * mainAxisMulti,
      y: crossAxis * crossAxisMulti
    };
  }
  var offset = function(options) {
    if (options === void 0) {
      options = 0;
    }
    return {
      name: "offset",
      options,
      async fn(state2) {
        var _middlewareData$offse, _middlewareData$arrow;
        const {
          x,
          y,
          placement,
          middlewareData
        } = state2;
        const diffCoords = await convertValueToCoords(state2, options);
        if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
          return {};
        }
        return {
          x: x + diffCoords.x,
          y: y + diffCoords.y,
          data: {
            ...diffCoords,
            placement
          }
        };
      }
    };
  };
  var shift = function(options) {
    if (options === void 0) {
      options = {};
    }
    return {
      name: "shift",
      options,
      async fn(state2) {
        const {
          x,
          y,
          placement,
          platform: platform2
        } = state2;
        const {
          mainAxis: checkMainAxis = true,
          crossAxis: checkCrossAxis = false,
          limiter = {
            fn: (_ref) => {
              let {
                x: x2,
                y: y2
              } = _ref;
              return {
                x: x2,
                y: y2
              };
            }
          },
          ...detectOverflowOptions
        } = evaluate(options, state2);
        const coords = {
          x,
          y
        };
        const overflow = await platform2.detectOverflow(state2, detectOverflowOptions);
        const crossAxis = getSideAxis(placement);
        const mainAxis = getOppositeAxis(crossAxis);
        let mainAxisCoord = coords[mainAxis];
        let crossAxisCoord = coords[crossAxis];
        const clampCoord = (axis, coord) => clamp(coord + overflow[axis === "y" ? "top" : "left"], coord, coord - overflow[axis === "y" ? "bottom" : "right"]);
        if (checkMainAxis) {
          mainAxisCoord = clampCoord(mainAxis, mainAxisCoord);
        }
        if (checkCrossAxis) {
          crossAxisCoord = clampCoord(crossAxis, crossAxisCoord);
        }
        const limitedCoords = limiter.fn({
          ...state2,
          [mainAxis]: mainAxisCoord,
          [crossAxis]: crossAxisCoord
        });
        return {
          ...limitedCoords,
          data: {
            x: limitedCoords.x - x,
            y: limitedCoords.y - y,
            enabled: {
              [mainAxis]: checkMainAxis,
              [crossAxis]: checkCrossAxis
            }
          }
        };
      }
    };
  };

  // ../../node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
  function hasWindow() {
    return typeof window !== "undefined";
  }
  function getNodeName(node) {
    if (isNode(node)) {
      return (node.nodeName || "").toLowerCase();
    }
    return "#document";
  }
  function getWindow(node) {
    var _node$ownerDocument;
    return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
  }
  function getDocumentElement(node) {
    var _ref;
    return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
  }
  function isNode(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Node || value instanceof getWindow(value).Node;
  }
  function isElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof Element || value instanceof getWindow(value).Element;
  }
  function isHTMLElement(value) {
    if (!hasWindow()) {
      return false;
    }
    return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
  }
  function isShadowRoot(value) {
    if (!hasWindow() || typeof ShadowRoot === "undefined") {
      return false;
    }
    return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
  }
  function isOverflowElement(element) {
    const {
      overflow,
      overflowX,
      overflowY,
      display
    } = getComputedStyle2(element);
    return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && display !== "inline" && display !== "contents";
  }
  function isTableElement(element) {
    return /^(table|td|th)$/.test(getNodeName(element));
  }
  function isTopLayer(element) {
    try {
      if (element.matches(":popover-open")) {
        return true;
      }
    } catch (_e) {
    }
    try {
      return element.matches(":modal");
    } catch (_e) {
      return false;
    }
  }
  var willChangeRe = /transform|translate|scale|rotate|perspective|filter/;
  var containRe = /paint|layout|strict|content/;
  var isNotNone = (value) => !!value && value !== "none";
  var isWebKitValue;
  function isContainingBlock(elementOrCss) {
    const css = isElement(elementOrCss) ? getComputedStyle2(elementOrCss) : elementOrCss;
    return isNotNone(css.transform) || isNotNone(css.translate) || isNotNone(css.scale) || isNotNone(css.rotate) || isNotNone(css.perspective) || !isWebKit() && (isNotNone(css.backdropFilter) || isNotNone(css.filter)) || willChangeRe.test(css.willChange || "") || containRe.test(css.contain || "");
  }
  function getContainingBlock(element) {
    let currentNode = getParentNode(element);
    while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
      if (isContainingBlock(currentNode)) {
        return currentNode;
      } else if (isTopLayer(currentNode)) {
        return null;
      }
      currentNode = getParentNode(currentNode);
    }
    return null;
  }
  function isWebKit() {
    if (isWebKitValue == null) {
      isWebKitValue = typeof CSS !== "undefined" && CSS.supports && CSS.supports("-webkit-backdrop-filter", "none");
    }
    return isWebKitValue;
  }
  function isLastTraversableNode(node) {
    return /^(html|body|#document)$/.test(getNodeName(node));
  }
  function getComputedStyle2(element) {
    return getWindow(element).getComputedStyle(element);
  }
  function getNodeScroll(element) {
    if (isElement(element)) {
      return {
        scrollLeft: element.scrollLeft,
        scrollTop: element.scrollTop
      };
    }
    return {
      scrollLeft: element.scrollX,
      scrollTop: element.scrollY
    };
  }
  function getParentNode(node) {
    if (getNodeName(node) === "html") {
      return node;
    }
    const result = (
      // Step into the shadow DOM of the parent of a slotted node.
      node.assignedSlot || // DOM Element detected.
      node.parentNode || // ShadowRoot detected.
      isShadowRoot(node) && node.host || // Fallback.
      getDocumentElement(node)
    );
    return isShadowRoot(result) ? result.host : result;
  }
  function getNearestOverflowAncestor(node) {
    const parentNode = getParentNode(node);
    if (isLastTraversableNode(parentNode)) {
      return (node.ownerDocument || node).body;
    }
    if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
      return parentNode;
    }
    return getNearestOverflowAncestor(parentNode);
  }
  function getOverflowAncestors(node, list, traverseIframes) {
    var _node$ownerDocument2;
    if (list === void 0) {
      list = [];
    }
    if (traverseIframes === void 0) {
      traverseIframes = true;
    }
    const scrollableAncestor = getNearestOverflowAncestor(node);
    const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
    const win = getWindow(scrollableAncestor);
    if (isBody) {
      const frameElement = getFrameElement(win);
      return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], frameElement && traverseIframes ? getOverflowAncestors(frameElement) : []);
    } else {
      return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
    }
  }
  function getFrameElement(win) {
    return win.parent && Object.getPrototypeOf(win.parent) ? win.frameElement : null;
  }

  // ../../node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
  function getCssDimensions(element) {
    const css = getComputedStyle2(element);
    let width = parseFloat(css.width) || 0;
    let height = parseFloat(css.height) || 0;
    const hasOffset = isHTMLElement(element);
    const offsetWidth = hasOffset ? element.offsetWidth : width;
    const offsetHeight = hasOffset ? element.offsetHeight : height;
    const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
    if (shouldFallback) {
      width = offsetWidth;
      height = offsetHeight;
    }
    return {
      width,
      height,
      $: shouldFallback
    };
  }
  function unwrapElement(element) {
    return !isElement(element) ? element.contextElement : element;
  }
  function getScale(element) {
    const domElement = unwrapElement(element);
    if (!isHTMLElement(domElement)) {
      return createCoords(1);
    }
    const rect = domElement.getBoundingClientRect();
    const {
      width,
      height,
      $
    } = getCssDimensions(domElement);
    let x = ($ ? round(rect.width) : rect.width) / width;
    let y = ($ ? round(rect.height) : rect.height) / height;
    if (!x || !Number.isFinite(x)) {
      x = 1;
    }
    if (!y || !Number.isFinite(y)) {
      y = 1;
    }
    return {
      x,
      y
    };
  }
  var noOffsets = /* @__PURE__ */ createCoords(0);
  function getVisualOffsets(element) {
    const win = getWindow(element);
    if (!isWebKit() || !win.visualViewport) {
      return noOffsets;
    }
    return {
      x: win.visualViewport.offsetLeft,
      y: win.visualViewport.offsetTop
    };
  }
  function shouldAddVisualOffsets(element, isFixed, floatingOffsetParent) {
    if (isFixed === void 0) {
      isFixed = false;
    }
    return !!floatingOffsetParent && isFixed && floatingOffsetParent === getWindow(element);
  }
  function getBoundingClientRect(element, includeScale, isFixedStrategy, offsetParent) {
    if (includeScale === void 0) {
      includeScale = false;
    }
    if (isFixedStrategy === void 0) {
      isFixedStrategy = false;
    }
    const clientRect = element.getBoundingClientRect();
    const domElement = unwrapElement(element);
    let scale = createCoords(1);
    if (includeScale) {
      if (offsetParent) {
        if (isElement(offsetParent)) {
          scale = getScale(offsetParent);
        }
      } else {
        scale = getScale(element);
      }
    }
    const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
    let x = (clientRect.left + visualOffsets.x) / scale.x;
    let y = (clientRect.top + visualOffsets.y) / scale.y;
    let width = clientRect.width / scale.x;
    let height = clientRect.height / scale.y;
    if (domElement && offsetParent) {
      const win = getWindow(domElement);
      const offsetWin = isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
      let currentWin = win;
      let currentIFrame = getFrameElement(currentWin);
      while (currentIFrame && offsetWin !== currentWin) {
        const iframeScale = getScale(currentIFrame);
        const iframeRect = currentIFrame.getBoundingClientRect();
        const css = getComputedStyle2(currentIFrame);
        const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
        const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
        x *= iframeScale.x;
        y *= iframeScale.y;
        width *= iframeScale.x;
        height *= iframeScale.y;
        x += left;
        y += top;
        currentWin = getWindow(currentIFrame);
        currentIFrame = getFrameElement(currentWin);
      }
    }
    return rectToClientRect({
      width,
      height,
      x,
      y
    });
  }
  function getWindowScrollBarX(element, rect) {
    const leftScroll = getNodeScroll(element).scrollLeft;
    if (!rect) {
      return getBoundingClientRect(getDocumentElement(element)).left + leftScroll;
    }
    return rect.left + leftScroll;
  }
  function getHTMLOffset(documentElement, scroll) {
    const htmlRect = documentElement.getBoundingClientRect();
    const x = htmlRect.left + scroll.scrollLeft - getWindowScrollBarX(documentElement, htmlRect);
    const y = htmlRect.top + scroll.scrollTop;
    return {
      x,
      y
    };
  }
  function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
    let {
      elements,
      rect,
      offsetParent,
      strategy
    } = _ref;
    const isFixed = strategy === "fixed";
    const documentElement = getDocumentElement(offsetParent);
    const topLayer = elements ? isTopLayer(elements.floating) : false;
    if (offsetParent === documentElement || topLayer && isFixed) {
      return rect;
    }
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    let scale = createCoords(1);
    const offsets = createCoords(0);
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    if (isOffsetParentAnElement || !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent);
        scale = getScale(offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    return {
      width: rect.width * scale.x,
      height: rect.height * scale.y,
      x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x + htmlOffset.x,
      y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y + htmlOffset.y
    };
  }
  function getClientRects(element) {
    return element.getClientRects ? Array.from(element.getClientRects()) : [];
  }
  function getDocumentRect(html) {
    const scroll = getNodeScroll(html);
    const body = html.ownerDocument.body;
    const width = max(html.scrollWidth, html.clientWidth, body.scrollWidth, body.clientWidth);
    const height = max(html.scrollHeight, html.clientHeight, body.scrollHeight, body.clientHeight);
    let x = -scroll.scrollLeft + getWindowScrollBarX(html);
    const y = -scroll.scrollTop;
    if (getComputedStyle2(body).direction === "rtl") {
      x += max(html.clientWidth, body.clientWidth) - width;
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  var SCROLLBAR_MAX = 25;
  function getViewportRect(element, strategy, rootBoundary) {
    if (rootBoundary === void 0) {
      rootBoundary = "viewport";
    }
    const isLayoutViewport = rootBoundary === "layoutViewport";
    const win = getWindow(element);
    const html = getDocumentElement(element);
    const visualViewport = win.visualViewport;
    let width = html.clientWidth;
    let height = html.clientHeight;
    let x = 0;
    let y = 0;
    if (visualViewport) {
      const layoutRelativeClientCoords = !isWebKit() || strategy === "fixed";
      if (isLayoutViewport) {
        if (!layoutRelativeClientCoords) {
          x = -visualViewport.offsetLeft;
          y = -visualViewport.offsetTop;
        }
      } else {
        width = visualViewport.width;
        height = visualViewport.height;
        if (layoutRelativeClientCoords) {
          x = visualViewport.offsetLeft;
          y = visualViewport.offsetTop;
        }
      }
    }
    const windowScrollbarX = getWindowScrollBarX(html);
    if (windowScrollbarX <= 0) {
      const doc = html.ownerDocument;
      const body = doc.body;
      const bodyStyles = getComputedStyle(body);
      const bodyMarginInline = doc.compatMode === "CSS1Compat" ? parseFloat(bodyStyles.marginLeft) + parseFloat(bodyStyles.marginRight) || 0 : 0;
      const reservedWidth = Math.abs(html.clientWidth - body.clientWidth - bodyMarginInline);
      const gutter = getComputedStyle(html).scrollbarGutter === "stable both-edges" ? reservedWidth / 2 : reservedWidth;
      if (gutter <= SCROLLBAR_MAX) {
        width -= gutter;
      }
    }
    return {
      width,
      height,
      x,
      y
    };
  }
  function getInnerBoundingClientRect(element, strategy) {
    const clientRect = getBoundingClientRect(element, true, strategy === "fixed");
    const top = clientRect.top + element.clientTop;
    const left = clientRect.left + element.clientLeft;
    const scale = getScale(element);
    const width = element.clientWidth * scale.x;
    const height = element.clientHeight * scale.y;
    const x = left * scale.x;
    const y = top * scale.y;
    return {
      width,
      height,
      x,
      y
    };
  }
  function getClientRectFromClippingAncestor(element, clippingAncestor, strategy) {
    let rect;
    if (clippingAncestor === "viewport" || clippingAncestor === "layoutViewport") {
      rect = getViewportRect(element, strategy, clippingAncestor);
    } else if (clippingAncestor === "document") {
      rect = getDocumentRect(getDocumentElement(element));
    } else if (isElement(clippingAncestor)) {
      rect = getInnerBoundingClientRect(clippingAncestor, strategy);
    } else {
      const visualOffsets = getVisualOffsets(element);
      rect = {
        x: clippingAncestor.x - visualOffsets.x,
        y: clippingAncestor.y - visualOffsets.y,
        width: clippingAncestor.width,
        height: clippingAncestor.height
      };
    }
    return rectToClientRect(rect);
  }
  function getClippingElementAncestors(element, cache) {
    const cachedResult = cache.get(element);
    if (cachedResult) {
      return cachedResult;
    }
    let result = getOverflowAncestors(element, [], false).filter((el2) => isElement(el2) && getNodeName(el2) !== "body");
    let lastKeptComputedStyle = null;
    const elementIsFixed = getComputedStyle2(element).position === "fixed";
    let currentNode = elementIsFixed ? getParentNode(element) : element;
    while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
      const computedStyle = getComputedStyle2(currentNode);
      const currentNodeIsContaining = isContainingBlock(currentNode);
      const lastPosition = lastKeptComputedStyle ? lastKeptComputedStyle.position : elementIsFixed ? "fixed" : "";
      const shouldDropCurrentNode = !currentNodeIsContaining && (lastPosition === "fixed" || lastPosition === "absolute" && computedStyle.position === "static");
      if (shouldDropCurrentNode) {
        result = result.filter((ancestor) => ancestor !== currentNode);
      } else {
        lastKeptComputedStyle = computedStyle;
      }
      currentNode = getParentNode(currentNode);
    }
    cache.set(element, result);
    return result;
  }
  function getClippingRect(_ref) {
    let {
      element,
      boundary,
      rootBoundary,
      strategy
    } = _ref;
    const elementClippingAncestors = boundary === "clippingAncestors" ? isTopLayer(element) ? [] : getClippingElementAncestors(element, this._c) : [].concat(boundary);
    const clippingAncestors = [...elementClippingAncestors, rootBoundary];
    const firstRect = getClientRectFromClippingAncestor(element, clippingAncestors[0], strategy);
    let top = firstRect.top;
    let right = firstRect.right;
    let bottom = firstRect.bottom;
    let left = firstRect.left;
    for (let i = 1; i < clippingAncestors.length; i++) {
      const rect = getClientRectFromClippingAncestor(element, clippingAncestors[i], strategy);
      top = max(rect.top, top);
      right = min(rect.right, right);
      bottom = min(rect.bottom, bottom);
      left = max(rect.left, left);
    }
    return {
      width: right - left,
      height: bottom - top,
      x: left,
      y: top
    };
  }
  function getDimensions(element) {
    const {
      width,
      height
    } = getCssDimensions(element);
    return {
      width,
      height
    };
  }
  function getRectRelativeToOffsetParent(element, offsetParent, strategy) {
    const isOffsetParentAnElement = isHTMLElement(offsetParent);
    const documentElement = getDocumentElement(offsetParent);
    const isFixed = strategy === "fixed";
    const rect = getBoundingClientRect(element, true, isFixed, offsetParent);
    let scroll = {
      scrollLeft: 0,
      scrollTop: 0
    };
    const offsets = createCoords(0);
    if (isOffsetParentAnElement || !isFixed) {
      if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
        scroll = getNodeScroll(offsetParent);
      }
      if (isOffsetParentAnElement) {
        const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
        offsets.x = offsetRect.x + offsetParent.clientLeft;
        offsets.y = offsetRect.y + offsetParent.clientTop;
      }
    }
    if (!isOffsetParentAnElement && documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
    const htmlOffset = documentElement && !isOffsetParentAnElement && !isFixed ? getHTMLOffset(documentElement, scroll) : createCoords(0);
    const x = rect.left + scroll.scrollLeft - offsets.x - htmlOffset.x;
    const y = rect.top + scroll.scrollTop - offsets.y - htmlOffset.y;
    return {
      x,
      y,
      width: rect.width,
      height: rect.height
    };
  }
  function isStaticPositioned(element) {
    return getComputedStyle2(element).position === "static";
  }
  function getTrueOffsetParent(element, polyfill) {
    if (!isHTMLElement(element) || getComputedStyle2(element).position === "fixed") {
      return null;
    }
    if (polyfill) {
      return polyfill(element);
    }
    let rawOffsetParent = element.offsetParent;
    if (getDocumentElement(element) === rawOffsetParent) {
      rawOffsetParent = rawOffsetParent.ownerDocument.body;
    }
    return rawOffsetParent;
  }
  function getOffsetParent(element, polyfill) {
    const win = getWindow(element);
    if (isTopLayer(element)) {
      return win;
    }
    if (!isHTMLElement(element)) {
      let svgOffsetParent = getParentNode(element);
      while (svgOffsetParent && !isLastTraversableNode(svgOffsetParent)) {
        if (isElement(svgOffsetParent) && !isStaticPositioned(svgOffsetParent)) {
          return svgOffsetParent;
        }
        svgOffsetParent = getParentNode(svgOffsetParent);
      }
      return win;
    }
    let offsetParent = getTrueOffsetParent(element, polyfill);
    while (offsetParent && isTableElement(offsetParent) && isStaticPositioned(offsetParent)) {
      offsetParent = getTrueOffsetParent(offsetParent, polyfill);
    }
    if (offsetParent && isLastTraversableNode(offsetParent) && isStaticPositioned(offsetParent) && !isContainingBlock(offsetParent)) {
      return win;
    }
    return offsetParent || getContainingBlock(element) || win;
  }
  var getElementRects = async function(data) {
    const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
    const getDimensionsFn = this.getDimensions;
    const floatingDimensions = await getDimensionsFn(data.floating);
    return {
      reference: getRectRelativeToOffsetParent(data.reference, await getOffsetParentFn(data.floating), data.strategy),
      floating: {
        x: 0,
        y: 0,
        width: floatingDimensions.width,
        height: floatingDimensions.height
      }
    };
  };
  function isRTL(element) {
    return getComputedStyle2(element).direction === "rtl";
  }
  var platform = {
    convertOffsetParentRelativeRectToViewportRelativeRect,
    getDocumentElement,
    getClippingRect,
    getOffsetParent,
    getElementRects,
    getClientRects,
    getDimensions,
    getScale,
    isElement,
    isRTL
  };
  var offset2 = offset;
  var shift2 = shift;
  var flip2 = flip;
  var computePosition2 = (reference, floating, options) => {
    const cache = /* @__PURE__ */ new Map();
    const mergedOptions = options != null ? options : {};
    const platformWithCache = {
      ...platform,
      ...mergedOptions.platform,
      _c: cache
    };
    return computePosition(reference, floating, {
      ...mergedOptions,
      platform: platformWithCache
    });
  };

  // src/Components/ui.js
  function el(tag, cls = "", text = "") {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }
  function icon(name, cls = "") {
    const i = el("img", "ui-icon " + cls);
    i.src = `ui/icons/${name}.svg`;
    i.alt = "";
    i.setAttribute("aria-hidden", "true");
    return i;
  }
  function button(text, fn, { kind = "", icon: ico, disabled = false, tip } = {}) {
    const b = el("button", `ui-button ${kind}`);
    b.type = "button";
    b.setAttribute("aria-label", text);
    if (ico) b.append(icon(ico));
    b.append(el("span", "", text));
    b.disabled = disabled;
    b.onclick = fn;
    if (tip) tooltip(b, tip);
    return b;
  }
  function ornament() {
    const x = el("img", "ornament");
    x.src = "ui/textures/ornament.svg";
    x.alt = "";
    return x;
  }
  function tooltip(anchor, content) {
    const tip = document.getElementById("tooltip");
    const show = async () => {
      tip.textContent = content;
      tip.hidden = false;
      anchor.setAttribute("aria-describedby", "tooltip");
      const p = await computePosition2(anchor, tip, { placement: "top", strategy: "fixed", middleware: [offset2(12), flip2(), shift2({ padding: 16 })] });
      Object.assign(tip.style, { left: p.x + "px", top: p.y + "px" });
    };
    const hide2 = () => {
      tip.hidden = true;
      anchor.removeAttribute("aria-describedby");
    };
    anchor.addEventListener("mouseenter", show);
    anchor.addEventListener("focus", show);
    anchor.addEventListener("mouseleave", hide2);
    anchor.addEventListener("blur", hide2);
  }
  function modal(title, { wide = false, onClose, canClose = () => true } = {}) {
    const previous = document.activeElement, d = el("dialog", "ui-modal ornamented" + (wide ? " wide" : "")), head = el("header", "modal-heading");
    head.append(el("h2", "", title), button("\xD7", () => {
      if (canClose()) d.close();
    }, { kind: "icon-button", tip: "Fechar janela" }));
    d.append(head, ornament());
    const body = el("div", "modal-content");
    d.append(body);
    document.getElementById("overlays").append(d);
    d.addEventListener("cancel", (e) => {
      if (!canClose()) e.preventDefault();
    });
    d.addEventListener("close", () => {
      d.remove();
      previous?.focus();
      onClose?.();
    });
    d.addEventListener("click", (e) => {
      if (e.target === d && canClose()) {
        const r = d.getBoundingClientRect();
        if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) d.close();
      }
    });
    d.showModal();
    return { dialog: d, body };
  }
  function meter(value, max2, label, cls = "") {
    const box = el("div", "meter " + cls), text = el("div", "meter-label");
    text.append(el("span", "", label), el("span", "", `${value} / ${max2}`));
    const track = el("div", "meter-track"), fill = el("div", "meter-fill");
    fill.style.width = Math.max(0, Math.min(100, value / max2 * 100)) + "%";
    track.append(fill);
    track.setAttribute("role", "meter");
    track.setAttribute("aria-label", label);
    track.setAttribute("aria-valuenow", value);
    track.setAttribute("aria-valuemin", "0");
    track.setAttribute("aria-valuemax", max2);
    box.append(text, track);
    return box;
  }
  function choice(text, n, fn) {
    const b = el("button", "dialogue-choice");
    b.append(el("span", "choice-number", String(n) + "."), el("span", "", text));
    b.onclick = fn;
    return b;
  }
  function die(number = "20", sides2 = 20) {
    const b = el("div", "die");
    b.setAttribute("aria-label", `Dado de ${sides2} lados`);
    b.innerHTML = '<svg viewBox="0 0 220 240" aria-hidden="true"><defs><linearGradient id="dieFace" x2="1" y2="1"><stop stop-color="#a84f3e"/><stop offset=".45" stop-color="#5f1f28"/><stop offset="1" stop-color="#220e1c"/></linearGradient></defs><path d="M110 5 205 62v116l-95 57-95-57V62Z" fill="url(#dieFace)" stroke="#d0ad70" stroke-width="3"/><path d="M110 5 62 82l-47-20m95-57 48 77 47-20M62 82h96l-48 85ZM15 178l47-96 48 153 48-153 47 96-95-11Z" fill="none" stroke="#d7a96b" stroke-opacity=".55" stroke-width="2"/></svg>';
    b.append(el("strong", "die-number", String(number)));
    return b;
  }

  // src/Components/cryptogram.js
  var import_cryptogram = __toESM(require_cryptogram());
  function renderGateTutorial(stage, { onStart }) {
    stage.classList.add("gate-stage");
    const panel = el("section", "gate-panel gate-tutorial");
    panel.setAttribute("aria-labelledby", "gate-title");
    const title = el("h2", "", "O selo do port\xE3o");
    title.id = "gate-title";
    panel.append(el("p", "eyebrow", "ANTES DE DECIFRAR"), title, ornament(), el("p", "", "Cada n\xFAmero representa uma letra. N\xFAmeros iguais sempre recebem a mesma letra; n\xFAmeros diferentes recebem letras diferentes."), el("p", "", "Por exemplo, se 4 = A e 9 = S, a sequ\xEAncia 4 \xB7 9 \xB7 4 forma ASA. Este exemplo n\xE3o \xE9 a chave do port\xE3o."), el("p", "", "Preencha as letras nas casas. As repeti\xE7\xF5es ser\xE3o completadas juntas. As letras A e E j\xE1 est\xE3o gravadas na pedra; os espa\xE7os separam as palavras."), el("p", "", "Ao terminar, confira a inscri\xE7\xE3o e escolha como usar sua mensagem para abrir a passagem. Se precisar, h\xE1 tr\xEAs dicas, sem limite de tentativas."), el("p", "gate-banter", "Gale: \u201CUma cifra por substitui\xE7\xE3o. Finalmente, uma porta disposta a receber uma resposta por escrito.\u201D"), button("Entendi. Examinar o criptograma", onStart, { kind: "primary" }));
    stage.append(panel);
  }
  function renderCryptogram(stage, { gate, onSave, onOpen, onSound, onTutorial }) {
    stage.classList.add("gate-stage");
    const panel = el("section", "gate-panel");
    panel.setAttribute("aria-labelledby", "gate-title");
    const title = el("h2", "", "A inscri\xE7\xE3o cifrada");
    title.id = "gate-title";
    const feedback = el("p", "gate-feedback");
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-live", "polite");
    feedback.tabIndex = -1;
    const report = (text) => {
      feedback.textContent = text;
    };
    panel.append(el("p", "eyebrow", "PORT\xC3O DO CASTELO"), title, ornament());
    if (gate.solved) {
      panel.append(el("p", "", "A luz percorre a pedra e revela a passagem. O mecanismo cede."), el("p", "gate-banter", "Karlach: \u201CUma porta que abre com fogo sem precisar pegar fogo. Gostei. Um pouco decepcionante, mas gostei.\u201D"), button("Atravessar o port\xE3o", onOpen, { kind: "primary" }));
      stage.append(panel);
      return;
    }
    if (gate.decoded) {
      panel.append(el("p", "gate-solution", "A LUZ DA TOCHA REVELA A PASSAGEM"), el("p", "", "O selo aguarda uma a\xE7\xE3o. Como voc\xEA interpreta a inscri\xE7\xE3o?"));
      const actions = el("div", "gate-actions");
      actions.append(button("Erguer a tocha diante do selo", () => {
        gate.solved = true;
        onSave();
        onSound("discovery");
        renderAgain();
      }, { kind: "primary" }), button("Encostar o astrol\xE1bio na fechadura", () => {
        onSound("failure");
        report("A fechadura n\xE3o reage. Gale recolhe o astrol\xE1bio: \u201CDepois do que passamos para recuperar isso, prefiro n\xE3o us\xE1-lo como chave de fenda.\u201D");
      }), button("Pedir para Karlach empurrar", () => {
        onSound("failure");
        report("A pedra n\xE3o cede. Karlach cruza os bra\xE7os: \u201CT\xE1. A porta quer que eu leia. Sempre tem uma exig\xEAncia absurda.\u201D");
      }));
      panel.append(actions, feedback);
      stage.append(panel);
      return;
    }
    panel.append(el("p", "gate-intro", "Decifre a mensagem gravada na pedra. Uma letra escolhida preenche todas as ocorr\xEAncias daquele n\xFAmero."));
    const form = el("form", "cryptogram-form"), board = el("div", "cryptogram-board");
    board.setAttribute("role", "group");
    board.setAttribute("aria-label", "Mensagem cifrada");
    const fields = [];
    for (const [wordIndex, word] of import_cryptogram.WORDS.entries()) {
      const group = el("div", "cipher-word");
      group.setAttribute("role", "group");
      group.setAttribute("aria-label", `Palavra ${wordIndex + 1}, ${word.length} letras`);
      for (const [index, code] of word.entries()) {
        const cell = el("label", "cipher-cell" + (import_cryptogram.GIVEN[code] ? " given" : "")), number = el("span", "cipher-number", String(code)), input = el("input", "cipher-letter");
        input.type = "text";
        input.autocomplete = "off";
        input.spellcheck = false;
        input.inputMode = "text";
        input.maxLength = 1;
        input.value = import_cryptogram.GIVEN[code] || gate.entries[code] || "";
        input.dataset.code = String(code);
        input.setAttribute("aria-label", `Palavra ${wordIndex + 1}, letra ${index + 1}, n\xFAmero ${code}${import_cryptogram.GIVEN[code] ? ", letra " + import_cryptogram.GIVEN[code] + " j\xE1 gravada" : ""}`);
        if (import_cryptogram.GIVEN[code]) {
          input.readOnly = true;
          input.tabIndex = -1;
        } else {
          input.oninput = () => {
            const letter2 = (0, import_cryptogram.normalizeLetter)(input.value);
            if (letter2 && import_cryptogram.CODES.some((other) => other !== code && (import_cryptogram.GIVEN[other] || gate.entries[other]) === letter2)) {
              input.value = gate.entries[code] || "";
              report(`A letra ${letter2} j\xE1 pertence a outro n\xFAmero. Apague a associa\xE7\xE3o anterior para troc\xE1-la.`);
              return;
            }
            gate.entries[code] = letter2;
            for (const field of fields) if (field.dataset.code === String(code)) field.value = letter2;
            onSave();
            report("");
            updateKey();
          };
        }
        fields.push(input);
        cell.append(number, input);
        group.append(cell);
      }
      board.append(group);
    }
    const key = el("div", "cipher-key");
    key.setAttribute("aria-label", "Suas associa\xE7\xF5es de n\xFAmeros e letras");
    const updateKey = () => {
      key.replaceChildren();
      for (const code of import_cryptogram.CODES) key.append(el("span", "", `${code} = ${import_cryptogram.GIVEN[code] || gate.entries[code] || "\u2014"}`));
    };
    updateKey();
    const controls = el("div", "gate-controls");
    const check = button("Conferir inscri\xE7\xE3o", () => {
    }, { kind: "primary" });
    check.type = "submit";
    controls.append(check, button("Dica", () => {
      gate.hints = Math.min(3, gate.hints + 1);
      onSave();
      renderAgain();
    }), button("Limpar minhas letras", () => {
      gate.entries = { ...import_cryptogram.GIVEN };
      onSave();
      renderAgain();
    }, { kind: "ghost" }), button("Rever orienta\xE7\xE3o", onTutorial, { kind: "ghost" }));
    form.onsubmit = (e) => {
      e.preventDefault();
      const status = (0, import_cryptogram.evaluateGate)(gate.entries);
      if (status === "solved") {
        gate.decoded = true;
        onSave();
        onSound("success");
        renderAgain();
        return;
      }
      gate.attempts++;
      onSave();
      onSound("failure");
      report(status === "incomplete" ? "Ainda h\xE1 letras em branco. Voc\xEA pode conferir suas associa\xE7\xF5es abaixo." : status === "conflict" ? "Uma letra est\xE1 ligada a n\xFAmeros diferentes. Cada n\xFAmero precisa da sua pr\xF3pria letra." : "A inscri\xE7\xE3o ainda n\xE3o faz sentido. Reveja as palavras; suas letras foram mantidas.");
      feedback.focus();
    };
    form.append(board, key, controls, feedback);
    panel.append(form);
    if (gate.hints) {
      const hints = el("aside", "gate-hints");
      hints.setAttribute("aria-label", "Dicas reveladas");
      for (let i = 0; i < gate.hints; i++) hints.append(el("p", "", `Dica ${i + 1}: ${import_cryptogram.HINTS[i]}`));
      panel.append(hints);
    }
    stage.append(panel);
    function renderAgain() {
      panel.remove();
      renderCryptogram(stage, { gate, onSave, onOpen, onSound, onTutorial });
    }
  }

  // src/main.js
  var import_cryptogram4 = __toESM(require_cryptogram());

  // src/Themes/art.js
  var ART = {
    enemy: (id) => `ui/enemies/${id}-bg3.webp`,
    emoticon: (id) => `ui/emoticons/${id === "astarion" ? "astariondisapprove" : "galelove"}-display.png`,
    character: (id) => `ui/characters/${id}-painted-portrait.webp`,
    avatar: (id) => `ui/characters/${id}-painted-avatar.webp`,
    background: (scene) => `ui/backgrounds/${scene}-scene.webp`
  };

  // src/Animations/transitions.js
  var cached = /* @__PURE__ */ new Map();
  function preloadImage(src) {
    if (cached.has(src)) return cached.get(src);
    const task = new Promise((resolve2) => {
      const image = new Image();
      let timer;
      const finish = () => {
        clearTimeout(timer);
        resolve2();
      };
      image.onload = finish;
      image.onerror = finish;
      timer = setTimeout(finish, 4500);
      image.src = src;
      if (image.complete) finish();
    });
    cached.set(src, task);
    return task;
  }
  async function prepareScene(scene) {
    await Promise.all([ART.background(scene.background), ...["astarion", "gale", "shadowheart", "karlach"].map(ART.character), ...scene.battle ? [ART.enemy(scene.battle)] : []].map(preloadImage));
    if (document.fonts) await Promise.race([document.fonts.ready, new Promise((resolve2) => setTimeout(resolve2, 1500))]);
  }
  var pause = (ms) => new Promise((resolve2) => setTimeout(resolve2, ms));

  // src/Screens/story.js
  var CONFIG = { title: "A \xFAltima vig\xEDlia", message: `Tentei escrever esse texto umas 100x KKKKKKK

Eu s\xF3 quero que saiba que eu sempre vou estar aqui por voc\xEA, Ketlyn Andressa. Eu estou muito feliz por ter conhecido voc\xEA. Sabe, voc\xEA \xE9 incr\xEDvel, Ketlyn, uma pessoa especial para mim e para os outros. Voc\xEA passou por tanto e luta todos os dias para ficar melhor. Seu esfor\xE7o n\xE3o ser\xE1 em v\xE3o, e eu vejo isso. Voc\xEA \xE9 t\xE3o forte.

Al\xE9m de ser uma pessoa carinhosa, voc\xEA se importa com quem est\xE1 pr\xF3ximo de voc\xEA. \xC9 uma pessoa divertida, que faz os outros sorrirem e consegue tornar os momentos mais leves. Voc\xEA \xE9 atenciosa, tem um cora\xE7\xE3o enorme, mesmo voc\xEA negando isso tudo kkkk voc\xEA sabe fazer as pessoas se sentirem importantes e, mesmo com tudo que j\xE1 passou, continua tentando seguir em frente e ser uma pessoa melhor.

Eu agrade\xE7o muito por ter essa amizade com voc\xEA... Como eu disse para voc\xEA, voc\xEA preencheu um vazio em mim. Eu realmente estava preso em uma solid\xE3o, e ter voc\xEA na minha vida mudou isso. Eu quero retribuir, sabe? Voc\xEA merece todo o amor do mundo, e tudo o que estou fazendo \xE9 para te provar isso.

Demonstrar amor \xE9 baseado em a\xE7\xF5es, sabe? N\xE3o s\xE3o apenas bens materiais dados a outra pessoa ou mostrar para as outras pessoas que voc\xEA tem v\xEDnculo com algu\xE9m. S\xE3o a\xE7\xF5es, esfor\xE7os, troca de energia, sacrif\xEDcios e, muitas vezes, deixar um diamante seguir o seu caminho, por mais que doa.

Eu espero que tenha se divertido, meu bem. Eu realmente coloquei a minha alma em tudo isso. Voc\xEA merece ter pessoas na sua vida que estejam dispostas a te amar e a fazer qualquer coisa por voc\xEA, a te perdoar a qualquer momento e a te apoiar at\xE9 nos momentos dif\xEDceis, sem te julgar ou tentar dar pitaco nas suas decis\xF5es.

E isso n\xE3o \xE9 sobre relacionamento. \xC9 sobre a sua vida mesmo. Qualquer pessoa que esteja na sua vida deveria ser capaz de te oferecer isso.

Bom, espero que aproveite o seu presente, meu amor. Nunca fiquei t\xE3o feliz por dedicar tanto a algu\xE9m, porque eu sei que esse algu\xE9m vale a pena. Independentemente do que formos, sempre valer\xE1 a pena.

Te amo, Ketlyn Andressa. Feliz anivers\xE1rio! \u2764\uFE0F`, reveal: "Olhe a sua Steam donzelakkkkk", memeAudio: "ui/audio/faaah-final.mp3" };
  var CHARACTERS = { Astarion: { id: "astarion", role: "Elfo \xB7 Ladino", color: "#9b5759" }, Gale: { id: "gale", role: "Humano \xB7 Mago", color: "#8d7baf" }, Shadowheart: { id: "shadowheart", role: "Meio-elfa \xB7 Cl\xE9riga", color: "#81a19e" }, Karlach: { id: "karlach", role: "Tiefling \xB7 B\xE1rbara", color: "#bd7953" } };
  var SCENES = {
    camp: { title: "Uma aus\xEAncia inconveniente", location: "Acampamento", background: "camp", objective: "Descobrir o que desapareceu.", next: "path", lines: [
      ["Astarion", "Ah, {nome}. Excelente. Est\xE1vamos justamente precisando de algu\xE9m capaz de encontrar um objeto sem transformar a busca numa palestra."],
      ["Gale", "O astrol\xE1bio de prata desapareceu. Ele estava entre os objetos recuperados na estrada. Agora h\xE1 pegadas saindo do acampamento e um res\xEDduo de magia necrom\xE2ntica na bolsa."],
      ["Shadowheart", "Tamb\xE9m encontramos isso: um peda\xE7o de tecido preso na cerca. Cheira a terra de cemit\xE9rio. E a decis\xF5es ruins."],
      ["Karlach", "As pegadas v\xE3o para a Vila Arruinada. Uma caminhada, um pouco de aventura\u2026 J\xE1 tivemos noites piores."],
      ["Astarion", "Sim. E algumas delas come\xE7aram exatamente com essa frase. Voc\xEA vem?", [
        ["Vou. Mas voc\xEA procura as armadilhas.", "Com prazer. Prefiro encontr\xE1-las antes que algu\xE9m decida test\xE1-las com o pr\xF3prio rosto.", "careful"],
        ["Um objeto prateado? Achei que voc\xEA saberia onde est\xE1.", "Uma acusa\xE7\xE3o elegante. Infundada, naturalmente. Eu teria escolhido algo mais f\xE1cil de vender.", "tease"],
        ["Gale, por que precisamos desse astrol\xE1bio?", "Ele registra alinhamentos m\xE1gicos. Nas m\xE3os erradas, pode indicar lugares que seria prudente manter esquecidos.", "curious"]
      ]]
    ] },
    path: { title: "O caminho entre as \xE1rvores", location: "Arredores da Vila Arruinada", background: "journey", objective: "Seguir os rastros at\xE9 as ru\xEDnas.", next: "ruins", lines: [
      ["Narrador", "A trilha deixa a estrada para tr\xE1s. As pegadas ficam mais profundas, como se aquilo que as fez carregasse um peso que n\xE3o tinha no come\xE7o."],
      ["Gale", "Vejam a vegeta\xE7\xE3o. As ra\xEDzes crescem em dire\xE7\xE3o \xE0 mesma encosta. Alguma fonte de magia est\xE1 atraindo tudo para l\xE1."],
      ["Astarion", "Maravilhoso. At\xE9 as plantas est\xE3o indo voluntariamente para o lugar sinistro. Finalmente encontramos companhia com o nosso discernimento."],
      ["Shadowheart", "H\xE1 uma constru\xE7\xE3o no alto da encosta. Ou o que sobrou dela. Os rastros continuam pelo port\xE3o."],
      ["Karlach", "Ent\xE3o \xE9 por ali. Fiquem perto. Se alguma pedra tentar morder voc\xEAs, eu mordo de volta."]
    ] },
    ruins: { title: "O que ainda guarda o port\xE3o", location: "Ru\xEDnas da encosta", background: "ruins", objective: "Abrir caminho pelo antigo p\xE1tio.", next: "dark", battle: "skeletons", lines: [
      ["Narrador", "Al\xE9m do port\xE3o partido, duas figuras se erguem entre os escombros. Ossos raspam em metal enferrujado. Um fio de luz prateada pulsa entre suas costelas."],
      ["Astarion", "Ah. Os moradores. Eu sugeriria conversar, mas parecem ter deixado a l\xEDngua em outro lugar."],
      ["Gale", "O astrol\xE1bio est\xE1 alimentando alguma coisa abaixo destas ru\xEDnas. Esses guardas n\xE3o estavam despertos h\xE1 muito tempo."],
      ["Karlach", "Ent\xE3o vamos devolver os dois ao descanso. {nome}, escolha uma abertura. A gente acompanha voc\xEA."]
    ] },
    dark: { title: "Onde a luz n\xE3o alcan\xE7a", location: "Passagem sob as ru\xEDnas", background: "tomb", objective: "Localizar a entrada da tumba.", next: "tomb", lines: [
      ["Narrador", "O \xFAltimo guarda desaba. Sob as ra\xEDzes do p\xE1tio, uma escada leva a um corredor que n\xE3o deveria caber dentro da colina. O ar cheira a pedra molhada."],
      ["Shadowheart", "Esses entalhes n\xE3o s\xE3o de uma despensa. Estamos entrando numa tumba. E algu\xE9m trabalhou bastante para que ningu\xE9m a encontrasse."],
      ["Astarion", "Uma porta escondida, mortos inquietos e nenhum anfitri\xE3o. Talvez dev\xEAssemos considerar a possibilidade de n\xE3o sermos bem-vindos."],
      ["Gale", "O rastro termina logo adiante. Se deixarmos o astrol\xE1bio aqui, o que despertou continuar\xE1 recebendo energia."],
      ["Astarion", "\xC9 claro. A alternativa sensata seria conveniente demais. O que voc\xEA acha, {nome}?", [
        ["Entramos juntos. Ningu\xE9m fica para tr\xE1s.", "Juntos, ent\xE3o. Mas se alguma coisa se agarrar a mim, vou esperar uma ajuda muito r\xE1pida.", "together"],
        ["S\xF3 uma olhada. Depois decidimos.", "A frase favorita de quem acaba abrindo sarc\xF3fagos. Muito bem. Uma olhada extremamente cuidadosa.", "peek"],
        ["Estou com medo. Ainda assim, vou entrar.", "Bom. O medo costuma notar coisas que a coragem pisa em cima. N\xE3o o desperdice.", "honest"]
      ]]
    ] },
    tomb: { title: "A \xFAltima vig\xEDlia", location: "Tumba do vigia sem nome", background: "tomb", objective: "Enfrentar o guardi\xE3o do relic\xE1rio.", next: "victory", battle: "warden", lines: [
      ["Narrador", "A porta cede. No centro da c\xE2mara, uma armadura vazia se ajoelha diante de um ba\xFA. O astrol\xE1bio brilha encaixado em seu peitoral. Ent\xE3o o elmo se volta para voc\xEA."],
      ["Narrador", "Do astrol\xE1bio ecoa uma voz antiga: \u201CNenhuma m\xE3o levar\xE1 o que foi confiado \xE0 minha vig\xEDlia.\u201D"],
      ["Gale", "O objeto est\xE1 preso a um juramento antigo. N\xE3o foi um roubo deliberado\u2026 o encantamento o chamou para substituir sua fonte de energia."],
      ["Astarion", "Um equ\xEDvoco perfeitamente compreens\xEDvel. Devolva o astrol\xE1bio e teremos a bondade de n\xE3o comentar sua falta de hospitalidade."],
      ["Narrador", "O juramento ressoa no astrol\xE1bio: \u201CMinha vig\xEDlia n\xE3o termina.\u201D A armadura ergue a l\xE2mina."],
      ["Karlach", "Talvez voc\xEA s\xF3 precise de uma folga. A gente vai ajudar a encerrar o expediente."]
    ] },
    victory: { title: "Sil\xEAncio, enfim", location: "C\xE2mara do relic\xE1rio", background: "tomb", objective: "Examinar o ba\xFA atr\xE1s do guardi\xE3o.", next: "chest", lines: [
      ["Narrador", "A luz se desprende da armadura. As placas tocam o ch\xE3o, uma a uma. Voc\xEA recupera o astrol\xE1bio; o ar da tumba finalmente deixa de pesar sobre seus ombros."],
      ["Narrador", "Uma \xFAltima lembran\xE7a escapa do relic\xE1rio: \u201CA vig\xEDlia\u2026 terminou.\u201D"],
      ["Shadowheart", "Que encontre algum descanso. E que n\xF3s encontremos uma sa\xEDda menos \xFAmida."],
      ["Gale", "H\xE1 outra coisa. O ba\xFA foi protegido separadamente. Tr\xEAs c\xEDrculos, duzentas marcas em cada um\u2026 Uma fechadura probabil\xEDstica."],
      ["Astarion", "Ou podemos simplesmente quebr\xE1-lo. N\xE3o? Claro que n\xE3o. Seria um desrespeito terr\xEDvel com a fechadura."],
      ["Karlach", "Depois de tudo isso, eu quero ver o que tem a\xED. Sua vez, {nome}."]
    ] }
  };
  var ENEMIES = { skeletons: { name: "Guerreiros Sepultados", subtitle: "Dois guardas despertos", hp: 10, attack: "L\xE2mina enferrujada", taunt: "As duas sentinelas arrastam as espadas pelo ch\xE3o.", icon: "skull" }, warden: { name: "Armadura Animada", subtitle: "Guardi\xE3o do relic\xE1rio \xB7 Chefe", hp: 22, attack: "Golpe do juramento", taunt: "A armadura ergue a espada diante do relic\xE1rio.", icon: "shield" } };
  var CHEST_REACTIONS = ["O primeiro c\xEDrculo gira\u2026 e volta ao lugar. Astarion ergue uma sobrancelha. \u201CUma fechadura que gosta de aten\xE7\xE3o. Reconhe\xE7o o tipo.\u201D", "O segundo c\xEDrculo quase se encaixa. Quase. Gale examina o selo: \u201CAinda h\xE1 uma resson\xE2ncia. N\xE3o terminou.\u201D", "Os tr\xEAs c\xEDrculos se alinham. A fechadura cede. A luz toma a c\xE2mara \u2014 e tudo desaparece."];

  // src/Screens/story-expanded.js
  var say = (who, text) => [who, text];
  var reply = (text, lines, key) => [text, lines, key];
  var ask = (options) => ["Voc\xEA", "", options];
  SCENES.camp.lines = [
    say("Narrador", "Gale sacode uma bolsa. Cai terra. Ele sacode de novo, como se a terra tivesse entendido errado."),
    say("Gale", "O astrol\xE1bio desapareceu. Antes que algu\xE9m pergunte: n\xE3o, eu n\xE3o comi. Estou disposto a aceitar acusa\xE7\xF5es com fundamento, mas gostaria de terminar o jantar sem apresentar um \xE1libi intestinal."),
    say("Shadowheart", "A bolsa foi cortada por dentro. Tem necromancia no fecho e um rastro saindo do acampamento. Olha s\xF3, Gale. Seu objeto conseguiu fugir antes de n\xF3s."),
    say("Gale", "Ele mede concentra\xE7\xF5es de magia. Algum encantamento nas ru\xEDnas deve t\xEA-lo atra\xEDdo. Normalmente, ele aponta para a fonte. Desta vez, preferiu ir pessoalmente. Uma iniciativa lament\xE1vel num instrumento de navega\xE7\xE3o."),
    say("Gale", "\xC9 um problema de instru\xE7\xF5es. Certa vez encantei uma chaleira para buscar \xE1gua. Esqueci de estabelecer um limite de dist\xE2ncia. Ela desapareceu por tr\xEAs dias e voltou com \xE1gua do mar e um caranguejo bastante contrariado."),
    say("Gale", "O caranguejo se recusou a sair. Levantava as pin\xE7as toda vez que eu tentava preparar ch\xE1. Passei uma manh\xE3 negociando o uso da minha pr\xF3pria chaleira com um animal que nem sequer contribu\xEDa com o aluguel."),
    say("Gale", "Tentei oferecer uma tigela maior. Ele aceitou a tigela e continuou ocupando a chaleira. Foi nesse momento que percebi que estava lidando com uma criatura de consider\xE1vel talento para neg\xF3cios."),
    say("Gale", "Por isso, quando digo que devemos recuperar o astrol\xE1bio antes que algo se instale dentro dele, n\xE3o \xE9 uma preocupa\xE7\xE3o abstrata. Ainda tenho uma tampa que preciso abrir com uma colher muito comprida."),
    ask([
      reply("Voc\xEA perdeu uma discuss\xE3o imobili\xE1ria para um caranguejo?", [
        say("Gale", "Perdi a primeira. A segunda terminou num acordo: ele fica com a chaleira, eu fico com todos os meus dedos. N\xE3o \xE9 o resultado que eu esperava, mas meus dedos votaram a favor."),
        say("Karlach", "Eu quero conhecer esse filho da puta. Ele parece bom de conversa.")
      ], "gale-crab"),
      reply("Gale. Vamos buscar o astrol\xE1bio antes de voc\xEA explicar o contrato.", [
        say("Gale", "Just\xEDssimo. A vers\xE3o breve \xE9: seguimos o rastro, interrompemos a liga\xE7\xE3o e recuperamos o objeto. A vers\xE3o longa inclui uma disputa sobre quem era dono da \xE1gua."),
        say("Shadowheart", "Guarde para amea\xE7ar quem estiver com o astrol\xE1bio.")
      ], "gale-focus"),
      reply("Astarion, esvazia os bolsos antes de a gente culpar a necromancia.", [
        say("Astarion", "Uma garrafa, duas gazuas e uma quantidade ofensivamente pequena de dinheiro. Se eu tivesse roubado o astrol\xE1bio, esta seria uma noite muito mais lucrativa."),
        say("Gale", "A garrafa tamb\xE9m \xE9 minha."),
        say("Astarion", "Ent\xE3o retire a palavra \u201Croubado\u201D da conversa e devolvo a rolha.")
      ], "pockets")
    ]),
    say("Karlach", "Achei os rastros atr\xE1s da minha barraca. Vamos seguindo e voc\xEAs resolvem a cust\xF3dia do vinho no caminho. A panela j\xE1 tentou levantar a tampa duas vezes; prefiro que a gente esteja longe quando ela descobrir as pernas.")
  ];
  SCENES.camp.next = "packing";
  SCENES.packing = { title: "Preparativos question\xE1veis", location: "Acampamento", background: "camp", objective: "Sair do acampamento com o grupo.", next: "path", lines: [
    say("Narrador", "Shadowheart prende uma po\xE7\xE3o \xE0 sua mochila. Karlach abafa a panela com uma pedra. Algo l\xE1 dentro bate de volta."),
    say("Shadowheart", "Po\xE7\xE3o de cura. Beba se estiver sangrando. Se come\xE7ar a ouvir vozes, confira primeiro se \xE9 o Gale; eu s\xF3 tenho tr\xEAs dessas e ele n\xE3o responde ao tratamento."),
    ask([
      reply("Voc\xEA est\xE1 cuidando de mim. Vou ficar insuport\xE1vel com essa informa\xE7\xE3o.", [
        say("Shadowheart", "Voc\xEA j\xE1 estava. Estou tentando preservar o investimento que fiz em tolerar voc\xEA at\xE9 aqui."),
        say("Karlach", "Ah, isso foi fofo pra caralho. Ela devia escrever cart\xF5es.")
      ], "shadowheart-care"),
      reply("Se eu beber agora, fico protegida contra decis\xF5es ruins?", [
        say("Shadowheart", "N\xE3o. Se existisse uma po\xE7\xE3o assim, eu teria colocado no vinho de todos voc\xEAs e passado a noite dormindo."),
        say("Gale", "Algumas das minhas melhores descobertas come\xE7aram com decis\xF5es ruins. Reconhe\xE7o que isso tamb\xE9m descreve a maior parte das explos\xF5es.")
      ], "potion"),
      reply("Guarda a po\xE7\xE3o. Se eu cair, a Karlach me leva no ombro.", [
        say("Karlach", "Levo! S\xF3 avisa se voc\xEA enjoa. Uma vez carreguei um sujeito correndo e descobri o jantar dele no meu pesco\xE7o."),
        say("Shadowheart", "Vou prender a po\xE7\xE3o mesmo assim. E um pano.")
      ], "carry")
    ]),
    say("Narrador", "Voc\xEAs deixam o acampamento. Atr\xE1s, a panela d\xE1 uma \xFAltima pancada. Ningu\xE9m se oferece para voltar.")
  ] };
  SCENES.path.lines = [
    say("Narrador", "Dois sulcos atravessam a trilha at\xE9 uma raiz marcada de prata. Um corvo observa Gale com a hostilidade de quem reconheceu um devedor."),
    say("Gale", "Uma lasca do astrol\xE1bio. A liga\xE7\xE3o est\xE1 mais forte. Quanto ao p\xE1ssaro, n\xE3o o conhe\xE7o e gostaria que isso constasse antes de algu\xE9m mencionar o caranguejo."),
    ask([
      reply("Boa noite, senhor corvo. Veio cobrar a chaleira?", [
        say("Narrador", "O corvo caga na raiz, a um palmo da m\xE3o de Gale."),
        say("Gale", "Recebido. Uma contesta\xE7\xE3o formal, entregue com not\xE1vel precis\xE3o."),
        say("Karlach", "Caralho. Se ele voar at\xE9 a chaleira, eu sigo. Quero ver a reuni\xE3o.")
      ], "raven"),
      reply("Isso pode ser um familiar. Shadowheart, ele est\xE1 espionando a gente?", [
        say("Shadowheart", "Se estiver, o dono j\xE1 sabe que perdemos um objeto, discutimos com crust\xE1ceos e trouxemos vinho. Deve estar escolhendo entre uma emboscada e um convite para jantar."),
        say("Narrador", "O corvo grasna e voa para a encosta. O rastro segue na mesma dire\xE7\xE3o.")
      ], "familiar"),
      reply("Gale, guarda a lasca. Se esse p\xE1ssaro falar, eu vou embora.", [
        say("Narrador", "Gale guarda a lasca num len\xE7o. O tecido estica na dire\xE7\xE3o das ru\xEDnas."),
        say("Gale", "Est\xE1 puxando. Excelente! N\xE3o precisamos de orienta\xE7\xE3o do p\xE1ssaro."),
        say("Astarion", "Uma pena. Eu estava ansioso para ouvir outra pessoa.")
      ], "follow")
    ]),
    say("Narrador", "O rastro sobe a encosta. O corvo chega primeiro e parece fazer quest\xE3o de deixar isso claro.")
  ];
  SCENES.path.next = "crossing";
  SCENES.crossing = { title: "A bota ficou", location: "Trilha da encosta", background: "journey", objective: "Atravessar a lama at\xE9 as ru\xEDnas.", next: "approach", lines: [
    say("Narrador", "O ch\xE3o cede. Seu p\xE9 volta; a bota n\xE3o. A lama solta um ru\xEDdo molhado que ningu\xE9m tem maturidade para ignorar."),
    say("Karlach", "N\xE3o olha pra mim. Dessa vez foi o ch\xE3o. Quer uma m\xE3o ou quer fingir que est\xE1 examinando uma pista?"),
    ask([
      reply("Karlach, puxa. Se eu sair sem a bota, a gente incendeia essa porra.", [
        say("Karlach", "Adoro um plano que j\xE1 vem com segunda etapa. Segura firme!"),
        say("Narrador", "Ela puxa voc\xEA com a bota e um torr\xE3o inteiro. A lama acerta a capa de Astarion."),
        say("Astarion", "N\xE3o, n\xE3o. Fiquem \xE0 vontade. Eu estava mesmo precisando de um motivo novo para odiar a natureza.")
      ], "karlach-pull"),
      reply("Gale, fa\xE7a alguma coisa m\xE1gica. Sem explodir minha perna.", [
        say("Gale", "Uma restri\xE7\xE3o bastante razo\xE1vel. Vou usar uma M\xE3o M\xE1gica. Ela n\xE3o tem nariz, portanto \xE9 o membro mais bem equipado do grupo para a tarefa."),
        say("Narrador", "A m\xE3o azulada recupera a bota. Antes de desaparecer, parece mostrar o dedo para a lama."),
        say("Gale", "Eu n\xE3o instru\xED esse \xFAltimo movimento. Prefiro acreditar que foi solidariedade profissional.")
      ], "gale-hand"),
      reply("Astarion, me ajuda. Pode reclamar enquanto puxa.", [
        say("Astarion", "Que generosidade. Uma experi\xEAncia desagrad\xE1vel com autoriza\xE7\xE3o expressa para descrev\xEA-la."),
        say("Narrador", "Ele segura seu pulso e puxa. A bota se solta com um estalo indecente."),
        say("Astarion", "Pronto. Voc\xEA est\xE1 livre, a bota est\xE1 traumatizada e eu vou lavar essa m\xE3o at\xE9 esquecer que tenho pele.")
      ], "astarion-hand")
    ]),
    say("Narrador", "Voc\xEAs sobem at\xE9 o arco de pedra. Karlach confere se voc\xEA trouxe os dois p\xE9s; Shadowheart confere se algu\xE9m trouxe bom senso. S\xF3 uma delas fica satisfeita.")
  ] };
  SCENES.approach = { title: "Visita sem agendamento", location: "Encosta das ru\xEDnas", background: "ruins", objective: "Entrar nas ru\xEDnas.", next: "ruins", lines: [
    say("Narrador", "Na soleira: \u201CQue os mortos guardem o que os vivos\u2026\u201D Falta o resto da pedra. L\xE1 dentro, metal raspa no ch\xE3o."),
    say("Shadowheart", "Uma inscri\xE7\xE3o funer\xE1ria incompleta e algu\xE9m arrastando uma arma. J\xE1 fui recebida pior, mas geralmente havia parentes envolvidos."),
    ask([
      reply("\u201C\u2026n\xE3o tiveram ju\xEDzo de deixar em paz.\u201D Pronto, tradu\xE7\xE3o conclu\xEDda.", [
        say("Shadowheart", "Admir\xE1vel. Nenhum conhecimento do idioma e j\xE1 conseguiu culpar todos os envolvidos. H\xE1 sacerdotes que passam anos estudando para fazer isso.")
      ], "translation"),
      reply("Karlach, bate na porta. Com a m\xE3o, por favor.", [
        say("Karlach", "Ah. T\xE1. Voc\xEA precisa avisar essas coisas antes de eu me animar."),
        say("Narrador", "Karlach bate. Uma l\xE2mina atravessa a fresta. Ela recolhe a m\xE3o, ofendida."),
        say("Karlach", "Bom, tentei a sua vers\xE3o. Agora posso usar a minha?")
      ], "knock"),
      reply("Gale, anuncie nossa chegada. A vers\xE3o que n\xE3o exige sentar.", [
        say("Gale", "Estamos aqui para recuperar um astrol\xE1bio de prata. Uma devolu\xE7\xE3o imediata evitar\xE1 uma exposi\xE7\xE3o sobre propriedade arcana, responsabilidade custodial e\u2014"),
        say("Narrador", "Uma l\xE2mina bate no port\xE3o. Gale suspira."),
        say("Gale", "Nem cheguei aos precedentes.")
      ], "announce")
    ]),
    say("Narrador", "O port\xE3o abre para dentro. Pela primeira vez na noite, ningu\xE9m precisa perguntar se aquilo era uma amea\xE7a.")
  ] };
  SCENES.ruins.lines = [
    say("Narrador", "Dois esqueletos se erguem dos escombros. A luz prateada entre as costelas combina mal com as espadas enferrujadas."),
    say("Gale", "O astrol\xE1bio est\xE1 alimentando esses guardas. Estamos prestes a ser agredidos com energia que era nossa. Eu considero isso uma cobran\xE7a indevida."),
    say("Karlach", "Um pra cada lado! E algu\xE9m guarda um osso. Quero mostrar pra panela o que acontece com quem tenta sair andando.")
  ];
  SCENES.dark.lines = [
    say("Narrador", "Os guardas desabam. Uma escada leva \xE0 tumba. Karlach pisa num f\xEAmur; o estalo recebe um pedido de desculpas autom\xE1tico."),
    say("Shadowheart", "Uma tumba escondida. Maravilha. Se algu\xE9m perguntar, estamos procurando uma sa\xEDda e os objetos valiosos vieram pedir ajuda."),
    ask([
      reply("Entra comigo. Se algo me possuir, quero algu\xE9m competente por perto.", [
        say("Shadowheart", "Se algo possuir voc\xEA, vou come\xE7ar perguntando se sabe onde est\xE1 o astrol\xE1bio. Temos que aproveitar qualquer melhora no atendimento.")
      ], "shadowheart-close"),
      reply("Karlach vai comigo. Quero algu\xE9m que consiga discutir com a porta.", [
        say("Karlach", "Deixa comigo. Se ela n\xE3o abrir, vira duas portas menores."),
        say("Gale", "N\xE3o \xE9 assim que portas funcionam."),
        say("Karlach", "\xC9 assim que as minhas acabam.")
      ], "karlach-front"),
      reply("Gale, amea\xE7a dar outra palestra. Talvez o guardi\xE3o entregue tudo.", [
        say("Gale", "N\xE3o vou usar conhecimento como instrumento de tortura. Posso, entretanto, oferecer uma contextualiza\xE7\xE3o hist\xF3rica sem limite de perguntas."),
        say("Astarion", "Abra logo. Eu confesso qualquer coisa se ele come\xE7ar.")
      ], "lecture")
    ])
  ];
  SCENES.tomb.lines = [
    say("Narrador", "Uma armadura vazia guarda um ba\xFA. O astrol\xE1bio brilha no peitoral. Dele ecoa: \u201CNenhuma m\xE3o levar\xE1 o que foi confiado \xE0 minha vig\xEDlia.\u201D"),
    ask([
      reply("Gale, usa a M\xE3o M\xE1gica. Ele acabou de proibir as outras.", [
        say("Gale", "A palavra \u201Cnenhuma\u201D me preocupa. \xC9 desagradavelmente abrangente para quem esperava resolver isso com um detalhe t\xE9cnico."),
        say("Narrador", "A armadura ergue a espada. A M\xE3o M\xE1gica de Gale recua antes de qualquer outra pessoa.")
      ], "technicality"),
      reply("Estamos aqui para encerrar seu turno. Pode ir mijar.", [
        say("Karlach", "Olha pra ele. Se tiver uma bexiga a\xED dentro, eu tenho perguntas bem mais urgentes que esse astrol\xE1bio."),
        say("Narrador", "A armadura avan\xE7a. Pelo visto, o intervalo foi negado.")
      ], "shift"),
      reply("A gente leva o astrol\xE1bio, voc\xEA fica com o ba\xFA. Div\xF3rcio amig\xE1vel.", [
        say("Shadowheart", "N\xE3o ofere\xE7a os bens antes de saber o que tem dentro."),
        say("Astarion", "Finalmente algu\xE9m levando essa negocia\xE7\xE3o a s\xE9rio."),
        say("Narrador", "A armadura responde com a espada. A partilha segue para uma inst\xE2ncia menos civilizada.")
      ], "bargain")
    ])
  ];
  SCENES.victory.lines = [
    say("Narrador", "A armadura desmonta. Voc\xEA recupera o astrol\xE1bio. Do relic\xE1rio escapa uma \xFAltima voz: \u201CA vig\xEDlia\u2026 terminou.\u201D"),
    say("Karlach", "Viu? Folga concedida. Deitou rapidinho."),
    say("Gale", "O ba\xFA tem uma fechadura de tr\xEAs c\xEDrculos, com duzentas posi\xE7\xF5es em cada um. Quem fez isso tinha tempo, talento e absolutamente ningu\xE9m esperando em casa."),
    say("Shadowheart", "Abra. Se ele come\xE7ar a explicar todas as combina\xE7\xF5es, eu entro no sarc\xF3fago e tranco por dentro.")
  ];
  CHEST_REACTIONS.splice(
    0,
    3,
    "O primeiro c\xEDrculo volta ao lugar. Astarion: \u201CAh, gosta de dificultar para parecer interessante. J\xE1 conheci essa fechadura em forma de pessoa.\u201D",
    "O segundo c\xEDrculo quase encaixa. Gale abre a boca. Shadowheart aponta para ele: \u201CNem uma probabilidade. Uma s\xF3 e eu arranco essa tampa.\u201D",
    "Os c\xEDrculos se alinham. Karlach abre os bra\xE7os: \u201CISSO! Chupa, porta pequena!\u201D O ba\xFA se abre e a luz toma a c\xE2mara."
  );
  SCENES.approach.next = "castleGate";
  SCENES.approach.location = "Port\xE3o do castelo em ru\xEDnas";
  SCENES.approach.lines[SCENES.approach.lines.length - 1] = say("Narrador", "O port\xE3o abre para uma grade interna coberta de n\xFAmeros. A l\xE2mina recolhe. At\xE9 os mortos respeitam a fila do atendimento.");
  SCENES.castleGate = { title: "A inscri\xE7\xE3o do port\xE3o", location: "Port\xE3o do castelo", background: "ruins", objective: "Decifrar o selo e interpretar a instru\xE7\xE3o para abrir o port\xE3o.", next: "ruins", puzzle: true, lines: [
    say("Narrador", "N\xFAmeros ocupam as casas de uma inscri\xE7\xE3o. Duas letras ainda est\xE3o leg\xEDveis. Um suporte para tocha foi esculpido ao lado do selo."),
    say("Gale", "Uma cifra por substitui\xE7\xE3o. Posso explicar a origem hist\xF3rica ou podemos tentar sair daqui antes que ela tamb\xE9m vire hist\xF3ria."),
    say("Karlach", "A gente tenta as letras primeiro. Se a porta corrigir minha ortografia, eu derrubo.")
  ] };

  // src/Layouts/simple-game.js
  function gameLayout({ scene, onSettings, onJournal, onParty }) {
    const root = el("div", "game-screen simple-game"), bg = el("div", "landscape");
    bg.style.backgroundImage = `url("${ART.background(scene.background)}")`;
    root.append(bg, el("div", "scene-vignette"));
    const top = el("header", "game-top");
    top.append(el("h1", "simple-location", scene.location));
    const tools = el("nav", "game-tools");
    tools.setAttribute("aria-label", "Menu");
    tools.append(button("Di\xE1rio", onJournal, { icon: "journal" }), button("Configura\xE7\xF5es", onSettings, { icon: "settings" }));
    top.append(tools);
    root.append(top);
    const party = el("aside", "party");
    party.setAttribute("aria-label", "Companheiros");
    for (const [name, c] of Object.entries(CHARACTERS)) {
      const b = el("button", "party-member ornamented");
      b.type = "button";
      b.setAttribute("aria-label", `Ver ${name}`);
      b.onclick = () => onParty(name);
      const img = el("img");
      img.src = ART.avatar(c.id);
      img.alt = name;
      b.append(img);
      party.append(b);
    }
    root.append(party);
    const stage = el("section", "narrative-stage"), status = el("span", "save-status sr-only");
    status.setAttribute("aria-live", "polite");
    root.append(stage, status);
    return { root, stage };
  }

  // src/main.js
  var import_rules = __toESM(require_rules());

  // src/Utilities/audio.js
  var import_howler = __toESM(require_howler());
  var ready = false;
  var active = null;
  var desired = null;
  var transition = 0;
  var sounds = {};
  var tracks = {};
  function audioSettings(s) {
    import_howler.Howler.volume(s.volume);
    import_howler.Howler.mute(s.muted);
  }
  function startAudio(s) {
    audioSettings(s);
    if (ready) return;
    ready = true;
    for (const n of ["click", "roll", "success", "failure", "combat", "discovery", "transition", "final"]) sounds[n] = new import_howler.Howl({ src: [`ui/audio/${n}.wav`], volume: n === "final" ? 0.9 : 0.65 });
    tracks.calm = new import_howler.Howl({ src: ["ui/audio/i-want-to-live-loop.ogg"], loop: true, volume: 0 });
  }
  function musicForPhase(phase) {
    const mode = ["dialogue", "chest", "combat", "roll", "gate-tutorial", "cryptogram"].includes(phase) ? "calm" : null;
    setMusic(mode);
  }
  function setMusic(mode) {
    if (!ready || mode === desired) return;
    desired = mode;
    const ticket = ++transition, previous = tracks[active];
    for (const track of Object.values(tracks)) track.off("fade");
    const begin = () => {
      if (ticket !== transition) return;
      if (previous) previous.pause();
      active = mode;
      const next = tracks[mode];
      if (next) {
        if (!next.playing()) next.play();
        next.fade(next.volume(), mode === "combat" ? 0.34 : 0.44, 700);
      }
    };
    if (previous?.playing()) {
      previous.once("fade", begin);
      previous.fade(previous.volume(), 0, 400);
    } else begin();
  }
  function sound(n) {
    sounds[n]?.play();
  }
  function stopAmbient() {
    setMusic(null);
  }
  function finalAudio(src) {
    stopAmbient();
    if (src) {
      new import_howler.Howl({ src: [src], volume: 0.9, autoplay: true, loop: false });
    } else sound("final");
  }

  // src/main.js
  var app = document.getElementById("app");
  var KEY = new URLSearchParams(location.search).has("preview") ? "ultima-vigilia-puzzle-preview" + (new URLSearchParams(location.search).get("preview") ? "-" + new URLSearchParams(location.search).get("preview") : "") : "ultima-vigilia-puzzle-v1";
  var state = (0, import_rules.fresh)();
  var busy = false;
  var saveFailed = false;
  var demo = new URLSearchParams(location.search).has("ui");
  var lastScene = null;
  var lastPortrait = null;
  try {
    const s = JSON.parse(localStorage.getItem(KEY));
    if ((0, import_rules.validate)(s) && SCENES[s.scene]) state = { ...(0, import_rules.fresh)(), ...s, settings: { ...(0, import_rules.fresh)().settings, ...s.settings } };
  } catch {
  }
  if (state.dialogueRevision !== 5) {
    state.dialogueRevision = 5;
    if (state.phase === "dialogue") {
      state.line = 0;
      state.pendingExchange = null;
      state.pendingResponse = null;
      state.listener = null;
    }
  }
  state.gate = { ...(0, import_cryptogram4.freshGate)(), ...state.gate, entries: { ...(0, import_cryptogram4.freshGate)().entries, ...state.gate?.entries } };
  function save() {
    state.savedAt = Date.now();
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
      saveFailed = false;
    } catch {
      saveFailed = true;
    }
  }
  function settingsStyle() {
    document.documentElement.style.setProperty("--text-scale", state.settings.large ? "1.15" : "1");
    document.body.classList.toggle("reduce-motion", state.settings.reduced);
    audioSettings(state.settings);
  }
  function log(who, text) {
    state.history.push({ who, text });
  }
  function interpolate(s) {
    return s.replaceAll("{nome}", state.name);
  }
  function currentLine() {
    return SCENES[state.scene].lines[state.line];
  }
  function recordLine() {
    const [who, text] = currentLine();
    if (who !== "Voc\xEA") log(who, interpolate(text));
  }
  async function travel(commit, scene, label = "Seguindo a trilha\u2026", duration = 5e3) {
    if (busy) return;
    busy = true;
    const reduced = state.settings.reduced || matchMedia("(prefers-reduced-motion: reduce)").matches;
    const overlay = el("section", "loading-screen");
    overlay.setAttribute("role", "status");
    overlay.setAttribute("aria-live", "polite");
    overlay.setAttribute("aria-label", "Carregando " + scene.location);
    const content = el("div", "loading-content");
    content.append(el("div", "loading-seal"), el("h2", "loading-location", scene.location), el("p", "loading-caption", label), el("div", "loading-line"));
    overlay.append(content);
    document.getElementById("overlays").append(overlay);
    app.inert = true;
    try {
      await Promise.all([prepareScene(scene), pause(duration)]);
      commit();
      render();
      overlay.classList.add("leaving");
      await pause(reduced ? 0 : 220);
    } finally {
      overlay.remove();
      app.inert = false;
      busy = false;
      const target = app.querySelector(".dialogue-choice,.continue-row button,.action-button");
      target?.focus({ preventScroll: true });
    }
  }
  function startScene(id) {
    return travel(() => {
      state.scene = id;
      state.line = 0;
      state.phase = "dialogue";
      state.result = null;
      state.selected = null;
      state.listener = null;
      lastPortrait = null;
      recordLine();
      sound("transition");
    }, SCENES[id]);
  }
  function goNext() {
    if (busy) return;
    state.pendingResponse = null;
    state.pendingExchange = null;
    const scene = SCENES[state.scene];
    if (state.line < scene.lines.length - 1) {
      state.line++;
      recordLine();
      sound("click");
      render();
    } else if (scene.puzzle && !state.gate.solved) {
      state.phase = state.gate.tutorialSeen ? "cryptogram" : "gate-tutorial";
      render();
    } else if (scene.battle) {
      const enemy = ENEMIES[scene.battle];
      state.combat = { id: scene.battle, hp: enemy.hp, max: enemy.hp, vigor: 12, round: 0, misses: 0, last: enemy.taunt };
      state.phase = "combat";
      sound("combat");
      render();
    } else if (scene.next === "chest") {
      state.phase = "chest";
      sound("discovery");
      render();
    } else startScene(scene.next);
  }
  function rootLayout() {
    const scene = SCENES[state.scene];
    const layout = gameLayout({ scene, state, onSettings: showSettings, onJournal: showJournal, onParty: showParty });
    if (lastScene !== state.scene) {
      layout.root.classList.add("scene-enter");
      lastScene = state.scene;
    }
    app.replaceChildren(layout.root);
    if (saveFailed) layout.root.querySelector(".save-status").textContent = "SA\xCDDA LOCAL \xB7 SALVAMENTO INDISPON\xCDVEL";
    return layout;
  }
  function entry() {
    const screen = el("section", "entry-screen"), box = el("div", "entry-content");
    for (const who of ["astarion", "gale"]) {
      const img = el("img", "entry-chibi");
      img.src = ART.emoticon(who);
      img.alt = who === "astarion" ? "Astarion desaprovando, emoticon da Steam" : "Gale apaixonado, emoticon da Steam";
      box.append(img);
    }
    const form = el("form"), label = el("label", "", "Nome da personagem"), input = el("input");
    label.htmlFor = "nickname";
    input.id = "nickname";
    input.name = "nickname";
    input.maxLength = 40;
    input.required = true;
    input.autocomplete = "nickname";
    input.placeholder = "Seu nome";
    input.value = state.name;
    const submit = button(state.name && state.phase !== "entry" ? "Continuar a Run" : "Entrar na Run", () => {
    }, { kind: "primary" });
    submit.type = "submit";
    form.append(label, input, ornament(), submit);
    if (state.phase !== "entry") {
      const restart = button("Reiniciar Run", confirmRestart, { kind: "ghost" });
      restart.classList.add("entry-restart");
      form.append(restart);
    }
    form.onsubmit = (e) => {
      e.preventDefault();
      const n = input.value.trim();
      if (!n) {
        input.setCustomValidity("Digite o nome da personagem.");
        input.reportValidity();
        return;
      }
      state.name = n;
      startAudio(state.settings);
      travel(() => {
        if (state.phase === "entry") {
          state.phase = "dialogue";
          recordLine();
        }
      }, SCENES[state.scene], "Preparando a jornada\u2026", 1e4);
    };
    input.oninput = () => input.setCustomValidity("");
    box.insertBefore(form, box.children[1]);
    screen.append(box);
    app.replaceChildren(screen);
  }
  function character(stage, who) {
    const c = CHARACTERS[who];
    if (!c) {
      if (who === "Guardi\xE3o") {
        const art2 = el("img", "character-art painted-sprite");
        art2.src = ART.enemy("warden");
        art2.alt = who;
        stage.append(art2);
      }
      return;
    }
    const art = el("img", "character-art painted-sprite" + (who === "Gale" || who === "Shadowheart" ? " left" : ""));
    art.src = ART.character(c.id);
    if (lastPortrait !== c.id) art.classList.add("portrait-enter");
    lastPortrait = c.id;
    art.alt = who;
    art.decoding = "async";
    stage.append(art);
    document.querySelectorAll(".party-member").forEach((b) => b.classList.toggle("active", b.getAttribute("aria-label") === "Ver " + who));
  }
  function dialogue(layout) {
    if (state.pendingExchange) state.pendingExchange = state.pendingExchange.map((line) => line[0] === "Voc\xEA" && !Array.isArray(line[2]) ? ["Voc\xEA", "", [[line[1], [], "saved-reply"], ["[Permanecer em sil\xEAncio]", [], "saved-silence"]]] : line);
    const pending = state.pendingExchange?.length;
    const activeLine = pending ? state.pendingExchange[0] : currentLine();
    const [rawWho, raw] = activeLine;
    const options = Array.isArray(activeLine[2]) ? activeLine[2] : null;
    const emotion = pending && typeof activeLine[2] === "string" ? activeLine[2] : activeLine[3];
    const who = rawWho === "Voc\xEA" ? state.name : rawWho;
    if (CHARACTERS[who]) state.listener = who;
    const listener = CHARACTERS[who] ? who : state.listener;
    layout.stage.classList.add("dialogue-stage");
    const figure = el("div", "scene-figure");
    character(figure, listener, emotion);
    layout.stage.append(figure);
    const panel = el("section", "dialogue-shell");
    panel.setAttribute("aria-label", "Di\xE1logo da aventura");
    panel.append(el("h2", "speaker-label", rawWho === "Voc\xEA" ? "Sua resposta" : who));
    if (raw) panel.append(el("p", "dialogue-text" + (who === "Narrador" ? " narrator" : ""), interpolate(raw)));
    const choices = el("div", "choices");
    if (options) {
      options.forEach(([label, response, key], i) => choices.append(choice(label, i + 1, () => {
        state.decisions[state.scene] = key;
        if (CHARACTERS[rawWho]) state.listener = rawWho;
        const replies = Array.isArray(response) ? response : [[rawWho, response]];
        const remaining = pending ? state.pendingExchange.slice(1) : [];
        state.pendingExchange = [[state.name, label], ...replies, ...remaining];
        log(state.name, label);
        render();
      })));
    } else {
      const row = el("div", "continue-row");
      row.append(button("Continuar", pending ? advanceExchange : goNext, { kind: "primary" }));
      choices.append(row);
    }
    panel.append(choices);
    layout.stage.append(panel);
  }
  function showResponse(who, response) {
    state.pendingResponse = null;
    state.pendingExchange = [[who, response]];
    render();
  }
  function battle(layout) {
    layout.stage.classList.add("combat-screen");
    const c = state.combat, e = ENEMIES[c.id];
    const enemyArt = el("img", "enemy-art");
    enemyArt.src = ART.enemy(c.id);
    enemyArt.alt = e.name;
    layout.stage.append(enemyArt);
    const plate = el("div", "enemy-plate");
    plate.append(el("h2", "", e.name), el("p", "", e.subtitle), meter(c.hp, c.max, "Vitalidade"), icon(e.icon, "enemy-symbol"));
    layout.stage.append(plate);
    const panel = el("section", "combat-panel");
    panel.setAttribute("aria-label", "Combate");
    const head = el("div", "combat-caption");
    head.append(el("h2", "", `Rodada ${c.round + 1}`), meter(c.vigor, 12, "F\xF4lego do grupo", "vigor"));
    panel.append(head, el("p", "battle-log", c.last));
    const actions = el("div", "action-bar");
    for (const a of import_rules.ACTIONS) {
      const b = button(a.name, () => {
        state.selected = a.id;
        state.result = null;
        state.phase = "roll";
        save();
        openRoll();
      }, { icon: a.id, kind: "action-button", disabled: c.vigor === 0 });
      b.append(el("small", "", `${a.skill} +${a.modifier} \xB7 CD ${a.dc}`));
      actions.append(b);
    }
    panel.append(actions);
    if (c.misses >= 2) {
      const support = el("div", "assistance");
      support.append(el("p", "", "Karlach aponta uma abertura. \u201CAgora! Comigo!\u201D"));
      support.append(button("Atacar juntos \xB7 3 de dano", () => {
        state.combat = (0, import_rules.assist)(c);
        state.combat.last = "Shadowheart protege seu avan\xE7o. O grupo atinge a junta exposta: 3 de dano, sem teste.";
        log("Combate", state.combat.last);
        finishRound();
      }, { kind: "primary" }));
      panel.append(support);
    }
    if (c.vigor === 0) {
      const support = el("div", "assistance");
      support.append(el("p", "", "\u201CUm passo pra tr\xE1s. Respira. Eu seguro aqui\u201D, diz Karlach."));
      support.append(button("Reagrupar", () => {
        state.combat.vigor = 12;
        state.combat.last = "Gale sustenta uma barreira enquanto Shadowheart recupera o grupo. O inimigo continua com a mesma vitalidade.";
        log("Combate", state.combat.last);
        render();
      }, { kind: "primary" }));
      panel.append(support);
    }
    layout.stage.append(panel);
  }
  function finishRound() {
    state.phase = "combat";
    state.result = null;
    state.selected = null;
    if (state.combat.hp === 0) {
      sound("success");
      log("Combate", ENEMIES[state.combat.id].name + " derrotado.");
      startScene(SCENES[state.scene].next);
    } else render();
  }
  function openRoll() {
    const a = import_rules.ACTIONS.find((a2) => a2.id === state.selected);
    if (!a) return;
    const { dialog, body } = modal("Teste de habilidade", { canClose: () => !busy, onClose: () => {
      if (busy) return;
      if (state.phase === "roll") {
        if (state.result) applyResult();
        else {
          state.phase = "combat";
          render();
        }
      }
    } });
    dialog.classList.add("roll-modal");
    body.append(el("p", "roll-kind", a.skill.toLocaleUpperCase("pt-BR")), el("p", "", a.name));
    const dc = el("div", "difficulty");
    dc.append(el("span", "", "CLASSE DE DIFICULDADE"), el("strong", "", String(a.dc)));
    body.append(dc);
    const d = die(state.result?.n || "?", 20);
    body.append(d);
    const bonus = el("p", "roll-bonus", `B\xD4NUS DE ${a.skill.toUpperCase()}`);
    bonus.append(el("strong", "", `+${a.modifier}`));
    body.append(bonus);
    const calc = el("p", "roll-calculation"), outcome = el("p", "roll-outcome");
    calc.setAttribute("aria-live", "polite");
    body.append(calc, outcome);
    let b;
    const show = () => {
      const r = state.result;
      d.querySelector(".die-number").textContent = String(r.n);
      calc.textContent = `${r.n} + ${r.modifier} = ${r.total}`;
      outcome.textContent = r.critical === "success" ? "SUCESSO CR\xCDTICO" : r.critical === "failure" ? "FALHA CR\xCDTICA" : r.success ? "SUCESSO" : "FALHA";
      outcome.classList.toggle("failure", !r.success);
      b.replaceWith(button("Continuar", () => {
        dialog.close();
      }, { kind: "primary" }));
      d.classList.add("resolved");
    };
    b = button("Rolar dado", async () => {
      if (busy) return;
      busy = true;
      b.disabled = true;
      dialog.querySelector("header button").disabled = true;
      d.classList.add("rolling");
      sound("roll");
      const n = (0, import_rules.randomDie)(20);
      state.result = (0, import_rules.resolve)(n, a.modifier, a.dc);
      save();
      await new Promise((r) => setTimeout(r, state.settings.reduced ? 60 : 900));
      d.classList.remove("rolling");
      busy = false;
      dialog.querySelector("header button").disabled = false;
      sound(state.result.success ? "success" : "failure");
      show();
    }, { kind: "primary" });
    body.append(b);
    if (state.result) show();
    dialog.addEventListener("cancel", (e) => {
      if (busy) e.preventDefault();
    });
  }
  function applyResult() {
    const r = state.result, a = import_rules.ACTIONS.find((a2) => a2.id === state.selected);
    if (!r || !a) return;
    state.combat = (0, import_rules.hit)(state.combat, r, a);
    const e = ENEMIES[state.combat.id];
    const reaction = r.n === 20 ? `${a.who} encontra uma abertura perfeita. ${a.damage * 2} de dano!` : r.n === 1 ? "A arma resvala na pedra. Astarion suspira: \u201CUma demonstra\xE7\xE3o impressionante. A pedra est\xE1 aterrorizada.\u201D" : r.success ? `${a.who} acompanha seu movimento. ${a.damage} de dano.` : `${e.attack}: o grupo perde 2 de f\xF4lego. Karlach segura o avan\xE7o inimigo. \u201CAinda estamos aqui!\u201D`;
    state.combat.last = reaction;
    log("Dados", `${a.skill}: ${r.n} + ${r.modifier} = ${r.total}; CD ${r.dc}. ${reaction}`);
    finishRound();
  }
  function chest(layout) {
    layout.stage.classList.add("chest-screen");
    const panel = el("section", "dialogue-shell");
    panel.append(el("h2", "chest-title", "O \xFAltimo segredo"), ornament(), el("p", "eyebrow", "FECHADURA ARCANA \xB7 D200"));
    const progress = el("div", "chest-progress");
    for (let i = 0; i < 3; i++) progress.append(el("span", "", String(state.chest[i] ?? "\u25C7")));
    panel.append(progress);
    const last = state.chest.length ? state.chest.at(-1) : "?";
    const d = die(last, 200);
    panel.append(d);
    const p = el("p", "dialogue-text", state.chest.length ? CHEST_REACTIONS[state.chest.length - 1] : "Tr\xEAs c\xEDrculos cercam a fechadura. Voc\xEA toca o primeiro. O metal come\xE7a a vibrar.");
    p.setAttribute("aria-live", "polite");
    panel.append(p);
    if (state.chest.length < 3) {
      const b = button(state.chest.length === 2 ? "Rolar a \xFAltima vez" : "Rolar d200", async () => {
        if (busy) return;
        busy = true;
        b.disabled = true;
        d.classList.add("rolling");
        sound("roll");
        const n = (0, import_rules.chestDie)(state.chest.length);
        await new Promise((r) => setTimeout(r, state.settings.reduced ? 60 : state.chest.length === 2 ? 1550 : 950));
        state.chest.push(n);
        log("Fechadura", `C\xEDrculo ${state.chest.length}: ${n}`);
        save();
        busy = false;
        sound(state.chest.length === 3 ? "discovery" : "failure");
        render();
      }, { kind: "primary" });
      panel.append(b);
    } else panel.append(button("Abrir o ba\xFA", () => {
      state.phase = "letter";
      stopAmbient();
      sound("transition");
      render();
    }, { kind: "primary" }));
    layout.stage.append(panel);
  }
  function letter() {
    stopAmbient();
    const root = el("section", "letter-screen"), body = el("div", "letter-content"), text = el("div", "personal-letter", CONFIG.message);
    text.setAttribute("aria-label", "Mensagem pessoal");
    body.append(text, button("Receber", () => {
      if (state.finalPlayed) return;
      state.finalPlayed = true;
      state.phase = "reveal";
      save();
      finalAudio(CONFIG.memeAudio);
      render();
    }, { kind: "primary" }));
    root.append(body);
    app.replaceChildren(root);
  }
  function reveal() {
    const s = el("section", "reveal-screen");
    s.append(el("strong", "", CONFIG.reveal));
    app.replaceChildren(s);
  }
  function showSettings() {
    if (busy) return;
    const { body, dialog } = modal("Configura\xE7\xF5es");
    const row = (label, input) => {
      const r2 = el("div", "settings-row"), l = el("label", "", label);
      l.htmlFor = input.id;
      r2.append(l, input);
      body.append(r2);
      return r2;
    };
    const range = el("input");
    range.id = "volume";
    range.type = "range";
    range.min = 0;
    range.max = 100;
    range.value = state.settings.volume * 100;
    const output = el("output", "", range.value + "%");
    output.htmlFor = "volume";
    const r = row("Volume", range), wrap = el("div", "volume-label");
    range.remove();
    wrap.append(range, output);
    r.append(wrap);
    range.oninput = () => {
      state.settings.volume = Number(range.value) / 100;
      output.textContent = range.value + "%";
      audioSettings(state.settings);
      save();
    };
    for (const [key, label] of [["muted", "Silenciar todos os sons"], ["large", "Texto maior"], ["reduced", "Reduzir movimento"]]) {
      const input = el("input");
      input.id = "setting-" + key;
      input.type = "checkbox";
      input.checked = state.settings[key];
      row(label, input);
      input.onchange = () => {
        state.settings[key] = input.checked;
        settingsStyle();
        save();
      };
    }
    body.append(button("Reiniciar Run", () => {
      dialog.close();
      confirmRestart();
    }, { kind: "danger" }));
    body.append(button("Cr\xE9ditos", () => {
      dialog.close();
      showCredits();
    }, { kind: "ghost" }));
  }
  function confirmRestart() {
    const { body, dialog } = modal("Recome\xE7ar?");
    body.append(el("p", "", "Seu nome e o progresso desta Run ser\xE3o apagados deste navegador. Os arquivos do jogo ser\xE3o preservados."), button("Cancelar", () => dialog.close(), { kind: "ghost" }), button("Recome\xE7ar", () => {
      const s = state.settings;
      state = (0, import_rules.fresh)();
      state.settings = s;
      dialog.close();
      render();
    }, { kind: "danger" }));
  }
  function showJournal() {
    if (busy) return;
    const { body } = modal("Di\xE1rio da jornada", { wide: true });
    body.append(el("h3", "", "Objetivo atual"), el("p", "", SCENES[state.scene].objective));
    const nodes = Object.keys(SCENES), idx = nodes.indexOf(state.scene);
    body.append(el("p", "fine", `${idx + 1} / ${nodes.length} \xB7 ${SCENES[state.scene].location}`));
    for (const l of state.history) {
      const e = el("article", "journal-entry");
      e.append(el("h3", "", l.who), el("p", "", l.text));
      body.append(e);
    }
  }
  function showParty(who) {
    const c = CHARACTERS[who], { body } = modal(who);
    const card = el("div", "portrait-only"), img = el("img");
    img.src = ART.character(c.id);
    img.alt = who;
    card.append(img);
    body.append(card);
  }
  function showCredits() {
    const { body } = modal("Cr\xE9ditos");
    body.append(el("p", "", "Personagens: imagem escolhida pelo autor. Cen\xE1rios: BG3 / Larian Studios. Emoticons: Steam. \xCDcones: Lorc e Delapouite / Game-icons.net. Fontes: Cinzel e Cormorant Garamond."));
  }
  function render() {
    settingsStyle();
    musicForPhase(state.phase);
    save();
    document.querySelectorAll("[role=tooltip]").forEach((t) => t.hidden = true);
    if (demo) {
      renderDemo();
      return;
    }
    if (state.phase === "entry") {
      entry();
      return;
    }
    if (state.phase === "letter") {
      letter();
      return;
    }
    if (state.phase === "reveal") {
      reveal();
      return;
    }
    const layout = rootLayout();
    if (state.phase === "gate-tutorial") renderGateTutorial(layout.stage, { onStart: () => {
      state.gate.tutorialSeen = true;
      state.phase = "cryptogram";
      render();
    } });
    else if (state.phase === "cryptogram") renderCryptogram(layout.stage, { gate: state.gate, onSave: save, onSound: sound, onTutorial: () => {
      state.phase = "gate-tutorial";
      render();
    }, onOpen: () => {
      log("Port\xE3o", import_cryptogram4.ANSWER);
      startScene(SCENES[state.scene].next);
    } });
    else if (["combat", "roll"].includes(state.phase)) battle(layout);
    else if (state.phase === "chest") chest(layout);
    else {
      dialogue(layout);
      if (state.pendingResponse) {
        const p = state.pendingResponse;
        showResponse(p.who, p.response);
      }
    }
    if (state.phase === "roll" && !document.querySelector("dialog[open]")) openRoll();
  }
  function renderDemo() {
    const root = el("section", "demo-screen"), container = el("div", "demo-container");
    container.append(el("p", "eyebrow", "BIBLIOTECA DE INTERFACE \xB7 DEMONSTRA\xC7\xC3O LOCAL"), el("h1", "", "Bronze, pedra e pergaminho"), el("p", "demo-caption", "Componentes pr\xF3prios para a aventura. Estados funcionais, fontes locais e acabamento compartilhado."), ornament());
    const grid = el("div", "demo-grid");
    const card = (title) => {
      const c = el("section", "demo-card ornamented");
      c.append(el("h2", "", title));
      grid.append(c);
      return c;
    };
    const buttons = card("A\xE7\xF5es e estados");
    buttons.append(button("A\xE7\xE3o principal", () => sound("success"), { kind: "primary" }), button("Configura\xE7\xF5es", showSettings, { icon: "settings" }), button("Indispon\xEDvel", () => {
    }, { disabled: true }), button("Confirmar a\xE7\xE3o", confirmRestart, { kind: "danger" }));
    const text = card("Di\xE1logo e escolhas");
    text.append(el("h3", "speaker-label", "Astarion"), el("p", "dialogue-text", "Uma porta trancada. Que bom que trouxemos algu\xE9m com talento para decis\xF5es question\xE1veis."), choice("Examinar a fechadura.", 1, () => {
      text.querySelector(".dialogue-text").textContent = "Astarion inclina a cabe\xE7a. \u201CMuito bem. Eu procuro a armadilha. Voc\xEA tenta n\xE3o encontr\xE1-la primeiro.\u201D";
    }), choice("Abrir o di\xE1rio.", 2, showJournal));
    const meters = card("Vitalidade e f\xF4lego");
    meters.append(meter(17, 22, "Armadura Animada"), meter(8, 12, "F\xF4lego do grupo", "vigor"));
    let value = 17;
    meters.append(button("Simular dano", () => {
      value = Math.max(0, value - 4);
      meters.querySelector(".meter").replaceWith(meter(value, 22, "Armadura Animada"));
    }, { icon: "dagger" }));
    const diceCard = card("Dados e feedback");
    const d = die(20);
    diceCard.append(d, button("Rolar d20", async () => {
      if (busy) return;
      busy = true;
      d.classList.add("rolling");
      sound("roll");
      await new Promise((r) => setTimeout(r, 700));
      d.querySelector("strong").textContent = String((0, import_rules.randomDie)(20));
      d.classList.remove("rolling");
      busy = false;
      sound("success");
    }, { icon: "dice", kind: "primary" }));
    const palette = card("Paleta e texturas"), chips = el("div", "color-chips");
    for (const c of ["#050708", "#211c1a", "#796044", "#b8a06c", "#eee0c6", "#702c32"]) {
      const chip = el("span", "color-chip");
      chip.style.background = c;
      chip.title = c;
      chips.append(chip);
    }
    palette.append(chips, el("p", "fine", "Preto \xB7 Couro \xB7 Bronze \xB7 Ouro antigo \xB7 Pergaminho \xB7 Vinho"));
    const party = card("Retratos e tooltips");
    for (const name of Object.keys(CHARACTERS)) party.append(button(name, () => showParty(name), { tip: CHARACTERS[name].role }));
    container.append(grid);
    const back = el("p", "demo-note"), link = el("a", "", "Voltar \xE0 aventura");
    link.href = "./index.html";
    back.append(link);
    container.append(back);
    root.append(container);
    app.replaceChildren(root);
  }
  document.addEventListener("click", (e) => {
    if (e.target.closest("button") && !busy) sound("click");
  }, true);
  document.addEventListener("keydown", (e) => {
    if (busy) return;
    if (e.key === "Escape" && !document.querySelector("dialog[open]") && !["entry", "letter", "reveal"].includes(state.phase)) {
      e.preventDefault();
      showSettings();
    }
    if (!document.querySelector("dialog[open]") && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName) && /^[1-4]$/.test(e.key)) {
      const choices = app.querySelectorAll(".dialogue-choice");
      choices[Number(e.key) - 1]?.click();
    }
  });
  if (state.phase !== "entry") {
    const savedPhase = state.phase;
    entry();
    app.querySelector("form").onsubmit = (e) => {
      e.preventDefault();
      const n = app.querySelector("input").value.trim();
      if (!n) return;
      state.name = n;
      state.phase = savedPhase;
      startAudio(state.settings);
      travel(() => {
      }, SCENES[state.scene], "Retomando a jornada\u2026", 1e4);
    };
  } else render();
  settingsStyle();
  if (demo) renderDemo();
  function advanceExchange() {
    state.pendingExchange.shift();
    if (state.pendingExchange.length) {
      const [who, text] = state.pendingExchange[0];
      if (who !== "Voc\xEA") log(who, text ? interpolate(text) : "");
      sound("click");
      render();
    } else {
      state.pendingExchange = null;
      state.listener = null;
      goNext();
    }
  }
})();
/*! Bundled license information:

howler/dist/howler.js:
  (*!
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
  (*!
   *  Spatial Plugin - Adds support for stereo and 3D audio where Web Audio is supported.
   *  
   *  howler.js v2.2.4
   *  howlerjs.com
   *
   *  (c) 2013-2020, James Simpson of GoldFire Studios
   *  goldfirestudios.com
   *
   *  MIT License
   *)
*/
//# sourceMappingURL=game.js.map

// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        globalObject
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"cP7kO":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "dc9ee53a32d56147";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , disposedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && ![
        'localhost',
        '127.0.0.1',
        '0.0.0.0'
    ].includes(hostname) ? 'wss' : 'ws';
    var ws;
    if (HMR_USE_SSE) ws = new EventSource('/__parcel_hmr');
    else try {
        ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === 'undefined' ? typeof chrome === 'undefined' ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes('test.js');
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        disposedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === 'reload') fullReload();
        else if (data.type === 'update') {
            // Remove error overlay if there is one
            if (typeof document !== 'undefined') removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== 'undefined' && typeof CustomEvent !== 'undefined') window.dispatchEvent(new CustomEvent('parcelhmraccept'));
                await hmrApplyUpdates(assets);
                hmrDisposeQueue();
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                let processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            if (typeof document !== 'undefined') {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, '') : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + '</div>').join('')}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ''}
      </div>
    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ('reload' in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute('href');
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    href.split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === 'js') {
        if (typeof document !== 'undefined') {
            let script = document.createElement('script');
            script.src = asset.url + '?t=' + Date.now();
            if (asset.outputFormat === 'esmodule') script.type = 'module';
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === 'function') {
            // Worker scripts
            if (asset.outputFormat === 'esmodule') return import(asset.url + '?t=' + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + '?t=' + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != 'undefined' && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') reloadCSS();
    else if (asset.type === 'js') {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        }
        // Always traverse to the parent bundle, even if we already replaced the asset in this bundle.
        // This is required in case modules are duplicated. We need to ensure all instances have the updated code.
        if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDisposeQueue() {
    // Dispose all old assets.
    for(let i = 0; i < assetsToDispose.length; i++){
        let id = assetsToDispose[i][1];
        if (!disposedAssets[id]) {
            hmrDispose(assetsToDispose[i][0], id);
            disposedAssets[id] = true;
        }
    }
    assetsToDispose = [];
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
        let assetsToAlsoAccept = [];
        cached.hot._acceptCallbacks.forEach(function(cb) {
            let additionalAssets = cb(function() {
                return getParents(module.bundle.root, id);
            });
            if (Array.isArray(additionalAssets) && additionalAssets.length) assetsToAlsoAccept.push(...additionalAssets);
        });
        if (assetsToAlsoAccept.length) {
            let handled = assetsToAlsoAccept.every(function(a) {
                return hmrAcceptCheck(a[0], a[1]);
            });
            if (!handled) return fullReload();
            hmrDisposeQueue();
        }
    }
}

},{}],"lbDgN":[function(require,module,exports,__globalThis) {
var _sidebar = require("./components/sidebar");
var _socialButtons = require("./components/socialButtons");
var _searchBox = require("./components/searchBox");
var _particles = require("./utils/particles");
var _overlays = require("./components/overlays");
var _profileCard = require("./components/profileCard");
var _overlayPanel = require("./components/overlayPanel");
var _navigationServices = require("./services/navigationServices");
var _analyticServices = require("./services/analyticServices");
/**
 * Main entry point for the application
 */ document.addEventListener('DOMContentLoaded', ()=>{
    try {
        // Initialize particle background
        (0, _particles.initializeParticles)('particles-js');
        // Initialize the navigation service
        const navigationService = new (0, _navigationServices.NavigationService)();
        // Register sidebar panels with navigation service
        const analyticsPanelElement = document.getElementById('analytics-panel');
        if (analyticsPanelElement) navigationService.registerSection('analytics-panel', analyticsPanelElement);
        // Create and register overlay panel if it doesn't exist
        let overlaysPanelElement = document.getElementById('overlays-panel');
        if (!overlaysPanelElement) {
            overlaysPanelElement = document.createElement('div');
            overlaysPanelElement.id = 'overlays-panel';
            overlaysPanelElement.className = 'sidebar-panel';
            // Add to sidebar
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) sidebar.appendChild(overlaysPanelElement);
        }
        navigationService.registerSection('overlays-panel', overlaysPanelElement);
        // Initialize components
        (0, _sidebar.initializeSidebar)('.sidebar-toggle', '.sidebar');
        (0, _socialButtons.initializeSocialButtons)('.social-grid');
        (0, _searchBox.initializeSearchBox)('search-box');
        (0, _overlays.initializeOverlays)();
        (0, _profileCard.initializeProfileCard)();
        (0, _overlayPanel.initializeOverlayPanel)('overlays-panel');
        // Initialize analytics
        const analyticsService = new (0, _analyticServices.AnalyticsService)('analytics-chart');
        analyticsService.loadData('mock-data').then(()=>{
            analyticsService.renderChart();
        });
        console.log('Application initialized successfully');
    } catch (error) {
        console.error('Failed to initialize application:', error);
    }
});
/**
 * Handle window resize events
 */ window.addEventListener('resize', ()=>{
    // Debounce resize handler
    if (window.resizeTimeout) window.clearTimeout(window.resizeTimeout);
    window.resizeTimeout = window.setTimeout(()=>{
        // Resize the particles canvas
        const canvas = document.querySelector('#particles-js canvas');
        if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        // Resize the magic canvas
        const magicCanvas = document.getElementById('magic-canvas');
        if (magicCanvas) {
            magicCanvas.width = window.innerWidth;
            magicCanvas.height = window.innerHeight;
        }
    }, 200);
});

},{"./components/sidebar":"di5eV","./components/socialButtons":"7hmIk","./components/searchBox":"01txh","./utils/particles":"kYO7i","./components/overlays":"2phQI","./components/profileCard":"3ejSt","./components/overlayPanel":"3HR5E","./services/navigationServices":"9iLFj","./services/analyticServices":"lnVii"}],"di5eV":[function(require,module,exports,__globalThis) {
/**
 * Initializes the sidebar functionality
 * @param toggleSelector - The selector for the toggle button
 * @param sidebarSelector - The selector for the sidebar element
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initializeSidebar", ()=>initializeSidebar);
function initializeSidebar(toggleSelector, sidebarSelector) {
    const toggleButton = document.querySelector(toggleSelector);
    const sidebar = document.querySelector(sidebarSelector);
    if (!toggleButton || !sidebar) {
        console.error("Sidebar elements not found");
        return;
    }
    console.log("Setting up sidebar toggle");
    // Add click event listener
    toggleButton.addEventListener('click', ()=>{
        console.log("Toggle button clicked");
        // Toggle the active class on sidebar
        sidebar.classList.toggle('active');
        // Toggle the active class on the button itself
        toggleButton.classList.toggle('active');
    });
    // Setup sidebar item clicks
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    sidebarItems.forEach((item)=>{
        item.addEventListener('click', ()=>{
            const id = item.id;
            console.log(`Sidebar item clicked: ${id}`);
            // Handle different sidebar items
            switch(id){
                case 'analytics':
                    showPanel('analytics-panel');
                    break;
                case 'overlays':
                    showPanel('overlays-panel');
                    break;
                case 'business':
                    window.location.href = 'mailto:your.email@example.com';
                    break;
                case 'donate':
                    window.open('https://streamelements.com/your-page', '_blank');
                    break;
                case 'support':
                    window.open('https://patreon.com/your-page', '_blank');
                    break;
            }
        });
    });
    /**
     * Shows a specific panel in the sidebar
     * @param panelId - ID of the panel to show
     */ function showPanel(panelId) {
        // Hide all panels
        const panels = document.querySelectorAll('.sidebar-panel');
        panels.forEach((panel)=>{
            panel.classList.remove('active');
        });
        // Show the selected panel
        const targetPanel = document.getElementById(panelId);
        if (targetPanel) targetPanel.classList.add('active');
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports,__globalThis) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule' || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"7hmIk":[function(require,module,exports,__globalThis) {
/**
 * Social media button configurations
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SOCIAL_BUTTONS", ()=>SOCIAL_BUTTONS);
/**
 * Creates and initializes the social media buttons grid
 * @param containerId - The selector of the container element
 */ parcelHelpers.export(exports, "initializeSocialButtons", ()=>initializeSocialButtons);
const SOCIAL_BUTTONS = [
    {
        id: 'twitch',
        name: 'Twitch',
        icon: 'twitch.svg',
        url: 'https://twitch.tv/your-handle',
        color: '#6441a5'
    },
    {
        id: 'discord',
        name: 'Discord',
        icon: 'discord.svg',
        url: 'https://discord.gg/your-invite',
        color: '#5865F2'
    },
    {
        id: 'youtube',
        name: 'YouTube',
        icon: 'youtube.svg',
        url: 'https://youtube.com/c/your-channel',
        color: '#FF0000'
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: 'instagram.svg',
        url: 'https://instagram.com/your-handle',
        color: '#E1306C'
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        icon: 'tiktok.svg',
        url: 'https://tiktok.com/@your-handle',
        color: '#000000'
    },
    {
        id: 'twitter',
        name: 'Twitter',
        icon: 'twitter.svg',
        url: 'https://twitter.com/your-handle',
        color: '#1DA1F2'
    },
    {
        id: 'github',
        name: 'GitHub',
        icon: 'github.svg',
        url: 'https://github.com/your-handle',
        color: '#333333'
    },
    {
        id: 'kofi',
        name: 'Ko-fi',
        icon: 'kofi.svg',
        url: 'https://ko-fi.com/your-handle',
        color: '#FF5E5B'
    },
    {
        id: 'reddit',
        name: 'Reddit',
        icon: 'reddit.svg',
        url: 'https://reddit.com/u/your-handle',
        color: '#FF4500'
    }
];
function initializeSocialButtons(containerId) {
    const container = document.querySelector(containerId);
    if (!container) {
        console.error(`Container element ${containerId} not found`);
        return;
    }
    console.log("Initializing social buttons");
    // Clear any existing content
    container.innerHTML = '';
    // Create and append each button
    SOCIAL_BUTTONS.forEach((button)=>{
        const buttonElement = createSocialButton(button);
        container.appendChild(buttonElement);
    });
}
/**
 * Creates a single social media button element
 * @param button - The button configuration object
 * @returns HTMLElement - The created button element
 */ function createSocialButton(button) {
    const buttonElement = document.createElement('div');
    buttonElement.className = 'social-button';
    buttonElement.id = button.id;
    // Create button content
    buttonElement.innerHTML = `
        <img src="assets/svgs/social/${button.icon}" alt="${button.name}">
    `;
    // Set background color from the button config
    buttonElement.style.backgroundColor = button.color;
    // Add click event to redirect to the URL
    buttonElement.addEventListener('click', ()=>{
        window.open(button.url, '_blank');
    });
    // Add button pop animation on click
    buttonElement.addEventListener('click', ()=>{
        buttonElement.classList.add('button-pop');
        // Remove the class after animation completes
        setTimeout(()=>{
            buttonElement.classList.remove('button-pop');
        }, 300);
    });
    return buttonElement;
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"01txh":[function(require,module,exports,__globalThis) {
/**
 * Initializes the floating search box functionality
 * @param searchBoxId - The ID of the search input element
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initializeSearchBox", ()=>initializeSearchBox);
function initializeSearchBox(searchBoxId) {
    const searchBox = document.getElementById(searchBoxId);
    if (!searchBox) {
        console.error(`Search box element ${searchBoxId} not found`);
        return;
    }
    console.log("Initializing search box");
    searchBox.addEventListener('input', (event)=>{
        const target = event.target;
        const value = target.value;
        // Get last character if there is one
        if (value.length > 0) {
            const lastChar = value.charAt(value.length - 1);
            createFloatingCharacter(lastChar, searchBox);
            // Clear the input to give the illusion that characters float away
            target.value = '';
        }
    });
}
/**
 * Creates a floating character element
 * @param character - The character to animate
 * @param sourceElement - The element from which the character originates
 */ function createFloatingCharacter(character, sourceElement) {
    // Create a span for the character
    const charElement = document.createElement('span');
    charElement.textContent = character;
    charElement.className = 'floating-character';
    // Get the position of the search box
    const rect = sourceElement.getBoundingClientRect();
    // Random starting position within the search box
    const startX = rect.left + Math.random() * rect.width;
    const startY = rect.top + Math.random() * rect.height;
    // Set initial position
    charElement.style.left = `${startX}px`;
    charElement.style.top = `${startY}px`;
    // Random color from theme colors
    const colors = [
        'var(--color-pink)',
        'var(--color-gold)',
        'var(--color-turquoise)',
        'var(--color-teal)'
    ];
    charElement.style.color = colors[Math.floor(Math.random() * colors.length)];
    // Add to the body
    document.body.appendChild(charElement);
    // Apply animation
    animateFloatingCharacter(charElement);
}
/**
 * Animates a floating character element
 * @param element - The element to animate
 */ function animateFloatingCharacter(element) {
    // Random angle for movement direction
    const angle = Math.random() * Math.PI * 2;
    const distance = 100 + Math.random() * 150;
    // Get starting position
    const startX = parseFloat(element.style.left);
    const startY = parseFloat(element.style.top);
    // Calculate target position (mostly upward)
    const targetX = startX + Math.cos(angle) * distance;
    const targetY = startY - Math.abs(Math.sin(angle) * distance); // Force upward
    // Set transform with transition
    setTimeout(()=>{
        element.style.transform = `
            translate(${targetX - startX}px, ${targetY - startY}px)
            rotate(${Math.random() * 360}deg)
        `;
        element.style.opacity = '0';
    }, 10);
    // Remove element after animation completes
    setTimeout(()=>{
        element.remove();
    }, 3000);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"kYO7i":[function(require,module,exports,__globalThis) {
/**
 * Default particle system configuration
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "defaultParticleConfig", ()=>defaultParticleConfig);
/**
 * Initializes the particles background effect
 * @param containerId - ID of the container element for particles
 * @param customConfig - Optional custom particle configuration
 */ parcelHelpers.export(exports, "initializeParticles", ()=>initializeParticles);
const defaultParticleConfig = {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: "#ff9ad2" // Pink based on Apothecary Diaries theme
        },
        shape: {
            type: "circle",
            stroke: {
                width: 0,
                color: "#000000"
            }
        },
        opacity: {
            value: 0.5,
            random: true,
            anim: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true,
            anim: {
                enable: true,
                speed: 2,
                size_min: 0.1,
                sync: false
            }
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#17d8c3",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        },
        modes: {
            grab: {
                distance: 140,
                line_linked: {
                    opacity: 1
                }
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
};
function initializeParticles(containerId, customConfig) {
    // Check if particles.js is loaded
    if (typeof window.particlesJS !== 'function') {
        console.error('particles.js library not loaded');
        return;
    }
    try {
        // Merge default config with any custom settings
        const config = customConfig ? {
            ...defaultParticleConfig,
            ...customConfig
        } : defaultParticleConfig;
        // Initialize particles
        window.particlesJS(containerId, config);
        console.log('Particles initialized successfully');
    } catch (error) {
        console.error('Failed to initialize particles:', error);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"2phQI":[function(require,module,exports,__globalThis) {
/*
    initRainAnimation,
    */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OVERLAY_OPTIONS", ()=>OVERLAY_OPTIONS);
/**
 * Initialize the foreground overlay animations
 */ parcelHelpers.export(exports, "initializeOverlays", ()=>initializeOverlays);
/**
 * Apply a specific overlay effect
 * @param overlayId - ID of the overlay to apply
 */ parcelHelpers.export(exports, "applyOverlayEffect", ()=>applyOverlayEffect);
var _animationsSnow = require("../utils/animations.snow");
var _animationsHearts = require("../utils/animations.hearts");
var _animationsLeaves = require("../utils/animations.leaves");
var _animationsSakura = require("../utils/animations.sakura");
var _animationsRain = require("../utils/animations.rain");
const OVERLAY_OPTIONS = [
    {
        id: 'snow',
        name: 'Snow Falling',
        particleType: 'snow',
        config: {}
    },
    {
        id: 'rain',
        name: 'Realistic Rain',
        particleType: 'rain',
        config: {}
    },
    {
        id: 'leaves',
        name: 'Falling Leaves',
        particleType: 'leaves',
        config: {}
    },
    {
        id: 'sakura',
        name: 'Sakura Petals',
        particleType: 'sakura',
        config: {}
    },
    {
        id: 'hearts',
        name: 'Hearts Falling',
        particleType: 'hearts',
        config: {}
    }
];
function initializeOverlays() {
    // Create the magic canvas for overlays if it doesn't exist
    let magicCanvas = document.getElementById('magic-canvas');
    if (!magicCanvas) {
        console.error("Magic canvas not found in the DOM");
        return;
    }
    // Set canvas size to match window
    magicCanvas.width = window.innerWidth;
    magicCanvas.height = window.innerHeight;
    // Select a random overlay effect on load
    const randomIndex = Math.floor(Math.random() * OVERLAY_OPTIONS.length);
    const selectedOverlay = OVERLAY_OPTIONS[randomIndex];
    // Initialize the selected overlay
    applyOverlayEffect(selectedOverlay.id);
    console.log(`Initialized overlay: ${selectedOverlay.name}`);
    // Initialize overlay selector panel
    initializeOverlaySelector();
}
function applyOverlayEffect(overlayId) {
    const overlay = OVERLAY_OPTIONS.find((opt)=>opt.id === overlayId);
    if (!overlay) {
        console.error(`Overlay with ID ${overlayId} not found`);
        return;
    }
    const canvas = document.getElementById('magic-canvas');
    if (!canvas) {
        console.error('Magic canvas element not found');
        return;
    }
    // Get canvas context
    const ctx = canvas.getContext('2d');
    if (!ctx) {
        console.error('Failed to get canvas context');
        return;
    }
    // Clear any existing animations
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Initialize the specific overlay animation
    switch(overlayId){
        case 'snow':
            (0, _animationsSnow.initSnowAnimation)(canvas, ctx);
            break;
        case 'rain':
            (0, _animationsRain.initRainAnimation)(canvas, ctx);
            break;
        case 'leaves':
            (0, _animationsLeaves.initLeavesAnimation)(canvas, ctx);
            break;
        case 'sakura':
            (0, _animationsSakura.initSakuraAnimation)(canvas, ctx);
            break;
        case 'hearts':
            (0, _animationsHearts.initHeartsAnimation)(canvas, ctx);
            break;
        default:
            (0, _animationsSnow.initSnowAnimation)(canvas, ctx); // Default fallback
    }
}
/**
 * Initialize the overlay selector in the sidebar
 */ function initializeOverlaySelector() {
    const selector = document.getElementById('overlay-selector');
    if (!selector) {
        console.error('Overlay selector element not found');
        return;
    }
    // Clear existing content
    selector.innerHTML = '';
    // Add each overlay as a button
    OVERLAY_OPTIONS.forEach((overlay)=>{
        const button = document.createElement('div');
        button.className = 'overlay-option';
        button.textContent = overlay.name;
        button.dataset.id = overlay.id;
        // Add click handler
        button.addEventListener('click', ()=>{
            // Apply this overlay
            applyOverlayEffect(overlay.id);
            // Update active state
            document.querySelectorAll('.overlay-option').forEach((el)=>{
                el.classList.remove('active');
            });
            button.classList.add('active');
        });
        selector.appendChild(button);
    });
}

},{"../utils/animations.snow":"55ai1","../utils/animations.hearts":"dEcbS","../utils/animations.leaves":"9cMh1","../utils/animations.sakura":"46n4Y","../utils/animations.rain":"9DqvM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"55ai1":[function(require,module,exports,__globalThis) {
/**
 * Adds interactive animations to a button element
 * @param element - The button element to animate
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "addButtonAnimations", ()=>addButtonAnimations);
/**
 * Initialize a snow overlay animation
 * @param canvas - The canvas element
 * @param ctx - The canvas 2D context
 */ parcelHelpers.export(exports, "initSnowAnimation", ()=>initSnowAnimation);
function addButtonAnimations(element) {
    // Maximum rotation angle (in degrees)
    const MAX_ROTATION = 5;
    // Maximum scale factor
    const MAX_SCALE = 1.1;
    element.addEventListener('mouseover', ()=>{
        // Random rotation within bounds
        const rotateX = Math.random() * MAX_ROTATION * 2 - MAX_ROTATION;
        const rotateY = Math.random() * MAX_ROTATION * 2 - MAX_ROTATION;
        // Apply the transform
        element.style.transform = `
            perspective(1000px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg) 
            scale(${MAX_SCALE})
        `;
        // Add glow effect
        element.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
    });
    element.addEventListener('mouseout', ()=>{
        // Reset transforms
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        element.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.3)';
    });
    element.addEventListener('click', ()=>{
        // Pop animation on click
        element.classList.add('button-pop');
        // Remove the class after animation completes
        setTimeout(()=>{
            element.classList.remove('button-pop');
        }, 300);
    });
}
function initSnowAnimation(canvas, ctx) {
    // Create snow particles
    const particles = [];
    const PARTICLE_COUNT = 100;
    // Initialize particles
    for(let i = 0; i < PARTICLE_COUNT; i++)particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.3
    });
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw and update each particle
        particles.forEach((p)=>{
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.fill();
            // Update position
            p.y += p.speed;
            p.x += Math.sin(p.y * 0.01) * 0.5;
            // Reset if off screen
            if (p.y > canvas.height) {
                p.y = 0;
                p.x = Math.random() * canvas.width;
            }
        });
        // Continue animation
        requestAnimationFrame(animate);
    }
    animate();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dEcbS":[function(require,module,exports,__globalThis) {
/**
 * Initialize a falling hearts overlay animation
 * @param canvas - The canvas element
 * @param ctx - The canvas 2D context
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initHeartsAnimation", ()=>initHeartsAnimation);
function initHeartsAnimation(canvas, ctx) {
    // Create hearts
    const hearts = [];
    const HEART_COUNT = 40;
    // Initialize hearts
    for(let i = 0; i < HEART_COUNT; i++)hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 10,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        pulse: Math.random() * 0.5 + 0.5
    });
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw and update each heart
        hearts.forEach((heart)=>{
            // Calculate pulse effect
            const pulse = 1 + Math.sin(Date.now() * 0.003 * heart.pulse) * 0.2;
            ctx.save();
            ctx.translate(heart.x, heart.y);
            ctx.scale(pulse, pulse);
            // Draw heart shape
            drawHeart(ctx, 0, 0, heart.size, `rgba(255, 94, 143, ${heart.opacity})`);
            ctx.restore();
            // Update position
            heart.y += heart.speed;
            heart.x += Math.sin(heart.y * 0.05) * 0.5;
            // Reset if off screen
            if (heart.y > canvas.height) {
                heart.y = -heart.size;
                heart.x = Math.random() * canvas.width;
            }
        });
        // Continue animation
        requestAnimationFrame(animate);
    }
    animate();
}
/**
 * Draw a heart shape on the canvas
 */ function drawHeart(ctx, x, y, size, color) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    // Left bump
    ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y, x, y + size);
    // Right bump
    ctx.bezierCurveTo(x + size, y, x + size / 2, y - size / 2, x, y + size / 4);
    ctx.fillStyle = color;
    ctx.fill();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9cMh1":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Initialize a falling leaves overlay animation
 * @param canvas - The canvas element
 * @param ctx - The canvas 2D context
 */ parcelHelpers.export(exports, "initLeavesAnimation", ()=>initLeavesAnimation);
var _animationsLeavesHelper = require("./animations.leaves.helper");
function initLeavesAnimation(canvas, ctx) {
    // Create leaves
    const leaves = [];
    const LEAF_COUNT = 30;
    const LEAF_COLORS = [
        '#a67c00',
        '#d4a216',
        '#b32900',
        '#7d3200',
        '#556b2f' // Olive
    ];
    // Initialize leaves
    for(let i = 0; i < LEAF_COUNT; i++)leaves.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 20 + 15,
        speed: Math.random() * 2 + 1,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
        color: LEAF_COLORS[Math.floor(Math.random() * LEAF_COLORS.length)],
        sway: Math.random() * 5 + 2
    });
    // Animation loop
    // sourcery skip: avoid-function-declarations-in-blocks
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw and update each leaf
        leaves.forEach((leaf)=>{
            ctx.save();
            ctx.translate(leaf.x, leaf.y);
            ctx.rotate(leaf.rotation * Math.PI / 180);
            // Draw leaf shape (simple oval for now)
            (0, _animationsLeavesHelper.drawLeaf)(ctx, 0, 0, leaf.size, leaf.color);
            ctx.restore();
            // Update position with swaying motion
            leaf.y += leaf.speed;
            leaf.x += Math.sin(leaf.y * 0.01) * leaf.sway;
            leaf.rotation += leaf.rotationSpeed;
            // Reset if off screen
            if (leaf.y > canvas.height) {
                leaf.y = -leaf.size;
                leaf.x = Math.random() * canvas.width;
            }
        });
        // Continue animation
        requestAnimationFrame(animate);
    }
    animate();
}

},{"./animations.leaves.helper":"c3pko","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"c3pko":[function(require,module,exports,__globalThis) {
/**
 * Draw a leaf shape on the canvas
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "drawLeaf", ()=>drawLeaf);
function drawLeaf(ctx, x, y, size, color) {
    // Main leaf shape
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    // Draw leaf outline
    ctx.bezierCurveTo(x + size / 3, y - size / 3, x + size / 2, y, x, y + size / 2);
    ctx.bezierCurveTo(x - size / 2, y, x - size / 3, y - size / 3, x, y - size / 2);
    // Fill leaf
    ctx.fillStyle = color;
    ctx.fill();
    // Draw leaf vein
    ctx.beginPath();
    ctx.moveTo(x, y - size / 2);
    ctx.lineTo(x, y + size / 2);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.lineWidth = size / 15;
    ctx.stroke();
    // Draw secondary veins
    const veins = 3;
    for(let i = 1; i <= veins; i++){
        const yPos = y - size / 2 + size * i / (veins + 1);
        ctx.beginPath();
        ctx.moveTo(x, yPos);
        ctx.lineTo(x + size / 3, yPos - size / 10);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.lineWidth = size / 25;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, yPos);
        ctx.lineTo(x - size / 3, yPos - size / 10);
        ctx.stroke();
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"46n4Y":[function(require,module,exports,__globalThis) {
/**
 * Initialize a sakura petals overlay animation
 * @param canvas - The canvas element
 * @param ctx - The canvas 2D context
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initSakuraAnimation", ()=>initSakuraAnimation);
function initSakuraAnimation(canvas, ctx) {
    // Create sakura petals
    const petals = [];
    const PETAL_COUNT = 50;
    // Initialize petals
    for(let i = 0; i < PETAL_COUNT; i++)petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 10 + 5,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1
    });
    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw and update each petal
        petals.forEach((petal)=>{
            ctx.save();
            ctx.translate(petal.x, petal.y);
            ctx.rotate(petal.rotation * Math.PI / 180);
            // Draw petal (simple oval shape)
            ctx.beginPath();
            ctx.ellipse(0, 0, petal.size, petal.size / 2, 0, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 183, 197, ${petal.opacity})`;
            ctx.fill();
            ctx.restore();
            // Update position and rotation
            petal.y += petal.speed;
            petal.x += Math.sin(petal.y * 0.01) * 1;
            petal.rotation += petal.rotationSpeed;
            // Reset if off screen
            if (petal.y > canvas.height) {
                petal.y = -petal.size;
                petal.x = Math.random() * canvas.width;
            }
        });
        // Continue animation
        requestAnimationFrame(animate);
    }
    animate();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9DqvM":[function(require,module,exports,__globalThis) {
/**
 * Initialize a rain overlay animation
 * @param canvas - The canvas element
 * @param ctx - The canvas 2D context
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initRainAnimation", ()=>initRainAnimation);
function initRainAnimation(canvas, ctx) {
    // Create rain drops
    const raindrops = [];
    const RAINDROP_COUNT = 200;
    // Initialize raindrops
    for(let i = 0; i < RAINDROP_COUNT; i++)raindrops.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        length: Math.random() * 20 + 10,
        speed: Math.random() * 15 + 10,
        thickness: Math.random() * 2 + 1,
        opacity: Math.random() * 0.3 + 0.1
    });
    // Animation loop
    function animate() {
        // Apply a semi-transparent fill to create trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Draw and update each raindrop
        raindrops.forEach((drop)=>{
            ctx.beginPath();
            ctx.moveTo(drop.x, drop.y);
            ctx.lineTo(drop.x, drop.y + drop.length);
            ctx.strokeStyle = `rgba(120, 160, 255, ${drop.opacity})`;
            ctx.lineWidth = drop.thickness;
            ctx.stroke();
            // Update position
            drop.y += drop.speed;
            // Reset if off screen
            if (drop.y > canvas.height) {
                drop.y = -drop.length;
                drop.x = Math.random() * canvas.width;
            }
        });
        // Continue animation
        requestAnimationFrame(animate);
    }
    animate();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3ejSt":[function(require,module,exports,__globalThis) {
/**
 * Initializes the profile card with interactive elements
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initializeProfileCard", ()=>initializeProfileCard);
function initializeProfileCard() {
    // Add floating animation to profile picture
    const profilePic = document.querySelector('.profile-picture');
    if (profilePic) addFloatingEffect(profilePic);
    // Add text animation to headings
    const headings = document.querySelectorAll('.profile-card h1, .profile-card h2');
    headings.forEach((heading, index)=>{
        const element = heading;
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `all 0.5s ease ${0.2 + index * 0.1}s`;
        // Trigger animations after a short delay
        setTimeout(()=>{
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100);
    });
}
/**
 * Adds a custom floating effect to an element
 * @param element - The element to animate
 */ function addFloatingEffect(element) {
    // Add subtle random movement
    let startTime = Date.now();
    function updatePosition() {
        const elapsed = (Date.now() - startTime) / 1000;
        // Calculate offsets using sine waves with different frequencies
        const offsetX = Math.sin(elapsed * 0.5) * 5;
        const offsetY = Math.sin(elapsed * 0.7) * 7;
        // Apply the transformation
        element.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
        // Continue animation
        requestAnimationFrame(updatePosition);
    }
    updatePosition();
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3HR5E":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Initialize the overlay selection panel
 * @param containerId - ID of the container element
 */ parcelHelpers.export(exports, "initializeOverlayPanel", ()=>initializeOverlayPanel);
var _overlays = require("./overlays");
function initializeOverlayPanel(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Overlay panel container ${containerId} not found`);
        return;
    }
    // Create panel content
    container.innerHTML = /*HTML*/ `
        <h3 class="sidebar-panel-title">Overlay Effects</h3>
        <p class="sidebar-panel-desc">Choose an overlay effect for your page:</p>
        <div class="overlay-selector" id="overlay-selector"></div>
    `;
    // Create overlay options
    const selector = document.getElementById('overlay-selector');
    if (!selector) return;
    // Add each overlay option as a button
    (0, _overlays.OVERLAY_OPTIONS).forEach((overlay)=>{
        const button = document.createElement('div');
        button.className = 'overlay-option';
        button.textContent = overlay.name;
        button.dataset.overlayId = overlay.id;
        // Add click handler
        button.addEventListener('click', ()=>{
            // Remove active class from all buttons
            document.querySelectorAll('.overlay-option').forEach((el)=>{
                el.classList.remove('active');
            });
            // Add active class to clicked button
            button.classList.add('active');
            // Apply the selected overlay
            (0, _overlays.applyOverlayEffect)(overlay.id);
        });
        selector.appendChild(button);
    });
}

},{"./overlays":"2phQI","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9iLFj":[function(require,module,exports,__globalThis) {
/**
 * Handles navigation between different sections of the site
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "NavigationService", ()=>NavigationService);
class NavigationService {
    /**
     * Initialize the navigation service
     * @param defaultSection - The default section to show
     */ constructor(defaultSection = ''){
        this.currentSection = '';
        this.sections = new Map();
        this.currentSection = defaultSection;
        // Register click handlers for sidebar menu items
        this.registerMenuHandlers();
    }
    /**
     * Register a section to be managed by the navigation service
     * @param id - The section ID
     * @param element - The section DOM element
     */ registerSection(id, element) {
        if (!element) {
            console.error(`Element for section ${id} is null`);
            return;
        }
        this.sections.set(id, element);
        // Hide all sections by default
        element.style.display = 'none';
        console.log(`Registered section: ${id}`);
    }
    /**
     * Navigate to a specific section
     * @param sectionId - The ID of the section to navigate to
     */ navigateTo(sectionId) {
        // Hide current section if any
        if (this.currentSection && this.sections.has(this.currentSection)) {
            const currentElement = this.sections.get(this.currentSection);
            if (currentElement) currentElement.style.display = 'none';
        }
        // Show new section
        if (this.sections.has(sectionId)) {
            const newElement = this.sections.get(sectionId);
            if (newElement) {
                newElement.style.display = 'block';
                this.currentSection = sectionId;
                console.log(`Navigated to section: ${sectionId}`);
            }
        } else console.error(`Section ${sectionId} not found`);
    }
    /**
     * Register click handlers for sidebar menu items
     */ registerMenuHandlers() {
        // Analytics menu item
        const analyticsItem = document.getElementById('analytics');
        if (analyticsItem) analyticsItem.addEventListener('click', ()=>{
            this.navigateTo('analytics-panel');
        });
        // Business inquiries menu item
        const businessItem = document.getElementById('business');
        if (businessItem) businessItem.addEventListener('click', ()=>{
            window.location.href = 'mailto:your.email@example.com';
        });
        // Donate menu item
        const donateItem = document.getElementById('donate');
        if (donateItem) donateItem.addEventListener('click', ()=>{
            window.open('https://streamelements.com/your-page', '_blank');
        });
        // Overlays menu item
        const overlaysItem = document.getElementById('overlays');
        if (overlaysItem) overlaysItem.addEventListener('click', ()=>{
            this.navigateTo('overlays-panel');
        });
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"lnVii":[function(require,module,exports,__globalThis) {
/**
 * Class to handle analytics data and visualization
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AnalyticsService", ()=>AnalyticsService);
class AnalyticsService {
    /**
     * Initialize the analytics service
     * @param chartElementId - ID of the chart container element
     */ constructor(chartElementId){
        this.data = [];
        this.chartElement = null;
        this.chartElement = document.getElementById(chartElementId);
        if (!this.chartElement) console.error(`Chart element ${chartElementId} not found`);
    }
    /**
     * Load analytics data from an API or static source
     * @param source - URL or identifier for the data source
     */ async loadData(_source) {
        try {
            // For demo purposes, use mock data
            // In production, this would be an API call
            this.data = this.getMockData();
            console.log(`Loaded ${this.data.length} analytics data points`);
            return Promise.resolve();
        } catch (error) {
            console.error('Failed to load analytics data:', error);
            return Promise.reject(error);
        }
    }
    /**
     * Render the analytics chart
     */ renderChart() {
        if (!this.chartElement || this.data.length === 0) return;
        // Clear previous chart if any
        this.chartElement.innerHTML = '';
        // For simplicity, render a basic bar chart
        // In production, you might use a library like Chart.js
        const container = document.createElement('div');
        container.className = 'analytics-chart-container';
        this.data.forEach((item)=>{
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.height = `${item.value}%`;
            bar.style.backgroundColor = item.color;
            const label = document.createElement('div');
            label.className = 'chart-label';
            label.textContent = item.label;
            bar.appendChild(label);
            container.appendChild(bar);
        });
        this.chartElement.appendChild(container);
    }
    /**
     * Get mock data for demonstration
     * @returns Array of mock data points
     */ getMockData() {
        return [
            {
                label: 'Views',
                value: 85,
                color: 'var(--color-pink)'
            },
            {
                label: 'Likes',
                value: 65,
                color: 'var(--color-turquoise)'
            },
            {
                label: 'Shares',
                value: 45,
                color: 'var(--color-gold)'
            },
            {
                label: 'Comments',
                value: 30,
                color: 'var(--color-teal)'
            },
            {
                label: 'Subscribers',
                value: 20,
                color: 'var(--color-dark-green)'
            }
        ];
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["cP7kO","lbDgN"], "lbDgN", "parcelRequire94c2")

//# sourceMappingURL=index.32d56147.js.map

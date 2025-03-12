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
})({"cAPdp":[function(require,module,exports,__globalThis) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "7dd44675b7a05eb9";
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

},{}],"jeorp":[function(require,module,exports,__globalThis) {
var _sidebar = require("@/components/sidebar");
var _socialButtons = require("@/components/socialButtons");
var _searchBox = require("@/components/searchBox");
var _overlays = require("@/components/overlays");
var _profileCard = require("@/components/profileCard");
var _overlayPanel = require("@/components/overlayPanel");
var _particles = require("@/utils/particles");
var _navigationServices = require("@/services/navigationServices");
var _analyticServices = require("@/services/analyticServices");
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
        // Initialize components with debugging
        console.log('Initializing sidebar...');
        (0, _sidebar.initializeSidebar)('.sidebar-toggle', '.sidebar');
        console.log('Initializing social buttons...');
        (0, _socialButtons.initializeSocialButtons)('.social-grid');
        console.log('Initializing search box...');
        (0, _searchBox.initializeSearchBox)('search-box');
        console.log('Initializing overlays...');
        (0, _overlays.initializeOverlays)();
        console.log('Initializing Profile Card...');
        (0, _profileCard.initializeProfileCard)();
        console.log('Initializing Overlay Panels...');
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

},{"@/components/sidebar":"hweTn","@/components/socialButtons":"eezvA","@/components/searchBox":"7YbSD","@/components/overlays":"1Mc8h","@/components/profileCard":"60OL6","@/components/overlayPanel":"5rZxp","@/utils/particles":"9Y45t","@/services/navigationServices":"3rnt5","@/services/analyticServices":"dt9sa"}],"hweTn":[function(require,module,exports,__globalThis) {
/**
 * Initializes the sidebar functionality
 * @param toggleSelector - The selector for the toggle button
 * @param sidebarSelector - The selector for the sidebar element
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "initializeSidebar", ()=>initializeSidebar);
function initializeSidebar(toggleSelector, sidebarSelector) {
    console.log(`Finding elements: ${toggleSelector}, ${sidebarSelector}`);
    const toggleButton = document.querySelector(toggleSelector);
    const sidebar = document.querySelector(sidebarSelector);
    // Add explicit type checks and logging
    if (!toggleButton) {
        console.error(`Toggle button not found: ${toggleSelector}`);
        return;
    }
    if (!sidebar) {
        console.error(`Sidebar not found: ${sidebarSelector}`);
        return;
    }
    console.log('Elements found, setting up click handler');
    // Add click handler for the toggle button with debugging
    toggleButton.addEventListener('click', (event)=>{
        toggleButton.classList.toggle("spin");
        console.log('Toggle button clicked');
        event.preventDefault();
        // Toggle the active class to show/hide sidebar
        sidebar.classList.toggle('active');
        console.log(`Sidebar active: ${sidebar.classList.contains('active')}`);
    });
    toggleButton.addEventListener('dblclick', (event)=>{
        sidebar.classList.add('hidden');
        console.log('Sidebar hidden via double-click');
    });
    // Set up panel navigation
    setupPanels();
    console.log('Sidebar initialization complete');
}
/**
 * Sets up the sidebar panels
 */ function setupPanels() {
    const analyticsItem = document.getElementById('analytics');
    const overlaysItem = document.getElementById('overlays');
    if (analyticsItem) analyticsItem.addEventListener('click', ()=>{
        showPanel('analytics-panel');
    });
    if (overlaysItem) overlaysItem.addEventListener('click', ()=>{
        showPanel('overlays-panel');
    });
}
/**
 * Shows a specific panel and hides others
 * @param panelId - ID of the panel to show
 */ function showPanel(panelId) {
    // Hide all panels
    const panels = document.querySelectorAll('.sidebar-panel');
    panels.forEach((panel)=>{
        panel.classList.remove('active');
    });
    // Show the requested panel
    const panel = document.getElementById(panelId);
    if (panel) {
        panel.classList.add('active');
        console.log(`Showing panel: ${panelId}`);
    } else console.error(`Panel not found: ${panelId}`);
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

},{}],"eezvA":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Creates and initializes the social media buttons grid
 * @param containerId - The selector of the container element
 */ parcelHelpers.export(exports, "initializeSocialButtons", ()=>initializeSocialButtons);
var _socialButtonsConfig = require("./socialButtons.config");
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
    (0, _socialButtonsConfig.SOCIAL_BUTTONS).forEach((button)=>{
        const buttonElement = createSocialButton(button);
        container.appendChild(buttonElement);
    });
}
/**
 * Creates a single social media button element
 * @param button - The button configuration object
 * @returns HTMLElement - The created button element
 */ function createSocialButton(button) {
    // Create button container
    const buttonElement = document.createElement('div');
    buttonElement.className = 'social-button';
    buttonElement.id = button.id;
    // Create button content with explicit link
    buttonElement.innerHTML = /*HTML*/ `
    <div class="icon-container">
    ${button.svg}
    </div>
`;
    // buttonElement.innerHTML = /*HTML*/`
    // <div class="icon-container">
    //     <object data="/assets/svgs/social/${button.icon}.svg" type="image/svg+xml">
    //         <img src="/assets/images/social/${button.icon}.png" alt="${button.name}">
    //     </object>
    // </div>
    // `;
    // Set background color from the button config
    buttonElement.style.backgroundColor = button.color;
    // Add explicit click handler to the buttonElement
    buttonElement.addEventListener('click', (event)=>{
        // Stop the event from bubbling up to parent elements
        event.stopPropagation();
        // Add pop animation
        buttonElement.classList.add('button-pop');
        // Remove the class after animation completes
        setTimeout(()=>{
            buttonElement.classList.remove('button-pop');
        }, 300);
        // Open the URL in a new tab
        window.open(button.url, '_blank');
        console.log(`Clicked on ${button.name} button`); // Debug logging
    });
    return buttonElement;
}

},{"./socialButtons.config":"5UcdC","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5UcdC":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SOCIAL_BUTTONS", ()=>SOCIAL_BUTTONS);
const SOCIAL_BUTTONS = [
    {
        id: 'twitch',
        name: 'Twitch',
        icon: 'Twitch',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M391.2 103.5H352.5v109.7h38.6zM285 103H246.4V212.8H285zM120.8 0 24.3 91.4V420.6H140.1V512l96.5-91.4h77.3L487.7 256V0zM449.1 237.8l-77.2 73.1H294.6l-67.6 64v-64H140.1V36.6H449.1z"/></svg>',
        url: 'https://twitch.tv/your-handle',
        color: '#6441a5'
    },
    {
        id: 'discord',
        name: 'Discord',
        icon: 'Discord',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path d="M524.5 69.8a1.5 1.5 0 0 0 -.8-.7A485.1 485.1 0 0 0 404.1 32a1.8 1.8 0 0 0 -1.9 .9 337.5 337.5 0 0 0 -14.9 30.6 447.8 447.8 0 0 0 -134.4 0 309.5 309.5 0 0 0 -15.1-30.6 1.9 1.9 0 0 0 -1.9-.9A483.7 483.7 0 0 0 116.1 69.1a1.7 1.7 0 0 0 -.8 .7C39.1 183.7 18.2 294.7 28.4 404.4a2 2 0 0 0 .8 1.4A487.7 487.7 0 0 0 176 479.9a1.9 1.9 0 0 0 2.1-.7A348.2 348.2 0 0 0 208.1 430.4a1.9 1.9 0 0 0 -1-2.6 321.2 321.2 0 0 1 -45.9-21.9 1.9 1.9 0 0 1 -.2-3.1c3.1-2.3 6.2-4.7 9.1-7.1a1.8 1.8 0 0 1 1.9-.3c96.2 43.9 200.4 43.9 295.5 0a1.8 1.8 0 0 1 1.9 .2c2.9 2.4 6 4.9 9.1 7.2a1.9 1.9 0 0 1 -.2 3.1 301.4 301.4 0 0 1 -45.9 21.8 1.9 1.9 0 0 0 -1 2.6 391.1 391.1 0 0 0 30 48.8 1.9 1.9 0 0 0 2.1 .7A486 486 0 0 0 610.7 405.7a1.9 1.9 0 0 0 .8-1.4C623.7 277.6 590.9 167.5 524.5 69.8zM222.5 337.6c-29 0-52.8-26.6-52.8-59.2S193.1 219.1 222.5 219.1c29.7 0 53.3 26.8 52.8 59.2C275.3 311 251.9 337.6 222.5 337.6zm195.4 0c-29 0-52.8-26.6-52.8-59.2S388.4 219.1 417.9 219.1c29.7 0 53.3 26.8 52.8 59.2C470.7 311 447.5 337.6 417.9 337.6z"/></svg>',
        url: 'https://discord.gg/your-invite',
        color: '#5865F2'
    },
    {
        id: 'youtube',
        name: 'YouTube',
        icon: 'YouTube',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"/></svg>',
        url: 'https://youtube.com/c/your-channel',
        color: '#FF0000'
    },
    {
        id: 'instagram',
        name: 'Instagram',
        icon: 'Instagram',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/></svg>',
        url: 'https://instagram.com/your-handle',
        color: '#E1306C'
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        icon: 'TikTok',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M448 209.9a210.1 210.1 0 0 1 -122.8-39.3V349.4A162.6 162.6 0 1 1 185 188.3V278.2a74.6 74.6 0 1 0 52.2 71.2V0l88 0a121.2 121.2 0 0 0 1.9 22.2h0A122.2 122.2 0 0 0 381 102.4a121.4 121.4 0 0 0 67 20.1z"/></svg>',
        url: 'https://tiktok.com/@your-handle',
        color: '#000000'
    },
    {
        id: 'twitter',
        name: 'Twitter',
        icon: 'Twitter',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M459.4 151.7c.3 4.5 .3 9.1 .3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 6.5 1 13 1.6 19.8 1.6 9.4 0 18.8-1.3 27.6-3.6-48.1-9.7-84.1-52-84.1-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37.4 14.3-53 51.7 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.5-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/></svg> ',
        url: 'https://twitter.com/your-handle',
        color: '#1DA1F2'
    },
    {
        id: 'github',
        name: 'GitHub',
        icon: 'Github',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/></svg>',
        url: 'https://github.com/your-handle',
        color: '#333333'
    },
    {
        id: 'kofi',
        name: 'Ko-fi',
        icon: 'Ko-Fi',
        svg: '<svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z"/></svg>',
        url: 'https://ko-fi.com/your-handle',
        color: '#FF5E5B'
    },
    {
        id: 'reddit',
        name: 'Reddit',
        icon: 'Reddit',
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M373 138.6c-25.2 0-46.3-17.5-51.9-41l0 0c-30.6 4.3-54.2 30.7-54.2 62.4l0 .2c47.4 1.8 90.6 15.1 124.9 36.3c12.6-9.7 28.4-15.5 45.5-15.5c41.3 0 74.7 33.4 74.7 74.7c0 29.8-17.4 55.5-42.7 67.5c-2.4 86.8-97 156.6-213.2 156.6S45.5 410.1 43 323.4C17.6 311.5 0 285.7 0 255.7c0-41.3 33.4-74.7 74.7-74.7c17.2 0 33 5.8 45.7 15.6c34-21.1 76.8-34.4 123.7-36.4l0-.3c0-44.3 33.7-80.9 76.8-85.5C325.8 50.2 347.2 32 373 32c29.4 0 53.3 23.9 53.3 53.3s-23.9 53.3-53.3 53.3zM157.5 255.3c-20.9 0-38.9 20.8-40.2 47.9s17.1 38.1 38 38.1s36.6-9.8 37.8-36.9s-14.7-49.1-35.7-49.1zM395 303.1c-1.2-27.1-19.2-47.9-40.2-47.9s-36.9 22-35.7 49.1c1.2 27.1 16.9 36.9 37.8 36.9s39.3-11 38-38.1zm-60.1 70.8c1.5-3.6-1-7.7-4.9-8.1c-23-2.3-47.9-3.6-73.8-3.6s-50.8 1.3-73.8 3.6c-3.9 .4-6.4 4.5-4.9 8.1c12.9 30.8 43.3 52.4 78.7 52.4s65.8-21.6 78.7-52.4z"/></svg>',
        url: 'https://reddit.com/u/your-handle',
        color: '#FF4500'
    }
];

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"7YbSD":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Initializes the floating search box functionality
 * @param searchBoxId - The ID of the search input element
 */ parcelHelpers.export(exports, "initializeSearchBox", ()=>initializeSearchBox);
var _searchBoxHelper = require("./searchBox.helper");
function initializeSearchBox(searchBoxId) {
    const searchBox = document.getElementById(searchBoxId);
    if (!searchBox) {
        console.error(`Search box element ${searchBoxId} not found`);
        return;
    }
    console.log("Initializing search box");
    searchBox.addEventListener('input', (event)=>{
        const target = event.target;
        const { value } = target;
        // Get last character if there is one
        if (value.length > 0) {
            const lastChar = value.charAt(value.length - 1);
            target.value = '';
            (0, _searchBoxHelper.createFloatingCharacter)(lastChar, searchBox);
        // Clear the input to give the illusion that characters float away
        // Add delay before clearing the value
        }
    });
}

},{"./searchBox.helper":"14ehM","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"14ehM":[function(require,module,exports,__globalThis) {
/**
 * Find the index of the first different character between two strings
 * @param str1 - First string
 * @param str2 - Second string
 * @returns The index of the first different character, or -1 if none found
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "findFirstDifferentCharIndex", ()=>findFirstDifferentCharIndex);
/**
 * Creates a floating character element with dynamic animation
 * @param character - The character to animate
 * @param sourceElement - The element from which the character originates
 */ parcelHelpers.export(exports, "createFloatingCharacter", ()=>createFloatingCharacter);
function findFirstDifferentCharIndex(str1, str2) {
    const minLength = Math.min(str1.length, str2.length);
    // Check for differences in overlapping part
    for(let i = 0; i < minLength; i++){
        if (str1.charAt(i) !== str2.charAt(i)) return i;
    }
    // If no differences in overlapping part, check if one string is longer
    if (str1.length !== str2.length) return minLength;
    // Strings are identical
    return -1;
}
function createFloatingCharacter(character, sourceElement) {
    // Create a span for the character
    const charElement = document.createElement('span');
    charElement.textContent = character;
    charElement.className = 'floating-character';
    // Get the position and dimensions of the search box
    const rect = sourceElement.getBoundingClientRect();
    // Randomize the starting position within the search box
    // Use 70% of the box width/height for a more natural typing feel
    const padding = {
        horizontal: rect.width * 0.15,
        vertical: rect.height * 0.15 // 15% padding from edges
    };
    const startX = rect.left + padding.horizontal + Math.random() * (rect.width - padding.horizontal * 2);
    const startY = rect.top + padding.vertical + Math.random() * (rect.height - padding.vertical * 2);
    // Set initial position
    charElement.style.left = `${startX}px`;
    charElement.style.top = `${startY}px`;
    // Initial styling
    charElement.style.opacity = '1';
    charElement.style.transform = 'scale(1)';
    charElement.style.fontSize = '24px';
    // Random color from theme
    const colors = [
        'var(--color-pink)',
        'var(--color-gold)',
        'var(--color-turquoise)',
        'var(--color-teal)'
    ];
    charElement.style.color = colors[Math.floor(Math.random() * colors.length)];
    // Add to the body
    document.body.appendChild(charElement);
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    // Calculate maximum distance based on viewport size
    // Use larger percentages to expand the area
    const maxDistanceX = Math.min(viewportWidth * 0.9, 600);
    const maxDistanceY = Math.min(viewportHeight * 0.9, 600);
    // Generate random direction vector for initial outward motion
    const angle = Math.random() * Math.PI * 2; // Full 360° random direction
    // Scale distance by viewport size for more expansive movement
    const distanceScale = Math.min(viewportWidth / 2560, viewportHeight / 1440 // Scale based on a reference height of 800px
    );
    // Calculate longer distances for wider distribution
    const distance = (150 + Math.random() * 250) * Math.max(distanceScale, 0.8);
    // Calculate position after flying outward
    const midX = startX + Math.cos(angle) * distance;
    const midY = startY + Math.sin(angle) * distance;
    // Final destination (more dramatic vertical movement)
    // If flying upward, go higher; if flying downward, keep going down
    let finalY;
    if (midY < startY) // Going up - fly higher
    finalY = midY - (150 + Math.random() * 250) * distanceScale;
    else {
        // Going down - continue downward then curve up at the end
        const downwardDistance = (100 + Math.random() * 100) * distanceScale;
        finalY = midY + downwardDistance - downwardDistance * 2; // Go down then back up
    }
    // Add some horizontal drift in the final position
    const finalX = midX + (Math.random() * 100 - 50) * distanceScale;
    // Animation timing - longer durations for larger screens
    const outwardDuration = 200 + Math.random() * 600; // ms
    const upwardDuration = 500 + Math.random() * 1000; // ms
    // Set animation properties
    charElement.style.transition = `none`;
    // Force a reflow to ensure the initial state is rendered
    charElement.offsetWidth;
    // First phase: Fly outward with rotation
    charElement.style.transition = `
        left ${outwardDuration}ms cubic-bezier(0.22, 0.68, 0.43, 0.99),
        top ${outwardDuration}ms cubic-bezier(0.22, 0.68, 0.43, 0.99),
        transform ${outwardDuration}ms cubic-bezier(0.34, 1.56, 0.64, 1)
    `;
    charElement.style.left = `${midX}px`;
    charElement.style.top = `${midY}px`;
    charElement.style.transform = `
        scale(${1 + Math.random() * 0.7})
        rotate(${-60 + Math.random() * 120}deg)
    `;
    // Second phase: Float upward/outward and fade out
    setTimeout(()=>{
        charElement.style.transition = `
            left ${upwardDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
            top ${upwardDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
            opacity ${upwardDuration}ms ease-out,
            transform ${upwardDuration}ms ease-out
        `;
        charElement.style.left = `${finalX}px`;
        charElement.style.top = `${finalY}px`;
        charElement.style.opacity = '0';
        charElement.style.transform = `
            scale(${0.6 + Math.random() * 0.5})
            rotate(${-120 + Math.random() * 240}deg)
        `;
    }, outwardDuration);
    // Remove element after animation completes
    setTimeout(()=>{
        charElement.remove();
    }, outwardDuration + upwardDuration + 100);
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"1Mc8h":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "OVERLAY_OPTIONS", ()=>OVERLAY_OPTIONS);
/**
 * Initialize the default overlay effect
 * @param containerId - ID of the container element (default: 'magic-canvas')
 * @param overlayId - ID of the overlay to initialize (default: based on URI or 'sakura')
 */ parcelHelpers.export(exports, "initializeOverlays", ()=>initializeOverlays);
/**
 * Apply a specific overlay effect
 * @param overlayId - ID of the overlay to apply
 * @param containerId - ID of the container element (default: 'magic-canvas')
 */ parcelHelpers.export(exports, "applyOverlayEffect", ()=>applyOverlayEffect);
/**
 * Disable any active overlay effects
 */ parcelHelpers.export(exports, "disableOverlays", ()=>disableOverlays);
var _animations = require("../utils/animations");
var _types = require("../utils/animations/core/types");
const OVERLAY_OPTIONS = [
    {
        id: 'snow',
        name: 'Snowfall',
        particleType: 'snow',
        config: {
            renderMode: 'SVG',
            color: '#FFFFFF',
            maxParticles: 100,
            sizeRange: [
                2,
                8
            ],
            fallSpeedRange: [
                1,
                3
            ],
            assetDirectory: '/assets/svgs/overlays/snow/',
            fallbackImage: '/assets/images/overlays/snow/' // Fallback if directory loading fails
        },
        path: '/snow.html'
    },
    {
        id: 'rain',
        name: 'Rainfall',
        particleType: 'rain',
        config: {
            renderMode: 'CANVAS',
            color: '#A3D5FF',
            maxParticles: 150,
            lengthRange: [
                10,
                20
            ],
            fallSpeedRange: [
                15,
                25
            ],
            thicknessRange: [
                1,
                3
            ],
            assetDirectory: '/assets/svgs/overlays/rain/',
            fallbackImage: '/assets/images/overlays/rain/' // Fallback if directory loading fails
        },
        path: '/rain.html'
    },
    {
        id: 'leaves',
        name: 'Falling Leaves',
        particleType: 'leaf',
        config: {
            renderMode: 'CANVAS',
            color: '#795548',
            maxParticles: 50,
            sizeRange: [
                15,
                30
            ],
            fallSpeedRange: [
                1,
                3
            ],
            rotationSpeedRange: [
                -2,
                2
            ],
            swayAmplitude: 3,
            colors: [
                '#A52A2A',
                '#8B4513',
                '#D2691E',
                '#CD853F',
                '#F4A460'
            ],
            assetDirectory: '/assets/svgs/overlays/leaves/',
            fallbackImage: '/assets/images/overlays/leaves/' // Fallback if directory loading fails
        },
        path: '/leaves.html'
    },
    {
        id: 'sakura',
        name: 'Sakura Petals',
        particleType: 'sakura',
        config: {
            renderMode: 'CANVAS',
            color: '#FFB7C5',
            maxParticles: 80,
            sizeRange: [
                8,
                15
            ],
            fallSpeedRange: [
                1,
                2
            ],
            rotationSpeedRange: [
                -1,
                1
            ],
            assetDirectory: '/assets/svgs/overlays/sakura/',
            fallbackImage: '/assets/images/overlays/sakura/' // Fallback if directory loading fails
        },
        path: '/sakura.html'
    },
    {
        id: 'hearts',
        name: 'Floating Hearts',
        particleType: 'heart',
        config: {
            renderMode: 'CANVAS',
            color: '#FF4081',
            maxParticles: 60,
            sizeRange: [
                10,
                20
            ],
            fallSpeedRange: [
                1,
                2
            ],
            pulseRange: [
                0.8,
                1.2
            ],
            assetDirectory: '/assets/svgs/overlays/hearts/',
            fallbackImage: '/assets/images/overlays/hearts/' // Fallback if directory loading fails
        },
        path: '/hearts.html'
    },
    {
        id: 'stars',
        name: 'Starry Night',
        particleType: 'star',
        config: {
            renderMode: 'CANVAS',
            maxParticles: 100,
            sizeRange: [
                1,
                4
            ],
            twinkleRange: [
                0.5,
                1.5
            ],
            colors: [
                '#FFFFFF',
                '#F0F8FF',
                '#FFFACD',
                '#FFE4B5'
            ],
            assetDirectory: '/assets/svgs/overlays/stars/',
            fallbackImage: '/assets/images/overlays/stars/' // Fallback if directory loading fails
        },
        path: '/stars.html'
    }
];
// Track currently active overlay engine
let activeEngineKey = null;
function initializeOverlays(containerId = 'magic-canvas', overlayId) {
    console.log('Initializing overlays...');
    // If no specific overlay is requested, try to get from URL path
    if (!overlayId) {
        const path = window.location.pathname;
        const pathMatch = OVERLAY_OPTIONS.find((option)=>path.includes(`/${option.id}`));
        if (pathMatch) overlayId = pathMatch.id;
        else // Default to sakura if no match
        overlayId = 'sakura';
    }
    applyOverlayEffect(overlayId, containerId);
}
function applyOverlayEffect(overlayId, containerId = 'magic-canvas') {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with ID '${containerId}' not found`);
        return;
    }
    // Stop any existing animation
    if (activeEngineKey) {
        const engine = window[activeEngineKey];
        if (engine && typeof engine.dispose === 'function') {
            engine.dispose();
            delete window[activeEngineKey];
        }
    }
    // Find requested overlay
    const overlay = OVERLAY_OPTIONS.find((option)=>option.id === overlayId);
    if (!overlay) {
        console.error(`Overlay with ID '${overlayId}' not found`);
        return;
    }
    console.log(`Applying overlay: ${overlay.name}`);
    // Map overlay ID to ParticleType
    const typeMap = {
        'snow': (0, _types.ParticleType).SNOW,
        'rain': (0, _types.ParticleType).RAIN,
        'leaves': (0, _types.ParticleType).LEAF,
        'sakura': (0, _types.ParticleType).SAKURA,
        'hearts': (0, _types.ParticleType).HEART,
        'stars': (0, _types.ParticleType).STAR
    };
    const particleType = typeMap[overlayId];
    if (!particleType) {
        console.error(`Unknown particle type for overlay: ${overlayId}`);
        return;
    }
    // Convert overlay config to particle options
    const options = convertConfigToParticleOptions(overlay.config);
    // Initialize the animation
    (0, _animations.initializeOverlays)(containerId, particleType, options).then(()=>{
        activeEngineKey = `particleEngine_${containerId}_${particleType}`;
        console.log(`Overlay applied: ${overlay.name}`);
        // Update URL with query param for current effect (without page reload)
        const url = new URL(window.location.href);
        url.searchParams.set('overlay', overlayId);
        window.history.replaceState({}, '', url.toString());
    }).catch((error)=>{
        console.error('Failed to initialize overlay:', error);
    });
}
/**
 * Convert overlay config to particle options
 * @param config - Overlay configuration
 * @returns Particle options object
 */ function convertConfigToParticleOptions(config) {
    // Create the options object with all required properties
    const options = {
        count: config.maxParticles,
        speed: {
            min: 1,
            max: 3
        },
        size: {
            min: 5,
            max: 20
        },
        opacity: {
            min: 0.6,
            max: 1.0
        },
        fadeThreshold: 0.8,
        fadeSpeed: 0.02,
        assetPaths: []
    };
    // Add asset paths if available
    // if (config.svgPath || config.imagePath) {
    //     options.assetPaths = [];
    //     // Support arrays of paths
    //     if (typeof config.svgPath === 'string') {
    //         options.assetPaths.push(config.svgPath);
    //     } else if (Array.isArray(config.svgPath)) {
    //         options.assetPaths.push(...config.svgPath);
    //     }
    //     if (typeof config.imagePath === 'string') {
    //         options.assetPaths.push(config.imagePath);
    //     } else if (Array.isArray(config.imagePath)) {
    //         options.assetPaths.push(...config.imagePath);
    //     }
    // }
    // Handle asset paths and directories
    if (config.assetDirectory) // If a directory is specified, add it as a single path
    // The asset loader will handle scanning the directory
    options.assetPaths = [
        config.assetDirectory
    ];
    else {
        // Handle individual paths
        if (config.svgPath) {
            if (Array.isArray(config.svgPath)) options.assetPaths.push(...config.svgPath);
            else options.assetPaths.push(config.svgPath);
        }
        if (config.imagePath) {
            if (Array.isArray(config.imagePath)) options.assetPaths.push(...config.imagePath);
            else options.assetPaths.push(config.imagePath);
        }
    }
    // Add fallback image if specified
    if (config.fallbackImage && options.assetPaths.length === 0) options.assetPaths.push(config.fallbackImage);
    // Add size range if available
    const sizeConfig = config;
    if (sizeConfig.sizeRange) options.size = {
        min: sizeConfig.sizeRange[0],
        max: sizeConfig.sizeRange[1]
    };
    // Add fall speed range if available
    if (sizeConfig.fallSpeedRange) options.speed = {
        min: sizeConfig.fallSpeedRange[0],
        max: sizeConfig.fallSpeedRange[1]
    };
    // Add colors if available
    if (sizeConfig.colors) options.colors = sizeConfig.colors;
    else if (config.color) options.colors = [
        config.color
    ];
    // Add rotation speed range if available
    if (sizeConfig.rotationSpeedRange) options.rotation = {
        speed: (sizeConfig.rotationSpeedRange[0] + sizeConfig.rotationSpeedRange[1]) / 2
    };
    // Add sway amplitude if available
    if (sizeConfig.swayAmplitude) options.wind = sizeConfig.swayAmplitude;
    // Add pulse range if available
    if (sizeConfig.pulseRange) options.pulse = {
        min: sizeConfig.pulseRange[0],
        max: sizeConfig.pulseRange[1]
    };
    // Add twinkle range if available
    if (sizeConfig.twinkleRange) options.twinkle = {
        min: sizeConfig.twinkleRange[0],
        max: sizeConfig.twinkleRange[1]
    };
    // Map render mode
    if (config.renderMode) switch(config.renderMode){
        case 'SVG':
            options.renderMode = (0, _types.AnimationRenderMode).SVG;
            break;
        case 'CANVAS':
            options.renderMode = (0, _types.AnimationRenderMode).CANVAS;
            break;
        case 'DOM':
            options.renderMode = (0, _types.AnimationRenderMode).IMAGE;
            break;
    }
    return options;
}
function disableOverlays() {
    if (activeEngineKey) {
        const engine = window[activeEngineKey];
        if (engine && typeof engine.dispose === 'function') {
            engine.dispose();
            delete window[activeEngineKey];
            activeEngineKey = null;
            // Update URL to remove overlay param
            const url = new URL(window.location.href);
            url.searchParams.delete('overlay');
            window.history.replaceState({}, '', url.toString());
            console.log('Overlays disabled');
        }
    }
}

},{"../utils/animations":"9n58n","../utils/animations/core/types":"fBWll","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9n58n":[function(require,module,exports,__globalThis) {
// src/utils/animations/index.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ParticleType", ()=>(0, _types.ParticleType));
/**
 * Initialize the particle overlay system for a given container
 * @param containerId - ID of the container element
 * @param type - Type of particle effect to create
 * @param options - Configuration options for the effect
 * @returns Promise resolving when the animation is initialized and started
 */ parcelHelpers.export(exports, "initializeOverlays", ()=>initializeOverlays);
var _particleFactory = require("./particle-factory");
var _types = require("./core/types");
async function initializeOverlays(containerId, type, options = {}) {
    try {
        // Base default options for all particle types
        const baseDefaults = {
            count: 50,
            speed: {
                min: 1,
                max: 3
            },
            size: {
                min: 5,
                max: 15
            },
            opacity: {
                min: 0.6,
                max: 1.0
            },
            wind: 0,
            gravity: 0,
            fadeThreshold: 0.9,
            fadeSpeed: 0.05,
            interactWithElements: false,
            assetPaths: []
        };
        let specificDefaults = {};
        // Set type-specific defaults
        let defaultOptions = {};
        switch(type){
            case (0, _types.ParticleType).SAKURA:
                defaultOptions = {
                    count: 30,
                    speed: {
                        min: 1,
                        max: 2
                    },
                    size: {
                        min: 10,
                        max: 20
                    },
                    opacity: {
                        min: 0.6,
                        max: 0.9
                    },
                    wind: 0.5,
                    colors: [
                        '#ffc6d9',
                        '#ffcce1',
                        '#ffe0e9',
                        '#fff0f5'
                    ]
                };
                break;
            case (0, _types.ParticleType).RAIN:
                defaultOptions = {
                    count: 200,
                    speed: {
                        min: 10,
                        max: 20
                    },
                    size: {
                        min: 1,
                        max: 3
                    },
                    opacity: {
                        min: 0.2,
                        max: 0.5
                    },
                    wind: -1,
                    gravity: 9.8,
                    fadeThreshold: 0.95,
                    fadeSpeed: 0.1
                };
                break;
            case (0, _types.ParticleType).LEAF:
                defaultOptions = {
                    count: 15,
                    speed: {
                        min: 1,
                        max: 3
                    },
                    size: {
                        min: 15,
                        max: 25
                    },
                    opacity: {
                        min: 0.8,
                        max: 1
                    },
                    wind: 1.5,
                    gravity: 0.5
                };
                break;
            case (0, _types.ParticleType).HEART:
                defaultOptions = {
                    count: 20,
                    speed: {
                        min: 0.5,
                        max: 1.5
                    },
                    size: {
                        min: 10,
                        max: 25
                    },
                    opacity: {
                        min: 0.6,
                        max: 0.9
                    }
                };
                break;
            case (0, _types.ParticleType).STAR:
                defaultOptions = {
                    count: 100,
                    speed: {
                        min: 0,
                        max: 0
                    },
                    size: {
                        min: 1,
                        max: 4
                    },
                    opacity: {
                        min: 0.5,
                        max: 1
                    }
                };
                break;
        }
        // Merge defaults with provided options - ensure required fields
        const mergedOptions = {
            ...baseDefaults,
            ...specificDefaults,
            ...options
        };
        // Create and start the animation
        const engine = await (0, _particleFactory.createParticleAnimation)(containerId, type, mergedOptions);
        engine.start();
        // Store engine reference on window for potential cleanup
        const engineKey = `particleEngine_${containerId}_${type}`;
        window[engineKey] = engine;
        // Setup clean up on page unload
        window.addEventListener('beforeunload', ()=>{
            if (window[engineKey]) {
                window[engineKey].dispose();
                delete window[engineKey];
            }
        });
    } catch (error) {
        console.error('Failed to initialize particle overlay:', error);
        throw error;
    }
}

},{"./particle-factory":"6g2fV","./core/types":"fBWll","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"6g2fV":[function(require,module,exports,__globalThis) {
// src/utils/animations/particle-factory.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
// import { StarParticle } from './particles/star-particle';
parcelHelpers.export(exports, "createParticleAnimation", ()=>createParticleAnimation);
/**
 * Initialize particles system with the specified configuration
 * @param containerId - ID of the container element
 * @param type - Type of particle effect to create
 * @param options - Configuration options for particles
 * @returns Promise that resolves when animation has started
 */ parcelHelpers.export(exports, "initParticles", ()=>initParticles);
var _particleEngine = require("./core/particle-engine");
var _canvasDrawer = require("./core/canvas-drawer");
var _svgDrawer = require("./core/svg-drawer");
var _types = require("./core/types");
var _snowParticle = require("./particles/snow-particle");
var _sakuraParticle = require("./particles/sakura-particle");
var _rainParticle = require("./particles/rain-particle");
var _leafParticle = require("./particles/leaf-particle");
var _heartParticle = require("./particles/heart-particle");
async function createParticleAnimation(containerId, type, options) {
    // Set default options
    const defaultOptions = {
        count: 50,
        speed: {
            min: 1,
            max: 3
        },
        size: {
            min: 5,
            max: 20
        },
        opacity: {
            min: 0.6,
            max: 1.0
        },
        fadeThreshold: 0.8,
        fadeSpeed: 0.02,
        wind: 0,
        gravity: 0.5,
        interactWithElements: false,
        renderMode: (0, _types.AnimationRenderMode).CANVAS
    };
    // Merge defaults with provided options
    const mergedOptions = {
        ...defaultOptions,
        ...options
    };
    // Create drawer based on render mode
    let drawer;
    if (mergedOptions.renderMode === (0, _types.AnimationRenderMode).SVG && mergedOptions.assetPaths?.length) drawer = new (0, _svgDrawer.SVGDrawer)(containerId, mergedOptions.assetPaths);
    else drawer = new (0, _canvasDrawer.CanvasDrawer)(containerId, type, mergedOptions.assetPaths || []);
    // Create appropriate factory function based on particle type
    let particleFactory;
    switch(type){
        case (0, _types.ParticleType).SNOW:
            particleFactory = (0, _snowParticle.SnowParticle).create;
            break;
        case (0, _types.ParticleType).SAKURA:
            particleFactory = (0, _sakuraParticle.SakuraParticle).create;
            break;
        case (0, _types.ParticleType).RAIN:
            particleFactory = (0, _rainParticle.RainParticle).create;
            break;
        case (0, _types.ParticleType).LEAF:
            particleFactory = (0, _leafParticle.LeafParticle).create;
            break;
        case (0, _types.ParticleType).HEART:
            particleFactory = (0, _heartParticle.HeartParticle).create;
            break;
        // case ParticleType.STAR:
        //   particleFactory = StarParticle.create;
        //   break;
        default:
            throw new Error(`Unsupported particle type: ${type}`);
    }
    // Create and initialize the engine
    const engine = new (0, _particleEngine.ParticleEngine)(containerId, particleFactory, drawer, mergedOptions);
    await engine.initialize();
    return engine;
}
async function initParticles(containerId, type, options) {
    try {
        const engine = await createParticleAnimation(containerId, type, options);
        engine.start();
        // Store the engine globally for later access (cleanup, etc.)
        const engineKey = `particleEngine_${containerId}_${type}`;
        window[engineKey] = engine;
        return;
    } catch (error) {
        console.error('Failed to initialize particles:', error);
        throw error;
    }
}
/**
 * Converts animation options from overlay config to particle options
 * @param config - The animation options from overlay config
 * @returns Standardized ParticleOptions
 */ function mapAnimationOptionsToParticleOptions(config) {
    // Default options
    const options = {
        count: 100,
        speed: {
            min: 1,
            max: 3
        },
        size: {
            min: 5,
            max: 20
        },
        opacity: {
            min: 0.6,
            max: 1.0
        },
        fadeThreshold: 0.8,
        fadeSpeed: 0.02,
        wind: 0,
        gravity: 0.5,
        interactWithElements: false
    };
    // Map specific config properties
    if (config) {
        if (config.maxParticles) options.count = config.maxParticles;
        if (config.sizeRange) options.size = {
            min: config.sizeRange[0],
            max: config.sizeRange[1]
        };
        if (config.fallSpeedRange) options.speed = {
            min: config.fallSpeedRange[0],
            max: config.fallSpeedRange[1]
        };
        if (config.color) options.colors = [
            config.color
        ];
        if (config.svgPath) options.assetPaths = config.svgPath;
        if (config.renderMode) options.renderMode = config.renderMode;
    }
    return options;
}

},{"./core/particle-engine":"iSift","./core/canvas-drawer":"3Il3d","./core/svg-drawer":"3lQZf","./core/types":"fBWll","./particles/snow-particle":"j1tiZ","./particles/sakura-particle":"8mYKt","./particles/rain-particle":"Tekby","./particles/leaf-particle":"dX9Hi","./particles/heart-particle":"87uY3","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"iSift":[function(require,module,exports,__globalThis) {
// src/utils/animations/core/particle-engine.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ParticleEngine", ()=>ParticleEngine);
class ParticleEngine {
    /**
   * Creates a particle animation engine
   * @param containerId - ID of the container element
   * @param particleFactory - Factory function to create particles
   * @param drawer - Drawer for rendering particles
   * @param options - Animation options
   */ constructor(containerId, particleFactory, drawer, options){
        this.particleFactory = particleFactory;
        this.drawer = drawer;
        this.particles = [];
        this.animationFrameId = null;
        this.lastFrameTime = 0;
        this.containerWidth = 0;
        this.containerHeight = 0;
        this.fixedTimeStep = 1000 / 60;
        this.accumulatedTime = 0;
        this.timeThreshold = 100;
        this.initialized = false;
        this.containerId = containerId;
        this.maxParticles = options.count;
        this.options = options;
        // Check that container exists
        const container = document.getElementById(containerId);
        if (!container) throw new Error(`Container with ID '${containerId}' not found`);
        // Get container dimensions
        const rect = container.getBoundingClientRect();
        this.containerWidth = rect.width;
        this.containerHeight = rect.height;
        // Add resize listener with debounce
        let resizeTimeout = null;
        window.addEventListener('resize', ()=>{
            if (resizeTimeout !== null) window.clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(()=>{
                this.handleResize();
            }, 200);
        });
    }
    /**
   * Initialize the particle engine
   * @returns Promise that resolves when initialization is complete
   */ async initialize() {
        if (this.initialized) return;
        try {
            // Initialize drawer
            await this.drawer.initialize();
            // Create initial particles
            this.createInitialParticles();
            this.initialized = true;
        } catch (error) {
            console.error('Particle engine initialization error:', error);
            throw error;
        }
    }
    /**
   * Create the initial set of particles
   */ createInitialParticles() {
        this.particles = [];
        for(let i = 0; i < this.maxParticles; i++)this.particles.push(this.particleFactory(this.containerWidth, this.containerHeight, this.options));
    }
    /**
   * Handle window resize by updating container dimensions
   */ handleResize() {
        const container = document.getElementById(this.containerId);
        if (container) {
            const rect = container.getBoundingClientRect();
            this.containerWidth = rect.width;
            this.containerHeight = rect.height;
        }
    }
    /**
   * Start the animation loop
   */ start() {
        if (!this.initialized) throw new Error('Engine must be initialized before starting');
        if (this.animationFrameId !== null) return; // Already running
        this.lastFrameTime = performance.now();
        this.animationFrameId = requestAnimationFrame(this.animationLoop.bind(this));
    }
    /**
   * Stop the animation loop
   */ stop() {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = null;
        }
    }
    /**
   * Animation loop using fixed timestep for stable simulation
   * @param currentTime - Current time from requestAnimationFrame
   */ animationLoop(currentTime) {
        if (this.animationFrameId === null) return; // Animation was stopped
        // Calculate delta time with upper limit to prevent large jumps
        let deltaTime = currentTime - this.lastFrameTime;
        if (deltaTime > this.timeThreshold) deltaTime = this.timeThreshold;
        this.lastFrameTime = currentTime;
        this.accumulatedTime += deltaTime;
        // Fixed time step loop
        while(this.accumulatedTime >= this.fixedTimeStep){
            this.updateParticles(this.fixedTimeStep);
            this.accumulatedTime -= this.fixedTimeStep;
        }
        // Render current state
        this.renderParticles();
        // Continue animation loop
        this.animationFrameId = requestAnimationFrame(this.animationLoop.bind(this));
    }
    /**
   * Update all particles
   * @param deltaTime - Time elapsed since last update in milliseconds
   */ updateParticles(deltaTime) {
        // Scale deltaTime to seconds for more intuitive physics
        const dt = deltaTime / 1000;
        // Update each particle
        for(let i = 0; i < this.particles.length; i++){
            const isActive = this.particles[i].update(dt);
            // Replace inactive particles with new ones
            if (!isActive) this.particles[i] = this.particleFactory(this.containerWidth, this.containerHeight, this.options);
        }
    }
    /**
   * Render all particles
   */ renderParticles() {
        this.drawer.clear();
        for(let i = 0; i < this.particles.length; i++)this.drawer.drawParticle(this.particles[i], i);
    }
    /**
   * Update particle options
   * @param options - New options to apply
   */ updateOptions(options) {
        // Update options object with new values
        Object.assign(this.options, options);
        // Update existing particles if count changes
        if (options.count !== undefined && options.count !== this.maxParticles) {
            const newCount = options.count;
            if (newCount > this.particles.length) // Add more particles
            for(let i = this.particles.length; i < newCount; i++)this.particles.push(this.particleFactory(this.containerWidth, this.containerHeight, this.options));
            else if (newCount < this.particles.length) // Remove excess particles
            this.particles = this.particles.slice(0, newCount);
        }
    }
    /**
   * Clean up resources
   */ dispose() {
        this.stop();
        this.drawer.dispose();
        this.particles = [];
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3Il3d":[function(require,module,exports,__globalThis) {
// src/utils/animations/core/canvas-drawer.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "CanvasDrawer", ()=>CanvasDrawer);
var _types = require("./types");
class CanvasDrawer {
    /**
     * Creates a canvas-based drawer for particle rendering
     * @param containerId - ID of the container element
     * @param particleType - Type of particles to draw
     * @param imagePaths - Optional array of image paths for image-based particles
     */ constructor(containerId, particleType, imagePaths = []){
        this.containerId = containerId;
        this.imagePaths = imagePaths;
        this.images = [];
        const container = document.getElementById(containerId);
        if (!container) throw new Error(`Container with ID '${containerId}' not found`);
        this.particleType = particleType;
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        container.appendChild(this.canvas);
        // Get context
        const context = this.canvas.getContext('2d');
        if (!context) throw new Error('Failed to get 2D context from canvas');
        this.ctx = context;
        // Configure canvas size
        this.resizeCanvas();
        // Add resize listener with debounce
        let resizeTimeout = null;
        window.addEventListener('resize', ()=>{
            if (resizeTimeout !== null) window.clearTimeout(resizeTimeout);
            resizeTimeout = window.setTimeout(()=>{
                this.resizeCanvas();
            }, 200);
        });
    }
    /**
     * Resize canvas to match container dimensions
     */ resizeCanvas() {
        const container = document.getElementById(this.containerId);
        if (container) {
            const rect = container.getBoundingClientRect();
            // Set actual dimensions in pixels
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
        }
    }
    /**
     * Initialize by loading necessary images
     */ async initialize() {
        if (this.imagePaths.length === 0) return;
        try {
            // Load all images concurrently
            const loadPromises = this.imagePaths.map(async (path)=>{
                return new Promise((resolve, reject)=>{
                    const img = new Image();
                    img.onload = ()=>resolve(img);
                    img.onerror = ()=>reject(new Error(`Failed to load image: ${path}`));
                    img.src = path;
                });
            });
            this.images = await Promise.all(loadPromises);
        } catch (error) {
            console.error('Image loading error:', error);
            throw error;
        }
    }
    /**
     * Draw a particle to the canvas
     * @param particle - Particle to draw
     */ drawParticle(particle) {
        const state = particle.getState();
        this.ctx.save();
        // Position at particle center
        this.ctx.translate(state.position.x, state.position.y);
        // Apply rotation if specified
        if (state.rotation) this.ctx.rotate(state.rotation * Math.PI / 180);
        // Apply opacity
        this.ctx.globalAlpha = state.opacity;
        // Choose appropriate drawing method based on particle type and available resources
        if (this.images.length > 0) {
            // Image-based particle
            const imgIndex = Math.floor(Math.random() * this.images.length) % this.images.length;
            const img = this.images[imgIndex];
            this.ctx.drawImage(img, -state.size / 2, -state.size / 2, state.size, state.size);
        } else // Use specialized drawing functions based on particle type
        switch(this.particleType){
            case (0, _types.ParticleType).HEART:
                this.drawHeart(0, 0, state.size, state.color || '#FF4081');
                break;
            case (0, _types.ParticleType).LEAF:
                this.drawLeaf(0, 0, state.size, state.color || '#795548');
                break;
            case (0, _types.ParticleType).SAKURA:
                this.drawSakuraPetal(0, 0, state.size, state.color || '#FFB7C5');
                break;
            case (0, _types.ParticleType).RAIN:
                this.drawRaindrop(0, 0, state.size, state.color || '#A3D5FF', state);
                break;
            case (0, _types.ParticleType).STAR:
                this.drawStar(0, 0, state.size, state.color || '#FFFFFF');
                break;
            default:
                // Simple circle as fallback
                this.ctx.beginPath();
                this.ctx.arc(0, 0, state.size / 2, 0, Math.PI * 2);
                this.ctx.fillStyle = state.color || 'white';
                this.ctx.fill();
                break;
        }
        this.ctx.restore();
    }
    /**
     * Draw a heart shape
     */ drawHeart(x, y, size, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + size / 4);
        // Left bump
        this.ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y, x, y + size);
        // Right bump
        this.ctx.bezierCurveTo(x + size, y, x + size / 2, y - size / 2, x, y + size / 4);
        this.ctx.fillStyle = color;
        this.ctx.fill();
    }
    /**
     * Draw a leaf shape
     */ drawLeaf(x, y, size, color) {
        // Main leaf shape
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - size / 2);
        // Draw leaf outline
        this.ctx.bezierCurveTo(x + size / 3, y - size / 3, x + size / 2, y, x, y + size / 2);
        this.ctx.bezierCurveTo(x - size / 2, y, x - size / 3, y - size / 3, x, y - size / 2);
        // Fill leaf
        this.ctx.fillStyle = color;
        this.ctx.fill();
        // Draw leaf vein
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - size / 2);
        this.ctx.lineTo(x, y + size / 2);
        this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        this.ctx.lineWidth = size / 15;
        this.ctx.stroke();
        // Draw secondary veins
        const veins = 3;
        const maxVeins = 10; // Upper bound
        const safeVeins = Math.min(veins, maxVeins);
        for(let i = 1; i <= safeVeins; i++){
            const yPos = y - size / 2 + size * i / (safeVeins + 1);
            this.ctx.beginPath();
            this.ctx.moveTo(x, yPos);
            this.ctx.lineTo(x + size / 3, yPos - size / 10);
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.lineWidth = size / 25;
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(x, yPos);
            this.ctx.lineTo(x - size / 3, yPos - size / 10);
            this.ctx.stroke();
        }
    }
    /**
     * Draw a raindrop
     */ drawRaindrop(x, y, size, color, state) {
        // Draw raindrop line (get length from state if available)
        const length = state.length || size * 4;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - length / 2);
        this.ctx.lineTo(x, y + length / 2);
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = size;
        this.ctx.lineCap = 'round';
        this.ctx.stroke();
    }
    /**
     * Draw a sakura petal
     */ drawSakuraPetal(x, y, size, color) {
        // Draw petal (simple oval shape)
        this.ctx.beginPath();
        this.ctx.ellipse(x, y, size, size / 2, 0, 0, Math.PI * 2);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        // Add detail line in the middle for more realism
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - size / 3);
        this.ctx.lineTo(x, y + size / 3);
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = size / 10;
        this.ctx.stroke();
    }
    /**
     * Draw a star shape
     */ drawStar(x, y, size, color) {
        const spikes = 5;
        const outerRadius = size / 2;
        const innerRadius = size / 5;
        this.ctx.beginPath();
        for(let i = 0; i < spikes * 2; i++){
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = Math.PI * i / spikes;
            const pointX = x + radius * Math.sin(angle);
            const pointY = y + radius * Math.cos(angle);
            if (i === 0) this.ctx.moveTo(pointX, pointY);
            else this.ctx.lineTo(pointX, pointY);
        }
        this.ctx.closePath();
        this.ctx.fillStyle = color;
        this.ctx.fill();
        // Add a glow effect
        this.ctx.shadowBlur = size / 2;
        this.ctx.shadowColor = color;
    }
    /**
     * Clear the canvas
     */ clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    /**
     * Release canvas resources
     */ dispose() {
        if (this.canvas.parentNode) this.canvas.parentNode.removeChild(this.canvas);
    }
}

},{"./types":"fBWll","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fBWll":[function(require,module,exports,__globalThis) {
// src/utils/animations/core/types.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AnimationRenderMode", ()=>AnimationRenderMode);
parcelHelpers.export(exports, "ParticleType", ()=>ParticleType);
var AnimationRenderMode = /*#__PURE__*/ function(AnimationRenderMode) {
    AnimationRenderMode["CANVAS"] = "CANVAS";
    AnimationRenderMode["SVG"] = "SVG";
    AnimationRenderMode["IMAGE"] = "IMAGE";
    return AnimationRenderMode;
}({});
var ParticleType = /*#__PURE__*/ function(ParticleType) {
    ParticleType["SNOW"] = "snow";
    ParticleType["RAIN"] = "rain";
    ParticleType["SAKURA"] = "sakura";
    ParticleType["LEAF"] = "leaf";
    ParticleType["HEART"] = "heart";
    ParticleType["STAR"] = "star";
    return ParticleType;
}({});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3lQZf":[function(require,module,exports,__globalThis) {
// src/utils/animations/core/svg-drawer.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SVGDrawer", ()=>SVGDrawer);
var _assetLoader = require("./asset-loader");
class SVGDrawer {
    /**
   * Creates an SVG drawer for rendering SVG-based particles
   * @param containerId - ID of the container element
   * @param svgPaths - Array of paths to SVG files
   */ constructor(containerId, svgPaths){
        this.containerId = containerId;
        this.svgPaths = svgPaths;
        this.svgElements = [];
        this.svgTemplates = [];
        const container = document.getElementById(containerId);
        if (!container) throw new Error(`Container with ID '${containerId}' not found`);
        this.svgContainer = document.createElement('div');
        this.svgContainer.style.position = 'absolute';
        this.svgContainer.style.top = '0';
        this.svgContainer.style.left = '0';
        this.svgContainer.style.width = '100%';
        this.svgContainer.style.height = '100%';
        this.svgContainer.style.pointerEvents = 'none';
        this.svgContainer.style.overflow = 'hidden';
        container.appendChild(this.svgContainer);
        // Get dimensions of the container
        const rect = container.getBoundingClientRect();
        this.containerWidth = rect.width;
        this.containerHeight = rect.height;
    }
    /**
 * Initialize by loading all SVG templates
 */ async initialize() {
        try {
            let filesToLoad = [];
            // Check if we have a directory
            if (this.svgPaths.length === 1 && this.svgPaths[0].endsWith('/')) {
                // Load from directory
                filesToLoad = await (0, _assetLoader.AssetLoader).loadFromDirectory(this.svgPaths[0], '.svg');
                console.log(`Found ${filesToLoad.length} SVGs in directory ${this.svgPaths[0]}`);
            } else // Use provided paths
            filesToLoad = this.svgPaths;
            // If no files found, generate placeholders
            if (filesToLoad.length === 0) {
                console.warn('No SVG files found. Generating placeholders...');
                this.createFallbackSVG();
                return;
            }
            // Try to load each SVG file
            let successCount = 0;
            for (const path of filesToLoad)try {
                const svgText = await (0, _assetLoader.AssetLoader).loadSVGFile(path);
                if (!svgText) continue;
                // Process the SVG content
                const svgElement = this.parseSVG(svgText);
                if (svgElement) {
                    this.svgTemplates.push(svgElement);
                    successCount++;
                }
            } catch (error) {
                console.warn(`Error loading SVG: ${path}`, error);
            }
            console.log(`Successfully loaded ${successCount} of ${filesToLoad.length} SVG templates`);
            if (this.svgTemplates.length === 0) {
                console.warn('No valid SVG templates were loaded. Creating fallback shapes.');
                this.createFallbackSVG();
            }
        } catch (error) {
            console.error('SVG initialization error:', error);
            this.createFallbackSVG();
        }
    }
    /**
 * Parse an SVG string into an SVG element
 */ parseSVG(svgText) {
        try {
            // Clean up the SVG content
            let cleanedSvg = svgText.trim();
            // Remove XML declaration if present
            cleanedSvg = cleanedSvg.replace(/<\?xml[^>]*>\s*/i, '');
            // Remove DOCTYPE if present
            cleanedSvg = cleanedSvg.replace(/<!DOCTYPE[^>]*>\s*/i, '');
            // Make sure we have an SVG tag
            if (!cleanedSvg.includes('<svg')) return null;
            // Parse the SVG
            const parser = new DOMParser();
            const svgDoc = parser.parseFromString(cleanedSvg, 'image/svg+xml');
            // Check for parsing errors
            const parserError = svgDoc.querySelector('parsererror');
            if (parserError) {
                console.warn('SVG parsing error:', parserError.textContent);
                return null;
            }
            const svgElement = svgDoc.documentElement;
            if (!(svgElement instanceof SVGElement)) return null;
            // Ensure the SVG has proper viewBox
            if (!svgElement.getAttribute('viewBox')) {
                // Try to get width and height
                const width = svgElement.getAttribute('width') || '100';
                const height = svgElement.getAttribute('height') || '100';
                svgElement.setAttribute('viewBox', `0 0 ${width} ${height}`);
            }
            // Assign a unique ID to prevent conflicts
            svgElement.id = `svg-${Math.random().toString(36).substring(2, 10)}`;
            return svgElement;
        } catch (error) {
            console.warn('Error parsing SVG:', error);
            return null;
        }
    }
    /**
   * Draw a particle using SVG
   * @param particle - Particle to draw
   * @param index - Index of the particle in the collection
   */ drawParticle(particle, index) {
        // Ensure we have SVG templates
        if (this.svgTemplates.length === 0) return;
        // Get particle state
        const state = particle.getState();
        // Create or update SVG element
        if (!this.svgElements[index]) {
            // Select random template
            const templateIndex = Math.floor(Math.random() * this.svgTemplates.length);
            const template = this.svgTemplates[templateIndex];
            // Clone the template
            const newElement = template.cloneNode(true);
            // Configure element
            newElement.style.position = 'absolute';
            newElement.style.pointerEvents = 'none';
            // Append to container
            this.svgContainer.appendChild(newElement);
            this.svgElements[index] = newElement;
        }
        // Update element position and properties
        const element = this.svgElements[index];
        element.style.transform = `translate(${state.position.x}px, ${state.position.y}px) rotate(${state.rotation || 0}deg)`;
        element.style.width = `${state.size}px`;
        element.style.height = `${state.size}px`;
        element.style.opacity = state.opacity.toString();
        // Update color if applicable
        if (state.color) element.style.fill = state.color;
    }
    /**
   * Clear all SVG elements
   */ clear() {
        this.svgElements.forEach((element)=>{
            if (element && element.parentNode) element.parentNode.removeChild(element);
        });
        this.svgElements = [];
    }
    /**
   * Release resources
   */ dispose() {
        this.clear();
        if (this.svgContainer.parentNode) this.svgContainer.parentNode.removeChild(this.svgContainer);
    }
    createFallbackSVG() {
        // Create a basic snowflake SVG as fallback
        const fallbackSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        fallbackSvg.setAttribute('viewBox', '0 0 100 100');
        fallbackSvg.setAttribute('width', '100');
        fallbackSvg.setAttribute('height', '100');
        // Create a simple snowflake shape (six-pointed star)
        for(let i = 0; i < 6; i++){
            const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const angle = Math.PI / 3 * i;
            line.setAttribute('x1', '50');
            line.setAttribute('y1', '50');
            line.setAttribute('x2', (50 + 40 * Math.cos(angle)).toString());
            line.setAttribute('y2', (50 + 40 * Math.sin(angle)).toString());
            line.setAttribute('stroke', 'white');
            line.setAttribute('stroke-width', '4');
            fallbackSvg.appendChild(line);
            // Add smaller lines (branches)
            const branch1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const branch2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
            const branchPoint = {
                x: 50 + 25 * Math.cos(angle),
                y: 50 + 25 * Math.sin(angle)
            };
            branch1.setAttribute('x1', branchPoint.x.toString());
            branch1.setAttribute('y1', branchPoint.y.toString());
            branch1.setAttribute('x2', (branchPoint.x + 15 * Math.cos(angle + Math.PI / 4)).toString());
            branch1.setAttribute('y2', (branchPoint.y + 15 * Math.sin(angle + Math.PI / 4)).toString());
            branch2.setAttribute('x1', branchPoint.x.toString());
            branch2.setAttribute('y1', branchPoint.y.toString());
            branch2.setAttribute('x2', (branchPoint.x + 15 * Math.cos(angle - Math.PI / 4)).toString());
            branch2.setAttribute('y2', (branchPoint.y + 15 * Math.sin(angle - Math.PI / 4)).toString());
            branch1.setAttribute('stroke', 'white');
            branch1.setAttribute('stroke-width', '2');
            branch2.setAttribute('stroke', 'white');
            branch2.setAttribute('stroke-width', '2');
            fallbackSvg.appendChild(branch1);
            fallbackSvg.appendChild(branch2);
        }
        this.svgTemplates.push(fallbackSvg);
    }
}

},{"./asset-loader":"fEkzs","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"fEkzs":[function(require,module,exports,__globalThis) {
// src/utils/animations/core/asset-loader.ts
/**
 * Asset loader utility optimized for static hosting environments like GitHub Pages
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "AssetLoader", ()=>AssetLoader);
class AssetLoader {
    static{
        this.cache = {};
    }
    /**
     * Loads assets from a directory using a manifest file approach
     * @param directory - Directory path
     * @param extension - File extension filter (e.g., '.svg')
     * @returns Promise resolving to array of file URLs
     */ static async loadFromDirectory(directory, extension = '.svg') {
        // Normalize directory path
        const normalizedDir = directory.endsWith('/') ? directory : `${directory}/`;
        const cacheKey = `${normalizedDir}_${extension}`;
        // Try accessing your files directly based on the list you have
        const knownFiles = [
            "23838.svg",
            "23843.svg",
            "23857.svg",
            "23901.svg",
            "23904.svg",
            "23916.svg",
            "23956.svg",
            "23958.svg",
            "24209.svg",
            "24239.svg",
            "uu0604design_20220106_\u96EA\u306E\u7D50\u66761.svg"
        ].map((file)=>`${normalizedDir}${file}`);
        const existingFiles = await Promise.all(knownFiles.map(async (url)=>{
            try {
                const response = await fetch(url, {
                    method: 'HEAD'
                });
                return response.ok ? url : null;
            } catch  {
                return null;
            }
        }));
        const validFiles = existingFiles.filter(Boolean);
        if (validFiles.length > 0) {
            console.log(`Found ${validFiles.length} SVGs through direct checking`);
            return validFiles;
        }
        // Return cached results if available
        if (this.cache[cacheKey]) return this.cache[cacheKey];
        try {
            // For GitHub Pages, an assets.json manifest is the most reliable approach
            const manifestResult = await this.loadFromManifest(normalizedDir, extension);
            if (manifestResult.length > 0) {
                this.cache[cacheKey] = manifestResult;
                return manifestResult;
            }
            console.warn(`No assets found in ${normalizedDir}. Please create an assets.json manifest file.`);
            console.info(`
  === IMPLEMENTATION GUIDANCE ===
  Create a file at ${normalizedDir}assets.json with your actual SVG filenames:
  {
    "files": [
      "23838.svg",
      "uu0604design_20220106_\u{96EA}\u{306E}\u{7D50}\u{6676}1.svg",
      "your-actual-filename.svg",
      "..."
    ]
  }
  ============================`);
            return [];
        } catch (error) {
            console.error(`Failed to load assets from ${normalizedDir}:`, error);
            return [];
        }
    }
    /**
     * Load assets from a manifest file
     */ static async loadFromManifest(directory, extension) {
        try {
            // Try to fetch the asset manifest
            const manifestUrl = `${directory}assets.json?cache=${Date.now()}`;
            console.log(`Attempting to load manifest from: ${manifestUrl}`);
            const response = await fetch(manifestUrl);
            console.log(`Manifest fetch response status: ${response.status}`);
            if (!response.ok) {
                console.warn(`Asset manifest not found at ${manifestUrl}`);
                return [];
            }
            // Parse the manifest
            const text = await response.text();
            console.log(`Manifest content: ${text.substring(0, 100)}...`);
            try {
                const manifest = JSON.parse(text);
                if (!Array.isArray(manifest.files)) {
                    console.warn(`Invalid manifest format at ${manifestUrl}. Expected "files" array.`);
                    return [];
                }
                // Return only the files matching our extension
                const filteredFiles = manifest.files.filter((file)=>file.endsWith(extension)).map((file)=>`${directory}${file}`);
                console.log(`Found ${filteredFiles.length} files in manifest`);
                return filteredFiles;
            } catch (jsonError) {
                console.error(`JSON parse error for ${manifestUrl}:`, jsonError);
                return [];
            }
        } catch (error) {
            console.debug(`Error loading asset manifest:`, error);
            return [];
        }
    }
    /**
     * Loads an SVG file as text
     * @param path - Path to the SVG file
     * @returns Promise resolving to SVG content string
     */ static async loadSVGFile(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                console.warn(`Failed to load SVG: ${path} (${response.status})`);
                return null;
            }
            // Get SVG as text
            return await response.text();
        } catch (error) {
            console.warn(`Error loading SVG file ${path}:`, error);
            return null;
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"j1tiZ":[function(require,module,exports,__globalThis) {
// src/utils/animations/particles/snow-particle.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SnowParticle", ()=>SnowParticle);
var _particleBase = require("../core/particle-base");
class SnowParticle extends (0, _particleBase.ParticleBase) {
    /**
   * Factory method to create a new snow particle
   * @param containerWidth - Width of the container
   * @param containerHeight - Height of the container
   * @param options - Configuration options for snow particles
   * @returns A new configured SnowParticle instance
   */ static create(containerWidth, containerHeight, options) {
        // Generate a unique ID for the particle
        const id = Math.floor(Math.random() * 1000000);
        // Create the base configuration
        const config = {
            position: {
                x: Math.random() * containerWidth,
                y: Math.random() * containerHeight * -1 - 50 // Start above the viewport
            },
            speed: {
                x: 0,
                y: Math.random() * (options.speed.max - options.speed.min) + options.speed.min
            },
            size: Math.random() * (options.size.max - options.size.min) + options.size.min,
            opacity: Math.random() * (options.opacity.max - options.opacity.min) + options.opacity.min,
            rotation: Math.random() * 360
        };
        // Create the particle with the proper constructor parameters
        const particle = new SnowParticle(config, containerWidth, containerHeight, options.fadeThreshold || 0.8, options.fadeSpeed || 0.02);
        // Store options for later use
        particle.options = options;
        // Set additional properties
        particle.baseX = config.position.x;
        particle.driftFactor = Math.random() * 0.1;
        particle.rotationSpeed = (Math.random() - 0.5) * 2;
        return particle;
    }
    /**
   * Creates a snow particle 
   * @param config - Initial configuration
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param fadeThreshold - Screen height percentage where fade begins
   * @param fadeSpeed - Speed of the fade effect
   */ constructor(config, canvasWidth, canvasHeight, fadeThreshold = 0.8, fadeSpeed = 0.02){
        super(config, canvasWidth, canvasHeight, fadeThreshold, fadeSpeed), this.baseX = 0, this.driftFactor = 0, this.rotationSpeed = 0;
        this.baseX = config.position.x;
        this.options = {
            count: 100,
            speed: {
                min: 1,
                max: 3
            },
            size: {
                min: 5,
                max: 20
            },
            opacity: {
                min: 0.6,
                max: 1.0
            }
        };
    }
    /**
   * Update the snow particle's state
   * @param deltaTime - Time elapsed since last update
   * @returns boolean indicating if the particle is still active
   */ update(deltaTime) {
        // Call the parent update method first
        if (!super.update(deltaTime)) return false;
        // Apply horizontal drift (sine wave motion)
        this.position.x = this.baseX + Math.sin(this.position.y * this.driftFactor) * 50;
        // Apply wind if specified
        if (this.options?.wind) {
            this.position.x += this.options.wind * deltaTime * 60;
            this.baseX += this.options.wind * deltaTime * 6; // Gradually shift the base position
        }
        // Update rotation
        this.rotation += this.rotationSpeed * deltaTime * 60;
        // Check if out of bounds
        if (this.position.y > this.canvasHeight + 50 || this.position.x < -50 || this.position.x > this.canvasWidth + 50 || this.opacity <= 0) {
            this.resetWithNewValues();
            return true; // The particle is still active, just reset
        }
        return true;
    }
    /**
   * Reset the particle with custom configuration
   * @param config - New configuration (optional)
   */ reset(config) {
        if (config) {
            // If config is provided, use parent reset method
            super.reset(config);
            this.baseX = config.position.x;
        } else // Otherwise, generate new values
        this.resetWithNewValues();
    }
    /**
   * Helper method to reset particle with new random values
   */ resetWithNewValues() {
        // Create new configuration
        const newConfig = {
            position: {
                x: Math.random() * this.canvasWidth,
                y: -50 - Math.random() * 100 // Start above the viewport
            },
            speed: {
                x: 0,
                y: Math.random() * (this.options?.speed?.max - this.options?.speed?.min) + (this.options?.speed?.min || 1)
            },
            size: Math.random() * (this.options?.size?.max - this.options?.size?.min) + (this.options?.size?.min || 2),
            opacity: Math.random() * (this.options?.opacity?.max - this.options?.opacity?.min) + (this.options?.opacity?.min || 0.5),
            rotation: Math.random() * 360
        };
        // Use the parent reset method
        super.reset(newConfig);
        // Set additional properties
        this.baseX = newConfig.position.x;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.driftFactor = Math.random() * 0.1;
    }
}

},{"../core/particle-base":"avGfU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"avGfU":[function(require,module,exports,__globalThis) {
// src/utils/animations/core/particle-base.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ParticleBase", ()=>ParticleBase);
class ParticleBase {
    /**
   * Creates a base particle with common properties
   * @param config - Configuration parameters for the particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param fadeThreshold - % of screen height where fade begins (0-1)
   * @param fadeSpeed - Speed of the fade effect (0-1)
   */ constructor(config, canvasWidth, canvasHeight, fadeThreshold = 0.8, fadeSpeed = 0.02){
        // Validate parameters
        if (canvasWidth <= 0 || canvasHeight <= 0) throw new Error('Canvas dimensions must be positive values');
        if (fadeThreshold < 0 || fadeThreshold > 1) throw new Error('Fade threshold must be between 0 and 1');
        this.position = {
            ...config.position
        };
        this.speed = {
            ...config.speed
        };
        this.size = config.size;
        this.opacity = config.opacity;
        this.rotation = config.rotation || 0;
        this.color = config.color;
        this.maxLifetime = config.maxLifetime || Infinity;
        this.currentLifetime = config.currentLifetime || 0;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.fadeThreshold = fadeThreshold;
        this.fadeSpeed = fadeSpeed;
    }
    /**
   * Updates the particle position and properties
   * @param deltaTime - Time elapsed since last update in milliseconds
   * @returns boolean indicating if the particle is still active
   */ update(deltaTime) {
        // Increment lifetime
        this.currentLifetime += deltaTime;
        if (this.currentLifetime >= this.maxLifetime) return false;
        // Update position based on speed
        this.position.x += this.speed.x * deltaTime;
        this.position.y += this.speed.y * deltaTime;
        // Check if particle is off-screen
        if (this.position.x < -this.size * 2 || this.position.x > this.canvasWidth + this.size * 2 || this.position.y > this.canvasHeight + this.size * 2) return false;
        // Fade when near bottom of screen
        if (this.position.y / this.canvasHeight > this.fadeThreshold) {
            this.opacity = Math.max(0, this.opacity - this.fadeSpeed);
            if (this.opacity <= 0) return false;
        }
        return true;
    }
    /**
   * Gets the current particle state
   * @returns Copy of the current particle state
   */ getState() {
        return {
            position: {
                ...this.position
            },
            speed: {
                ...this.speed
            },
            size: this.size,
            opacity: this.opacity,
            rotation: this.rotation,
            color: this.color,
            maxLifetime: this.maxLifetime,
            currentLifetime: this.currentLifetime
        };
    }
    /**
   * Resets the particle with new configuration
   * @param config - New configuration for the particle
   */ reset(config) {
        this.position = {
            ...config.position
        };
        this.speed = {
            ...config.speed
        };
        this.size = config.size;
        this.opacity = config.opacity;
        this.rotation = config.rotation || 0;
        this.color = config.color;
        this.maxLifetime = config.maxLifetime || Infinity;
        this.currentLifetime = config.currentLifetime || 0;
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"8mYKt":[function(require,module,exports,__globalThis) {
// src/utils/animations/particles/sakura-particle.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "SakuraParticle", ()=>SakuraParticle);
var _particleBase = require("../core/particle-base");
class SakuraParticle extends (0, _particleBase.ParticleBase) {
    /**
   * Creates a sakura petal particle
   * @param config - Configuration parameters for the particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param wind - Wind strength and direction
   */ constructor(config, canvasWidth, canvasHeight, wind = 0, fadeThreshold = 0.8, fadeSpeed = 0.02){
        super(config, canvasWidth, canvasHeight, fadeThreshold, fadeSpeed);
        // Set sakura-specific properties
        this.wind = wind;
        this.swayAmount = Math.random() * 2 + 1;
        this.swayFrequency = Math.random() * 2 + 1;
        this.swayOffset = Math.random() * Math.PI * 2;
    }
    /**
   * Update the sakura particle with sway motion
   * @param deltaTime - Time elapsed since last update in seconds
   * @returns boolean indicating if the particle is still active
   */ update(deltaTime) {
        // Apply wind effect to horizontal speed
        this.speed.x += this.wind * deltaTime * 0.1;
        // Apply sway motion
        this.speed.x += Math.sin(this.currentLifetime * this.swayFrequency + this.swayOffset) * this.swayAmount * deltaTime;
        // Adjust rotation based on horizontal movement
        this.rotation += this.speed.x * 15 * deltaTime;
        // Call base class update
        return super.update(deltaTime);
    }
    /**
   * Create a new sakura particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param options - Particle options
   * @returns New sakura particle
   */ static create(canvasWidth, canvasHeight, options) {
        // Set random position above the screen
        const position = {
            x: Math.random() * canvasWidth,
            y: -Math.random() * 50 - 20
        };
        // Set random speed
        const speed = {
            x: (Math.random() - 0.5) * 0.5,
            y: Math.random() * (options.speed.max - options.speed.min) + options.speed.min
        };
        // Set random size
        const size = Math.random() * (options.size.max - options.size.min) + options.size.min;
        // Set random opacity
        const opacity = Math.random() * (options.opacity.max - options.opacity.min) + options.opacity.min;
        // Set random rotation
        const rotation = Math.random() * 360;
        // Set random color if colors provided
        let color;
        if (options.colors && options.colors.length > 0) color = options.colors[Math.floor(Math.random() * options.colors.length)];
        else // Default to light pink if no colors provided
        color = `rgba(255, ${200 + Math.floor(Math.random() * 55)}, ${200 + Math.floor(Math.random() * 55)}, ${opacity})`;
        // Create configuration
        const config = {
            position,
            speed,
            size,
            opacity,
            rotation,
            color
        };
        return new SakuraParticle(config, canvasWidth, canvasHeight, options.wind || 0, options.fadeThreshold || 0.8, options.fadeSpeed || 0.02);
    }
}

},{"../core/particle-base":"avGfU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"Tekby":[function(require,module,exports,__globalThis) {
// src/utils/animations/particles/rain-particle.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "RainParticle", ()=>RainParticle);
var _particleBase = require("../core/particle-base");
class RainParticle extends (0, _particleBase.ParticleBase) {
    /**
   * Creates a rain drop particle
   * @param config - Configuration parameters for the particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param gravity - Gravity effect strength
   * @param wind - Wind effect strength
   */ constructor(config, canvasWidth, canvasHeight, gravity = 9.8, wind = 0, fadeThreshold = 0.9, fadeSpeed = 0.05){
        super(config, canvasWidth, canvasHeight, fadeThreshold, fadeSpeed);
        this.gravity = gravity;
        this.wind = wind;
        this.length = config.size * 2; // Raindrop length is proportional to size
    }
    /**
   * Update rain particle with gravity and wind effects
   * @param deltaTime - Time elapsed since last update in seconds
   * @returns boolean indicating if the particle is still active
   */ update(deltaTime) {
        // Apply gravity
        this.speed.y += this.gravity * deltaTime;
        // Apply wind
        this.speed.x += this.wind * deltaTime;
        // Limit terminal velocity
        const terminalVelocity = 15;
        if (this.speed.y > terminalVelocity) this.speed.y = terminalVelocity;
        // Call base update
        return super.update(deltaTime);
    }
    /**
   * Get the current rain particle state including length
   */ getState() {
        const state = super.getState();
        return {
            ...state,
            length: this.length
        };
    }
    /**
   * Create a new rain particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param options - Particle options
   * @returns New rain particle
   */ static create(canvasWidth, canvasHeight, options) {
        // Set random position above the screen
        const position = {
            x: Math.random() * canvasWidth,
            y: -Math.random() * 50
        };
        // Set rain-specific speed
        const speedY = Math.random() * (options.speed.max - options.speed.min) + options.speed.min;
        // Slight angle based on wind
        const windEffect = options.wind || 0;
        const speed = {
            x: windEffect * 0.1,
            y: speedY
        };
        // Rain drops are thin
        const size = Math.random() * (options.size.max - options.size.min) + options.size.min;
        // Set random opacity
        const opacity = Math.random() * (options.opacity.max - options.opacity.min) + options.opacity.min;
        // Water-like colors with blue tint
        let color;
        if (options.colors && options.colors.length > 0) color = options.colors[Math.floor(Math.random() * options.colors.length)];
        else {
            // Default blue-tinted water color
            const blueBase = 190 + Math.floor(Math.random() * 65);
            color = `rgba(${blueBase - 40}, ${blueBase - 20}, ${blueBase}, ${opacity})`;
        }
        // Create configuration
        const config = {
            position,
            speed,
            size,
            opacity,
            color
        };
        return new RainParticle(config, canvasWidth, canvasHeight, options.gravity || 9.8, options.wind || 0, options.fadeThreshold || 0.9, options.fadeSpeed || 0.05);
    }
}

},{"../core/particle-base":"avGfU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dX9Hi":[function(require,module,exports,__globalThis) {
// src/utils/animations/particles/leaf-particle.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "LeafParticle", ()=>LeafParticle);
var _particleBase = require("../core/particle-base");
class LeafParticle extends (0, _particleBase.ParticleBase) {
    /**
   * Creates a falling leaf particle
   * @param config - Configuration parameters for the particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param wind - Wind effect strength
   * @param gravity - Gravity effect strength
   */ constructor(config, canvasWidth, canvasHeight, wind = 0.5, gravity = 0.5, fadeThreshold = 0.9, fadeSpeed = 0.03){
        super(config, canvasWidth, canvasHeight, fadeThreshold, fadeSpeed);
        // Set leaf-specific properties
        this.wind = wind;
        this.gravity = gravity;
        this.swayAmount = Math.random() * 3 + 2;
        this.swayFrequency = Math.random() * 3 + 1;
        this.rotationSpeed = (Math.random() - 0.5) * 2;
        this.swayOffset = Math.random() * Math.PI * 2;
        this.fallPattern = Math.random() * 5;
    }
    /**
   * Update leaf particle with complex falling motion
   * @param deltaTime - Time elapsed since last update in seconds
   * @returns boolean indicating if the particle is still active
   */ update(deltaTime) {
        // Apply gravity
        this.speed.y += this.gravity * deltaTime;
        // Apply wind base effect
        this.speed.x += this.wind * deltaTime * 0.2;
        // Apply swaying motion based on fall pattern
        const swayFactor = Math.sin(this.currentLifetime * this.swayFrequency + this.swayOffset);
        // Different fall patterns
        if (this.fallPattern < 1) {
            // Spiral fall
            this.speed.x += swayFactor * this.swayAmount * deltaTime;
            this.rotation += this.rotationSpeed * 5 * deltaTime;
        } else if (this.fallPattern < 3) {
            // Side-to-side fall
            this.speed.x += swayFactor * this.swayAmount * deltaTime;
            this.rotation += swayFactor * this.rotationSpeed * deltaTime;
        } else {
            // Tumbling fall
            this.speed.x += swayFactor * this.swayAmount * 0.5 * deltaTime;
            this.rotation += this.rotationSpeed * 10 * deltaTime;
        }
        // Limit terminal velocity
        const terminalVelocity = 5;
        if (this.speed.y > terminalVelocity) this.speed.y = terminalVelocity;
        // Limit horizontal speed
        const maxHorizontalSpeed = 3;
        if (Math.abs(this.speed.x) > maxHorizontalSpeed) this.speed.x = Math.sign(this.speed.x) * maxHorizontalSpeed;
        // Call base update
        return super.update(deltaTime);
    }
    /**
   * Create a new leaf particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param options - Particle options
   * @returns New leaf particle
   */ static create(canvasWidth, canvasHeight, options) {
        // Set random position above the screen
        const position = {
            x: Math.random() * canvasWidth,
            y: -Math.random() * 50 - 20
        };
        // Set initial speed
        const speed = {
            x: (Math.random() - 0.5) * 2,
            y: Math.random() * (options.speed.max - options.speed.min) + options.speed.min
        };
        // Set random size
        const size = Math.random() * (options.size.max - options.size.min) + options.size.min;
        // Set random opacity
        const opacity = Math.random() * (options.opacity.max - options.opacity.min) + options.opacity.min;
        // Set random rotation
        const rotation = Math.random() * 360;
        // Set random color from autumn palette if not provided
        let color;
        if (options.colors && options.colors.length > 0) color = options.colors[Math.floor(Math.random() * options.colors.length)];
        else {
            // Default autumn colors
            const autumnColors = [
                `rgba(165, 42, 42, ${opacity})`,
                `rgba(210, 105, 30, ${opacity})`,
                `rgba(255, 69, 0, ${opacity})`,
                `rgba(255, 140, 0, ${opacity})`,
                `rgba(255, 165, 0, ${opacity})`,
                `rgba(255, 215, 0, ${opacity})`,
                `rgba(218, 165, 32, ${opacity})`,
                `rgba(128, 128, 0, ${opacity})` // Olive
            ];
            color = autumnColors[Math.floor(Math.random() * autumnColors.length)];
        }
        // Create configuration
        const config = {
            position,
            speed,
            size,
            opacity,
            rotation,
            color
        };
        return new LeafParticle(config, canvasWidth, canvasHeight, options.wind || 0.5, options.gravity || 0.5, options.fadeThreshold || 0.9, options.fadeSpeed || 0.03);
    }
}

},{"../core/particle-base":"avGfU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"87uY3":[function(require,module,exports,__globalThis) {
// src/utils/animations/particles/heart-particle.ts
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "HeartParticle", ()=>HeartParticle);
var _particleBase = require("../core/particle-base");
class HeartParticle extends (0, _particleBase.ParticleBase) {
    /**
   * Creates a floating heart particle
   * @param config - Configuration parameters for the particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   */ constructor(config, canvasWidth, canvasHeight, fadeThreshold = 0.9, fadeSpeed = 0.02){
        super(config, canvasWidth, canvasHeight, fadeThreshold, fadeSpeed);
        // Set heart-specific properties
        this.sway = (Math.random() - 0.5) * 1.5;
        this.swayFrequency = Math.random() * 1.5 + 0.5;
        this.swayOffset = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.5;
        this.pulseAmount = Math.random() * 0.2 + 0.1;
        this.pulseFrequency = Math.random() * 2 + 1;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.originalSize = config.size;
    }
    /**
   * Update heart particle with floating and pulsing effects
   * @param deltaTime - Time elapsed since last update in seconds
   * @returns boolean indicating if the particle is still active
   */ update(deltaTime) {
        // Apply gentle sway
        this.speed.x += Math.sin(this.currentLifetime * this.swayFrequency + this.swayOffset) * this.sway * deltaTime;
        // Apply gentle floating effect (slightly counteract gravity)
        this.speed.y *= 0.98;
        // Apply gentle rotation
        this.rotation += this.rotationSpeed * deltaTime * 30;
        // Apply pulsing effect to size
        const pulseFactor = Math.sin(this.currentLifetime * this.pulseFrequency + this.pulseOffset);
        this.size = this.originalSize * (1 + pulseFactor * this.pulseAmount);
        // Limit horizontal speed
        const maxHorizontalSpeed = 1.5;
        if (Math.abs(this.speed.x) > maxHorizontalSpeed) this.speed.x = Math.sign(this.speed.x) * maxHorizontalSpeed;
        // Limit vertical speed
        const maxVerticalSpeed = 2;
        if (Math.abs(this.speed.y) > maxVerticalSpeed) this.speed.y = Math.sign(this.speed.y) * maxVerticalSpeed;
        // Call base update
        return super.update(deltaTime);
    }
    /**
   * Create a new heart particle
   * @param canvasWidth - Width of the canvas
   * @param canvasHeight - Height of the canvas
   * @param options - Particle options
   * @returns New heart particle
   */ static create(canvasWidth, canvasHeight, options) {
        // Random position anywhere on screen but biased toward top
        const position = {
            x: Math.random() * canvasWidth,
            y: Math.random() * canvasHeight * 0.7
        };
        // Set initial gentle floating speed
        const speed = {
            x: (Math.random() - 0.5) * 0.5,
            y: Math.random() * -1 - 0.5
        };
        // Set random size
        const size = Math.random() * (options.size.max - options.size.min) + options.size.min;
        // Set random opacity
        const opacity = Math.random() * (options.opacity.max - options.opacity.min) + options.opacity.min;
        // Set random rotation
        const rotation = Math.random() * 360;
        // Set random pastel color if not provided
        let color;
        if (options.colors && options.colors.length > 0) color = options.colors[Math.floor(Math.random() * options.colors.length)];
        else {
            // Default pastel colors
            const pastelColors = [
                `rgba(255, 182, 193, ${opacity})`,
                `rgba(255, 160, 122, ${opacity})`,
                `rgba(216, 191, 216, ${opacity})`,
                `rgba(173, 216, 230, ${opacity})`,
                `rgba(240, 128, 128, ${opacity})`,
                `rgba(255, 182, 193, ${opacity})`,
                `rgba(221, 160, 221, ${opacity})`,
                `rgba(176, 224, 230, ${opacity})`,
                `rgba(255, 222, 173, ${opacity})`,
                `rgba(250, 250, 210, ${opacity})` // Light goldenrod yellow
            ];
            color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
        }
        // Create configuration
        const config = {
            position,
            speed,
            size,
            opacity,
            rotation,
            color,
            // Set random lifetime
            maxLifetime: 10 + Math.random() * 20
        };
        return new HeartParticle(config, canvasWidth, canvasHeight, options.fadeThreshold || 0.9, options.fadeSpeed || 0.02);
    }
}

},{"../core/particle-base":"avGfU","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"60OL6":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"5rZxp":[function(require,module,exports,__globalThis) {
// src/components/overlayPanel.ts
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
        button.innerHTML = `
            <span class="overlay-name">${overlay.name}</span>
            <div class="overlay-controls">
                <button class="apply-btn" title="Apply effect">Apply</button>
                <button class="view-btn" title="View dedicated page">View</button>
            </div>
        `;
        button.dataset.overlayId = overlay.id;
        // Add click handlers
        const applyBtn = button.querySelector('.apply-btn');
        if (applyBtn) applyBtn.addEventListener('click', (e)=>{
            e.stopPropagation();
            // Remove active class from all buttons
            document.querySelectorAll('.overlay-option').forEach((el)=>{
                el.classList.remove('active');
            });
            // Add active class to clicked button
            button.classList.add('active');
            // Apply the selected overlay
            (0, _overlays.applyOverlayEffect)(overlay.id);
        });
        // Add view dedicated page handler
        const viewBtn = button.querySelector('.view-btn');
        if (viewBtn && overlay.path) viewBtn.addEventListener('click', (e)=>{
            e.stopPropagation();
            window.location.href = overlay.path;
        });
        selector.appendChild(button);
    });
    // Add disable button
    const disableButton = document.createElement('div');
    disableButton.className = 'overlay-option disable-overlay';
    disableButton.innerHTML = `
        <span class="overlay-name">Disable All Effects</span>
        <div class="overlay-controls">
            <button class="disable-btn" title="Disable all effects">Disable</button>
        </div>
    `;
    const disableBtn = disableButton.querySelector('.disable-btn');
    if (disableBtn) disableBtn.addEventListener('click', (e)=>{
        e.stopPropagation();
        // Remove active class from all buttons
        document.querySelectorAll('.overlay-option').forEach((el)=>{
            el.classList.remove('active');
        });
        // Disable overlays
        (0, _overlays.disableOverlays)();
    });
    selector.appendChild(disableButton);
    // Set active button based on current overlay
    const urlParams = new URLSearchParams(window.location.search);
    const currentOverlay = urlParams.get('overlay');
    if (currentOverlay) {
        const activeButton = selector.querySelector(`[data-overlay-id="${currentOverlay}"]`);
        if (activeButton) activeButton.classList.add('active');
    }
}

},{"./overlays":"1Mc8h","@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"9Y45t":[function(require,module,exports,__globalThis) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"3rnt5":[function(require,module,exports,__globalThis) {
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"dt9sa":[function(require,module,exports,__globalThis) {
/**
 * Interface for analytics data point
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/**
 * Class to handle analytics data and visualization
 */ parcelHelpers.export(exports, "AnalyticsService", ()=>AnalyticsService);
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

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["cAPdp","jeorp"], "jeorp", "parcelRequire94c2")

//# sourceMappingURL=index.b7a05eb9.js.map

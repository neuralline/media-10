// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
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

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
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
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../node_modules/holo-carousel/dist/holo-carousel.js":[function(require,module,exports) {
var define;
!function (t, e) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : (t = t || self).Holo = e();
}(this, function () {
  "use strict";

  const t = {
    insert: (t, e) => {
      const i = {};
      t.id = t.id || null, t.type = t.type || null;

      for (const n in t) {
        if (i[n] = e[n] ? e[n](t[n]) : {
          ok: !1,
          data: null,
          message: `'${n}' data definition not found`,
          required: !1
        }, !i[n].ok && i[n].required) return {
          ok: !1,
          data: i,
          message: i[n].message
        };
        i[n].ok || console.error(i[n].message), i[n] = i[n].data;
      }

      return {
        ok: !0,
        data: i
      };
    },
    update: (t, e) => {
      const i = {};

      for (const n in t) i[n] = !!e[n] && e[n](t[n]), i[n].ok || console.error(i[n].message), i[n] = i[n].data;

      return {
        ok: !0,
        data: i
      };
    }
  },
        e = {
    id: (t = 0) => "string" != typeof t ? {
      ok: !1,
      data: null,
      message: `action.id must be a string. Received '${t}'`,
      required: !0
    } : {
      ok: !0,
      data: t,
      required: !0
    },
    type: (t = "") => "string" == typeof t ? {
      ok: !0,
      data: t
    } : {
      ok: !1,
      data: null,
      message: `action.type must be a string. Received '${t}'`,
      required: !0
    },
    payload: (t = null) => ({
      ok: !0,
      data: t
    }),
    interval: (t = 0) => Number.isInteger(t) ? {
      ok: !0,
      data: t
    } : {
      ok: !1,
      data: 0,
      message: `'${t}' invalid action.interval value`
    },
    repeat: (t = 0) => Number.isInteger(t) ? {
      ok: !0,
      data: t
    } : {
      ok: !1,
      data: 0,
      message: `'${t}' invalid action.repeat value`
    },
    group: (t = "") => "string" == typeof t ? {
      ok: !0,
      data: t
    } : {
      ok: !1,
      data: null,
      message: `'${t}' invalid action.group value`
    },
    callback: (t = "") => "string" == typeof t ? {
      ok: !0,
      data: t
    } : {
      ok: !1,
      data: null,
      message: `'${t}' invalid action.callback value`
    },
    log: (t = !1) => "boolean" == typeof t ? {
      ok: !0,
      data: t
    } : {
      ok: !1,
      data: !1,
      message: `'${t}' invalid action.log value`
    },
    middleware: (t = null) => "string" == typeof t ? {
      ok: !0,
      data: t
    } : {
      ok: !1,
      data: null,
      message: `'${t}' invalid action.middleware value`
    },
    at: (t = 0) => ({
      ok: !1,
      data: t,
      message: `'${t}'  action.at is an experimental feature, not applied yet`
    })
  };
  const i = new class {
    constructor(t = "", e = 0) {
      this.id = t, this.interval = e || 16, this.events = {}, this.timestamp = 0, this.timeline = new Set(), this.waitingList = new Set(), this.group = [], this.party = {}, this.precision = 17, this.recuperating = 0, this.error = 0, this._quartz();
    }

    _log(t, e = !1) {
      return e ? "!log into something else " : console.log(t);
    }

    _taskWaitingList(t = null) {
      for (let t of this.waitingList) this.events[this.party[t].type] ? (this.waitingList.delete(t), this._initiate(t)) : console.log("@cyre not in taskWaitingList");
    }

    _emitAction(t = "", e = {}, i = {}) {
      for (const n of this.events[t]) n(e, i);

      return {
        ok: !0,
        done: !0,
        data: `${t} action emitted`
      };
    }

    _recuperate(t = {}, e = 0) {
      return t.data = t.ok ? t.data.sort((t, e) => e - t).reverse() : [e], t.data = t.data[0] || t.data[1] || 0, t;
    }

    _quartz() {
      if (performance.now() - this.timestamp >= this.interval) {
        this.timestamp = performance.now();
        const t = this.timeline.size ? this._processingUnit(this.timeline, this.interval) : {
          ok: !1,
          data: []
        };
        this.interval = this._recuperate(t, this.interval).data;
      }

      this.recuperating = requestAnimationFrame(this._quartz.bind(this));
    }

    _processingUnit(t, e) {
      return new Promise(i => {
        let n = {
          ok: !0,
          data: [],
          id: []
        };

        for (const o of t) this.party[o].timeout -= e, n.data.push(this.party[o].timeout), n.id.push(o), e >= this.party[o].timeout && this._sendAction(o), i(n);
      });
    }

    _addToTimeline(t) {
      return {
        ok: !0,
        done: !1,
        data: this.timeline.add(t)
      };
    }

    _addToWaitingList(t) {
      return this.waitingList.add(t), this.party[t].log && this._log({
        ok: !0,
        done: !1,
        id: t,
        data: this.party[t].payload,
        group: this.party[t].group || 0,
        message: "added to action waiting list"
      }), {
        ok: !1,
        done: !1,
        data: `${t} added to waiting list`
      };
    }

    _completeAction(t) {
      return this.timeline.delete(t), !0;
    }

    _repeatAction(t) {
      return this.party[t].timeout = this.party[t].interval, --this.party[t].repeat, !1;
    }

    _sendAction(t) {
      const e = {
        ok: !0,
        done: this.party[t].repeat > 0 ? this._repeatAction(t) : this._completeAction(t),
        id: t,
        data: this.party[t].payload,
        group: this.party[t].group || 0
      };
      return this.party[t].log && this._log(e), this._emitAction(this.party[t].type, this.party[t].payload, e);
    }

    _initiate(t) {
      return 0 === this.party[t].timeout ? this._sendAction(t) : this._addToTimeline(t);
    }

    _dispatchAction(t, e) {
      return this.events[e] ? this._initiate(t) : this._addToWaitingList(t);
    }

    _createChannel(e, i) {
      const n = this.party[e.id] ? "update" : "insert",
            o = t[n](e, i);
      return o.ok ? (this.party[e.id] = o.data, this.party[e.id].timeout = this.party[e.id].interval || 0, {
        ok: !0,
        data: n
      }) : {
        ok: !1,
        data: n,
        message: o.message
      };
    }

    off(t) {
      for (let e in this.events) return this.events[e].has(t) ? {
        ok: !0,
        data: this.events[e].delete(t)
      } : {
        ok: !1,
        data: "function not found"
      };
    }

    list() {
      for (let t in this.events) for (let e of this.events[t]) this._log(t + " " + e.name);
    }

    clr() {
      return this.timeline.clear();
    }

    pause(t) {
      return !!this.timeline.has(t) && this.timeline.delete(t);
    }

    on(t, e, i = []) {
      return new Promise((i, n) => {
        "function" == typeof e && t ? i({
          ok: !0,
          data: this.events[t] ? this.events[t].add([e]) : (this.events[t] = new Set([e]), this._taskWaitingList(t))
        }) : n({
          ok: !1,
          data: void 0,
          message: "invalid function"
        });
      });
    }

    type(t, e) {
      console.log("cyre.type method not implemented yet in this version, would've update channel.id's type without dispatching the action");
    }

    channel(t = {}) {
      return this.party[t.id] ? console.error("@cyre.channel: channel already exist", t.id) : this._createChannel(t, e);
    }

    action(t = {}) {
      return this.party[t.id] ? console.error("@cyre.action: action already exist", t.id) : this._createChannel(t, e);
    }

    emit(t = null, e = null) {
      return this.party[t] ? (this.party[t].payload = e, this._dispatchAction(t, this.party[t].type)) : {
        ok: !1,
        data: console.error("@cyre.call : action not found", t)
      };
    }

    call(t = null, e = null) {
      return this.emit(t, e);
    }

    dispatch(t = {}) {
      return t.id = t.id ? t.id : "", !t.type && console.error("@cyre.dispatch : action type required for - ", t.id), this._createChannel(t, e).ok ? {
        ok: !0,
        data: this._dispatchAction(t.id, t.type)
      } : {
        ok: !1,
        data: t.id,
        message: console.log("@Cyre couldn't dispatch action")
      };
    }

    respond(t = null, i = null, n = null, o = 0, a = 0) {
      const r = {
        id: t,
        type: i,
        payload: n,
        interval: o,
        repeat: a
      };
      return this._createChannel(r, e), this._dispatchAction(r.id, r.type), {
        ok: !0,
        data: r.id
      };
    }

    test() {
      return {
        ok: !0,
        data: 200,
        message: "cyre ready"
      };
    }

  }("quantum-inceptions");

  var n = {},
      o = function (t, e, i, o) {
    void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === o && (o = 0), n[t]._state.elm.container.style.transform = "translate3d(" + e + "px, " + i + "px, " + o + "px)";
  },
      a = function (t, e) {
    return Math.round(t / e) * e;
  },
      r = new (function () {
    function t() {
      this.positionX = 0, this.positionY = 0, this.pressed = 0, this.touch = {
        start: "mousedown",
        move: "mousemove",
        end: "mouseup",
        enter: "mouseenter"
      }, this.targetHoloComponent = 0;
    }

    var e = t.prototype;
    return e._touchStart = function (t, e) {
      return void 0 === t && (t = window.event), void 0 === e && (e = 0), !e || this.pressed ? console.error("Holo touch : not my business") : (this.TouchStartTimeStamp = performance.now(), t.preventDefault(), this._e = n[e].getState, this.pressed = 1, this.positionX = t.clientX || t.touches[0].clientX, this.positionY = t.clientY || t.touches[0].clientY, this.id = this._e.id, this.currentX = t.clientX || t.touches[0].clientX, this.currentY = t.clientY || t.touches[0].clientY, this.snapWidth = this._e.transformX || 0, this.snapHeight = this._e.transformY || 0, !0 === this._e.io.orientation ? this._dragScrollVertical(t) : this._dragScroll(t), n[this._e.id]._style(0));
    }, e._dragScroll = function (t) {
      if (!this.pressed) return {
        ok: !1,
        data: "not active"
      };
      this.distance = this.positionX - this.currentX, this._e.transformX = this.snapWidth - 1.482 * this.distance || 0, 100 > this._e.transformX ? this._e.transformX + 100 > this._e.endNumber ? this._e.sliderEnd = 0 : (this._e.transformX = this._e.endNumber - 100, this._e.sliderEnd = -1) : (this._e.transformX = 100, this._e.sliderEnd = 1), o(this.id, this._e.transformX, 0, 0), requestAnimationFrame(this._dragScroll.bind(this));
    }, e._dragScrollVertical = function (t) {
      if (!this.pressed) return 0;
      this.distance = this.positionY - this.currentY, this._e.transformY = this.snapHeight - 1.482 * this.distance || 0, o(this._e.id, 0, this._e.transformY, 0), requestAnimationFrame(this._dragScrollVertical.bind(this));
    }, e._touchEnd = function (t) {
      var e = performance.now();
      if (t.preventDefault(), t.stopPropagation(), !this.pressed) return 0;
      this.pressed = 0;

      var n = e - this.TouchStartTimeStamp,
          o = function (t, e) {
        return t / e;
      }(this.distance, n);

      o > 1.2 ? i.emit("nxtSlide" + this._e.id, this._e) : -1.2 > o ? i.emit("prvSlide" + this._e.id, this._e) : !function (t) {
        return 250 > t ? 1 : 0;
      }(n) ? i.emit("SNAP" + this._e.id, this._e) : this.focus(this.targetHoloComponent, t);
    }, e.focus = function (t, e) {
      if (!e.target.closest("li.holo")) return !1;
      this.targetHoloComponent && this.targetHoloComponent.classList.remove("active"), this.targetHoloComponent = e.target.closest("li.holo");

      try {
        PROTVJS.PLAY_THIS(this.targetHoloComponent.id), console.log("@playthis found : ", this.targetHoloComponent.id);
      } catch (t) {}

      return i.emit("activate" + this._e.id, [this.targetHoloComponent, this._e]);
    }, e.activate = function (t) {
      var e = t[0],
          n = t[1];
      n.transformX = -Math.abs(e.offsetLeft), i.emit("SNAP" + n.id, n), e.classList.add("active");
    }, e.prvSlide = function (t) {
      if (1 !== t.sliderEnd) return t.transformX += t.carousel.width || 0, t.transformY += t.carousel.height || 0, i.emit("SNAP" + t.id, t);
    }, e.nxtSlide = function (t) {
      if (-1 !== t.sliderEnd) return t.transformX -= t.carousel.width || 0, t.transformY -= t.carousel.height || 0, i.emit("SNAP" + t.id, t);
    }, e.firstSlide = function (t) {
      return t.transformX = 0, t.transformY = 0, t.sliderEnd = 1, i.emit("SNAP" + t.id, t);
    }, e.lastSlide = function (t) {
      return t.transformX = t.endNumber, t.transformY = t.endNumber, t.sliderEnd = -1, i.emit("SNAP" + t.id, t);
    }, e.animateSlideForward = function (t) {
      return i.emit(-1 === t.sliderEnd ? "firstSlide" + t.id : "nxtSlide" + t.id, t);
    }, e.animateSlideBackward = function (t) {
      return i.emit(1 === t.sliderEnd ? "lastSlide" + t.id : "prvSlide" + t.id, t);
    }, e.wheeler = function (t, e) {
      t.preventDefault();
      var o = n[e].getState;
      0 > t.deltaY ? i.emit("prvSlide" + o.id, o) : t.deltaY > 0 && i.emit("nxtSlide" + o.id, o);
    }, t;
  }())();

  function s(t, e) {
    for (var i = 0; e.length > i; i++) {
      var n = e[i];
      n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
    }
  }

  var d = function (t) {
    var e, i;

    function n(e, i) {
      var n;
      return void 0 === i && (i = {}), n = t.call(this) || this, e ? (e.id || (console.error("@Holo: oh putain` carousel has no ID "), side.id = "OhPutain" + performance.now()), n._state.elm.carousel = e, n.id = e.id, n._setup(), n) : console.error("@Holo: Oh putain` problame with the given slider ") || function (t) {
        if (void 0 === t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        return t;
      }(n);
    }

    (e = n).prototype = Object.create((i = t).prototype), e.prototype.constructor = e, e.__proto__ = i;
    var o,
        a,
        r,
        d = n.prototype;
    return d._setup = function () {
      return this._state.elm.container = this._state.elm.carousel.getElementsByClassName("holo-container")[0] || 0, this._state.elm.container ? this._define() : console.error("@Holo : holo-container empty");
    }, d._define = function () {
      if (this._state.carousel.width = this._state.elm.carousel.clientWidth || 0, !this._state.elm.container.children.length) return console.error("@Holo: no holo element found");
      this._state.id = this.id, this._state.childLength = this._state.elm.container.children.length, this._state.startNumber = 0, this._state.endNumber = 0, this._state.item.min = 1, this._state.item.max = this._state.elm.carousel.dataset.max || 0, this._state.io.wheel = !!this._state.elm.carousel.dataset.wheel, this._state.io.orientation = !!this._state.elm.carousel.dataset.orientation, this._state.io.snap = 0, this._state.io.animate = +this._state.elm.carousel.dataset.animate || 0, this._state.io.duration = +this._state.elm.carousel.dataset.duration || 0, this._state.io.loop = +this._state.elm.carousel.dataset.loop || 0, this._state.io.focus = this._state.elm.carousel.dataset.focus || 0;
    }, d.setState = function (t) {
      this._state = t, !this._state.io.orientation && (this._state.elm.carousel.style.width = t.carousel.width + "px"), this._state.io.orientation && (this._state.elm.carousel.style.height = t.carousel.height + "px");
    }, d._style = function (t) {
      void 0 === t && (t = 0), t ? (this._state.elm.container.style.transitionDuration = this._state.duration + "ms", this._state.elm.container.style.transitionTimingFunction = "cubic-bezier(0.215, 0.61, 0.355, 1)") : (this._state.elm.container.style.transitionDuration = "0ms", this._state.elm.container.style.transitionTimingFunction = "linear");
    }, o = n, (a = [{
      key: "getState",
      get: function () {
        return this._state;
      }
    }, {
      key: "getAure",
      get: function () {
        return {
          car: {
            w: this._state.carousel.width,
            h: this._state.carousel.height
          },
          con: {
            w: this._state.container.width,
            h: this._state.container.height,
            x: this._state.transformX,
            y: this._state.transformY,
            s: {}
          }
        };
      }
    }]) && s(o.prototype, a), r && s(o, r), n;
  }(function () {
    this.id = 0, this._state = {
      id: 0,
      carousel: {},
      duration: 600,
      container: {},
      transformX: 0,
      transformY: 0,
      numberOfSlots: 0,
      sliderEnd: 0,
      item: {
        max: 8
      }
    }, this._state.io = {
      id: null,
      title: null,
      description: null,
      enabled: 1,
      wheel: 1,
      controller: 0,
      drag: 1,
      swipe: 0,
      snap: 0,
      focus: 0,
      animate: 1,
      animateDirection: 0,
      duration: 0,
      loop: 0,
      orientation: 0,
      active: !0,
      onClick: !0,
      onDoubleClick: !0
    }, this._state.elm = {
      container: 1,
      carousel: 0
    }, this.style = {};
  }),
      l = function (t, e) {
    void 0 === e && (e = {}), console.log("holo carousel @init : found ---  ", t.id), n[t.id] = new d(t, e), function (t, e) {
      if (void 0 === e && (e = {}), !t) return console.error("@Holo : Major malfunctions");
      t.io.enabled && (t.elm.container.addEventListener("mousedown", function (e) {
        e.preventDefault(), r._touchStart(e, t.id);
      }), t.elm.container.addEventListener("touchstart", function (e) {
        e.preventDefault(), r._touchStart(e, t.id);
      }), t.io.wheel && t.elm.carousel.addEventListener("wheel", function (e) {
        r.wheeler(e, t.id);
      }, !1), t.io.animate && i.respond("Animate" + t.id, t.io.animate > 0 ? "AnimateForward" : "AnimateBackward", t, t.io.duration, t.io.loop)), i.action({
        id: "SNAP" + t.id,
        type: "SNAP",
        payload: t
      }), i.action({
        id: "prvSlide" + t.id,
        type: "prvSlide",
        payload: t
      }), i.action({
        id: "nxtSlide" + t.id,
        type: "nxtSlide",
        payload: t
      }), i.action({
        id: "lastSlide" + t.id,
        type: "lastSlide",
        payload: t
      }), i.action({
        id: "firstSlide" + t.id,
        type: "firstSlide",
        payload: t
      }), i.action({
        id: "activate" + t.id,
        type: "activate",
        payload: t
      });
    }(n[t.id].getState, e);
  },
      h = function (t) {
    var e = document.getElementsByClassName(t);
    if (!e.length) return console.log("@Holo : carousel structure not found");

    for (var i = Array.isArray(o = e), n = 0, o = i ? o : o[Symbol.iterator]();;) {
      var a;

      if (i) {
        if (n >= o.length) break;
        a = o[n++];
      } else {
        if ((n = o.next()).done) break;
        a = n.value;
      }

      l(a);
    }
  };

  return function () {
    var t = function (t) {
      if (!t.id) return console.error("Holo width error");
      t.elm.container.setAttribute("style", "");
      var i = c(t.elm.container.children[0]),
          o = i.width;
      t.item.height = i.height, t.item.width = o, t.numberOfSlots = s(t.elm.carousel.parentNode.clientWidth, t.item.width, t.item.max) || 1;
      var a = t.elm.container.clientWidth || t.elm.container.children.length * t.item.width;
      return t.carousel.width = t.numberOfSlots * t.item.width || t.elm.carousel.clientWidth, t.carousel.height = t.item.height || t.elm.carousel.clientHeight, t.container.width = t.io.orientation ? t.carousel.width : a, t.container.height = t.elm.container.clientHeight || t.item.height || 0, t.endNumber = t.io.orientation ? -Math.abs(t.container.height - t.carousel.height) : -Math.abs(t.container.width - t.carousel.width), n[t.id].setState(t), e(t);
    },
        e = function (t) {
      return n[t.id]._style(1), t.id ? (t = t.io.orientation ? ((e = t).transformY = e.io.snap && a(e.transformY, e.item.height) || e.transformY, e.transformX = 0, 0 > e.transformY ? e.transformY > e.endNumber ? e.sliderEnd = 0 : (e.transformY = e.endNumber, e.sliderEnd = -1) : (e.transformY = 0, e.sliderEnd = 1), e) : function (t) {
        return t.transformX = t.io.snap && a(t.transformX, t.item.width) || t.transformX, t.transformY = 0, 0 > t.transformX ? t.transformX > t.endNumber ? t.sliderEnd = 0 : (t.transformX = t.endNumber, t.sliderEnd = -1) : (t.transformX = 0, t.sliderEnd = 1), t;
      }(t), n[t.id].setState(t), o(t.id, t.transformX, t.transformY)) : console.error("Holo snap error");
      var e;
    },
        s = function (t, e, i) {
      var n = Math.floor(t / e);
      return i && n > i && (n = i), n || 1;
    },
        d = function (t) {
      t.elm.container.classList.add("shake-off");
      setTimeout(function () {
        return 0, t.elm.container.classList.remove("shake-off"), 0;
      }, 1e3);
    },
        c = function (t) {
      if (!t) return 0;
      var e = {};
      e.width = t.offsetWidth, e.height = t.offsetHeight;
      var i = window.getComputedStyle(t, null);
      return e.width += parseInt(i.marginLeft) + parseInt(i.marginRight), e.height += parseInt(i.marginTop) + parseInt(i.marginBottom), e;
    };

    document.addEventListener("DOMContentLoaded", function () {}, !1);

    var u = function () {
      for (var t in n) i.dispatch({
        id: "width" + t,
        type: "WIDTH",
        payload: n[t].getState,
        interval: 250
      });
    };

    return window.addEventListener("resize", function () {
      i.emit("when screen resize");
    }, !1), window.onload = function () {
      i.dispatch({
        id: "app loaded",
        type: "LOADED"
      });
    }, {
      TOUCH: r,
      INIT: function (n) {
        void 0 === n && (n = "holo-carousel"), console.log("%c HOLO - Initiating holo v2.2 ", "background: #022d5f; color: white; display: block;"), document.addEventListener("mousemove", function (t) {
          r.pressed && (r.currentX = t.clientX, r.currentY = t.clientY);
        }), document.addEventListener("mouseup", function (t) {
          t.preventDefault(), r.pressed && r._touchEnd(t);
        }), document.addEventListener("touchmove", function (t) {
          r.pressed && (r.currentX = t.touches[0].clientX, r.currentY = t.touches[0].clientY);
        }), document.addEventListener("touchend", function (t) {
          r.pressed && r._touchEnd(t);
        }), i.on("AnimateForward", r.animateSlideForward), i.on("AnimateBackward", r.animateSlideBackward), i.on("nxtSlide", r.nxtSlide), i.on("prvSlide", r.prvSlide), i.on("firstSlide", r.firstSlide), i.on("lastSlide", r.lastSlide), i.on("bringToFocus", r.focus), i.on("wheeler", r.wheeler), i.on("activate", r.activate), i.action({
          id: "when screen resize",
          type: "SCREEN",
          interval: 250
        }), i.emit("when screen resize"), i.on("SNAP", e), i.on("WIDTH", t), i.on("SHAKE", d), i.on("SCREEN", u);
      },
      HOLO: function (t) {
        return n[t].getAure;
      },
      BUILD: l,
      AUTO: h,
      carousel: function (t, e) {
        if (void 0 === e && (e = {}), !n[t]) return console.error("carousel not found"), {
          ok: !1,
          data: "carousel not found"
        };
        var i = n[t]._state;

        for (var o in e) i.io[o] && (i.io[o] = e[o]);

        return {
          ok: !0,
          data: i.io
        };
      }
    };
  }();
});
},{}],"js/app.js":[function(require,module,exports) {
"use strict";

var _holoCarousel = _interopRequireDefault(require("holo-carousel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var media10 = function media10() {
  _holoCarousel.default.INIT();

  _holoCarousel.default.AUTO('holo-carousel');
};

document.addEventListener('DOMContentLoaded', function () {
  media10();
}, false); //when dom loads do something
},{"holo-carousel":"../node_modules/holo-carousel/dist/holo-carousel.js"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52927" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.map
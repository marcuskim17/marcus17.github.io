function _regeneratorRuntime() {
  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime =
    function _regeneratorRuntime() {
      return exports;
    };
  var exports = {},
    Op = Object.prototype,
    hasOwn = Op.hasOwnProperty,
    defineProperty =
      Object.defineProperty ||
      function (obj, key, desc) {
        obj[key] = desc.value;
      },
    $Symbol = "function" == typeof Symbol ? Symbol : {},
    iteratorSymbol = $Symbol.iterator || "@@iterator",
    asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
    toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return (
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: !0,
        configurable: !0,
        writable: !0,
      }),
      obj[key]
    );
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define(obj, key, value) {
      return (obj[key] = value);
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator =
        outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
      generator = Object.create(protoGenerator.prototype),
      context = new Context(tryLocsList || []);
    return (
      defineProperty(generator, "_invoke", {
        value: makeInvokeMethod(innerFn, self, context),
      }),
      generator
    );
  }
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
    NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype &&
    NativeIteratorPrototype !== Op &&
    hasOwn.call(NativeIteratorPrototype, iteratorSymbol) &&
    (IteratorPrototype = NativeIteratorPrototype);
  var Gp =
    (GeneratorFunctionPrototype.prototype =
    Generator.prototype =
      Object.create(IteratorPrototype));
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg,
          value = result.value;
        return value &&
          "object" == _typeof(value) &&
          hasOwn.call(value, "__await")
          ? PromiseImpl.resolve(value.__await).then(
              function (value) {
                invoke("next", value, resolve, reject);
              },
              function (err) {
                invoke("throw", err, resolve, reject);
              }
            )
          : PromiseImpl.resolve(value).then(
              function (unwrapped) {
                (result.value = unwrapped), resolve(result);
              },
              function (error) {
                return invoke("throw", error, resolve, reject);
              }
            );
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function (resolve, reject) {
            invoke(method, arg, resolve, reject);
          });
        }
        return (previousPromise = previousPromise
          ? previousPromise.then(
              callInvokeWithMethodAndArg,
              callInvokeWithMethodAndArg
            )
          : callInvokeWithMethodAndArg());
      },
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function (method, arg) {
      if ("executing" === state)
        throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method) throw arg;
        return doneResult();
      }
      for (context.method = method, context.arg = arg; ; ) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }
        if ("next" === context.method)
          context.sent = context._sent = context.arg;
        else if ("throw" === context.method) {
          if ("suspendedStart" === state)
            throw ((state = "completed"), context.arg);
          context.dispatchException(context.arg);
        } else
          "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (
            ((state = context.done ? "completed" : "suspendedYield"),
            record.arg === ContinueSentinel)
          )
            continue;
          return { value: record.arg, done: context.done };
        }
        "throw" === record.type &&
          ((state = "completed"),
          (context.method = "throw"),
          (context.arg = record.arg));
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method,
      method = delegate.iterator[methodName];
    if (undefined === method)
      return (
        (context.delegate = null),
        ("throw" === methodName &&
          delegate.iterator.return &&
          ((context.method = "return"),
          (context.arg = undefined),
          maybeInvokeDelegate(delegate, context),
          "throw" === context.method)) ||
          ("return" !== methodName &&
            ((context.method = "throw"),
            (context.arg = new TypeError(
              "The iterator does not provide a '" + methodName + "' method"
            )))),
        ContinueSentinel
      );
    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type)
      return (
        (context.method = "throw"),
        (context.arg = record.arg),
        (context.delegate = null),
        ContinueSentinel
      );
    var info = record.arg;
    return info
      ? info.done
        ? ((context[delegate.resultName] = info.value),
          (context.next = delegate.nextLoc),
          "return" !== context.method &&
            ((context.method = "next"), (context.arg = undefined)),
          (context.delegate = null),
          ContinueSentinel)
        : info
      : ((context.method = "throw"),
        (context.arg = new TypeError("iterator result is not an object")),
        (context.delegate = null),
        ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };
    1 in locs && (entry.catchLoc = locs[1]),
      2 in locs && ((entry.finallyLoc = locs[2]), (entry.afterLoc = locs[3])),
      this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    (record.type = "normal"), delete record.arg, (entry.completion = record);
  }
  function Context(tryLocsList) {
    (this.tryEntries = [{ tryLoc: "root" }]),
      tryLocsList.forEach(pushTryEntry, this),
      this.reset(!0);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1,
          next = function next() {
            for (; ++i < iterable.length; )
              if (hasOwn.call(iterable, i))
                return (next.value = iterable[i]), (next.done = !1), next;
            return (next.value = undefined), (next.done = !0), next;
          };
        return (next.next = next);
      }
    }
    return { next: doneResult };
  }
  function doneResult() {
    return { value: undefined, done: !0 };
  }
  return (
    (GeneratorFunction.prototype = GeneratorFunctionPrototype),
    defineProperty(Gp, "constructor", {
      value: GeneratorFunctionPrototype,
      configurable: !0,
    }),
    defineProperty(GeneratorFunctionPrototype, "constructor", {
      value: GeneratorFunction,
      configurable: !0,
    }),
    (GeneratorFunction.displayName = define(
      GeneratorFunctionPrototype,
      toStringTagSymbol,
      "GeneratorFunction"
    )),
    (exports.isGeneratorFunction = function (genFun) {
      var ctor = "function" == typeof genFun && genFun.constructor;
      return (
        !!ctor &&
        (ctor === GeneratorFunction ||
          "GeneratorFunction" === (ctor.displayName || ctor.name))
      );
    }),
    (exports.mark = function (genFun) {
      return (
        Object.setPrototypeOf
          ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype)
          : ((genFun.__proto__ = GeneratorFunctionPrototype),
            define(genFun, toStringTagSymbol, "GeneratorFunction")),
        (genFun.prototype = Object.create(Gp)),
        genFun
      );
    }),
    (exports.awrap = function (arg) {
      return { __await: arg };
    }),
    defineIteratorMethods(AsyncIterator.prototype),
    define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
      return this;
    }),
    (exports.AsyncIterator = AsyncIterator),
    (exports.async = function (
      innerFn,
      outerFn,
      self,
      tryLocsList,
      PromiseImpl
    ) {
      void 0 === PromiseImpl && (PromiseImpl = Promise);
      var iter = new AsyncIterator(
        wrap(innerFn, outerFn, self, tryLocsList),
        PromiseImpl
      );
      return exports.isGeneratorFunction(outerFn)
        ? iter
        : iter.next().then(function (result) {
            return result.done ? result.value : iter.next();
          });
    }),
    defineIteratorMethods(Gp),
    define(Gp, toStringTagSymbol, "Generator"),
    define(Gp, iteratorSymbol, function () {
      return this;
    }),
    define(Gp, "toString", function () {
      return "[object Generator]";
    }),
    (exports.keys = function (val) {
      var object = Object(val),
        keys = [];
      for (var key in object) keys.push(key);
      return (
        keys.reverse(),
        function next() {
          for (; keys.length; ) {
            var key = keys.pop();
            if (key in object)
              return (next.value = key), (next.done = !1), next;
          }
          return (next.done = !0), next;
        }
      );
    }),
    (exports.values = values),
    (Context.prototype = {
      constructor: Context,
      reset: function reset(skipTempReset) {
        if (
          ((this.prev = 0),
          (this.next = 0),
          (this.sent = this._sent = undefined),
          (this.done = !1),
          (this.delegate = null),
          (this.method = "next"),
          (this.arg = undefined),
          this.tryEntries.forEach(resetTryEntry),
          !skipTempReset)
        )
          for (var name in this)
            "t" === name.charAt(0) &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1)) &&
              (this[name] = undefined);
      },
      stop: function stop() {
        this.done = !0;
        var rootRecord = this.tryEntries[0].completion;
        if ("throw" === rootRecord.type) throw rootRecord.arg;
        return this.rval;
      },
      dispatchException: function dispatchException(exception) {
        if (this.done) throw exception;
        var context = this;
        function handle(loc, caught) {
          return (
            (record.type = "throw"),
            (record.arg = exception),
            (context.next = loc),
            caught && ((context.method = "next"), (context.arg = undefined)),
            !!caught
          );
        }
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i],
            record = entry.completion;
          if ("root" === entry.tryLoc) return handle("end");
          if (entry.tryLoc <= this.prev) {
            var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");
            if (hasCatch && hasFinally) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            } else if (hasCatch) {
              if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            } else {
              if (!hasFinally)
                throw new Error("try statement without catch or finally");
              if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
            }
          }
        }
      },
      abrupt: function abrupt(type, arg) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (
            entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc
          ) {
            var finallyEntry = entry;
            break;
          }
        }
        finallyEntry &&
          ("break" === type || "continue" === type) &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc &&
          (finallyEntry = null);
        var record = finallyEntry ? finallyEntry.completion : {};
        return (
          (record.type = type),
          (record.arg = arg),
          finallyEntry
            ? ((this.method = "next"),
              (this.next = finallyEntry.finallyLoc),
              ContinueSentinel)
            : this.complete(record)
        );
      },
      complete: function complete(record, afterLoc) {
        if ("throw" === record.type) throw record.arg;
        return (
          "break" === record.type || "continue" === record.type
            ? (this.next = record.arg)
            : "return" === record.type
            ? ((this.rval = this.arg = record.arg),
              (this.method = "return"),
              (this.next = "end"))
            : "normal" === record.type && afterLoc && (this.next = afterLoc),
          ContinueSentinel
        );
      },
      finish: function finish(finallyLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.finallyLoc === finallyLoc)
            return (
              this.complete(entry.completion, entry.afterLoc),
              resetTryEntry(entry),
              ContinueSentinel
            );
        }
      },
      catch: function _catch(tryLoc) {
        for (var i = this.tryEntries.length - 1; i >= 0; --i) {
          var entry = this.tryEntries[i];
          if (entry.tryLoc === tryLoc) {
            var record = entry.completion;
            if ("throw" === record.type) {
              var thrown = record.arg;
              resetTryEntry(entry);
            }
            return thrown;
          }
        }
        throw new Error("illegal catch attempt");
      },
      delegateYield: function delegateYield(iterable, resultName, nextLoc) {
        return (
          (this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc,
          }),
          "next" === this.method && (this.arg = undefined),
          ContinueSentinel
        );
      },
    }),
    exports
  );
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", { writable: false });
  return Constructor;
}
function _toPropertyKey(arg) {
  var key = _toPrimitive(arg, "string");
  return _typeof(key) === "symbol" ? key : String(key);
}
function _toPrimitive(input, hint) {
  if (_typeof(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if (_typeof(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}
function _nonIterableRest() {
  throw new TypeError(
    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}
function _iterableToArrayLimit(arr, i) {
  var _i =
    null == arr
      ? null
      : ("undefined" != typeof Symbol && arr[Symbol.iterator]) ||
        arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (((_x = (_i = _i.call(arr)).next), 0 === i)) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else
        for (
          ;
          !(_n = (_s = _x.call(_i)).done) &&
          (_arr.push(_s.value), _arr.length !== i);
          _n = !0
        );
    } catch (err) {
      (_d = !0), (_e = err);
    } finally {
      try {
        if (!_n && null != _i.return && ((_r = _i.return()), Object(_r) !== _r))
          return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
function _typeof(obj) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              "function" == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          }),
    _typeof(obj)
  );
}
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e5) {
          throw _e5;
        },
        f: F,
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e6) {
      didErr = true;
      err = _e6;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    },
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}
(function () {
  var Qe = Object.create;
  var N = Object.defineProperty;
  var Te = Object.getOwnPropertyDescriptor;
  var Ne = Object.getOwnPropertyNames,
    H = Object.getOwnPropertySymbols,
    Pe = Object.getPrototypeOf,
    k = Object.prototype.hasOwnProperty,
    Be = Object.prototype.propertyIsEnumerable;
  var F = function F(t, e, n) {
      return e in t
        ? N(t, e, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: n,
          })
        : (t[e] = n);
    },
    _ = function _(t, e) {
      for (var n in e || (e = {})) k.call(e, n) && F(t, n, e[n]);
      if (H) {
        var _iterator = _createForOfIteratorHelper(H(e)),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done; ) {
            var n = _step.value;
            Be.call(e, n) && F(t, n, e[n]);
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      return t;
    };
  var m = function m(t, e) {
    return function () {
      return (
        e ||
          t(
            (e = {
              exports: {},
            }).exports,
            e
          ),
        e.exports
      );
    };
  };
  var xe = function xe(t, e, n, r) {
    if ((e && _typeof(e) == "object") || typeof e == "function") {
      var _iterator2 = _createForOfIteratorHelper(Ne(e)),
        _step2;
      try {
        var _loop = function _loop() {
          var s = _step2.value;
          !k.call(t, s) &&
            s !== n &&
            N(t, s, {
              get: function get() {
                return e[s];
              },
              enumerable: !(r = Te(e, s)) || r.enumerable,
            });
        };
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
          _loop();
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }
    return t;
  };
  var z = function z(t, e, n) {
    return (
      (n = t != null ? Qe(Pe(t)) : {}),
      xe(
        e || !t || !t.__esModule
          ? N(n, "default", {
              value: t,
              enumerable: !0,
            })
          : n,
        t
      )
    );
  };
  var W = m(function (O) {
    Object.defineProperty(O, "__esModule", {
      value: !0,
    });
    O.makeKarrotBridge = void 0;
    function Ke(_ref) {
      var t = _ref.driver;
      return {
        driver: t,
        refreshAccessToken: function refreshAccessToken(e) {
          return t.onQueried("REQ.AUTH.REFRESH_ACCESS_TOKEN", e);
        },
        setHapticSuccess: function setHapticSuccess(e) {
          return t.onQueried("REQ.HAPTIC.SUCCESS", e);
        },
        setHapticError: function setHapticError(e) {
          return t.onQueried("REQ.HAPTIC.ERROR", e);
        },
        setHapticSelect: function setHapticSelect(e) {
          return t.onQueried("REQ.HAPTIC.SELECT", e);
        },
        setHapticLightFeedback: function setHapticLightFeedback(e) {
          return t.onQueried("REQ.HAPTIC.LIGHT_FEEDBACK", e);
        },
        logEvent: function logEvent(e) {
          return t.onQueried("REQ.ANALYTICS.LOG_EVENT", e);
        },
        getCurrentPosition: function getCurrentPosition(e) {
          return t.onQueried("REQ.GEOLOCATION.CURRENT_POSITION", e);
        },
        configureImage: function configureImage(e) {
          return t.onQueried("REQ.IMAGE.CONFIGURE", e);
        },
        pickImages: function pickImages(e) {
          return t.onQueried("REQ.IMAGE.PICK", e);
        },
        getAppInfo: function getAppInfo(e) {
          return t.onQueried("REQ.INFO.APP", e);
        },
        getRegionInfo: function getRegionInfo(e) {
          return t.onQueried("REQ.INFO.REGION", e);
        },
        getUserInfo: function getUserInfo(e) {
          return t.onQueried("REQ.INFO.USER", e);
        },
        getKarrotAnalyticsSessionInfo: function getKarrotAnalyticsSessionInfo(
          e
        ) {
          return t.onQueried("REQ.INFO.ANALYTICS_SESSION", e);
        },
        openPlugin: function openPlugin(e) {
          return t.onQueried("REQ.PLUGIN.OPEN", e);
        },
        closePlugin: function closePlugin(e) {
          return t.onQueried("REQ.PLUGIN.CLOSE", e);
        },
        styleCurrentPlugin: function styleCurrentPlugin(e) {
          return t.onQueried("REQ.PLUGIN.STYLE", e);
        },
        changeRegion: function changeRegion(e) {
          return t.onQueried("REQ.REGION.CHANGE", e);
        },
        share: function share(e) {
          return t.onQueried("REQ.SHARE.OPEN", e);
        },
        openToast: function openToast(e) {
          return t.onQueried("REQ.TOAST.OPEN", e);
        },
        pushRouter: function pushRouter(e) {
          return t.onQueried("REQ.ROUTER.PUSH", e);
        },
        pushRouterWithPresent: function pushRouterWithPresent(e) {
          return t.onQueried("REQ.ROUTER.OPEN", e);
        },
        replaceRouter: function replaceRouter(e) {
          return t.onQueried("REQ.ROUTER.REPLACE", e);
        },
        prefetchRouter: function prefetchRouter(e) {
          return t.onQueried("REQ.ROUTER.PREFETCH", e);
        },
        closeRouter: function closeRouter(e) {
          return t.onQueried("REQ.ROUTER.CLOSE", e);
        },
        dangerouslyCloseAllRouters: function dangerouslyCloseAllRouters(e) {
          return t.onQueried("REQ.ROUTER.CLOSE_ALL", e);
        },
        styleCurrentRouter: function styleCurrentRouter(e) {
          return t.onQueried("REQ.ROUTER.STYLE", e);
        },
        setItemInStorage: function setItemInStorage(e) {
          return t.onQueried("REQ.STORAGE.SET", e);
        },
        getItemInStorage: function getItemInStorage(e) {
          return t.onQueried("REQ.STORAGE.GET", e);
        },
        getAllItemsInStorage: function getAllItemsInStorage(e) {
          return t.onQueried("REQ.STORAGE.GET_ALL", e);
        },
        deleteItemInStorage: function deleteItemInStorage(e) {
          return t.onQueried("REQ.STORAGE.DELETE", e);
        },
        emitToStream: function emitToStream(e) {
          return t.onQueried("REQ.STREAM.EMIT", e);
        },
        copyClipboard: function copyClipboard(e) {
          return t.onQueried("REQ.CLIPBOARD.COPY", e);
        },
        refreshCommunityFeed: function refreshCommunityFeed(e) {
          return t.onQueried("REQ.COMMUNITY.REFRESH_FEED", e);
        },
        notifyCompletedAds: function notifyCompletedAds(e) {
          return t.onQueried("REQ.NEIGHBOR.COMPLETE_ADS", e);
        },
        configureAndroidBackButtonPressed:
          function configureAndroidBackButtonPressed(e) {
            return t.onQueried("REQ.BACK_BUTTON_PRESSED.CONFIGURE", e);
          },
        dangerouslySubscribeStream: function dangerouslySubscribeStream(e, n) {
          return t.onSubscribed("REQ.STREAM.SUBSCRIBE", e, n);
        },
        subscribeKeyboardNotification: function subscribeKeyboardNotification(
          e,
          n
        ) {
          return t.onSubscribed("REQ.KEYBOARD_NOTIFICATION.SUBSCRIBE", e, n);
        },
        getExperimentVariables: function getExperimentVariables(e, n) {
          return t.onSubscribed("REQ.EXPERIMENT.VARIABLES", e, n);
        },
        triggerExperimentEvent: function triggerExperimentEvent(e, n) {
          return t.onSubscribed("REQ.EXPERIMENT.TRIGGER_EVENT", e, n);
        },
        subscribeAndroidBackButtonPressed:
          function subscribeAndroidBackButtonPressed(e, n) {
            return t.onSubscribed("REQ.BACK_BUTTON_PRESSED.SUBSCRIBE", e, n);
          },
      };
    }
    O.makeKarrotBridge = Ke;
  });
  var re = m(function (ft, P) {
    var C =
        (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) ==
        "object"
          ? Reflect
          : null,
      q =
        C && typeof C.apply == "function"
          ? C.apply
          : function (e, n, r) {
              return Function.prototype.apply.call(e, n, r);
            },
      S;
    C && typeof C.ownKeys == "function"
      ? (S = C.ownKeys)
      : Object.getOwnPropertySymbols
      ? (S = function S(e) {
          return Object.getOwnPropertyNames(e).concat(
            Object.getOwnPropertySymbols(e)
          );
        })
      : (S = function S(e) {
          return Object.getOwnPropertyNames(e);
        });
    function Me(t) {
      console && console.warn && console.warn(t);
    }
    var V =
      Number.isNaN ||
      function (e) {
        return e !== e;
      };
    function u() {
      u.init.call(this);
    }
    P.exports = u;
    P.exports.once = Ge;
    u.EventEmitter = u;
    u.prototype._events = void 0;
    u.prototype._eventsCount = 0;
    u.prototype._maxListeners = void 0;
    var $ = 10;
    function I(t) {
      if (typeof t != "function")
        throw new TypeError(
          'The "listener" argument must be of type Function. Received type ' +
            _typeof(t)
        );
    }
    Object.defineProperty(u, "defaultMaxListeners", {
      enumerable: !0,
      get: function get() {
        return $;
      },
      set: function set(t) {
        if (typeof t != "number" || t < 0 || V(t))
          throw new RangeError(
            'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' +
              t +
              "."
          );
        $ = t;
      },
    });
    u.init = function () {
      (this._events === void 0 ||
        this._events === Object.getPrototypeOf(this)._events) &&
        ((this._events = Object.create(null)), (this._eventsCount = 0)),
        (this._maxListeners = this._maxListeners || void 0);
    };
    u.prototype.setMaxListeners = function (e) {
      if (typeof e != "number" || e < 0 || V(e))
        throw new RangeError(
          'The value of "n" is out of range. It must be a non-negative number. Received ' +
            e +
            "."
        );
      return (this._maxListeners = e), this;
    };
    function Y(t) {
      return t._maxListeners === void 0
        ? u.defaultMaxListeners
        : t._maxListeners;
    }
    u.prototype.getMaxListeners = function () {
      return Y(this);
    };
    u.prototype.emit = function (e) {
      for (var n = [], r = 1; r < arguments.length; r++) n.push(arguments[r]);
      var s = e === "error",
        o = this._events;
      if (o !== void 0) s = s && o.error === void 0;
      else if (!s) return !1;
      if (s) {
        var i;
        if ((n.length > 0 && (i = n[0]), i instanceof Error)) throw i;
        var a = new Error(
          "Unhandled error." + (i ? " (" + i.message + ")" : "")
        );
        throw ((a.context = i), a);
      }
      var l = o[e];
      if (l === void 0) return !1;
      if (typeof l == "function") q(l, this, n);
      else
        for (var f = l.length, c = te(l, f), r = 0; r < f; ++r)
          q(c[r], this, n);
      return !0;
    };
    function J(t, e, n, r) {
      var s, o, i;
      if (
        (I(n),
        (o = t._events),
        o === void 0
          ? ((o = t._events = Object.create(null)), (t._eventsCount = 0))
          : (o.newListener !== void 0 &&
              (t.emit("newListener", e, n.listener ? n.listener : n),
              (o = t._events)),
            (i = o[e])),
        i === void 0)
      )
        (i = o[e] = n), ++t._eventsCount;
      else if (
        (typeof i == "function"
          ? (i = o[e] = r ? [n, i] : [i, n])
          : r
          ? i.unshift(n)
          : i.push(n),
        (s = Y(t)),
        s > 0 && i.length > s && !i.warned)
      ) {
        i.warned = !0;
        var a = new Error(
          "Possible EventEmitter memory leak detected. " +
            i.length +
            " " +
            String(e) +
            " listeners added. Use emitter.setMaxListeners() to increase limit"
        );
        (a.name = "MaxListenersExceededWarning"),
          (a.emitter = t),
          (a.type = e),
          (a.count = i.length),
          Me(a);
      }
      return t;
    }
    u.prototype.addListener = function (e, n) {
      return J(this, e, n, !1);
    };
    u.prototype.on = u.prototype.addListener;
    u.prototype.prependListener = function (e, n) {
      return J(this, e, n, !0);
    };
    function Ue() {
      if (!this.fired)
        return (
          this.target.removeListener(this.type, this.wrapFn),
          (this.fired = !0),
          arguments.length === 0
            ? this.listener.call(this.target)
            : this.listener.apply(this.target, arguments)
        );
    }
    function X(t, e, n) {
      var r = {
          fired: !1,
          wrapFn: void 0,
          target: t,
          type: e,
          listener: n,
        },
        s = Ue.bind(r);
      return (s.listener = n), (r.wrapFn = s), s;
    }
    u.prototype.once = function (e, n) {
      return I(n), this.on(e, X(this, e, n)), this;
    };
    u.prototype.prependOnceListener = function (e, n) {
      return I(n), this.prependListener(e, X(this, e, n)), this;
    };
    u.prototype.removeListener = function (e, n) {
      var r, s, o, i, a;
      if ((I(n), (s = this._events), s === void 0)) return this;
      if (((r = s[e]), r === void 0)) return this;
      if (r === n || r.listener === n)
        --this._eventsCount === 0
          ? (this._events = Object.create(null))
          : (delete s[e],
            s.removeListener &&
              this.emit("removeListener", e, r.listener || n));
      else if (typeof r != "function") {
        for (o = -1, i = r.length - 1; i >= 0; i--)
          if (r[i] === n || r[i].listener === n) {
            (a = r[i].listener), (o = i);
            break;
          }
        if (o < 0) return this;
        o === 0 ? r.shift() : De(r, o),
          r.length === 1 && (s[e] = r[0]),
          s.removeListener !== void 0 && this.emit("removeListener", e, a || n);
      }
      return this;
    };
    u.prototype.off = u.prototype.removeListener;
    u.prototype.removeAllListeners = function (e) {
      var n, r, s;
      if (((r = this._events), r === void 0)) return this;
      if (r.removeListener === void 0)
        return (
          arguments.length === 0
            ? ((this._events = Object.create(null)), (this._eventsCount = 0))
            : r[e] !== void 0 &&
              (--this._eventsCount === 0
                ? (this._events = Object.create(null))
                : delete r[e]),
          this
        );
      if (arguments.length === 0) {
        var o = Object.keys(r),
          i;
        for (s = 0; s < o.length; ++s)
          (i = o[s]), i !== "removeListener" && this.removeAllListeners(i);
        return (
          this.removeAllListeners("removeListener"),
          (this._events = Object.create(null)),
          (this._eventsCount = 0),
          this
        );
      }
      if (((n = r[e]), typeof n == "function")) this.removeListener(e, n);
      else if (n !== void 0)
        for (s = n.length - 1; s >= 0; s--) this.removeListener(e, n[s]);
      return this;
    };
    function Z(t, e, n) {
      var r = t._events;
      if (r === void 0) return [];
      var s = r[e];
      return s === void 0
        ? []
        : typeof s == "function"
        ? n
          ? [s.listener || s]
          : [s]
        : n
        ? je(s)
        : te(s, s.length);
    }
    u.prototype.listeners = function (e) {
      return Z(this, e, !0);
    };
    u.prototype.rawListeners = function (e) {
      return Z(this, e, !1);
    };
    u.listenerCount = function (t, e) {
      return typeof t.listenerCount == "function"
        ? t.listenerCount(e)
        : ee.call(t, e);
    };
    u.prototype.listenerCount = ee;
    function ee(t) {
      var e = this._events;
      if (e !== void 0) {
        var n = e[t];
        if (typeof n == "function") return 1;
        if (n !== void 0) return n.length;
      }
      return 0;
    }
    u.prototype.eventNames = function () {
      return this._eventsCount > 0 ? S(this._events) : [];
    };
    function te(t, e) {
      for (var n = new Array(e), r = 0; r < e; ++r) n[r] = t[r];
      return n;
    }
    function De(t, e) {
      for (; e + 1 < t.length; e++) t[e] = t[e + 1];
      t.pop();
    }
    function je(t) {
      for (var e = new Array(t.length), n = 0; n < e.length; ++n)
        e[n] = t[n].listener || t[n];
      return e;
    }
    function Ge(t, e) {
      return new Promise(function (n, r) {
        function s(i) {
          t.removeListener(e, o), r(i);
        }
        function o() {
          typeof t.removeListener == "function" && t.removeListener("error", s),
            n([].slice.call(arguments));
        }
        ne(t, e, o, {
          once: !0,
        }),
          e !== "error" &&
            He(t, s, {
              once: !0,
            });
      });
    }
    function He(t, e, n) {
      typeof t.on == "function" && ne(t, "error", e, n);
    }
    function ne(t, e, n, r) {
      if (typeof t.on == "function") r.once ? t.once(e, n) : t.on(e, n);
      else if (typeof t.addEventListener == "function")
        t.addEventListener(e, function s(o) {
          r.once && t.removeEventListener(e, s), n(o);
        });
      else
        throw new TypeError(
          'The "emitter" argument must be of type EventEmitter. Received type ' +
            _typeof(t)
        );
    }
  });
  var ae = m(function (lt, x) {
    var se = function se(t) {
        return _typeof(t) == "object" && t !== null;
      },
      oe = Symbol("skip"),
      ie = function ie(t) {
        return (
          se(t) &&
          !(t instanceof RegExp) &&
          !(t instanceof Error) &&
          !(t instanceof Date)
        );
      },
      B = function B(t, e, n) {
        var r =
          arguments.length > 3 && arguments[3] !== undefined
            ? arguments[3]
            : new WeakMap();
        if (
          ((n = _(
            {
              deep: !1,
              target: {},
            },
            n
          )),
          r.has(t))
        )
          return r.get(t);
        r.set(t, n.target);
        var _n = n,
          s = _n.target;
        delete n.target;
        var o = function o(i) {
          return i.map(function (a) {
            return ie(a) ? B(a, e, n, r) : a;
          });
        };
        if (Array.isArray(t)) return o(t);
        for (
          var _i = 0, _Object$entries = Object.entries(t);
          _i < _Object$entries.length;
          _i++
        ) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            i = _Object$entries$_i[0],
            a = _Object$entries$_i[1];
          var l = e(i, a, t);
          if (l === oe) continue;
          var _l = _slicedToArray(l, 3),
            f = _l[0],
            c = _l[1],
            _l$ = _l[2],
            _l$2 = _l$ === void 0 ? {} : _l$,
            _l$2$shouldRecurse = _l$2.shouldRecurse,
            E = _l$2$shouldRecurse === void 0 ? !0 : _l$2$shouldRecurse;
          f !== "__proto__" &&
            (n.deep &&
              E &&
              ie(c) &&
              (c = Array.isArray(c) ? o(c) : B(c, e, n, r)),
            (s[f] = c));
        }
        return s;
      };
    x.exports = function (t, e, n) {
      if (!se(t))
        throw new TypeError(
          "Expected an object, got '".concat(t, "' (").concat(_typeof(t), ")")
        );
      return B(t, e, n);
    };
    x.exports.mapObjectSkip = oe;
  });
  var Ee = m(function (ht, K) {
    var Fe =
        /(?:[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1C90-\u1CBA\u1CBD-\u1CBF\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2F\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uA7B8\uA7BA\uA7BC\uA7BE\uA7C0\uA7C2\uA7C4-\uA7C7\uA7C9\uA7D0\uA7D6\uA7D8\uA7F5\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27\uDCB0-\uDCD3\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD81B[\uDE40-\uDE5F]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21])/,
      ke =
        /(?:[a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0560-\u0588\u10D0-\u10FA\u10FD-\u10FF\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5F\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7AF\uA7B5\uA7B7\uA7B9\uA7BB\uA7BD\uA7BF\uA7C1\uA7C3\uA7C8\uA7CA\uA7D1\uA7D3\uA7D5\uA7D7\uA7D9\uA7F6\uA7FA\uAB30-\uAB5A\uAB60-\uAB68\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD81B[\uDE60-\uDE7F]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD837[\uDF00-\uDF09\uDF0B-\uDF1E\uDF25-\uDF2A]|\uD83A[\uDD22-\uDD43])/,
      ue =
        /^(?:[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1C90-\u1CBA\u1CBD-\u1CBF\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2F\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uA7B8\uA7BA\uA7BC\uA7BE\uA7C0\uA7C2\uA7C4-\uA7C7\uA7C9\uA7D0\uA7D6\uA7D8\uA7F5\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27\uDCB0-\uDCD3\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD81B[\uDE40-\uDE5F]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21])(?!(?:[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1C90-\u1CBA\u1CBD-\u1CBF\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2F\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uA7B8\uA7BA\uA7BC\uA7BE\uA7C0\uA7C2\uA7C4-\uA7C7\uA7C9\uA7D0\uA7D6\uA7D8\uA7F5\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27\uDCB0-\uDCD3\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD81B[\uDE40-\uDE5F]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]))/g,
      le =
        /((?:[0-9A-Z_a-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0345\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05B0-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05EF-\u05F2\u0610-\u061A\u0620-\u0657\u0659-\u0669\u066E-\u06D3\u06D5-\u06DC\u06E1-\u06E8\u06ED-\u06FC\u06FF\u0710-\u073F\u074D-\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0817\u081A-\u082C\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u08D4-\u08DF\u08E3-\u08E9\u08F0-\u093B\u093D-\u094C\u094E-\u0950\u0955-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD-\u09C4\u09C7\u09C8\u09CB\u09CC\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3E-\u0A42\u0A47\u0A48\u0A4B\u0A4C\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD-\u0AC5\u0AC7-\u0AC9\u0ACB\u0ACC\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9-\u0AFC\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D-\u0B44\u0B47\u0B48\u0B4B\u0B4C\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71-\u0B77\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCC\u0BD0\u0BD7\u0BE6-\u0BF2\u0C00-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4C\u0C55\u0C56\u0C58-\u0C5A\u0C5D\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7E\u0C80-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCC\u0CD5\u0CD6\u0CDD\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1-\u0CF3\u0D00-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4C\u0D4E\u0D54-\u0D63\u0D66-\u0D78\u0D7A-\u0D7F\u0D81-\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E46\u0E4D\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F71-\u0F83\u0F88-\u0F97\u0F99-\u0FBC\u1000-\u1036\u1038\u103B-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1713\u171F-\u1733\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17B3\u17B6-\u17C8\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u1938\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A61-\u1A74\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1ABF\u1AC0\u1ACC-\u1ACE\u1B00-\u1B33\u1B35-\u1B43\u1B45-\u1B4C\u1B50-\u1B59\u1B80-\u1BA9\u1BAC-\u1BE5\u1BE7-\u1BF1\u1C00-\u1C36\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1DE7-\u1DF4\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2189\u2150-\u2182\u2460-\u249B\u24B6-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA674-\uA67B\uA67F-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA805\uA807-\uA827\uA830-\uA835\uA840-\uA873\uA880-\uA8C3\uA8C5\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD-\uA92A\uA930-\uA952\uA960-\uA97C\uA980-\uA9B2\uA9B4-\uA9BF\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAABE\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF5\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABEA\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD27\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEAB\uDEAC\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC00-\uDC45\uDC52-\uDC6F\uDC71-\uDC75\uDC80-\uDCB8\uDCC2\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD32\uDD36-\uDD3F\uDD44-\uDD47\uDD50-\uDD72\uDD76\uDD80-\uDDBF\uDDC1-\uDDC4\uDDCE-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE34\uDE37\uDE3E-\uDE41\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEE8\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D-\uDF44\uDF47\uDF48\uDF4B\uDF4C\uDF50\uDF57\uDF5D-\uDF63]|\uD805[\uDC00-\uDC41\uDC43-\uDC45\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCC1\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDBE\uDDD8-\uDDDD\uDE00-\uDE3E\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB5\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF1D-\uDF2A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC38\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD35\uDD37\uDD38\uDD3B\uDD3C\uDD3F-\uDD42\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD7\uDDDA-\uDDDF\uDDE1\uDDE3\uDDE4\uDE00-\uDE32\uDE35-\uDE3E\uDE50-\uDE97\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC36\uDC38-\uDC3E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDC92-\uDCA7\uDCA9-\uDCB6\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD36\uDD3A\uDD3C\uDD3D\uDD3F-\uDD41\uDD43\uDD46\uDD47\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD8E\uDD90\uDD91\uDD93-\uDD96\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF6\uDF00-\uDF10\uDF12-\uDF3A\uDF3E-\uDF40\uDF50-\uDF59\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883\uD885-\uD887][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2F\uDC41-\uDC46]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF4F-\uDF87\uDF8F-\uDF9F\uDFE0\uDFE1\uDFE3\uDFF0\uDFF1]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD32\uDD50-\uDD52\uDD55\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9E]|\uD834[\uDEC0-\uDED3\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E\uDF25-\uDF2A]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A\uDC30-\uDC6D\uDC8F\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDCD0-\uDCEB\uDCF0-\uDCF9\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD47\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C\uDD30-\uDD49\uDD50-\uDD69\uDD70-\uDD89]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF39\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A\uDF50-\uDFFF]|\uD888[\uDC00-\uDFAF])|$)/,
      de = /[_.\- ]+/,
      ze = new RegExp("^" + de.source),
      ce = new RegExp(de.source + le.source, "gu"),
      fe = new RegExp("\\d+" + le.source, "gu"),
      We = function We(t, e, n) {
        var r = !1,
          s = !1,
          o = !1;
        for (var i = 0; i < t.length; i++) {
          var a = t[i];
          r && Fe.test(a)
            ? ((t = t.slice(0, i) + "-" + t.slice(i)),
              (r = !1),
              (o = s),
              (s = !0),
              i++)
            : s && o && ke.test(a)
            ? ((t = t.slice(0, i - 1) + "-" + t.slice(i - 1)),
              (o = s),
              (s = !1),
              (r = !0))
            : ((r = e(a) === a && n(a) !== a),
              (o = s),
              (s = n(a) === a && e(a) !== a));
        }
        return t;
      },
      qe = function qe(t, e) {
        return (
          (ue.lastIndex = 0),
          t.replace(ue, function (n) {
            return e(n);
          })
        );
      },
      $e = function $e(t, e) {
        return (
          (ce.lastIndex = 0),
          (fe.lastIndex = 0),
          t
            .replace(ce, function (n, r) {
              return e(r);
            })
            .replace(fe, function (n) {
              return e(n);
            })
        );
      },
      he = function he(t, e) {
        if (!(typeof t == "string" || Array.isArray(t)))
          throw new TypeError("Expected the input to be 'string | string[]'");
        if (
          ((e = _(
            {
              pascalCase: !1,
              preserveConsecutiveUppercase: !1,
            },
            e
          )),
          Array.isArray(t)
            ? (t = t
                .map(function (o) {
                  return o.trim();
                })
                .filter(function (o) {
                  return o.length;
                })
                .join("-"))
            : (t = t.trim()),
          t.length === 0)
        )
          return "";
        var n =
            e.locale === !1
              ? function (o) {
                  return o.toLowerCase();
                }
              : function (o) {
                  return o.toLocaleLowerCase(e.locale);
                },
          r =
            e.locale === !1
              ? function (o) {
                  return o.toUpperCase();
                }
              : function (o) {
                  return o.toLocaleUpperCase(e.locale);
                };
        return t.length === 1
          ? e.pascalCase
            ? r(t)
            : n(t)
          : (t !== n(t) && (t = We(t, n, r)),
            (t = t.replace(ze, "")),
            e.preserveConsecutiveUppercase ? (t = qe(t, n)) : (t = n(t)),
            e.pascalCase && (t = r(t.charAt(0)) + t.slice(1)),
            $e(t, r));
      };
    K.exports = he;
    K.exports.default = he;
  });
  var me = m(function (pt, pe) {
    var M = /*#__PURE__*/ (function (_Symbol$iterator) {
      function M() {
        var e =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : {};
        _classCallCheck(this, M);
        if (!(e.maxSize && e.maxSize > 0))
          throw new TypeError("'maxSize' must be a number greater than 0");
        (this.maxSize = e.maxSize),
          (this.onEviction = e.onEviction),
          (this.cache = new Map()),
          (this.oldCache = new Map()),
          (this._size = 0);
      }
      _createClass(M, [
        {
          key: "_set",
          value: function _set(e, n) {
            if (
              (this.cache.set(e, n), this._size++, this._size >= this.maxSize)
            ) {
              if (((this._size = 0), typeof this.onEviction == "function")) {
                var _iterator3 = _createForOfIteratorHelper(
                    this.oldCache.entries()
                  ),
                  _step3;
                try {
                  for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
                    var _step3$value = _slicedToArray(_step3.value, 2),
                      r = _step3$value[0],
                      s = _step3$value[1];
                    this.onEviction(r, s);
                  }
                } catch (err) {
                  _iterator3.e(err);
                } finally {
                  _iterator3.f();
                }
              }
              (this.oldCache = this.cache), (this.cache = new Map());
            }
          },
        },
        {
          key: "get",
          value: function get(e) {
            if (this.cache.has(e)) return this.cache.get(e);
            if (this.oldCache.has(e)) {
              var n = this.oldCache.get(e);
              return this.oldCache.delete(e), this._set(e, n), n;
            }
          },
        },
        {
          key: "set",
          value: function set(e, n) {
            return (
              this.cache.has(e) ? this.cache.set(e, n) : this._set(e, n), this
            );
          },
        },
        {
          key: "has",
          value: function has(e) {
            return this.cache.has(e) || this.oldCache.has(e);
          },
        },
        {
          key: "peek",
          value: function peek(e) {
            if (this.cache.has(e)) return this.cache.get(e);
            if (this.oldCache.has(e)) return this.oldCache.get(e);
          },
        },
        {
          key: "delete",
          value: function _delete(e) {
            var n = this.cache.delete(e);
            return n && this._size--, this.oldCache.delete(e) || n;
          },
        },
        {
          key: "clear",
          value: function clear() {
            this.cache.clear(), this.oldCache.clear(), (this._size = 0);
          },
        },
        {
          key: "keys",
          value: /*#__PURE__*/ _regeneratorRuntime().mark(function keys() {
            var _iterator4, _step4, _step4$value, e;
            return _regeneratorRuntime().wrap(
              function keys$(_context) {
                while (1)
                  switch ((_context.prev = _context.next)) {
                    case 0:
                      _iterator4 = _createForOfIteratorHelper(this);
                      _context.prev = 1;
                      _iterator4.s();
                    case 3:
                      if ((_step4 = _iterator4.n()).done) {
                        _context.next = 9;
                        break;
                      }
                      (_step4$value = _slicedToArray(_step4.value, 1)),
                        (e = _step4$value[0]);
                      _context.next = 7;
                      return e;
                    case 7:
                      _context.next = 3;
                      break;
                    case 9:
                      _context.next = 14;
                      break;
                    case 11:
                      _context.prev = 11;
                      _context.t0 = _context.catch(1);
                      _iterator4.e(_context.t0);
                    case 14:
                      _context.prev = 14;
                      _iterator4.f();
                      return _context.finish(14);
                    case 17:
                    case "end":
                      return _context.stop();
                  }
              },
              keys,
              this,
              [[1, 11, 14, 17]]
            );
          }),
        },
        {
          key: "values",
          value: /*#__PURE__*/ _regeneratorRuntime().mark(function values() {
            var _iterator5, _step5, _step5$value, e;
            return _regeneratorRuntime().wrap(
              function values$(_context2) {
                while (1)
                  switch ((_context2.prev = _context2.next)) {
                    case 0:
                      _iterator5 = _createForOfIteratorHelper(this);
                      _context2.prev = 1;
                      _iterator5.s();
                    case 3:
                      if ((_step5 = _iterator5.n()).done) {
                        _context2.next = 9;
                        break;
                      }
                      (_step5$value = _slicedToArray(_step5.value, 2)),
                        (e = _step5$value[1]);
                      _context2.next = 7;
                      return e;
                    case 7:
                      _context2.next = 3;
                      break;
                    case 9:
                      _context2.next = 14;
                      break;
                    case 11:
                      _context2.prev = 11;
                      _context2.t0 = _context2.catch(1);
                      _iterator5.e(_context2.t0);
                    case 14:
                      _context2.prev = 14;
                      _iterator5.f();
                      return _context2.finish(14);
                    case 17:
                    case "end":
                      return _context2.stop();
                  }
              },
              values,
              this,
              [[1, 11, 14, 17]]
            );
          }),
        },
        {
          key: _Symbol$iterator,
          value: /*#__PURE__*/ _regeneratorRuntime().mark(function value() {
            var _iterator6, _step6, e, _iterator7, _step7, _e2, _e3, n;
            return _regeneratorRuntime().wrap(
              function value$(_context3) {
                while (1)
                  switch ((_context3.prev = _context3.next)) {
                    case 0:
                      _iterator6 = _createForOfIteratorHelper(this.cache);
                      _context3.prev = 1;
                      _iterator6.s();
                    case 3:
                      if ((_step6 = _iterator6.n()).done) {
                        _context3.next = 9;
                        break;
                      }
                      e = _step6.value;
                      _context3.next = 7;
                      return e;
                    case 7:
                      _context3.next = 3;
                      break;
                    case 9:
                      _context3.next = 14;
                      break;
                    case 11:
                      _context3.prev = 11;
                      _context3.t0 = _context3.catch(1);
                      _iterator6.e(_context3.t0);
                    case 14:
                      _context3.prev = 14;
                      _iterator6.f();
                      return _context3.finish(14);
                    case 17:
                      _iterator7 = _createForOfIteratorHelper(this.oldCache);
                      _context3.prev = 18;
                      _iterator7.s();
                    case 20:
                      if ((_step7 = _iterator7.n()).done) {
                        _context3.next = 29;
                        break;
                      }
                      _e2 = _step7.value;
                      (_e3 = _slicedToArray(_e2, 1)), (n = _e3[0]);
                      _context3.t1 = this.cache.has(n);
                      if (_context3.t1) {
                        _context3.next = 27;
                        break;
                      }
                      _context3.next = 27;
                      return _e2;
                    case 27:
                      _context3.next = 20;
                      break;
                    case 29:
                      _context3.next = 34;
                      break;
                    case 31:
                      _context3.prev = 31;
                      _context3.t2 = _context3.catch(18);
                      _iterator7.e(_context3.t2);
                    case 34:
                      _context3.prev = 34;
                      _iterator7.f();
                      return _context3.finish(34);
                    case 37:
                    case "end":
                      return _context3.stop();
                  }
              },
              value,
              this,
              [
                [1, 11, 14, 17],
                [18, 31, 34, 37],
              ]
            );
          }),
        },
        {
          key: "size",
          get: function get() {
            var e = 0;
            var _iterator8 = _createForOfIteratorHelper(this.oldCache.keys()),
              _step8;
            try {
              for (_iterator8.s(); !(_step8 = _iterator8.n()).done; ) {
                var n = _step8.value;
                this.cache.has(n) || e++;
              }
            } catch (err) {
              _iterator8.e(err);
            } finally {
              _iterator8.f();
            }
            return Math.min(this._size + e, this.maxSize);
          },
        },
      ]);
      return M;
    })(Symbol.iterator);
    pe.exports = M;
  });
  var Ce = m(function (mt, _e) {
    var ge = ae(),
      Ve = Ee(),
      Ye = me(),
      Je = function Je(t, e) {
        return t.some(function (n) {
          return typeof n == "string"
            ? n === e
            : ((n.lastIndex = 0), n.test(e));
        });
      },
      U = new Ye({
        maxSize: 1e5,
      }),
      ve = function ve(t) {
        return (
          _typeof(t) == "object" &&
          t !== null &&
          !(t instanceof RegExp) &&
          !(t instanceof Error) &&
          !(t instanceof Date)
        );
      },
      Re = function Re(t, e) {
        if (!ve(t)) return t;
        e = _(
          {
            deep: !1,
            pascalCase: !1,
          },
          e
        );
        var _e4 = e,
          n = _e4.exclude,
          r = _e4.pascalCase,
          s = _e4.stopPaths,
          o = _e4.deep,
          i = new Set(s),
          a = function a(l) {
            return function (f, c) {
              if (o && ve(c)) {
                var E = l === void 0 ? f : "".concat(l, ".").concat(f);
                i.has(E) || (c = ge(c, a(E)));
              }
              if (!(n && Je(n, f))) {
                var _E = r ? "".concat(f, "_") : f;
                if (U.has(_E)) f = U.get(_E);
                else {
                  var w = Ve(f, {
                    pascalCase: r,
                    locale: !1,
                  });
                  f.length < 100 && U.set(_E, w), (f = w);
                }
              }
              return [f, c];
            };
          };
        return ge(t, a(void 0));
      };
    _e.exports = function (t, e) {
      return Array.isArray(t)
        ? Object.keys(t).map(function (n) {
            return Re(t[n], e);
          })
        : Re(t, e);
    };
  });
  var ye = m(function (A) {
    Object.defineProperty(A, "__esModule", {
      value: !0,
    });
    A.makeId = void 0;
    var Xe = function Xe() {
      return "".concat(Date.now()).concat(Math.floor(Math.random() * 1e4));
    };
    A.makeId = Xe;
  });
  var D = m(function (Q) {
    Object.defineProperty(Q, "__esModule", {
      value: !0,
    });
    Q.getCurrentEnvironment = void 0;
    function Ze() {
      var t, e, n;
      if (typeof window == "undefined")
        throw new Error(
          "KarrotBridge\uB294 Node.js \uD658\uACBD\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC544\uC694. \uD639\uC2DC SSR (Universal Rendering) \uD658\uACBD\uC774\uC2DC\uB77C\uBA74, KarrotBridge \uAC1D\uCCB4 \uC0DD\uC131\uC774 Node.js \uD658\uACBD\uC5D0\uC11C \uC774\uB8E8\uC5B4\uC9C0\uACE0\uC788\uB294\uC9C0 \uD655\uC778\uD574\uC8FC\uC138\uC694."
        );
      return window.AndroidFunction
        ? "Android"
        : !(
            (n =
              (e =
                (t = window.webkit) === null || t === void 0
                  ? void 0
                  : t.messageHandlers) === null || e === void 0
                ? void 0
                : e.messageHandler) === null || n === void 0
          ) && n.postMessage
        ? "Cupertino"
        : "Web";
    }
    Q.getCurrentEnvironment = Ze;
  });
  var Oe = m(function (v) {
    var G =
        (v && v.__awaiter) ||
        function (t, e, n, r) {
          function s(o) {
            return o instanceof n
              ? o
              : new n(function (i) {
                  i(o);
                });
          }
          return new (n || (n = Promise))(function (o, i) {
            function a(c) {
              try {
                f(r.next(c));
              } catch (E) {
                i(E);
              }
            }
            function l(c) {
              try {
                f(r.throw(c));
              } catch (E) {
                i(E);
              }
            }
            function f(c) {
              c.done ? o(c.value) : s(c.value).then(a, l);
            }
            f((r = r.apply(t, e || [])).next());
          });
        },
      be =
        (v && v.__importDefault) ||
        function (t) {
          return t && t.__esModule
            ? t
            : {
                default: t,
              };
        };
    Object.defineProperty(v, "__esModule", {
      value: !0,
    });
    v.installKarrotBridgeDriver = void 0;
    var et = be(re()),
      we = be(Ce()),
      Le = ye(),
      j = D();
    function tt() {
      var _this = this;
      var t = [],
        e = new et.default.EventEmitter(),
        n = null,
        r = function r(h) {
          var d, p;
          switch ((0, j.getCurrentEnvironment)()) {
            case "Android":
              (d = window.AndroidFunction) === null ||
                d === void 0 ||
                d.messageHandler(JSON.stringify(h));
              break;
            case "Cupertino":
              (p = window.webkit) === null ||
                p === void 0 ||
                p.messageHandlers.messageHandler.postMessage(JSON.stringify(h));
              break;
            case "Web":
              console.warn(
                "KarrotBridge\uC758 \uD1B5\uC2E0 \uB4DC\uB77C\uC774\uBC84\uB294 \uC77C\uBC18 \uB370\uC2A4\uD06C\uD0D1, \uBAA8\uBC14\uC77C \uBE0C\uB77C\uC6B0\uC800 \uD658\uACBD\uC744 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC544\uC694. \uD604\uC7AC \uD658\uACBD\uC774 \uB2F9\uADFC\uB9C8\uCF13 WebView \uD658\uACBD\uC778\uC9C0 \uD655\uC778\uD574\uC8FC\uC138\uC694."
              );
              break;
          }
        },
        s = function s(h) {
          return (
            t.push(h),
            function () {
              var p = t.findIndex(function (g) {
                return g === h;
              });
              t.splice(p, 1);
            }
          );
        },
        o = function o(h) {
          if (!h)
            return console.error(
              "\uBA54\uC2DC\uC9C0\uAC00 \uBE48 \uCC44\uB85C \uB3C4\uCC29\uD588\uC5B4\uC694"
            );
          t.map(function (d) {
            return d(h);
          });
        },
        i = function i(h, d) {
          var g = {
            id: (0, Le.makeId)(),
            type: h,
            payload: d,
          };
          return (
            r(g),
            new Promise(function (L, R) {
              var Ae = s(function (b) {
                b.id === g.id &&
                  (Ae(),
                  "error" in b
                    ? R(new Error(b.error))
                    : L(
                        (0, we.default)(b.payload, {
                          deep: !0,
                        })
                      ));
              });
            })
          );
        },
        a = function a(h, d, p) {
          var L = {
            id: (0, Le.makeId)(),
            type: h,
            payload: d,
          };
          return (
            r(L),
            s(function (R) {
              R.id === L.id &&
                ("error" in R
                  ? p(new Error(R.error), null)
                  : p(
                      null,
                      (0, we.default)(R.payload, {
                        deep: !0,
                      })
                    ));
            })
          );
        },
        l = function l(h, d) {
          var p;
          if (h) throw h;
          if (
            !(
              !((p = d == null ? void 0 : d.stream) === null || p === void 0) &&
              p.eventName
            )
          )
            throw new Error(
              "\uC774\uBCA4\uD2B8 \uC774\uB984\uC744 \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4"
            );
          var g = d.stream.eventName;
          d.stream.data
            ? e.emit(g, JSON.parse(d.stream.data))
            : e.emit(g, void 0);
        },
        f = function f() {
          return G(
            _this,
            void 0,
            void 0,
            /*#__PURE__*/ _regeneratorRuntime().mark(function _callee() {
              return _regeneratorRuntime().wrap(function _callee$(_context4) {
                while (1)
                  switch ((_context4.prev = _context4.next)) {
                    case 0:
                      _context4.t0 = (0, j.getCurrentEnvironment)();
                      _context4.next = _context4.t0 === "Cupertino" ? 3 : 4;
                      break;
                    case 3:
                      return _context4.abrupt(
                        "return",
                        rt({
                          onQueried: i,
                        })
                      );
                    case 4:
                      return _context4.abrupt("return", nt());
                    case 5:
                    case "end":
                      return _context4.stop();
                  }
              }, _callee);
            })
          );
        },
        c = function c(h, d) {
          n || (n = E.onSubscribed("REQ.STREAM.SUBSCRIBE", {}, l));
          var p = e.on(h, d);
          return function () {
            p.off(h, d);
          };
        },
        E = {
          getCurrentEnvironment: j.getCurrentEnvironment,
          postMessage: r,
          addMessageListener: s,
          onMessage: o,
          onQueried: i,
          onSubscribed: a,
          compat: {
            pickImages: f,
            subscribeStream: c,
          },
        };
      if (typeof window != "undefined") {
        if (window.native)
          throw new Error(
            "KarrotBridge\uC758 \uD1B5\uC2E0 \uB4DC\uB77C\uC774\uBC84\uAC00 \uC774\uBBF8 \uC124\uCE58\uB418\uC5B4 \uC788\uC5B4\uC694. \uAE30\uC874\uC5D0 \uC124\uCE58\uB41C \uB4DC\uB77C\uC774\uBC84\uB97C \uB36E\uC5B4\uC4F0\uBBC0\uB85C \uBE44\uC815\uC0C1\uC801\uC778 \uC791\uB3D9\uC774 \uC788\uC744 \uC218 \uC788\uC5B4\uC694. installKarrotBridgeDriver\uAC00 \uC5EC\uB7EC\uBC88 \uD638\uCD9C\uB418\uACE0 \uC788\uB294\uC9C0 \uD655\uC778\uD574\uC8FC\uC138\uC694. (<React.StrictMode />\uC758 \uC601\uD5A5\uC77C \uC218 \uC788\uC5B4\uC694.)"
          );
        window.native = E;
      }
      function w() {
        typeof window != "undefined" && delete window.native;
      }
      return {
        driver: E,
        uninstall: w,
      };
    }
    v.installKarrotBridgeDriver = tt;
    var nt = function nt() {
        return G(
          void 0,
          void 0,
          void 0,
          /*#__PURE__*/ _regeneratorRuntime().mark(function _callee2() {
            var t, e, n;
            return _regeneratorRuntime().wrap(function _callee2$(_context5) {
              while (1)
                switch ((_context5.prev = _context5.next)) {
                  case 0:
                    _context5.next = 2;
                    return new Promise(function (n) {
                      var r = document.createElement("input");
                      (r.type = "file"),
                        (r.multiple = !0),
                        (r.style.display = "none"),
                        (r.accept = "image/*"),
                        r.addEventListener("change", function () {
                          n(this.files);
                        }),
                        document.body.appendChild(r),
                        r.click();
                    });
                  case 2:
                    t = _context5.sent;
                    if (t) {
                      _context5.next = 5;
                      break;
                    }
                    return _context5.abrupt("return", []);
                  case 5:
                    e = [];
                    for (n = 0; n < t.length; n++) e.push(t[n]);
                    return _context5.abrupt("return", e);
                  case 8:
                  case "end":
                    return _context5.stop();
                }
            }, _callee2);
          })
        );
      },
      rt = function rt(_ref2) {
        var t = _ref2.onQueried;
        return G(
          void 0,
          void 0,
          void 0,
          /*#__PURE__*/ _regeneratorRuntime().mark(function _callee3() {
            var e, n, r, s, o;
            return _regeneratorRuntime().wrap(function _callee3$(_context6) {
              while (1)
                switch ((_context6.prev = _context6.next)) {
                  case 0:
                    _context6.next = 2;
                    return t("REQ.IMAGE.PICK", {});
                  case 2:
                    n = _context6.sent;
                    if (
                      !(
                        (e = n == null ? void 0 : n.image) === null ||
                        e === void 0
                      ) &&
                      e.images
                    ) {
                      _context6.next = 5;
                      break;
                    }
                    return _context6.abrupt("return", []);
                  case 5:
                    _context6.next = 7;
                    return Promise.all(
                      n.image.images
                        .map(function (i) {
                          return i.uri;
                        })
                        .map(function (i) {
                          var a = document.createElement("img");
                          return (a.src = i), (a.crossOrigin = "anonymous"), a;
                        })
                        .map(function (i) {
                          return new Promise(function (a) {
                            i.onload = function () {
                              a(i);
                            };
                          });
                        })
                    );
                  case 7:
                    r = _context6.sent;
                    s = r.map(function (i) {
                      var a = document.createElement("canvas"),
                        l = a.getContext("2d"),
                        f = i.naturalWidth,
                        c = i.naturalHeight;
                      return (
                        (a.width = f),
                        (a.height = c),
                        l == null || l.drawImage(i, 0, 0, f, c),
                        a
                      );
                    });
                    _context6.next = 11;
                    return Promise.all(
                      s.map(function (i) {
                        return new Promise(function (a) {
                          i.toBlob(function (l) {
                            a(l);
                          });
                        });
                      })
                    );
                  case 11:
                    o = _context6.sent;
                    return _context6.abrupt(
                      "return",
                      (r.forEach(function (i) {
                        i.remove();
                      }),
                      o.filter(function (i) {
                        return !!i;
                      }))
                    );
                  case 13:
                  case "end":
                    return _context6.stop();
                }
            }, _callee3);
          })
        );
      };
  });
  var Se = m(function (y) {
    Object.defineProperty(y, "__esModule", {
      value: !0,
    });
    y.installKarrotBridgeDriver = y.makeKarrotBridge = void 0;
    var it = W();
    Object.defineProperty(y, "makeKarrotBridge", {
      enumerable: !0,
      get: function get() {
        return it.makeKarrotBridge;
      },
    });
    var st = Oe();
    Object.defineProperty(y, "installKarrotBridgeDriver", {
      enumerable: !0,
      get: function get() {
        return st.installKarrotBridgeDriver;
      },
    });
  });
  var T = z(Se()),
    Ie = z(D()),
    _ref3 = (0, T.installKarrotBridgeDriver)(),
    ot = _ref3.driver,
    at = (0, T.makeKarrotBridge)({
      driver: ot,
    });
  window.__KARROT_BRIDGE__ = at;
  window.getCurrentEnvironment = Ie.getCurrentEnvironment;
})();

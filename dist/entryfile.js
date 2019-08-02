/**
 * @license
 * rikaaa-vimeo.js
 *
 * Generated : 2019-08-03
 * Version : 1.0.0
 * Author : rikaaa.org | Yuki Hata
 * Url : http://rikaaa.org
 *
 *
 * The MIT License (MIT)
 *
 * Copyright 2019 rikaaa.org | Yuki Hata
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function () {
  'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
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
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _construct(Parent, args, Class) {
    if (isNativeReflectConstruct()) {
      _construct = Reflect.construct;
    } else {
      _construct = function _construct(Parent, args, Class) {
        var a = [null];
        a.push.apply(a, args);
        var Constructor = Function.bind.apply(Parent, a);
        var instance = new Constructor();
        if (Class) _setPrototypeOf(instance, Class.prototype);
        return instance;
      };
    }

    return _construct.apply(null, arguments);
  }

  function _isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
  }

  function _wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;

    _wrapNativeSuper = function _wrapNativeSuper(Class) {
      if (Class === null || !_isNativeFunction(Class)) return Class;

      if (typeof Class !== "function") {
        throw new TypeError("Super expression must either be null or a function");
      }

      if (typeof _cache !== "undefined") {
        if (_cache.has(Class)) return _cache.get(Class);

        _cache.set(Class, Wrapper);
      }

      function Wrapper() {
        return _construct(Class, arguments, _getPrototypeOf(this).constructor);
      }

      Wrapper.prototype = Object.create(Class.prototype, {
        constructor: {
          value: Wrapper,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      return _setPrototypeOf(Wrapper, Class);
    };

    return _wrapNativeSuper(Class);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  var getJson = function getJson(url) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send();
    return new Promise(function (resolve, reject) {
      xhr.onload = function () {
        resolve(xhr.response);
      };

      xhr.onerror = function () {
        reject(xhr.statusText);
      };
    });
  };

  var getAspect = function getAspect(w, h) {
    return [w, h].reduce(function (a, c, i, array) {
      var result = {};

      var gcd = function gcd(w, h) {
        if (!h) return w;else return gcd(h, w % h);
      };

      if (i === 0) result.w = c / gcd(array[1], array[0]);
      if (i === 1) result.h = c / gcd(array[1], array[0]);
      return Object.assign(a, result);
    }, {});
  };

  var loadImage = function loadImage(urlOrPath) {
    return new Promise(function (resolve, reject) {
      var img = new Image();
      img.addEventListener('load', function (event) {
        return resolve(img);
      });
      img.src = urlOrPath;
    });
  };

  var loadIframe = function loadIframe(url, parent) {
    return new Promise(function (resolve, reject) {
      var iframe = document.createElement('iframe');
      iframe.setAttribute('webkitallowfullscreen', true);
      iframe.setAttribute('mozallowfullscreen', true);
      iframe.setAttribute('allowfullscreen', true);
      iframe.setAttribute('allow', 'autoplay');
      iframe.src = url;
      parent.appendChild(iframe);
      iframe.style.visibility = 'hidden';

      iframe.onload = function (event) {
        return resolve(iframe);
      };
    });
  };

  var constrain = (function (value, min, max) {
    return Math.max(min, Math.min(max, value));
  });

  // https: //www.sitepoint.com/community/t/javascript-array-polyfills/193601
  if (![].keys) {
    Array.prototype.keys = function () {
      var k,
          a = [],
          nextIndex = 0,
          ary = this;
      k = ary.length;

      while (k > 0) {
        a[--k] = k;
      }

      a.next = function () {
        return nextIndex < ary.length ? {
          value: nextIndex++,
          done: false
        } : {
          done: true
        };
      };

      return a;
    };
  }

  var packer = function packer(mapw, maph, roomminw, roomminh, roommaxw, roommaxh) {
    var cellx = Math.floor(mapw / roomminw);
    var celly = Math.floor(maph / roomminh);

    var field = _toConsumableArray(Array(cellx).keys()).map(function (x) {
      return _toConsumableArray(Array(celly).keys()).map(function (y) {
        return -1;
      });
    });

    var cellstepx = function cellstepx(roommaxw, roomminw) {
      return Math.ceil(roommaxw / roomminw * Math.random());
    };

    var cellstepy = function cellstepy(roommaxh, roomminh) {
      return Math.ceil(roommaxh / roomminh * Math.random());
    };

    var fillmap = function fillmap(field, x, y, cellstepx, cellstepy, id) {
      var check = 0,
          Threshold = cellstepx * cellstepy;
      if (cellstepx === 0 || cellstepy === 0) return false;

      _toConsumableArray(Array(cellstepx).keys()).forEach(function (distx) {
        _toConsumableArray(Array(cellstepy).keys()).forEach(function (disty) {
          try {
            var targetselval = field[x + distx][y + disty];
            if (targetselval === -1) check++;
          } catch (error) {}
        });
      });

      if (check === Threshold) {
        _toConsumableArray(Array(cellstepx).keys()).forEach(function (distx) {
          _toConsumableArray(Array(cellstepy).keys()).forEach(function (disty) {
            field[x + distx][y + disty] = id;
          });
        });

        field[x][y] = {
          x: x * roomminw,
          y: y * roomminh,
          w: roomminw * cellstepx,
          h: roomminh * cellstepy
        };
      }
    };

    var checkmap = function checkmap(_field) {
      var field = _toConsumableArray(_field);

      var flatten = field.reduce(function (a, c) {
        return a.concat(c);
      }, []);
      if (flatten.includes(-1)) return true;else return false;
    };

    var id = 0,
        rmw = roommaxw,
        rmh = roommaxh;

    do {
      for (var x = 0; x < field.length; x += 1) {
        var xfield = field[x];

        for (var y = 0; y < xfield.length; y += 1) {
          id++;
          fillmap(field, x, y, cellstepx(rmw, roomminw), cellstepy(rmh, roomminh), id);
        }
      }

      rmw = constrain(rmw = rmw / 5, 1, roommaxw);
      rmh = constrain(rmh = rmh / 5, 1, roommaxh);
    } while ((rmw !== 1 || rmh !== 1) && checkmap(field));

    var mapfratten = field.reduce(function (a, c) {
      return a.concat(c);
    }, []);
    var result = mapfratten.filter(function (v) {
      return _typeof(v) === 'object';
    });
    return result;
  };

  var loadingIcon =
  /*#__PURE__*/
  function () {
    function loadingIcon(parentNode) {
      _classCallCheck(this, loadingIcon);

      this._parentNode;
      this._ctx;
      this._req;
      this._resolution = 2;
      this._loadAnimation = false;
      var canvas = document.createElement('canvas');
      this._parentNode = parentNode;
      this._ctx = canvas.getContext('2d');

      this._parentNode.appendChild(canvas);

      loadingIcon.draw(this, canvas, this._parentNode, this._ctx);
    }

    _createClass(loadingIcon, [{
      key: "stop",
      value: function stop() {
        cancelAnimationFrame(this._req);
      }
    }, {
      key: "startLoadAnimation",
      value: function startLoadAnimation() {
        this._loadAnimation = true;
      }
    }], [{
      key: "draw",
      value: function draw(that, canvas, container, ctx) {
        var parentBound = container.getBoundingClientRect();
        var rects = packer(parentBound.width * 2, parentBound.height * 2 + 10, 2, 10, 11, 70);

        var draw = function draw() {
          that._req = requestAnimationFrame(draw);
          parentBound = container.getBoundingClientRect();
          var width = parentBound.width;
          var height = parentBound.height;
          loadingIcon.resolution(canvas, ctx, width, height, that._resolution);
          ctx.save();
          ctx.fillStyle = '#ffffff';
          rects.forEach(function (rect) {
            if (that._loadAnimation) ctx.globalAlpha = Math.random();
            ctx.fillRect(rect.x, rect.y, rect.w - 1, rect.h - 1);
          });
          ctx.restore();
        };

        requestAnimationFrame(draw);
      } // static drawRoundPoly(ctx, x, y, radius, vertexLength, roundRadius) {
      //     const getRoundVertexPos = (x, y, radius, degree) => {
      //         const xPos = x + radius * Math.cos(degree * (Math.PI / 180));
      //         const yPos = y + radius * Math.sin(degree * (Math.PI / 180));
      //         return [xPos, yPos];
      //     }
      //     const r = radius - roundRadius;
      //     let polyVertexes = [];
      //     let rounds = [];
      //     [...Array(vertexLength).keys()].forEach(i => {
      //         const degree = 360 * i / vertexLength;
      //         const point = getRoundVertexPos(x, y, r, degree);
      //         const e = 180 - 90 - (180 * (vertexLength - 2) / vertexLength / 2);
      //         const degree1 = degree - Math.abs(e) / (vertexLength - 2);
      //         const degree2 = degree + Math.abs(e) / (vertexLength - 2);
      //         const start = getRoundVertexPos(point[0], point[1], roundRadius, degree1);
      //         const end = getRoundVertexPos(point[0], point[1], roundRadius, degree2);
      //         polyVertexes.push([start, end]);
      //         rounds.push({
      //             pos: point,
      //             arcStart: degree1,
      //             arcEnd: degree2,
      //             radius: roundRadius,
      //         });
      //     });
      //     ctx.beginPath();
      //     polyVertexes.forEach((line, index) => {
      //         const next = ((index + 1) === polyVertexes.length) ? 0 : index + 1;
      //         const start = line[1];
      //         const end = polyVertexes[next][0];
      //         if(index === 0) ctx.moveTo(start[0], start[1]);
      //         ctx.lineTo(end[0], end[1]);
      //         const round = rounds[next];
      //         const pos = round.pos;
      //         const roundStart = round.arcStart * Math.PI / 180;
      //         const roundEnd = round.arcEnd * Math.PI / 180;
      //         ctx.arc(pos[0], pos[1], round.radius, roundStart, roundEnd);
      //     });
      //     ctx.closePath();
      // }
      // static drawRect(ctx, x, y, w, h, r) {
      //     ctx.beginPath();
      //     ctx.moveTo(x + r, y);
      //     ctx.lineTo(x + w - r, y);
      //     ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, 0, false);
      //     ctx.lineTo(x + w, y + h - r);
      //     ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5, false);
      //     ctx.lineTo(x + r, y + h);
      //     ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI, false);
      //     ctx.lineTo(x, y + r);
      //     ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5, false);
      //     ctx.closePath();
      // }

    }, {
      key: "resolution",
      value: function resolution(canvas, ctx, canvasWidth, canvasHeight, _resolution) {
        canvas.width = canvasWidth * _resolution;
        canvas.height = canvasHeight * _resolution;
        ctx.scale(_resolution, _resolution);
        canvas.style.width = "".concat(canvasWidth, "px");
        canvas.style.height = "".concat(canvasHeight, "px");
      }
    }]);

    return loadingIcon;
  }();

  /**
   * @license
   * rikaaa-IntersectionWatcher.js
   *
   * Generated : 2019-07-19
   * Version : 0.5.0
   * Author : rikaaa.org | Yuki Hata
   * Url : http://rikaaa.org
   *
   *
   * The MIT License (MIT)
   *
   * Copyright 2019 rikaaa.org | Yuki Hata
   *
   * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
   */
  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function unwrapExports(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var isIntersecting_1 = createCommonjsModule(function (module, exports) {
    // import map from './map';
    // import constrain from './constrain';
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var isIntersecting =
    /** @class */
    function () {
      function isIntersecting() {}

      isIntersecting.is = function (target, root, rootMargin) {
        if (rootMargin === void 0) {
          rootMargin = '0px';
        }

        var parentTree = isIntersecting.computeParentNode(root, target);
        if (parentTree === false) return false;
        var rectList = isIntersecting.computeCheckTargetRectList(root, parentTree, rootMargin);
        var targetRect = isIntersecting.getBoundingClientRect(target);
        var counter = 0;

        while (counter !== rectList.length) {
          var contanerRect = rectList[counter];

          if (contanerRect.width <= 0 || contanerRect.height <= 0) {
            return false;
          }

          if (contanerRect.bottom <= targetRect.top || contanerRect.top >= targetRect.bottom) {
            return false;
          }

          counter++;
        }

        return true;
      };

      isIntersecting.computeParentNode = function (root, target) {
        var rootNode = root ? root : document.documentElement;
        var tree = [];
        var html = document.documentElement;
        var parent = target;

        while (parent !== html) {
          parent = isIntersecting.getParentNode(parent);
          tree.push(parent);
        }

        if (!tree.includes(rootNode)) return false;
        return tree.splice(0, tree.indexOf(rootNode) + 1);
      };

      isIntersecting.computeCheckTargetRectList = function (root, parentTree, rootMargin) {
        var rootNode = root ? root : document.documentElement;
        var resultList = parentTree.map(function (parentNode) {
          if (parentNode !== rootNode) {
            return isIntersecting.getBoundingClientRect(parentNode);
          } else {
            return isIntersecting.getRootRect(parentNode, rootMargin);
          }
        });
        return resultList;
      };

      isIntersecting.getRootRect = function (rootNode, rootMargin) {
        var rect = null;
        var html = document.documentElement;

        if (rootNode !== html) {
          rect = isIntersecting.getBoundingClientRect(rootNode);
        } else {
          rect = {
            top: 0,
            bottom: html.clientHeight,
            right: html.clientWidth,
            left: 0,
            width: html.clientWidth,
            height: html.clientHeight
          };
        }

        return isIntersecting.applyRootMargin(rect, rootMargin);
      };

      isIntersecting.applyRootMargin = function (rect, rootMargin) {
        var margin = isIntersecting.parseRootMargin(rootMargin);
        var rectWidth = rect.width;
        var rectHeight = rect.height;
        var marginTop = margin.top[1] === 'px' ? margin.top[0] : rectHeight * margin.top[0] / 100;
        var marginBottom = margin.bottom[1] === 'px' ? margin.bottom[0] : rectHeight * margin.bottom[0] / 100;
        var marginRight = margin.right[1] === 'px' ? margin.right[0] : rectWidth * margin.right[0] / 100;
        var marginLeft = margin.left[1] === 'px' ? margin.left[0] : rectWidth * margin.left[0] / 100;
        var applyedRect = {
          top: rect.top - marginTop,
          bottom: rect.bottom + marginBottom,
          right: rect.right + marginRight,
          left: rect.left - marginLeft,
          width: 0,
          height: 0
        };
        applyedRect.width = applyedRect.right - applyedRect.left;
        applyedRect.height = applyedRect.bottom - applyedRect.top;
        return applyedRect;
      };

      isIntersecting.parseRootMargin = function (rootMargin) {
        var rootMarginArray = rootMargin.split(' ');

        var parser = function parser(rootMarginString) {
          return [parseFloat(rootMarginString), rootMarginString.match(/(px|%)/)[0]];
        };

        var result = {
          top: null,
          bottom: null,
          right: null,
          left: null
        };

        switch (rootMarginArray.length) {
          case 1:
            result.top = parser(rootMarginArray[0]);
            result.bottom = parser(rootMarginArray[0]);
            result.right = parser(rootMarginArray[0]);
            result.left = parser(rootMarginArray[0]);
            break;

          case 2:
            result.top = parser(rootMarginArray[0]);
            result.bottom = parser(rootMarginArray[0]);
            result.right = parser(rootMarginArray[1]);
            result.left = parser(rootMarginArray[1]);
            break;

          case 4:
            result.top = parser(rootMarginArray[0]);
            result.bottom = parser(rootMarginArray[2]);
            result.right = parser(rootMarginArray[1]);
            result.left = parser(rootMarginArray[3]);
            break;
        }

        return result;
      };

      isIntersecting.getParentNode = function (target) {
        var parent = target.parentNode;
        if (parent && parent.nodeType == 11 && parent.host) return parent.host;
        if (parent && parent.assignedSlot) return parent.assignedSlot.parentNode;
        return parent;
      };

      isIntersecting.getBoundingClientRect = function (target) {
        var empty = {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: 0,
          height: 0
        };
        var rect = null;

        try {
          return rect = target.getBoundingClientRect();
        } catch (error) {}

        if (rect === null) return empty;
      };

      return isIntersecting;
    }();

    exports.default = isIntersecting;
  });
  unwrapExports(isIntersecting_1);
  var IsDisplay = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (target) {
      var result = false;
      var style = target.currentStyle || getComputedStyle(target, '');
      result = style.display === 'none' ? false : true;
      return result;
    };
  });
  unwrapExports(IsDisplay);
  var onbang = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (func) {
      var _func,
          allow = true;

      return function () {
        var arg = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          arg[_i] = arguments[_i];
        }

        if (!allow) {
          func = null;
          return false;
        }

        _func = func.apply(this, arg);
        allow = false;
        return _func;
      };
    };
  });
  unwrapExports(onbang);
  var debounce = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (func, interval) {
      var timer = null;
      return function () {
        var arg = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          arg[_i] = arguments[_i];
        }

        clearTimeout(timer);
        timer = setTimeout(function () {
          return func.apply(this, arg);
        }, interval);
      };
    };
  });
  unwrapExports(debounce);
  var throttle = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (func, interval) {
      var req = null;
      var startTime = null;
      var firstFunc = onbang.default(func);
      var lastFunc = debounce.default(func, interval);
      var clearFirstFunc = debounce.default(function () {
        firstFunc = onbang.default(func);
        startTime = null;
        cancelAnimationFrame(req);
      }, interval);
      return function () {
        var _this = this;

        var arg = [];

        for (var _i = 0; _i < arguments.length; _i++) {
          arg[_i] = arguments[_i];
        }

        firstFunc.apply(this, arg);
        req = requestAnimationFrame(function (timestamp) {
          if (startTime === null) startTime = timestamp;
          var elapsedTime = timestamp - startTime;

          if (elapsedTime >= interval) {
            startTime = null;
            cancelAnimationFrame(req);
            return func.apply(_this, arg);
          }
        });
        clearFirstFunc();
        return lastFunc.apply(this, arg);
      };
    };
  });
  unwrapExports(throttle);
  var valueObserver = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    exports.default = function (firstVal, func, option) {
      if (option === void 0) {
        option = {
          observValKeyName: 'watch'
        };
      }

      var _func,
          _firstval = firstVal,
          _watchKeyName = option.observValKeyName;

      return function (_a) {
        _a = {};
        var originalArgument = [],
            watchVal = null;

        for (var i = 0; i < arguments.length; i++) {
          if (!arguments[i] || !(arguments[i].constructor == Object)) {
            originalArgument.push(arguments[i]);
          } else {
            watchVal = arguments[i][_watchKeyName];
            delete arguments[i][_watchKeyName];

            if (Object.keys(arguments[i]).length > 0) {
              originalArgument.push(arguments[i]);
            }
          }
        }

        if (_firstval === watchVal) {
          return false;
        }

        _firstval = watchVal;
        _func = func.apply(this, originalArgument);
        return _func;
      };
    };
  });
  unwrapExports(valueObserver);

  if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
      value: function value(searchElement, fromIndex) {
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        } // 1. Let O be ? ToObject(this value).


        var o = Object(this); // 2. Let len be ? ToLength(? Get(O, "length")).

        var len = o.length >>> 0; // 3. If len is 0, return false.

        if (len === 0) {
          return false;
        } // 4. Let n be ? ToInteger(fromIndex).
        //    (If fromIndex is undefined, this step produces the value 0.)


        var n = fromIndex | 0; // 5. If n ≥ 0, then
        //  a. Let k be n.
        // 6. Else n < 0,
        //  a. Let k be len + n.
        //  b. If k < 0, let k be 0.

        var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

        function sameValueZero(x, y) {
          return x === y || typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y);
        } // 7. Repeat, while k < len


        while (k < len) {
          // a. Let elementK be the result of ? Get(O, ! ToString(k)).
          // b. If SameValueZero(searchElement, elementK) is true, return true.
          if (sameValueZero(o[k], searchElement)) {
            return true;
          } // c. Increase k by 1. 


          k++;
        } // 8. Return false


        return false;
      }
    });
  }

  var Controller_1 = createCommonjsModule(function (module, exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    var Controller =
    /** @class */
    function () {
      // public scrollbarbarThickness: Number | number = 0;
      function Controller() {
        this.instancesOfintersectionWatcher = [];
        this.targetsAll = [];
        this.scrollAreasOftargets = [];
        this.mutationObserverConfig = {
          childList: true,
          attributes: true,
          characterData: true,
          subtree: true
        };
        this.watcher_binded = throttle.default(Controller.watcher.bind(null, this), Controller.THROTTLE_INTERVAL);
        this.mo = new MutationObserver(this.watcher_binded); // this.scrollbarbarThickness = isIntersecting.getScrollbarThickness()

        this.firstCallback = debounce.default(onbang.default(function (entriesContaner) {
          entriesContaner.forEach(function (entries) {
            var callbackArg = entries.entries.map(function (entry) {
              var isDisplay = Controller.isDisplay(entry.target);
              if (isDisplay) return Object.freeze({
                target: entry.target,
                isIntersecting: entry.isIntersecting
              });
            }).filter(function (entry) {
              return typeof entry !== 'undefined';
            });
            if (callbackArg.length !== 0) entries.callback(callbackArg);
          });
        }), Controller.THROTTLE_INTERVAL);
      }

      Controller.prototype.init = function (instance) {
        this.instancesOfintersectionWatcher.push(instance);
      };

      Controller.prototype.observe = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.scrollAreasOftargets = Controller.updateScrollAreasOftargets(this.targetsAll);
        if (this.targetsAll.length !== 0) Controller.onWather(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);
        this.firstCallback(this.entriesContaner);
      };

      Controller.prototype.unobserve = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);
      };

      Controller.prototype.disconnect = function () {
        this.targetsAll = Controller.updateTargetsAll(this);
        this.entriesContaner = Controller.calculateEntriesContaner(this.instancesOfintersectionWatcher);

        if (this.targetsAll.length === 0) {
          Controller.offWather(this);
          this.scrollAreasOftargets = [];
        }
      };

      Controller.watcher = function (instanse) {
        instanse.entriesContaner.forEach(function (entries) {
          var callbackArg = entries.entries.map(function (entry) {
            var option = entries.option;
            var isDisplay = Controller.isDisplay(entry.target);
            var currentIntersecting = Controller.isIntersecting(entry.target, option.root, option.rootMargin);
            var isIntersectionChenge = entry.valueObserver({
              watch: currentIntersecting
            });
            if (isIntersectionChenge) entry.isIntersecting = currentIntersecting;
            if (isDisplay && isIntersectionChenge) return Object.freeze({
              target: entry.target,
              isIntersecting: entry.isIntersecting
            });
          }).filter(function (entry) {
            return typeof entry !== 'undefined';
          });
          if (callbackArg.length !== 0) entries.callback(callbackArg);
        });
      };

      Controller.calculateEntriesContaner = function (instances) {
        return instances.map(function (instance) {
          var option = instance.option;
          var entries = instance.targets.map(function (target) {
            var isIntersecting = Controller.isIntersecting(target, option.root, option.rootMargin);
            return {
              target: target,
              isIntersecting: isIntersecting,
              valueObserver: valueObserver.default(isIntersecting, function () {
                return true;
              })
            };
          });
          instance.entries = entries;
          return instance;
        });
      };

      Controller.updateTargetsAll = function (instance) {
        return instance.instancesOfintersectionWatcher.map(function (instance) {
          return instance.targets;
        }).reduce(function (a, c) {
          return a.concat(c);
        }, []);
      };

      Controller.updateScrollAreasOftargets = function (targetsAll) {
        var computeParentNode = function computeParentNode(target) {
          var tree = [];
          var html = document.documentElement;
          var parent = target;

          while (parent !== html) {
            parent = isIntersecting_1.default.getParentNode(parent);
            tree.push(parent);
          }

          return tree;
        };

        var scrollAreas = targetsAll.map(function (target) {
          var parents = computeParentNode(target);
          return parents.filter(function (parent) {
            var style = getComputedStyle(parent, '');
            var isScroll = style.overflow === 'scroll' || style.overflow === 'auto' || style.overflowY === 'scroll' || style.overflowY === 'auto';
            if (isScroll) return true;
          });
        });
        return scrollAreas.reduce(function (a, c) {
          return a.concat(c);
        }, []);
      };

      Controller.onWather = function (instance) {
        var scrollPassive = {
          passive: true
        };
        window.addEventListener('resize', instance.watcher_binded, false);
        window.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        document.documentElement.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        document.body.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        instance.mo.observe(document.querySelector('html'), instance.mutationObserverConfig);
        instance.scrollAreasOftargets.forEach(function (target) {
          target.addEventListener('scroll', instance.watcher_binded, scrollPassive);
        });
      };

      Controller.offWather = function (instance) {
        window.removeEventListener('resize', instance.watcher_binded);
        window.removeEventListener('scroll', instance.watcher_binded);
        document.documentElement.removeEventListener('scroll', instance.watcher_binded);
        document.body.removeEventListener('scroll', instance.watcher_binded);
        instance.mo.disconnect();
        instance.scrollAreasOftargets.forEach(function (target) {
          target.removeEventListener('scroll', instance.watcher_binded);
        });
      };

      Controller.isIntersecting = function (target, root, rootMargin) {
        return isIntersecting_1.default.is(target, root, rootMargin);
      };

      Controller.isDisplay = function (target) {
        return IsDisplay.default(target);
      };

      Object.defineProperty(Controller, "THROTTLE_INTERVAL", {
        get: function get() {
          return 33;
        },
        enumerable: true,
        configurable: true
      });
      return Controller;
    }();

    exports.default = Controller;
  });
  unwrapExports(Controller_1);
  var rikaaaIntersectionWatcher_1 = createCommonjsModule(function (module, exports) {
    var __assign = commonjsGlobal && commonjsGlobal.__assign || function () {
      __assign = Object.assign || function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

      return __assign.apply(this, arguments);
    };

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var defaultOption = {
      rootMargin: '0px',
      root: null
    };
    var controller = new Controller_1.default();

    var rikaaaIntersectionWatcher =
    /** @class */
    function () {
      function rikaaaIntersectionWatcher(callback, option) {
        if (option === void 0) {
          option = {};
        }

        this.callback = callback;
        this.targets = [];
        this.entries = [];
        this.option = __assign({}, defaultOption, option);
        controller.init(this);
      }

      rikaaaIntersectionWatcher.prototype.observe = function (target) {
        var exist = this.targets.includes(target);
        if (!exist) this.targets.push(target);
        controller.observe();
      };

      rikaaaIntersectionWatcher.prototype.unobserve = function (target) {
        this.targets = this.targets.filter(function (existTarget) {
          return existTarget !== target;
        });
        controller.unobserve();
      };

      rikaaaIntersectionWatcher.prototype.disconnect = function () {
        this.targets = [];
        controller.disconnect();
      };

      rikaaaIntersectionWatcher.isIntersecting = function (target, root, rootMargin) {
        return Controller_1.default.isIntersecting(target, root, rootMargin);
      };

      rikaaaIntersectionWatcher.isDisplay = function (target) {
        return Controller_1.default.isDisplay(target);
      };

      Object.defineProperty(rikaaaIntersectionWatcher, "THROTTLE_INTERVAL", {
        get: function get() {
          return Controller_1.default.THROTTLE_INTERVAL;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(rikaaaIntersectionWatcher, "CONTROLLER", {
        get: function get() {
          return controller;
        },
        enumerable: true,
        configurable: true
      });
      return rikaaaIntersectionWatcher;
    }();

    exports.default = rikaaaIntersectionWatcher;
  });
  var rikaaaIntersectionWatcher = unwrapExports(rikaaaIntersectionWatcher_1);

  var onebang = (function (func) {
    var _func,
        allow = true;

    return function () {
      if (!allow) {
        func = null;
        return false;
      }

      _func = func.apply(this, arguments);
      allow = false;
      return _func;
    };
  });

  // https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/padStart
  if (!String.prototype.padStart) {
    String.prototype.padStart = function padStart(targetLength, padString) {
      targetLength = targetLength >> 0; //truncate if number or convert non-number to 0;

      padString = String(typeof padString !== 'undefined' ? padString : ' ');

      if (this.length >= targetLength) {
        return String(this);
      } else {
        targetLength = targetLength - this.length;

        if (targetLength > padString.length) {
          padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
        }

        return padString.slice(0, targetLength) + String(this);
      }
    };
  }

  var _css = ':host {  position: relative;  display: block;  width: 100%;  font-size: 100%;  line-height: 1.4; }  :host img, :host iframe {    vertical-align: bottom; }  :host iframe {    border: none; }  :host button {    background-color: transparent;    border: none;    cursor: pointer;    outline: none;    padding: 0;    -webkit-appearance: none;       -moz-appearance: none;            appearance: none; }  :host .container-wrap {    position: relative;    width: 100%;    cursor: pointer; }    :host .container-wrap .placeholder {      pointer-events: none; }    :host .container-wrap .container {      position: absolute;      top: 0;      left: 0;      bottom: 0;      right: 0; }      :host .container-wrap .container img, :host .container-wrap .container iframe, :host .container-wrap .container .loading-icon {        position: absolute;        width: 100%;        height: 100%;        top: 0;        left: 0; }      :host .container-wrap .container img {        z-index: 2; }      :host .container-wrap .container iframe {        z-index: 1; }      :host .container-wrap .container .loading-icon {        width: 5%;        height: auto;        z-index: 3;        right: 0;        left: auto;        visibility: hidden;        max-width: 40px;        min-width: 30px;        top: 10px;        right: 10px; }        :host .container-wrap .container .loading-icon:hover {          opacity: 0.5; }        :host .container-wrap .container .loading-icon .placeholder {          padding-top: 100%; }      :host .container-wrap .container .description {        display: none;        position: absolute;        right: 0;        bottom: 0;        width: auto;        color: white;        z-index: 3;        margin: 0;        text-align: right;        background: rgba(0, 0, 0, 0.4);        padding: 1px 10px 0 10px;        border: 1px solid white;        border-radius: 5px;        bottom: 5px;        right: 5px;        font-size: 0.875rem; }';

  var _style = "<style>".concat(_css, "</style>");

  var _shadowdomHTML = "\n    ".concat(_style, "\n    <div class=\"container-wrap\">\n    <div class=\"placeholder\"v></div>\n    <div class=\"container main-container\">\n        <p class=\"description\"></p>\n        <div class=\"loading-icon\">\n            <div class=\"container-wrap\">\n                <div class=\"placeholder\"></div>\n                <div class=\"container\"></div>\n            </div>\n        </div>\n    </div>\n    </div>\n");

  var template = document.createElement('template');
  template.id = 'rikaaavimeo';
  template.innerHTML = _shadowdomHTML;
  if (window.ShadyCSS) ShadyCSS.prepareTemplate(template, 'rikaaa-vimeo');

  var rikaaavimeo =
  /*#__PURE__*/
  function (_HTMLElement) {
    _inherits(rikaaavimeo, _HTMLElement);

    function rikaaavimeo() {
      var _this;

      _classCallCheck(this, rikaaavimeo);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(rikaaavimeo).call(this));
      if (window.ShadyCSS) ShadyCSS.styleElement(_assertThisInitialized(_this));

      _this.attachShadow({
        mode: 'open'
      });

      _this.shadowRoot.appendChild(template.content.cloneNode(true));

      if (!window.IntersectionObserver && !window.WcRikaaaIntersectionObserver) {
        Object.defineProperty(window, 'WcRikaaaIntersectionObserver', {
          value: rikaaaIntersectionWatcher
        });
      }

      _this._vimeoId;
      _this._size;
      _this._loadtimeing = '200px 0px 200px 0px';
      _this._query = '?autoplay=1&title=0&byline=0&portrait=0';
      _this._dizolveDuration = 100;
      _this._loadVimeo;
      _this._thumnailClickFun;
      _this._intersectionobserver = window.IntersectionObserver || window.WcRikaaaIntersectionObserver;
      return _this;
    }

    _createClass(rikaaavimeo, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        if (this._size) {
          rikaaavimeo.setAreaSize(this, this._size);
        }

        if (this._vimeoId && !this._loadVimeo) {
          rikaaavimeo.prepareLoad(this, {
            rootMargin: this._loadtimeing
          });
        }

        this.dispatchEvent(new CustomEvent('load'));
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldval, newval) {
        if (attr === 'vimeoid') this._vimeoId = newval;
        if (attr === 'size') this._size = newval.split('x');
        if (attr === 'loadtiming') this._loadtimeing = newval;
        if (attr === 'query') this._query = newval;
      }
    }, {
      key: "disconnectedCallback",
      value: function disconnectedCallback() {
        this._loadVimeo.unobserve(this);

        this._loadVimeo.disconnect();

        if (this._thumnailClickFun) this.shadowRoot.querySelector('.container-wrap').removeEventListener('click', this._thumnailClickFun);
        if (this._whenPlay) window.removeEventListener('message', this._whenPlay);
      }
    }, {
      key: "init",
      value: function init(id) {
        var _this2 = this;

        this._loadVimeo.unobserve(this);

        this._loadVimeo.disconnect();

        var descriptionNode = this.shadowRoot.querySelector('.description');
        rikaaavimeo.getVimeoJson(id).then(function (json) {
          var data = json[0];
          var thumnailId = rikaaavimeo.parserThumbnailId(data.thumbnail_large);
          var thumnailUrl = rikaaavimeo.parserThumnailUrl(thumnailId, data.width);
          var iframeUrl = rikaaavimeo.parserVimeoIframeUrl(id, _this2._query);
          var durationStr = rikaaavimeo.parseDuration(data.duration);
          descriptionNode.innerHTML = durationStr;
          descriptionNode.style.display = 'block';
          loadImage(thumnailUrl).then(function (imgNode) {
            rikaaavimeo.setAreaSize(_this2, [data.width, data.height]);
            rikaaavimeo.setVimeoThumbnail(_this2, imgNode);
            _this2._thumnailClickFun = rikaaavimeo.setVimeoIframe.bind(null, _this2, iframeUrl);
            if (!_this2._loadingIcon) _this2._loadingIcon = new loadingIcon(_this2.shadowRoot.querySelector('.loading-icon .container'));

            _this2.shadowRoot.querySelector('.container-wrap').addEventListener('click', _this2._thumnailClickFun, false);

            _this2.dispatchEvent(new CustomEvent('loadThumnail', {
              detail: {
                data: data
              }
            }));
          });
        });
      }
    }, {
      key: "setRoot",
      value: function setRoot(node) {
        rikaaavimeo.prepareLoad(this, {
          rootMargin: this._loadtimeing,
          root: node
        });
      }
    }], [{
      key: "setAreaSize",
      value: function setAreaSize(host, sizeArray) {
        var placeholderNode = host.shadowRoot.querySelector('.placeholder');
        var aspect = getAspect(sizeArray[0], sizeArray[1]);
        var paddingTop = aspect.h / aspect.w * 100;
        placeholderNode.style.paddingTop = "".concat(paddingTop, "%");
      }
    }, {
      key: "setVimeoThumbnail",
      value: function setVimeoThumbnail(host, imgNode) {
        var parentNode = host.shadowRoot.querySelector('.container');
        imgNode.style.width = '100%';
        imgNode.classList.add('thumbnail-img');
        parentNode.appendChild(imgNode);
      }
    }, {
      key: "setVimeoIframe",
      value: function setVimeoIframe(host, url) {
        var parentNode = host.shadowRoot.querySelector('.container');
        var loadingIcon = host._loadingIcon;
        var disolveDuration = host._dizolveDuration;
        var thumbnail = host.shadowRoot.querySelector('.thumbnail-img');
        var loadingIconNode = host.shadowRoot.querySelector('.loading-icon');
        var descriptionNode = host.shadowRoot.querySelector('.description');
        loadingIconNode.style.visibility = 'visible';
        loadingIcon.startLoadAnimation();
        host.shadowRoot.querySelector('.container-wrap').removeEventListener('click', host._thumnailClickFun);
        loadIframe(url, parentNode).then(function (iframeNode) {
          var isAutoplay = rikaaavimeo.isAutoplay(url);
          var transitionStyle = "all ".concat(disolveDuration, "ms ease-in");
          iframeNode.style.transition = transitionStyle;
          thumbnail.style.transition = transitionStyle;
          loadingIconNode.style.transition = transitionStyle;
          descriptionNode.style.transition = transitionStyle;

          if (isAutoplay) {
            var contentWindow = iframeNode.contentWindow;
            iframeNode.style.visibility = '';
            iframeNode.style.opacity = '0';
            contentWindow.postMessage(JSON.stringify({
              method: 'pause'
            }), url);
            contentWindow.postMessage(JSON.stringify({
              method: 'play'
            }), url);

            host._whenPlay = function (event) {
              if (JSON.parse(event.data).method === 'play') {
                loadingIcon.stop();
                iframeNode.style.opacity = '1';
                thumbnail.style.opacity = '0';
                thumbnail.style.visibility = 'hidden';
                loadingIconNode.style.opacity = '0';
                loadingIconNode.style.visibility = 'hidden';
                descriptionNode.style.opacity = '0';
                descriptionNode.style.visibility = 'hidden';
                contentWindow.postMessage(JSON.stringify({
                  method: 'play'
                }), url);
                contentWindow.postMessage(JSON.stringify({
                  method: 'play'
                }), url);
                window.removeEventListener('message', host._whenPlay);
                host.dispatchEvent(new CustomEvent('loadIframe'));
              }
            };

            window.addEventListener('message', host._whenPlay);
          } else {
            loadingIcon.stop();
            iframeNode.style.visibility = '';
            iframeNode.style.opacity = '1';
            thumbnail.style.opacity = '0';
            thumbnail.style.visibility = 'hidden';
            loadingIconNode.style.opacity = '0';
            loadingIconNode.style.visibility = 'hidden';
            descriptionNode.style.opacity = '0';
            descriptionNode.style.visibility = 'hidden';
            host.dispatchEvent(new CustomEvent('loadIframe'));
          }
        });
      }
    }, {
      key: "parseDuration",
      value: function parseDuration(sec) {
        var parser = function parser(time) {
          return time.toString().padStart(2, '0');
        };

        var second = sec;
        var hour = parseInt(second / 3600);
        second = second % 3600;
        var minutes = parseInt(second / 60);
        second = second % 60;
        return "".concat(parser(hour), ":").concat(parser(minutes), ":").concat(parser(second));
      }
    }, {
      key: "prepareLoad",
      value: function prepareLoad(host, option) {
        if (host._loadVimeo) {
          host._loadVimeo.unobserve(host);

          host._loadVimeo.disconnect();
        }

        var _option = option || {};

        var oneInit = onebang(host.init.bind(host));

        var callback = function callback(entries) {
          if (entries[0].isIntersecting) oneInit(host._vimeoId);
        };

        host._loadVimeo = new host._intersectionobserver(callback, _option);

        host._loadVimeo.observe(host);
      }
    }, {
      key: "getVimeoJson",
      value: function getVimeoJson(id) {
        return getJson("https://vimeo.com/api/v2/video/".concat(id, ".json")).then(function (json) {
          return JSON.parse(json);
        });
      }
    }, {
      key: "parserVimeoIframeUrl",
      value: function parserVimeoIframeUrl(id, queryStr) {
        if (queryStr) {
          return "https://player.vimeo.com/video/".concat(id).concat(queryStr);
        } else {
          return "https://player.vimeo.com/video/".concat(id);
        }
      }
    }, {
      key: "parserThumnailUrl",
      value: function parserThumnailUrl(id, width) {
        return "https://i.vimeocdn.com/video/".concat(id, "_").concat(width, ".jpg");
      }
    }, {
      key: "isAutoplay",
      value: function isAutoplay(url) {
        return Number(url.match(/autoplay=\d/)[0].replace('autoplay=', '')) === 1 ? true : false;
      }
    }, {
      key: "parserThumbnailId",
      value: function parserThumbnailId(thumbnailUrl) {
        return Number(thumbnailUrl.match(/\/\d+_/)[0].replace('\/', '').replace('_', ''));
      }
    }, {
      key: "observedAttributes",
      get: function get() {
        return ['vimeoid', 'loadtiming', 'size', 'query'];
      }
    }]);

    return rikaaavimeo;
  }(_wrapNativeSuper(HTMLElement));

  customElements.define('rikaaa-vimeo', rikaaavimeo);

}());

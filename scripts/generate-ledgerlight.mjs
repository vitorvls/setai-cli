import { createRequire } from 'module'; const require = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// node_modules/.pnpm/universalify@2.0.1/node_modules/universalify/index.js
var require_universalify = __commonJS({
  "node_modules/.pnpm/universalify@2.0.1/node_modules/universalify/index.js"(exports) {
    "use strict";
    exports.fromCallback = function(fn) {
      return Object.defineProperty(function(...args) {
        if (typeof args[args.length - 1] === "function") fn.apply(this, args);
        else {
          return new Promise((resolve, reject) => {
            args.push((err, res) => err != null ? reject(err) : resolve(res));
            fn.apply(this, args);
          });
        }
      }, "name", { value: fn.name });
    };
    exports.fromPromise = function(fn) {
      return Object.defineProperty(function(...args) {
        const cb = args[args.length - 1];
        if (typeof cb !== "function") return fn.apply(this, args);
        else {
          args.pop();
          fn.apply(this, args).then((r) => cb(null, r), cb);
        }
      }, "name", { value: fn.name });
    };
  }
});

// node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/polyfills.js
var require_polyfills = __commonJS({
  "node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/polyfills.js"(exports, module) {
    var constants = __require("constants");
    var origCwd = process.cwd;
    var cwd = null;
    var platform = process.env.GRACEFUL_FS_PLATFORM || process.platform;
    process.cwd = function() {
      if (!cwd)
        cwd = origCwd.call(process);
      return cwd;
    };
    try {
      process.cwd();
    } catch (er) {
    }
    if (typeof process.chdir === "function") {
      chdir = process.chdir;
      process.chdir = function(d) {
        cwd = null;
        chdir.call(process, d);
      };
      if (Object.setPrototypeOf) Object.setPrototypeOf(process.chdir, chdir);
    }
    var chdir;
    module.exports = patch;
    function patch(fs) {
      if (constants.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./)) {
        patchLchmod(fs);
      }
      if (!fs.lutimes) {
        patchLutimes(fs);
      }
      fs.chown = chownFix(fs.chown);
      fs.fchown = chownFix(fs.fchown);
      fs.lchown = chownFix(fs.lchown);
      fs.chmod = chmodFix(fs.chmod);
      fs.fchmod = chmodFix(fs.fchmod);
      fs.lchmod = chmodFix(fs.lchmod);
      fs.chownSync = chownFixSync(fs.chownSync);
      fs.fchownSync = chownFixSync(fs.fchownSync);
      fs.lchownSync = chownFixSync(fs.lchownSync);
      fs.chmodSync = chmodFixSync(fs.chmodSync);
      fs.fchmodSync = chmodFixSync(fs.fchmodSync);
      fs.lchmodSync = chmodFixSync(fs.lchmodSync);
      fs.stat = statFix(fs.stat);
      fs.fstat = statFix(fs.fstat);
      fs.lstat = statFix(fs.lstat);
      fs.statSync = statFixSync(fs.statSync);
      fs.fstatSync = statFixSync(fs.fstatSync);
      fs.lstatSync = statFixSync(fs.lstatSync);
      if (fs.chmod && !fs.lchmod) {
        fs.lchmod = function(path, mode, cb) {
          if (cb) process.nextTick(cb);
        };
        fs.lchmodSync = function() {
        };
      }
      if (fs.chown && !fs.lchown) {
        fs.lchown = function(path, uid, gid, cb) {
          if (cb) process.nextTick(cb);
        };
        fs.lchownSync = function() {
        };
      }
      if (platform === "win32") {
        fs.rename = typeof fs.rename !== "function" ? fs.rename : function(fs$rename) {
          function rename(from, to, cb) {
            var start = Date.now();
            var backoff = 0;
            fs$rename(from, to, function CB(er) {
              if (er && (er.code === "EACCES" || er.code === "EPERM" || er.code === "EBUSY") && Date.now() - start < 6e4) {
                setTimeout(function() {
                  fs.stat(to, function(stater, st) {
                    if (stater && stater.code === "ENOENT")
                      fs$rename(from, to, CB);
                    else
                      cb(er);
                  });
                }, backoff);
                if (backoff < 100)
                  backoff += 10;
                return;
              }
              if (cb) cb(er);
            });
          }
          if (Object.setPrototypeOf) Object.setPrototypeOf(rename, fs$rename);
          return rename;
        }(fs.rename);
      }
      fs.read = typeof fs.read !== "function" ? fs.read : function(fs$read) {
        function read(fd, buffer, offset, length, position, callback_) {
          var callback;
          if (callback_ && typeof callback_ === "function") {
            var eagCounter = 0;
            callback = function(er, _, __) {
              if (er && er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                return fs$read.call(fs, fd, buffer, offset, length, position, callback);
              }
              callback_.apply(this, arguments);
            };
          }
          return fs$read.call(fs, fd, buffer, offset, length, position, callback);
        }
        if (Object.setPrototypeOf) Object.setPrototypeOf(read, fs$read);
        return read;
      }(fs.read);
      fs.readSync = typeof fs.readSync !== "function" ? fs.readSync : /* @__PURE__ */ function(fs$readSync) {
        return function(fd, buffer, offset, length, position) {
          var eagCounter = 0;
          while (true) {
            try {
              return fs$readSync.call(fs, fd, buffer, offset, length, position);
            } catch (er) {
              if (er.code === "EAGAIN" && eagCounter < 10) {
                eagCounter++;
                continue;
              }
              throw er;
            }
          }
        };
      }(fs.readSync);
      function patchLchmod(fs2) {
        fs2.lchmod = function(path, mode, callback) {
          fs2.open(
            path,
            constants.O_WRONLY | constants.O_SYMLINK,
            mode,
            function(err, fd) {
              if (err) {
                if (callback) callback(err);
                return;
              }
              fs2.fchmod(fd, mode, function(err2) {
                fs2.close(fd, function(err22) {
                  if (callback) callback(err2 || err22);
                });
              });
            }
          );
        };
        fs2.lchmodSync = function(path, mode) {
          var fd = fs2.openSync(path, constants.O_WRONLY | constants.O_SYMLINK, mode);
          var threw = true;
          var ret;
          try {
            ret = fs2.fchmodSync(fd, mode);
            threw = false;
          } finally {
            if (threw) {
              try {
                fs2.closeSync(fd);
              } catch (er) {
              }
            } else {
              fs2.closeSync(fd);
            }
          }
          return ret;
        };
      }
      function patchLutimes(fs2) {
        if (constants.hasOwnProperty("O_SYMLINK") && fs2.futimes) {
          fs2.lutimes = function(path, at, mt, cb) {
            fs2.open(path, constants.O_SYMLINK, function(er, fd) {
              if (er) {
                if (cb) cb(er);
                return;
              }
              fs2.futimes(fd, at, mt, function(er2) {
                fs2.close(fd, function(er22) {
                  if (cb) cb(er2 || er22);
                });
              });
            });
          };
          fs2.lutimesSync = function(path, at, mt) {
            var fd = fs2.openSync(path, constants.O_SYMLINK);
            var ret;
            var threw = true;
            try {
              ret = fs2.futimesSync(fd, at, mt);
              threw = false;
            } finally {
              if (threw) {
                try {
                  fs2.closeSync(fd);
                } catch (er) {
                }
              } else {
                fs2.closeSync(fd);
              }
            }
            return ret;
          };
        } else if (fs2.futimes) {
          fs2.lutimes = function(_a, _b, _c, cb) {
            if (cb) process.nextTick(cb);
          };
          fs2.lutimesSync = function() {
          };
        }
      }
      function chmodFix(orig) {
        if (!orig) return orig;
        return function(target, mode, cb) {
          return orig.call(fs, target, mode, function(er) {
            if (chownErOk(er)) er = null;
            if (cb) cb.apply(this, arguments);
          });
        };
      }
      function chmodFixSync(orig) {
        if (!orig) return orig;
        return function(target, mode) {
          try {
            return orig.call(fs, target, mode);
          } catch (er) {
            if (!chownErOk(er)) throw er;
          }
        };
      }
      function chownFix(orig) {
        if (!orig) return orig;
        return function(target, uid, gid, cb) {
          return orig.call(fs, target, uid, gid, function(er) {
            if (chownErOk(er)) er = null;
            if (cb) cb.apply(this, arguments);
          });
        };
      }
      function chownFixSync(orig) {
        if (!orig) return orig;
        return function(target, uid, gid) {
          try {
            return orig.call(fs, target, uid, gid);
          } catch (er) {
            if (!chownErOk(er)) throw er;
          }
        };
      }
      function statFix(orig) {
        if (!orig) return orig;
        return function(target, options, cb) {
          if (typeof options === "function") {
            cb = options;
            options = null;
          }
          function callback(er, stats) {
            if (stats) {
              if (stats.uid < 0) stats.uid += 4294967296;
              if (stats.gid < 0) stats.gid += 4294967296;
            }
            if (cb) cb.apply(this, arguments);
          }
          return options ? orig.call(fs, target, options, callback) : orig.call(fs, target, callback);
        };
      }
      function statFixSync(orig) {
        if (!orig) return orig;
        return function(target, options) {
          var stats = options ? orig.call(fs, target, options) : orig.call(fs, target);
          if (stats) {
            if (stats.uid < 0) stats.uid += 4294967296;
            if (stats.gid < 0) stats.gid += 4294967296;
          }
          return stats;
        };
      }
      function chownErOk(er) {
        if (!er)
          return true;
        if (er.code === "ENOSYS")
          return true;
        var nonroot = !process.getuid || process.getuid() !== 0;
        if (nonroot) {
          if (er.code === "EINVAL" || er.code === "EPERM")
            return true;
        }
        return false;
      }
    }
  }
});

// node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/legacy-streams.js
var require_legacy_streams = __commonJS({
  "node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/legacy-streams.js"(exports, module) {
    var Stream = __require("stream").Stream;
    module.exports = legacy;
    function legacy(fs) {
      return {
        ReadStream,
        WriteStream
      };
      function ReadStream(path, options) {
        if (!(this instanceof ReadStream)) return new ReadStream(path, options);
        Stream.call(this);
        var self = this;
        this.path = path;
        this.fd = null;
        this.readable = true;
        this.paused = false;
        this.flags = "r";
        this.mode = 438;
        this.bufferSize = 64 * 1024;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.encoding) this.setEncoding(this.encoding);
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.end === void 0) {
            this.end = Infinity;
          } else if ("number" !== typeof this.end) {
            throw TypeError("end must be a Number");
          }
          if (this.start > this.end) {
            throw new Error("start must be <= end");
          }
          this.pos = this.start;
        }
        if (this.fd !== null) {
          process.nextTick(function() {
            self._read();
          });
          return;
        }
        fs.open(this.path, this.flags, this.mode, function(err, fd) {
          if (err) {
            self.emit("error", err);
            self.readable = false;
            return;
          }
          self.fd = fd;
          self.emit("open", fd);
          self._read();
        });
      }
      function WriteStream(path, options) {
        if (!(this instanceof WriteStream)) return new WriteStream(path, options);
        Stream.call(this);
        this.path = path;
        this.fd = null;
        this.writable = true;
        this.flags = "w";
        this.encoding = "binary";
        this.mode = 438;
        this.bytesWritten = 0;
        options = options || {};
        var keys = Object.keys(options);
        for (var index = 0, length = keys.length; index < length; index++) {
          var key = keys[index];
          this[key] = options[key];
        }
        if (this.start !== void 0) {
          if ("number" !== typeof this.start) {
            throw TypeError("start must be a Number");
          }
          if (this.start < 0) {
            throw new Error("start must be >= zero");
          }
          this.pos = this.start;
        }
        this.busy = false;
        this._queue = [];
        if (this.fd === null) {
          this._open = fs.open;
          this._queue.push([this._open, this.path, this.flags, this.mode, void 0]);
          this.flush();
        }
      }
    }
  }
});

// node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/clone.js
var require_clone = __commonJS({
  "node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/clone.js"(exports, module) {
    "use strict";
    module.exports = clone;
    var getPrototypeOf = Object.getPrototypeOf || function(obj) {
      return obj.__proto__;
    };
    function clone(obj) {
      if (obj === null || typeof obj !== "object")
        return obj;
      if (obj instanceof Object)
        var copy = { __proto__: getPrototypeOf(obj) };
      else
        var copy = /* @__PURE__ */ Object.create(null);
      Object.getOwnPropertyNames(obj).forEach(function(key) {
        Object.defineProperty(copy, key, Object.getOwnPropertyDescriptor(obj, key));
      });
      return copy;
    }
  }
});

// node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/graceful-fs.js
var require_graceful_fs = __commonJS({
  "node_modules/.pnpm/graceful-fs@4.2.11/node_modules/graceful-fs/graceful-fs.js"(exports, module) {
    var fs = __require("fs");
    var polyfills = require_polyfills();
    var legacy = require_legacy_streams();
    var clone = require_clone();
    var util = __require("util");
    var gracefulQueue;
    var previousSymbol;
    if (typeof Symbol === "function" && typeof Symbol.for === "function") {
      gracefulQueue = Symbol.for("graceful-fs.queue");
      previousSymbol = Symbol.for("graceful-fs.previous");
    } else {
      gracefulQueue = "___graceful-fs.queue";
      previousSymbol = "___graceful-fs.previous";
    }
    function noop() {
    }
    function publishQueue(context, queue2) {
      Object.defineProperty(context, gracefulQueue, {
        get: function() {
          return queue2;
        }
      });
    }
    var debug = noop;
    if (util.debuglog)
      debug = util.debuglog("gfs4");
    else if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || ""))
      debug = function() {
        var m = util.format.apply(util, arguments);
        m = "GFS4: " + m.split(/\n/).join("\nGFS4: ");
        console.error(m);
      };
    if (!fs[gracefulQueue]) {
      queue = global[gracefulQueue] || [];
      publishQueue(fs, queue);
      fs.close = function(fs$close) {
        function close(fd, cb) {
          return fs$close.call(fs, fd, function(err) {
            if (!err) {
              resetQueue();
            }
            if (typeof cb === "function")
              cb.apply(this, arguments);
          });
        }
        Object.defineProperty(close, previousSymbol, {
          value: fs$close
        });
        return close;
      }(fs.close);
      fs.closeSync = function(fs$closeSync) {
        function closeSync(fd) {
          fs$closeSync.apply(fs, arguments);
          resetQueue();
        }
        Object.defineProperty(closeSync, previousSymbol, {
          value: fs$closeSync
        });
        return closeSync;
      }(fs.closeSync);
      if (/\bgfs4\b/i.test(process.env.NODE_DEBUG || "")) {
        process.on("exit", function() {
          debug(fs[gracefulQueue]);
          __require("assert").equal(fs[gracefulQueue].length, 0);
        });
      }
    }
    var queue;
    if (!global[gracefulQueue]) {
      publishQueue(global, fs[gracefulQueue]);
    }
    module.exports = patch(clone(fs));
    if (process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fs.__patched) {
      module.exports = patch(fs);
      fs.__patched = true;
    }
    function patch(fs2) {
      polyfills(fs2);
      fs2.gracefulify = patch;
      fs2.createReadStream = createReadStream;
      fs2.createWriteStream = createWriteStream;
      var fs$readFile = fs2.readFile;
      fs2.readFile = readFile5;
      function readFile5(path, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$readFile(path, options, cb);
        function go$readFile(path2, options2, cb2, startTime) {
          return fs$readFile(path2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$readFile, [path2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$writeFile = fs2.writeFile;
      fs2.writeFile = writeFile;
      function writeFile(path, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$writeFile(path, data, options, cb);
        function go$writeFile(path2, data2, options2, cb2, startTime) {
          return fs$writeFile(path2, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$writeFile, [path2, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$appendFile = fs2.appendFile;
      if (fs$appendFile)
        fs2.appendFile = appendFile;
      function appendFile(path, data, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        return go$appendFile(path, data, options, cb);
        function go$appendFile(path2, data2, options2, cb2, startTime) {
          return fs$appendFile(path2, data2, options2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$appendFile, [path2, data2, options2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$copyFile = fs2.copyFile;
      if (fs$copyFile)
        fs2.copyFile = copyFile;
      function copyFile(src, dest, flags, cb) {
        if (typeof flags === "function") {
          cb = flags;
          flags = 0;
        }
        return go$copyFile(src, dest, flags, cb);
        function go$copyFile(src2, dest2, flags2, cb2, startTime) {
          return fs$copyFile(src2, dest2, flags2, function(err) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$copyFile, [src2, dest2, flags2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      var fs$readdir = fs2.readdir;
      fs2.readdir = readdir3;
      var noReaddirOptionVersions = /^v[0-5]\./;
      function readdir3(path, options, cb) {
        if (typeof options === "function")
          cb = options, options = null;
        var go$readdir = noReaddirOptionVersions.test(process.version) ? function go$readdir2(path2, options2, cb2, startTime) {
          return fs$readdir(path2, fs$readdirCallback(
            path2,
            options2,
            cb2,
            startTime
          ));
        } : function go$readdir2(path2, options2, cb2, startTime) {
          return fs$readdir(path2, options2, fs$readdirCallback(
            path2,
            options2,
            cb2,
            startTime
          ));
        };
        return go$readdir(path, options, cb);
        function fs$readdirCallback(path2, options2, cb2, startTime) {
          return function(err, files) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([
                go$readdir,
                [path2, options2, cb2],
                err,
                startTime || Date.now(),
                Date.now()
              ]);
            else {
              if (files && files.sort)
                files.sort();
              if (typeof cb2 === "function")
                cb2.call(this, err, files);
            }
          };
        }
      }
      if (process.version.substr(0, 4) === "v0.8") {
        var legStreams = legacy(fs2);
        ReadStream = legStreams.ReadStream;
        WriteStream = legStreams.WriteStream;
      }
      var fs$ReadStream = fs2.ReadStream;
      if (fs$ReadStream) {
        ReadStream.prototype = Object.create(fs$ReadStream.prototype);
        ReadStream.prototype.open = ReadStream$open;
      }
      var fs$WriteStream = fs2.WriteStream;
      if (fs$WriteStream) {
        WriteStream.prototype = Object.create(fs$WriteStream.prototype);
        WriteStream.prototype.open = WriteStream$open;
      }
      Object.defineProperty(fs2, "ReadStream", {
        get: function() {
          return ReadStream;
        },
        set: function(val) {
          ReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      Object.defineProperty(fs2, "WriteStream", {
        get: function() {
          return WriteStream;
        },
        set: function(val) {
          WriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileReadStream = ReadStream;
      Object.defineProperty(fs2, "FileReadStream", {
        get: function() {
          return FileReadStream;
        },
        set: function(val) {
          FileReadStream = val;
        },
        enumerable: true,
        configurable: true
      });
      var FileWriteStream = WriteStream;
      Object.defineProperty(fs2, "FileWriteStream", {
        get: function() {
          return FileWriteStream;
        },
        set: function(val) {
          FileWriteStream = val;
        },
        enumerable: true,
        configurable: true
      });
      function ReadStream(path, options) {
        if (this instanceof ReadStream)
          return fs$ReadStream.apply(this, arguments), this;
        else
          return ReadStream.apply(Object.create(ReadStream.prototype), arguments);
      }
      function ReadStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            if (that.autoClose)
              that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
            that.read();
          }
        });
      }
      function WriteStream(path, options) {
        if (this instanceof WriteStream)
          return fs$WriteStream.apply(this, arguments), this;
        else
          return WriteStream.apply(Object.create(WriteStream.prototype), arguments);
      }
      function WriteStream$open() {
        var that = this;
        open(that.path, that.flags, that.mode, function(err, fd) {
          if (err) {
            that.destroy();
            that.emit("error", err);
          } else {
            that.fd = fd;
            that.emit("open", fd);
          }
        });
      }
      function createReadStream(path, options) {
        return new fs2.ReadStream(path, options);
      }
      function createWriteStream(path, options) {
        return new fs2.WriteStream(path, options);
      }
      var fs$open = fs2.open;
      fs2.open = open;
      function open(path, flags, mode, cb) {
        if (typeof mode === "function")
          cb = mode, mode = null;
        return go$open(path, flags, mode, cb);
        function go$open(path2, flags2, mode2, cb2, startTime) {
          return fs$open(path2, flags2, mode2, function(err, fd) {
            if (err && (err.code === "EMFILE" || err.code === "ENFILE"))
              enqueue([go$open, [path2, flags2, mode2, cb2], err, startTime || Date.now(), Date.now()]);
            else {
              if (typeof cb2 === "function")
                cb2.apply(this, arguments);
            }
          });
        }
      }
      return fs2;
    }
    function enqueue(elem) {
      debug("ENQUEUE", elem[0].name, elem[1]);
      fs[gracefulQueue].push(elem);
      retry();
    }
    var retryTimer;
    function resetQueue() {
      var now = Date.now();
      for (var i = 0; i < fs[gracefulQueue].length; ++i) {
        if (fs[gracefulQueue][i].length > 2) {
          fs[gracefulQueue][i][3] = now;
          fs[gracefulQueue][i][4] = now;
        }
      }
      retry();
    }
    function retry() {
      clearTimeout(retryTimer);
      retryTimer = void 0;
      if (fs[gracefulQueue].length === 0)
        return;
      var elem = fs[gracefulQueue].shift();
      var fn = elem[0];
      var args = elem[1];
      var err = elem[2];
      var startTime = elem[3];
      var lastTime = elem[4];
      if (startTime === void 0) {
        debug("RETRY", fn.name, args);
        fn.apply(null, args);
      } else if (Date.now() - startTime >= 6e4) {
        debug("TIMEOUT", fn.name, args);
        var cb = args.pop();
        if (typeof cb === "function")
          cb.call(null, err);
      } else {
        var sinceAttempt = Date.now() - lastTime;
        var sinceStart = Math.max(lastTime - startTime, 1);
        var desiredDelay = Math.min(sinceStart * 1.2, 100);
        if (sinceAttempt >= desiredDelay) {
          debug("RETRY", fn.name, args);
          fn.apply(null, args.concat([startTime]));
        } else {
          fs[gracefulQueue].push(elem);
        }
      }
      if (retryTimer === void 0) {
        retryTimer = setTimeout(retry, 0);
      }
    }
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/fs/index.js
var require_fs = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/fs/index.js"(exports) {
    "use strict";
    var u = require_universalify().fromCallback;
    var fs = require_graceful_fs();
    var api = [
      "access",
      "appendFile",
      "chmod",
      "chown",
      "close",
      "copyFile",
      "cp",
      "fchmod",
      "fchown",
      "fdatasync",
      "fstat",
      "fsync",
      "ftruncate",
      "futimes",
      "glob",
      "lchmod",
      "lchown",
      "lutimes",
      "link",
      "lstat",
      "mkdir",
      "mkdtemp",
      "open",
      "opendir",
      "readdir",
      "readFile",
      "readlink",
      "realpath",
      "rename",
      "rm",
      "rmdir",
      "stat",
      "statfs",
      "symlink",
      "truncate",
      "unlink",
      "utimes",
      "writeFile"
    ].filter((key) => {
      return typeof fs[key] === "function";
    });
    Object.assign(exports, fs);
    api.forEach((method) => {
      exports[method] = u(fs[method]);
    });
    exports.exists = function(filename, callback) {
      if (typeof callback === "function") {
        return fs.exists(filename, callback);
      }
      return new Promise((resolve) => {
        return fs.exists(filename, resolve);
      });
    };
    exports.read = function(fd, buffer, offset, length, position, callback) {
      if (typeof callback === "function") {
        return fs.read(fd, buffer, offset, length, position, callback);
      }
      return new Promise((resolve, reject) => {
        fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer2) => {
          if (err) return reject(err);
          resolve({ bytesRead, buffer: buffer2 });
        });
      });
    };
    exports.write = function(fd, buffer, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs.write(fd, buffer, ...args);
      }
      return new Promise((resolve, reject) => {
        fs.write(fd, buffer, ...args, (err, bytesWritten, buffer2) => {
          if (err) return reject(err);
          resolve({ bytesWritten, buffer: buffer2 });
        });
      });
    };
    exports.readv = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs.readv(fd, buffers, ...args);
      }
      return new Promise((resolve, reject) => {
        fs.readv(fd, buffers, ...args, (err, bytesRead, buffers2) => {
          if (err) return reject(err);
          resolve({ bytesRead, buffers: buffers2 });
        });
      });
    };
    exports.writev = function(fd, buffers, ...args) {
      if (typeof args[args.length - 1] === "function") {
        return fs.writev(fd, buffers, ...args);
      }
      return new Promise((resolve, reject) => {
        fs.writev(fd, buffers, ...args, (err, bytesWritten, buffers2) => {
          if (err) return reject(err);
          resolve({ bytesWritten, buffers: buffers2 });
        });
      });
    };
    if (typeof fs.realpath.native === "function") {
      exports.realpath.native = u(fs.realpath.native);
    } else {
      process.emitWarning(
        "fs.realpath.native is not a function. Is fs being monkey-patched?",
        "Warning",
        "fs-extra-WARN0003"
      );
    }
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/mkdirs/utils.js
var require_utils = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/mkdirs/utils.js"(exports, module) {
    "use strict";
    var path = __require("path");
    module.exports.checkPath = function checkPath(pth) {
      if (process.platform === "win32") {
        const pathHasInvalidWinCharacters = /[<>:"|?*]/.test(pth.replace(path.parse(pth).root, ""));
        if (pathHasInvalidWinCharacters) {
          const error2 = new Error(`Path contains invalid characters: ${pth}`);
          error2.code = "EINVAL";
          throw error2;
        }
      }
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/mkdirs/make-dir.js
var require_make_dir = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/mkdirs/make-dir.js"(exports, module) {
    "use strict";
    var fs = require_fs();
    var { checkPath } = require_utils();
    var getMode = (options) => {
      const defaults = { mode: 511 };
      if (typeof options === "number") return options;
      return { ...defaults, ...options }.mode;
    };
    module.exports.makeDir = async (dir, options) => {
      checkPath(dir);
      return fs.mkdir(dir, {
        mode: getMode(options),
        recursive: true
      });
    };
    module.exports.makeDirSync = (dir, options) => {
      checkPath(dir);
      return fs.mkdirSync(dir, {
        mode: getMode(options),
        recursive: true
      });
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/mkdirs/index.js
var require_mkdirs = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/mkdirs/index.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var { makeDir: _makeDir, makeDirSync } = require_make_dir();
    var makeDir = u(_makeDir);
    module.exports = {
      mkdirs: makeDir,
      mkdirsSync: makeDirSync,
      // alias
      mkdirp: makeDir,
      mkdirpSync: makeDirSync,
      ensureDir: makeDir,
      ensureDirSync: makeDirSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/path-exists/index.js
var require_path_exists = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/path-exists/index.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs = require_fs();
    function pathExists(path) {
      return fs.access(path).then(() => true).catch(() => false);
    }
    module.exports = {
      pathExists: u(pathExists),
      pathExistsSync: fs.existsSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/util/utimes.js
var require_utimes = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/util/utimes.js"(exports, module) {
    "use strict";
    var fs = require_fs();
    var u = require_universalify().fromPromise;
    async function utimesMillis(path, atime, mtime) {
      const fd = await fs.open(path, "r+");
      let closeErr = null;
      try {
        await fs.futimes(fd, atime, mtime);
      } finally {
        try {
          await fs.close(fd);
        } catch (e) {
          closeErr = e;
        }
      }
      if (closeErr) {
        throw closeErr;
      }
    }
    function utimesMillisSync(path, atime, mtime) {
      const fd = fs.openSync(path, "r+");
      fs.futimesSync(fd, atime, mtime);
      return fs.closeSync(fd);
    }
    module.exports = {
      utimesMillis: u(utimesMillis),
      utimesMillisSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/util/stat.js
var require_stat = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/util/stat.js"(exports, module) {
    "use strict";
    var fs = require_fs();
    var path = __require("path");
    var u = require_universalify().fromPromise;
    function getStats(src, dest, opts) {
      const statFunc = opts.dereference ? (file) => fs.stat(file, { bigint: true }) : (file) => fs.lstat(file, { bigint: true });
      return Promise.all([
        statFunc(src),
        statFunc(dest).catch((err) => {
          if (err.code === "ENOENT") return null;
          throw err;
        })
      ]).then(([srcStat, destStat]) => ({ srcStat, destStat }));
    }
    function getStatsSync(src, dest, opts) {
      let destStat;
      const statFunc = opts.dereference ? (file) => fs.statSync(file, { bigint: true }) : (file) => fs.lstatSync(file, { bigint: true });
      const srcStat = statFunc(src);
      try {
        destStat = statFunc(dest);
      } catch (err) {
        if (err.code === "ENOENT") return { srcStat, destStat: null };
        throw err;
      }
      return { srcStat, destStat };
    }
    async function checkPaths(src, dest, funcName, opts) {
      const { srcStat, destStat } = await getStats(src, dest, opts);
      if (destStat) {
        if (areIdentical(srcStat, destStat)) {
          const srcBaseName = path.basename(src);
          const destBaseName = path.basename(dest);
          if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
            return { srcStat, destStat, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    function checkPathsSync(src, dest, funcName, opts) {
      const { srcStat, destStat } = getStatsSync(src, dest, opts);
      if (destStat) {
        if (areIdentical(srcStat, destStat)) {
          const srcBaseName = path.basename(src);
          const destBaseName = path.basename(dest);
          if (funcName === "move" && srcBaseName !== destBaseName && srcBaseName.toLowerCase() === destBaseName.toLowerCase()) {
            return { srcStat, destStat, isChangingCase: true };
          }
          throw new Error("Source and destination must not be the same.");
        }
        if (srcStat.isDirectory() && !destStat.isDirectory()) {
          throw new Error(`Cannot overwrite non-directory '${dest}' with directory '${src}'.`);
        }
        if (!srcStat.isDirectory() && destStat.isDirectory()) {
          throw new Error(`Cannot overwrite directory '${dest}' with non-directory '${src}'.`);
        }
      }
      if (srcStat.isDirectory() && isSrcSubdir(src, dest)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return { srcStat, destStat };
    }
    async function checkParentPaths(src, srcStat, dest, funcName) {
      const srcParent = path.resolve(path.dirname(src));
      const destParent = path.resolve(path.dirname(dest));
      if (destParent === srcParent || destParent === path.parse(destParent).root) return;
      let destStat;
      try {
        destStat = await fs.stat(destParent, { bigint: true });
      } catch (err) {
        if (err.code === "ENOENT") return;
        throw err;
      }
      if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPaths(src, srcStat, destParent, funcName);
    }
    function checkParentPathsSync(src, srcStat, dest, funcName) {
      const srcParent = path.resolve(path.dirname(src));
      const destParent = path.resolve(path.dirname(dest));
      if (destParent === srcParent || destParent === path.parse(destParent).root) return;
      let destStat;
      try {
        destStat = fs.statSync(destParent, { bigint: true });
      } catch (err) {
        if (err.code === "ENOENT") return;
        throw err;
      }
      if (areIdentical(srcStat, destStat)) {
        throw new Error(errMsg(src, dest, funcName));
      }
      return checkParentPathsSync(src, srcStat, destParent, funcName);
    }
    function areIdentical(srcStat, destStat) {
      return destStat.ino !== void 0 && destStat.dev !== void 0 && destStat.ino === srcStat.ino && destStat.dev === srcStat.dev;
    }
    function isSrcSubdir(src, dest) {
      const srcArr = path.resolve(src).split(path.sep).filter((i) => i);
      const destArr = path.resolve(dest).split(path.sep).filter((i) => i);
      return srcArr.every((cur, i) => destArr[i] === cur);
    }
    function errMsg(src, dest, funcName) {
      return `Cannot ${funcName} '${src}' to a subdirectory of itself, '${dest}'.`;
    }
    module.exports = {
      // checkPaths
      checkPaths: u(checkPaths),
      checkPathsSync,
      // checkParent
      checkParentPaths: u(checkParentPaths),
      checkParentPathsSync,
      // Misc
      isSrcSubdir,
      areIdentical
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/util/async.js
var require_async = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/util/async.js"(exports, module) {
    "use strict";
    async function asyncIteratorConcurrentProcess(iterator, fn) {
      const promises = [];
      for await (const item of iterator) {
        promises.push(
          fn(item).then(
            () => null,
            (err) => err ?? new Error("unknown error")
          )
        );
      }
      await Promise.all(
        promises.map(
          (promise) => promise.then((possibleErr) => {
            if (possibleErr !== null) throw possibleErr;
          })
        )
      );
    }
    module.exports = {
      asyncIteratorConcurrentProcess
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/copy/copy.js
var require_copy = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/copy/copy.js"(exports, module) {
    "use strict";
    var fs = require_fs();
    var path = __require("path");
    var { mkdirs } = require_mkdirs();
    var { pathExists } = require_path_exists();
    var { utimesMillis } = require_utimes();
    var stat2 = require_stat();
    var { asyncIteratorConcurrentProcess } = require_async();
    async function copy(src, dest, opts = {}) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0001"
        );
      }
      const { srcStat, destStat } = await stat2.checkPaths(src, dest, "copy", opts);
      await stat2.checkParentPaths(src, srcStat, dest, "copy");
      const include = await runFilter(src, dest, opts);
      if (!include) return;
      const destParent = path.dirname(dest);
      const dirExists = await pathExists(destParent);
      if (!dirExists) {
        await mkdirs(destParent);
      }
      await getStatsAndPerformCopy(destStat, src, dest, opts);
    }
    async function runFilter(src, dest, opts) {
      if (!opts.filter) return true;
      return opts.filter(src, dest);
    }
    async function getStatsAndPerformCopy(destStat, src, dest, opts) {
      const statFn = opts.dereference ? fs.stat : fs.lstat;
      const srcStat = await statFn(src);
      if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);
      if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts);
      if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);
      if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`);
      if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`);
      throw new Error(`Unknown file: ${src}`);
    }
    async function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat) return copyFile(srcStat, src, dest, opts);
      if (opts.overwrite) {
        await fs.unlink(dest);
        return copyFile(srcStat, src, dest, opts);
      }
      if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    async function copyFile(srcStat, src, dest, opts) {
      await fs.copyFile(src, dest);
      if (opts.preserveTimestamps) {
        if (fileIsNotWritable(srcStat.mode)) {
          await makeFileWritable(dest, srcStat.mode);
        }
        const updatedSrcStat = await fs.stat(src);
        await utimesMillis(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
      }
      return fs.chmod(dest, srcStat.mode);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode) {
      return fs.chmod(dest, srcMode | 128);
    }
    async function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat) {
        await fs.mkdir(dest);
      }
      await asyncIteratorConcurrentProcess(await fs.opendir(src), async (item) => {
        const srcItem = path.join(src, item.name);
        const destItem = path.join(dest, item.name);
        const include = await runFilter(srcItem, destItem, opts);
        if (include) {
          const { destStat: destStat2 } = await stat2.checkPaths(srcItem, destItem, "copy", opts);
          await getStatsAndPerformCopy(destStat2, srcItem, destItem, opts);
        }
      });
      if (!destStat) {
        await fs.chmod(dest, srcStat.mode);
      }
    }
    async function onLink(destStat, src, dest, opts) {
      let resolvedSrc = await fs.readlink(src);
      if (opts.dereference) {
        resolvedSrc = path.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs.symlink(resolvedSrc, dest);
      }
      let resolvedDest = null;
      try {
        resolvedDest = await fs.readlink(dest);
      } catch (e) {
        if (e.code === "EINVAL" || e.code === "UNKNOWN") return fs.symlink(resolvedSrc, dest);
        throw e;
      }
      if (opts.dereference) {
        resolvedDest = path.resolve(process.cwd(), resolvedDest);
      }
      if (resolvedSrc !== resolvedDest) {
        if (stat2.isSrcSubdir(resolvedSrc, resolvedDest)) {
          throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
        }
        if (stat2.isSrcSubdir(resolvedDest, resolvedSrc)) {
          throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
        }
      }
      await fs.unlink(dest);
      return fs.symlink(resolvedSrc, dest);
    }
    module.exports = copy;
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/copy/copy-sync.js
var require_copy_sync = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/copy/copy-sync.js"(exports, module) {
    "use strict";
    var fs = require_graceful_fs();
    var path = __require("path");
    var mkdirsSync = require_mkdirs().mkdirsSync;
    var utimesMillisSync = require_utimes().utimesMillisSync;
    var stat2 = require_stat();
    function copySync(src, dest, opts) {
      if (typeof opts === "function") {
        opts = { filter: opts };
      }
      opts = opts || {};
      opts.clobber = "clobber" in opts ? !!opts.clobber : true;
      opts.overwrite = "overwrite" in opts ? !!opts.overwrite : opts.clobber;
      if (opts.preserveTimestamps && process.arch === "ia32") {
        process.emitWarning(
          "Using the preserveTimestamps option in 32-bit node is not recommended;\n\n	see https://github.com/jprichardson/node-fs-extra/issues/269",
          "Warning",
          "fs-extra-WARN0002"
        );
      }
      const { srcStat, destStat } = stat2.checkPathsSync(src, dest, "copy", opts);
      stat2.checkParentPathsSync(src, srcStat, dest, "copy");
      if (opts.filter && !opts.filter(src, dest)) return;
      const destParent = path.dirname(dest);
      if (!fs.existsSync(destParent)) mkdirsSync(destParent);
      return getStats(destStat, src, dest, opts);
    }
    function getStats(destStat, src, dest, opts) {
      const statSync = opts.dereference ? fs.statSync : fs.lstatSync;
      const srcStat = statSync(src);
      if (srcStat.isDirectory()) return onDir(srcStat, destStat, src, dest, opts);
      else if (srcStat.isFile() || srcStat.isCharacterDevice() || srcStat.isBlockDevice()) return onFile(srcStat, destStat, src, dest, opts);
      else if (srcStat.isSymbolicLink()) return onLink(destStat, src, dest, opts);
      else if (srcStat.isSocket()) throw new Error(`Cannot copy a socket file: ${src}`);
      else if (srcStat.isFIFO()) throw new Error(`Cannot copy a FIFO pipe: ${src}`);
      throw new Error(`Unknown file: ${src}`);
    }
    function onFile(srcStat, destStat, src, dest, opts) {
      if (!destStat) return copyFile(srcStat, src, dest, opts);
      return mayCopyFile(srcStat, src, dest, opts);
    }
    function mayCopyFile(srcStat, src, dest, opts) {
      if (opts.overwrite) {
        fs.unlinkSync(dest);
        return copyFile(srcStat, src, dest, opts);
      } else if (opts.errorOnExist) {
        throw new Error(`'${dest}' already exists`);
      }
    }
    function copyFile(srcStat, src, dest, opts) {
      fs.copyFileSync(src, dest);
      if (opts.preserveTimestamps) handleTimestamps(srcStat.mode, src, dest);
      return setDestMode(dest, srcStat.mode);
    }
    function handleTimestamps(srcMode, src, dest) {
      if (fileIsNotWritable(srcMode)) makeFileWritable(dest, srcMode);
      return setDestTimestamps(src, dest);
    }
    function fileIsNotWritable(srcMode) {
      return (srcMode & 128) === 0;
    }
    function makeFileWritable(dest, srcMode) {
      return setDestMode(dest, srcMode | 128);
    }
    function setDestMode(dest, srcMode) {
      return fs.chmodSync(dest, srcMode);
    }
    function setDestTimestamps(src, dest) {
      const updatedSrcStat = fs.statSync(src);
      return utimesMillisSync(dest, updatedSrcStat.atime, updatedSrcStat.mtime);
    }
    function onDir(srcStat, destStat, src, dest, opts) {
      if (!destStat) return mkDirAndCopy(srcStat.mode, src, dest, opts);
      return copyDir(src, dest, opts);
    }
    function mkDirAndCopy(srcMode, src, dest, opts) {
      fs.mkdirSync(dest);
      copyDir(src, dest, opts);
      return setDestMode(dest, srcMode);
    }
    function copyDir(src, dest, opts) {
      const dir = fs.opendirSync(src);
      try {
        let dirent;
        while ((dirent = dir.readSync()) !== null) {
          copyDirItem(dirent.name, src, dest, opts);
        }
      } finally {
        dir.closeSync();
      }
    }
    function copyDirItem(item, src, dest, opts) {
      const srcItem = path.join(src, item);
      const destItem = path.join(dest, item);
      if (opts.filter && !opts.filter(srcItem, destItem)) return;
      const { destStat } = stat2.checkPathsSync(srcItem, destItem, "copy", opts);
      return getStats(destStat, srcItem, destItem, opts);
    }
    function onLink(destStat, src, dest, opts) {
      let resolvedSrc = fs.readlinkSync(src);
      if (opts.dereference) {
        resolvedSrc = path.resolve(process.cwd(), resolvedSrc);
      }
      if (!destStat) {
        return fs.symlinkSync(resolvedSrc, dest);
      } else {
        let resolvedDest;
        try {
          resolvedDest = fs.readlinkSync(dest);
        } catch (err) {
          if (err.code === "EINVAL" || err.code === "UNKNOWN") return fs.symlinkSync(resolvedSrc, dest);
          throw err;
        }
        if (opts.dereference) {
          resolvedDest = path.resolve(process.cwd(), resolvedDest);
        }
        if (resolvedSrc !== resolvedDest) {
          if (stat2.isSrcSubdir(resolvedSrc, resolvedDest)) {
            throw new Error(`Cannot copy '${resolvedSrc}' to a subdirectory of itself, '${resolvedDest}'.`);
          }
          if (stat2.isSrcSubdir(resolvedDest, resolvedSrc)) {
            throw new Error(`Cannot overwrite '${resolvedDest}' with '${resolvedSrc}'.`);
          }
        }
        return copyLink(resolvedSrc, dest);
      }
    }
    function copyLink(resolvedSrc, dest) {
      fs.unlinkSync(dest);
      return fs.symlinkSync(resolvedSrc, dest);
    }
    module.exports = copySync;
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/copy/index.js
var require_copy2 = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/copy/index.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    module.exports = {
      copy: u(require_copy()),
      copySync: require_copy_sync()
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/remove/index.js
var require_remove = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/remove/index.js"(exports, module) {
    "use strict";
    var fs = require_graceful_fs();
    var u = require_universalify().fromCallback;
    function remove(path, callback) {
      fs.rm(path, { recursive: true, force: true }, callback);
    }
    function removeSync(path) {
      fs.rmSync(path, { recursive: true, force: true });
    }
    module.exports = {
      remove: u(remove),
      removeSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/empty/index.js
var require_empty = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/empty/index.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs = require_fs();
    var path = __require("path");
    var mkdir2 = require_mkdirs();
    var remove = require_remove();
    var emptyDir = u(async function emptyDir2(dir) {
      let items;
      try {
        items = await fs.readdir(dir);
      } catch {
        return mkdir2.mkdirs(dir);
      }
      return Promise.all(items.map((item) => remove.remove(path.join(dir, item))));
    });
    function emptyDirSync(dir) {
      let items;
      try {
        items = fs.readdirSync(dir);
      } catch {
        return mkdir2.mkdirsSync(dir);
      }
      items.forEach((item) => {
        item = path.join(dir, item);
        remove.removeSync(item);
      });
    }
    module.exports = {
      emptyDirSync,
      emptydirSync: emptyDirSync,
      emptyDir,
      emptydir: emptyDir
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/ensure/file.js
var require_file = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/ensure/file.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var path = __require("path");
    var fs = require_fs();
    var mkdir2 = require_mkdirs();
    async function createFile(file) {
      let stats;
      try {
        stats = await fs.stat(file);
      } catch {
      }
      if (stats && stats.isFile()) return;
      const dir = path.dirname(file);
      let dirStats = null;
      try {
        dirStats = await fs.stat(dir);
      } catch (err) {
        if (err.code === "ENOENT") {
          await mkdir2.mkdirs(dir);
          await fs.writeFile(file, "");
          return;
        } else {
          throw err;
        }
      }
      if (dirStats.isDirectory()) {
        await fs.writeFile(file, "");
      } else {
        await fs.readdir(dir);
      }
    }
    function createFileSync(file) {
      let stats;
      try {
        stats = fs.statSync(file);
      } catch {
      }
      if (stats && stats.isFile()) return;
      const dir = path.dirname(file);
      try {
        if (!fs.statSync(dir).isDirectory()) {
          fs.readdirSync(dir);
        }
      } catch (err) {
        if (err && err.code === "ENOENT") mkdir2.mkdirsSync(dir);
        else throw err;
      }
      fs.writeFileSync(file, "");
    }
    module.exports = {
      createFile: u(createFile),
      createFileSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/ensure/link.js
var require_link = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/ensure/link.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var path = __require("path");
    var fs = require_fs();
    var mkdir2 = require_mkdirs();
    var { pathExists } = require_path_exists();
    var { areIdentical } = require_stat();
    async function createLink(srcpath, dstpath) {
      let dstStat;
      try {
        dstStat = await fs.lstat(dstpath);
      } catch {
      }
      let srcStat;
      try {
        srcStat = await fs.lstat(srcpath);
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      if (dstStat && areIdentical(srcStat, dstStat)) return;
      const dir = path.dirname(dstpath);
      const dirExists = await pathExists(dir);
      if (!dirExists) {
        await mkdir2.mkdirs(dir);
      }
      await fs.link(srcpath, dstpath);
    }
    function createLinkSync(srcpath, dstpath) {
      let dstStat;
      try {
        dstStat = fs.lstatSync(dstpath);
      } catch {
      }
      try {
        const srcStat = fs.lstatSync(srcpath);
        if (dstStat && areIdentical(srcStat, dstStat)) return;
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureLink");
        throw err;
      }
      const dir = path.dirname(dstpath);
      const dirExists = fs.existsSync(dir);
      if (dirExists) return fs.linkSync(srcpath, dstpath);
      mkdir2.mkdirsSync(dir);
      return fs.linkSync(srcpath, dstpath);
    }
    module.exports = {
      createLink: u(createLink),
      createLinkSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/ensure/symlink-paths.js
var require_symlink_paths = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/ensure/symlink-paths.js"(exports, module) {
    "use strict";
    var path = __require("path");
    var fs = require_fs();
    var { pathExists } = require_path_exists();
    var u = require_universalify().fromPromise;
    async function symlinkPaths(srcpath, dstpath) {
      if (path.isAbsolute(srcpath)) {
        try {
          await fs.lstat(srcpath);
        } catch (err) {
          err.message = err.message.replace("lstat", "ensureSymlink");
          throw err;
        }
        return {
          toCwd: srcpath,
          toDst: srcpath
        };
      }
      const dstdir = path.dirname(dstpath);
      const relativeToDst = path.join(dstdir, srcpath);
      const exists = await pathExists(relativeToDst);
      if (exists) {
        return {
          toCwd: relativeToDst,
          toDst: srcpath
        };
      }
      try {
        await fs.lstat(srcpath);
      } catch (err) {
        err.message = err.message.replace("lstat", "ensureSymlink");
        throw err;
      }
      return {
        toCwd: srcpath,
        toDst: path.relative(dstdir, srcpath)
      };
    }
    function symlinkPathsSync(srcpath, dstpath) {
      if (path.isAbsolute(srcpath)) {
        const exists2 = fs.existsSync(srcpath);
        if (!exists2) throw new Error("absolute srcpath does not exist");
        return {
          toCwd: srcpath,
          toDst: srcpath
        };
      }
      const dstdir = path.dirname(dstpath);
      const relativeToDst = path.join(dstdir, srcpath);
      const exists = fs.existsSync(relativeToDst);
      if (exists) {
        return {
          toCwd: relativeToDst,
          toDst: srcpath
        };
      }
      const srcExists = fs.existsSync(srcpath);
      if (!srcExists) throw new Error("relative srcpath does not exist");
      return {
        toCwd: srcpath,
        toDst: path.relative(dstdir, srcpath)
      };
    }
    module.exports = {
      symlinkPaths: u(symlinkPaths),
      symlinkPathsSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/ensure/symlink-type.js
var require_symlink_type = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/ensure/symlink-type.js"(exports, module) {
    "use strict";
    var fs = require_fs();
    var u = require_universalify().fromPromise;
    async function symlinkType(srcpath, type) {
      if (type) return type;
      let stats;
      try {
        stats = await fs.lstat(srcpath);
      } catch {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    function symlinkTypeSync(srcpath, type) {
      if (type) return type;
      let stats;
      try {
        stats = fs.lstatSync(srcpath);
      } catch {
        return "file";
      }
      return stats && stats.isDirectory() ? "dir" : "file";
    }
    module.exports = {
      symlinkType: u(symlinkType),
      symlinkTypeSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/ensure/symlink.js
var require_symlink = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/ensure/symlink.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var path = __require("path");
    var fs = require_fs();
    var { mkdirs, mkdirsSync } = require_mkdirs();
    var { symlinkPaths, symlinkPathsSync } = require_symlink_paths();
    var { symlinkType, symlinkTypeSync } = require_symlink_type();
    var { pathExists } = require_path_exists();
    var { areIdentical } = require_stat();
    async function createSymlink(srcpath, dstpath, type) {
      let stats;
      try {
        stats = await fs.lstat(dstpath);
      } catch {
      }
      if (stats && stats.isSymbolicLink()) {
        const [srcStat, dstStat] = await Promise.all([
          fs.stat(srcpath),
          fs.stat(dstpath)
        ]);
        if (areIdentical(srcStat, dstStat)) return;
      }
      const relative2 = await symlinkPaths(srcpath, dstpath);
      srcpath = relative2.toDst;
      const toType = await symlinkType(relative2.toCwd, type);
      const dir = path.dirname(dstpath);
      if (!await pathExists(dir)) {
        await mkdirs(dir);
      }
      return fs.symlink(srcpath, dstpath, toType);
    }
    function createSymlinkSync(srcpath, dstpath, type) {
      let stats;
      try {
        stats = fs.lstatSync(dstpath);
      } catch {
      }
      if (stats && stats.isSymbolicLink()) {
        const srcStat = fs.statSync(srcpath);
        const dstStat = fs.statSync(dstpath);
        if (areIdentical(srcStat, dstStat)) return;
      }
      const relative2 = symlinkPathsSync(srcpath, dstpath);
      srcpath = relative2.toDst;
      type = symlinkTypeSync(relative2.toCwd, type);
      const dir = path.dirname(dstpath);
      const exists = fs.existsSync(dir);
      if (exists) return fs.symlinkSync(srcpath, dstpath, type);
      mkdirsSync(dir);
      return fs.symlinkSync(srcpath, dstpath, type);
    }
    module.exports = {
      createSymlink: u(createSymlink),
      createSymlinkSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/ensure/index.js
var require_ensure = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/ensure/index.js"(exports, module) {
    "use strict";
    var { createFile, createFileSync } = require_file();
    var { createLink, createLinkSync } = require_link();
    var { createSymlink, createSymlinkSync } = require_symlink();
    module.exports = {
      // file
      createFile,
      createFileSync,
      ensureFile: createFile,
      ensureFileSync: createFileSync,
      // link
      createLink,
      createLinkSync,
      ensureLink: createLink,
      ensureLinkSync: createLinkSync,
      // symlink
      createSymlink,
      createSymlinkSync,
      ensureSymlink: createSymlink,
      ensureSymlinkSync: createSymlinkSync
    };
  }
});

// node_modules/.pnpm/jsonfile@6.2.0/node_modules/jsonfile/utils.js
var require_utils2 = __commonJS({
  "node_modules/.pnpm/jsonfile@6.2.0/node_modules/jsonfile/utils.js"(exports, module) {
    function stringify(obj, { EOL = "\n", finalEOL = true, replacer = null, spaces } = {}) {
      const EOF = finalEOL ? EOL : "";
      const str = JSON.stringify(obj, replacer, spaces);
      return str.replace(/\n/g, EOL) + EOF;
    }
    function stripBom(content) {
      if (Buffer.isBuffer(content)) content = content.toString("utf8");
      return content.replace(/^\uFEFF/, "");
    }
    module.exports = { stringify, stripBom };
  }
});

// node_modules/.pnpm/jsonfile@6.2.0/node_modules/jsonfile/index.js
var require_jsonfile = __commonJS({
  "node_modules/.pnpm/jsonfile@6.2.0/node_modules/jsonfile/index.js"(exports, module) {
    var _fs;
    try {
      _fs = require_graceful_fs();
    } catch (_) {
      _fs = __require("fs");
    }
    var universalify = require_universalify();
    var { stringify, stripBom } = require_utils2();
    async function _readFile(file, options = {}) {
      if (typeof options === "string") {
        options = { encoding: options };
      }
      const fs = options.fs || _fs;
      const shouldThrow = "throws" in options ? options.throws : true;
      let data = await universalify.fromCallback(fs.readFile)(file, options);
      data = stripBom(data);
      let obj;
      try {
        obj = JSON.parse(data, options ? options.reviver : null);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
      return obj;
    }
    var readFile5 = universalify.fromPromise(_readFile);
    function readFileSync(file, options = {}) {
      if (typeof options === "string") {
        options = { encoding: options };
      }
      const fs = options.fs || _fs;
      const shouldThrow = "throws" in options ? options.throws : true;
      try {
        let content = fs.readFileSync(file, options);
        content = stripBom(content);
        return JSON.parse(content, options.reviver);
      } catch (err) {
        if (shouldThrow) {
          err.message = `${file}: ${err.message}`;
          throw err;
        } else {
          return null;
        }
      }
    }
    async function _writeFile(file, obj, options = {}) {
      const fs = options.fs || _fs;
      const str = stringify(obj, options);
      await universalify.fromCallback(fs.writeFile)(file, str, options);
    }
    var writeFile = universalify.fromPromise(_writeFile);
    function writeFileSync(file, obj, options = {}) {
      const fs = options.fs || _fs;
      const str = stringify(obj, options);
      return fs.writeFileSync(file, str, options);
    }
    module.exports = {
      readFile: readFile5,
      readFileSync,
      writeFile,
      writeFileSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/json/jsonfile.js
var require_jsonfile2 = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/json/jsonfile.js"(exports, module) {
    "use strict";
    var jsonFile = require_jsonfile();
    module.exports = {
      // jsonfile exports
      readJson: jsonFile.readFile,
      readJsonSync: jsonFile.readFileSync,
      writeJson: jsonFile.writeFile,
      writeJsonSync: jsonFile.writeFileSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/output-file/index.js
var require_output_file = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/output-file/index.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var fs = require_fs();
    var path = __require("path");
    var mkdir2 = require_mkdirs();
    var pathExists = require_path_exists().pathExists;
    async function outputFile(file, data, encoding = "utf-8") {
      const dir = path.dirname(file);
      if (!await pathExists(dir)) {
        await mkdir2.mkdirs(dir);
      }
      return fs.writeFile(file, data, encoding);
    }
    function outputFileSync(file, ...args) {
      const dir = path.dirname(file);
      if (!fs.existsSync(dir)) {
        mkdir2.mkdirsSync(dir);
      }
      fs.writeFileSync(file, ...args);
    }
    module.exports = {
      outputFile: u(outputFile),
      outputFileSync
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/json/output-json.js
var require_output_json = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/json/output-json.js"(exports, module) {
    "use strict";
    var { stringify } = require_utils2();
    var { outputFile } = require_output_file();
    async function outputJson(file, data, options = {}) {
      const str = stringify(data, options);
      await outputFile(file, str, options);
    }
    module.exports = outputJson;
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/json/output-json-sync.js
var require_output_json_sync = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/json/output-json-sync.js"(exports, module) {
    "use strict";
    var { stringify } = require_utils2();
    var { outputFileSync } = require_output_file();
    function outputJsonSync(file, data, options) {
      const str = stringify(data, options);
      outputFileSync(file, str, options);
    }
    module.exports = outputJsonSync;
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/json/index.js
var require_json = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/json/index.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    var jsonFile = require_jsonfile2();
    jsonFile.outputJson = u(require_output_json());
    jsonFile.outputJsonSync = require_output_json_sync();
    jsonFile.outputJSON = jsonFile.outputJson;
    jsonFile.outputJSONSync = jsonFile.outputJsonSync;
    jsonFile.writeJSON = jsonFile.writeJson;
    jsonFile.writeJSONSync = jsonFile.writeJsonSync;
    jsonFile.readJSON = jsonFile.readJson;
    jsonFile.readJSONSync = jsonFile.readJsonSync;
    module.exports = jsonFile;
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/move/move.js
var require_move = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/move/move.js"(exports, module) {
    "use strict";
    var fs = require_fs();
    var path = __require("path");
    var { copy } = require_copy2();
    var { remove } = require_remove();
    var { mkdirp } = require_mkdirs();
    var { pathExists } = require_path_exists();
    var stat2 = require_stat();
    async function move(src, dest, opts = {}) {
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat, isChangingCase = false } = await stat2.checkPaths(src, dest, "move", opts);
      await stat2.checkParentPaths(src, srcStat, dest, "move");
      const destParent = path.dirname(dest);
      const parsedParentPath = path.parse(destParent);
      if (parsedParentPath.root !== destParent) {
        await mkdirp(destParent);
      }
      return doRename(src, dest, overwrite, isChangingCase);
    }
    async function doRename(src, dest, overwrite, isChangingCase) {
      if (!isChangingCase) {
        if (overwrite) {
          await remove(dest);
        } else if (await pathExists(dest)) {
          throw new Error("dest already exists.");
        }
      }
      try {
        await fs.rename(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV") {
          throw err;
        }
        await moveAcrossDevice(src, dest, overwrite);
      }
    }
    async function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true,
        preserveTimestamps: true
      };
      await copy(src, dest, opts);
      return remove(src);
    }
    module.exports = move;
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/move/move-sync.js
var require_move_sync = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/move/move-sync.js"(exports, module) {
    "use strict";
    var fs = require_graceful_fs();
    var path = __require("path");
    var copySync = require_copy2().copySync;
    var removeSync = require_remove().removeSync;
    var mkdirpSync = require_mkdirs().mkdirpSync;
    var stat2 = require_stat();
    function moveSync(src, dest, opts) {
      opts = opts || {};
      const overwrite = opts.overwrite || opts.clobber || false;
      const { srcStat, isChangingCase = false } = stat2.checkPathsSync(src, dest, "move", opts);
      stat2.checkParentPathsSync(src, srcStat, dest, "move");
      if (!isParentRoot(dest)) mkdirpSync(path.dirname(dest));
      return doRename(src, dest, overwrite, isChangingCase);
    }
    function isParentRoot(dest) {
      const parent = path.dirname(dest);
      const parsedPath = path.parse(parent);
      return parsedPath.root === parent;
    }
    function doRename(src, dest, overwrite, isChangingCase) {
      if (isChangingCase) return rename(src, dest, overwrite);
      if (overwrite) {
        removeSync(dest);
        return rename(src, dest, overwrite);
      }
      if (fs.existsSync(dest)) throw new Error("dest already exists.");
      return rename(src, dest, overwrite);
    }
    function rename(src, dest, overwrite) {
      try {
        fs.renameSync(src, dest);
      } catch (err) {
        if (err.code !== "EXDEV") throw err;
        return moveAcrossDevice(src, dest, overwrite);
      }
    }
    function moveAcrossDevice(src, dest, overwrite) {
      const opts = {
        overwrite,
        errorOnExist: true,
        preserveTimestamps: true
      };
      copySync(src, dest, opts);
      return removeSync(src);
    }
    module.exports = moveSync;
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/move/index.js
var require_move2 = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/move/index.js"(exports, module) {
    "use strict";
    var u = require_universalify().fromPromise;
    module.exports = {
      move: u(require_move()),
      moveSync: require_move_sync()
    };
  }
});

// node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/index.js
var require_lib = __commonJS({
  "node_modules/.pnpm/fs-extra@11.3.3/node_modules/fs-extra/lib/index.js"(exports, module) {
    "use strict";
    module.exports = {
      // Export promiseified graceful-fs:
      ...require_fs(),
      // Export extra methods:
      ...require_copy2(),
      ...require_empty(),
      ...require_ensure(),
      ...require_json(),
      ...require_mkdirs(),
      ...require_move2(),
      ...require_output_file(),
      ...require_path_exists(),
      ...require_remove()
    };
  }
});

// scripts/generate-ledgerlight.ts
import { mkdir } from "fs/promises";

// src/scanner/fs-walker.ts
import { readdir, stat } from "fs/promises";
import { join as join2, relative } from "path";

// src/scanner/gitignore.ts
import { readFile } from "fs/promises";
import { join } from "path";
var DEFAULT_IGNORES = [
  "node_modules",
  "dist",
  "build",
  "coverage",
  ".git",
  ".next",
  ".nuxt",
  ".turbo",
  ".cache",
  ".venv",
  "venv",
  "__pycache__",
  "target",
  ".idea",
  ".vscode",
  "*.tsbuildinfo"
];
async function loadIgnorePatterns(rootDir) {
  const patterns = [...DEFAULT_IGNORES];
  try {
    const content = await readFile(join(rootDir, ".gitignore"), "utf-8");
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      if (trimmed.startsWith("!")) continue;
      patterns.push(trimmed.replace(/^\//, "").replace(/\/$/, ""));
    }
  } catch {
  }
  return patterns;
}
function shouldIgnore(relativePath, patterns) {
  const normalized = relativePath.replace(/\\/g, "/");
  const parts = normalized.split("/");
  for (const pattern of patterns) {
    const p = pattern.replace(/\\/g, "/").replace(/^\*\//, "");
    if (p.includes("*")) {
      const regex = globToRegExp(p);
      if (regex.test(normalized) || parts.some((part) => regex.test(part))) {
        return true;
      }
    } else {
      if (parts.includes(p) || normalized === p || normalized.startsWith(p + "/")) {
        return true;
      }
    }
  }
  return false;
}
function globToRegExp(glob) {
  const escaped = glob.replace(/[.+^${}()|[\]\\]/g, "\\$&").replace(/\*\*/g, "::DOUBLE::").replace(/\*/g, "[^/]*").replace(/::DOUBLE::/g, ".*");
  return new RegExp(`^${escaped}$`);
}

// src/scanner/secrets.ts
var SECRET_BASENAME_PATTERNS = [
  /^\.env$/,
  /^\.env\..+$/,
  /\.pem$/i,
  /\.key$/i,
  /\.p12$/i,
  /\.pfx$/i,
  /credentials/i,
  /secret/i,
  /^id_rsa$/,
  /^id_ed25519$/,
  /\.keystore$/i
];
var SECRET_PATH_FRAGMENTS = [
  "/.ssh/",
  "\\.ssh\\",
  "/secrets/",
  "\\secrets\\"
];
function isSecretPath(relativePath) {
  const normalized = relativePath.replace(/\\/g, "/");
  const base = normalized.split("/").pop() ?? normalized;
  if (SECRET_BASENAME_PATTERNS.some((re) => re.test(base))) {
    return true;
  }
  if (SECRET_PATH_FRAGMENTS.some((f) => normalized.toLowerCase().includes(f.replace(/\\/g, "/")))) {
    return true;
  }
  if (base === ".npmrc") {
    return true;
  }
  return false;
}
function isEnvConfigPath(relativePath) {
  const base = relativePath.replace(/\\/g, "/").split("/").pop() ?? "";
  return /^\.env(\..+)?$/.test(base);
}

// src/scanner/types.ts
var DEFAULT_SCAN_LIMITS = {
  maxDepth: 4,
  maxFiles: 2e3,
  maxFileSizeBytes: 256 * 1024
};

// src/scanner/fs-walker.ts
async function walkProject(rootDir, limits = DEFAULT_SCAN_LIMITS) {
  const ignorePatterns = await loadIgnorePatterns(rootDir);
  const files = [];
  const dirs = [];
  let hasEnvFiles = false;
  let truncated = false;
  async function walk(absDir, depth) {
    if (truncated) return;
    if (depth > limits.maxDepth) return;
    if (files.length >= limits.maxFiles) {
      truncated = true;
      return;
    }
    let entries;
    try {
      entries = await readdir(absDir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (truncated || files.length >= limits.maxFiles) {
        truncated = true;
        return;
      }
      const abs = join2(absDir, entry.name);
      const rel = relative(rootDir, abs).replace(/\\/g, "/");
      if (shouldIgnore(rel, ignorePatterns)) continue;
      if (entry.isDirectory()) {
        if (depth < limits.maxDepth) {
          dirs.push(rel);
          await walk(abs, depth + 1);
        }
        continue;
      }
      if (!entry.isFile()) continue;
      if (isEnvConfigPath(rel)) {
        hasEnvFiles = true;
        continue;
      }
      if (isSecretPath(rel)) {
        continue;
      }
      try {
        const s = await stat(abs);
        if (s.size > limits.maxFileSizeBytes) continue;
      } catch {
        continue;
      }
      files.push(rel);
    }
  }
  await walk(rootDir, 0);
  return { files, dirs, hasEnvFiles, truncated };
}

// src/scanner/manifests/package-json.ts
import { readFile as readFile2 } from "fs/promises";
import { join as join3 } from "path";
async function readPackageJson(rootDir) {
  const path = join3(rootDir, "package.json");
  try {
    const raw = await readFile2(path, "utf-8");
    const pkg = JSON.parse(raw);
    const bin = normalizeBin(pkg.bin);
    const evidence = {
      path: "package.json",
      dependencies: isStringRecord(pkg.dependencies) ? pkg.dependencies : {},
      devDependencies: isStringRecord(pkg.devDependencies) ? pkg.devDependencies : {},
      peerDependencies: isStringRecord(pkg.peerDependencies) ? pkg.peerDependencies : {}
    };
    if (typeof pkg.name === "string") evidence.name = pkg.name;
    if (typeof pkg.version === "string") evidence.version = pkg.version;
    if (typeof pkg.description === "string") evidence.description = pkg.description;
    if (typeof pkg.license === "string") evidence.license = pkg.license;
    if (typeof pkg.type === "string") evidence.type = pkg.type;
    if (bin) evidence.bin = bin;
    if (isStringRecord(pkg.engines)) evidence.engines = pkg.engines;
    if (isStringRecord(pkg.scripts)) evidence.scripts = pkg.scripts;
    return evidence;
  } catch {
    return void 0;
  }
}
function normalizeBin(bin) {
  if (!bin) return void 0;
  if (typeof bin === "string") {
    return { default: bin };
  }
  if (isStringRecord(bin)) return bin;
  return void 0;
}
function isStringRecord(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  return Object.values(value).every((v) => typeof v === "string");
}

// src/scanner/manifests/lockfiles.ts
import { access } from "fs/promises";
import { join as join4 } from "path";
var LOCKFILES = [
  { file: "pnpm-lock.yaml", packageManager: "pnpm" },
  { file: "package-lock.json", packageManager: "npm" },
  { file: "yarn.lock", packageManager: "yarn" },
  { file: "bun.lock", packageManager: "bun" },
  { file: "bun.lockb", packageManager: "bun" }
];
async function detectLockfiles(rootDir) {
  const found = [];
  for (const { file, packageManager } of LOCKFILES) {
    try {
      await access(join4(rootDir, file));
      found.push({ path: file, packageManager });
    } catch {
    }
  }
  const managers = new Set(found.map((l) => l.packageManager));
  return {
    lockfiles: found,
    conflict: managers.size > 1
  };
}

// src/scanner/catalog/npm-capabilities.json
var npm_capabilities_default = [
  { package: "commander", category: "cli", capability: "cli-framework" },
  { package: "yargs", category: "cli", capability: "cli-framework" },
  { package: "oclif", category: "cli", capability: "cli-framework" },
  { package: "cac", category: "cli", capability: "cli-framework" },
  { package: "clipanion", category: "cli", capability: "cli-framework" },
  { package: "inquirer", category: "cli", capability: "interactive-prompts" },
  { package: "@inquirer/prompts", category: "cli", capability: "interactive-prompts" },
  { package: "chalk", category: "cli", capability: "terminal-styling" },
  { package: "ora", category: "cli", capability: "terminal-spinner" },
  { package: "fs-extra", category: "filesystem", capability: "filesystem" },
  { package: "zod", category: "validation", capability: "schema-validation" },
  { package: "joi", category: "validation", capability: "schema-validation" },
  { package: "express", category: "http", capability: "http-server" },
  { package: "fastify", category: "http", capability: "http-server" },
  { package: "hono", category: "http", capability: "http-server" },
  { package: "koa", category: "http", capability: "http-server" },
  { package: "@nestjs/core", category: "http", capability: "http-framework" },
  { package: "next", category: "application", capability: "fullstack-framework" },
  { package: "react", category: "ui", capability: "ui-framework" },
  { package: "vue", category: "ui", capability: "ui-framework" },
  { package: "angular", category: "ui", capability: "ui-framework" },
  { package: "@angular/core", category: "ui", capability: "ui-framework" },
  { package: "vitest", category: "testing", capability: "test-runner" },
  { package: "jest", category: "testing", capability: "test-runner" },
  { package: "@vitest/coverage-v8", category: "testing", capability: "coverage" },
  { package: "playwright", category: "testing", capability: "e2e" },
  { package: "cypress", category: "testing", capability: "e2e" },
  { package: "supertest", category: "testing", capability: "api-testing" },
  { package: "tsup", category: "build", capability: "bundler" },
  { package: "vite", category: "build", capability: "bundler" },
  { package: "webpack", category: "build", capability: "bundler" },
  { package: "esbuild", category: "build", capability: "bundler" },
  { package: "typescript", category: "language", capability: "typescript" },
  { package: "eslint", category: "lint", capability: "linter" },
  { package: "prettier", category: "formatter", capability: "formatter" },
  { package: "vitepress", category: "docs", capability: "docs-framework" },
  { package: "openai", category: "ai", capability: "ai-sdk" },
  { package: "@anthropic-ai/sdk", category: "ai", capability: "ai-sdk" },
  { package: "@google/generative-ai", category: "ai", capability: "ai-sdk" },
  { package: "prisma", category: "database", capability: "orm" },
  { package: "@prisma/client", category: "database", capability: "orm" },
  { package: "pg", category: "database", capability: "postgres-client" },
  { package: "mysql2", category: "database", capability: "mysql-client" },
  { package: "mongoose", category: "database", capability: "mongodb-orm" },
  { package: "mongodb", category: "database", capability: "mongodb-client" },
  { package: "better-sqlite3", category: "database", capability: "sqlite-client" },
  { package: "drizzle-orm", category: "database", capability: "orm" },
  { package: "typeorm", category: "database", capability: "orm" },
  { package: "sequelize", category: "database", capability: "orm" },
  { package: "redis", category: "database", capability: "cache-client" },
  { package: "ioredis", category: "database", capability: "cache-client" }
];

// src/scanner/catalog/classify.ts
var catalog = npm_capabilities_default;
function classifyDependencies(dependencies, source) {
  const byName = new Map(catalog.map((e) => [e.package, e]));
  const hits = [];
  const confidence = "confirmed";
  for (const name of Object.keys(dependencies)) {
    const entry = byName.get(name);
    if (entry) {
      hits.push({
        package: name,
        category: entry.category,
        capability: entry.capability,
        source,
        confidence
      });
    }
  }
  return hits;
}
function packagesInCategory(hits, category) {
  return hits.filter((h) => h.category === category).map((h) => h.package);
}
function firstCapability(hits, category) {
  const hit = hits.find((h) => h.category === category);
  return hit?.package ?? null;
}

// src/scanner/detectors/language.ts
function detectLanguages(pkg, configFiles) {
  const languages = [];
  const hasTsConfig = configFiles.some((c) => c.kind === "tsconfig");
  const hasTypescript = !!pkg?.dependencies["typescript"] || !!pkg?.devDependencies["typescript"] || hasTsConfig;
  if (hasTypescript) {
    languages.push("TypeScript");
  } else if (pkg) {
    languages.push("JavaScript");
  }
  return languages;
}
function detectRuntime(pkg, languages) {
  if (!languages.includes("TypeScript") && !languages.includes("JavaScript")) {
    return void 0;
  }
  const nodeRange = pkg?.engines?.node;
  return {
    name: "Node.js",
    ...nodeRange ? { versionRange: nodeRange } : {}
  };
}
function detectModuleSystem(pkg) {
  if (!pkg) return "unknown";
  if (pkg.type === "module") return "esm";
  if (pkg.type === "commonjs") return "cjs";
  return "unknown";
}

// src/scanner/detectors/project-traits.ts
function detectTraits(pkg, capabilities, httpFrameworks, hasDocsTool) {
  const traits = /* @__PURE__ */ new Set();
  if (pkg?.bin && Object.keys(normalizeBin2(pkg.bin)).length > 0) {
    traits.add("cli");
  }
  const cliFw = capabilities.some((c) => c.capability === "cli-framework");
  if (cliFw) {
    traits.add("cli");
  }
  if (httpFrameworks.length > 0) {
    traits.add("backend_api");
  }
  if (capabilities.some((c) => c.category === "ui")) {
    traits.add("web_frontend");
  }
  if (capabilities.some((c) => c.package === "next")) {
    traits.add("fullstack");
  }
  if (capabilities.some((c) => c.category === "ai")) {
    traits.add("ai_integration");
  }
  if (hasDocsTool) {
    traits.add("documentation");
  }
  return [...traits];
}
function normalizeBin2(bin) {
  if (!bin) return {};
  if (typeof bin === "string") return { default: bin };
  return bin;
}
function displayTypeFromTraits(traits) {
  if (traits.includes("cli") && !traits.includes("backend_api") && !traits.includes("web_frontend")) {
    return "CLI Tool";
  }
  if (traits.includes("fullstack")) return "Fullstack Application";
  if (traits.includes("backend_api") && traits.includes("web_frontend")) return "Fullstack Application";
  if (traits.includes("backend_api")) return "Backend API";
  if (traits.includes("web_frontend")) return "Web Frontend";
  if (traits.includes("library")) return "Library";
  if (traits.includes("documentation") && traits.length === 1) return "Documentation";
  if (traits.length === 0) return "Unknown";
  return traits.map((t) => t.replace(/_/g, " ")).join(" + ");
}

// src/scanner/detectors/frameworks.ts
function detectFrameworks(capabilities, configFiles) {
  const app = firstCapability(capabilities, "application") ?? (capabilities.find((c) => c.package === "next")?.package ?? null);
  const uiPkg = firstCapability(capabilities, "ui");
  const cliPkg = capabilities.find((c) => c.capability === "cli-framework")?.package ?? null;
  const docsPkg = firstCapability(capabilities, "docs");
  const testRunner = capabilities.find((c) => c.capability === "test-runner")?.package ?? null;
  const testPkg = testRunner ?? firstCapability(capabilities, "testing");
  const buildPkg = firstCapability(capabilities, "build");
  const lintPkg = firstCapability(capabilities, "lint") ?? (configFiles.some((c) => c.kind === "eslint") ? "eslint" : null);
  const formatterPkg = firstCapability(capabilities, "formatter") ?? (configFiles.some((c) => c.kind === "prettier") ? "prettier" : null);
  let test = testPkg;
  if (configFiles.some((c) => c.kind === "vitest") && !test) {
    test = "vitest";
  }
  if (configFiles.some((c) => c.kind === "jest") && !test) {
    test = "jest";
  }
  return {
    application: app,
    ui: uiPkg,
    cli: cliPkg,
    docs: docsPkg,
    test,
    build: buildPkg ?? (configFiles.some((c) => c.kind === "tsup") ? "tsup" : null),
    lint: lintPkg,
    formatter: formatterPkg
  };
}
function detectHttpFrameworks(capabilities) {
  return packagesInCategory(capabilities, "http");
}
function detectDatabasePackages(capabilities) {
  return packagesInCategory(capabilities, "database");
}
function detectCoverageTool(capabilities) {
  const hit = capabilities.find((c) => c.capability === "coverage");
  if (hit) return hit.package;
  if (capabilities.some((c) => c.package === "vitest")) {
    return null;
  }
  return null;
}

// src/scanner/detectors/cicd.ts
import { readFile as readFile3, readdir as readdir2 } from "fs/promises";
import { join as join5 } from "path";
async function detectCicd(rootDir) {
  const ghDir = join5(rootDir, ".github", "workflows");
  let workflowFiles = [];
  try {
    const entries = await readdir2(ghDir);
    workflowFiles = entries.filter((f) => /\.(yml|yaml)$/i.test(f)).map((f) => `.github/workflows/${f}`);
  } catch {
  }
  if (workflowFiles.length === 0) {
    const others = await detectOtherCi(rootDir);
    if (others) return others;
    return { provider: null, status: "absent", paths: [] };
  }
  const statuses = [];
  for (const rel of workflowFiles) {
    try {
      const content = await readFile3(join5(rootDir, rel), "utf-8");
      statuses.push(classifyWorkflowContent(content));
    } catch {
      statuses.push("unverifiable");
    }
  }
  const overall = aggregateStatus(statuses);
  return {
    provider: "GitHub Actions",
    status: overall,
    paths: workflowFiles
  };
}
function classifyWorkflowContent(content) {
  const trimmed = content.trim();
  if (!trimmed) return "empty";
  const lines = content.split(/\r?\n/);
  const nonEmpty = lines.filter((l) => l.trim().length > 0);
  if (nonEmpty.length === 0) return "empty";
  const uncommented = nonEmpty.filter((l) => !l.trim().startsWith("#"));
  if (uncommented.length === 0) return "present_commented";
  const hasOn = uncommented.some((l) => /^\s*on\s*:/.test(l));
  const hasJobs = uncommented.some((l) => /^\s*jobs\s*:/.test(l));
  if (hasOn || hasJobs) return "active";
  if (uncommented.length < nonEmpty.length * 0.2) return "present_commented";
  return "unverifiable";
}
function aggregateStatus(statuses) {
  if (statuses.includes("active")) return "active";
  if (statuses.every((s) => s === "present_commented")) return "present_commented";
  if (statuses.every((s) => s === "empty")) return "empty";
  if (statuses.includes("present_commented")) return "present_commented";
  return "unverifiable";
}
async function detectOtherCi(rootDir) {
  const candidates = [
    { file: ".gitlab-ci.yml", provider: "GitLab CI" },
    { file: ".circleci/config.yml", provider: "CircleCI" }
  ];
  for (const { file, provider } of candidates) {
    try {
      const content = await readFile3(join5(rootDir, file), "utf-8");
      return {
        provider,
        status: classifyWorkflowContent(content),
        paths: [file]
      };
    } catch {
    }
  }
  return null;
}

// src/scanner/detectors/structure.ts
var INTERESTING_TOP_DIRS = /* @__PURE__ */ new Set([
  "src",
  "lib",
  "app",
  "apps",
  "packages",
  "tests",
  "test",
  "docs",
  "templates",
  "locales",
  "scripts",
  "bin",
  "cmd",
  "internal",
  "services",
  "engines",
  "commands",
  "config",
  "utils",
  "types"
]);
function detectStructure(dirs, pkg, files) {
  const topLevel = dirs.filter((d) => !d.includes("/")).filter((d) => INTERESTING_TOP_DIRS.has(d) || d.startsWith("src"));
  const srcChildren = dirs.filter((d) => d.startsWith("src/") && d.split("/").length === 2).slice(0, 30);
  const observedDirs = [.../* @__PURE__ */ new Set([...topLevel, ...srcChildren])].sort();
  const entrypoints = [];
  if (pkg?.bin) {
    const bin = typeof pkg.bin === "string" ? { default: pkg.bin } : pkg.bin;
    for (const target of Object.values(bin)) {
      entrypoints.push(target.replace(/^\.\//, ""));
    }
  }
  for (const candidate of ["src/index.ts", "src/index.js", "src/main.ts", "index.ts", "index.js"]) {
    if (files.includes(candidate) && !entrypoints.includes(candidate)) {
      entrypoints.push(candidate);
    }
  }
  return { dirs: observedDirs, entrypoints };
}
function classifyConfigFiles(files) {
  const result = [];
  for (const f of files) {
    const base = f.split("/").pop() ?? f;
    if (/^tsconfig.*\.json$/i.test(base)) {
      result.push({ path: f, kind: "tsconfig" });
    } else if (/vitest\.config\./i.test(base)) {
      result.push({ path: f, kind: "vitest" });
    } else if (/jest\.config\./i.test(base)) {
      result.push({ path: f, kind: "jest" });
    } else if (/eslint\.config\./i.test(base) || base === ".eslintrc.js" || base === ".eslintrc.cjs") {
      result.push({ path: f, kind: "eslint" });
    } else if (base === ".prettierrc" || base === ".prettierrc.json" || /prettier\.config\./i.test(base)) {
      result.push({ path: f, kind: "prettier" });
    } else if (/tsup\.config\./i.test(base)) {
      result.push({ path: f, kind: "tsup" });
    } else if (/vite\.config\./i.test(base)) {
      result.push({ path: f, kind: "vite" });
    } else if (f.includes(".vitepress")) {
      result.push({ path: f, kind: "vitepress" });
    }
  }
  return result;
}

// src/scanner/index.ts
async function scanProject(rootDir) {
  const warnings = [];
  const walk = await walkProject(rootDir, DEFAULT_SCAN_LIMITS);
  if (walk.truncated) {
    warnings.push("Filesystem scan truncated due to file/depth limits.");
  }
  const packageJson = await readPackageJson(rootDir);
  const { lockfiles, conflict } = await detectLockfiles(rootDir);
  if (conflict) {
    warnings.push(
      `Multiple package manager lockfiles detected: ${lockfiles.map((l) => l.path).join(", ")}. Do not assume a single package manager.`
    );
  }
  const configFiles = classifyConfigFiles(walk.files);
  const prodCaps = packageJson ? classifyDependencies(packageJson.dependencies, "package_manifest") : [];
  const devCaps = packageJson ? classifyDependencies(packageJson.devDependencies, "devDependencies") : [];
  const capabilities = [...prodCaps, ...devCaps];
  const languages = detectLanguages(packageJson, configFiles);
  const runtime = detectRuntime(packageJson, languages);
  const httpFrameworks = detectHttpFrameworks(capabilities);
  const databasePackages = detectDatabasePackages(capabilities);
  const frameworks = detectFrameworks(capabilities, configFiles);
  const hasDocsTool = !!frameworks.docs || configFiles.some((c) => c.kind === "vitepress");
  const traits = detectTraits(packageJson, capabilities, httpFrameworks, hasDocsTool);
  const cicd = await detectCicd(rootDir);
  const structure = detectStructure(walk.dirs, packageJson, walk.files);
  const isGreenfield = !packageJson && lockfiles.length === 0;
  const result = {
    rootDir,
    scannedAt: (/* @__PURE__ */ new Date()).toISOString(),
    isGreenfield,
    lockfiles,
    packageManagerConflict: conflict,
    configFiles,
    traits,
    languages,
    frameworks,
    capabilities,
    databasePackages,
    httpFrameworks,
    cicd,
    structure,
    warnings,
    hasEnvFiles: walk.hasEnvFiles
  };
  if (packageJson) result.packageJson = packageJson;
  if (runtime) result.runtime = runtime;
  return result;
}

// src/context/types.ts
function fact(value, source, confidence, evidence = []) {
  return { value, source, confidence, evidence };
}

// src/context/fact-resolver.ts
function resolveFacts(evidence, answers2, _options = {}) {
  const unknowns = [];
  const conflicts = [];
  const warnings = [...evidence.warnings];
  const recommendations = [];
  if (answers2.aiRecommendations) {
    for (const r of answers2.aiRecommendations) {
      recommendations.push({ ...r, source: "ai_generated" });
    }
  }
  const pkg = evidence.packageJson;
  const pkgPath = pkg?.path ?? "package.json";
  const name = resolveIdentityName(pkg, answers2, conflicts, pkgPath);
  const version = resolveVersion(pkg, answers2, conflicts, warnings, pkgPath);
  const description = answers2.aiProse?.enhancedDescription ? fact(answers2.aiProse.enhancedDescription, "ai_generated", "medium", []) : fact(answers2.projectDescription, "user", "confirmed", []);
  const identity = {
    name,
    version,
    description
  };
  if (pkg?.license) {
    identity.license = fact(pkg.license, "package_manifest", "confirmed", [
      { path: pkgPath, detail: "license" }
    ]);
  }
  if (pkg?.engines) {
    identity.engines = fact(pkg.engines, "package_manifest", "confirmed", [
      { path: pkgPath, detail: "engines" }
    ]);
  }
  const moduleSystem = detectModuleSystem(pkg);
  identity.moduleSystem = fact(
    moduleSystem,
    pkg?.type ? "package_manifest" : "inferred",
    pkg?.type ? "confirmed" : "low",
    pkg?.type ? [{ path: pkgPath, detail: "type" }] : []
  );
  if (pkg?.bin) {
    const bin = typeof pkg.bin === "string" ? { default: pkg.bin } : pkg.bin;
    identity.bin = fact(bin, "package_manifest", "confirmed", [
      { path: pkgPath, detail: "bin" }
    ]);
  }
  const traits = fact(
    evidence.traits,
    evidence.traits.length > 0 ? "repository" : "inferred",
    evidence.traits.length > 0 ? "high" : "low",
    evidence.traits.length > 0 ? [{ path: pkgPath, detail: "traits" }] : []
  );
  if (evidence.traits.length === 0 && !evidence.isGreenfield) {
    unknowns.push({
      field: "traits",
      reason: "insufficient_evidence",
      note: "Could not classify project type from repository signals."
    });
  }
  let languages = evidence.languages;
  if (answers2.language && answers2.language !== null) {
    if (languages.length > 0 && !languages.map((l) => l.toLowerCase()).includes(answers2.language.toLowerCase())) {
      conflicts.push({
        field: "languages",
        observed: fact(languages, "repository", "high", [{ path: pkgPath }]),
        declared: fact([answers2.language], "user", "confirmed", []),
        resolution: "prefer_observed",
        warning: `User declared language "${answers2.language}" but repository indicates ${languages.join(", ")}.`
      });
      warnings.push(conflicts[conflicts.length - 1].warning);
    } else if (languages.length === 0) {
      languages = [answers2.language];
    }
  }
  if (languages.length === 0) {
    unknowns.push({ field: "languages", reason: "not_detected" });
  }
  const languagesFact = fact(
    languages,
    evidence.languages.length > 0 ? "repository" : answers2.language ? "user" : "inferred",
    evidence.languages.length > 0 ? "confirmed" : answers2.language ? "confirmed" : "low",
    evidence.languages.length > 0 ? [{ path: "tsconfig.json or package.json", detail: "language" }] : []
  );
  const runtime = fact(
    evidence.runtime ?? null,
    evidence.runtime ? "package_manifest" : "inferred",
    evidence.runtime?.versionRange ? "confirmed" : evidence.runtime ? "medium" : "low",
    evidence.runtime ? [{ path: pkgPath, detail: "engines.node" }] : []
  );
  const packageManager = resolvePackageManager(evidence, warnings);
  const frameworks = resolveFrameworks(evidence, answers2, conflicts, unknowns, warnings);
  const prodHits = evidence.capabilities.filter((c) => c.source === "package_manifest");
  const devHits = evidence.capabilities.filter((c) => c.source === "devDependencies");
  const raw = {
    dependencies: Object.keys(pkg?.dependencies ?? {}),
    devDependencies: Object.keys(pkg?.devDependencies ?? {}),
    peerDependencies: Object.keys(pkg?.peerDependencies ?? {})
  };
  const dbDetected = evidence.databasePackages.length > 0;
  if (answers2.database && answers2.database !== null && !dbDetected) {
    conflicts.push({
      field: "database",
      observed: fact(
        { detected: false, packages: [], confidence: "confirmed" },
        "repository",
        "high",
        [{ path: pkgPath }]
      ),
      declared: fact(
        { detected: true, packages: [answers2.database], confidence: "medium" },
        "user",
        "confirmed",
        []
      ),
      resolution: "keep_both",
      warning: `User declared database "${answers2.database}" but no database packages were detected in package.json.`
    });
    warnings.push(conflicts[conflicts.length - 1].warning);
  }
  const database = fact(
    {
      detected: dbDetected,
      packages: evidence.databasePackages,
      confidence: dbDetected ? "medium" : "confirmed"
    },
    "package_manifest",
    dbDetected ? "medium" : "confirmed",
    dbDetected ? evidence.databasePackages.map((p) => ({ path: pkgPath, detail: `dependencies.${p}` })) : [{ path: pkgPath, detail: "no database packages" }]
  );
  const httpServer = fact(
    {
      detected: evidence.httpFrameworks.length > 0,
      frameworks: evidence.httpFrameworks
    },
    "package_manifest",
    "confirmed",
    evidence.httpFrameworks.map((f) => ({ path: pkgPath, detail: f }))
  );
  const architecture = {
    observedStructure: fact(evidence.structure, "filesystem", "high", [
      { path: ".", detail: "directory scan" }
    ])
  };
  if (answers2.architecturalStyle) {
    architecture.style = fact(answers2.architecturalStyle, "user", "confirmed", []);
  }
  const commands = fact(
    pkg?.scripts ?? {},
    "package_manifest",
    "confirmed",
    [{ path: pkgPath, detail: "scripts" }]
  );
  const coverage = detectCoverageTool(evidence.capabilities);
  const testing = {
    runner: fact(
      evidence.frameworks.test,
      evidence.frameworks.test ? "package_manifest" : "inferred",
      evidence.frameworks.test ? "confirmed" : "low",
      evidence.frameworks.test ? [{ path: pkgPath, detail: evidence.frameworks.test }] : []
    ),
    coverageTool: fact(
      coverage,
      coverage ? "package_manifest" : "inferred",
      coverage ? "confirmed" : "low",
      coverage ? [{ path: pkgPath, detail: coverage }] : []
    ),
    preferTdd: fact(answers2.useTDD, "user", "confirmed", [])
  };
  const cicd = fact(evidence.cicd, "configuration", evidence.cicd.status === "absent" ? "confirmed" : "high", [
    ...evidence.cicd.paths.map((p) => ({ path: p }))
  ]);
  const securityCaps = deriveSecurityCapabilities(evidence, answers2);
  const securityCapabilities = fact(securityCaps, "inferred", "high", [
    { path: pkgPath, detail: "capability-based" }
  ]);
  const business = {
    problemImportance: fact(
      answers2.aiProse?.problemImportance ?? answers2.problemImportance,
      answers2.aiProse?.problemImportance ? "ai_generated" : "user",
      "confirmed",
      []
    ),
    targetUsers: fact(answers2.targetUsers, "user", "confirmed", []),
    businessGoals: fact(
      answers2.aiProse?.businessGoals ? answers2.aiProse.businessGoals.map((g) => `- ${g}`).join("\n") : answers2.businessGoals,
      answers2.aiProse?.businessGoals ? "ai_generated" : "user",
      "confirmed",
      []
    ),
    technicalConstraints: fact(answers2.technicalConstraints, "user", "confirmed", []),
    businessConstraints: fact(answers2.businessConstraints, "user", "confirmed", []),
    nonGoals: fact(answers2.nonGoals, "user", "confirmed", [])
  };
  if (evidence.isGreenfield) {
    unknowns.push({
      field: "repository",
      reason: "not_detected",
      note: "Greenfield project \u2014 little or no repository evidence."
    });
  }
  if (!dbDetected) {
  }
  return {
    identity,
    traits,
    languages: languagesFact,
    runtime,
    packageManager,
    frameworks,
    dependencies: {
      production: fact(prodHits, "package_manifest", "confirmed", [{ path: pkgPath }]),
      development: fact(devHits, "package_manifest", "confirmed", [{ path: pkgPath, detail: "devDependencies" }]),
      raw
    },
    database,
    httpServer,
    architecture,
    commands,
    testing,
    cicd,
    securityCapabilities,
    business,
    unknowns,
    conflicts,
    recommendations,
    warnings,
    projectMode: evidence.isGreenfield ? "greenfield" : "existing",
    displayType: displayTypeFromTraits(evidence.traits)
  };
}
function resolveIdentityName(pkg, answers2, conflicts, pkgPath) {
  if (pkg?.name && answers2.projectName && pkg.name !== answers2.projectName) {
    conflicts.push({
      field: "identity.name",
      observed: fact(pkg.name, "package_manifest", "confirmed", [{ path: pkgPath, detail: "name" }]),
      declared: fact(answers2.projectName, "user", "confirmed", []),
      resolution: "prefer_observed",
      warning: `Package name "${pkg.name}" differs from user project name "${answers2.projectName}".`
    });
    return fact(pkg.name, "package_manifest", "confirmed", [{ path: pkgPath, detail: "name" }]);
  }
  if (pkg?.name) {
    return fact(pkg.name, "package_manifest", "confirmed", [{ path: pkgPath, detail: "name" }]);
  }
  return fact(answers2.projectName, "user", "confirmed", []);
}
function resolveVersion(pkg, answers2, conflicts, warnings, pkgPath) {
  if (pkg?.version) {
    if (answers2.version && answers2.version !== pkg.version) {
      conflicts.push({
        field: "identity.version",
        observed: fact(pkg.version, "package_manifest", "confirmed", [
          { path: pkgPath, detail: "version" }
        ]),
        declared: fact(answers2.version, "user", "confirmed", []),
        resolution: "prefer_observed",
        warning: `package.json version ${pkg.version} differs from user-declared ${answers2.version}.`
      });
      warnings.push(conflicts[conflicts.length - 1].warning);
    }
    return fact(pkg.version, "package_manifest", "confirmed", [
      { path: pkgPath, detail: "version" }
    ]);
  }
  if (answers2.version) {
    return fact(answers2.version, "user", "confirmed", []);
  }
  return fact("0.0.0", "inferred", "low", []);
}
function resolvePackageManager(evidence, _warnings) {
  if (evidence.lockfiles.length === 0) {
    return fact(null, "inferred", "low", []);
  }
  if (evidence.packageManagerConflict) {
    return fact(
      {
        name: evidence.lockfiles[0].packageManager,
        lockfile: evidence.lockfiles[0].path
      },
      "lockfile",
      "medium",
      evidence.lockfiles.map((l) => ({ path: l.path }))
    );
  }
  const lf = evidence.lockfiles[0];
  return fact(
    { name: lf.packageManager, lockfile: lf.path },
    "lockfile",
    "confirmed",
    [{ path: lf.path }]
  );
}
function resolveFrameworks(evidence, answers2, conflicts, _unknowns, warnings) {
  const fw = evidence.frameworks;
  if (answers2.framework && answers2.framework !== null) {
    const detected = fw.application || fw.ui || fw.cli || fw.docs;
    if (detected && detected !== answers2.framework) {
      const isKnown = answers2.framework === fw.application || answers2.framework === fw.ui || answers2.framework === fw.cli;
      if (!isKnown) {
        conflicts.push({
          field: "frameworks",
          observed: fact(detected, "package_manifest", "high", [
            { path: "package.json" }
          ]),
          declared: fact(answers2.framework, "user", "confirmed", []),
          resolution: "keep_both",
          warning: `User declared framework "${answers2.framework}" but repository evidence points to "${detected}".`
        });
        warnings.push(conflicts[conflicts.length - 1].warning);
      }
    }
  }
  return {
    application: fact(fw.application, "package_manifest", fw.application ? "confirmed" : "confirmed", [
      { path: "package.json" }
    ]),
    ui: fact(fw.ui, "package_manifest", "confirmed", [{ path: "package.json" }]),
    cli: fact(fw.cli, "package_manifest", fw.cli ? "confirmed" : "confirmed", [
      { path: "package.json" }
    ]),
    docs: fact(fw.docs, "package_manifest", "confirmed", [{ path: "package.json" }]),
    test: fact(fw.test, "package_manifest", fw.test ? "confirmed" : "low", [
      { path: "package.json" }
    ]),
    build: fact(fw.build, "package_manifest", fw.build ? "confirmed" : "low", [
      { path: "package.json" }
    ]),
    lint: fact(fw.lint, "package_manifest", fw.lint ? "confirmed" : "low", [
      { path: "package.json" }
    ]),
    formatter: fact(fw.formatter, "package_manifest", fw.formatter ? "confirmed" : "low", [
      { path: "package.json" }
    ])
  };
}
function deriveSecurityCapabilities(evidence, answers2) {
  const caps = /* @__PURE__ */ new Set(["secrets", "filesystem"]);
  if (evidence.traits.includes("cli") || evidence.packageJson?.bin) {
    caps.add("cli_paths");
    caps.add("config_files");
  }
  if (evidence.httpFrameworks.length > 0) {
    caps.add("http_request_validation");
    caps.add("http_headers");
  }
  if (evidence.databasePackages.length > 0) {
    caps.add("query_safety");
  }
  if (evidence.capabilities.some((c) => c.category === "ai")) {
    caps.add("external_ai");
    caps.add("api_keys");
  }
  if (answers2.authenticationMethod) {
    caps.add("authentication");
  }
  if (evidence.hasEnvFiles) {
    caps.add("env_config_present");
  }
  return [...caps];
}

// src/engines/template-engine.ts
import { readFile as readFile4, access as access2 } from "fs/promises";
import { join as join6, dirname } from "path";
import { fileURLToPath } from "url";

// src/context/presenters.ts
function displayOrNone(value) {
  if (value === null || value === void 0 || value === "") return "none";
  return value;
}
function formatFactSource(f) {
  if (f.evidence.length === 0) return f.source;
  const paths = f.evidence.map((e) => e.detail ? `${e.path} (${e.detail})` : e.path);
  return [...new Set(paths)].join(", ");
}
function formatCapabilityTable(hits) {
  if (hits.length === 0) return "_None classified._";
  const rows = hits.map(
    (h) => `| \`${h.package}\` | ${h.category} | ${h.capability} |`
  );
  return ["| Package | Category | Capability |", "|---------|----------|------------|", ...rows].join(
    "\n"
  );
}
function formatRawDeps(names) {
  if (names.length === 0) return "_None._";
  return names.map((n) => `- \`${n}\``).join("\n");
}
function formatScripts(scripts) {
  const keys = Object.keys(scripts);
  if (keys.length === 0) return "_No scripts in package.json._";
  return [
    "| Script | Command |",
    "|--------|---------|",
    ...keys.map((k) => `| \`${k}\` | \`${scripts[k]}\` |`)
  ].join("\n");
}
function formatCicd(cicd) {
  if (cicd.status === "absent") {
    return "**CI/CD:** none detected";
  }
  const paths = cicd.paths.length > 0 ? cicd.paths.map((p) => `\`${p}\``).join(", ") : "n/a";
  const statusNote = cicd.status === "present_commented" ? "Workflow file(s) present but currently commented/disabled. Do not assume CI runs on PRs." : cicd.status === "active" ? "Workflow appears active (has uncommented job definitions)." : cicd.status === "empty" ? "Workflow file(s) empty." : "CI status could not be verified.";
  return [
    `**Provider:** ${cicd.provider ?? "unknown"}`,
    `**Status:** ${cicd.status}`,
    `**Paths:** ${paths}`,
    "",
    statusNote
  ].join("\n");
}
function formatTraits(ctx) {
  const traits = ctx.traits.value;
  if (traits.length === 0) return "Unknown (insufficient evidence)";
  return `${ctx.displayType} (${traits.join(", ")})`;
}
function formatStructure(ctx) {
  const s = ctx.architecture.observedStructure?.value;
  if (!s) return "_Structure not scanned._";
  const dirs = s.dirs.length > 0 ? s.dirs.map((d) => `- \`${d}/\``).join("\n") : "_No notable dirs._";
  const entries = s.entrypoints.length > 0 ? s.entrypoints.map((e) => `- \`${e}\``).join("\n") : "_No entrypoints detected._";
  return `### Directories

${dirs}

### Entrypoints

${entries}`;
}
function formatUnknowns(ctx) {
  if (ctx.unknowns.length === 0) return "_None._";
  return ctx.unknowns.map((u) => `- **${u.field}** (${u.reason})${u.note ? `: ${u.note}` : ""}`).join("\n");
}
function formatConflicts(ctx) {
  if (ctx.conflicts.length === 0) return "_None._";
  return ctx.conflicts.map((c) => `- **${c.field}:** ${c.warning}`).join("\n");
}
function formatSecuritySections(capabilities) {
  return {
    hasHttp: capabilities.includes("http_request_validation"),
    hasDatabase: capabilities.includes("query_safety"),
    hasExternalAi: capabilities.includes("external_ai"),
    hasCli: capabilities.includes("cli_paths"),
    list: capabilities.map((c) => `- ${c}`).join("\n")
  };
}

// src/context/compiler.ts
function compileTemplateData(ctx, answers2) {
  const lang = ctx.languages.value[0] ?? "Unknown";
  const runtime = ctx.runtime.value;
  const pm = ctx.packageManager.value;
  const db = ctx.database.value;
  const http = ctx.httpServer.value;
  const sec = formatSecuritySections(ctx.securityCapabilities.value);
  const cliFw = ctx.frameworks.cli?.value ?? null;
  const appFw = ctx.frameworks.application?.value ?? null;
  const uiFw = ctx.frameworks.ui?.value ?? null;
  const primaryFw = cliFw || appFw || uiFw || null;
  const data = {
    PROJECT_NAME: ctx.identity.name.value,
    VERSION: ctx.identity.version.value,
    PROJECT_DESCRIPTION: ctx.identity.description?.value ?? answers2.projectDescription,
    PROBLEM_IMPORTANCE: ctx.business.problemImportance.value,
    TARGET_USERS: formatTargetUsers(ctx.business.targetUsers.value),
    BUSINESS_GOALS: ctx.business.businessGoals.value,
    TECHNICAL_CONSTRAINTS: ctx.business.technicalConstraints.value ?? "None",
    BUSINESS_CONSTRAINTS: ctx.business.businessConstraints.value ?? "None",
    NON_GOALS: ctx.business.nonGoals.value,
    LANGUAGE: lang,
    RUNTIME: runtime ? runtime.versionRange ? `${runtime.name} ${runtime.versionRange}` : runtime.name : "none detected",
    MODULE_SYSTEM: ctx.identity.moduleSystem?.value === "esm" ? "ESM (ES Modules)" : ctx.identity.moduleSystem?.value === "cjs" ? "CommonJS" : "unknown",
    PACKAGE_MANAGER: pm ? `${pm.name}${pm.lockfile ? ` (lockfile: ${pm.lockfile})` : ""}` : "none detected",
    PROJECT_TYPE: ctx.displayType,
    PROJECT_TRAITS: formatTraits(ctx),
    FRAMEWORK: displayOrNone(primaryFw),
    CLI_FRAMEWORK: displayOrNone(cliFw),
    APPLICATION_FRAMEWORK: displayOrNone(appFw),
    UI_FRAMEWORK: displayOrNone(uiFw),
    DOCS_FRAMEWORK: displayOrNone(ctx.frameworks.docs?.value),
    BUILD_TOOL: displayOrNone(ctx.frameworks.build?.value),
    TEST_FRAMEWORK: displayOrNone(ctx.frameworks.test?.value ?? ctx.testing.runner?.value),
    LINTER: displayOrNone(ctx.frameworks.lint?.value),
    FORMATTER: displayOrNone(ctx.frameworks.formatter?.value),
    COVERAGE_TOOL: displayOrNone(ctx.testing.coverageTool?.value),
    DATABASE: db.detected ? db.packages.join(", ") : "none",
    DATABASE_DETECTED: db.detected ? "true" : "false",
    DATABASE_NOTE: db.detected ? `Database-related packages detected (${db.packages.join(", ")}). This indicates potential use, not necessarily an active database deployment.` : "No database packages detected.",
    HTTP_SERVER: http.detected ? http.frameworks.join(", ") : "none",
    HTTP_DETECTED: http.detected ? "true" : "false",
    ARCHITECTURAL_STYLE: ctx.architecture.style?.value ?? "Not defined (no explicit architectural style declared or evidenced)",
    OBSERVED_STRUCTURE: formatStructure(ctx),
    SOURCE_IDENTITY: formatFactSource(ctx.identity.name),
    SOURCE_VERSION: formatFactSource(ctx.identity.version),
    PRODUCTION_DEPS_TABLE: formatCapabilityTable(ctx.dependencies.production.value),
    DEV_DEPS_TABLE: formatCapabilityTable(ctx.dependencies.development.value),
    PRODUCTION_DEPS_RAW: formatRawDeps(ctx.dependencies.raw.dependencies),
    DEV_DEPS_RAW: formatRawDeps(ctx.dependencies.raw.devDependencies),
    SCRIPTS_TABLE: formatScripts(ctx.commands.value),
    CI_CD: formatCicd(ctx.cicd.value),
    CI_STATUS: ctx.cicd.value.status,
    CI_PROVIDER: ctx.cicd.value.provider ?? "none",
    USE_TDD: answers2.useTDD ? "true" : "false",
    TDD_NOTE: answers2.useTDD ? "User preference: TDD encouraged. No coverage gate is enforced unless configured in the repository." : "User preference: TDD not selected as a preference.",
    STRICT_MODE: answers2.strictMode ? "true" : "false",
    SECURITY_CAPABILITIES: sec.list,
    HAS_HTTP: sec.hasHttp ? "true" : "false",
    HAS_DATABASE: sec.hasDatabase ? "true" : "false",
    HAS_EXTERNAL_AI: sec.hasExternalAi ? "true" : "false",
    HAS_CLI: sec.hasCli ? "true" : "false",
    UNKNOWNS: formatUnknowns(ctx),
    CONFLICTS: formatConflicts(ctx),
    WARNINGS: ctx.warnings.length > 0 ? ctx.warnings.map((w) => `- ${w}`).join("\n") : "_None._",
    KNOWN_ISSUES: formatKnownIssues(ctx),
    ALLOWED_LIBRARIES: formatAllowedLibs(ctx, answers2),
    FORBIDDEN_LIBRARIES: formatForbiddenLibs(answers2),
    AI_PROVIDERS_SECTION: formatAiProviders(ctx),
    ENGINES: ctx.identity.engines ? Object.entries(ctx.identity.engines.value).map(([k, v]) => `- **${k}:** ${v}`).join("\n") : "_Not specified in package.json._",
    BIN: ctx.identity.bin ? Object.entries(ctx.identity.bin.value).map(([k, v]) => `- **${k}:** \`${v}\``).join("\n") : "_No bin entry._",
    LICENSE: ctx.identity.license?.value ?? "not specified",
    // Conditional flags for templates (truthy strings)
    LANGUAGE_TYPESCRIPT: lang === "TypeScript" ? "true" : "false",
    IS_CLI: ctx.traits.value.includes("cli") ? "true" : "false",
    IS_EXISTING: ctx.projectMode === "existing" ? "true" : "false",
    HAS_AI_SDK: ctx.traits.value.includes("ai_integration") ? "true" : "false",
    HAS_CICD_ACTIVE: ctx.cicd.value.status === "active" ? "true" : "false",
    HAS_CICD_COMMENTED: ctx.cicd.value.status === "present_commented" ? "true" : "false",
    HAS_ARCHITECTURE_STYLE: ctx.architecture.style ? "true" : "false",
    // Clear dangerous legacy placeholders — never invent
    AUTHENTICATION: answers2.authenticationMethod ? answers2.authenticationMethod : "Not applicable / not configured for this project type",
    AUTHORIZATION: "Not defined",
    SECURITY_CONSTRAINTS: formatSecurityConstraints(sec),
    COMMUNICATION_PATTERN: http.detected ? `HTTP server frameworks detected: ${http.frameworks.join(", ")}` : ctx.traits.value.includes("cli") ? "CLI process \u2014 local stdin/stdout and filesystem; no product HTTP API detected" : "Not detected",
    INTERACTION_MODEL: ctx.traits.value.includes("cli") ? "Interactive / command-line invocation" : "Not detected",
    SOURCE_OF_TRUTH: "Repository code and package manifests are the source of truth for technical facts. User answers are the source of truth for business intent.",
    CACHING_STRATEGY: "Not detected",
    STATE_MANAGEMENT: "Not detected",
    EXPECTED_SCALE: "Not defined",
    SCALING_STRATEGY: "Not defined",
    FAILURE_HANDLING: "Not defined",
    LOGGING_STRATEGY: "Not defined",
    MONITORING_METRICS: "Not defined",
    ALERTS_INCIDENT_HANDLING: "Not defined",
    DEPLOYMENT_PLATFORM: answers2.deploymentMethod ?? "Not defined",
    DATABASE_CLIENT: db.detected ? db.packages.join(", ") : "none",
    TEST_TOOLS: formatTestTools(ctx),
    ARCHITECTURAL_DECISIONS: ctx.architecture.style ? `- Architectural style (user-declared): ${ctx.architecture.style.value}` : "",
    DESIGN_PATTERNS: "",
    AI_ARCHITECTURAL_STYLE: ctx.architecture.style?.value ?? "",
    ARCHITECTURE_DIAGRAM_HIGH_LEVEL: "",
    ARCHITECTURE_DIAGRAM_COMPONENT: "",
    ARCHITECTURE_TRADE_OFFS: "",
    ARCHITECTURE_LIMITATIONS: "",
    TYPESCRIPT_CONFIG: "",
    ESLINT_CONFIG: ctx.frameworks.lint?.value ? `Linter detected: ${ctx.frameworks.lint.value}. See repository config files.` : "No linter detected.",
    // Advanced / AI usage defaults — do not invent model names
    AI_MODEL_ARCHITECTURE: "Not specified",
    AI_MODEL_IMPLEMENTATION: "Not specified",
    AI_MODEL_REFACTORING: "Not specified",
    AI_MODEL_DEBUG: "Not specified",
    AI_MODEL_BOILERPLATE: "Not specified",
    AI_ALLOW_ARCHITECTURE: "Not specified",
    AI_ALLOW_CODE_GENERATION: "Not specified",
    AI_ALLOW_REFACTORING: "Not specified",
    AI_ALLOW_DEBUG: "Not specified",
    AI_ALLOW_DOCUMENTATION: "Not specified",
    AI_CUSTOM_CONSTRAINTS: "",
    CTO_RESPONSIBILITY: "Define policy and limits",
    TECH_LEAD_RESPONSIBILITY: "Enforce standards and review",
    DEV_RESPONSIBILITY: "Use AI as a tool, not a shortcut",
    ALLOWED_LIBRARIES_CUSTOM: answers2.allowedLibraries?.map((l) => `- ${l}`).join("\n") ?? "",
    FORBIDDEN_LIBRARIES_CUSTOM: answers2.forbiddenLibraries?.map((l) => `- ${l}`).join("\n") ?? "",
    LIBRARY_NOTES: "",
    AUTHENTICATION_METHOD: answers2.authenticationMethod ?? "Not defined",
    DATA_PROTECTION: "Not defined",
    SECURITY_RULES_CUSTOM: answers2.securityRules?.map((r) => `- ${r}`).join("\n") ?? "",
    TEST_STRATEGY: answers2.testStrategy ?? "",
    TEST_COVERAGE: answers2.testCoverage ?? "No coverage minimum is documented as an enforced gate.",
    DEPLOYMENT_METHOD: answers2.deploymentMethod ?? "Not defined",
    INFRASTRUCTURE: "Not defined",
    ENVIRONMENTS: "Not defined",
    DOCUMENTATION_STANDARDS: "Not defined",
    API_DOCUMENTATION: "Not applicable unless an HTTP API is present",
    CODE_COMMENTS: "Not defined",
    FRAMEWORK_EXPRESS: http.frameworks.includes("express") ? "true" : "false",
    FRAMEWORK_NEXTJS: appFw === "next" ? "true" : "false",
    PROJECT_TYPE_REST_API: http.detected && ctx.traits.value.includes("backend_api") ? "true" : "false"
  };
  return data;
}
function formatTargetUsers(users) {
  if (users.includes("-") || users.includes("*")) return users;
  return users.split(",").map((u) => u.trim()).filter(Boolean).map((u) => `- ${u}`).join("\n");
}
function formatAllowedLibs(ctx, answers2) {
  const all = [
    ...ctx.dependencies.production.value,
    ...ctx.dependencies.development.value
  ];
  const lines = all.map(
    (h) => `- \`${h.package}\` \u2014 ${h.capability} (${h.category})`
  );
  const custom = answers2.allowedLibraries?.map((l) => `- ${l} (user-declared)`) ?? [];
  if (lines.length === 0 && custom.length === 0) {
    return "_No dependencies classified. See raw package.json._";
  }
  return [...lines, ...custom].join("\n");
}
function formatForbiddenLibs(answers2) {
  if (answers2.forbiddenLibraries && answers2.forbiddenLibraries.length > 0) {
    return answers2.forbiddenLibraries.map((l) => `- ${l}`).join("\n");
  }
  return "No formal deny-list is defined for this project. Prefer packages already in `package.json` unless explicitly approved.";
}
function formatAiProviders(ctx) {
  const ai = [...ctx.dependencies.production.value, ...ctx.dependencies.development.value].filter(
    (h) => h.category === "ai"
  );
  if (ai.length === 0) {
    return "_No AI provider SDKs detected in package.json._";
  }
  return [
    "AI SDKs present (optional enrichment path \u2014 not required for core context generation):",
    ...ai.map((h) => `- \`${h.package}\``)
  ].join("\n");
}
function formatSecurityConstraints(sec) {
  const lines = [
    "- Never commit secrets or API keys",
    "- Validate filesystem paths; avoid path traversal",
    "- Treat user-provided paths and config carefully"
  ];
  if (sec.hasExternalAi) {
    lines.push("- External AI: API keys stored outside the repo; do not log prompt/response secrets");
    lines.push("- Treat AI-generated content as untrusted until validated");
  }
  if (sec.hasHttp) {
    lines.push("- Validate and sanitize HTTP inputs");
    lines.push("- Configure security headers appropriately for the HTTP stack");
  }
  if (sec.hasDatabase) {
    lines.push("- Use parameterized queries / ORM APIs; never concatenate untrusted input into queries");
  }
  if (sec.hasCli) {
    lines.push("- CLI: safe handling of config directories and overwrite confirmation");
  }
  return lines.join("\n");
}
function formatTestTools(ctx) {
  const tools = [];
  if (ctx.testing.runner?.value) tools.push(`- **Unit/Integration:** ${ctx.testing.runner.value}`);
  if (ctx.testing.coverageTool?.value) {
    tools.push(`- **Coverage:** ${ctx.testing.coverageTool.value}`);
  }
  return tools.length > 0 ? tools.join("\n") : "No test tooling detected.";
}
function formatKnownIssues(ctx) {
  const items = [];
  for (const c of ctx.conflicts) {
    items.push(`### Conflict: ${c.field}

${c.warning}

Resolution: ${c.resolution}`);
  }
  for (const u of ctx.unknowns) {
    items.push(`### Unknown: ${u.field}

Reason: ${u.reason}${u.note ? `

${u.note}` : ""}`);
  }
  if (ctx.cicd.value.status === "present_commented") {
    items.push(
      `### CI inactive

${formatCicd(ctx.cicd.value)}`
    );
  }
  for (const w of ctx.warnings) {
    if (!items.some((i) => i.includes(w))) {
      items.push(`### Warning

${w}`);
    }
  }
  return items.length > 0 ? items.join("\n\n") : "_No known issues recorded from scan._";
}

// src/context/feature-flags.ts
function useEvidenceCompiler() {
  const env2 = process.env.SETAI_EVIDENCE_COMPILER;
  if (env2 === "0" || env2 === "false") {
    return false;
  }
  return true;
}

// src/engines/template-engine.ts
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
async function resolvePackageRoot() {
  const candidates = [
    join6(__dirname, ".."),
    // dist/
    join6(__dirname, "../.."),
    // src/engines/
    join6(__dirname, "../../..")
  ];
  for (const root of candidates) {
    try {
      await access2(join6(root, "templates"));
      return root;
    } catch {
    }
  }
  const isDist = __dirname.includes(`${join6("dist")}`) || /[/\\]dist$/i.test(__dirname);
  return isDist ? join6(__dirname, "..") : join6(__dirname, "../..");
}
function processTemplate(template, data) {
  let result = template;
  let changed = true;
  while (changed) {
    changed = false;
    const ifElsePattern = /\{\{#if\s+(\w+)\}\}((?:[^{]|\{(?!\{)|(?:\{\{[^#])|(?:\{\{#if[^}]*\}\}[^}]*\{\{\/if\}\}))*?)\{\{else\}\}((?:[^{]|\{(?!\{)|(?:\{\{[^#])|(?:\{\{#if[^}]*\}\}[^}]*\{\{\/if\}\}))*?)\{\{\/if\}\}/g;
    result = result.replace(ifElsePattern, (_match, key, ifContent, elseContent) => {
      const value = data[key];
      const isEmpty = !value || value.trim().length === 0 || value === "[A definir]" || value === "[To be defined]";
      const isTrue = !isEmpty && (value === "true" || value !== "false");
      changed = true;
      return isTrue ? ifContent : elseContent;
    });
  }
  const unlessPattern = /\{\{#unless\s+(\w+)\}\}([\s\S]*?)\{\{\/unless\}\}/g;
  result = result.replace(unlessPattern, (_match, key, content) => {
    const value = data[key];
    const isTrue = value === "true" || value && value.trim().length > 0 && value !== "false";
    return !isTrue ? content : "";
  });
  changed = true;
  while (changed) {
    changed = false;
    const conditionalPattern = /\{\{#if\s+(\w+)\}\}((?:[^{]|\{(?!\{)|(?:\{\{[^#])|(?:\{\{#if[^}]*\}\}[^}]*\{\{\/if\}\}))*?)\{\{\/if\}\}/g;
    result = result.replace(conditionalPattern, (_match, key, content) => {
      const value = data[key];
      const isEmpty = !value || value.trim().length === 0 || value === "[A definir]" || value === "[To be defined]";
      const isTrue = !isEmpty && (value === "true" || value !== "false");
      changed = true;
      return isTrue ? content : "";
    });
  }
  for (const [key, value] of Object.entries(data)) {
    const placeholder = `{{${key}}}`;
    const replacement = value && value.trim().length > 0 ? value : "";
    if (!replacement) {
      const emptyLinePattern = new RegExp(
        `^\\s*${placeholder.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*$`,
        "gm"
      );
      result = result.replace(emptyLinePattern, "");
    }
    result = result.replaceAll(placeholder, replacement);
  }
  return result;
}
async function loadTemplate(templatePath, locale) {
  const currentLocale = locale || "en";
  const projectRoot = await resolvePackageRoot();
  const localeMap = {
    "pt-BR": ".cursor",
    en: ".cursor.en",
    es: ".cursor.es"
  };
  const templateDir = localeMap[currentLocale] || ".cursor.en";
  let adjustedPath = templatePath;
  if (templatePath.startsWith(".cursor/")) {
    adjustedPath = templatePath.replace(".cursor/", `${templateDir}/`);
  }
  const fullPath = join6(projectRoot, "templates", adjustedPath);
  try {
    return await readFile4(fullPath, "utf-8");
  } catch {
    if (currentLocale !== "en") {
      const enPath = join6(
        projectRoot,
        "templates",
        templatePath.replace(".cursor/", ".cursor.en/")
      );
      return readFile4(enPath, "utf-8");
    }
    throw new Error(`Template not found: ${fullPath}`);
  }
}
async function processAllTemplates(projectInfo, configFolder = ".cursor", templateLocale = "en", options = {}) {
  const folder = configFolder;
  const processedTemplates = /* @__PURE__ */ new Map();
  const templateMap = [
    { template: ".cursor/README.md.template", destination: `${folder}/README.md` },
    {
      template: ".cursor/context/project-goals.md.template",
      destination: `${folder}/context/project-goals.md`
    },
    {
      template: ".cursor/context/tech-stack.md.template",
      destination: `${folder}/context/tech-stack.md`
    },
    {
      template: ".cursor/context/architecture.md.template",
      destination: `${folder}/context/architecture.md`
    },
    {
      template: ".cursor/context/deployment.md.template",
      destination: `${folder}/context/deployment.md`
    },
    {
      template: ".cursor/context/project-structure.md.template",
      destination: `${folder}/context/project-structure.md`
    },
    {
      template: ".cursor/context/known-issues.md.template",
      destination: `${folder}/context/known-issues.md`
    },
    {
      template: ".cursor/rules/code-style.md.template",
      destination: `${folder}/rules/code-style.md`
    },
    {
      template: ".cursor/rules/testing-rules.md.template",
      destination: `${folder}/rules/testing-rules.md`
    },
    {
      template: ".cursor/rules/git-rules.md.template",
      destination: `${folder}/rules/git-rules.md`
    },
    {
      template: ".cursor/rules/security-rules.md.template",
      destination: `${folder}/rules/security-rules.md`
    },
    {
      template: ".cursor/rules/ai-usage-rules.md.template",
      destination: `${folder}/rules/ai-usage-rules.md`
    },
    {
      template: ".cursor/rules/business-rules.md.template",
      destination: `${folder}/rules/business-rules.md`
    },
    {
      template: ".cursor/libs/allowed-libs.md.template",
      destination: `${folder}/libs/allowed-libs.md`
    },
    {
      template: ".cursor/libs/forbidden-libs.md.template",
      destination: `${folder}/libs/forbidden-libs.md`
    },
    {
      template: ".cursor/libs/ai-providers.md.template",
      destination: `${folder}/libs/ai-providers.md`
    }
  ];
  let templateData;
  if (useEvidenceCompiler() && options.projectContext && options.userAnswers) {
    templateData = compileTemplateData(options.projectContext, options.userAnswers);
  } else if (options.projectContext && options.userAnswers) {
    templateData = compileTemplateData(options.projectContext, options.userAnswers);
  } else {
    templateData = legacySafeTemplateData(projectInfo);
  }
  for (const { template, destination } of templateMap) {
    try {
      const templateContent = await loadTemplate(template, templateLocale);
      const processed = processTemplate(templateContent, templateData);
      processedTemplates.set(destination, processed);
    } catch (err) {
      if (template.includes("project-structure") || template.includes("known-issues") || template.includes("ai-providers")) {
        continue;
      }
      throw err;
    }
  }
  const commandTemplates = [
    "kickoff-project.md",
    "architecture-review.md",
    "extract-business-rules.md",
    "test-strategy.md",
    "generate-boilerplate.md",
    "refactor-controlled.md",
    "generate-docs.md",
    "review-pr.md",
    "challenge-solution.md",
    "pre-deploy-validation.md"
  ];
  for (const command of commandTemplates) {
    const templatePath = `.cursor/commands/${command}.template`;
    const templateContent = await loadTemplate(templatePath, templateLocale);
    const processed = processTemplate(templateContent, templateData);
    processedTemplates.set(`${folder}/commands/${command}`, processed);
  }
  return processedTemplates;
}
function legacySafeTemplateData(projectInfo) {
  const language = projectInfo.techStack.language;
  const framework = projectInfo.techStack.framework ?? "";
  const database = projectInfo.techStack.database ?? "";
  return {
    PROJECT_NAME: projectInfo.projectName,
    LANGUAGE: language,
    FRAMEWORK: framework || "none",
    DATABASE: database || "none",
    VERSION: projectInfo.version,
    PROJECT_DESCRIPTION: projectInfo.projectDescription,
    PROBLEM_IMPORTANCE: projectInfo.problemImportance,
    TARGET_USERS: projectInfo.targetUsers,
    BUSINESS_GOALS: projectInfo.businessGoals,
    TECHNICAL_CONSTRAINTS: projectInfo.technicalConstraints,
    BUSINESS_CONSTRAINTS: projectInfo.businessConstraints,
    NON_GOALS: projectInfo.nonGoals,
    RUNTIME: language === "TypeScript" || language === "JavaScript" ? "Node.js" : "none detected",
    MODULE_SYSTEM: "unknown",
    BUILD_TOOL: "none",
    TEST_FRAMEWORK: "none",
    PROJECT_TYPE: "Unknown",
    PROJECT_TRAITS: "Unknown",
    ARCHITECTURAL_STYLE: "Not defined",
    COMMUNICATION_PATTERN: "Not detected",
    INTERACTION_MODEL: "Not detected",
    SOURCE_OF_TRUTH: "Repository and user answers",
    CACHING_STRATEGY: "Not detected",
    STATE_MANAGEMENT: "Not detected",
    AUTHENTICATION: "Not defined",
    AUTHORIZATION: "Not defined",
    SECURITY_CONSTRAINTS: "- Never commit secrets",
    EXPECTED_SCALE: "Not defined",
    SCALING_STRATEGY: "Not defined",
    FAILURE_HANDLING: "Not defined",
    LOGGING_STRATEGY: "Not defined",
    MONITORING_METRICS: "Not defined",
    ALERTS_INCIDENT_HANDLING: "Not defined",
    AI_ARCHITECTURAL_STYLE: "",
    DATABASE_CLIENT: "none",
    DEPLOYMENT_PLATFORM: "Not defined",
    CI_CD_TOOL: "none detected",
    CI_CD: "none detected",
    TEST_TOOLS: "none detected",
    COVERAGE_TOOL: "none",
    TYPESCRIPT_CONFIG: "",
    ESLINT_CONFIG: "",
    LANGUAGE_TYPESCRIPT: language === "TypeScript" ? "true" : "false",
    FRAMEWORK_EXPRESS: "false",
    FRAMEWORK_NEXTJS: "false",
    PROJECT_TYPE_REST_API: "false",
    STRICT_MODE: projectInfo.preferences?.strictMode ? "true" : "false",
    USE_TDD: projectInfo.preferences?.useTDD ? "true" : "false",
    ARCHITECTURE_DIAGRAM_HIGH_LEVEL: "",
    ARCHITECTURE_DIAGRAM_COMPONENT: "",
    ARCHITECTURE_TRADE_OFFS: "",
    ARCHITECTURE_LIMITATIONS: "",
    ARCHITECTURAL_DECISIONS: "",
    DESIGN_PATTERNS: "",
    OBSERVED_STRUCTURE: "_Not scanned._",
    PACKAGE_MANAGER: "none detected",
    CLI_FRAMEWORK: "none",
    APPLICATION_FRAMEWORK: "none",
    UI_FRAMEWORK: "none",
    DOCS_FRAMEWORK: "none",
    LINTER: "none",
    FORMATTER: "none",
    DATABASE_DETECTED: "false",
    DATABASE_NOTE: "No database packages detected.",
    HTTP_SERVER: "none",
    HTTP_DETECTED: "false",
    SOURCE_IDENTITY: "user",
    SOURCE_VERSION: "user",
    PRODUCTION_DEPS_TABLE: "_None._",
    DEV_DEPS_TABLE: "_None._",
    PRODUCTION_DEPS_RAW: "_None._",
    DEV_DEPS_RAW: "_None._",
    SCRIPTS_TABLE: "_None._",
    CI_STATUS: "absent",
    CI_PROVIDER: "none",
    TDD_NOTE: "User preference only.",
    SECURITY_CAPABILITIES: "- secrets\n- filesystem",
    HAS_HTTP: "false",
    HAS_DATABASE: "false",
    HAS_EXTERNAL_AI: "false",
    HAS_CLI: "false",
    UNKNOWNS: "_None._",
    CONFLICTS: "_None._",
    WARNINGS: "_None._",
    KNOWN_ISSUES: "_None._",
    ALLOWED_LIBRARIES: "_See package.json._",
    FORBIDDEN_LIBRARIES: "No formal deny-list.",
    AI_PROVIDERS_SECTION: "_None detected._",
    ENGINES: "_Not specified._",
    BIN: "_No bin entry._",
    LICENSE: "not specified",
    IS_CLI: "false",
    IS_EXISTING: "false",
    HAS_AI_SDK: "false",
    HAS_CICD_ACTIVE: "false",
    HAS_CICD_COMMENTED: "false",
    HAS_ARCHITECTURE_STYLE: "false",
    AI_MODEL_ARCHITECTURE: "Not specified",
    AI_MODEL_IMPLEMENTATION: "Not specified",
    AI_MODEL_REFACTORING: "Not specified",
    AI_MODEL_DEBUG: "Not specified",
    AI_MODEL_BOILERPLATE: "Not specified",
    AI_ALLOW_ARCHITECTURE: "Not specified",
    AI_ALLOW_CODE_GENERATION: "Not specified",
    AI_ALLOW_REFACTORING: "Not specified",
    AI_ALLOW_DEBUG: "Not specified",
    AI_ALLOW_DOCUMENTATION: "Not specified",
    AI_CUSTOM_CONSTRAINTS: "",
    CTO_RESPONSIBILITY: "Define policy and limits",
    TECH_LEAD_RESPONSIBILITY: "Enforce standards and review",
    DEV_RESPONSIBILITY: "Use AI as a tool, not a shortcut",
    ALLOWED_LIBRARIES_CUSTOM: "",
    FORBIDDEN_LIBRARIES_CUSTOM: "",
    LIBRARY_NOTES: "",
    AUTHENTICATION_METHOD: "Not defined",
    DATA_PROTECTION: "Not defined",
    SECURITY_RULES_CUSTOM: "",
    TEST_STRATEGY: "",
    TEST_COVERAGE: "No coverage minimum enforced.",
    DEPLOYMENT_METHOD: "Not defined",
    INFRASTRUCTURE: "Not defined",
    ENVIRONMENTS: "Not defined",
    DOCUMENTATION_STANDARDS: "Not defined",
    API_DOCUMENTATION: "Not applicable",
    CODE_COMMENTS: "Not defined"
  };
}

// src/engines/file-generator.ts
var import_fs_extra2 = __toESM(require_lib(), 1);
import { join as join9 } from "path";
import { dirname as dirname3 } from "path";

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/vendor/ansi-styles/index.js
var ANSI_BACKGROUND_OFFSET = 10;
var wrapAnsi16 = (offset = 0) => (code) => `\x1B[${code + offset}m`;
var wrapAnsi256 = (offset = 0) => (code) => `\x1B[${38 + offset};5;${code}m`;
var wrapAnsi16m = (offset = 0) => (red, green, blue) => `\x1B[${38 + offset};2;${red};${green};${blue}m`;
var styles = {
  modifier: {
    reset: [0, 0],
    // 21 isn't widely supported and 22 does the same thing
    bold: [1, 22],
    dim: [2, 22],
    italic: [3, 23],
    underline: [4, 24],
    overline: [53, 55],
    inverse: [7, 27],
    hidden: [8, 28],
    strikethrough: [9, 29]
  },
  color: {
    black: [30, 39],
    red: [31, 39],
    green: [32, 39],
    yellow: [33, 39],
    blue: [34, 39],
    magenta: [35, 39],
    cyan: [36, 39],
    white: [37, 39],
    // Bright color
    blackBright: [90, 39],
    gray: [90, 39],
    // Alias of `blackBright`
    grey: [90, 39],
    // Alias of `blackBright`
    redBright: [91, 39],
    greenBright: [92, 39],
    yellowBright: [93, 39],
    blueBright: [94, 39],
    magentaBright: [95, 39],
    cyanBright: [96, 39],
    whiteBright: [97, 39]
  },
  bgColor: {
    bgBlack: [40, 49],
    bgRed: [41, 49],
    bgGreen: [42, 49],
    bgYellow: [43, 49],
    bgBlue: [44, 49],
    bgMagenta: [45, 49],
    bgCyan: [46, 49],
    bgWhite: [47, 49],
    // Bright color
    bgBlackBright: [100, 49],
    bgGray: [100, 49],
    // Alias of `bgBlackBright`
    bgGrey: [100, 49],
    // Alias of `bgBlackBright`
    bgRedBright: [101, 49],
    bgGreenBright: [102, 49],
    bgYellowBright: [103, 49],
    bgBlueBright: [104, 49],
    bgMagentaBright: [105, 49],
    bgCyanBright: [106, 49],
    bgWhiteBright: [107, 49]
  }
};
var modifierNames = Object.keys(styles.modifier);
var foregroundColorNames = Object.keys(styles.color);
var backgroundColorNames = Object.keys(styles.bgColor);
var colorNames = [...foregroundColorNames, ...backgroundColorNames];
function assembleStyles() {
  const codes = /* @__PURE__ */ new Map();
  for (const [groupName, group] of Object.entries(styles)) {
    for (const [styleName, style] of Object.entries(group)) {
      styles[styleName] = {
        open: `\x1B[${style[0]}m`,
        close: `\x1B[${style[1]}m`
      };
      group[styleName] = styles[styleName];
      codes.set(style[0], style[1]);
    }
    Object.defineProperty(styles, groupName, {
      value: group,
      enumerable: false
    });
  }
  Object.defineProperty(styles, "codes", {
    value: codes,
    enumerable: false
  });
  styles.color.close = "\x1B[39m";
  styles.bgColor.close = "\x1B[49m";
  styles.color.ansi = wrapAnsi16();
  styles.color.ansi256 = wrapAnsi256();
  styles.color.ansi16m = wrapAnsi16m();
  styles.bgColor.ansi = wrapAnsi16(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi256 = wrapAnsi256(ANSI_BACKGROUND_OFFSET);
  styles.bgColor.ansi16m = wrapAnsi16m(ANSI_BACKGROUND_OFFSET);
  Object.defineProperties(styles, {
    rgbToAnsi256: {
      value(red, green, blue) {
        if (red === green && green === blue) {
          if (red < 8) {
            return 16;
          }
          if (red > 248) {
            return 231;
          }
          return Math.round((red - 8) / 247 * 24) + 232;
        }
        return 16 + 36 * Math.round(red / 255 * 5) + 6 * Math.round(green / 255 * 5) + Math.round(blue / 255 * 5);
      },
      enumerable: false
    },
    hexToRgb: {
      value(hex) {
        const matches = /[a-f\d]{6}|[a-f\d]{3}/i.exec(hex.toString(16));
        if (!matches) {
          return [0, 0, 0];
        }
        let [colorString] = matches;
        if (colorString.length === 3) {
          colorString = [...colorString].map((character) => character + character).join("");
        }
        const integer = Number.parseInt(colorString, 16);
        return [
          /* eslint-disable no-bitwise */
          integer >> 16 & 255,
          integer >> 8 & 255,
          integer & 255
          /* eslint-enable no-bitwise */
        ];
      },
      enumerable: false
    },
    hexToAnsi256: {
      value: (hex) => styles.rgbToAnsi256(...styles.hexToRgb(hex)),
      enumerable: false
    },
    ansi256ToAnsi: {
      value(code) {
        if (code < 8) {
          return 30 + code;
        }
        if (code < 16) {
          return 90 + (code - 8);
        }
        let red;
        let green;
        let blue;
        if (code >= 232) {
          red = ((code - 232) * 10 + 8) / 255;
          green = red;
          blue = red;
        } else {
          code -= 16;
          const remainder = code % 36;
          red = Math.floor(code / 36) / 5;
          green = Math.floor(remainder / 6) / 5;
          blue = remainder % 6 / 5;
        }
        const value = Math.max(red, green, blue) * 2;
        if (value === 0) {
          return 30;
        }
        let result = 30 + (Math.round(blue) << 2 | Math.round(green) << 1 | Math.round(red));
        if (value === 2) {
          result += 60;
        }
        return result;
      },
      enumerable: false
    },
    rgbToAnsi: {
      value: (red, green, blue) => styles.ansi256ToAnsi(styles.rgbToAnsi256(red, green, blue)),
      enumerable: false
    },
    hexToAnsi: {
      value: (hex) => styles.ansi256ToAnsi(styles.hexToAnsi256(hex)),
      enumerable: false
    }
  });
  return styles;
}
var ansiStyles = assembleStyles();
var ansi_styles_default = ansiStyles;

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/vendor/supports-color/index.js
import process2 from "node:process";
import os from "node:os";
import tty from "node:tty";
function hasFlag(flag, argv = globalThis.Deno ? globalThis.Deno.args : process2.argv) {
  const prefix = flag.startsWith("-") ? "" : flag.length === 1 ? "-" : "--";
  const position = argv.indexOf(prefix + flag);
  const terminatorPosition = argv.indexOf("--");
  return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
}
var { env } = process2;
var flagForceColor;
if (hasFlag("no-color") || hasFlag("no-colors") || hasFlag("color=false") || hasFlag("color=never")) {
  flagForceColor = 0;
} else if (hasFlag("color") || hasFlag("colors") || hasFlag("color=true") || hasFlag("color=always")) {
  flagForceColor = 1;
}
function envForceColor() {
  if ("FORCE_COLOR" in env) {
    if (env.FORCE_COLOR === "true") {
      return 1;
    }
    if (env.FORCE_COLOR === "false") {
      return 0;
    }
    return env.FORCE_COLOR.length === 0 ? 1 : Math.min(Number.parseInt(env.FORCE_COLOR, 10), 3);
  }
}
function translateLevel(level) {
  if (level === 0) {
    return false;
  }
  return {
    level,
    hasBasic: true,
    has256: level >= 2,
    has16m: level >= 3
  };
}
function _supportsColor(haveStream, { streamIsTTY, sniffFlags = true } = {}) {
  const noFlagForceColor = envForceColor();
  if (noFlagForceColor !== void 0) {
    flagForceColor = noFlagForceColor;
  }
  const forceColor = sniffFlags ? flagForceColor : noFlagForceColor;
  if (forceColor === 0) {
    return 0;
  }
  if (sniffFlags) {
    if (hasFlag("color=16m") || hasFlag("color=full") || hasFlag("color=truecolor")) {
      return 3;
    }
    if (hasFlag("color=256")) {
      return 2;
    }
  }
  if ("TF_BUILD" in env && "AGENT_NAME" in env) {
    return 1;
  }
  if (haveStream && !streamIsTTY && forceColor === void 0) {
    return 0;
  }
  const min = forceColor || 0;
  if (env.TERM === "dumb") {
    return min;
  }
  if (process2.platform === "win32") {
    const osRelease = os.release().split(".");
    if (Number(osRelease[0]) >= 10 && Number(osRelease[2]) >= 10586) {
      return Number(osRelease[2]) >= 14931 ? 3 : 2;
    }
    return 1;
  }
  if ("CI" in env) {
    if (["GITHUB_ACTIONS", "GITEA_ACTIONS", "CIRCLECI"].some((key) => key in env)) {
      return 3;
    }
    if (["TRAVIS", "APPVEYOR", "GITLAB_CI", "BUILDKITE", "DRONE"].some((sign) => sign in env) || env.CI_NAME === "codeship") {
      return 1;
    }
    return min;
  }
  if ("TEAMCITY_VERSION" in env) {
    return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  }
  if (env.COLORTERM === "truecolor") {
    return 3;
  }
  if (env.TERM === "xterm-kitty") {
    return 3;
  }
  if (env.TERM === "xterm-ghostty") {
    return 3;
  }
  if (env.TERM === "wezterm") {
    return 3;
  }
  if ("TERM_PROGRAM" in env) {
    const version = Number.parseInt((env.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
    switch (env.TERM_PROGRAM) {
      case "iTerm.app": {
        return version >= 3 ? 3 : 2;
      }
      case "Apple_Terminal": {
        return 2;
      }
    }
  }
  if (/-256(color)?$/i.test(env.TERM)) {
    return 2;
  }
  if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
    return 1;
  }
  if ("COLORTERM" in env) {
    return 1;
  }
  return min;
}
function createSupportsColor(stream, options = {}) {
  const level = _supportsColor(stream, {
    streamIsTTY: stream && stream.isTTY,
    ...options
  });
  return translateLevel(level);
}
var supportsColor = {
  stdout: createSupportsColor({ isTTY: tty.isatty(1) }),
  stderr: createSupportsColor({ isTTY: tty.isatty(2) })
};
var supports_color_default = supportsColor;

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/utilities.js
function stringReplaceAll(string, substring, replacer) {
  let index = string.indexOf(substring);
  if (index === -1) {
    return string;
  }
  const substringLength = substring.length;
  let endIndex = 0;
  let returnValue = "";
  do {
    returnValue += string.slice(endIndex, index) + substring + replacer;
    endIndex = index + substringLength;
    index = string.indexOf(substring, endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}
function stringEncaseCRLFWithFirstIndex(string, prefix, postfix, index) {
  let endIndex = 0;
  let returnValue = "";
  do {
    const gotCR = string[index - 1] === "\r";
    returnValue += string.slice(endIndex, gotCR ? index - 1 : index) + prefix + (gotCR ? "\r\n" : "\n") + postfix;
    endIndex = index + 1;
    index = string.indexOf("\n", endIndex);
  } while (index !== -1);
  returnValue += string.slice(endIndex);
  return returnValue;
}

// node_modules/.pnpm/chalk@5.6.2/node_modules/chalk/source/index.js
var { stdout: stdoutColor, stderr: stderrColor } = supports_color_default;
var GENERATOR = Symbol("GENERATOR");
var STYLER = Symbol("STYLER");
var IS_EMPTY = Symbol("IS_EMPTY");
var levelMapping = [
  "ansi",
  "ansi",
  "ansi256",
  "ansi16m"
];
var styles2 = /* @__PURE__ */ Object.create(null);
var applyOptions = (object, options = {}) => {
  if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
    throw new Error("The `level` option should be an integer from 0 to 3");
  }
  const colorLevel = stdoutColor ? stdoutColor.level : 0;
  object.level = options.level === void 0 ? colorLevel : options.level;
};
var chalkFactory = (options) => {
  const chalk2 = (...strings) => strings.join(" ");
  applyOptions(chalk2, options);
  Object.setPrototypeOf(chalk2, createChalk.prototype);
  return chalk2;
};
function createChalk(options) {
  return chalkFactory(options);
}
Object.setPrototypeOf(createChalk.prototype, Function.prototype);
for (const [styleName, style] of Object.entries(ansi_styles_default)) {
  styles2[styleName] = {
    get() {
      const builder = createBuilder(this, createStyler(style.open, style.close, this[STYLER]), this[IS_EMPTY]);
      Object.defineProperty(this, styleName, { value: builder });
      return builder;
    }
  };
}
styles2.visible = {
  get() {
    const builder = createBuilder(this, this[STYLER], true);
    Object.defineProperty(this, "visible", { value: builder });
    return builder;
  }
};
var getModelAnsi = (model, level, type, ...arguments_) => {
  if (model === "rgb") {
    if (level === "ansi16m") {
      return ansi_styles_default[type].ansi16m(...arguments_);
    }
    if (level === "ansi256") {
      return ansi_styles_default[type].ansi256(ansi_styles_default.rgbToAnsi256(...arguments_));
    }
    return ansi_styles_default[type].ansi(ansi_styles_default.rgbToAnsi(...arguments_));
  }
  if (model === "hex") {
    return getModelAnsi("rgb", level, type, ...ansi_styles_default.hexToRgb(...arguments_));
  }
  return ansi_styles_default[type][model](...arguments_);
};
var usedModels = ["rgb", "hex", "ansi256"];
for (const model of usedModels) {
  styles2[model] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "color", ...arguments_), ansi_styles_default.color.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
  const bgModel = "bg" + model[0].toUpperCase() + model.slice(1);
  styles2[bgModel] = {
    get() {
      const { level } = this;
      return function(...arguments_) {
        const styler = createStyler(getModelAnsi(model, levelMapping[level], "bgColor", ...arguments_), ansi_styles_default.bgColor.close, this[STYLER]);
        return createBuilder(this, styler, this[IS_EMPTY]);
      };
    }
  };
}
var proto = Object.defineProperties(() => {
}, {
  ...styles2,
  level: {
    enumerable: true,
    get() {
      return this[GENERATOR].level;
    },
    set(level) {
      this[GENERATOR].level = level;
    }
  }
});
var createStyler = (open, close, parent) => {
  let openAll;
  let closeAll;
  if (parent === void 0) {
    openAll = open;
    closeAll = close;
  } else {
    openAll = parent.openAll + open;
    closeAll = close + parent.closeAll;
  }
  return {
    open,
    close,
    openAll,
    closeAll,
    parent
  };
};
var createBuilder = (self, _styler, _isEmpty) => {
  const builder = (...arguments_) => applyStyle(builder, arguments_.length === 1 ? "" + arguments_[0] : arguments_.join(" "));
  Object.setPrototypeOf(builder, proto);
  builder[GENERATOR] = self;
  builder[STYLER] = _styler;
  builder[IS_EMPTY] = _isEmpty;
  return builder;
};
var applyStyle = (self, string) => {
  if (self.level <= 0 || !string) {
    return self[IS_EMPTY] ? "" : string;
  }
  let styler = self[STYLER];
  if (styler === void 0) {
    return string;
  }
  const { openAll, closeAll } = styler;
  if (string.includes("\x1B")) {
    while (styler !== void 0) {
      string = stringReplaceAll(string, styler.close, styler.open);
      styler = styler.parent;
    }
  }
  const lfIndex = string.indexOf("\n");
  if (lfIndex !== -1) {
    string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
  }
  return openAll + string + closeAll;
};
Object.defineProperties(createChalk.prototype, styles2);
var chalk = createChalk();
var chalkStderr = createChalk({ level: stderrColor ? stderrColor.level : 0 });
var source_default = chalk;

// src/utils/i18n.ts
import { join as join7, dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var localeData = null;
function tMessage(key, params) {
  if (!localeData) {
    return key;
  }
  const value = localeData.messages[key];
  if (!value) {
    return key;
  }
  if (params) {
    let result = value;
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      result = result.replace(new RegExp(`{{${paramKey}}}`, "g"), paramValue);
    });
    return result;
  }
  return value;
}
function tValidation(key, params) {
  if (!localeData) {
    return key;
  }
  const value = localeData.validation[key];
  if (!value) {
    return key;
  }
  if (params) {
    let result = value;
    Object.entries(params).forEach(([paramKey, paramValue]) => {
      result = result.replace(new RegExp(`{{${paramKey}}}`, "g"), paramValue);
    });
    return result;
  }
  return value;
}

// src/utils/output.ts
function info(message, useTranslation = false) {
  console.log(source_default.blue(useTranslation ? tMessage(message) : message));
}
function success(message, useTranslation = false) {
  console.log(source_default.green(useTranslation ? tMessage(message) : message));
}
function error(message, useTranslation = false) {
  console.error(source_default.red(useTranslation ? tMessage(message) : message));
}
function gray(message, useTranslation = false) {
  console.log(source_default.gray(useTranslation ? tMessage(message) : message));
}

// src/config/config-manager.ts
var import_fs_extra = __toESM(require_lib(), 1);
import { join as join8 } from "path";
import { homedir } from "os";
var CONFIG_DIR = join8(homedir(), ".setai");
var CONFIG_FILE = join8(CONFIG_DIR, "config.json");
var cachedConfig = null;
async function loadConfig() {
  if (cachedConfig) {
    return cachedConfig;
  }
  try {
    if (await import_fs_extra.default.pathExists(CONFIG_FILE)) {
      const content = await import_fs_extra.default.readFile(CONFIG_FILE, "utf-8");
      cachedConfig = JSON.parse(content);
      return cachedConfig;
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(`Erro ao carregar configura\xE7\xE3o: ${err.message}`);
    }
  }
  cachedConfig = {};
  return cachedConfig;
}

// src/engines/file-generator.ts
async function generateFiles(baseDir, files) {
  try {
    const createdFiles = [];
    for (const [relativePath, content] of files.entries()) {
      const fullPath = join9(baseDir, relativePath);
      const dirPath = dirname3(fullPath);
      await import_fs_extra2.default.ensureDir(dirPath);
      await import_fs_extra2.default.writeFile(fullPath, content, "utf-8");
      createdFiles.push(relativePath);
    }
    success("\n\u2705 Estrutura criada com sucesso!\n");
    gray("Arquivos criados:");
    for (const file of createdFiles) {
      gray(`  \u2713 ${file}`);
    }
  } catch (err) {
    error("Erro ao gerar arquivos:");
    if (err instanceof Error) {
      error(err.message);
    }
    throw err;
  }
}
async function generateSetaiConfig(baseDir, configFolder) {
  try {
    const setaiDir = join9(baseDir, configFolder, ".setai");
    await import_fs_extra2.default.ensureDir(setaiDir);
    const cliConfig = await loadConfig();
    const configToSave = {};
    if (cliConfig.ai) {
      configToSave.ai = cliConfig.ai;
    }
    if (cliConfig.language) {
      configToSave.language = cliConfig.language;
    }
    const configPath = join9(setaiDir, "config.json");
    await import_fs_extra2.default.writeFile(configPath, JSON.stringify(configToSave, null, 2), "utf-8");
    const gitignorePath = join9(setaiDir, ".gitignore");
    const gitignoreContent = `# SetAI Configuration
# This folder contains CLI configuration including API keys
# DO NOT commit this folder to version control

config.json
`;
    await import_fs_extra2.default.writeFile(gitignorePath, gitignoreContent, "utf-8");
    const readmePath = join9(setaiDir, "README.md");
    const readmeContent = `# SetAI Configuration

This folder contains the SetAI CLI configuration used to generate this project structure.

## Contents

- \`config.json\` - CLI configuration (API keys, language settings, etc.)
- \`.gitignore\` - Prevents committing sensitive configuration to version control

## Important Notes

- **\u26A0\uFE0F DO NOT commit this folder** - It contains sensitive information like API keys
- **\u26A0\uFE0F SECURITY WARNING:** This folder contains real API keys. Never commit it to version control
- The \`.gitignore\` file is included to prevent accidental commits, but always verify before pushing
- To update configuration, use \`setai config\` command in your terminal

## Configuration Location

The actual configuration file with full API keys is located at:
- **Windows:** \`%USERPROFILE%\\.setai\\config.json\`
- **macOS/Linux:** \`~/.setai/config.json\`

This folder (\`.setai\`) is a reference copy that shows what configuration was used when generating the project structure.
`;
    await import_fs_extra2.default.writeFile(readmePath, readmeContent, "utf-8");
  } catch (err) {
    error("Erro ao criar pasta .setai:");
    if (err instanceof Error) {
      error(err.message);
    }
  }
}

// src/validation/input-validator.ts
function validateUserAnswers(answers2) {
  if (!answers2.projectName?.trim()) {
    throw new Error(tValidation("project.name.required"));
  }
  if (!answers2.projectDescription?.trim()) {
    throw new Error(tValidation("project.description.required"));
  }
  if (!answers2.problemImportance?.trim()) {
    throw new Error(tValidation("project.problemImportance.required"));
  }
  if (!answers2.targetUsers?.trim()) {
    throw new Error(tValidation("project.targetUsers.required"));
  }
  if (!answers2.businessGoals?.trim()) {
    throw new Error(tValidation("project.businessGoals.required"));
  }
  if (!answers2.nonGoals?.trim()) {
    throw new Error(tValidation("project.nonGoals.required"));
  }
  if (answers2.version && !/^\d+\.\d+\.\d+(-.*)?$/.test(answers2.version.trim())) {
    throw new Error(tValidation("project.version.invalid"));
  }
}

// src/validation/context-validator.ts
function validateContext(ctx) {
  const issues = [];
  const leakPatterns = [/templates\.(none|other)/i, /^nenhum$/i, /^ninguno$/i];
  const checkStr = (label, value) => {
    if (!value) return;
    for (const re of leakPatterns) {
      if (re.test(value)) {
        issues.push({
          severity: "error",
          code: "I18N_LEAK",
          message: `Domain field ${label} contains i18n/sentinel leak: "${value}"`
        });
      }
    }
  };
  checkStr("framework.cli", ctx.frameworks.cli?.value ?? void 0);
  checkStr("framework.application", ctx.frameworks.application?.value ?? void 0);
  checkStr("displayType", ctx.displayType);
  if (!ctx.database.value.detected && ctx.database.value.packages.length > 0) {
    issues.push({
      severity: "error",
      code: "DB_INCONSISTENT",
      message: "database.detected=false but packages list is non-empty"
    });
  }
  for (const rec of ctx.recommendations) {
    if (rec.source === "ai_generated" && ctx.identity.name.source === "ai_generated") {
      issues.push({
        severity: "warning",
        code: "AI_NAME",
        message: "Project name should not be AI-generated"
      });
    }
  }
  if (ctx.traits.value.includes("cli") && ctx.httpServer.value.detected === false && ctx.displayType.toLowerCase().includes("rest")) {
    issues.push({
      severity: "error",
      code: "TYPE_HALLUCINATION",
      message: "CLI project incorrectly labeled as REST"
    });
  }
  return issues;
}
function assertContextValid(ctx) {
  const errors = validateContext(ctx).filter((i) => i.severity === "error");
  if (errors.length > 0) {
    throw new Error(
      `Context validation failed:
${errors.map((e) => `- [${e.code}] ${e.message}`).join("\n")}`
    );
  }
}

// src/validation/output-validator.ts
var CRITICAL_ABSENCE_AS_FACT = [
  { re: /Layered Architecture \(Controller-Service-Repository\)/i, code: "LAYERED_REST" },
  { re: /Database as Source of Truth/i, code: "DB_SOT" },
  { re: /Repository Pattern/i, code: "REPO_PATTERN" },
  { re: /templates\.other/i, code: "I18N_OTHER" },
  { re: /templates\.none/i, code: "I18N_NONE" }
];
function isNegatedContext(content, index) {
  const start = Math.max(0, index - 80);
  const window = content.slice(start, index).toLowerCase();
  return window.includes("not ") || window.includes("do not") || window.includes("never ") || window.includes("none") || window.includes("absent") || window.includes("known issue") || window.includes("not detected") || window.includes("not applicable") || window.includes("is not");
}
function validateOutputFiles(files, evidence) {
  const issues = [];
  for (const [path, content] of files) {
    if (/\{\{[A-Z0-9_]+\}\}/.test(content)) {
      issues.push({
        severity: "error",
        code: "UNRESOLVED_PLACEHOLDER",
        message: `Unresolved template placeholder in ${path}`
      });
    }
    if (/\[To be defined/i.test(content)) {
      issues.push({
        severity: "error",
        code: "PLACEHOLDER_TO_BE_DEFINED",
        message: `Legacy "[To be defined" placeholder in ${path}`
      });
    }
    if (/\[A definir/i.test(content)) {
      issues.push({
        severity: "error",
        code: "PLACEHOLDER_A_DEFINIR",
        message: `Legacy "[A definir" placeholder in ${path}`
      });
    }
    for (const { re, code } of CRITICAL_ABSENCE_AS_FACT) {
      let match;
      const clone = new RegExp(re.source, re.flags + (re.flags.includes("g") ? "" : "g"));
      while ((match = clone.exec(content)) !== null) {
        if (!isNegatedContext(content, match.index)) {
          if (code === "REPO_PATTERN" && path.includes("known-issues")) continue;
          issues.push({
            severity: "error",
            code,
            message: `Forbidden factual pattern "${code}" in ${path}`
          });
          break;
        }
      }
    }
    if (path.includes("security-rules") && /JWT \(JSON Web Tokens\)/i.test(content)) {
      if (!isNegatedContext(content, content.search(/JWT \(JSON Web Tokens\)/i))) {
        if (evidence && !evidence.httpFrameworks.length) {
          issues.push({
            severity: "error",
            code: "JWT_WITHOUT_HTTP",
            message: `JWT presented as fact in ${path} but no HTTP server detected`
          });
        }
      }
    }
  }
  if (evidence?.packageJson?.scripts) {
    const scripts = evidence.packageJson.scripts;
    for (const [path, content] of files) {
      if (!path.includes("deployment") && !path.includes("tech-stack")) continue;
      for (const mentioned of content.matchAll(/`(?:npm|pnpm|yarn) run ([a-zA-Z0-9:_-]+)`/g)) {
        const name = mentioned[1];
        if (!(name in scripts)) {
          issues.push({
            severity: "warning",
            code: "UNKNOWN_SCRIPT",
            message: `Documented script "${name}" not in package.json (${path})`
          });
        }
      }
    }
  }
  return issues;
}
function assertOutputValid(files, evidence) {
  const errors = validateOutputFiles(files, evidence).filter((i) => i.severity === "error");
  if (errors.length > 0) {
    throw new Error(
      `Output validation failed:
${errors.map((e) => `- [${e.code}] ${e.message}`).join("\n")}`
    );
  }
}

// src/validation/quality-score.ts
function scoreContextQuality(ctx, issues) {
  const existing = ctx.projectMode === "existing";
  let covered = 0;
  let fillable = 0;
  const checks = [
    ctx.languages.value.length > 0,
    ctx.runtime.value !== null,
    ctx.packageManager.value !== null,
    ctx.traits.value.length > 0,
    Object.keys(ctx.commands.value).length > 0 || !existing
  ];
  for (const ok of checks) {
    fillable++;
    if (ok) covered++;
  }
  const evidenceCoverage = fillable === 0 ? 100 : Math.round(covered / fillable * 100);
  const errorCount = issues.filter((i) => i.severity === "error").length;
  const warnCount = issues.filter((i) => i.severity === "warning").length;
  const unsupportedClaimsPenalty = Math.min(100, errorCount * 25 + warnCount * 5);
  const brokenReferencesPenalty = Math.min(
    100,
    issues.filter((i) => i.code === "UNKNOWN_SCRIPT" || i.code === "BROKEN_PATH").length * 15
  );
  const placeholderIntegrity = issues.some((i) => i.code.startsWith("PLACEHOLDER") || i.code === "UNRESOLVED_PLACEHOLDER" || i.code.startsWith("I18N")) ? 0 : 100;
  const dependencyAccuracy = existing && ctx.dependencies.raw.dependencies.length > 0 ? ctx.dependencies.production.value.length > 0 || ctx.dependencies.raw.dependencies.length > 0 ? 100 : 50 : existing ? 80 : 70;
  const commandAccuracy = existing && Object.keys(ctx.commands.value).length > 0 ? 100 : existing ? 60 : 70;
  let completenessPoints = 0;
  if (ctx.business.problemImportance.value) completenessPoints += 20;
  if (ctx.business.targetUsers.value) completenessPoints += 20;
  if (ctx.business.businessGoals.value) completenessPoints += 20;
  if (ctx.business.nonGoals.value) completenessPoints += 20;
  if (ctx.architecture.observedStructure?.value.dirs.length) completenessPoints += 20;
  const contextCompleteness = completenessPoints;
  const hallucinatedType = /rest api/i.test(ctx.displayType) && !ctx.httpServer.value.detected;
  const signalNoise = hallucinatedType ? 20 : ctx.unknowns.length > 8 ? 70 : 95;
  const total = Math.max(
    0,
    Math.min(
      100,
      Math.round(
        evidenceCoverage * 0.15 + (100 - unsupportedClaimsPenalty) * 0.3 + (100 - brokenReferencesPenalty) * 0.1 + placeholderIntegrity * 0.15 + dependencyAccuracy * 0.1 + commandAccuracy * 0.05 + contextCompleteness * 0.1 + signalNoise * 0.05
      )
    )
  );
  return {
    evidenceCoverage,
    unsupportedClaimsPenalty,
    brokenReferencesPenalty,
    placeholderIntegrity,
    dependencyAccuracy,
    commandAccuracy,
    contextCompleteness,
    signalNoise,
    total
  };
}

// src/reporting/generation-report.ts
function printGenerationReport(ctx, evidence, quality, folder) {
  success(`Context generated \u2192 ${folder}/`, true);
  info("", true);
  info("Detected:", true);
  for (const line of buildDetectedLines(ctx, evidence)) {
    gray(`  \u2713 ${line}`, true);
  }
  info("Not detected:", true);
  for (const line of buildNotDetectedLines(ctx, evidence)) {
    gray(`  - ${line}`, true);
  }
  if (ctx.conflicts.length > 0 || ctx.unknowns.length > 0) {
    info("Needs attention:", true);
    for (const c of ctx.conflicts) {
      gray(`  ! ${c.warning}`, true);
    }
    for (const u of ctx.unknowns.slice(0, 5)) {
      gray(`  ? ${u.field} (${u.reason})`, true);
    }
  }
  info("Validation:", true);
  gray(`  \u2713 Context model resolved with provenance`, true);
  gray(`  \u2713 Quality score: ${quality.total}/100`, true);
  info("", true);
}
function buildDetectedLines(ctx, evidence) {
  const lines = [];
  if (ctx.languages.value.length) lines.push(ctx.languages.value.join(", "));
  if (ctx.runtime.value) {
    lines.push(
      ctx.runtime.value.versionRange ? `${ctx.runtime.value.name} ${ctx.runtime.value.versionRange}` : ctx.runtime.value.name
    );
  }
  if (ctx.displayType !== "Unknown") lines.push(ctx.displayType);
  if (ctx.frameworks.test?.value) lines.push(ctx.frameworks.test.value);
  if (ctx.frameworks.build?.value) lines.push(ctx.frameworks.build.value);
  if (ctx.packageManager.value) lines.push(ctx.packageManager.value.name);
  for (const p of evidence.capabilities.filter((c) => c.category === "ai").map((c) => c.package)) {
    lines.push(p);
  }
  if (ctx.frameworks.cli?.value) lines.push(ctx.frameworks.cli.value);
  if (ctx.frameworks.docs?.value) lines.push(ctx.frameworks.docs.value);
  if (ctx.frameworks.lint?.value) lines.push(ctx.frameworks.lint.value);
  if (ctx.frameworks.formatter?.value) lines.push(ctx.frameworks.formatter.value);
  return [...new Set(lines)];
}
function buildNotDetectedLines(ctx, evidence) {
  const lines = [];
  if (!ctx.database.value.detected) lines.push("Database");
  if (!ctx.httpServer.value.detected) lines.push("Web/HTTP framework");
  if (evidence.cicd.status !== "active") lines.push("Active CI");
  return lines;
}

// scripts/generate-ledgerlight.ts
var ROOT = process.argv[2] || "D:/Projetos/ledgerlight";
var answers = {
  projectName: "ledgerlight",
  projectDescription: "Offline personal finance CLI that imports bank CSV files, categorizes expenses with local rules, and prints monthly summaries in the terminal",
  problemImportance: "People need a private, local way to understand spending without uploading bank data to SaaS dashboards",
  targetUsers: "Individuals who want privacy-first personal budgeting from exported bank CSVs",
  businessGoals: "Ship a reliable CLI MVP that imports CSV, applies category rules, and generates readable monthly reports without cloud sync",
  technicalConstraints: "Must work fully offline; no mandatory cloud services; Node.js LTS only",
  businessConstraints: "No paid subscriptions in MVP; keep scope small enough for a solo maintainer",
  nonGoals: "Mobile app; web dashboard; multi-user accounts; bank API integrations; real-time sync; investment portfolio tracking",
  version: "0.1.0",
  language: "TypeScript",
  framework: null,
  database: null,
  useTDD: false,
  strictMode: true,
  ideConfig: { ide: "cursor", configFolder: ".cursor" }
};
async function main() {
  await mkdir(ROOT, { recursive: true });
  process.chdir(ROOT);
  console.log(`Generating context in ${ROOT} ...`);
  const evidence = await scanProject(ROOT);
  console.log(`Mode: ${evidence.isGreenfield ? "greenfield" : "existing"}`);
  validateUserAnswers(answers);
  const ctx = resolveFacts(evidence, answers);
  assertContextValid(ctx);
  const projectInfo = {
    projectName: answers.projectName,
    projectDescription: answers.projectDescription,
    problemImportance: answers.problemImportance,
    targetUsers: answers.targetUsers,
    businessGoals: answers.businessGoals,
    technicalConstraints: answers.technicalConstraints ?? "None",
    businessConstraints: answers.businessConstraints ?? "None",
    nonGoals: answers.nonGoals,
    version: answers.version ?? "0.1.0",
    techStack: { language: answers.language ?? "TypeScript" },
    preferences: { useTDD: answers.useTDD, strictMode: answers.strictMode },
    ideConfig: answers.ideConfig
  };
  const files = await processAllTemplates(projectInfo, ".cursor", "en", {
    projectContext: ctx,
    userAnswers: answers
  });
  const outputIssues = validateOutputFiles(files, evidence);
  assertOutputValid(files, evidence);
  const quality = scoreContextQuality(ctx, [...validateContext(ctx), ...outputIssues]);
  await generateFiles(ROOT, files);
  await generateSetaiConfig(ROOT, ".cursor");
  printGenerationReport(ctx, evidence, quality, ".cursor");
  console.log(`Files written: ${files.size}`);
  console.log(`Quality: ${quality.total}/100`);
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});

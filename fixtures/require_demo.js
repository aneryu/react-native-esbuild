import { __commonJS, __require } from './shopee0.js';
// packages/App/Utils/NetworkLogger/interceptor.js
var require_interceptor = __commonJS({
  "packages/App/Utils/NetworkLogger/interceptor.js"(exports, module) {
    var XMLHttpRequest2 = __require("react-native/Libraries/Network/XMLHttpRequest");
    var XHRInterceptor2 = class {
      constructor() {
        this.responseCallback = null;
        this.openCallback = null;
        this.sendCallback = null;
        this.headerReceivedCallback = null;
        this.requestHeaderCallback = null;
        this.isEnabled = false;
        this.originalXHRSetRequestHeader = XMLHttpRequest2.prototype.setRequestHeader;
        this.originalXHROpen = XMLHttpRequest2.prototype.open;
        this.originalXHRSend = XMLHttpRequest2.prototype.send;
      }
      /**
       * Invoked before XMLHttpRequest.open(...) is called.
       */
      setOpenCallback(callback) {
        this.openCallback = callback;
      }
      /**
       * Invoked before XMLHttpRequest.send(...) is called.
       */
      setSendCallback(callback) {
        this.sendCallback = callback;
      }
      /**
       * Invoked after xhr's readyState becomes xhr.HEADERS_RECEIVED.
       */
      setHeaderReceivedCallback(callback) {
        this.headerReceivedCallback = callback;
      }
      /**
       * Invoked after xhr's readyState becomes xhr.DONE.
       */
      setResponseCallback(callback) {
        this.responseCallback = callback;
      }
      /**
       * Invoked before XMLHttpRequest.setRequestHeader(...) is called.
       */
      setRequestHeaderCallback(callback) {
        this.requestHeaderCallback = callback;
      }
      isInterceptorEnabled() {
        return this.isEnabled;
      }
      enableInterception() {
        if (this.isEnabled) {
          return;
        }
        this.originalXHRSetRequestHeader = XMLHttpRequest2.prototype.setRequestHeader;
        this.originalXHROpen = XMLHttpRequest2.prototype.open;
        this.originalXHRSend = XMLHttpRequest2.prototype.send;
        const interceptor2 = this;
        XMLHttpRequest2.prototype.open = function (method, url2) {
          if (interceptor2.openCallback) {
            interceptor2.openCallback(method, url2, this);
          }
          interceptor2.originalXHROpen.apply(this, arguments);
        };
        XMLHttpRequest2.prototype.setRequestHeader = function (header, value) {
          if (interceptor2.requestHeaderCallback) {
            interceptor2.requestHeaderCallback(header, value, this);
          }
          interceptor2.originalXHRSetRequestHeader.apply(this, arguments);
        };
        XMLHttpRequest2.prototype.send = function (data2) {
          if (interceptor2.sendCallback) {
            interceptor2.sendCallback(data2, this);
          }
          if (this.addEventListener) {
            this.addEventListener("readystatechange", () => {
              if (!interceptor2.isEnabled) {
                return;
              }
              if (this.readyState === this.HEADERS_RECEIVED) {
                const contentTypeString = this.getResponseHeader("Content-Type");
                const contentLengthString = this.getResponseHeader("Content-Length");
                let responseContentType, responseSize;
                if (contentTypeString) {
                  responseContentType = contentTypeString.split(";")[0];
                }
                if (contentLengthString) {
                  responseSize = parseInt(contentLengthString, 10);
                }
                const headerReceivedCallback = interceptor2.headerReceivedCallback;
                if (headerReceivedCallback) {
                  headerReceivedCallback(responseContentType, responseSize, this.getAllResponseHeaders(), this);
                }
              }
              if (this.readyState === this.DONE) {
                if (interceptor2.responseCallback) {
                  interceptor2.responseCallback(this.status, this.timeout, this.response, this.responseURL, this.responseType, this);
                }
              }
            }, false);
          }
          interceptor2.originalXHRSend.apply(this, arguments);
        };
        this.isEnabled = true;
      }
      // Unpatch XMLHttpRequest methods and remove the callbacks.
      disableInterception() {
        if (!this.isEnabled) {
          return;
        }
        this.isEnabled = false;
        XMLHttpRequest2.prototype.send = this.originalXHRSend;
        XMLHttpRequest2.prototype.open = this.originalXHROpen;
        XMLHttpRequest2.prototype.setRequestHeader = this.originalXHRSetRequestHeader;
        this.responseCallback = null;
        this.openCallback = null;
        this.sendCallback = null;
        this.headerReceivedCallback = null;
        this.requestHeaderCallback = null;
      }
    };
    module.exports = XHRInterceptor2;
  }
});
export { require_interceptor };
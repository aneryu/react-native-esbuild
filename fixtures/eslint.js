import { init_Cache } from './shopee3347.js';
import { require_lodash5 } from './shopee833.js';
import { __esm, __toESM, __async } from './shopee0.js';
// workspaces/modules/home-services/src/hooks/useRequestWithCache/cache/MemoryCache.ts
var import_lodash59, MEMORY_DATA, MemoryCache;
var init_MemoryCache = __esm({
  "workspaces/modules/home-services/src/hooks/useRequestWithCache/cache/MemoryCache.ts"() {
    import_lodash59 = __toESM(require_lodash5());
    init_Cache();
    MEMORY_DATA = {};
    MemoryCache = class extends Cache {
      constructor() {
        super(...arguments);
        // Type
        this.type = "memory";
      }
      /**
       * Get Cache ID
       * @returns {Promise<string | undefined>}
       */
      getCacheID() {
        return __async(this, null, function* () {
          return "memory-cache";
        });
      }
      /**
       * Get the Cache Item
       * @returns {Promise<CacheData | undefined>}
       */
      getItem() {
        return __async(this, null, function* () {
          return (0, import_lodash59.get)(MEMORY_DATA, this.key);
        });
      }
      /**
       * Set Item in the Cache
       * @param {CacheData} data Cache Data
       * @returns {Promise<unknown>}
       */
      setItem(data2) {
        return __async(this, null, function* () {
          MEMORY_DATA[this.key] = data2;
        });
      }
    };
  }
});
export { import_lodash59, MEMORY_DATA, MemoryCache, init_MemoryCache };
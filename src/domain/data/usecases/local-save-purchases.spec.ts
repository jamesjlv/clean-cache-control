class LocalSavePurchases {
  constructor(private readonly cacheStore: CacheStore) {}
}
interface CacheStore {}
class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;
}

describe("LocalSavePurchases", () => {
  test("Should not delete cache on sut.init", () => {
    const cacheStore = new CacheStoreSpy();
    new LocalSavePurchases(cacheStore);

    // This opetarion should not be called if the component starts
    expect(cacheStore.deleteCallsCount).toBe(0);
  });
});

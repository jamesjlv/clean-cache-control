export class LocalSavePurchases {
  constructor(private readonly cacheStore: CacheStore) {}

  async save(): Promise<void> {
    this.cacheStore.delete("purchases");
  }
}
export interface CacheStore {
  delete: (key: string) => void;
}
export class CacheStoreSpy implements CacheStore {
  deleteCallsCount = 0;
  key = "";

  delete(key: string): void {
    this.deleteCallsCount++;
    this.key = key;
  }
}

type SutTypes = {
  sut: LocalSavePurchases;
  cacheStore: CacheStoreSpy;
};

const makeSut = (): SutTypes => {
  const cacheStore = new CacheStoreSpy();
  const sut = new LocalSavePurchases(cacheStore);
  return { cacheStore, sut };
};

describe("LocalSavePurchases", () => {
  test("Should not delete cache on sut.init", () => {
    const { cacheStore } = makeSut();
    expect(cacheStore.deleteCallsCount).toBe(0);
  });

  test("Should delete old cache on sut.save and be called only once", async () => {
    const { sut, cacheStore } = makeSut();
    await sut.save();
    expect(cacheStore.deleteCallsCount).toBe(1);
    expect(cacheStore.key).toBe("purchases");
  });
});

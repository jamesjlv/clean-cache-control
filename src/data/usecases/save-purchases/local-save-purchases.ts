import { CacheStore } from "@/data/protocols/cache/cache-store";

export class LocalSavePurchases {
  constructor(private readonly cacheStore: CacheStore) {}

  async save(): Promise<void> {
    this.cacheStore.delete("purchases");
  }
}
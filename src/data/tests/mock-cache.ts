import { LoadPurchases, SavePurchases } from "@/domain/usecases";
import { CacheStore } from "../protocols/cache";

export const getCacheExpirationDate = (timestamp: Date): Date => {
  const maxCacheAge = new Date(timestamp);
  maxCacheAge.setDate(timestamp.getDate() - 3);
  return maxCacheAge;
};

export class CacheStoreSpy implements CacheStore {
  actions: Array<CacheStoreSpy.Action> = [];

  deleteKey = "";
  insertKey = "";
  fetchKey = "";
  insertValues: Array<SavePurchases.Params> = [];
  fetchResult: any;

  delete(key: string): void {
    this.actions.push(CacheStoreSpy.Action.delete);
    this.deleteKey = key;
  }

  insert(key: string, values: any): void {
    this.actions.push(CacheStoreSpy.Action.insert);
    this.insertKey = key;
    this.insertValues = values;
  }

  replace(key: string, value: any): void {
    this.delete(key);
    this.insert(key, value);
  }

  fetch(key: string): any {
    this.actions.push(CacheStoreSpy.Action.fetch);
    this.fetchKey = key;
    return this.fetchResult;
  }

  simulateDeleteError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "delete").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.delete);
      throw new Error();
    });
  }
  simulateInsertError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "insert").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.insert);
      throw new Error();
    });
  }
  simulateFetchError(): void {
    jest.spyOn(CacheStoreSpy.prototype, "fetch").mockImplementationOnce(() => {
      this.actions.push(CacheStoreSpy.Action.fetch);
      throw new Error();
    });
  }
}

export namespace CacheStoreSpy {
  export enum Action {
    delete,
    insert,
    fetch,
  }
}

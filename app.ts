type Buckets = Array<[number, number]>;

function hashString(str: string): number {
  let hash = 5381;
  let i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
  }

  return hash >>> 0;
}

class MyMap {
  private buckets: Buckets = Array();

  add(key: string, newValue: number): void {
    const hashId: number = hashString(key);
    this.buckets.forEach((bucket, index) => {
      if (index === hashId) {
        bucket.push(newValue);
        return;
      }
    });
    this.buckets.push([hashId, newValue]);
  }
  get(key: string): number | undefined {
    const hashId = hashString(key);
    for (const [hash, value] of this.buckets) {
      if (hash === hashId) {
        return value;
      }
    }
    return undefined;
  }
}

let weatherMap = new MyMap();
weatherMap.add("London", 20);
weatherMap.add("Berlin", 25);
// Пример получения данных
console.log(weatherMap.get("London"));

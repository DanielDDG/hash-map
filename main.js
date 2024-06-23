// Reconmmended to implement a modulo operator during each iteration, instead of outside the loop.
// For this project, only handle keys of type strings.

class LinkedList {
  constructor(head) {
    this.head = head;
  }
}

class Node {
  constructor(key, value) {
    this.pair = { key, value };
    this.nextNode = null;
  }
}

class HashMap {
  constructor() {
    this.buckets = [];
    this.bucketSize = 16;
    this.loadFactor = 0.75;
    this.product = this.bucketSize * this.loadFactor;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.bucketSize;
    }

    return hashCode;
  }

  set(key, value) {
    let hashCode = this.hash(key);
    let node = new Node(key, value);

    if (this.buckets[hashCode] == undefined) {
      this.buckets[hashCode] = new LinkedList(node);
    }

    if (this.buckets[hashCode] != undefined) {
      let current = this.buckets[hashCode].head;
      let exists = false;

      while (current != null) {
        if (current.pair.key == key) {
          current.pair.value = value;
          exists = true;
          break;
        } else {
          current = current.nextNode;
        }
      }

      if (exists == false) {
        current = this.buckets[hashCode].head;
        while (current != null) {
          if (current.nextNode == null) {
            current.nextNode = node;
            break;
          } else {
            current = current.nextNode;
          }
        }
      }
    }

    if (this.length() > this.product) {
      this.sizeCheck();
    }

    return this.buckets;
  }

  sizeCheck() {
    let keys = [];
    let values = [];
    let length = this.buckets.length;
    this.bucketSize *= 2;
    this.product = this.bucketSize * this.loadFactor;

    for (let i = 0; i < length; i++) {
      if (this.buckets[i] == undefined) {
        continue;
      }

      let current = this.buckets[i].head;

      while (current != null) {
        keys.push(current.pair.key);
        values.push(current.pair.value);
        current = current.nextNode;
      }
    }

    this.buckets = [];

    for (let i = 0; i < keys.length; i++) {
      if (keys[i] == undefined) continue;

      this.set(keys[i], values[i]);
    }
  }

  get(key) {
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] == undefined) {
        continue;
      }

      let current = this.buckets[i].head;

      while (current != null) {
        if (current.pair.key == key) {
          return current.pair.value;
        } else {
          current = current.nextNode;
        }
      }
    }

    return null;
  }

  has(key) {
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] == undefined) {
        continue;
      }

      let current = this.buckets[i].head;

      while (current != null) {
        if (current.pair.key == key) {
          return true;
        } else {
          current = current.nextNode;
        }
      }
    }
    return false;
  }

  remove(key) {
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] == undefined) {
        continue;
      }

      let current = this.buckets[i].head;

      if (this.buckets[i].head.pair.key == key) {
        this.buckets[i].head = null;
        return true;
      }

      while (current != null) {
        if (current.nextNode == null) {
          break;
        } else if (current.nextNode.pair.key == key) {
          current.nextNode = current.nextNode.nextNode;
          return true;
        } else {
          current = current.nextNode;
        }
      }
    }
    return false;
  }

  length() {
    let total = 0;

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] == undefined) {
        continue;
      }

      let current = this.buckets[i].head;

      while (current != null) {
        current = current.nextNode;
        total++;
      }
    }
    return total;
  }

  clear() {
    this.buckets = [];
    return this.buckets;
  }

  keys() {
    let keys = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] == undefined) {
        continue;
      }

      let current = this.buckets[i].head;

      while (current != null) {
        keys.push(current.pair.key);
        current = current.nextNode;
      }
    }
    return keys;
  }

  values() {
    let values = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] == undefined) {
        continue;
      }

      let current = this.buckets[i].head;

      while (current != null) {
        values.push(current.pair.value);
        current = current.nextNode;
      }
    }
    return values;
  }

  entries() {
    let entries = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i] == undefined) {
        continue;
      }

      let current = this.buckets[i].head;

      while (current != null) {
        entries.push([current.pair.key, current.pair.value]);
        current = current.nextNode;
      }
    }
    return entries;
  }
}

export { HashMap, LinkedList };

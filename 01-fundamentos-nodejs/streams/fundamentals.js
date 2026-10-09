// process.stdin.pipe(process.stdout);

import { Readable, Writable, Transform } from "node:stream";

class OneToHandredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);

    // if (i > 100) {
    //   this.push(null);
    // } else {
    //   const buf = Buffer.from(String(i));

    //   this.push(buf);
    // }
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

class InverseNumberStream extends Transform {
  _transform(chunk, enconding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed)));
  }
}

new OneToHandredStream()
  .pipe(new InverseNumberStream())
  .pipe(new MultiplyByTenStream());

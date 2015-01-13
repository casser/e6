export class B64 {
  static get CHAR_TO_INTS() {
    return this.init('CHAR_TO_INTS');
  }
  static get INT_TO_CHARS() {
    return this.init('INT_TO_CHARS');
  }
  static init(key) {
    Object.defineProperties(this, {
      CHAR_TO_INTS: {value: {}},
      INT_TO_CHARS: {value: {}}
    });
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    .split('').forEach((c, i)=> {
          this['CHAR_TO_INTS'][c] = i;
          this['INT_TO_CHARS'][i] = c;
        });
    return this[key];
  }
  static encode(aNumber) {
    if (aNumber in B64.INT_TO_CHARS) {
      return B64.INT_TO_CHARS[aNumber];
    }
    throw new TypeError("Must be between 0 and 63: " + aNumber);
  }
  static decode(aChar) {
    if (aChar in B64.CHAR_TO_INTS) {
      return B64.CHAR_TO_INTS[aChar];
    }
    throw new TypeError("Not a valid base 64 digit: " + aChar);
  }
}
export class VLQ {

  static get BASE_SHIFT (){
    return 5
  }
  static get BASE_MASK (){
    return 0b011111
  }
  static get BASE_BIT (){
    return 0b100000
  }

  /**
   * Converts from a two-complement value to a value where the sign bit is
   * placed in the least significant bit.  For example, as decimals:
   *   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
   *   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
   */
  static toVLQSigned(aValue) {
    return aValue < 0
    ? ((-aValue) << 1) + 1
    : (aValue << 1) + 0;
  }
  /**
   * Converts to a two-complement value from a value where the sign bit is
   * placed in the least significant bit.  For example, as decimals:
   *   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
   *   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
   */
  static fromVLQSigned(aValue) {
    var isNegative = (aValue & 1) === 1;
    var shifted = aValue >> 1;
    return isNegative
    ? -shifted
    : shifted;
  }

  /**
   * Returns the base 64 VLQ encoded value.
   */
  static encode(aValue) {
    var encoded = "";
    var digit;

    var vlq = VLQ.toVLQSigned(aValue);

    do {
      digit = vlq & VLQ.BASE_MASK;
      vlq >>>= VLQ.BASE_SHIFT;
      if (vlq > 0) {
        // There are still more digits in this value, so we must make sure the
        // continuation bit is marked.
        digit |= VLQ.BASE_BIT;
      }
      encoded += B64.encode(digit);
    } while (vlq > 0);

    return encoded;
  }
  /**
   * Decodes the next base 64 VLQ value from the given string and returns the
   * value and the rest of the string via the out parameter.
   */
  static decode(aStr, aOutParam) {
    var i = 0;
    var strLen = aStr.length;
    var result = 0;
    var shift = 0;
    var continuation, digit;

    do {
      if (i >= strLen) {
        throw new Error("Expected more digits in base 64 VLQ value.");
      }
      digit = B64.decode(aStr.charAt(i++));
      continuation = !!(digit & VLQ.BASE_BIT);
      digit &= VLQ.BASE_MASK;
      result = result + (digit << shift);
      shift += VLQ.BASE_SHIFT;
    } while (continuation);

    aOutParam.value = VLQ.fromVLQSigned(result);
    aOutParam.rest = aStr.slice(i);
  }
}
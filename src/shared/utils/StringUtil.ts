class StringUtil {
  /**
   * Pseudo-random string generator
   * http://stackoverflow.com/a/27872144/383904
   * Default: return a random alpha-numeric string
   *
   * @param {number} len Desired length
   * @param {String} an Optional (alphanumeric), "a" (alpha), "n" (numeric)
   * @return {String}
   */
  static randomString(len: number, an?: string) {
    an = an && an.toLowerCase();
    let str = "",
      i = 0,
      min = an == "a" ? 10 : 0,
      max = an == "n" ? 10 : 62;
    for (; i++ < len;) {
      let r = Math.random() * (max - min) + min << 0;
      str += String.fromCharCode(r += r > 9 ? r < 36 ? 55 : 61 : 48);
    }
    return str;
  }

  static randomHexString(){
    return '#'+(Math.random()*0xFFFFFF<<0).toString(16);
  }
}


export default StringUtil;

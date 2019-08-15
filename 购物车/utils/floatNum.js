const FloatingPointCalculator = {
  add() {
    if (arguments.length < 1) {
      return;
    }
    let decimal = 0;
    const result = Array.from(arguments).reduce((acc, val) => {
      const dotIndex = val.toString().indexOf('.');

      if (dotIndex > -1 && val.toString().substr(dotIndex + 1).length > decimal) {
        decimal = val.toString().substr(dotIndex + 1).length;
      }
      return parseFloat(acc) + parseFloat(val);
    }, 0);

    return parseFloat(result.toFixed(decimal));
  },
  sub() {
    if (arguments.length < 1) {
      return;
    }
    const params = Array.from(arguments).map((val, idx) => {
      return idx > 0 ? -val : val;
    });

    return this.add(...params);
  },
  mult() {
    if (arguments.length < 1) {
      return;
    }
    let decimal = 0;
    const result = Array.from(arguments).reduce((acc, val) => {
      const dotIndex = val.toString().indexOf('.');

      if (dotIndex > -1) {
        decimal += val.toString().substr(dotIndex + 1).length;
      }
      return parseFloat(acc) * parseFloat(val);
    }, 1);

    return parseFloat(result.toFixed(decimal));
  },
  div() {
    if (arguments.length < 1) {
      return;
    }

    return Array.from(arguments).reduce((acc, val) => {
      return parseFloat(acc) / parseFloat(val);
    });
  }
};

module.exports.FloatingPointCalculator = FloatingPointCalculator
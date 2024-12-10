class Formatter {
  static currency(value, decimals = 2) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: decimals
    }).format(value);
  }
}

export { Formatter as F };

const regexPatterns = {
  // Email validation
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // URL validation
  url: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/,

  // Phone number validation (US format)
  phoneNumber: /^\(?([0-9]{3})\)?[-.●]?([0-9]{3})[-.●]?([0-9]{4})$/,

  // Date validation (YYYY-MM-DD format)
  date: /^(19|20)\d\d-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,

  // Time validation (HH:MM format, 24-hour clock)
  time: /^([01]\d|2[0-3]):([0-5]\d)$/,

  // Username validation (alphanumeric, 3-16 characters)
  username: /^[a-zA-Z0-9]{3,16}$/,

  // Password validation (min 8 characters, at least one uppercase, one lowercase, one digit, and one special character)
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,

  // Hex color validation
  hexColor: /^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,

  // IP address validation (IPv4)
  ipv4: /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/,

  // MAC address validation
  macAddress: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/,

  // Credit card validation (basic)
  creditCard:
    /^4[0-9]{12}(?:[0-9]{3})?$|^5[1-5][0-9]{14}$|^3[47][0-9]{13}$|^3(?:0[0-5]|[68][0-9])[0-9]{11}$|^6(?:011|5[0-9]{2})[0-9]{12}$|^(?:2131|1800|35\d{3})\d{11}$/,

  // Zip code validation (US format)
  zipCode: /^[0-9]{5}(?:-[0-9]{4})?$/,

  // HTML tag sanitization
  htmlTag: /<\/?[^>]+(>|$)/g
}

export default regexPatterns

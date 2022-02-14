const bcrypt = require("bcrypt");
const crypto = require("crypto");


const saltRounds = 10;

/**
 *
 * @param {string} password Plaintext password.
 * @returns SHA-256 hash of the password encoded in base64.
 */
function preHashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("base64");
}

/**
 *
 * @param {string} password Plaintext password.
 * @returns Hash calculated from the password.
 */
function encryptPassword(password) {
  const preHashed = preHashPassword(password);
  return bcrypt.hash(preHashed, saltRounds);
}

/**
 *
 * @param {string} password Plaintext password to confirm.
 * @param {string} hashedPassword Hash to which the password will be compared.
 * @returns Promise that resolves to true if the password matches the hash.
 */
 function confirmPassword(password, hashedPassword) {
  return bcrypt.compare(preHashPassword(password), hashedPassword);
}

/**
 *
 * @returns A cryptographically random identifier as a hex string.
 */
const createPasswordResetId = () => {
  return crypto.randomBytes(27).toString("hex");
};

/**
 *
 * @returns A randomly generated password as a base64 string.
 */
const generatePassword = () => {
  return crypto.randomBytes(15).toString("base64");
};

module.exports = {
  encryptPassword,
  confirmPassword,
  createPasswordResetId,
  generatePassword,
};

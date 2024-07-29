const bcrypt = require('bcrypt');

/**
 * Encrypts a plain text password.
 * @param {string} plainPassword - The plain text password to encrypt.
 * @returns {Promise<string>} The hashed password.
 */
async function encryptPassword(plainPassword) {
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt with 10 rounds
        const hashedPassword = await bcrypt.hash(plainPassword, salt); // Hash the password with the generated salt
        return hashedPassword;
    } catch (error) {
        throw new Error('Error encrypting password');
    }
}

async function comparePassword(plainPassword, hashPassword) {
    try {
        const result = await bcrypt.compare(plainPassword, hashPassword); 
        return result;
    } catch (err) {
        throw new Error("Error comparing password");
    }
}

module.exports = {
    encryptPassword,
    comparePassword
}

const bcrypt = require ("bcrypt");

//PASSWORD HASHING
const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};
//COMPARE PASSWORDS
const comparePassword = async (password, hashedPassword) => {
  try {
    return bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {hashPassword,comparePassword}

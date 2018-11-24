module.exports = {
  foPool: {
    user: process.env.FO_USER,
    password: process.env.FO_PASSWORD,
    connectString: process.env.FO_CONNECTIONSTRING,
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  }
}; 
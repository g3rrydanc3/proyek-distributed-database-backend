var oracledb = require('oracledb');
var dbConfig = require('./dbconfig.js');

async function run() {
  let connection;

  try {

    let sql, binds, options, result;

    connection = await oracledb.getConnection(  {
      user          : dbConfig.user,
      password      : dbConfig.password,
      connectString : dbConfig.connectString
    });

    // Create a table

    await connection.execute(
      `BEGIN
         EXECUTE IMMEDIATE 'DROP TABLE mytab';
         EXCEPTION
         WHEN OTHERS THEN
           IF SQLCODE NOT IN (-00942) THEN
             RAISE;
           END IF;
       END;`);

    await connection.execute(
      `CREATE TABLE mytab (id NUMBER, data VARCHAR2(20))`);

    // Insert some data

    sql = `INSERT INTO mytab VALUES (:1, :2)`;

    binds = [ [101, "Alpha" ], [102, "Beta" ], [103, "Gamma" ] ];

    // For a complete list of options see the documentation.
    options = {
      autoCommit: true,
      // batchErrors: true,  // continue processing even if there are data errors
      bindDefs: [
        { type: oracledb.NUMBER },
        { type: oracledb.STRING, maxSize: 20 }
      ]
    };

    result = await connection.executeMany(sql, binds, options);

    console.log("Number of rows inserted:", result.rowsAffected);

    // Query the data

    sql = `SELECT * FROM mytab`;

    binds = {};

    // For a complete list of options see the documentation.
    options = {
      outFormat: oracledb.OBJECT   // query result format
      // extendedMetaData: true,   // get extra metadata
      // fetchArraySize: 100       // internal buffer allocation size for tuning
    };

    result = await connection.execute(sql, binds, options);

    console.log("Column metadata: ", result.metaData);
    console.log("Query results: ");
    console.log(result.rows);

  } catch (err) {
    console.error(err);
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
}

run();
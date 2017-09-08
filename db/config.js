import r from "rethinkdb";

const DB_NAME = "my_finances";

// TODO: MAKE THIS FUNCTIONAL!! SO IT CAN BE REUSED

const createDB = async dbName => {
  try {
    const conn = await r.connect();
    r
      .dbList()
      .contains(dbName)
      .do(databaseExists => {
        return r.branch(databaseExists, { dbs_created: 0 }, r.dbCreate(dbName));
      })
      .run(conn);
  } catch (e) {
    console.log(e);
  }
};

const createTable = async tableName => {
  try {
    const conn = await r.connect();
    await createDB(DB_NAME);
    let table = r.db(DB_NAME).table(tableName);
    r
      .db(DB_NAME)
      .tableList()
      .contains(tableName)
      .do(r.branch(r.row, table, r.db(DB_NAME).tableCreate(tableName)));
  } catch (e) {
    console.error(e);
  }
};

export const getById = async (id, table) => {
  try {
    const conn = await r.connect();
    await createDB(DB_NAME);
    return r
      .db(DB_NAME)
      .table(table)
      .get(id)
      .run(conn);
  } catch (e) {
    console.error(e);
  }
};

// export const getAll = async (id, table) => {
//   try {
//     const conn = await r.connect();
//     await createDB(DB_NAME);
//     return r
//       .db(DB_NAME)
//       .table(table)
//       .run(conn);
//   } catch (e) {
//     console.error(e);
//   }
// };

export const insertInto = async (entry, table) => {
  try {
    const conn = await r.connect();
    await createDB(DB_NAME);

    return r
      .db(DB_NAME)
      .table(table)
      .insert(entry)
      .run(conn);
  } catch (e) {
    console.error(e);
  }
};

export const updateInto = async (entry, table) => {
  try {
    const conn = await r.connect();
    await createDB(DB_NAME);

    return r
      .db(DB_NAME)
      .table(table)
      .get(entry.id)
      .update(entry)
      .run(conn);
  } catch (e) {
    console.error(e);
  }
};

export const deleteFrom = async (id, table) => {
  try {
    const conn = await r.connect();
    await createDB(DB_NAME);
    return r
      .db(DB_NAME)
      .table(table)
      .get(id)
      .delete()
      .run(conn);
  } catch (e) {
    console.error(e);
  }
};

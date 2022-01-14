import { Sequelize } from "sequelize";
const { PGPORT, PGUSER, PGDATABASE, PGPASSWORD, PGHOST } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  port:PGPORT,
  host:PGHOST,
  dialect: "postgres",

   // if NODE_ENV === 'production' -->> provide dialectOptions : otherwise not
  //  ...(NODE_ENV === "production" && {
  //   dialectOptions: {
  //     ssl: {
  //       required: true,
  //       rejectUnauthorized: false,
  //     },
  //   },
  // }),
});

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate({ logging: false });
    console.log(" ✅ DB is authenticated");
  } catch (error) {
    console.log(" ❌ Failed to authenticate DB", error);
  }
};

export default sequelize;
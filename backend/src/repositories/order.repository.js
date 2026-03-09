const fs = require("fs");

const FILE_PATH = "./orders.json";

function readOrders() {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify([]));
      return [];
    }

    const data = fs.readFileSync(FILE_PATH, "utf8");

    if (!data) return [];

    return JSON.parse(data);

  } catch (err) {
    console.error("READ ORDERS ERROR:", err);
    return [];
  }
}

function saveOrders(data) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("SAVE ORDERS ERROR:", err);
  }
}

module.exports = {
  readOrders,
  saveOrders,
};
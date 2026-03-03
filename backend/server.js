const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;
const FILE_PATH = path.join(__dirname, "orders.json");

app.use(cors());
app.use(express.json());

/* ================================
   UTILITIES
================================ */

function readOrders() {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, "[]");
      return [];
    }

    const data = fs.readFileSync(FILE_PATH, "utf-8");

    if (!data.trim()) return [];

    return JSON.parse(data);
  } catch (err) {
    console.error("READ ERROR:", err.message);
    return [];
  }
}

function saveOrders(data) {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("WRITE ERROR:", err.message);
    throw new Error("Failed to save orders");
  }
}

function generateId() {
  return Date.now();
}

/* ================================
   ROUTES
================================ */

// GET all orders
app.get("/orders", (req, res) => {
  const orders = readOrders();
  res.status(200).json(orders);
});

// GET single order
app.get("/orders/:id", (req, res) => {
  const orders = readOrders();
  const id = Number(req.params.id);

  const order = orders.find(o => o.id === id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  res.json(order);
});

// CREATE order
app.post("/orders", (req, res) => {
  const orders = readOrders();

  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body is empty" });
  }

  const newOrder = {
    id: generateId(),
    status: "pending",
    createdAt: new Date().toISOString(),
    ...req.body,
  };

  orders.push(newOrder);
  saveOrders(orders);

  res.status(201).json(newOrder);
});

// UPDATE order
app.patch("/orders/:id", (req, res) => {
  const orders = readOrders();
  const id = Number(req.params.id);

  const index = orders.findIndex(o => o.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Order not found" });
  }

  orders[index] = {
    ...orders[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  saveOrders(orders);

  res.json(orders[index]);
});

// DELETE order
app.delete("/orders/:id", (req, res) => {
  const orders = readOrders();
  const id = Number(req.params.id);

  const filtered = orders.filter(o => o.id !== id);

  if (filtered.length === orders.length) {
    return res.status(404).json({ message: "Order not found" });
  }

  saveOrders(filtered);

  res.json({ message: "Order deleted" });
});

/* ================================
   GLOBAL ERROR HANDLER
================================ */

app.use((err, req, res, next) => {
  console.error("UNHANDLED ERROR:", err.stack);
  res.status(500).json({ message: "Internal Server Error" });
});

/* ================================
   START SERVER
================================ */

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON http://localhost:${PORT}`);
});
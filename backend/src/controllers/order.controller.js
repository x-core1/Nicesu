const { updateOrder, fetchOrders } = require("../services/order.service");

function patchOrder(req, res) {
  try {
    const id = req.params.id;
    const result = updateOrder(id, req.body);

    res.json(result);

  } catch (err) {
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error"
    });
  }
}

function getOrders(req, res) {
  try {
    const orders = fetchOrders();
    res.json(orders);

  } catch {
    res.status(500).json({
      message: "Failed to fetch orders"
    });
  }
}

module.exports = {
  patchOrder,
  getOrders
};
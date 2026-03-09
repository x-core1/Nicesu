const { readOrders, saveOrders } = require("../repositories/order.repository");

function updateOrder(id, payload) {
  const orders = readOrders();

  const index = orders.findIndex(
    o => Number(o.id) === Number(id)
  );

  if (index === -1) {
    throw { status: 404, message: "Order not found" };
  }

  const current = orders[index];

  if (current.status === "REJECTED" || current.status === "SHIPPED") {
    throw {
      status: 400,
      message: "Order already finalized"
    };
  }

  let updatedOrder = { ...current };

  // APPROVE = just mark approved (no shipping yet)
  if (payload.status === "APPROVED") {
    updatedOrder.status = "APPROVED";
  }

  // SHIPPING = must have date
  else if (payload.status === "SHIPPED") {
    if (!payload.shippingDate) {
      throw { status: 400, message: "Shipping date required" };
    }

    updatedOrder.status = "SHIPPED";
    updatedOrder.shippingDate = payload.shippingDate;
  }

  else if (payload.status === "REJECTED") {
    if (!payload.rejectionReason) {
      throw { status: 400, message: "Reject reason required" };
    }

    updatedOrder.status = "REJECTED";
    updatedOrder.rejectionReason = payload.rejectionReason;
  }

  updatedOrder.updatedAt = new Date().toISOString();

  orders[index] = updatedOrder;

  saveOrders(orders);

  return updatedOrder;
}


import prisma from '../config/prisma.js';



export const createOrder = async (req, res) => {
  const userId = req.user.id;
  const { items, totalPrice } = req.body; 

  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ error: "Order items are empty" });
    }

    const order = await prisma.$transaction(async (tx) => {
      // 1. Deduct stock for every item
      for (const item of items) {
        const updatedProduct = await tx.product.update({
          where: { 
            id: item.productId,
            stock: { gte: item.quantity } 
          },
          data: { stock: { decrement: item.quantity } }
        });

        if (!updatedProduct) {
          throw new Error(`Insufficient stock for one of the items.`);
        }
      }

      return await tx.order.create({
        data: {
          userId,
          totalPrice: Number(totalPrice),
          items: items, 
          orderItems: {            
            create: items.map(item => ({
              product: { connect: { id: item.productId } }, 
              price: Number(item.product.price) 
            }))
          }
        }
      });
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(400).json({ error: error.message || "Checkout failed" });
  }
};





export const getMyOrders = async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.id },
  });
  res.json(orders);
};

export const getAllOrders = async (req, res) => {
  const orders = await prisma.order.findMany();
  res.json(orders);
};

export const updateOrder = async (req, res) => {
  try {
    const updatedOrder = await prisma.order.update({
      where: { id: req.params.id },
      data: { isDelivered: true }, 
    });
    res.json(updatedOrder);
  } catch (error) {
    res.status(400).json({ error: "Order not found or update failed" });
  }
};


export const deleteOrder = async (req, res) => {
  try {
    await prisma.order.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Order removed" });
  } catch (error) {
    res.status(400).json({ error: "Order not found" });
  }
};
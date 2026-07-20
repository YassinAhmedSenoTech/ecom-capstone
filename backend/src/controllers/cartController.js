


import prisma from '../config/prisma.js';

export const addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; 

  try {
    let cart = await prisma.cart.findFirst({ where: { userId } });
    if (!cart) {
      cart = await prisma.cart.create({ data: { userId } });
    }

    const cartItem = await prisma.cartItem.create({
      data: { cartId: cart.id, productId },
      include: { product: true } 
    });

    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

export const getCart = async (req, res) => {
  const userId = req.user.id;
  try {
    const cart = await prisma.cart.findFirst({
      where: { userId },
      include: { items: { include: { product: true } } } 
    });
    
    res.json(cart ? cart.items : []);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};




export const removeFromCart = async (req, res) => {
  const { id } = req.params; 
  try {
    await prisma.cartItem.delete({
      where: { id: id }
    });
    res.status(200).json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ error: "Failed to remove item" });
  }
};


export const clearCart = async (req, res) => {
  try {
    await prisma.cart.deleteMany({
      where: { userId: req.user.id }
    });
    
    res.json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ error: "Failed to clear cart" });
  }
};
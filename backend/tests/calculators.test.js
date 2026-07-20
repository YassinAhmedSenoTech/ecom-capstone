

const calculateOrderTotal = (items, taxRate = 0.1) => {
  if (!Array.isArray(items) || items.length === 0) return 0;
  
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const tax = subtotal * taxRate;
  
  return Number((subtotal + tax).toFixed(2));
};

describe('Order Calculation Business Logic', () => {
  
  it('should calculate the correct total with tax for multiple items', () => {
    const items = [
      { price: 50, quantity: 2 }, 
      { price: 25, quantity: 4 }  
    ];
    
    const total = calculateOrderTotal(items, 0.1);
    expect(total).toBe(220);
  });

  it('should return 0 for an empty cart array', () => {
    const total = calculateOrderTotal([]);
    expect(total).toBe(0);
  });

  it('should handle custom tax rates correctly', () => {
    const items = [{ price: 100, quantity: 1 }]; 
    
    const total = calculateOrderTotal(items, 0.2);
    expect(total).toBe(120);
  });

});
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('*/auth/register', () => {
    return HttpResponse.json(
      { message: 'Registered successfully' },
      { status: 200 }
    );
  }),

  http.get('*/categories', () => {
    return HttpResponse.json([
      { id: '1', name: 'Electronics' },
      { id: '2', name: 'Peripherals' }
    ]);
  }),

  http.get('*/auth/profile', () => {
    return HttpResponse.json({
      name: 'Test User',
      email: 'test@example.com'
    });
  }),

  http.get('*/products', () => {
    return HttpResponse.json({
      products: [
        { id: '1', name: 'Test Product', price: 19.99, category: 'Electronics' }
      ],
      totalPages: 1,
    });
  }),
];
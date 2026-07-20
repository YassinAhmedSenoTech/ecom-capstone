import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Products from '../pages/Products';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

test('renders products from the API', async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <Products />
      </MemoryRouter>
    </QueryClientProvider>
  );

  const product = await waitFor(() => screen.getByText('Test Product'));
  expect(product).toBeInTheDocument();
});
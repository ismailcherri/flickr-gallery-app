import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const intersectionObserverMock = () => ({
    observe: () => null,
    unobserve: () => null,
  });
  window.IntersectionObserver = jest
    .fn()
    .mockImplementation(intersectionObserverMock);
  render(<App />);
  const linkElement = screen.getByText(/Flicker Gallery/i);
  expect(linkElement).toBeInTheDocument();
});

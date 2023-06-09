// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import axios from 'axios';
import UrlShortenerInput from './UrlShortenerInput';

jest.mock('axios');

describe('UrlShortenerInput component', () => {
  test('displays error message for empty URL', async () => {
    render(<UrlShortenerInput />);
    
    const shortenButtonElement = screen.getByText('Shorten URL');
    fireEvent.click(shortenButtonElement);
    
    const errorMessageElement = await screen.findByText(process.env.REACT_APP_URL_ERROR);
    expect(errorMessageElement).toBeInTheDocument();
  });

  test('displays error message for failed URL shortening', async () => {
    const mockErrorMessage = 'Failed to shorten URL';
    axios.post.mockRejectedValueOnce({ response: { data: { msg: mockErrorMessage } } });

    render(<UrlShortenerInput />);
    
    const urlInputElement = screen.getByRole('textbox');
    const shortenButtonElement = screen.getByText('Shorten URL');
    
    fireEvent.change(urlInputElement, { target: { value: 'https://example.com' } });
    fireEvent.click(shortenButtonElement);
    
    const errorMessageElement = await screen.findByText(mockErrorMessage);
    expect(errorMessageElement).toBeInTheDocument();
  });
});
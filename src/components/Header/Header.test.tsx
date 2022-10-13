import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor
} from "@testing-library/react";

import { Header } from ".";

import mockAxios from 'axios';
import { movieDate } from '../../__mocks__/const';

jest.mock('axios');

afterEach(cleanup);

const mockedAxios = mockAxios as jest.Mocked<typeof mockAxios>;

describe('Header component', () => {

  it('renders corrently', () => {

    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByAltText("Logo The Movie Database")).toBeInTheDocument();
  });

  it('simulating click on search icon to enable search input', () => {
    render(
      <Router>
        <Header />
      </Router>
    );
    const iconSearch = screen.getByAltText('Imagem de uma Lupa');

    fireEvent.click(iconSearch);

    expect(screen.getByTestId("input-search")).toBeInTheDocument();
  });

  it('user searches and should get the searched movie', async () => {

    const searchString = 'Suicide Squad';

    render(
      <Router>
        <Header />
      </Router>
    );

    const subscribeButton = screen.getByAltText('Imagem de uma Lupa');

    fireEvent.click(subscribeButton);

    const input = screen.getByTestId("input-search");

    fireEvent.change(input, { target: { value: searchString } });

    mockedAxios.get.mockResolvedValue(movieDate);

    await waitFor(() => (
      expect(screen.getByText('Suicide Squad'))).toBeInTheDocument()
    );
  });
});

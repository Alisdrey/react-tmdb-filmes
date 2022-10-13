import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import mockAxios from 'axios';

import { Home } from '../../pages/Home';

import { movieDate } from '../../__mocks__/const';

jest.mock('axios');

afterEach(cleanup);

const mockedAxios = mockAxios as jest.Mocked<typeof mockAxios>;

describe('Home component', () => {

  afterEach(jest.clearAllMocks);

  it('renders correctly', async () => {

    render(
      <Router>
        <Home />
      </Router>
    );

    expect(screen.getByTestId("home-section")).toBeInTheDocument();
  });

  it('should succeed in api call', async () => {

    mockedAxios.get.mockResolvedValue(movieDate);

    render(
      <Router>
        <Home />
      </Router>
    );

    await waitFor(() => expect(mockAxios.get).toHaveBeenCalled());
  });
});

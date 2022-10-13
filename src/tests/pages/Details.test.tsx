import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { cleanup, render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";

import { Details } from '../../pages/Details';

import mockAxios from 'axios';
import { movieDateDetails } from '../../__mocks__/const';

jest.mock('axios');

afterEach(cleanup);

const mockedAxios = mockAxios as jest.Mocked<typeof mockAxios>;

describe('Details component', () => {

  afterEach(jest.clearAllMocks);

  test('should get skeleton component on screen', async () => {

    const { container } = render(
      <Router>
        <Details />
      </Router>
    );

    const classLoading = container.getElementsByClassName('react-loading-skeleton');

    await waitFor(() => (
      expect(classLoading.length)).toBe(1)
    );
  });

  test('should get movie title', async () => {
    window.scrollTo = jest.fn();
    mockedAxios.get.mockResolvedValue(movieDateDetails);

    render(
      <Router>
        <Details />
      </Router>
    );

    expect(screen.getByTestId("loading-id")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId("loading-id"));

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Fight Club")).toBeInTheDocument();
  });
});

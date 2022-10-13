import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import * as router from 'react-router';

import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved
} from "@testing-library/react";
import mockAxios from 'axios';

import { FeatureMovie } from ".";

import { movieDate } from "../../__mocks__/const";

jest.mock('axios');

const navigate = jest.fn();

beforeEach(() => {
  jest.spyOn(router, 'useNavigate').mockImplementation(() => navigate);
});

afterEach(cleanup);

const mockedAxios = mockAxios as jest.Mocked<typeof mockAxios>;

describe('FeatureMovie component', () => {

  afterEach(jest.clearAllMocks);

  test('should get skeleton component on screen', async () => {

    render(
      <Router>
        <FeatureMovie />
      </Router>
    );

    expect(screen.getByTestId("loading-id")).toBeInTheDocument();
  });

  test('should get movie title', async () => {

    mockedAxios.get.mockResolvedValue(movieDate);

    render(
      <Router>
        <FeatureMovie />
      </Router>
    );

    expect(screen.getByTestId("loading-id")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId("loading-id"));

    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(screen.getByText("Suicide Squad")).toBeInTheDocument();
  });

  test('click button and redirect to movie details', async () => {

    mockedAxios.get.mockResolvedValue(movieDate);

    render(
      <Router>
        <FeatureMovie />
      </Router>
    );

    expect(screen.getByTestId("loading-id")).toBeInTheDocument();

    await waitForElementToBeRemoved(() => screen.getByTestId("loading-id"));

    const btnMoreInformation = screen.getByTestId("btn-id");

    fireEvent.click(btnMoreInformation);

    expect(navigate).toHaveBeenCalledWith('/details/297761');
  });
});
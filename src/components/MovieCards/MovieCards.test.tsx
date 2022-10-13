import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen, waitFor } from "@testing-library/react";

import { MovieCards } from ".";

import { movieDate } from '../../__mocks__/const';

describe('MovieCards component', () => {

  it('should get 20 skeleton component on screen', async () => {

    const { container } = render(
      <Router>
        <MovieCards listMovie={[]} loading={true} />
      </Router>
    );

    const classLoading = container.getElementsByClassName('react-loading-skeleton');

    expect(classLoading.length).toBe(20);
  });

  it('should get movie card list', async () => {

    render(
      <Router>
        <MovieCards listMovie={movieDate.data.results} loading={false} />
      </Router>
    );

    await waitFor(() => (expect(screen.getByText("Jason Bourne"))).toBeInTheDocument());
  });
});

import * as React from 'react';
import { render, screen } from '@testing-library/react';

import VirtualizedList from './VirtualizedList'
import { Provider } from 'react-redux';
import {store} from "../app/store"

describe('Virtualized List', () => {
  it('Displays the list elements in the dom', () => {

    const tempData = [
        {
            id:1,
            firstName: "Leo",
            lastName: "Moore"
        },
        {
            id:2,
            firstName: "Blake",
            lastName: "Smith"
        },
        {
            id:3,
            firstName: "Brad",
            lastName: "Pitt"
        }
    ]

    render( <Provider store={store}>
        <VirtualizedList message={""} person={{}} data={tempData} />
    </Provider> );

    // screen.debug();

    expect(screen.getByTestId("listItem-0")).toBeInTheDocument();

    expect(screen.getByTestId("listItem-1")).toBeInTheDocument();

    expect(screen.getByTestId("listItem-2")).toBeInTheDocument();

    expect(screen.queryByTestId("listItem-3")).not.toBeInTheDocument();

  });

  it("Displays a message to the user when there are no users to show", () => {

    render( <Provider store={store}>
        <VirtualizedList message={"No members added yet!"} person={{}} data={[]} />
    </Provider> );

    expect(screen.queryByText("No members added yet!")).toBeInTheDocument();

    expect(screen.queryByTestId("listItem-0")).not.toBeInTheDocument();

  })
});
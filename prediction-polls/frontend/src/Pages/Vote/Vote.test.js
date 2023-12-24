import React from 'react';
import ReactDom from 'react-dom';
import { render, fireEvent, screen, act, waitFor } from '@testing-library/react';
import Vote from './index.jsx';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';

describe('Vote', () => {
    test('renders the vote page with the poll whose ID is 1', async () => {
        const pollID = 1;
        const route = `/vote/${pollID}`;
        render(
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/vote/:id" element={<Vote />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText('How many points do you want to place?')).toBeInTheDocument();
        });

    });
    test('Check if the discrete poll with the ID 4 is rendered correctly', async () => {
        const pollID = 4;
        const route = `/vote/${pollID}`;
        render(
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/vote/:id" element={<Vote />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText('Choose the option you want to vote for')).toBeInTheDocument();
        });

    });
    test('Check if the continuous poll with the ID 5 is rendered correctly', async () => {
        const pollID = 5;
        const route = `/vote/${pollID}`;
        render(
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/vote/:id" element={<Vote />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText('Please enter a suitable answer to the poll')).toBeInTheDocument();
        });

    });
    test('Check if the betting mechanism rejects non-numeric bet points', async () => {
        const pollID = 5;
        const route = `/vote/${pollID}`;
        render(
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/vote/:id" element={<Vote />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            const inputElement = document.getElementById('bet');
            const buttonElement = document.getElementById('submitButton');
            fireEvent.change(inputElement, { target: { value: 'AER34' } });
            fireEvent.click(buttonElement);
            expect(screen.getByText('The bet points should be integer numbers!')).toBeInTheDocument();
        });

    });
    test('Check if you can vote without any input', async () => {
        const pollID = 5;
        const route = `/vote/${pollID}`;
        render(
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/vote/:id" element={<Vote />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            const inputElement = document.getElementById('bet');
            const buttonElement = document.getElementById('submitButton');
            fireEvent.change(inputElement, { target: { value: '100' } });
            fireEvent.click(buttonElement);
            expect(screen.getByText('The response should be numeric!')).toBeInTheDocument();
        });

    });

    test('Check if you can see the annotation', async () => {
        const pollID = 43;
        const route = `/vote/${pollID}`;
        render(
            <MemoryRouter initialEntries={[route]}>
                <Routes>
                    <Route path="/vote/:id" element={<Vote />} />
                </Routes>
            </MemoryRouter>
        );
        await waitFor(() => {
            const poll = document.getElementById('poll_div'); 
            fireEvent.contextMenu(poll);
            const contextMenuOption = getByText('Display All Annotations');
            fireEvent.click(contextMenuOption);
            expect(screen.getElementById('Annotation_list')).toBeInTheDocument();
        });

    });
});


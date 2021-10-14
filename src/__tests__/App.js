import React from 'react';
import App from '../App';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

test('<App /> Funciona', () => {
    render( <App /> );
});

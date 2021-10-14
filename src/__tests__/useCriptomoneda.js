import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import Formulario from '../components/Formulario.js';
import { criptos, monedas } from '../__mocks__/criptomonedas';
import axios from 'axios';

const mockAxios = axios;
const guardarMoneda = jest.fn();
const guardarCriptomoneda = jest.fn();

test( '<useCriptomoneda />', async () => {

    //Consumiendo datos de apiMock
    mockAxios.get = jest.fn().mockResolvedValue({
        data: criptos
    });
    
    render(
        <Formulario 
            guardarMoneda={guardarMoneda}
            guardarCriptomoneda={guardarCriptomoneda} 
        />
    );

    //Verificar la cantidad de opciones de select-moneda.
    const monedasDropdwon = screen.getByTestId('select-monedas');
    expect( monedasDropdwon.children.length ).toEqual(monedas.length + 1);

    //Verificar opciones de Criptomonedas select
    const opciones = screen.findAllByTestId('opcion-cripto');
    expect( await opciones ).toHaveLength(10);

    expect( mockAxios.get ).toHaveBeenCalled();
    expect( mockAxios.get ).toHaveBeenCalledTimes(1);

    // Seleccionar BITCOIN y USD
    userEvent.selectOptions( screen.getByTestId('select-monedas'), 'USD' );
    userEvent.selectOptions( screen.getByTestId('select-cripto'), 'BTC' );

    //Submit a formulario
    userEvent.click( screen.getByTestId('btn-submit') );

    // Verificar llamado de funciones 
    expect( guardarMoneda ).toHaveBeenCalled();
    expect( guardarMoneda ).toHaveBeenCalledTimes(1);
    expect( guardarCriptomoneda ).toHaveBeenCalled();
    expect( guardarCriptomoneda ).toHaveBeenCalledTimes(1);


});


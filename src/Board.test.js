import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Board from './Board';
import Cell from './Cell';


// checking for a win and showing a “You won!” message.

it('should render', ()=> {
    render(<Board />);
})

it('should match snapshot', ()=> {
    const {asFragment} = render(<Board chanceLightStartsOn={1.0}/>);
    expect(asFragment()).toMatchSnapshot();
})
it('should render Cell properly', ()=> {
    const result = render(<Board />);
    const cell = result.container.querySelector('.Cell');
    expect(cell).toBeInTheDocument();
})
it('should handle clicks', ()=> {
    const result = render(<Board chanceLightStartsOn={1.0}/>);
    fireEvent.click(result.container.querySelector('.Cell'));
    expect(result.container.querySelector('.Cell-lit')).not.toBe(null);
})
it('should show win message on a win', ()=> {
    const {getByText} = render(<Board chanceLightStartsOn={.0}/>);
    const winMsg = getByText('GAME IS OVER. YOU HAVE WON.')
    expect(winMsg).toBeInTheDocument();
})

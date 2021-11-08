import React from "react";
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";

import Display from './../Display';
import fetchShow from './../../api/fetchShow';

//setting mock for our fetchShow API
jest.mock('./../../api/fetchShow')

const show = {
   //add in approprate test data structure here.
   name: 'Stranger Things',
   summary: 'Test Show',
   seasons:[
       {
           id: '1',
           name: 'Season 1',
           episodes: []
       },
       {
           id: '2',
           name: 'Season 2',
           episodes: []
       },
       {
           id: '3',
           name: 'Season 3',
           episodes: []
       },
   ]
}

test('renders without props', ()=>{
   render(<Display/>)
});

test('Fetch button shows component', async ()=>{
   //Arrange
   render(<Display show={null}/>)

   fetchShow.mockResolvedValueOnce( show )

   //act
   const showButton = screen.getByRole('button')
   userEvent.click(showButton)
   //assert
   const showData = await screen.findByTestId(/show-container/i)
   expect(showData).toBeInTheDocument()
})

test('Proper number of season options appear when button is clicked', async ()=>{
   render(<Display />);

   fetchShow.mockResolvedValueOnce( show )

   const showButton = screen.getByRole('button')
   userEvent.click(showButton)
   const seasonOptions = await screen.findAllByTestId(/season-option/i);
    //assert
    expect(seasonOptions).toHaveLength(3);
})

test('displayFunc is called on click of button', async ()=>{
   const displayFunc = jest.fn()
   render(<Display displayFunc={displayFunc} />);

   fetchShow.mockResolvedValueOnce( show )

   const showButton = screen.getByRole('button')
   userEvent.click(showButton)
   // const displayFunc = screen.findby(/season-option/i);
    //assert
    await waitFor(()=> expect(displayFunc).toHaveBeenCalledTimes(1)) 
})




///Tasks:
//1. Add in nessisary imports and values to establish the testing suite.
//2. Test that the Display component renders without any passed in props.
//3. Rebuild or copy a show test data element as used in the previous set of tests.
//4. Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
//5. Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
//6. Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.
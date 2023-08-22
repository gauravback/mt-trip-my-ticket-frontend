import React from 'react'
import "../styles/homePage.css";

export const HomePageComponent = () => {

    
  const swapValuehandler = () => {
    let from = document.getElementById("from");
    let to = document.getElementById("fromTo");
    let temp1 = from.value;
    let temp2 = to.value;
    // console.log(from,to)
    from.value = temp2
    to.value= temp1
  }


  return (
    <>
        <div className="homeInputBx" id='flightinputBx'>
            <div>
            <div className="homeInputs">
                <input name="type" type="radio" id='inputs' />
                <label for='inputs' className='mt-2'>ONE WAY</label>
            </div>
            <div className="homeInputs">
                <input checked name="type" type="radio" id='inputs2' />
                <label for='inputs2' className='mt-2'>ROUND TRIP</label>
            </div>
            <div className="homeInputs">
                <input name="type" type="radio" id='inputs3' />
                <label for='inputs3' className='mt-2'>MULTI CITY</label>
            </div>
            </div>
            <p>Book International and Domestic Flights</p>
        </div>
        {/*  */}
        <div className="homeMainSearchInput" id='homeMainSearchInputc1'>
            <div className="MainSearchinputBx">
            <span>FROM</span>
            <input id='from' type="text" value="Delhi" />
            <button onClick={swapValuehandler}><i className="fa fa-exchange"></i></button>
            </div>
            <div className="MainSearchinputBx">
            <span>TO</span>
            <input id='fromTo' type="text" value="Bangaluru" />
            </div>
            <div className="MainSearchinputBx">
            <span>DEPARTURE</span>
            <input type="date" />
            </div>
            <div className="MainSearchinputBx">
            <span>RETURN</span>
            <input type="date" />
            </div>
            <div className="MainSearchinputBx">
            <span>TRAVELLERS & CLASS</span>
            <input type="number" value={"1"} />
            </div>
        </div>
        {/*  */}
        <div className="Homeoptions" id='Homeoptions'>
            <h3>Select A <br /> Fare Type: </h3>
            <div className="optionsInputBx">
            <input type="radio" name='fares' />
            <p className='mt-3'>Regular Fares</p>
            </div>
            <div className="optionsInputBx">
            <input type="radio" name='fares' />
            <p className='mt-3'>Armed Forces Fares</p>
            </div>
            <div className="optionsInputBx">
            <input type="radio" name='fares' />
            <p className='mt-3'>Student Fares</p>
            </div>
            <div className="optionsInputBx">
            <input type="radio" name='fares' />
            <p className='mt-3'>Seniour Citizen Fares</p>
            </div>
            <div className="optionsInputBx">
            <input type="radio" name='fares' />
            <p className='mt-3'>Doctor & Nurse Fares</p>
            </div>
            <div className="optionsInputBx">
            <input disabled type="radio" name='fares' />
            <p className='mt-3'>Double Seat fares</p>
            </div>
        </div>
    </>
  )
}

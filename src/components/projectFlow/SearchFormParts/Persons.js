import React from 'react'
import {Input, Navbar, NavItem, Button, Row} from 'react-materialize'

import {mainFormFillEvents} from '../../../events/events'
class Persons extends React.Component{

handlePersons=(e)=>{
    mainFormFillEvents.emit ('handleSearchFormChange' , {name: e.target.name,value:e.target.value})
}

render (){
    return (
        <div>
            
            <Input 
            name ='Adults'
            s={6} 
            type='select' 
            label="adults" 
            labelClassName='black-text'
            onChange={this.handlePersons}>
                <option value='1'>1 Adult</option>
                <option value='2'>2 Adults</option>
                <option value='3'>3 Adults</option>
            </Input>

            <Input 
            name ='children'
            s={6} 
            type='select' 
            label="Children" 
            labelClassName='black-text'
            onChange={this.handlePersons}>
                <option value='0'> 0 </option>
                <option value='1'> 1 Chield</option>
                <option value='2'> 2 Children</option>
                <option value='3'> 3 Children</option>
            </Input>
        </div>
            
        
    )
}

}

export default Persons
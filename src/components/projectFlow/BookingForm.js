import React, { PureComponent } from 'react'

import TouristForm from './booking/TouristForm'
import OrderDetailes from './booking/OrderDetailes'
import MainContacts from './booking/MainContacts'
import {Input, Button} from 'react-materialize'


export default class BookingForm extends PureComponent {
  
  constructor(props) {
    super(props);
  
    let number = parseInt (this.props.location.state.adults)+ parseInt (this.props.location.state.children)
   
    let touristDataforState = []
    for (let i = 0; i < number; i++) {
      touristDataforState.push({
        firstName: '',
        lastName:'',
        passSeries:'',
        passNumber:'',
        passValidTill:'',
        

      })
    }


    this.state = { ... this.props.location.state,
       touristsData: touristDataforState, 
       contactTel:'', 
       contactEmail:'',
       validationErrors: ['Заполните все данные туристов']};
  }



  saveOrder=()=>{
    
    this.validate (this.state)
  }

  handleChange=(e, index=null)=>{
    // console.log (e.target.name)  
    // console.log (e.target.value)   
    // console.log(index)

    if (index !== null ) {

      let newTouristData = [...this.state.touristsData]
      newTouristData[index][e.target.name] = e.target.value

      this.setState ({touristsData: newTouristData})
    } else {
      this.setState ({[e.target.name]: e.target.value})
    }

   
}

validate=(state)=>{

  
  
  if (this.state.validationErrors.length !== 0) {

    for (let e of this.state.validationErrors) {
        window.Materialize.toast(e, 3000)
    }
    
}


}

  
  render() {
  // console.log(this.props)
  //console.log(  this.props.location.state)
  
  let formForEachTouristData = [];
  let number = parseInt (this.state.adults)+ parseInt (this.state.children)

  //console.log(number)
  for (let i = 0; i<number; i++) {
    formForEachTouristData.push(<TouristForm handleChange={this.handleChange} key={i} index={i}/>)
    
  }



    return (

      <main>
          

              <div className='row'>
                <div className='col s5'>
                <p className='black-text'>Статус заявки</p>
                <Input s={12} type='select' disabled>
                  <option  value='1'>Бронирование</option>
                  <option value='2'>Option 2</option>
                  <option value='3'>Option 3</option>
                </Input>
                </div>

                <div className='col s5'>
                <p className='black-text'>Статус оплаты</p>
                <Input s={12} type='select' disabled>
                  <option  value='1'>Неоплачено</option>
                  <option value='2'>Option 2</option>
                  <option value='3'>Option 3</option>
                </Input>
              </div>

              <div className='col s2'>
                <p className='black-text'>Стоимость тура</p>
                <div>{(parseInt (this.state.room.price.adult) * parseInt (this.state.adults) + 
                parseInt (this.state.room.price.children)* parseInt (this.state.children))*parseInt (this.state.night) }</div>
              </div>
              </div>



              <div>
                <p className="black-text flow-text">Проживание</p>
                <OrderDetailes
                hotel={this.state.hotel}
                room={this.state.room}
                night={this.state.night}
                date={this.state.date}
                ad={this.state.adults}
                ch={this.state.children}/>

              </div>
                  <MainContacts
                  handleChange={this.handleChange}
                  />
            
            {formForEachTouristData}
              
              
              <Button
              
              className="saveButton right green"
              waves='green'
              onClick={this.saveOrder}
              >Забронировать</Button>

         

      </main>
      
       
  
          
    )
  }
}
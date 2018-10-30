import React, { PureComponent } from 'react';
import {Input, Navbar, NavItem, Button, Row, Col, Preloader} from 'react-materialize'
import moment from 'moment'

//event flow
import {mainFormFillEvents} from '../../../events/events'

class DatePickers extends  PureComponent{

    handleChangeDates=(e, value)=>{
        mainFormFillEvents.emit('handleSearchForm', {name: e.target.name, value})
    }

    

render (){
    // максимальная дата доступная в календаре
    let result = new Date()
    result.setDate(result.getDate()+183)
    
    let dateOptions = {
        min: new Date(),
        max: result,
        monthsFull: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        weekdaysShort: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        monthsShort: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октября', 'Ноября', 'Декабря'],
        weekdaysFull: ['Воск', 'Пон', 'Вт', 'Ср', 'Чтв', 'Птн', 'Суб'],
        firstDay: 1,
        showMonthsShort: true,
        showWeekdaysFull: true,
        format: 'dd.mm.yyyy',
        today: '',
        clear: 'Очистить',
        close: 'Выбрать',
        closeOnSelect: true,
    }

    // let result1 = new Date()
    // result1.setDate(result.getDate()+4)

    // let dateOptions2 = {...dateOptions, max: result1}



    return (
    <div>
        <Input 
        s={6} 
        label='Заселение с'
        labelClassName='black-text' 
        name='dateFrom' 
        type='date' 
        onChange={(e, value)=>{this.handleChangeDates(e, value)}}
        options={dateOptions}
        value={this.props.valueFrom || ''}
        />

        <Input
        s={6} 
        label='Заселение по'
        labelClassName='black-text'  
        name='dateTo' 
        type='date' 
        onChange={(e, value)=>{this.handleChangeDates(e, value)}} 
        options={dateOptions}
        value={this.props.valueTo || ''}
        />
    </div>
    )
    }
}

export default DatePickers

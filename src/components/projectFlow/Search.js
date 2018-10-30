import React, { Component } from 'react';
import PropTypes from 'prop-types';

// url crypting 
import { Base64 } from 'js-base64';
import {isBase64} from 'is-base64'
// immutable proptypes
import ImmutablePropTypes from 'react-immutable-proptypes'


// redux
import { connect } from 'react-redux'

// to see Router and other

import queryString from 'query-string';


// action
import {fetchHotels} from '../../redux/hotelsActions'
import {seacrhFormHandleChangeRedux, priceListActivate, linkWithQuerToProps} from '../../redux/hotelsActions'


// form parts 
import NightsForm from './SearchFormParts/NightsForm'
import Persons from './SearchFormParts/Persons'
import DatePikers from './SearchFormParts/DatePickers'
import HotelsLists from './SearchFormParts/HotelsLists'
import StarsForm from './SearchFormParts/StarsForm'
import FoodForm from './SearchFormParts/FoodFrom'

// main parts
import PriceList from './PriceList'

// react materialize
import {Input, Button, Row, Col, Preloader} from 'react-materialize'

// events flow
import {mainFormFillEvents, queryStringEvent} from '../../events/events'



class Search extends Component{
    
    static propTypes= {
        hotels:PropTypes.oneOfType ([
            ImmutablePropTypes.listOf(),
            ImmutablePropTypes.listOf(
                ImmutablePropTypes.contains({
                    _id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    type: PropTypes.string.isRequired,
                    stars: PropTypes.number.isRequired,
                    rooms: ImmutablePropTypes.listOf(
                        ImmutablePropTypes.contains ({
                            name:PropTypes.string.isRequired,
                            accomodation: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
                            price: ImmutablePropTypes.map(
                                ImmutablePropTypes.contains({
                                adult:PropTypes.number,
                                children:PropTypes.number ,
                            }))
                        })
    
                    ),
                })
            ),
        ]),
        mainList:PropTypes.oneOfType([
            ImmutablePropTypes.listOf(),
            ImmutablePropTypes.listOf(
                ImmutablePropTypes.contains({
                    _id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    type: PropTypes.string.isRequired,
                    stars: PropTypes.number.isRequired,
                    rooms: ImmutablePropTypes.listOf(
                        ImmutablePropTypes.contains ({
                            name:PropTypes.string.isRequired,
                            accomodation: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
                            price: ImmutablePropTypes.map(
                                ImmutablePropTypes.contains({
                                adult:PropTypes.number,
                                children:PropTypes.number ,
                            }))
                        })
    
                    ),
                })
            )
            
          ]),
        selectedHotels:PropTypes.oneOfType([
            ImmutablePropTypes.listOf(),
            ImmutablePropTypes.listOf(
                ImmutablePropTypes.contains({
                    _id: PropTypes.string.isRequired,
                    name: PropTypes.string.isRequired,
                    type: PropTypes.string.isRequired,
                    stars: PropTypes.number.isRequired,
                    rooms: ImmutablePropTypes.listOf(
                        ImmutablePropTypes.contains ({
                            name:PropTypes.string.isRequired,
                            accomodation: ImmutablePropTypes.listOf(PropTypes.string).isRequired,
                            price: ImmutablePropTypes.map(
                                ImmutablePropTypes.contains({
                                adult:PropTypes.number,
                                children:PropTypes.number ,
                            }))
                        })
    
                    ),
                })
            )
            
          ]),
        hotelPending: PropTypes.bool.isRequired,
        hotelPendingErrors: PropTypes.string,
        datesError: ImmutablePropTypes.listOf (PropTypes.string),
        formMessages:ImmutablePropTypes.listOf (PropTypes.string),
        // for Price List Component
        priceListStatus: PropTypes.bool,
        dateFrom:PropTypes.string,
        dateTo:PropTypes.string,
        nights:ImmutablePropTypes.listOf(PropTypes.number),
        adults:PropTypes.number,
        children:PropTypes.number,
        isGetQueryString: PropTypes.bool

    }

   componentDidMount(){
      
    // если пропсы неизменного списка пусты просим список у сервера    
        if (this.props.hotels.size === 0){
            this.props.dispatch (fetchHotels)

        }

    // events listners
        mainFormFillEvents.addListener('handleSearchForm', this.handleChange )
        queryStringEvent.addListener('makeQueryString', this.createQueryLink )


        // if (this.props.location.search !== '') {
           
        //     let query = this.props.location.search
        //     // query = Base64.decode (this.props.location.search)
        //     const parsedHash = queryString.parse(query);
        //     //console.log(parsedHash)
        //     this.props.dispatch (linkWithQuerToProps(parsedHash))
            
        //     // if (valid === true) {

        //     //     // диспатчнуть новые пропсы для формы и создать как уже после поиска
        //     // } else {
        //     //     window.Materialize.toast ('Передана неверная ссылка',2000)
        //     //     //редирект на главну, смотря что откроет
        //     // }
        //     }
    }

    componentWillReceiveProps (newProps) {
       
        if (newProps.datesError.size != 0) {

            for (let e of newProps.datesError) {
                window.Materialize.toast(e, 3000)
            }

            
        }

        if (newProps.formMessages.size != 0) {

            for (let e of newProps.formMessages) {
                window.Materialize.toast(e, 3000)
            }
            
        }
       
         //console.log((this.props.isGetQueryString !== true && newProps.hotels.size !== 0))
        // console.log(this.props.isGetQueryString)
        // console.log(newProps.hotels.size)
        
        
        if ( newProps.hotels.size !== 0 && this.props.isGetQueryString !== true) {
            
            if (this.props.location.search !== '') {
           
                let query = this.props.location.search
                // query = Base64.decode (this.props.location.search)
                const parsedHash = queryString.parse(query);
                //console.log(parsedHash)
                this.props.dispatch (linkWithQuerToProps(parsedHash))
                
                // if (valid === true) {
    
                //     // диспатчнуть новые пропсы для формы и создать как уже после поиска
                // } else {
                //     window.Materialize.toast ('Передана неверная ссылка',2000)
                //     //редирект на главну, смотря что откроет
                // }
                }
           
        }
    }

    componentWillUnmount (){
        mainFormFillEvents.removeListener('handleSearchForm', this.handleChange)
        queryStringEvent.removeListener('makeQueryString', this.createQueryLink )
    }

    handleChange=(data)=>{
        let {value, name} = data
        this.props.dispatch (seacrhFormHandleChangeRedux (name, value ))   
    }

    searchButtonClick= ()=>{
        // создаем ссылку из адресной строки по параметрам поиска и 
        // let selectedHotelsValue = this.props.selectedHotels.toJS().map (el=>el._id)

       
        this.createQueryLink()

        this.props.dispatch (priceListActivate())
       
    }
    
    createQueryLink = ()=>{
        let selectedHotelsValue = this.props.selectedHotels.toJS()
        // console.log(selectedHotelsValue)
        selectedHotelsValue = selectedHotelsValue.map (el=>el._id)
        // console.log(selectedHotelsValue)
        let forURL = queryString.stringify({ 
            dateFrom: this.props.dateFrom, 
            dateTo: this.props.dateTo, 
            nights:this.props.nights.toJS().toString(),
            adults:this.props.adults,
            children:this.props.children,
            foodType: this.props.foodType,
            currentPage:this.props.currentPage,
            selectedHotels:selectedHotelsValue.toString(),
            
        })
              
        this.props.history.push({
            pathname: '/',
            search: forURL
          })
    }

  
    render() {

       console.log ("RENDER SEARCH")
       

       

       
    return (

        <main>
           
            <Row>
                <Col s={12}>
                    <h5>Даты начала тура</h5>
                    <DatePikers
                    valueFrom={this.props.dateFrom}
                    valueTo={this.props.dateTo}
                   />

                </Col>        
            </Row>

            <Row>
                <Col s={12}>
                    <h5>Количество ночей </h5>
                    <NightsForm
                    valueNights = {this.props.nights}
                    />
                </Col>
            </Row>

            <Row>
                <Col s={12}>
                <Persons
                childrenValue={this.props.children}
                adultValue={this.props.adults}

                />
                </Col>
                
            </Row>

            <Row>
                <Col s={6}>
                    <StarsForm/>
                </Col>

                <Col s={6}>
                    <FoodForm
                    foodValue={this.props.foodType}
                    />
                </Col>
            </Row>
            
            <Row>
                <Input s={12}
                name='search'
                onChange={(e)=>{
                    this.handleChange({
                        name: e.target.name,
                        value: e.target.value,
                        })

                }}
                className='center' 
                label="Поиск по названию"
                icon='search'
                >
                
                </Input>
            </Row>
            
            {this.props.hotelPending === true ? (
                <Row className='center'>
                <Col s={12}>
                    <Preloader flashing/>
                </Col>
                </Row>) : (   
                           <Row >
                           {(this.props.hotelPendingErrors === '') ? (
                                
                            <Col s={12}>
                            <h6 className='green-text'>Найдено отелей {this.props.mainList.size}</h6>
                            <HotelsLists 
                            hotels={this.props.mainList}
                            selectedHotels={this.props.selectedHotels}
                            />
                            </Col>
            ): (
                <div className='center red-text'>Ошибка сервера. Попробуйте позже </div>
                
                 
            )}
            </Row>)}
            
            
            <Row>
                
                <Col s={12}>
                <Button
                id='searchButton'
                disabled = {this.props.hotelPendingErrors != '' 
                || this.props.datesError.size != 0 ||  this.props.formMessages.size != 0 
                || this.props.dateFrom === null 
                || this.props.dateTo === null ? true : false} 
                large 
                className='green right'
                waves='light' 
                icon='search' 
                onClick={this.searchButtonClick}
                />
                </Col>
                
            </Row>    
            
            <Row>
                <Col s={12}>
                    {this.props.priceListStatus=== true ? 
                    <PriceList
                    dateFrom={this.props.dateFrom}
                    dateTo={this.props.dateTo}
                    nights={this.props.nights}
                    adults={this.props.adults}
                    children={this.props.children}
                    toShow={(this.props.selectedHotels.size == 0) ? this.props.hotels: this.props.selectedHotels}
                    dispatch={this.props.dispatch}
                    currentPage={this.props.currentPage}
                    
                    />: null}
                </Col>

            </Row>

        </main> 
      
    );
  }
}

let mapStateToProps = (state) => {
    
    return {
        hotels: state.hotelsData.get ('hotels'),
        mainList: state.hotelsData.get ('mainList'),
        selectedHotels:state.hotelsData.get ('selectedHotels'),
        hotelPending: state.hotelsData.get ('hotelPending'),
        hotelPendingErrors: state.hotelsData.get ('hotelPendingErrors'),
        datesError: state.hotelsData.get ('datesError'),
        formMessages: state.hotelsData.get ('formMessages'),
        foodType:state.hotelsData.get ('foodType'),
        // props for PriceList
        priceListStatus: state.hotelsData.get ('priceListStatus'),
        dateFrom:state.hotelsData.get ('dateFrom'),
        dateTo:state.hotelsData.get ('dateTo'),
        nights:state.hotelsData.get ('nights'),
        adults:state.hotelsData.get ('adults'),
        children:state.hotelsData.get ('children'),
        currentPage:state.hotelsData.get ('currentPage'),
        // queryString
        isGetQueryString:state.hotelsData.get ('isGetQueryString'),

 
        }
  }




export default connect(mapStateToProps)(Search);
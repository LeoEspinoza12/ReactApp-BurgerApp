import React, { Component } from 'react'

import {withRouter, Route } from 'react-router-dom'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'


class Checkout extends Component {

  state = {
    // ingredients: {
    //   salad: 1,
    //   meat: 1,
    //   cheese: 1,
    //   bacon: 1
    // },
    totalPrice: '',
    ingredients: null
  }

  componentWillMount(){
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {};
    
    let price = 0;
    for (let param of query.entries()){
      if(param[0] === 'price') {
        price = param[1]
      } else {
        ingredients[param[0]] = +param[1]
      }
    }
    
    this.setState({ingredients: ingredients, totalPrice: price})
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data') 
  }

  render() {
    // console.log('checkout props: ', this.props)
    return (
      <div>
        <CheckoutSummary 
          ingredients={this.state.ingredients}
          checkoutCancelled={this.checkoutCancelledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />  
        <Route 
          path={this.props.match.path + '/contact-data'} 
          render={(props) => (<ContactData 
                          ingredients={this.state.ingredients}
                          price={this.state.totalPrice}
                          {...props}
                          />
                        )}
        />
      </div>
    )
  }
}


export default withRouter(Checkout)
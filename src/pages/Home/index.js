import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart, MdShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';

import { ProductList } from './styles';
//import produce from 'immer';//

class Home extends Component {

    state = {
        products: [],
    };

    async componentDidMount() {
        
    }

    HandleAddProduct = product => {
        const { addToCart } = this.props;

        addToCart(product);
    };

  render() {
      const { products } = this.state;
      const { amount } = this.props;

    return (
            <ProductList>
                { products.map(product => (
             <li key={product.id}>
             <img 
                src={product.image}
                alt={product.title}
                />
                <strong>
                   {product.title} 
                </strong>
                <span>{product.priceFormatted}</span>

                <button type="button" onClick={() => this.HandleAddProduct(product)}>
                    <div>
                        <MdShoppingCart size={16} color="FFF" />{' '} 
                        {amount[product.id] || 0}
                    </div>

                    <span>ADICIONAR AO CARRINHO</span>
                </button>
            </li>
     ) ) }
           </ProductList>
    );
  }
} 

const mapStatetoProps = state => ({
    amount: state.cart.reduce((amount, product) => {
         amount[product.id] = product.amount;

         return amount;
    }, {})
});

const mapDispatchtoProps = dispatch =>
 bindActionCreators(CartActions, dispatch);

export default connect(
    mapStatetoProps,
    mapDispatchtoProps
    )(Home);
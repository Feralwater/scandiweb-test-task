import React, {Component} from 'react';
import {
  Attributes,
  AttributesContainer,
  Currency,
  Description,
  DescriptionContainer,
  Div,
  ImagesContainer,
  Img,
  Name,
  Price,
  ProductDescription,
  SmallImagesContainer,
  Span,
  ToCartButton
} from "../../styleComponents/ProductScreenStyles";
import {Container} from "../../styleComponents/HomeStyles";
import Header from "../header/Header";
import {connect} from "react-redux";
import {fetchProducts} from "../../actions/productActions";
import {addToCart} from "../../actions/cartActions";
import formatCurrency from "../../utils/formatCurrency";


class ProductScreen extends Component {
  constructor() {
    super();
    this.state = {
      imageIndex: 0,
      attributes: {},
    }
  }

  setSelectAttribute = (attribute, name) => {
    this.setState(
      {...this.state, attributes: {...this.state.attributes, [name]: attribute}}
    )
  }

  setSelectedImg = (index) => {
    this.setState({
      imageIndex: index,
    })
  }

  componentDidMount() {
    this.props.fetchProducts();
  }

  render() {

    const product = this.props.products?.find(x => x.name === this.props.match.params.name)

    return (<>
      {
        !this.props.products ?
          (<div>Loading...</div>)
          :
          (<>
            <Header/>
            <Container>
              <Div>


                <ImagesContainer>
                  <SmallImagesContainer>
                    {product.gallery.map((img, index) => (
                      <img
                        key={Math.floor(Math.random() * 10_0000)}
                        src={img} alt={this.props.match.params.name}
                        onClick={() => {
                          this.setSelectedImg(index)
                        }}
                      />))
                    }
                  </SmallImagesContainer>
                  <Img src={product.gallery[this.state.imageIndex]} alt={this.props.match.params.name}/>
                </ImagesContainer>


                <DescriptionContainer>
                  <Name>{product.name}</Name>
                  <ProductDescription>description</ProductDescription>
                  <Description>

                    {product.attributes.map(attribute => attribute.type === 'swatch' ?
                      (
                        (<div key={Math.random() * 10_0000}>
                            <Attributes>{attribute.name}:</Attributes>
                            <AttributesContainer>
                              {attribute.items.map(x =>
                                <Span
                                  active={this.state.attributes[attribute.name]}
                                  color={x.value}
                                  key={Math.random() * 10_0000}
                                  onClick={() => {
                                    this.setSelectAttribute(x.value, attribute.name)
                                  }}></Span>)
                              }
                            </AttributesContainer>
                          </div>
                        )
                      )
                      :
                      (
                        (<div key={Math.random() * 10_0000}>
                            <Attributes>{attribute.name}:</Attributes>
                            <AttributesContainer>{attribute.items.map(x =>
                              <Span
                                active={this.state.attributes[attribute.name]}
                                value={x.value}
                                key={Math.random() * 10_0000}
                                onClick={() => {
                                  this.setSelectAttribute(x.value, attribute.name)
                                }}>{x.value}</Span>)}</AttributesContainer>
                          </div>
                        )
                      )
                    )
                    }


                  </Description>
                  <Price>price:</Price>
                  <Currency> {formatCurrency(product.prices, this.props.currency).icon + formatCurrency(product.prices, this.props.currency).price}</Currency>
                  <ToCartButton onClick={() => this.props.addToCart(product)}>add to cart</ToCartButton>
                  <Description>{<div dangerouslySetInnerHTML={{__html: product.description}}></div>}</Description>
                </DescriptionContainer>
              </Div>
            </Container>
          </>)
      }
    </>);
  }
}


export default connect((state) => ({
    products: state.products.items,
    cartItems: state.cart.cartItems,
    currency: state.currency.currency,
  }),
  {
    fetchProducts, addToCart,
  }
)
(ProductScreen);

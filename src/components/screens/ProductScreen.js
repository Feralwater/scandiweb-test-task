import React from 'react';
import { connect } from 'react-redux';
import DOMPurify from 'dompurify';
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
  ToCartButton,
} from '../../styleComponents/ProductScreenStyles';
import { Container } from '../../styleComponents/HomeStyles';
import Header from '../header/Header';
import { fetchProducts } from '../../actions/productActions';
import { addToCart } from '../../actions/cartActions';
import formatCurrency from '../../utils/formatCurrency';

class ProductScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0,
      attributes: {},
      validate: {},
      startValidate: false,
    };
  }

  componentDidMount() {
    const { fetchProducts } = this.props;
    fetchProducts();
  }

  setSelectAttribute = (attribute, name) => {
    const { attributes } = this.state;
    this.setState(
      {
        ...this.state,
        attributes: {
          ...attributes,
          [name]: attribute,
        },
      },
    );
  };

  setSelectedImg = (index) => {
    this.setState({
      imageIndex: index,
    });
  };

  setValidate = (name, boolean) => {
    const { validate } = this.state;
    this.setState({
      validate: {
        ...validate,
        [name]: boolean,
      },
    });
  };

  setValidate2 = (boolean) => {
    this.setState({
      startValidate: boolean,
    });
  };

  render() {
    const {
      currency,
      products,
      match,
      addToCart,
    } = this.props;
    const {
      imageIndex,
      validate,
      attributes,
      startValidate,
    } = this.state;
    const product = products?.find((x) => x.name === match.params.name);

    return (
      <div>
        {
          !products
            ? (<div>Loading...</div>)
            : (
              <>
                <Header />
                <Container>
                  <Div>

                    <ImagesContainer>
                      <SmallImagesContainer>
                        {product.gallery.map((img, index) => (
                          <img
                            key={Math.floor(Math.random() * 100_000)}
                            src={img}
                            alt={match.params.name}
                            onClick={() => {
                              this.setSelectedImg(index);
                            }}
                          />
                        ))}
                      </SmallImagesContainer>
                      <Img src={product.gallery[imageIndex]} alt={match.params.name} />
                    </ImagesContainer>

                    <DescriptionContainer>
                      <Name>{product.name}</Name>
                      <ProductDescription>{product.category}</ProductDescription>
                      <Description>

                        {product.attributes.map((attribute) => (attribute.type === 'swatch'
                          ? (
                            (
                              <div key={Math.random() * 100_000}>
                                <Attributes>
                                  {attribute.name}
                                  :
                                </Attributes>
                                <AttributesContainer>
                                  {attribute.items.map((x) => (
                                    <Span
                                      validate={validate[attribute.name]}
                                      startValidate={startValidate}
                                      active={attributes[attribute.name]}
                                      color={x.value}
                                      key={Math.random() * 100_000}
                                      onClick={() => {
                                        this.setSelectAttribute(x.value, attribute.name);
                                        this.setValidate(attribute.name, true);
                                      }}
                                    />
                                  ))}
                                </AttributesContainer>
                              </div>
                            )
                          )
                          : (
                            (
                              <div key={Math.random() * 100_000}>
                                <Attributes>
                                  {attribute.name}
                                  :
                                </Attributes>
                                <AttributesContainer>
                                  {attribute.items.map((x) => (
                                    <Span
                                      validate={validate[attribute.name]}
                                      startValidate={startValidate}
                                      active={attributes[attribute.name]}
                                      value={x.value}
                                      key={Math.random() * 100_000}
                                      onClick={() => {
                                        this.setSelectAttribute(x.value, attribute.name);
                                        this.setValidate(attribute.name, true);
                                      }}
                                    >
                                      {x.value}
                                    </Span>
                                  ))}
                                </AttributesContainer>
                              </div>
                            )
                          )))}

                      </Description>
                      <Price>price:</Price>
                      <Currency>
                        {' '}
                        {formatCurrency(product.prices, currency).icon + formatCurrency(product.prices, currency).price}
                      </Currency>
                      <ToCartButton
                        onClick={() => {
                          if (Object.keys(attributes).length < product.attributes.length) {
                            this.setValidate2(true);
                          } else {
                            addToCart(product, attributes);
                          }
                        }}
                      >
                        add to cart
                      </ToCartButton>
                      <Description>
                        <div
                          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product.description) }}
                        />
                      </Description>
                    </DescriptionContainer>
                  </Div>
                </Container>
              </>
            )
        }
      </div>
    );
  }
}

export default connect((state) => ({
  products: state.products.items,
  cartItems: state.cart.cartItems,
  currency: state.currency.currency,
}),
{
  fetchProducts,
  addToCart,
})(ProductScreen);

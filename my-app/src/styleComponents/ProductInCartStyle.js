import styled from "styled-components";


export const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style-type: none;
  padding-inline-start: 0;
`;
export const RemoveButton = styled.button`
  position: absolute;
  top: -1rem;
  right: -1rem;
  padding: 1rem;
  display: none;
`;
export const Li = styled.li`
  display: flex;
  width: 100%;
  height: 13.7rem;
  justify-content: space-between;
  margin-bottom: 4.1rem;
  position: relative;

  &:hover ${RemoveButton} {
    display: block;
  }
`;
export const CartImage = styled.div`
  width: 10.5rem;
`;
export const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
export const ProductDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const ProductName = styled.p`
  font-weight: 300;
  font-size: 1.6rem;
  line-height: 160%;
  display: flex;
  align-items: center;
  color: #1D1F22;
`;
export const ProductPrice = styled.p`
  font-weight: 500;
  font-size: 1.6rem;
  line-height: 160%;
  display: flex;
  align-items: center;
  color: #1D1F22;
`;
export const Counter = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-weight: 500;
  font-size: 1.6rem;
  color: #1D1F22;
  align-items: center;

  & p {
    border: 1px solid #1D1F22;
    padding: .1rem .7rem;
    margin: 0;
    cursor: pointer;
  }
`;
export const CounterImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 14rem;
`;


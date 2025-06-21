import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const MyOrders = ({ cartItems }) => {
  return (
    <>
      <Helmet>
        <title>My Orders - K-Flex | Affordable T-shirts for Young Men</title>
        <meta name="description" content="View your past orders with K-Flex. Track your purchases and continue shopping for the latest trendy t-shirts." />
        <meta name="keywords" content="My Orders, K-Flex, t-shirts, youth fashion, online shopping, Kabeer" />
        <meta name="author" content="Kabeer - K-Flex" />
        <meta name="theme-color" content="#feb500" />
      </Helmet>

      <Container>
        <Title>My Orders</Title>
        {cartItems.length > 0 ? (
          <OrderList>
            {cartItems.map((item) => (
              <OrderItem key={item._id || item.id}>
                <ItemDetails>
                  <ItemImage src={item.image} alt={item.name} />
                  <ItemName>{item.name}</ItemName>
                </ItemDetails>
                <Price>Rs. {item.price}</Price>
              </OrderItem>
            ))}
          </OrderList>
        ) : (
          <NoOrdersMessage>
            <p>You haven't placed any orders yet.</p>
            <ContinueShoppingButton to="/">Continue Shopping</ContinueShoppingButton>
          </NoOrdersMessage>
        )}
      </Container>
    </>
  );
};

export default MyOrders;

// ================= Styled Components =================

const Container = styled.div`
  padding: 30px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Title = styled.h2`
  color: #333;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const OrderList = styled.ul`
  list-style: none;
  padding: 0;
`;

const OrderItem = styled.li`
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
  padding: 15px 0;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f9f9f9;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    margin-bottom: 10px;
  }
`;

const ItemImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 8px;
  margin-right: 15px;
`;

const ItemName = styled.span`
  font-size: 1.1rem;
  color: #333;
`;

const Price = styled.span`
  font-size: 1.1rem;
  color: #feb500;
  font-weight: bold;
`;

const NoOrdersMessage = styled.div`
  text-align: center;
  margin-top: 40px;
  font-size: 1.1rem;
  color: #666;
`;

const ContinueShoppingButton = styled(Link)`
  display: inline-block;
  background-color: #feb500;
  color: #fff;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 8px;
  margin-top: 15px;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e08f00;
  }
`;

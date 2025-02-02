import React from 'react';
import { Text } from 'react-native';

const PriceFormatter = ({ price, style }) => {
  const formatPrice = (value) => {
    // Convert to string and remove any existing decimals/commas
    const numStr = String(value).replace(/[,.]/g, '');
    
    // Add dots for thousands separator and đ symbol
    const formattedPrice = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + 'đ';
    
    return formattedPrice;
  };

  return (
    <Text style={style}>
      {formatPrice(price)}
    </Text>
  );
};

export default PriceFormatter;
import React from 'react';
import { View, Text } from 'react-native';

const MiddleEllipsis = ({ text, maxLength }) => {
  const truncateText = (str, maxLen) => {
    if (str.length <= maxLen) {return str;}

    const ellipsis = '...';
    const halfLength = Math.floor((maxLen - ellipsis.length) / 2);

    // Get the start and end parts of the text
    const start = str.slice(0, halfLength);
    const end = str.slice(-halfLength);

    return `${start}${ellipsis}${end}`;
  };

  const truncatedText = truncateText(text, maxLength);

  return (
    <View>
      <Text>{truncatedText}</Text>
    </View>
  );
};

const timeAgo = (timestamp) => {
  const now = Date.now();
  const seconds = Math.floor((now - timestamp) / 1000);

  let interval = Math.floor(seconds / 31536000); // Years
  if (interval >= 1) {return `${interval} year(s) ago`;}

  interval = Math.floor(seconds / 2592000); // Months
  if (interval >= 1) {return `${interval} month(s) ago`;}

  interval = Math.floor(seconds / 86400); // Days
  if (interval >= 1) {return `${interval} day(s) ago`;}

  interval = Math.floor(seconds / 3600); // Hours
  if (interval >= 1) {return `${interval} hour(s) ago`;}

  interval = Math.floor(seconds / 60); // Minutes
  if (interval >= 1) {return `${interval} min(s) ago`;}

  return `${seconds} sec(s) ago`;
};

const formattedNumber = (number) => {
  return number?.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export { MiddleEllipsis, timeAgo, formattedNumber };

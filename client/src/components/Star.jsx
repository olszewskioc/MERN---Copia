import React from 'react'
import { StarIcon } from '@chakra-ui/icons'

// Dismiss the return because  this is a simple component and we don't need more than one line.
// Rating receive a number between 0  to 5 and star  icon will be filled or empty based on that value.
const Star = ({rating = 0, star = 0}) => <StarIcon color={rating >= star ? 'cyan.500' : 'gray.200'} />;

export default Star
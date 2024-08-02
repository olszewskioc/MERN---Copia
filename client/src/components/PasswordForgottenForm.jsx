import { Text, Button, Stack, Input, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { sendResetEmail } from '../redux/actions/userActions';

const PasswordForgottenForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const handleChange = (event) => {
        setEmail(event.target.value);
    };

    return (
        <>
            <Box my={4}>
                <Text as='b'>Enter your e-mail address bellow.</Text>
                <Text>We'll send you an e-mail with a link to reset your password.</Text>
            </Box>
            <Stack spacing={4}>
                <Input mb={4} type="text" name="email" placeholder="Your Email Address here!" label='Email' value={email} onChange={(e) => handleChange(e)}/>
                <Button colorScheme="yellow" size='lg' fontSize='md' onClick={() => dispatch(sendResetEmail(email))}>
                    Send Reset E-mail
                </Button>
            </Stack>
        </>
    )
};

export default PasswordForgottenForm
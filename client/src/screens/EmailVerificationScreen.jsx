import React, { useEffect } from 'react';
import { useParams, Link as ReactLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { Text, Spinner, AbsoluteCenter, Box, Alert, AlertIcon, AlertTitle, AlertDescription, Button } from '@chakra-ui/react'
import { verifyEmail } from '../redux/actions/userActions';


const EmailVerificationScreen = () => {

    const {token} = useParams();
    const dispatch = useDispatch();
    const {userInfo, error, loading} = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(verifyEmail(token));
    }, [token, dispatch]);

    return (
        <Box position={'relative'} minH={'3xl'}>
            <AbsoluteCenter axis='both'>
                {loading ? (
                    <Box textAlign={'center'}>
                        <Text fontSize={'3xl'}>We are working on verify your email!</Text>
                        <Spinner size='xl' />
                    </Box>
                ) : error === null ? (
                    <Alert background='parent' status='success' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center'>
                        <AlertIcon boxSize='16' size='xl'/>
                        <AlertTitle>Thanks for verifying your email address!</AlertTitle>
                        <AlertDescription fontSize={'xl'}>
                            You can close this window now.
                        </AlertDescription>
                    </Alert>
                ) : (
                    <Alert background='parent' status='error' flexDirection='column' alignItems='center' justifyContent='center' textAlign='center'>
                        <AlertIcon boxSize='16' size='xl'/>
                        <AlertTitle>We are Sorry!</AlertTitle>
                        <AlertDescription fontSize={'xl'}>
                            {error}
                        </AlertDescription>
                    </Alert>
                )}
            </AbsoluteCenter>
        </Box>
    )
}

export default EmailVerificationScreen
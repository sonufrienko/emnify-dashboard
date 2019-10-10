import styled from 'styled-components';

export const Root = styled.div`
    overflow: hidden;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 80px;
    @media(max-width: 768px) {
        padding-left: 0;
        padding-right: 0;
    }  
`;

export const Container = styled.div`
    width: 1440px;
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
    flex-direction: row;
    padding-left: 128px;
    padding-right: 128px;
    background-color: transparent;
    @media(max-width: 1360px) {
        padding-left: 100px;
        padding-right: 100px;
    }    
    @media(max-width: 1300px) {
        padding-left: 80px;
        padding-right: 80px;
    }    
    @media(max-width: 1250px) {
        padding-left: 40px;
        padding-right: 40px;
    }
    @media(max-width: 768px) {
        padding-left: 20px;
        padding-right: 20px;
    }      
`;

export const LoginWrapper = styled.div`
    background-color: #EDF4F5;    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    padding-top: 100px;
    padding-bottom: 100px;
    @media(max-width: 500px) {
        padding-top: 0;
        padding-bottom: 0;
    }
`;


export const LoginBox = styled.div`
    width: 100%;
    min-width: 450px;
    padding-left: 20px;
    padding-right: 20px;
    background-color: white;
    border: 1px solid #E0E0E0;
    border-radius: 8px;
    padding: 40px;

    @media(max-width: 500px) {
        min-width: 320px;
    }
    
`;

export const Title = styled.h1`
    font-size: 60px;
    line-height: 82px;
    color: #000000;

    @media(max-width:768px) {
        font-size: 40px;
        line-height: 52px;
    }

    @media(max-width:500px) {
        font-size: 28px;
        line-height: 32px;
    }
`;

export const ErrorText = styled.p`
    font-size: 13px;
    color: red;
    padding-top: 5px;
    padding-bottom: 5px;
`;


export const FormInputBox = styled.div`
    padding-top: 5px;
    padding-bottom: 5px;
    width:100%;
`;


export const SubmitBox = styled.div`
    padding-top: 35px;
    padding-bottom: 5px;
`;


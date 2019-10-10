import styled from 'styled-components';

export const Root = styled.div`
    overflow: hidden;
    padding-left: 40px;
    padding-right: 40px;
    @media(max-width: 768px) {
        padding-left: 20px;
        padding-right: 20px;
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
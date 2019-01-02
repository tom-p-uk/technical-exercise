import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr 1fr 200px;
    grid-template-rows: repeat(4, 1fr);
    grid-template-areas:
        ". . . button"
        ". slots slots ."
        " . slots slots ."
        "pagination pagination pagination pagination"
        ". error error .";
    padding: 30px;

    @media (max-width: 800px) {
        padding: 5px;
        grid-template-columns: 1fr;
        grid-template-rows: repeat(4, 1fr);
        grid-template-areas:
            "button"
            "slots"
            "slots"
            "pagination"
            "error";
    }
`;

export const Button = styled.button`
    background-color: ${props => props.selected ? 'red' : 'green'};
    color: #fff;
    border-radius: 10px;
    width: 160px;
    height: 50px;
    grid-area: button;
    justify-items: center;
    align-items: center;
    cursor: pointer;
`;

export const DateItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 400px;
    max-width: 300px;
    margin-left: 7px;
    margin-right: 7px;
`;

export const SlotsWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    grid-area: slots;
`;

export const Slot = styled.div`
    background-color: ${props => props.color};
    width: 100px;
    height: 100px;
    border-radius: 10px;
    box-shadow: 7px 10px 19px -6px rgba(0,0,0,0.46);
    cursor: ${props => !props.disabled && 'pointer'};
    padding: 5px;
`;

export const PaginationWrapper = styled.div`
    width: 100%;
    grid-area: pagination;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-template-areas: "prev limit next";
    margin-top: 25px;
`;

export const Pagination = styled.div`
    cursor: pointer;
    grid-area: ${props => props.gridArea};
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
    &:hover {
        color: green;
    }
`;

export const Limit = styled.div`
    grid-area: limit;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70px;
`;

export const Error = styled.div`
    grid-area: error;
    margin-top: 15px;
    color: red;
`;

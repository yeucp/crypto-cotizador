import styled from "@emotion/styled";

const Data = styled.div`
    color: #fff;
    font-family: 'Lato', sans-serif;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-top: 30px;
`

const Image = styled.img`
    display: block;
    width: 120px;
`

const Text = styled.p`
    font-size: 18px;
    span {
        font-weight: 700;
    }
`

const Price = styled.p`
    font-size: 24px;
    span {
        font-weight: 700;
    }
`

const Info = ({info}) => {
    const {PRICE, HIGHDAY, LOWDAY, CHANGEPCT24HOUR, IMAGEURL, LASTUPDATE} = info
    return (
        <Data>
            <Image src={`https://cryptocompare.com/${IMAGEURL}`} alt="Imagen criptomoneda" />
            <div>
                <Price>El precio es de: <span>{PRICE}</span></Price>
                <Text>El precio más alto es de: <span>{HIGHDAY}</span></Text>
                <Text>El precio más bajo es de: <span>{LOWDAY}</span></Text>
                <Text>La variación 24h es de: <span>{CHANGEPCT24HOUR}</span></Text>
                <Text>La última actualización es de: <span>{LASTUPDATE}</span></Text>
            </div>
        </Data>
    );
};
export default Info;
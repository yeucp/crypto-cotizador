import styled from "@emotion/styled";
import useSelectMonedas from "../hooks/useSelectCoin";

import coins from '../data/coins.json'
import { useEffect, useState } from "react";
import Error from "./Error";

const InputSubmit = styled.input`
    background-color: #9497ff;
    border: none;
    width: 100%;
    padding: 10px;
    color: #fff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 20px;
    border-radius: 5px;
    transition: background-color .3s ease;
    margin-top: 30px;

    &:hover{
        background-color: #7a7dfe;
        cursor: pointer;
    }
`

const Form = ({setCoins}) => {

    const [cryptos, setCryptos] = useState([])
    const [error, setError] = useState(false)

    const [coin, SelectCoin] = useSelectMonedas('Elije tu moneda', coins)
    const [crypto, SelectCrypto] = useSelectMonedas('Elije tu criptomoneda', cryptos)

    useEffect(()=> {
        const consutarAPI = async () => {
            const url = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD`
            let result = await fetch(url)
            result = await result.json()
            const arrayCrypto = result.Data.map(item => {
                const {Name, FullName} = item.CoinInfo
                return {
                    id: Name,
                    name: FullName
                }
            })
            setCryptos(arrayCrypto)
        }

        consutarAPI()
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        if([coin, crypto].includes('')){
            setError(true)
            return
        }
        setError(false)
        setCoins({
            coin,
            crypto
        })
    }

    return (
        <>
            {error && <Error>Todos los campos son requeridos</Error>}
            <form
                onSubmit={handleSubmit}
            >
                <SelectCoin/>
                <SelectCrypto/>
                <InputSubmit type="submit" value="Cotizar" />
            </form>
        </>
    );
}
export default Form;
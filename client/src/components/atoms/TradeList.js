import Axios from 'axios';
import { useState, useEffect } from 'react';
import styled from "styled-components";
import TradeChart from './TradeChart';

const TradeList = () => {

    let obj = {};
    let newObj = [];
    let defaultBTCPrice;
    const [objCoin, setObjCoin] = useState();
    const [coinNameState, setCoinNameState] = useState("BTC");
    const [coinPriceState, setCoinPriceState] = useState(0);

    useEffect(async () => {
        await Axios.get("https://api.upbit.com/v1/ticker?markets=KRW-BTC&markets=KRW-ETH&markets=KRW-BCH&markets=KRW-LTC&markets=KRW-ETC&markets=KRW-EOS&markets=KRW-XRP&markets=KRW-DOGE&markets=KRW-BTG")
        // await Axios.get("https://api.upbit.com/v1/ticker?markets=KRW-BTC&markets=KRW-BTG")
        .then((res) => {
            for (let i = 0; i < res.data.length; i++)
            {
                let prevP = res.data[i].prev_closing_price;
                let curP = res.data[i].trade_price;
                let changeRate;
                let changePrice;

                changeRate = ((curP - prevP) / curP * 100).toFixed(2);

                if(0 < changeRate) changeRate = `+${changeRate}`
                changePrice = 0 < (curP - prevP) ? changePrice = `+${curP-prevP}` : changePrice = curP - prevP

                obj = {
                    name : res.data[i].market.substring(4),
                    price : res.data[i].trade_price,
                    changeRate : changeRate,
                    changePrice : changePrice
                }//

                if(res.data[i].market === "KRW-BTG")
                {
                    // console.log("보노보노보노보노");
                    obj.name = "BONO";
                }
                
                newObj.push(obj);
            }
                setObjCoin(newObj);
                // if(objCoin !== undefined)
                // {
                //     console.log("objCoin = " , objCoin);
                // }
                // console.log("objCoin = " , objCoin);
                // console.log("res.data[0].prev_closing_price = " , res.data[0].prev_closing_price);
                
                // console.log("res.data[0].signed_change_price = " , res.data[0].signed_change_price);
            }).catch((err) => {
                console.log("err = " , err);
            })
        // };
        // setInterval(() => {
        //     const inter = () => {
        //         setObjCoin(newObj);
        //     }
        //     // obj = {};
        //     // newObj = [];
        //     // setObjCoin();
        //     // setCountCheck(countCheck+1);
        //     // setObjCoin(newObj);
        //     return () => clearInterval(inter);
        // } , 2000);
    },[]);
    
    return (
        <>
            <TradeChart coinName={coinNameState} coinPrice={coinPriceState} />
            

            {/* <h1>Websocket Test</h1>
            <h1>BitCoin {coinData}</h1> */}

            <ListBack>
                <CoinNavBox>
                    <CoinNavImg />
                    <CoinNavTextBox>
                        <CoinNavName>코인 이름</CoinNavName>
                        <CoinNavChange>전일 대비</CoinNavChange>
                        <CoinNavCurrentPrice>현재가격</CoinNavCurrentPrice>
                    </CoinNavTextBox>
                </CoinNavBox>

                {objCoin && objCoin.map((coin, index) => (
                    <CoinElementBox key={index} onClick={event=>{
                        setCoinNameState(coin.name);
                        setCoinPriceState(coin.price);
                        event.preventDefault();
                        // console.log(index, coin.name);
                      }}>
                        <CoinImageBox src={require(`../../assets/img/${coin.name}.png`)} />
                            <CoinTextBox>
                                <CoinTextName>
                                    {coin.name}
                                </CoinTextName>
                                <CoinChange>
                                    <CoinChangeRate style={0 < coin.changePrice ? {color : 'red'} : {color : 'blue'}}>
                                        {coin.changeRate}
                                    </CoinChangeRate>
                                    <CoinChangePrice style={0 < coin.changePrice ? {color : 'red'} : {color : 'blue'}}>
                                        {coin.changePrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    </CoinChangePrice>
                                </CoinChange>
                                <CoinTextPrice>
                                    {coin.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                </CoinTextPrice>
                            </CoinTextBox>
                    </CoinElementBox>
                ))}
            </ListBack>
            
        </>
    );
}

export default TradeList;

// Coin 리스트 박스 컨테이너
const ListBack = styled.div`
    width: 299px;
    /* height: 1500px; */
    /* margin: auto; */
    /* background-color: green; */
    float: left;
    margin-left: 15px;
`;

// 코인 이름.가격 분류
const CoinNavBox = styled.div`
    width: 100%;
    height: 30px;
    background-color: white;
    border: 1px solid #80c7f2;
    margin-bottom: 15px;
    display: flex;
    align-items: center;
`;
const CoinNavImg = styled.div`
    width: 20%;
    height: 100%;
    /* background-color: yellow; */
    float: left;
    margin-left: 5%;
`;
const CoinNavTextBox = styled.div`
    width: 80%;
    height: 100%;
    float: left;
`;
const CoinNavName = styled.div`
    width: 30%;
    height: 100%;
    /* background-color: blue; */
    float: left;
    line-height: 30px;
    text-align: right;
    font-size: 80%;
    /* margin-right: 5%; */
`;
const CoinNavChange = styled.div`
    width: 30%;
    height: 100%;
    /* background-color: blue; */
    float: left;
    line-height: 30px;
    text-align: right;
    font-size: 80%;
    /* margin-right: 5%; */
`;
const CoinNavCurrentPrice = styled.div`
    width: 35%;
    height: 100%;
    /* background-color: orange; */
    float: left;
    line-height: 30px;
    text-align: right;
    font-size: 80%;
    /* margin-right: 1%; */
`;

// 코인 종류 엘레먼트
const CoinElementBox = styled.div`
    width: 100%;
    height: 80px;
    background-color: white;
    border: 1px solid #80c7f2;
    display: flex;
    align-items: center;
    margin-bottom: 1px;
    cursor:pointer;
`;
const CoinImageBox = styled.img`
    width: 20%;
    height: 60px;
    /* background-color: yellow; */
    float: left;
    margin-left: 5%;
`;
const CoinTextBox = styled.div`
    width: 80%;
    height: 60px;
    /* background-color: green; */
    float: left;
`;
const CoinTextName = styled.div`
    width: 30%; 
    height: 60px;
    /* background-color: blue; */
    float: left;
    line-height: 60px;
    text-align: right;
    font-size: 85%;
    /* margin-right: 5%; */
`;
const CoinChange = styled.div`
    width: 30%; 
    height: 60px;
    /* background-color: red; */
    float: left;
    line-height: 60px;
    text-align: right;
    /* margin-right: 5%; */
`;
const CoinChangeRate = styled.div`
    width: 100%; 
    height: 30px;
    /* background-color: aqua; */
    /* float: left; */
    line-height: 30px;
    text-align: right;
    font-size: 85%;
    /* margin-right: 5%; */
`;
const CoinChangePrice = styled.div`
    width: 100%; 
    height: 30px;
    /* background-color: floralwhite; */
    /* float: left; */
    line-height: 30px;
    text-align: right;
    font-size: 85%;
    /* margin-right: 5%; */
`;
const CoinTextPrice = styled.div`
    width: 37%;
    height: 60px;
    /* background-color: orange; */
    float: left;
    line-height: 60px;
    text-align: right;
    font-size: 85%;
    /* margin-right: 1%; */
`;




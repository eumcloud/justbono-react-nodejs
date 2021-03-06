import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const BrowserBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  text-decoration: none;
  font-size: 0.7em;

  .menulist {
    margin: 1em auto;
    padding: 0.4em 1.5em;
    width: 12em;
    height: 2em;
    font-size: 01.1rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a {
    text-decoration: none;
    &:hover {
      color: white;
      font-weight: bolder;
      background: #1261c4;
    }
  }
`;
const NonBrowser = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  text-decoration: none;
  font-size: 0.7em;
  .menulist {
    padding: 0.25em 2.5em;
    margin: 0 auto;
    width: 18em;
    height: 2em;
    font-size: 1.5em;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menusort {
    justify-content: center;
  }
  a {
    text-decoration: none;
    &:hover {
      color: white;
      font-weight: bolder;
      background: #1261c4;
    }
  }
`;

export default function Contents() {
  // [hSize, setWith] = useState(window.innerWidth);
  console.log(window.innerWidth);
  /* getDatas */
  const getmenulist = [
    // api from DB
    { idx: 1, title: "보유코인", url:"", memo: "memo" },
    { idx: 2, title: "거래내역", url:"", memo: "memo" },
    { idx: 3, title: "미체결", url:"", memo: "memo" },
    { idx: 4, title: "입출금대기", url:"", memo: "memo" }
  ];
  const data = getmenulist; // axios.GET

  if (window.innerWidth < 800) {
    return (
      <>
        <NonBrowser>
          <div className="menusort">
            {data.map((i) => (
              <a href="#">
                <div className="menulist">{i.title}</div>
              </a>
            ))}
            
          </div>
        </NonBrowser>
      </>
    );
  }

  return (
    <>
      <BrowserBlock>
        {/* <div className="menusort"> */}
        {data.map((i) => (
          <a href="#">
            <div className="menulist">{i.title}</div>
          </a>
        ))}
        {/* </div> */}
      </BrowserBlock>
    </>
  );
}

// import { useAuth } from "@/AuthContext";
// import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { NextPage } from "next";

// import { db, onSnapshot, doc } from "@/firebase";
// import Image from "next/image";
// import React, { useEffect, useState } from "react";
// import { addDoc, Timestamp } from "firebase/firestore";
const RoomList: NextPage = () => {
  return (
    <div>
      <Head>
        <title>RoomList</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>RoomList</h1>
      {/* <button onClick={clickButton}>Firestore追加</button> */}
      <Link href="/">
        <a>home</a>
      </Link>
      <br />
      <Link href="/room/m6s2o6brCyEsXBRxhS3M">
        <a>m6s2o6brCyEsXBRxhS3M</a>
      </Link>
    </div>
  );
};

export default RoomList;

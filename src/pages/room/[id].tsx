// import { useAuth } from "@/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { db, onSnapshot, query } from "@/firebase";
// import Image from "next/image";
import React, { FormEvent, useEffect, useState } from "react";
import { useAuth } from "@/AuthContext";
// import { addDoc, Timestamp } from "firebase/firestore";
import {
  addDoc,
  collection,
  limit,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { NextPage } from "next";
interface message {
  content: string;
  postedAt: Timestamp;
  postUid: string;
}
// interface chat {
//   createdAt: Timestamp;
//   description: string;
//   messages: message[];
//   name: string;
//   owner: string;
// }
const Room: NextPage = () => {
  const { currentUser } = useAuth();
  const [text, setText] = useState<string>();
  const post = async (event: FormEvent) => {
    event.preventDefault();
    // textが空白ないし、空文字、null、未定義である場合の処理をここに書く
    if (!text || !currentUser || !currentUser.uid) return;
    const data: message = {
      content: text,
      postedAt: Timestamp.now(),
      postUid: currentUser.uid,
    };
    const messagesRef = await collection(
      db,
      "chats",
      `${router.query.id}`,
      "messages"
    );
    await addDoc(messagesRef, {
      ...data,
      // postedAt:timestamp?, postUid:str?ref?, とか
    });
  };

  const [messages, setMessages] = useState<Array<message>>([]);

  const router = useRouter();
  useEffect(() => {
    let tempMessages: Array<message> = [];
    onSnapshot(
      query(
        collection(db, "chats", `${router.query.id}`, "messages"),
        limit(10),
        orderBy("postedAt", "desc")
        // postedAtでorderByしたい
      ),
      (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added")
            tempMessages.push(change.doc.data() as message);
          // if(change.type === "removed") tempMessages
        });
        setMessages(tempMessages);
      }
    );
  }, [router.query.id]);

  useEffect(() => {
    console.log("useEffect");
    console.log(messages);
  }, [messages]);

  return (
    <div>
      <Head>
        <title>m6s2o6brCyEsXBRxhS3M</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>m6s2o6brCyEsXBRxhS3M</h1>
      {/* <button onClick={clickButton}>Firestore追加</button> */}
      <Link href="/">
        <a>home</a>
      </Link>
      <br />
      <Link href="/top">
        <a>top</a>
      </Link>
      {messages.map((message: message, i: number) => (
        <p key={i}>
          {message.content}
          {/* {alert(message.content)} */}
        </p>
      ))}
      <form onSubmit={post}>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
        <input type="submit" />
      </form>
    </div>
  );
};

export default Room;

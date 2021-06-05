import { useState, useEffect } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import Loading from "@geist-ui/react/esm/loading";
import Card from "@geist-ui/react/esm/card";
import Tag from "@geist-ui/react/esm/tag";

const Rooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let l = [];
    const unsub = onSnapshot(collection(db, "rooms"), (rooms) => {
      setRooms([]);
      rooms.docs.forEach((doc) => {
        setRooms((prev) => [...prev, { ...doc.data(), key: doc.id }]);
      });
      setLoading(false);
    });

    return () => unsub();
  }, []);
  return (
    <div style={{ margin: "20px auto" }}>
      {loading ? (
        <Loading size="large">loading..</Loading>
      ) : (
        rooms.map((room) => (
          <Link key={room.key} to={`/join/${room.key}`}>
            <Card hoverable={true} style={{ marginBottom: 14 }} width="100%">
              <h4>{room.room_name}</h4>
              <Tag type="lite">{room.members.length} members</Tag>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
};

export default Rooms;
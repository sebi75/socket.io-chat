/* function App() {
  const [username, setUsername] = useState("")
  const [showChat, setShowChat] = useState(false)
  const [room, setRoom] = useState("")

  const { message } = useContext(GlobalState)

  const joinRoom = (e) => {
    e.preventDefault()
    if (username !== "" && room !== "") {
      socket.emit("join_room", room)
      socket.on("succ_joined", (data) => {
        if (data.bool) {
          setShowChat(true)
        }
      })
    }
  }

  useEffect(() => {
    socket.on("connection", () => {
      console.log("Connected to the backend")
    })
  }, [])

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h1>Join chat</h1>
          <input
            type="text"
            placeholder={"name..."}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder={"room id..."}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  )
} */

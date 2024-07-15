import { useEffect, useState } from 'react'
import { BandAdd, BandList } from './components'
import io from 'socket.io-client'



const connectionSocketServer = () => {
  const socket = io.connect('http://localhost:8080', {
    transports: ['websocket']
  })
  return socket;
}


function App() {
  const [ socket ] = useState(connectionSocketServer())
  const [Online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);


  useEffect(() => {
    setOnline( socket.connected );
  }, [ socket ]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
    })
  }, [socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false)
    })

    // return socket.disconnect()
  }, [socket])


  useEffect(() => {
    socket.on('current-bands', (data) => {
      setBands(data)
    })
  }, [socket])


  const votar = ( id ) => {
    socket.emit('votar-banda', id);
  }

  const deleteBand = (id) => {
    socket.emit('delete-band', id)
  }



  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {
            Online
            ? <span className="text-success"> Online</span>
            : <span className="text-danger"> Offline</span>
          }
        </p>
      </div>

      <h1>Band Names</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList
            data={ bands }
            votar={ votar }
            deleteBand={ deleteBand }
          />
        </div>

        <div className="col-4">
          <BandAdd/>
        </div>
      </div>

    </div>
  )
}

export default App

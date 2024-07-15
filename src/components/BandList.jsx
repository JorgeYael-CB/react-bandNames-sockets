import { useEffect, useState } from "react"


export const BandList = ( {data, votar, deleteBand} ) => {
  const [bands, setBands] = useState(data);


  useEffect(() => {
    setBands( data )
  }, [data])


  function changeName( e, id ){
    const {target: {value}} =  e;

    setBands( bands => bands.map( band => {
      if( band.id === id ){
        band.name = value;
      }

      return band
    }))
  }

  const onPerdioFoco = ( id, name ) => {
    console.log({id, name})

    //TODO: disparar el evento de sockets
  }


  const crearRows = () => {
    return(
      <>
        {
          bands.map( band => (
            <tr key={band.id}>
              <td>
                <button
                  onClick={ () => votar(band.id) }
                  className="btn btn-primary"
                > +1 </button>
              </td>
              <td>
                <input
                  value={band.name}
                  type="text"
                  className="form form-control"
                  onChange={ e => changeName(e, band.id) }
                  onBlur={ () => onPerdioFoco(band.id, band.name) }
                />
              </td>
              <td> <h3>{ band.votes }</h3> </td>
              <td>
                <button
                  onClick={ () => deleteBand(band.id) }
                  className="btn btn-danger"
                >Borrar</button>
              </td>
            </tr>
          ))
        }
      </>
    )
  }


  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>

        <tbody>
          { crearRows() }
        </tbody>
      </table>
    </>
  )
}


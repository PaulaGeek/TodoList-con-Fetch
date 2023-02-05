import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
  const [dato, setdato] = useState("");
  const [save, setSave] = useState([]);

  function handledato(e) {
    setdato(e.target.value);
  }

  //4. procesamos todos los dato del formulario
  function enviardato(e) {
    e.preventDefault();
    if (dato != "") {
      let tarea = {}
      tarea.label = dato
      tarea.done = false
      setSave([...save, tarea]);;
    setdato("");
    actualizarTarea()
  } ;
  }

  function eliminardato(eliminarli) {
    const nuevasTareas = save.filter(function (item, index) {
      return index !== eliminarli;
    });
    console.log(eliminarli);
    console.log(nuevasTareas);
    setSave(nuevasTareas);
    actualizarTarea()
  }

  function crearUsuario(){
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/gianpaul`,
    {method: 'POST', 
    headers: {
      'Content-Type': 'application/json'},
    body: JSON.stringify([])
    })
  }

  function cargarTarea(){
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/gianpaul`,
    {method: 'GET',})
    .then((response)=>response.json())
    .then((data)=>setSave(data))
    .then((data)=>console.log(data))
  }


  function actualizarTarea(){
    fetch(`https://assets.breatheco.de/apis/fake/todos/user/gianpaul`,
    {method: 'PUT', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(save)})
    .then((response)=>response.json())
  }

  useEffect(() => {
    crearUsuario()    
  }, [])

  useEffect(() => {
    cargarTarea()    
  }, [])

  return (
    <>
      <div>
        <p className="fw-light fs-1 d-flex justify-content-center text-danger text-opacity-50">
         tareas
        </p>
        <div className="container col-md-4  mt-3">
          <input
            id="exampledato"
            onChange={(e) => {
              setdato(e.target.value);
            }}
            type="text"
            className="form-control"
            aria-describedby="button-addon2"
            value={dato}
          />
          <button
            className="btn btn-outline-secondary container col-md-4  mt-3 d-flex justify-content-center"
            type="button"
            id="enviar"
            onClick={enviardato}
          >
            Agregar
          </button>
        </div>
      </div>
      <div className=" d-flex justify-content-center mt-3">
        <ul className="list-group ">
          {save.map((item, index) => (
            <li key={index} class="list-group-item">
              {" "}
              {item.label}{" "}
              <button
                className="btn btn-outline-secondary justify-content-right"
                type="button"
                id="eliminar"
                onClick={() => eliminardato(index)}
              >
                x
              </button>{" "}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Home;

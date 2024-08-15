import React ,{useState} from "react";

//create your first component
const Home = () => {

	const [todo, setTodo] = useState("")
	const [todoList, setTodoList] = useState([]);
	const [counter, setCounter] = useState(0)

function agregar(e){
    if (e.key === "Enter") { 
		setTodoList([...todoList, todo]); 
		setTodo(""); 
		setCounter(counter+1)
}}

function eliminar(index){
	const nuevaLista = todoList.filter((item, i) => i !== index);
	setTodoList(nuevaLista)
}


	return (
		<>
			<h1 className="text-center fw-light" id="titleToDo" style={{fontSize:"70px"}}>Todos</h1>
		<div className="mx-auto w-50 border mt-5" style={{boxShadow: "0px 10px 0px -4px white, 0px 20px 0px -8px #f1f1f1, 0px 20px 20px 20px rgb(225 225 225)"}}>
		<input className="form-control form-control-lg" style={{border:'none', boxShadow:'none'}} value={todo}  onChange={ (e) =>(setTodo(e.target.value))} onKeyDown={agregar} placeholder="ingresa tus tareas aqui"></input>
        {todoList.map((item, index) => (
		<ul className="list-group">
			<li className="list-group-item row border-end-0 border-bottom-0 border-start-0 rounded-0 m-0">
          <label className="col-11 overflow-y-auto" key={index}>{item}</label>
		  <button type="button" style={{border:'none', background:'none'}} className="col-1 btn btn-outline-light" onClick={() => eliminar(index)}>X</button>
      </li>
	  </ul>
        ))}
	  <footer className="p-2">{counter} items left</footer>
	  </div>

		</>
	);
};

export default Home

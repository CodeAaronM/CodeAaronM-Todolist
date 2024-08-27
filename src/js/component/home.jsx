import { func } from "prop-types";
import React, { useEffect, useState } from "react";


//create your first component
const Home = () => {

	const [todo, setTodo] = useState("");
	const [todoList, setTodoList] = useState([]);
	const [counter, setCounter] = useState(0)

	function getTodoList() {
		fetch('https://playground.4geeks.com/todo/users/CodeAaron')
			.then((Response) => Response.json())
			.then((data) => setTodoList(data.todos))
			.catch((error) => {
				console.error("Error fetching the data:", error);
			});
	}

	useEffect(() => {
		getTodoList()
	}, [])

	function agregar() {
		setTodo("");
		setCounter(counter + 1)

		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				"label": todo,
				"is_done": false
			})
		}
		fetch('https://playground.4geeks.com/todo/todos/CodeAaron', requestOptions)
			.then((Response) => Response.json())
			.then(() => {setTodoList([...todoList, { label: todo }]), getTodoList()})
			.catch((error) => {
				console.error("Error fetching the data:", error);
			});
			
	}

	function eliminar(index) {
		console.log("se va a eliminar", index)
		const nuevaLista = todoList.filter((item) => item.id !== index);
		setCounter(counter - 1)
		fetch(`https://playground.4geeks.com/todo/todos/${index}`, { method: 'DELETE' })
		.then((respuesta) => {
			console.log(respuesta)
			getTodoList()
		});
		
	};



	const Vaciar = () => {

 todoList.forEach(item =>
				fetch(`https://playground.4geeks.com/todo/todos/${item.id}`, { method: 'DELETE'}))
			console.log('Todos los elementos fueron eliminados');
			setTodoList([]);
			setCounter(0);
	}


	return (
		<>
			<h1 className="text-center fw-light" id="titleToDo" style={{ fontSize: "70px" }}>Todos</h1>
			<div className="mx-auto w-50 border mt-5" style={{ boxShadow: "0px 10px 0px -4px white, 0px 20px 0px -8px #f1f1f1, 0px 20px 20px 20px rgb(225 225 225)" }}>
				
				<input className="form-control form-control-lg" style={{ 
					border: 'none', 
					boxShadow: 'none' 
					}} 
					value={todo} 
					onChange={(e) => (setTodo(e.target.value))} 
					onKeyDown={(e) => { if (e.key === "Enter") { agregar(); } }} 
					placeholder="ingresa tus tareas aqui"></input>

				{todoList.map((item, index) => (
					<ul key={index} className="list-group">
						<li className="list-group-item row border-end-0 border-bottom-0 border-start-0 rounded-0 m-0">
							<label className="col-11 overflow-y-auto" key={item.id}>{item.label}</label>
							<button type="button" style={{ border: 'none', background: 'none' }} className="col-1 btn btn-outline-light" onClick={() => eliminar(item.id)}>X</button>
						</li>
					</ul>
				))}
				<div className="row">
					<div className="col-1"></div><footer className="p-0 col-4">{counter}items left</footer><button onClick={() => (Vaciar())} className="p-0 col-2">Vaciar lista</button><div className="p-0 col-5"></div>
				</div>
			</div>
		</>
	);
};

export default Home
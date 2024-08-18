import React ,{useEffect, useState} from "react";

const Getdata = ({ setTodoList }) => {


    function getTodoList(){
        fetch('https://playground.4geeks.com/todo/users/CodeAaron',{
        method: "GET"
    })

        .then((Response)=> Response.json())
        .then((data)=> setTodoList(data.todos))
        .catch((error) => {
            console.error("Error fetching the data:", error);
        });
    }


    useEffect(()=>{
        console.log("se creo un Componente")
        getTodoList()
        },[])

    return null;
}
export default Getdata



//exportar la data a home
//leer la data en home
//enviar modificaciones al api
//leer la data modificada
//<p key={index}>{todo.label}</p>
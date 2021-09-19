import { useState } from "react";

function Task(props) {
   return (
      <li>
         <span
            onClick={() => props.handleComplete(props.id)}
            style={{
               textDecoration:
                  props.completedStatus === true ? "line-through" : "",
               color: props.completedStatus === true ? "#D1D2DA" : "#494c6b",
            }}
         >
            {props.children}
         </span>
         <button onClick={() => props.handleDelete(props.id)}>
            <img src="/assets/delete.svg" alt="Close" />
         </button>
      </li>
   );
}

function FilterButton(props) {
   return (
      <button
         className="tasks__filter"
         onClick={() => props.handleFilter(props.show)}
      >
         {props.children}
      </button>
   );
}

function App() {
   const [tasks, setTasks] = useState([]);
   const [filteredTasks, setFilteredTasks] = useState([]);
   const [count, setCount] = useState(0);

   function handleKeyDown(event) {
      if (event.key !== "Enter") return;

      const newTasks = [
         ...tasks,
         { id: count, text: event.target.value, completed: false },
      ];

      setTasks(newTasks);
      setCount(count + 1);
      setFilteredTasks(newTasks);

      event.target.value = "";
   }

   function handleCompletedTask(id) {
      const newTaks = [...tasks];
      const completedTask = newTaks.find((task) => task.id === id);

      completedTask.completed = !completedTask.completed;
      setTasks(newTaks);
   }

   function handleDeletedTask(id) {
      const taskNotDeleted = tasks.filter((task) => task.id !== id);

      setTasks(taskNotDeleted);
      setFilteredTasks(taskNotDeleted);
   }

   function handleFilteredTasks(filter) {
      const filters = {
         all: [...tasks],
         active: tasks.filter((task) => task.completed === false),
         completed: tasks.filter((task) => task.completed === true),
      };

      const filtered = filters[filter];

      setFilteredTasks(filtered);
   }

   function countToDoTasks() {
      let countToDoTasks = 0;
      tasks.map((task) => {
         if (task.completed === false) countToDoTasks++;
      });

      return countToDoTasks;
   }

   function handleClearCompleted() {
      const activeTasks = tasks.filter((tasks) => tasks.completed === false);

      setTasks(activeTasks);
      setFilteredTasks(activeTasks);
   }

   return (
      <div
         className="App"
         style={{
            backgroundImage: "url(/assets/background.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "top",
            backgroundSize: "100%",
         }}
      >
         <div className="main">
            <h1>TAREFAS</h1>
            <input
               placeholder="Criar uma nova tarefa"
               onKeyDown={handleKeyDown}
            ></input>
            <div className="tasks__container">
               <ul>
                  {filteredTasks.map((task) => (
                     <Task
                        key={task.id}
                        id={task.id}
                        handleDelete={handleDeletedTask}
                        handleComplete={handleCompletedTask}
                        completedStatus={task.completed}
                     >
                        {task.text}
                     </Task>
                  ))}
               </ul>
               <div className="tasks__status">
                  <span>
                     {countToDoTasks()}{" "}
                     {countToDoTasks() > 1
                        ? "itens restantes"
                        : "item restante"}
                  </span>
                  <div>
                     <FilterButton
                        handleFilter={handleFilteredTasks}
                        show="all"
                     >
                        Todas
                     </FilterButton>
                     <FilterButton
                        handleFilter={handleFilteredTasks}
                        show="active"
                     >
                        Ativas
                     </FilterButton>
                     <FilterButton
                        handleFilter={handleFilteredTasks}
                        show="completed"
                     >
                        Completadas
                     </FilterButton>
                  </div>
                  <button onClick={handleClearCompleted}>
                     <span>Limpar Completadas</span>
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
}

export default App;

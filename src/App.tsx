import "./App.css";
import AddTaskModal from "./components/models/AddTaskModal";
import Board from "./components/Board";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <>
        <Header />
        <Board />
        <AddTaskModal />
      </>
    </div>
  );
}

export default App;

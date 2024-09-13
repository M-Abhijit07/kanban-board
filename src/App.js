import React, { useState, useEffect, useContext } from 'react';
import { KanbanProvider, KanbanContext } from './components/KanbanContext';
import KanbanBoard from './components/KanbanBoard';
import './App.css';
import logo from "./icons_FEtask/Display.svg";
import down from "./icons_FEtask/down.svg";

const AppContent = () => {
  const { setTickets, setUsers, setGrouping, setSorting } = useContext(KanbanContext);
  const apiUrl = "https://api.quicksell.co/v1/internal/frontend-assignment";

  // State to control the display of dropdown options
  const [showDisplayOptions, setShowDisplayOptions] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();

        const fetchedTickets = data.tickets || [];
        const fetchedUsers = data.users || [];

        setTickets(fetchedTickets);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [setTickets, setUsers]);

  const handleGroupingChange = (event) => {
    setGrouping(event.target.value);
  };

  const handleSortingChange = (event) => {
    setSorting(event.target.value);
  };

  const toggleDisplayOptions = () => {
    setShowDisplayOptions(!showDisplayOptions);
  };

  return (
    <div>
      <header className="App-header">
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button onClick={toggleDisplayOptions} className="display-button">
          <img src={logo} alt="" />
          <div style={{padding: '5px' }} />
            Display
            <img src={down} alt="" />
          </button>
          {showDisplayOptions && (
            <div className='dropbox'>
              <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                <label>Grouping: </label>
                <div style={{padding: '10px' }} />
                <select onChange={handleGroupingChange}>
                  <option value="status">Status</option>
                  <option value="user">User</option>
                  <option value="priority">Priority</option>
                </select>
              </div>
              <div style={{display: 'flex', alignItems: 'center' }}>
                <label>Ordering: </label>
                <div style={{padding: '11px' }} />
                <select onChange={handleSortingChange}>
                  <option value="priority">Priority</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </header>
      <main>
        <KanbanBoard />
      </main>
    </div>
  );
};

const App = () => {
  return (
    <KanbanProvider>
      <div className="App">
        <AppContent />
      </div>
    </KanbanProvider>
  );
};

export default App;
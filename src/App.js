import React, { useState } from 'react';
import './App.css';
import { paginateList } from './utils/Pagination';
import initialLeftList from './data/TasksData';

function App() {
  

  const [leftList, setLeftList] = useState(initialLeftList);
  const [rightList, setRightList] = useState([]);
  const [searchLeftTerm, setSearchLeftTerm] = useState('');
  const [searchRightTerm, setSearchRightTerm] = useState('');
  const [selectedLeftPriority, setSelectedLeftPriority] = useState('All');
  const [selectedRightPriority, setSelectedRightPriority] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const moveRight = () => {
    const selectedElements = leftList.filter((item) => item.selected);
    setLeftList(leftList.filter((item) => !item.selected));
    setRightList([...rightList, ...selectedElements]);
  };

  const moveLeft = () => {
    const selectedElements = rightList.filter((item) => item.selected);
    setRightList(rightList.filter((item) => !item.selected));
    setLeftList([...leftList, ...selectedElements]);
  };

  const handleLeftPriorityChange = (event) => {
    setSelectedLeftPriority(event.target.value);
  };
  const handleRightPriorityChange = (event) => {
    setSelectedRightPriority(event.target.value);
  };
  const filteredLeftTasks = selectedLeftPriority === 'All'
    ? leftList
    : leftList.filter((task) => task.priority === selectedLeftPriority);

    const filteredRightTasks = selectedRightPriority === 'All'
    ? rightList
    : rightList.filter((task) => task.priority === selectedRightPriority);

  const handleLeftSearch = () => {
    // Perform the search logic based on the searchTerm
    // Filter the tasks based on the search term
    const filteredLeftList = initialLeftList.filter((item) =>
      item.text.toLowerCase().includes(searchLeftTerm.toLowerCase())
    );
    setLeftList(filteredLeftList);
  };

  
    const handleRightSearch = () => {
      // Filter the right tasks based on the rightSearchTerm
      const filteredRightList = rightList.filter((item) =>
        item.text.toLowerCase().includes(searchRightTerm.toLowerCase())
      );
      setRightList(filteredRightList);
    };
  const toggleSelection = (id, list) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    return updatedList;
  };

  /*===================================== Add a pagination ================================================*/


  const tasksPerPage = 4;


  const leftTasksToDisplay = paginateList(filteredLeftTasks, currentPage, tasksPerPage);
  const rightTasksToDisplay = paginateList(filteredRightTasks,currentPage, tasksPerPage)

  const totalPages = Math.ceil(filteredLeftTasks.length / tasksPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  return (
   <div className='app'>
    <div className="transfer-list-container">
    
      <div className="list left-list">
      
        <div className="list-header">Left List</div>
        <div className='search_line'><input type="text" className='search_input' placeholder='search..'  onChange={(e) => setSearchLeftTerm(e.target.value)}
            value={searchLeftTerm}/>
        <button onClick={handleLeftSearch}>search</button>
        </div>
        <div className='filter_radio'>
           <input
             type="radio"
             name="leftPriority"
             value="All"
             checked={selectedLeftPriority === 'All'}
              onChange={handleLeftPriorityChange}/> All
    
          <input 
            type='radio'
            name="leftPriority"
            value="Low"
            checked={selectedLeftPriority === 'Low'}
            onChange={handleLeftPriorityChange}/> Low
          <input
           type='radio'
           name="leftPriority"
           value="Medium"
           checked={selectedLeftPriority === 'Medium'}
           onChange={handleLeftPriorityChange}/> Medium
          <input 
            type='radio'
            name="leftPriority"
            value="High"
            checked={selectedLeftPriority === 'High'}
            onChange={handleLeftPriorityChange}
          /> High
        </div>
        
        {filteredLeftTasks.length>0 ? leftTasksToDisplay.map((item,key) => (
          <div key={key} className={`element ${item.selected ? 'selected' : ''}`}>
            <input
              type="checkbox"
              checked={item.selected}
              onChange={() => setLeftList(toggleSelection(item.id, leftList))}
            />
            {item.text}
          </div>
        )):<h1>No tasks found !</h1>}
         <div className="pagination">
          {leftTasksToDisplay.length >0 ? Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          )):null}
        </div>
      </div>
      <div className="action-buttons">
        <button title='move right' onClick={moveRight}> {">"} </button>
        <button title='move left' onClick={moveLeft}> {"<"} </button>
      </div>
      <div className="list right-list">
        
        <div className="list-header">Right List</div>
        <div className='search_line'><input type="text" className='search_input' placeholder='Search...' onChange={(e) => setSearchRightTerm(e.target.value)} value={searchRightTerm}/>
        <button onClick={handleRightSearch}>search</button>
        </div>
        <div className='filter_radio'>
        <input
             type="radio"
             name="rightPriority"
             value="All"
             checked={selectedRightPriority === 'All'}
              onChange={handleRightPriorityChange}/> All
          <input 
            type='radio'
            name="rightPriority"
            value="Low"
            checked={selectedRightPriority === 'Low'}
            onChange={handleRightPriorityChange}/> Low
          <input
           type='radio'
           name="rightPriority"
           value="Medium"
           checked={selectedRightPriority === 'Medium'}
           onChange={handleRightPriorityChange}/> Medium
          <input 
            type='radio'
            name="rightPriority"
            value="High"
            checked={selectedRightPriority === 'High'}
            onChange={handleRightPriorityChange}
          /> High
        
        </div>
        
        {filteredRightTasks?.length>0 ? rightTasksToDisplay.map((item) => (
          <div key={item.id} className={`element ${item.selected ? 'selected' : ''}`}>
            <input
              type="checkbox"
              checked={item.selected}
              onChange={() => setRightList(toggleSelection(item.id, rightList))}
            />
            {item.text}
          </div>
        )): <h1>No tasks found !</h1>}
                 <div className="pagination">
          {rightTasksToDisplay.length >0 ? Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          )):null}
        </div>
      </div>
    </div>
    </div>
  );
}

export default App;
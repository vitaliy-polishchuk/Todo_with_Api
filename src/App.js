import React, {useEffect, useState} from 'react'
import './App.css'
import Todo from "./components/Todo";


function App() {
    const [data, setData] = useState([])

    useEffect(function componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setData(json)
            })
            .catch(console.log)
    }, [])

    const handleClick = (index, isCompleted) => {
        const newData = [...data];
        newData[index].completed = isCompleted;
        setData(newData);
    }

    return (
        <div className='App' style={{display: 'flex'}}>
            <div>

                <h1>Todo</h1>
                <form>
                    <h2 className='label-wrapper'>
                        <label htmlFor='new-todo-input' className='label__lg'>
                            What needs to be done?
                        </label>
                    </h2>
                    <input
                        type='text'
                        id='new-todo-input'
                        className='input input__lg'
                        name='text'
                        autoComplete='off'
                    />
                    <button type='submit' className='btn btn__primary btn__lg'>
                        Add
                    </button>
                </form>
                <div className='filters btn-group stack-exception'>
                    <button type='button' className='btn toggle-btn' aria-pressed='true'>
                        <span className='visually-hidden'>Show </span>
                        <span>all</span>
                        <span className='visually-hidden'> tasks</span>
                    </button>
                    <button type='button' className='btn toggle-btn' aria-pressed='false'>
                        <span className='visually-hidden'>Show </span>
                        <span>Active</span>
                        <span className='visually-hidden'> tasks</span>
                    </button>
                    <button type='button' className='btn toggle-btn' aria-pressed='false'>
                        <span className='visually-hidden'>Show </span>
                        <span>Completed</span>
                        <span className='visually-hidden'> tasks</span>
                    </button>
                </div>
                <h2 id='list-heading'>
                    {data.length} tasks remaining
                </h2>
                <ul
                    role='list'
                    className='todo-list stack-large stack-exception'
                    aria-labelledby='list-heading'
                >
                    {
                        data.map((item, index) => {
                            return (
                                <Todo
                                    id={data[index].id}
                                    name={data[index].title}
                                    completed={data[index].completed}
                                    onTodoClick={(isCompleted) => {
                                        handleClick(index, isCompleted)
                                    }}
                                />
                            )
                        })
                    }

                </ul>

            </div>
            <div style={{border: '1px solid black'}}>
                <pre>{JSON.stringify(data, null, 2)}</pre>
            </div>
        </div>
    )
}

export default App

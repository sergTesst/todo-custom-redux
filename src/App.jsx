import React from 'react'
import { Header } from './features/header/Header.jsx';
import AsideBar from './features/asidebar/AsideBar.jsx';
import TodoList from './features/todos/TodoList.jsx';



function App() {
  return (
    <div className="App">
      <main>
        <div className="container">

          <div className="row">

            <div className="row">
              <section className="medium-container">
                <h2>Todos</h2>
                <div className="todoapp">
                  <Header />

                </div>
              </section>
            </div>

            <div className="row mt-3 ">
              <div className="col-md-4 mb-3">
                <div className='card shadow sticky-sm-top'>

                  <AsideBar></AsideBar>

                </div>

              </div>

              <div className="col-md-8">
                <section className="todoapp">
                  {/* todoapp */}
                  <div className="">
                    <h2>todo list</h2>
                    
                    <TodoList />
                    
                  </div>
                </section>
              </div>
            </div>
            
          </div>

        </div>

      </main>
    </div>
  )
}

export default App

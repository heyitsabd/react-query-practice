import './App.css';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import PostsTraditional from './components/PostsTraditional';
import PostsRQ from './components/PostsRQ';
import RQPostDetails from './components/RQPostDetails';
import Home from './components/Home';

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/posts', label: 'Traditional Posts' },
  { to: '/rq-posts', label: 'RQ Posts' },
]

function App() {

  return (
    <BrowserRouter>
      <div className="app-shell">
        <nav className="app-nav" aria-label="Main navigation">
          <div className="app-nav__brand">
            <span className="app-nav__mark">RQ</span>
            <span>React Query Demo</span>
          </div>

          <ul className="app-nav__links">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  className={({ isActive }) => (
                    isActive ? 'app-nav__link app-nav__link--active' : 'app-nav__link'
                  )}
                  end={item.end}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/posts" element={<PostsTraditional />} />
            <Route path="/rq-posts" element={<PostsRQ />} />
            <Route path="/rq-posts/:postId" element={<RQPostDetails />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App;

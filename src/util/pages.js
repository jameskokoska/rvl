import Blog from "../pages/blog"
import Home from "../pages/home"
import Joining from "../pages/joining"
import Projects from "../pages/projects"
import Publications from "../pages/publications"
import Team from "../pages/team"

export const pages = {
  "main" : [
    {
      "title": "About",
      "link": "/",
      "component" : <Home/>
    },
    {
      "title": "Blog",
      "link": "/blog",
      "component" : <Blog/>
    },
    {
      "title": "Publications",
      "link": "/publications",
      "component" : <Publications/>
    },
    {
      "title": "Team",
      "link": "/team",
      "component" : <Team/>
    },
    {
      "title": "Projects",
      "link": "/projects",
      "component" : <Projects/>
    },
    {
      "title": "Joining",
      "link": "/joining",
      "component" : <Joining/>
    },
    
  ],
  "hidden" : [
    
  ]
}
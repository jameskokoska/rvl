/**
webLocation is the webpage link for e.g. "webLocation": "hypercrl" -> rvl.cs.toronto.edu/blog/hypercrl/
if asset is empty and a link is provided, it will redirect to an outside website

Examples: 
{
  "title": "Blog Entry",
  "date": "August 18, 2020",
  "webLocation": "hypercrl", 
  "asset": "assets/blog-pages/hypercrl.html",
},
{
  "title": "Test Entry To External Link",
  "date": "September 20, 2020",
  "link": "https://google.ca", 
}

**/


export const dataBlog = [
  {
    "title": "Continual Model-Based Reinforcement Learning with Hypernetworks",
    "date": "August 18, 2020",
    //webLocation is the webpage link: rvl.cs.toronto.edu/blog/hypercrl/
    //if asset is empty, it will redirect to an outside website
    "webLocation": "hypercrl", 
    "asset": "assets/blog-pages/hypercrl.html",
  },
  {
    "title": "Test Entry To External Link",
    "date": "test",
    "link": "https://google.ca", 
  }
]
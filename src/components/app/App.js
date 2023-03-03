import { useState } from "react";
import { lazy,Suspense } from "react";
import { BrowserRouter as Router,Route,Routes } from "react-router-dom";
import AppHeader from "../appHeader/AppHeader";import CharInfo from "../charInfo/CharInfo";

const Page404 = lazy(()=>import('../pages/404'))
const MainPage = lazy(()=>import('../pages/mainPage'))
const ComicsPage = lazy(()=>import('../pages/comicsPage'))
const SingleComicPage = lazy(()=>import('../pages/singleComicPage'))

const App  =()=>{

const[char,setChar] = useState(null);


const getIndex=(id)=>{
setChar(id)
}

return (
<Router>
<div className="app">
<AppHeader/>
<main>
<Suspense fallback={<p>Loading...</p>}>
    <Routes>
    <Route  path="/" element={<MainPage/>}/>
    <Route  path ="/comics" element={<ComicsPage/>}/>
    <Route path="/comics/:comicId" element={<SingleComicPage/>} />
    <Route path='*' element={<Page404/>}/>
    </Routes>
</Suspense >
</main>
</div>
</Router>
)

}

export default App;
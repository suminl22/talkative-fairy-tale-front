import NavBar from '../components/NavBar';
import Header from '../components/Header';
import Book from '../components/Book';
import { useNavigate } from "react-router-dom";

function Home(){
    const numOfBooks = 6;

    const books = [];

    for (let i = 0; i < numOfBooks; i++) {
        books.push(<div className="col mb-5" key={i}><Book /></div>);
    }

    return (
        <>
        <NavBar />
        <Header />
        {/* Section*/}
        <section className="py-5">
            <div className="container px-4 px-lg-5 mt-5">
                <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
                    {books}
                </div>
            </div>
        </section>
        {/* Footer*/}
        <footer className="py-5 bg-dark">
            <div className="container">
            <p className="m-0 text-center text-white">
                Copyright © OpenSourceSWProject Team7
            </p>
            </div>
        </footer>
        {/* Bootstrap core JS*/}
        {/* Core theme JS*/}
        </>

    );
}

export default Home;
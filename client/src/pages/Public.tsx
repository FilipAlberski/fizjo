import { Link } from 'react-router-dom';
const Public = () => {
  return (
    <div className="w-full flex flex-col items-center gap-5 min-h-screen">
      <div className="navbar bg-base-100 shadow-lg flex justify-center">
        <nav className="w-full md:max-w-screen-2xl flex justify-between p-1">
          {/* logo */}
          <div className="flex justify-center">Twoje logo</div>
          {/* <ThemeSwitcher /> */}
          {/* login / register */}
          <div className="flex justify-center gap-6">
            <Link className="btn btn-primary" to="/login">
              Zaloguj
            </Link>
            <Link className="btn btn-secondary" to="/register">
              Zarejestruj
            </Link>
          </div>
        </nav>
      </div>
      {/* main */}
      <div className="flex-grow">
        <div className="min- w-full bg-green-300">test</div>
      </div>

      {/* footer */}

      <footer className="footer bg-neutral flex justify-center p-3">
        <div className="md:max-w-screen-2xl flex w-full justify-between">
          <div className="text-secondary">company info</div>
          <div>social media ikony itp</div>
        </div>
      </footer>
    </div>
  );
};

export default Public;

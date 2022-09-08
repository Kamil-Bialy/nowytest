import '../css/SearchBar.css';

function SearchBar({ search, setSearch, display, onSearch }) {
  return (
    <div className='PGsearchBar'>
      <select
        className='PGsbSelect'
        onChange={e => {
          setSearch({ ...search, searchby: e.target.value });
        }}
      >
        <option className='PGsbsOption' value='firstName'>
          Imie
        </option>
        <option className='PGsbsOption' value='lastName'>
          Nazwisko
        </option>
        <option className='PGsbsOption' value='school'>
          Szkoła
        </option>
        <option className='PGsbsOption' value='year'>
          Rok Ukończenia
        </option>
      </select>
      <input
        type='text'
        className='PGsbInput'
        value={search.value}
        onChange={e => {
          setSearch({ ...search, value: e.target.value });
        }}
      />
      {search.value !== '' ? (
        <p
          className='PGsbX'
          onClick={() => {
            setSearch({ ...search, value: '' });
            display();
          }}
        >
          X
        </p>
      ) : (
        <p className='PGsbX'></p>
      )}
      <button className='PGsbButton' onClick={onSearch}>
        &#9773;Szukaj
      </button>
    </div>
  );
}

export default SearchBar;

import { Link } from 'react-router-dom';
import classes from './BigCategoryNav.module.css';

function BigCategoryNav() {
  return (
    <header className={classes.header}>
      <ul>
        <li>
          <Link to="">Sofas</Link>
        </li>
        <li>
          <Link to="">Beds</Link>
        </li>
        <li>
          <Link to="">Tables</Link>
        </li>
        <li>
          <Link to="">Chairs</Link>
        </li>
        <li>
          <Link to="">Media</Link>
        </li>
        <li>
          <Link to="">Shelves</Link>
        </li>
        <li>
          <Link to="">Closets</Link>
        </li>
        <li>
          <Link to="">Kids</Link>
        </li>
        <li>
          <Link to="">Storage</Link>
        </li>
        <li>
          <Link to="">Lamps</Link>
        </li>
      </ul>
    </header>
  );
}
export default BigCategoryNav;

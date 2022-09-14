import classes from './MainChip.module.css';

function Chips(props) {
  return (
    <div className={classes.chip}>
      <p>{props.name}</p>
    </div>
  );
}
export default Chips;

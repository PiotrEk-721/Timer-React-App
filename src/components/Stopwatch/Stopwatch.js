import styles from './Stopwatch.module.scss';

const Stopwatch = ({ formatedTimeInMilisecond, style }) => {
  return (
    <div className={styles.divSize} style={style}>
      <h2>{formatedTimeInMilisecond}</h2>
    </div>
  );
};

export default Stopwatch;

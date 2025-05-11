export const SliderInput = ({
  title,
  subTitle,
  state,
  onChange,
  min,
  max,
  minLabel,
  maxLabel,
}) => {
  return (
    <div>
      <div>{title}</div>
      <div>{subTitle}</div>
      <input
        type="range"
        min={min}
        max={max}
        value={state}
        onChange={onChange}
      />
      <div className="labels">
        <label>{minLabel ?? min}</label>
        <b>{state}</b>
        <label>{maxLabel ?? max}</label>
      </div>
    </div>
  );
};

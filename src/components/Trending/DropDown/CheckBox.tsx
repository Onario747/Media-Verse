type Props = {
  isChecked: boolean;
  onChange: (isChecked: boolean) => void;
};

const CheckBox = ({ isChecked, onChange }: Props) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <div>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
    </div>
  );
};

export default CheckBox;

import Button from './Button';

export default function OrangeButton({ text, clickEvent }) {
  return (
    <Button
      text={text}
      clickEvent={clickEvent}
      mainColor="#e5e5e5"
      subColor="#2c1822"
      hoverColor="#e5c6bc"
    />
  );
}

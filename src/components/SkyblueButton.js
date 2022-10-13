import Button from './Button';

export default function SkyblueButton({ text, clickEvent }) {
  return (
    <Button
      text={text}
      clickEvent={clickEvent}
      mainColor="#eef1f6"
      subColor="#606981"
      hoverColor="#e5e8ef"
    />
  );
}

import "./AnswerOptions.css";

export const AnswerOptions = ({
  answers,
  name,
  currentAnswer,
  setCurrentAnswer,
  label,
}) => (
  <ul className="answer-wrapper-answer-options answer-options">
    <h5 style={{ textAlign: "center" }}>{label}</h5>
    {answers.map((answer) => {
      return (
        <li
          key={"local_" + answer.id}
          className={`answer-option ${answer.text}`}
          onClick={() =>
            setCurrentAnswer({ value: answer.value, text: answer.text })
          }
        >
          <input
            type="radio"
            className="radioCustomButton"
            name={name}
            checked={answer.value === currentAnswer?.value}
            value={answer.text}
            id={answer.id}
            onChange={() => {}}
          />
          <label className={`radioCustomLabel ${answer.text}`}>
            {answer.text}
          </label>
        </li>
      );
    })}
  </ul>
);

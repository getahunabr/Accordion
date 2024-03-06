//single selections
//multiple selection
import data from "./data";
import { useState } from "react";
import "./style.css";
export default function Accordion() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);
  function handleSingleSelcetion(getCurrentId) {
    // console.log(getCurrentId);
    setSelected(getCurrentId === selected ? null : getCurrentId);
  }
  function handleMultiSelction(getCurrentId) {
    console.log(selected);
    let cpyMultiple = [...multiple];
    const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);
    console.log(findIndexOfCurrentId);
    if (findIndexOfCurrentId === -1) {
      cpyMultiple.push(getCurrentId);
    } else {
      cpyMultiple.splice(findIndexOfCurrentId, 1);
    }
    setMultiple(cpyMultiple);
  }
  return (
    <div className="wrapper">
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable MultiSelection
      </button>
      <div className="accordion">
        {data && data.length > 0 ? (
          data.map((dataItem) => {
            return (
              <div className="item">
                <div
                  onClick={
                    enableMultiSelection
                      ? () => handleMultiSelction(dataItem.id)
                      : () => handleSingleSelcetion(dataItem.id)
                  }
                  className="title"
                >
                  <h3>{dataItem.question}</h3>
                  <span>+</span>
                </div>

                {enableMultiSelection
                  ? multiple.indexOf(dataItem.id) !== -1 && (
                      <div className="content">{dataItem.answer}</div>
                    )
                  : selected === dataItem.id && (
                      <div className="content">{dataItem.answer}</div>
                    )}
                {/* {selected === dataItem.id ||
                multiple.indexOf(dataItem.id) !== -1 ? (
                  <div className="content">{dataItem.answer}</div>
                ) : null} */}
              </div>
            );
          })
        ) : (
          <div>No data Found</div>
        )}
      </div>
    </div>
  );
}

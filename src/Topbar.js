import { useEffect, useRef } from "react";
import "./Topbar.css";
const Topbar = ({dropdown_trigger_text, open, setOpen, bubbleSort, insertionSort, selectionSort, mergeSort, quickSort, onClickNewArray, disable}) => {
  let menuRef = useRef();
  useEffect(() => {
    let handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    // console.log('Rendered');

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });
  return (
    <div className="topBar">
      <span className="title">Sorting Visualiser</span>
      <div className="topBarRight">
        <div className="dropdown-container" ref={menuRef}>
          <button
            className="dropdown-trigger"
            onClick={() => {
              setOpen(!open);
            }}
          disabled={disable}>
            {dropdown_trigger_text}
            <i className="fa fa-angle-down"></i>
          </button>
          <div className={`dropdown-menu ${open ? "active" : "inactive"}`}>
            <button className="dropdown-menu-buttons" onClick={bubbleSort}>
              Bubble Sort
            </button>
            <button className="dropdown-menu-buttons" onClick={insertionSort}>
              Insertion Sort
            </button>
            <button className="dropdown-menu-buttons" onClick={selectionSort}>
              Selection Sort
            </button>
            <button className="dropdown-menu-buttons" onClick={mergeSort}>
              Merge Sort
            </button>
            <button className="dropdown-menu-buttons" onClick={quickSort}>
              Quick Sort
            </button>
          </div>
        </div>
        {/* 
          <button onClick={insertionSort}>Insertion Sort</button>
        <button onClick={selectionSort}>Selection Sort</button>
        <button onClick={mergeSort}>Merge Sort</button>
        <button onClick={quickSort}>Quick Sort</button> */}
        <button onClick={onClickNewArray} disabled={disable}>Generate Array</button>
      </div>
    </div>
  );
};

export default Topbar;

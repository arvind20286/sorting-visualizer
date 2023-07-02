import "./BarColorLabels.css";

const BarColorLabels = ({ dropdown_trigger_text }) => {
  let bubble_sort = dropdown_trigger_text == "bubble sort";
  let insertion_sort = dropdown_trigger_text == "insertion sort";
  let selection_sort = dropdown_trigger_text == "selection sort";
  let merge_sort = dropdown_trigger_text == "merge sort";
  let quick_sort = dropdown_trigger_text == "quick sort";

  return (
    <div className="bars-colors-labels">
      <div className="bar-color-label">
        <div className="unsorted-color-box"></div>
        <span>Unsorted</span>
      </div>
      {(bubble_sort || insertion_sort || selection_sort) && (
        <>
          <div className="bar-color-label">
            <div className="comparing-color-box"></div>
            <span>Comparing</span>
          </div>
          <div className="bar-color-label">
            <div className="sorted-color-box"></div>
            <span>Sorted</span>
          </div>
          <div className="bar-color-label">
            <div className="swapping-color-box"></div>
            <span>Swaping</span>
          </div>
        </>
      )}

      {merge_sort && (
        <>
          <div className="bar-color-label">
            <div className="sorted-color-box"></div>
            <span>Sorted</span>
          </div>
          <div className="bar-color-label">
            <div className="left-sorted-color-box"></div>
            <span>Left Sorted</span>
          </div>
          <div className="bar-color-label">
            <div className="right-sorted-color-box"></div>
            <span>Right Sorted</span>
          </div>
        </>
      )}
    </div>
  );
};

export default BarColorLabels;

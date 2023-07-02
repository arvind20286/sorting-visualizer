import "./SortingAlgoDesc.css";

const SortingAlgoDesc = ({ dropdown_trigger_text }) => {
  let bubble_sort = dropdown_trigger_text == "bubble sort";
  let insertion_sort = dropdown_trigger_text == "insertion sort";
  let selection_sort = dropdown_trigger_text == "selection sort";
  let merge_sort = dropdown_trigger_text == "merge sort";
  let quick_sort = dropdown_trigger_text == "quick sort";

  return (
    <div className="sorting-algo-desc-box">
      {bubble_sort && (
        <div>
          <h1>Bubble Sort</h1>
          <p>
            <p>
              Bubble sort is a sorting algorithm that compares two adjacent
              elements and swaps them until they are in the intended order.
            </p>
            <p>
              Just like the movement of air bubbles in the water that rise up to
              the surface, each element of the array move to the end in each
              iteration. Therefore, it is called a bubble sort.
            </p>
          </p>
          <div>
            <span className="complexity">Time Complexity</span> : O(n
            <sup>2</sup>)
          </div>
          <div>
            <span className="complexity">Space Complexity</span> : O(1)
          </div>
          <div>
            <span className="complexity">Stability</span> : Yes
          </div>
        </div>
      )}
      {insertion_sort && (
        <div>
          <h1>Insertion Sort</h1>
          <p>
            <p>
              Insertion sort is a sorting algorithm that places an unsorted
              element at its suitable place in each iteration.
            </p>
            <p>
              Insertion sort works similarly as we sort cards in our hand in a
              card game.
            </p>
            <p>
              We assume that the first card is already sorted then, we select an
              unsorted card. If the unsorted card is greater than the card in
              hand, it is placed on the right otherwise, to the left. In the
              same way, other unsorted cards are taken and put in their right
              place.
            </p>
            <p>A similar approach is used by insertion sort.</p>
          </p>
          <div>
            <span className="complexity">Time Complexity</span> : O(n
            <sup>2</sup>)
          </div>
          <div>
            <span className="complexity">Space Complexity</span> : O(1)
          </div>
          <div>
            <span className="complexity">Stability</span> : Yes
          </div>
        </div>
      )}
      {selection_sort && (
        <div>
          <h1>Selection Sort</h1>
          <p>
            <p>
              Selection sort is a sorting algorithm that selects the smallest
              element from an unsorted list in each iteration and places that
              element at the beginning of the unsorted list.
            </p>
          </p>
          <div>
            <span className="complexity">Time Complexity</span> : O(n
            <sup>2</sup>)
          </div>
          <div>
            <span className="complexity">Space Complexity</span> : O(1)
          </div>
          <div>
            <span className="complexity">Stability</span> : No
          </div>
        </div>
      )}
      {merge_sort && (
        <div>
          <h1>Merge Sort</h1>
          <p>
            <p>
              Merge sort (also commonly spelled as mergesort) is an efficient,
              general-purpose, and comparison-based sorting algorithm.
            </p>
            <p>
              Conceptually, a merge sort works as follows:
              <p>
                1. Divide the unsorted list into n sublists, each containing one
                element (a list of one element is considered sorted).
              </p>
              <p>
                2. Repeatedly merge sublists to produce new sorted sublists
                until there is only one sublist remaining. This will be the
                sorted list.
              </p>
            </p>
          </p>
          <div>
            <span className="complexity">Time Complexity</span> : O(nlogn)
          </div>
          <div>
            <span className="complexity">Space Complexity</span> : O(n)
          </div>
          <div>
            <span className="complexity">Stability</span> : Yes
          </div>
        </div>
      )}
    </div>
  );
};

export default SortingAlgoDesc;

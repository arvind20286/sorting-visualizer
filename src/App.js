import "./App.css";
import "./Bar.css";
import "./Topbar"
import { useState, useEffect } from "react";
import Topbar from "./Topbar";
import BarColorLabels from "./BarColorLabels";
import SortingAlgoDesc from "./SortingAlgoDesc";

function getRandomHeight(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const App = () => {
  const sleep = (milliSeconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliSeconds));
  };
  const generateBars = (size) => {
    let a = [];
    for (let i = 0; i < size; i++) {
      let hheight = getRandomHeight(1, 100);
      a.push(hheight);
      // content.push(<Bar height={hheight} width={((windowSize[0]-30)/x-m)} margin={m}/>);
    }
    return a;
  };

  const onChangeSize = (event) => {
    setSize(event.target.value);
    setSortedGroup([]);
    // console.log(event.target.value, " ", size);
    setArr(generateBars(event.target.value));
  };

  const onClickNewArray = () => {
    setSortedGroup([]);
    setLeftRightSortedGroup([[],[]]);
    setComparingGroup([]);
    setSwappingGroup([]);
    setArr(generateBars(size));
  };

  const bubbleSort = async () => {
    setDisableButton(true);
    setOpen(false);
    setDropdownTriggerText("bubble sort");
    let newArray = [...arr];
    let new_sorted_group = [];

    for (let i = 0; i < newArray.length; i++) {
      let swap_flag = false;
      for (let j = 0; j < newArray.length - i - 1; j++) {
        let in_loop_swap = false;
        let speed = 100 - document.getElementById("speed").value;
        await sleep(5*speed);
        setComparingGroup([j, j+1]);
        await sleep(5*speed);
        if (newArray[j] >= newArray[j + 1]) {
          let temp = newArray[j];
          newArray[j] = newArray[j + 1];
          newArray[j + 1] = temp;
          swap_flag = true;
          in_loop_swap = true;
          setComparingGroup([]);
          setSwappingGroup([j, j+1]); // changeing comapring group to change colors of bars for swapping
          await sleep(speed);
          setArr([...newArray]);
        }
        await sleep(5*speed);
        if(in_loop_swap){
          setSwappingGroup([]);
        }
        
      }
      new_sorted_group.push(newArray.length - i - 1);
      setSortedGroup([...new_sorted_group]);

      if (!swap_flag) {
        for (let j = 0; j < newArray.length - i-1; j++) {
          new_sorted_group.push(j);
          setSortedGroup([...new_sorted_group]);
        }
        break;
      }
      
    }
    // console.log("newArray = ", newArray);
    setComparingGroup([]);
    setSwappingGroup([]);
    setDisableButton(false);
  };

  const insertionSort = async () => {
    setDisableButton(true);
    setOpen(false);
    setDropdownTriggerText("insertion sort");
    let newArray = [...arr];
    let new_sorted_group = [0];
    let speed = 100 - document.getElementById("speed").value;
    setSortedGroup([0]);
    await sleep(2*speed);
    for (let i = 1; i < size; i++) {
      let curr_ele = newArray[i];
      let j = i - 1;
      speed = 100 - document.getElementById("speed").value;
      
      new_sorted_group.push(i);
      setSortedGroup([...new_sorted_group]);

      while (j > -1 && newArray[j] > curr_ele) {
        setComparingGroup([j,j+1])
        await sleep(5*speed);
        newArray[j + 1] = newArray[j];
        newArray[j] = curr_ele;
        setComparingGroup([]);
        setSwappingGroup([j, j+1]);
        await sleep(5*speed);
        setArr([...newArray]);
        await sleep(speed);
        j--;
        setSwappingGroup([]);
      }
      await sleep(2*speed);

    }
    setComparingGroup([]);
    setSwappingGroup([]);
    setDisableButton(false);

  };

  const selectionSort = async () => {
    setDisableButton(true);
    setOpen(false);
    setDropdownTriggerText("selection sort");
    let newArray = [...arr];
    let new_sorted_group = [];
    
    for (let i = 0; i < newArray.length - 1; i++) {
      let speed = 100 - document.getElementById("speed").value;
      let min_value_index = i;
      let j = i + 1;
      while (j < newArray.length) {
        speed = 100 - document.getElementById("speed").value;
        await sleep(6*speed);
        setComparingGroup([min_value_index,j]);
        if(newArray[min_value_index] > newArray[j]) {
          min_value_index = j;
          await sleep(6*speed);
          setComparingGroup([min_value_index]);
          await sleep(6*speed);
          j++;
          continue;
        }
        j++;
      }
      setComparingGroup([]);
      let temp = newArray[i];
      newArray[i] = newArray[min_value_index];
      newArray[min_value_index] = temp;
      setSwappingGroup([i, min_value_index]);
      await sleep(6*speed);
      setArr([...newArray]);
      await sleep(speed);
      setSwappingGroup([]);
      new_sorted_group.push(i);
      setSortedGroup([...new_sorted_group]);
    }
    new_sorted_group.push(newArray.length-1);
    setSortedGroup([...new_sorted_group]);
    setDisableButton(false);

  };

  const merge = async(arr, l, m, r, trace) => {
    // let speed = 100 - document.getElementById("speed").value;
    let curr_trace = [];
    // await sleep(speed);
    let new_left_sorted_group = [];
    for (let i = l; i <= m; i++) {
      new_left_sorted_group.push(i);
    }
    // setLeftSortedGroup([...new_left_sorted_group]);
    let new_right_sorted_group = [];
    for (let i = m + 1; i <= r; i++) {
      new_right_sorted_group.push(i);
    }
    curr_trace.push(new_left_sorted_group);
    curr_trace.push(new_right_sorted_group);
    // setRightSortedGroup([...new_right_sorted_group]);
    let n1 = m - l + 1;
    let n2 = r - m;

    let L = new Array(n1);
    let R = new Array(n2);

    for (let i = 0; i < n1; i++) L[i] = arr[l + i];
    for (let j = 0; j < n2; j++) R[j] = arr[m + 1 + j];

    let i = 0;

    let j = 0;

    let k = l;

    // await sleep(10*speed);
    
    while (i < n1 && j < n2) {
      // speed = 100 - document.getElementById("speed").value;
      // await sleep(speed);
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;        
      }
      // let index = new_left_sorted_group.indexOf(k);
      // if(index !== -1){
      //   console.log('delet left = ', index, ' ', new_left_sorted_group);
      //   new_left_sorted_group = new_left_sorted_group.splice(index, 1);
      //   setLeftSortedGroup([...new_left_sorted_group]);
      // }
      // index = new_right_sorted_group.indexOf(k);
      // if(index !== -1){
      //   console.log('delet right = ', index, ' ', new_right_sorted_group);

      //   new_right_sorted_group = new_right_sorted_group.splice(index, 1);

      //   setRightSortedGroup([...new_right_sorted_group]);
      // }
      // await sleep(10*speed);
      // new_sorted_group.push(k);
      // setArr([...arr]);
      // setSortedGroup([...new_sorted_group]);
      // // let bar = document.getElementById(k);
      // // bar.style.backgroundColor = "lightgreen";
      // await sleep(speed);
      k++;
    }

    while (i < n1) {
      // await sleep(100);
      // let index = new_left_sorted_group.indexOf(k);
      //   if(index !== -1){
      //     new_left_sorted_group = new_left_sorted_group.splice(index, 1);
      //     setLeftSortedGroup([...new_left_sorted_group]);
      //   }
      // let bar = document.getElementById(k);
      // bar.style.backgroundColor = "lightgreen";
      arr[k] = L[i];
      // new_sorted_group.push(k);
      // setArr([...arr]);
      // setSortedGroup([...new_sorted_group]);
      // await sleep(100);
      i++;
      k++;
    }

    while (j < n2) {
      // await sleep(100);
      // let index = new_right_sorted_group.indexOf(k);
      //   if(index !== -1){
      //     new_right_sorted_group = new_right_sorted_group.splice(index, 1);
      //     setRightSortedGroup([...new_right_sorted_group]);
      //   }
      // let bar = document.getElementById(k);
      // bar.style.backgroundColor = "lightgreen";
      arr[k] = R[j];
      // new_sorted_group.push(k);
      // setArr([...arr]);
      // setSortedGroup([...new_sorted_group]);
      // await sleep(100);
      j++;
      k++;
    }
    // setLeftSortedGroup([]);
    // setRightSortedGroup([]);
    // setSortedGroup([]);
    curr_trace.push([...arr]);
    trace.push(curr_trace);
    

  }

  const mergeSortHelper = async (arr, l, r, trace) => {
    if (l >= r) {
      return; //returns recursively
    }

    let m = l + parseInt((r - l) / 2);

    await mergeSortHelper(arr, l, m, trace);

    await mergeSortHelper(arr, m + 1, r, trace);
    

    await merge(arr, l, m, r, trace);
    
  };

  const mergeSort = async () => {
    setDisableButton(true);
    setOpen(false);
    setDropdownTriggerText("merge sort");
    let new_arr = [...arr];
    let trace = [];

    await mergeSortHelper(new_arr, 0, arr.length - 1, trace);
    let speed = 100 - document.getElementById("speed").value;
    new_arr = [...arr];
    for(let i = 0; i < trace.length; i++){
      speed = 100 - document.getElementById("speed").value;
      let new_sorted_group = [];
      let new_left_group = [];
      let new_right_group = [];
      let j = 0;
      let k = 0; 
      while(j < trace[i][0].length && k < trace[i][1].length){
        speed = 100 - document.getElementById("speed").value;
        new_left_group.push(trace[i][0][j]);
        new_right_group.push(trace[i][1][k]);
        j++;
        k++;
        setLeftRightSortedGroup([[...new_left_group], [...new_right_group]]);
        await sleep(speed);
      }
      while(j < trace[i][0].length){
        speed = 100 - document.getElementById("speed").value;
        new_left_group.push(trace[i][0][j]);
        j++;
        setLeftRightSortedGroup([[...new_left_group], [...new_right_group]]);
        await sleep(speed);
      }
      while(k < trace[i][1].length){
        speed = 100 - document.getElementById("speed").value;
        new_left_group.push(trace[i][1][j]);
        k++;
        setLeftRightSortedGroup([[...new_left_group], [...new_right_group]]);
        await sleep(speed);
      }
      setLeftRightSortedGroup([trace[i][0],trace[i][1]]);
      await sleep(5*speed);
      while(trace[i][0].length !== 0){
        speed = 100 - document.getElementById("speed").value;
        let index = trace[i][0][0];
        trace[i][0].splice(0, 1);
        console.log(trace[i][0]);
        setLeftRightSortedGroup([[...trace[i][0]], [...trace[i][1]]]);
        new_sorted_group.push(index);
        new_arr[index] = trace[i][2][index];
        setArr([...new_arr]);
        setSortedGroup([...new_sorted_group]);
        await sleep(5*speed);


      }
      while(trace[i][1].length !== 0){
        speed = 100 - document.getElementById("speed").value;
        let index = trace[i][1][0];
        trace[i][1].splice(0, 1);
        setLeftRightSortedGroup([[...trace[i][0]], [...trace[i][1]]]);
        new_sorted_group.push(index);
        new_arr[index] = trace[i][2][index];
        setArr([...new_arr]);
        setSortedGroup([...new_sorted_group]);
        await sleep(5*speed);

      }

      setSortedGroup([]);
      setArr(trace[i][2]);

    }
    let s = [];
    for(let i = 0; i < new_arr.length; i++){
      s.push(i);
    }
    setSortedGroup(s);
    setDisableButton(false);

  };

  const partition = async (arr, low, high) => {
    let pivot = arr[high];
    let pivot_bar = document.getElementById(high);
    pivot_bar.style.backgroundColor = "yellow";

    let i = low - 1;
    for (let j = low; j < high; j++) {
      let curr_bar = document.getElementById(j);
      curr_bar.style.backgroundColor = "crimson";
      await sleep(100);
      if (arr[j] < pivot) {
        i++;
        let temp = arr[j];
        arr[j] = arr[i];
        arr[i] = temp;

        setArr([...arr]);
        let small_bar = document.getElementById(i);
        small_bar.style.backgroundColor = "purple";
      }
      await sleep(100);
      curr_bar.style.backgroundColor = "coral";
      await sleep(100);
    }
    let temp = arr[high];
    arr[high] = arr[i + 1];
    arr[i + 1] = temp;
    setArr([...arr]);
    // pivot_bar = document.getElementById(i+1);
    // pivot_bar.style.backgroundColor = "green";
    for (let j = low; j <= high; j++) {
      if (j !== i + 1) {
        let curr_bar = document.getElementById(j);
        curr_bar.style.backgroundColor = "#19A7CE";
      }
    }
    return i + 1;
  };

  const quickSortHelper = async (arr, low, high) => {
    if (low === high) {
      await sleep(1000);
      let pivot_bar = document.getElementById(low);
      pivot_bar.style.backgroundColor = "green";
    }
    if (low < high) {
      let pivot_index = await partition(arr, low, high);
      // console.log(pivot_index);
      let pivot_bar = document.getElementById(pivot_index);
      pivot_bar.style.backgroundColor = "green";
      await quickSortHelper(arr, low, pivot_index - 1);
      await quickSortHelper(arr, pivot_index + 1, high);
    }
  };

  const quickSort = async () => {
    setDisableButton(true);
    setOpen(false);
    setDropdownTriggerText("quick sort");
    let new_arr = [...arr];
    await quickSortHelper(new_arr, 0, new_arr.length - 1);
    // console.log(new_arr);
    setDisableButton(false);

  };
  
  const [open, setOpen] = useState(false);
  const [size, setSize] = useState(10); // initial = 60
  const [animation_speed, setAnimationSpeed] = useState(100);
  const [dropdown_trigger_text, setDropdownTriggerText] = useState("sorting algorithm");
  const [arr, setArr] = useState([10, 19, 48, 32, 35, 62, 19, 57, 88, 34]); //useState(generateBars(size));

  const [sorted_group, setSortedGroup] = useState([]);
  const [comparing_group, setComparingGroup] = useState([]);
  const [swapping_group, setSwappingGroup] = useState([]);
  const [left_right_sorted_group, setLeftRightSortedGroup] = useState([[],[]]);

  const [disable_button, setDisableButton] = useState(false);
  // min width of a bar will be 8px
  // console.log(sorted_group);




  useEffect(() => {
    setSortedGroup([]);
  }, [size]);

  const getBars = () =>{return arr.map((hheight, idx) => {
    let state = "";
  
    if(comparing_group.includes(idx)){
      state = "comparing";
    }
    
    else if(swapping_group.includes(idx)){
      state = "swapping";
    }
    else if(sorted_group.includes(idx)){
      state = "sorted";
    }
    else if(left_right_sorted_group.lenght !== 0 && left_right_sorted_group[0].includes(idx)){
      state = "left-sorted-group";
    }

    else if(left_right_sorted_group.lenght !== 0 && left_right_sorted_group[1].includes(idx)){
      state = "right-sorted-group";
    }

    
    return(
      <div
      className={`bar ${state}`}
      key={idx}
      id={idx}
      style={{
        height: `${hheight}%`,
        width: `${(100 / size)}%`,
      }}
    ></div>
    )
    })};
  
  return (
    <div className="visualizer">
    <Topbar dropdown_trigger_text={dropdown_trigger_text} open={open} setOpen={setOpen} bubbleSort={bubbleSort} insertionSort={insertionSort} selectionSort={selectionSort} quickSort={quickSort} mergeSort={mergeSort} onClickNewArray={onClickNewArray} disable={disable_button}/>
      <div className="barsBox">
        {getBars()}
      </div>
      <div className="speed-size-inputs">
        <div className="sizeToggle">
          <div>Size</div>
          <input
            type="range"
            min="10"
            max="33"
            value={size}
            step="1"
            onChange={onChangeSize}
            disabled={disable_button}
          />
        </div>
        <div className="speedToggle">
          <div>Speed</div>
          <input
            id="speed"
            type="range"
            min="1"
            max="75"
            step="1"
            value={100 - animation_speed}
            onChange={(e) => {
              setAnimationSpeed(100 - e.target.value);
              // console.log(animation_speed);
            }}
          />
        </div>
      </div>
      <hr></hr>
      <BarColorLabels dropdown_trigger_text={dropdown_trigger_text}/>
      <hr></hr>
      <SortingAlgoDesc dropdown_trigger_text={dropdown_trigger_text}/>
    </div>
      
    
  );
}

export default App;

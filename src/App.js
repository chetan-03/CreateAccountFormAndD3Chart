import React, { useEffect, useState } from "react";
import CreateForm from "./components/CreateForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BarDiag from "./components/BarDiag";
//  random data for bar diagram
const datas = [
	[10, 30, 40, 20],
	[10, 40, 30, 20, 50, 10],
	[60, 30, 40, 20, 30],
];
var i = 0;

function App() {
	// setting data state for storing 1 diagram data at once
	const [data, setData] = useState([]);
	// calling changeData when page loads for first time
	useEffect(() => {
		changeData();
	}, []);
	// updating data state to new bar diagram data
	const changeData = () => {
		setData(datas[i++]);
		if (i === datas.length) i = 0;
	};

	return (
		<Router>
			<Routes>
				<Route path='/' element={<CreateForm />} />
				<Route
					path='/D3'
					element={
						<div className='BarChart'>
							<h1>Bar Diagram with D3JS and ReactJS</h1>
							<caption>click on bar chart to update!!</caption>
							<BarDiag
								onClick={changeData}
								width={600}
								height={400}
								data={data}
							/>
						</div>
					}
				/>
			</Routes>
		</Router>
	);
}

export default App;

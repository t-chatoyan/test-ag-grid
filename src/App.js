import React, {useEffect, useState} from 'react';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import AudioPlay from './components/AudioPlay';
import Modal from 'react-modal';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import edit from "./assets/icons/edit.png";

const App = () => {

	const customStylesModal = {
		content: {
			top: '50%',
			left: '50%',
			right: 'auto',
			bottom: 'auto',
			marginRight: '-50%',
			transform: 'translate(-50%, -50%)',
		},
	};

	const [modalIsOpen, setIsOpen] = React.useState(false);
	const [activeData, setActiveData] = React.useState({});

	function closeModal() {
		setIsOpen(false);
		setActiveData({});
	}

	const gridOptions = {
		rowHeight: 70,
	};

	const openModal = (params) => {
		setActiveData(params.data);
		setIsOpen(true);
	};

	const [rowData] = useState([
		{audio: "https://file-examples.com/fe-0129qp/2017/11/file_example_MP3_700KB.mp3", text: "test text1"},
		{audio: "https://file-examples.com/fe-0129qp/2017/11/file_example_MP3_700KB.mp3", text: "test text2"},
		{audio: "https://file-examples.com/fe-0129qp/2017/11/file_example_MP3_700KB.mp3", text: "test text3"},
		{audio: "https://file-examples.com/fe-0129qp/2017/11/file_example_MP3_700KB.mp3", text: "test text4"},
		{audio: "https://file-examples.com/fe-0129qp/2017/11/file_example_MP3_700KB.mp3", text: "test text5"},
		{audio: "https://file-examples.com/fe-0129qp/2017/11/file_example_MP3_700KB.mp3", text: "test text6"},

	]);

	const [columnDefs] = useState([
		{ headerName: "Audio", field:"audio", cellRenderer: AudioPlay, width: 400 },
		{ headerName: "Text", field: "text" },
		{ headerName: "Edit",
			cellRenderer : function(params){
				return <div>
					<button onClick={() => openModal(params)}>
						<img src={edit} alt="" width='20' height='20'/>
					</button>
				</div>
			}
		}
	]);


	return (
		<div className="app">
			<div className="ag-theme-alpine" style={{height: 400, width: '80%'}}>
				<AgGridReact
					rowData={rowData}
					gridOptions={gridOptions}
					columnDefs={columnDefs}>
				</AgGridReact>
			</div>
			<Modal
				style={customStylesModal}
				isOpen={modalIsOpen}
				ariaHideApp={false}
				onRequestClose={closeModal}
				contentLabel="Edit Modal"
			>
				<div>
					<h1>{activeData.text}</h1>
					<audio controls>
						<source src={activeData.audio} type="audio/mp3"/>
					</audio>
				</div>
			</Modal>
		</div>
	);
};

export default App;

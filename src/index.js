import React from 'react';
import ReactDOM from 'react-dom';


class App extends React.Component{
	constructor(props){
		super(props);
		this.state={
			input:'0',
			nowInput:'0',
		}
		this.handleClick = this.handleClick.bind(this);
		this.acClick = this.acClick.bind(this);
		this.equalClick = this.equalClick.bind(this);
	}


	handleClick(event){
		let str = this.state.nowInput+event.target.value;
		let nowStr = this.state.input+event.target.value;
		let len = nowStr.length;
		if (str[0] === '0' && str[1] === '.'){

		}
		else if (str[0] === '0' || str[0] === '.' || str[0] === '+' || str[0] === '-' || str[0] === 'x' || str[0] === '/'){
			str = str.slice(1,str.length);
		}
		if (nowStr[0] === '0' && nowStr[1] === '.'){
			
		}
		else if (nowStr[0] === '0' || nowStr[0] === '.' || nowStr[0] === '+' || nowStr[0] === '-' || nowStr[0] === 'x' || nowStr[0] === '/'){
			nowStr = nowStr.slice(1,nowStr.length);
		}

		if (isNaN(nowStr[len-1]) && isNaN(nowStr[len-2]) ) {
			nowStr = nowStr.slice(0,len-2);
			nowStr = nowStr + event.target.value;
		}

		this.setState({
			input:nowStr,
			nowInput:event.target.value === '+' ?
			 event.target.value: event.target.value === '-' ?
			  event.target.value : event.target.value === 'x' ?
			   event.target.value : event.target.value === '/' ?
			    event.target.value : str,
		});
	}

	acClick(){
		this.setState({
			input:'0',
			nowInput:'0',
		})
	}

	equalClick(){
		let answer;
		let c = 0;
		let b;
		if (this.state.input[this.state.input.length-1] === '+' || this.state.input[this.state.input.length-1] === '-' || this.state.input[this.state.input.length-1] === 'x' || this.state.input[this.state.input.length-1] === '/'){
			 b = this.state.input;
		}else{
			 b = this.state.input+'+';}
		let obj = {
			num:[],
			op:[],
		}
		for(let i = 0;i <b.length;i++){
			
			if (b[i] === '+' || b[i] === '-' || b[i] === 'x' || b[i] === '/'){
				obj.num.push(b.slice(c,i));
				obj.op.push(b.slice(i,i+1));
				c = i+1;
			}
		}
		obj.op.pop();
		obj.num = obj.num.map(d => +d);
		console.log(obj.num);
		for(let j = 0;j<obj.op.length;j++){
			if(obj.op[j] === 'x'){
				//answer.push(obj.num[j]*obj.num[j+1]); 
				obj.num.splice(j,2,obj.num[j]*obj.num[j+1],0);
			}else if (obj.op[j] === '/'){
				//answer.push(obj.num[j]/obj.num[j+1]); 
				obj.num.splice(j,2,obj.num[j]/obj.num[j+1],0);
			}
		}

		for(let k = 0;k<obj.op.length;k++){
			if(obj.op[k] === '+'){
				//answer.push(+obj.num[k]+(+obj.num[k+1])); 
				obj.num.splice(k,2,+obj.num[k]+(+obj.num[k+1]),0);
			}else if (obj.op[k] === '-'){
				//answer.push(obj.num[k]-obj.num[k+1]); 
				obj.num.splice(k,2,obj.num[k]-obj.num[k+1],0);
			}
		}
		console.log(obj.num);
		answer = obj.num.reduce((a,b) => a+b);
		console.log(answer);
		this.setState({
			nowInput:answer,
		})
	}

	render(){
		let backgroundStyle={
			backgroundColor:"#c2c2d6",
			width:"100vw",
			height:"100vh",
			display:"flex",
			justifyContent:"center",
			alignItems:"center",

		}

		let calculatorBackground={
			
			backgroundColor:"black",
			color:"white",
			minWidth:350,
			padding:10,
			
		}

		let buttonStyle={
			color:"white",
			backgroundColor:"#4d4d4d",
		}

		let acStyle={
			color:"white",
			backgroundColor:"red",
			gridColumnStart:1,
			gridColumnEnd:3,

		}

		let zeroStyle={
			color:"white",
			backgroundColor:"#4d4d4d",
			gridColumnStart:1,
			gridColumnEnd:3,
		}

		let equalStyle={
			color:"white",
			backgroundColor:"blue",
			gridColumnStart:4,
			gridColumnEnd:5,
			gridRowStart:4,
			gridRowEnd:6,

		}

		let operatorStyle={
			color:"white",
			backgroundColor:"gray",

		}

		let buttons={
			marginTop:40,
			display:'grid',
			gridTemplateColumns:'1fr 1fr 1fr 1fr',
			gridTemplateRows:'1fr 1fr 1fr 1fr 1fr',
			gridColumnGap:3,
			gridRowGap:3,
		}



		return(
		<div style={backgroundStyle}>
			<div style={calculatorBackground}>
				<h3>{this.state.input}</h3>
				<h2>{this.state.nowInput}</h2>
				<span style={buttons}>
				<button className="btn" onClick={this.acClick} style={acStyle}>AC</button>
				<button className="btn" onClick={this.handleClick} value={'/'} style={operatorStyle}>/</button>
				<button className="btn" onClick={this.handleClick} value={'x'} style={operatorStyle}>x</button>
				<button className="btn" onClick={this.handleClick} value={'7'} style={buttonStyle}>7</button>
				<button className="btn" onClick={this.handleClick} value={'8'} style={buttonStyle}>8</button>
				<button className="btn" onClick={this.handleClick} value={'9'} style={buttonStyle}>9</button>
				<button className="btn" onClick={this.handleClick} value={'-'} style={operatorStyle}>-</button>
				<button className="btn" onClick={this.handleClick} value={'4'} style={buttonStyle}>4</button>
				<button className="btn" onClick={this.handleClick} value={'5'} style={buttonStyle}>5</button>
				<button className="btn" onClick={this.handleClick} value={'6'} style={buttonStyle}>6</button>
				<button className="btn" onClick={this.handleClick} value={'+'} style={operatorStyle}>+</button>
				<button className="btn" onClick={this.handleClick} value={'1'} style={buttonStyle}>1</button>
				<button className="btn" onClick={this.handleClick} value={'2'} style={buttonStyle}>2</button>
				<button className="btn" onClick={this.handleClick} value={'3'} style={buttonStyle}>3</button>
				<button className="btn" onClick={this.equalClick} style={equalStyle}>=</button>
				<button className="btn" onClick={this.handleClick} value={'0'} style={zeroStyle}>0</button>
				<button className="btn" onClick={this.handleClick} value={'.'} style={buttonStyle}>.</button>
				</span>
			</div>
		</div>
		);
	}
}













ReactDOM.render(
    <App />,
  document.getElementById('root')
);



class Game extends React.Component {
  state = {
    clicks: 0,
    gameStart: false,
  }
  timeLimit = 5000;
  timeStart = 0;

  render() {
    let message;

    if(this.state.gameStart){
      message = this.state.clicks;
    } else {
      message = 'กดตรงไหนก็ได้เพื่อเริ่มเล่น';
    }

    let timer = '';
    if(this.state.gameStart){
      timer = ` เหลือเวลาอยู่ ${this.formatTime(this.getTimeLeft())} sec`;
    }

    return (
      <div>
          <div id="title" className="title">Clickr</div>
          <div id="message">{message}</div>
          <div id="timer">{timer}</div>
      </div>
    );
  }

  componentWillMount() {
    window.addEventListener('click', this.onClick)
  }

  onClick = () => {
    this.setState({
      clicks: this.state.clicks + 1,
    })
    // clicks++
    // messageBox.textContent = clicks
    // messageBox.style.fontSize = (clicks + 12) + 'pt'
    if(!this.state.gameStart){
      this.timeStart = new Date().getTime()
      this.setState({
        gameStart: true,
      })
      this.startTimer()    
    }
  }

  startTimer() {
    this.interval = setInterval(() => {
      let elapsedTime = this.getTimeLeft()
      if(elapsedTime < 0) {
        clearInterval(this.interval)
        window.removeEventListener('click', this.onClick)
      }
      this.forceUpdate();
    }, 100)
  }
  
  getTimeLeft() {
    let currentTime = new Date().getTime()
    return (this.timeLimit + this.timeStart) - currentTime
  }

  formatTime(time){
    return (time/1000).toFixed(1)
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));

let clicks = 0
let messageBox = document.getElementById('message')
let gameStart = false
let timeStart = 0
let timeLimit = 5000
let timer = document.getElementById('timer')
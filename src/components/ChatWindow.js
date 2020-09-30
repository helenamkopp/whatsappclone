import React, { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import './ChatWindow.css';

import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import CloseIcon from '@material-ui/icons/Close';
import SendIcon from '@material-ui/icons/Send';
import MicIcon from '@material-ui/icons/Mic';


export default () => {

  let recognition = null;
  let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(SpeechRecognition !== undefined) {
    recognition = new SpeechRecognition();
  }

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);

  // faz o emoji aparecer após ser clicado
  const handleEmojiClick = (e, emojiObject) => {
    setText( text + emojiObject.emoji );
  }

  const handleOpenEmoji = () => {
    setEmojiOpen(true);
  }

  const handleCloseEmoji = () => {
    setEmojiOpen(false);
  }

  const handleMicClick = () => {
    if(recognition !== null) {
      
      recognition.onstart = () => {
        setListening(true);
      }
      recognition.onend = () => {
        setListening(false);
      }
      recognition.onresult = (e) => {
        setText( e.results[0][0].transcript );
      }

      recognition.start();
    }

  }

  const handleSendClick = () => {

  }

  return (
    <div className="chatWindow">
      <div className="chatWindow--header">

        <div className="chatWindow--headerinfo">
          <img className="chatWindow--avatar" src="https://www.w3schools.com/howto/img_avatar2.png" alt="Avatar" />
          <div className="chatWindow--name">Helena Meyer</div>
        </div>

        <div className="chatWindow--headerbuttons">
          <div className="chatWindow--btn">
            < SearchIcon style={{ color: '#919191' }} />
          </div>

          <div className="chatWindow--btn">
            < AttachFileIcon style={{ color: '#919191' }} />
          </div>

          <div className="chatWindow--btn">
            < MoreVertIcon style={{ color: '#919191' }} />
          </div>
        </div>

      </div>

      <div className="chatWindow--body">

      </div>

      <div 
          className="chatWindow--emojiarea" 
          style={{height: emojiOpen ? '200px' : '0px' }}>
        <EmojiPicker
          onEmojiClick={handleEmojiClick}
          disableSearchBar
          disableSkinTonePicker

        
        
        />
      </div>


      <div className="chatWindow--footer">

        <div className="chatWindow--pre">


        <div 
            className="chatWindow--btn"
            onClick={handleCloseEmoji}
            style={{width: emojiOpen?40:0}}> {/* se emoji open tiver aberto a largura será 40, se não será 0 */}
            < CloseIcon style={{ color: '#919191' }} />
          </div>

          <div 
            className="chatWindow--btn"
            onClick={handleOpenEmoji}>
            < InsertEmoticonIcon style={{ color: emojiOpen?'#009688':'#919191' }} /> {/* se o emoji open tiver aberto a cor do ícone vai mudar */}
          </div>

        </div>

        <div className="chatWindow--inputarea">
          <input 
              className="chatWindow--input" 
              type="text"
              placeholder="Digite uma mensagem"
              value={text}
              onChange={e=>setText(e.target.value)}
          />
        </div>

        <div className="chatWindow--pos">

          {/* se text tiver vazio ele mostra o botao de microfone */}
          {text === '' &&
          <div onClick={handleMicClick} className="chatWindow--btn">
            < MicIcon style={{ color: listening ? '#126ece' :  '#919191' }} />
          </div>
          }
          {/* se text não estiver vazio ele mostra o botao de envio - como no whats */}
          {text !== '' && 
          <div onClick={handleSendClick} className="chatWindow--btn">
            < SendIcon style={{ color: '#919191' }} />
          </div>
          }

        </div>

      </div>
    </div>
  )
}
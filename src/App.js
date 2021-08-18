import './App.css';
import { useEffect, useRef, useState } from 'react';
import { ProgressBar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  var urls = [];
  for (let i = 0; i<= 3000; i++) {
    urls.push("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLVtko4icXQPeGt8QMoN5lKN9JqDanCIvrDSkwM8VPv5zoSlhZ9SmaGR29Ykj6HxRyWP8&usqp=CAU");
  }
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [progressTotal, setProgressTotal] = useState(0);
  const counter = useRef(0);
  var imgs = [];

  const getAllImages = async () => {
    setLoading(true);
    urls.map(url => {
      load(url);
    })
  }
    
  const load = (url) => {
    var xmlHTTP = new XMLHttpRequest();
    xmlHTTP.open('GET', url,true);
    xmlHTTP.responseType = 'blob';

    xmlHTTP.onload = function(e) {
      console.log(this.response)
      var imageURL = window.URL.createObjectURL(this.response)
      imgs.push(imageURL);

      counter.current += 1;
      setProgressTotal((counter.current * 100 ) / urls.length);
      if (counter.current === urls.length) {
        setTimeout(() => {
          setLoading(false)
          setImages(imgs);
        }, 500)
       
      }

    };

    xmlHTTP.onprogress = function(e) {
        setProgress(parseInt((e.loaded / e.total) * 100));
    };
    xmlHTTP.onloadstart = function() {
      setProgress(0);
    };
    xmlHTTP.send();
  };

  useEffect(() => {
    getAllImages();
  }, [])
  return <>
    <div style={{display: loading ? "block" : "none"}}>
      <ProgressBar variant="warning" now={progress} />
      <ProgressBar animated now={progressTotal} />
    </div>
    <div style={{display: loading ? "none" : "block"}}>
      {images.map((img, index) => 
        <img width="100" height="100" src={img} key={index}/>
      )}
    </div>
  </>;
}

export default App;

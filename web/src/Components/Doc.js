import React, { Component } from 'react';
import {Layer, Stage, Image, Rect} from 'react-konva';

class Doc extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        image: null,
        page:0,
        images:[],
        rects: []
      };
      this.rectId=0;
      this.pageChange = this.pageChange.bind(this);
      this.backPage = this.backPage.bind(this);
      this.nextPage = this.nextPage.bind(this);
      this.begDraw = this.begDraw.bind(this);
      this.endDraw = this.endDraw.bind(this);
      this.editRect = this.editRect.bind(this);
    }
    editRect(object) {
      console.log(object);
      this.setState({
        currentRect: object,
      })
    }
    endDraw(event) {
      let rects = this.state.rects;
      let r = rects[rects.length - 1];
      r.width = event.evt.layerX-r.x;
      r.height = event.evt.layerY-r.y;
      this.setState({
        rects
      })
      console.log(rects);
    }
    begDraw(event) {
      let rects = this.state.rects;
      rects.push({key:++this.rectId, x:event.evt.layerX, y:event.evt.layerY});
      this.setState({
        rects
      });
    }
    backPage(event) {
      let n;
      if (this.state.page===0)
        n = this.state.images.length-1;
      else 
        n = (this.state.page-1)%this.state.images.length;
      const image = new window.Image();
      if (this.state.images && n>=0&&n<this.state.images.length){
        image.src = this.state.images[n].url;
        image.onload = () => {
          // setState will redraw layer
          // because "image" property is changed
          this.setState({
            page: n,
            image: image,
            pageText: ""+n
          }, function () {
            console.log(this.state.image);
          })
        };
      }
    }
    nextPage(event) {
      let n = (this.state.page+1)%this.state.images.length;
      const image = new window.Image();
      if (this.state.images && n>=0&&n<this.state.images.length){
        image.src = this.state.images[n].url;
        image.onload = () => {
          // setState will redraw layer
          // because "image" property is changed
          this.setState({
            page: n,
            image: image,
            pageText: ""+n
          }, function () {
            console.log(this.state.role);
          })
        };
      }
    }
    pageChange(event) {
      let n = +event.target.value;
      this.setState({
        pageText: event.target.value
      })
      const image = new window.Image();
      if (this.state.images && n>=0&&n<this.state.images.length){
        image.src = this.state.images[n].url;
        image.onload = () => {
          // setState will redraw layer
          // because "image" property is changed
          this.setState({
            page: n,
            image: image
          }, function () {
            console.log(this.state.image);
          })
        };
      }
    }
  
    componentWillReceiveProps(newProps) {
    const image = new window.Image();
    
    if (newProps.template){
        image.src = newProps.template.pages[this.state.page].url;
        image.onload = () => {
            // setState will redraw layer
            // because "image" property is changed
            this.setState({
              image: image,
              images: newProps.template.pages
            });
        };
        console.log(image)
    }
    return null;
    }
    render() {
      const rects = this.state.rects.map(r => {
        if (this.state.currentRect&&r.key===this.state.currentRect.key){
          return <Rect {...r}  stroke="black" strokeWidth={1} shadowBlur={5} onClick={()=>this.editRect(r)}  onMouseDown={contentClick} />

        } else {
          return <Rect {...r}  stroke="black" strokeWidth={1} shadowBlur={5} onClick={()=>this.editRect(r)}  onMouseDown={contentClick} />
        }
      });
      console.log(this.state.image)

      console.log(window)
      function contentClick(e) {
        console.log(e);
      }
      if (this.state.image)
      return (
        <div>
          <Stage width={window.innerWidth} height={window.innerHeight} onMouseDown={this.begDraw} onMouseUp={this.endDraw}>
            <Layer width={window.innerWidth} height={window.innerHeight}>
              <Image image={this.state.image} height={window.innerHeight}/>
            </Layer>
            <Layer width={window.innerWidth} height={window.innerHeight}>
              {rects}
            </Layer >
          </Stage>
          <div width="100%">
            <p>{this.state.page}</p>
          </div>

          <button onClick={this.backPage}>Назад</button>
          <input type="text" value={this.state.pageText} onChange={this.pageChange} />
          <button onClick={this.nextPage}>Вперёд</button>      
        </div>
      );
      return null;
    }
  }
  
  export default Doc;
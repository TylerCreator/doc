import React, { Component } from 'react';
import {Layer, Stage, Image, Rect} from 'react-konva';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  stage: {
    overflow: 'hidden',
    position: 'relative',
  },
});

class Doc extends Component {
    
    constructor(props) {
      super(props);
      this.state = {
        image: null,
        images:[],
        rects: []
      };
      this.rectId=0;
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

  
    componentWillReceiveProps(newProps) {
    const image = new window.Image();
    
    if (newProps.template){
        image.src = newProps.template.pages[newProps.page].url;
        image.onload = () => {
            // setState will redraw layer
            // because "image" property is changed
            this.setState({
              image: image,
              //image: newProps.image,
              images: newProps.template.pages,
              page: newProps.page
            });
        };
        console.log(image)
    }
    return null;
    }
    render() {
      const { classes, theme } = this.props;
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
        <Stage width={window.innerWidth} height={window.innerHeight} onMouseDown={this.begDraw} onMouseUp={this.endDraw}>
          <Layer>
            <Image image={this.state.image} />
          </Layer>
          <Layer>
            {rects}
          </Layer >
        </Stage>   
      );
      return null;
    }
  }
  Doc.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  }

  export default withStyles(styles, { withTheme: true })(Doc);

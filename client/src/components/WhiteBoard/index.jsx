/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import rough from 'roughjs';
import "./index.css"
import { useEffect, useLayoutEffect, useState } from 'react';

export const WhiteBoard = ({ canvasRef, ctxRef, elements, setElements, tool, color, socket, user }) => {

  useEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current)
    console.log("whiteboard");

    socket.on("onDrawPencil", ({ path }) => {
      console.log("onDrawPencil called");
      roughCanvas.linearPath(path, { roughness: 0, stroke: color, strokeWidth: 1 })
    });

    socket.on("onDrawLine", ({ x1, y1, x2, y2 }) => {
      console.log("onDrawLine called");
      roughCanvas.line(x1, y1, x2, y2, { roughness: 0, stroke: color, strokeWidth: 1 })
    })

    socket.on("onDrawRect", ({ x1, y1, x2, y2 }) => {
      console.log("onDrawRect called");
      roughCanvas.rectangle(x1, y1, x2, y2, { roughness: 0, stroke: color, strokeWidth: 1 })
    })
  }, [elements, socket])

  const [isDrawing, setIsdrawing] = useState(false)
  //getting the canvas referance and context on the first render
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext('2d');

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctxRef.current = ctx
  }, []);


  // TODO: not working
  // useEffect(() => {
  //   ctxRef.current.strokeStyle = color;
  // }, [color])


  //TODO: not working
  // useLayoutEffect(() => {
  //   const roughCanvas = rough.canvas(canvasRef.current)

  //   if (elements.length > 0) {
  //     ctxRef.current.clearRect(
  //       0,
  //       0,
  //       canvasRef.current.width,
  //       canvasRef.current.height
  //     )
  //   }

  //   elements.forEach((element) => {
  //     //check for pencil tool
  //     if (tool === "pencil") {
  //       roughCanvas.linearPath(element.path, { stroke: color, strokeWidth: 1 })
  //     }
  //     //check for line tool
  //     else if (tool === "line") {
  //       roughCanvas.line(element.offsetX, element.offsetY, element.strokeWidth, element.strokeHeight, { stroke: color, strokeWidth: 1 })
  //     }
  //     // check for rectrangle tool
  //     else if (tool === "rect") {
  //       roughCanvas.rectangle(element.offsetX, element.offsetY, element.strokeWidth, element.strokeHeight, { stroke: color, strokeWidth: 1 })
  //     }
  //   })

  // }, [elements])


  //<----------Mouse events handles starts here---------- !>

  //< *MouseDown event / start of drawing event  !>
  const handleMouseDown = (e) => {
    // console.log(e);

    //<----------------------- Pencil -------------------------------->
    if (tool === "pencil") {
      const { offsetX, offsetY } = e.nativeEvent;
      console.log("mouse down" + '(' + offsetX + ',' + offsetY + ')');
      setElements((prevElem) => [
        ...prevElem,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          stroke: color,
        },
      ])
      
    }

    //<------------------------- Line -------------------------------->
    if (tool === "line") {
      const { offsetX, offsetY } = e.nativeEvent;
      console.log("mouse down" + '(' + offsetX + ',' + offsetY + ')');
      setElements((prevElem) => [
        ...prevElem,
        {
          type: "line",
          offsetX,
          offsetY,
          strokeWidth: undefined,
          strokeHeight: undefined,
          stroke: color,
        },
      ])
    }

    //<---------------------------- Rectrangle -------------------------------->
    if (tool === "rect") {
      const { offsetX, offsetY } = e.nativeEvent;
      console.log("mouse down" + '(' + offsetX + ',' + offsetY + ')');
      setElements((prevElem) => [
        ...prevElem,
        {
          type: "rect",
          offsetX,
          offsetY,
          stroke: color,
        },
      ])
    }

    setIsdrawing(true)
  }

  // MouseMove event / Drawing is on progress --------------------------------
  const handleMouseMove = (e) => {
    if (isDrawing) {
      const roughCanvas = rough.canvas(canvasRef.current)
      //---Pencil---
      if (tool === "pencil") {
        const { offsetX, offsetY } = e.nativeEvent;
        // console.log("mouse move" + '(' + offsetX + ',' + offsetY + ')');

        //getting the path of the recent element
        const path = elements[elements.length - 1].path;
        const newPath = [...path, [offsetX, offsetY]];

        //update the recent path
        setElements((prevElm) => {
          return prevElm.map((element, index) => {
            if (index === (elements.length - 1)) {
              return {
                ...element,
                path: newPath,
              }
            } else {
              return element
            }
          })
        })
        
        socket.emit("drawPencil", { path: newPath });
        //draw the path
        roughCanvas.linearPath(newPath, { roughness: 0, stroke: color, strokeWidth: 1 })
      }
    }
  }

  //MouseUp event / End of drawing event
  const handleMouseUp = (e) => {
    const roughCanvas = rough.canvas(canvasRef.current)

    const { offsetX, offsetY } = e.nativeEvent;
    console.log("mouse up" + '(' + offsetX + ',' + offsetY + ')');

    //---Line---
    if (tool === "line") {
      const lastOffsetX = elements[elements.length - 1].offsetX;
      const lastOffsetY = elements[elements.length - 1].offsetY;
      const { offsetX, offsetY } = e.nativeEvent;
      const newPath = [lastOffsetX, lastOffsetY, offsetX, offsetY]
      console.log("mouse move" + '(' + offsetX + ',' + offsetY + ')');

      //ref - line (x1, y1, x2, y2 [, options]) || setting the x2 and y2 as current positions
      setElements((prevElm) => {
        return prevElm.map((element, index) => {
          if (index === (elements.length - 1)) {
            return {
              ...element,
              strokeWidth: offsetX,
              strokeHeight: offsetY
            }
          } else {
            return element
          }
        })
      })
      socket.emit("drawLine", {path: newPath})
      roughCanvas.line(lastOffsetX, lastOffsetY, offsetX, offsetY, { roughness: 0, stroke: color, strokeWidth: 1 })
    }

    //Rectrangle
    if (tool === "rect") {
      const lastOffsetX = elements[elements.length - 1].offsetX;
      const lastOffsetY = elements[elements.length - 1].offsetY;
      const { offsetX, offsetY } = e.nativeEvent;
      const newPath = [lastOffsetX, lastOffsetY, (offsetX - lastOffsetX), (offsetY - lastOffsetY)]
      console.log("mouse move" + '(' + offsetX + ',' + offsetY + ')');

      //ref - rectrangle (x1, y1, x2, y2 [, options]) || setting the x2 and y2 as current positions
      setElements((prevElm) => {
        return prevElm.map((element, index) => {
          if (index === (elements.length - 1)) {
            return {
              ...element,
              // {Bug: instade of height an width it gests the last mouse position}
              // strokeWidth: offsetX,
              // strokeHeight: offsetY,

              //{fixed: getting the difference of the initial and the current positions for height and width}
              strokeWidth: offsetX - element.offsetX,
              strokeHeight: offsetY - element.offsetY,
            }
          } else {
            return element
          }
        })
      })
      socket.emit("drawRect", {path: newPath})
      roughCanvas.rectangle(lastOffsetX, lastOffsetY, (offsetX - lastOffsetX), (offsetY - lastOffsetY), { roughness: 0, stroke: color, strokeWidth: 1 })
    }

    setIsdrawing(false)
  }

  //<----------Mouse events handles ends here---------- !>
  return (
    <div>
      {/* For debugging purpose */}
      {/* {JSON.stringify(elements)} */}

      {/* Canvas/Whiteboard starts here */}
      <div
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="border border-dark border-3 rounded-3 h-100 w-100 overflow-hidden"
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import rough from "roughjs";
import "./index.css";
import { useEffect, useState } from "react";

export const WhiteBoard = ({
  canvasRef,
  ctxRef,
  elements,
  setElements,
  tool,
  color,
  socket,
  user,
}) => {
  const [isDrawing, setIsdrawing] = useState(false);

  useEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    console.log("whiteboard");

    socket.on("onDrawPencil", ({ path, strokeColor }) => {
      console.log("onDrawPencil called");
      roughCanvas.linearPath(path, {
        roughness: 0,
        stroke: strokeColor,
        strokeWidth: 1,
      });
    });

    socket.on("onDrawLine", ({ x1, y1, x2, y2, strokeColor }) => {
      console.log("onDrawLine called");
      roughCanvas.line(x1, y1, x2, y2, {
        roughness: 0,
        stroke: strokeColor,
        strokeWidth: 1,
      });
    });

    socket.on("onDrawRect", ({ x1, y1, x2, y2, strokeColor }) => {
      console.log("onDrawRect called");
      roughCanvas.rectangle(x1, y1, x2, y2, {
        roughness: 0,
        stroke: strokeColor,
        strokeWidth: 1,
      });
    });
  }, [elements, socket]);

  //getting the canvas referance and context on component Mount
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 0.89;
    canvas.width = window.innerWidth;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    const roughCanvas = rough.canvas(canvasRef.current);
    console.log("whiteboard");

    socket.on("onDrawPencil", ({ path, strokeColor }) => {
      console.log("onDrawPencil called");
      roughCanvas.linearPath(path, {
        roughness: 0,
        stroke: strokeColor,
        strokeWidth: 1,
      });
    });

    socket.on("onDrawLine", ({ x1, y1, x2, y2, strokeColor }) => {
      console.log("onDrawLine called");
      roughCanvas.line(x1, y1, x2, y2, {
        roughness: 0,
        stroke: strokeColor,
        strokeWidth: 1,
      });
    });

    socket.on("onDrawRect", ({ x1, y1, x2, y2, strokeColor }) => {
      console.log("onDrawRect called");
      roughCanvas.rectangle(x1, y1, x2, y2, {
        roughness: 0,
        stroke: strokeColor,
        strokeWidth: 1,
      });
    });

    socket.on("onErase", ({ x1, y1, x2, y2 }) => {
      console.log("onErase called");

      // const canvas = document.getElementById("canvas");
      const ctx = canvasRef.current.getContext("2d");

      ctx.clearRect(x1, y1, x2, y2);
    });
  }, [elements, socket]);

  //<----------Mouse events handles starts here---------- !>

  //< *MouseDown event / start of drawing event  !>
  const handleMouseDown = (e) => {
    // console.log(e);

    //<----------------------- Pencil -------------------------------->
    if (tool === "pencil") {
      const { offsetX, offsetY } = e.nativeEvent;
      console.log("mouse down" + "(" + offsetX + "," + offsetY + ")");
      setElements((prevElem) => [
        ...prevElem,
        {
          type: "pencil",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          strokeColor: color,
        },
      ]);
    }

    //<------------------------- Line -------------------------------->
    if (tool === "line") {
      const { offsetX, offsetY } = e.nativeEvent;
      console.log("mouse down" + "(" + offsetX + "," + offsetY + ")");
      setElements((prevElem) => [
        ...prevElem,
        {
          type: "line",
          offsetX,
          offsetY,
          strokeWidth: undefined,
          strokeHeight: undefined,
          strokeColor: color,
        },
      ]);
    }

    //<---------------------------- Rectrangle -------------------------------->
    if (tool === "rect") {
      const { offsetX, offsetY } = e.nativeEvent;
      console.log("mouse down" + "(" + offsetX + "," + offsetY + ")");
      setElements((prevElem) => [
        ...prevElem,
        {
          type: "rect",
          offsetX,
          offsetY,
          strokeColor: color,
        },
      ]);
    }

    if (tool === "eraser") {
      const { offsetX, offsetY } = e.nativeEvent;
      console.log("mouse down" + "(" + offsetX + "," + offsetY + ")");

      setElements((prevElem) => [
        ...prevElem,
        {
          type: "eraser",
          offsetX,
          offsetY,
          path: [[offsetX, offsetY]],
          strokeColor: color,
        },
      ]);
    }

    setIsdrawing(true);
  };

  // MouseMove event / Drawing is on progress --------------------------------
  const handleMouseMove = (e) => {
    if (isDrawing) {
      const roughCanvas = rough.canvas(canvasRef.current);
      //---Pencil---
      if (tool === "pencil") {
        const { offsetX, offsetY } = e.nativeEvent;
        // console.log("mouse move" + '(' + offsetX + ',' + offsetY + ')');

        //getting the path of the recent element
        const path = elements[elements.length - 1].path;
        const newPath = [...path, [offsetX, offsetY]];
        const strokeColor = elements[elements.length - 1].strokeColor;

        //update the recent path
        setElements((prevElm) => {
          return prevElm.map((element, index) => {
            if (index === elements.length - 1) {
              return {
                ...element,
                path: newPath,
              };
            } else {
              return element;
            }
          });
        });

        socket.emit("drawPencil", { path: newPath, strokeColor: strokeColor });
        //draw the path
        roughCanvas.linearPath(newPath, {
          roughness: 0,
          stroke: color,
          strokeWidth: 1,
        });
      }
      // Eraser
      if (tool === "eraser") {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const eraserSize = 20; // Adjust the eraser size as needed
        const { offsetX, offsetY } = e.nativeEvent;

        const newPath = [
          offsetX - eraserSize / 2,
          offsetY - eraserSize / 2,
          eraserSize,
          eraserSize,
        ];

        setElements((prevElm) => {
          return prevElm.map((element, index) => {
            if (index === elements.length - 1) {
              return {
                ...element,
                strokeWidth: offsetX,
                strokeHeight: offsetY,
              };
            } else {
              return element;
            }
          });
        });
        socket.emit("erase", { path: newPath });

        ctx.clearRect(
          offsetX - eraserSize / 2,
          offsetY - eraserSize / 2,
          eraserSize,
          eraserSize,
        );
      }
    }
  };

  //MouseUp event / End of drawing event
  const handleMouseUp = (e) => {
    const roughCanvas = rough.canvas(canvasRef.current);

    const { offsetX, offsetY } = e.nativeEvent;
    console.log("mouse up" + "(" + offsetX + "," + offsetY + ")");

    //---Line---
    if (tool === "line") {
      const lastOffsetX = elements[elements.length - 1].offsetX;
      const lastOffsetY = elements[elements.length - 1].offsetY;
      const { offsetX, offsetY } = e.nativeEvent;
      const newPath = [lastOffsetX, lastOffsetY, offsetX, offsetY];
      console.log("mouse move" + "(" + offsetX + "," + offsetY + ")");

      const strokeColor = elements[elements.length - 1].strokeColor;

      //ref - line (x1, y1, x2, y2 [, options]) || setting the x2 and y2 as current positions
      setElements((prevElm) => {
        return prevElm.map((element, index) => {
          if (index === elements.length - 1) {
            return {
              ...element,
              strokeWidth: offsetX,
              strokeHeight: offsetY,
            };
          } else {
            return element;
          }
        });
      });
      socket.emit("drawLine", { path: newPath, strokeColor: strokeColor });
      roughCanvas.line(lastOffsetX, lastOffsetY, offsetX, offsetY, {
        roughness: 0,
        stroke: color,
        strokeWidth: 1,
      });
    }

    //Rectrangle
    if (tool === "rect") {
      const lastOffsetX = elements[elements.length - 1].offsetX;
      const lastOffsetY = elements[elements.length - 1].offsetY;
      const { offsetX, offsetY } = e.nativeEvent;
      const newPath = [
        lastOffsetX,
        lastOffsetY,
        offsetX - lastOffsetX,
        offsetY - lastOffsetY,
      ];
      console.log("mouse move" + "(" + offsetX + "," + offsetY + ")");

      const strokeColor = elements[elements.length - 1].strokeColor;

      //ref - rectrangle (x1, y1, x2, y2 [, options]) || setting the x2 and y2 as current positions
      setElements((prevElm) => {
        return prevElm.map((element, index) => {
          if (index === elements.length - 1) {
            return {
              ...element,
              strokeWidth: offsetX,
              strokeHeight: offsetY,
            };
          } else {
            return element;
          }
        });
      });
      socket.emit("drawRect", { path: newPath, strokeColor: strokeColor });
      roughCanvas.rectangle(
        lastOffsetX,
        lastOffsetY,
        offsetX - lastOffsetX,
        offsetY - lastOffsetY,
        { roughness: 0, stroke: color, strokeWidth: 1 },
      );
    }

    setIsdrawing(false);
  };

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
        style={{ borderStyle: "dashed", borderColor: "gray" }}
        className="rounded-5 overflow-hidden"
      >
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
};

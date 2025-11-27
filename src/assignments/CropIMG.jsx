import React, { useState, useRef, useEffect } from "react";
import "./CropIMG.css";

const CropIMG = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cropBox, setCropBox] = useState(null);
  const [isDrawingBox, setIsDrawingBox] = useState(false);
  const [isMovingBox, setIsMovingBox] = useState(false);
  const [drawStartPosition, setDrawStartPosition] = useState({ x: 0, y: 0 });

  const fileInputRef = useRef(null);
  const imageRef = useRef(null);

  const openFileDialog = () => {
    fileInputRef.current.click();
  };

  const loadImage = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setCropBox(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const getClickPosition = (event) => {
    const imageRect = imageRef.current.getBoundingClientRect();
    return {
      x: event.clientX - imageRect.left,
      y: event.clientY - imageRect.top,
    };
  };

  const startDrawingCropBox = (event) => {
    const clickPos = getClickPosition(event);
    setIsDrawingBox(true);
    setDrawStartPosition(clickPos);
    setCropBox({ x: clickPos.x, y: clickPos.y, width: 0, height: 0 });
  };

  const updateCropBoxWhileDrawing = (event) => {
    if (!isDrawingBox) return;

    const currentPos = getClickPosition(event);
    const boxWidth = Math.abs(currentPos.x - drawStartPosition.x);
    const boxHeight = Math.abs(currentPos.y - drawStartPosition.y);
    const boxX = Math.min(currentPos.x, drawStartPosition.x);
    const boxY = Math.min(currentPos.y, drawStartPosition.y);

    setCropBox({ x: boxX, y: boxY, width: boxWidth, height: boxHeight });
  };

  const finishDrawingCropBox = () => {
    setIsDrawingBox(false);
    if (cropBox && (cropBox.width < 10 || cropBox.height < 10)) {
      setCropBox(null);
    }
  };

  const startMovingCropBox = (event) => {
    event.stopPropagation();
    setIsMovingBox(true);
    const clickPos = getClickPosition(event);
    setDrawStartPosition({
      x: clickPos.x - cropBox.x,
      y: clickPos.y - cropBox.y,
    });
  };

  const moveCropBox = (event) => {
    if (!isMovingBox || !cropBox) return;

    const currentPos = getClickPosition(event);
    const imageRect = imageRef.current.getBoundingClientRect();

    const newBoxX = Math.max(
      0,
      Math.min(currentPos.x - drawStartPosition.x, imageRect.width - cropBox.width)
    );
    const newBoxY = Math.max(
      0,
      Math.min(currentPos.y - drawStartPosition.y, imageRect.height - cropBox.height)
    );

    setCropBox(prev => ({ ...prev, x: newBoxX, y: newBoxY }));
  };

  const stopMovingCropBox = () => {
    setIsMovingBox(false);
  };

  useEffect(() => {
    if (isMovingBox || isDrawingBox) {
      const handleMouseMove = (e) => {
        moveCropBox(e);
        updateCropBoxWhileDrawing(e);
      };
      const handleMouseUp = () => {
        stopMovingCropBox();
        finishDrawingCropBox();
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isMovingBox, isDrawingBox, cropBox, drawStartPosition]);

  const downloadCroppedImage = () => {
    if (!selectedImage || !cropBox) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const tempImage = new Image();

    tempImage.onload = () => {
      const scaleX = tempImage.naturalWidth / imageRef.current.offsetWidth;
      const scaleY = tempImage.naturalHeight / imageRef.current.offsetHeight;

      canvas.width = cropBox.width * scaleX;
      canvas.height = cropBox.height * scaleY;

      context.drawImage(
        tempImage,
        cropBox.x * scaleX,
        cropBox.y * scaleY,
        cropBox.width * scaleX,
        cropBox.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      canvas.toBlob((blob) => {
        const downloadUrl = URL.createObjectURL(blob);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = "cropped-image.png";
        downloadLink.click();
        URL.revokeObjectURL(downloadUrl);
      });
    };

    tempImage.src = selectedImage;
  };

  return (
    <div className="cropper-container">
      <div className="cropper-card">
        <h1 className="cropper-title">Simple Image Cropper</h1>

        <div className="image-section">
          {!selectedImage ? (
            <div className="upload-area">
              <div className="upload-content">
                <div className="upload-icon">📷</div>
                <p>Choose an image to crop</p>
              </div>
            </div>
          ) : (
            <div className="image-container">
              <img
                ref={imageRef}
                src={selectedImage}
                alt="Image to crop"
                className="crop-image"
                onMouseDown={startDrawingCropBox}
              />

              {cropBox && cropBox.width > 0 && cropBox.height > 0 && (
                <div
                  className="crop-selection"
                  style={{
                    left: cropBox.x,
                    top: cropBox.y,
                    width: cropBox.width,
                    height: cropBox.height,
                  }}
                  onMouseDown={startMovingCropBox}
                >
                  <div className="handle handle-tl"></div>
                  <div className="handle handle-tr"></div>
                  <div className="handle handle-bl"></div>
                  <div className="handle handle-br"></div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="controls">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={loadImage}
            className="file-input"
          />

          <button onClick={openFileDialog} className="btn btn-primary">
            Choose Image
          </button>

          <button
            onClick={downloadCroppedImage}
            disabled={!selectedImage || !cropBox || cropBox.width === 0}
            className="btn btn-success"
          >
            Download Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default CropIMG;
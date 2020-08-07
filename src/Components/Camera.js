import React from 'react'
import Webcam from 'react-webcam'

export default function Camera(props){
    const videoConstraints = {
        width: 500,
        height: 500,
        facingMode: 'user'
    }

    const WebcamCapture = () => {
        const webcamRef = React.useRef(null)

        const capture = React.useCallback(
            () => {
                const imageSrc = webcamRef.current.getScreenshot();
                props.handleCapture(imageSrc)
            },
            [webcamRef]
        )
    

        return (
            <>
                <h1>Wow! A camera!</h1>
                <Webcam
                    audio={false}
                    height={300}
                    ref={webcamRef}
                    screenshotFormat='image/jpeg'
                    width={300}
                    videoConstraints={videoConstraints}
                />
                <button onClick={capture}>Capture</button>
            </>
        )
    }

    return (
        <div>
            {WebcamCapture()}
        </div>
    )
}